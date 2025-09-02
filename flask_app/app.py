import os
import hashlib
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, current_app, send_from_directory, jsonify
from werkzeug.utils import secure_filename
from flask_utils import validations
from database.db import db
from database import models
from sqlalchemy.orm import joinedload
from sqlalchemy import func

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
STATIC_FOLDER = os.path.join(BASE_DIR, 'static')
TEMPLATES_FOLDER = os.path.join(BASE_DIR, 'templates')
UPLOAD_SUBDIR = 'uploads'
UPLOAD_FOLDER = os.path.join(STATIC_FOLDER, UPLOAD_SUBDIR)
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config['SECRET_KEY'] =  os.environ.get('SECRET_KEY', 'cambio_temporal')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024

def app_startup_tasks(app):

    upload_folder = app.config.get('UPLOAD_FOLDER')
    if upload_folder:
        import os
        os.makedirs(upload_folder, exist_ok=True)

with app.app_context():
    app_startup_tasks(app)

db.init_app(app)

ALLOWED_EXT = {'png', 'jpg', 'jpeg'}

def archivo_perm(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXT

@app.route('/api/comunas/<int:region_id>')
def api_comunas(region_id):
    comunas = models.Comuna.query.filter_by(region_id=region_id).order_by(models.Comuna.nombre).all()
    resultados = [{'id': c.id, 'nombre': c.nombre} for c in comunas]
    return jsonify(resultados)

@app.route('/')
def index():
    ultimos = models.AvisoAdopcion.query.order_by(models.AvisoAdopcion.fecha_ingreso.desc()).limit(5).all()
    return render_template('index.html', ultimos = ultimos)

@app.route('/listado')
def listado():
    page = request.args.get('page', 1, type=int)
    per_page = 5
    q = models.AvisoAdopcion.query.options(
        joinedload(models.AvisoAdopcion.comuna).joinedload(models.Comuna.region),
        joinedload(models.AvisoAdopcion.fotos),
        joinedload(models.AvisoAdopcion.contactos)
    ).order_by(models.AvisoAdopcion.fecha_ingreso.desc())
    pagination = q.paginate(page=page, per_page=per_page, error_out=False)
    return render_template('listado.html', pagination=pagination)

@app.route('/agregar', methods=['GET', 'POST'])
def agregar():
    comunas = models.Comuna.query.order_by(models.Comuna.nombre).all()
    regiones = models.Region.query.order_by(models.Region.nombre).all()
    if request.method == 'POST':
        data = {
            'nombre': request.form.get('nombre', '').strip(),
            'email': request.form.get('email', '').strip(),
            'celular': request.form.get('celular', '').strip(),
            'tipo': request.form.get('tipo', '').strip(),
            'cantidad': request.form.get('cantidad', '').strip(),
            'edad': request.form.get('edad', '').strip(),
            'unidad_medida': request.form.get('unidad_medida', '').strip(),
            'fecha_entrega': request.form.get('fecha_entrega', '').strip(),
            'descripcion': request.form.get('descripcion', '').strip(),
            'sector': request.form.get('sector', '').strip(),
            'comuna_id': request.form.get('comuna_id', '').strip()
        }
        
        errors = validations.validate_aviso_server(data)
        if errors:
            for e in errors:
                flash(e, 'Error en el formulario')
            return render_template('agregar.html', form=data, comunas=comunas)
        try:
            fecha_entrega = validations.parse_datetime_input(data['fecha_entrega'])
            aviso = models.AvisoAdopcion(
                fecha_ingreso = datetime.utcnow(),
                comuna_id = int(data['comuna_id']),
                sector = data['sector'] or None,
                nombre = data['nombre'],
                email = data['email'],
                celular = data['celular'] or None,
                tipo = data['tipo'],
                cantidad = int(data['cantidad']),
                edad = int(data['edad']),
                unidad_medida = data['unidad_medida'],
                fecha_entrega = fecha_entrega,
                descripcion = data['descripcion'] or None
            )
            db.session.add(aviso)
            db.session.flush()
            medios = request.form.getlist('contactar_nombre[]')
            identificadores = request.form.getlist('contactar_identificador[]')
            for m, ident in zip(medios, identificadores):
                if m and ident:
                    cp = models.ContactarPor(nombre=m.strip(), identificador=ident.strip(), actividad_id=aviso.id)
                    db.session.add(cp)
            
            files = request.files.getlist('fotos')
            for f in files:
                if f and f.filename and archivo_perm(f.filename):
                    raw = f.read(4096)
                    f.seek(0)
                    try:
                        import filetype
                        ft = filetype.guess(raw)
                        if ft and ft.extension not in ALLOWED_EXT:
                            continue
                    except Exception:
                        pass
                    
                    filename = secure_filename(f.filename)
                    h = hashlib.sha1((filename + str(datetime.utcnow().timestamp()) + str(aviso.id)).encode()).hexdigest()[:16]
                    unique = f"{h}_{filename}"
                    dest_path = os.path.join(app.config['UPLOAD_FOLDER'], unique)
                    f.save(dest_path)
                    ruta_rel = os.path.join(UPLOAD_SUBDIR, unique).replace('\\', '/')
                    foto = models.Foto(ruta_archivo=ruta_rel, nombre_archivo=filename, actividad_id=aviso.id)
                    db.session.add(foto)
            db.session.commit()
            flash('Aviso subido', 'success')
            return redirect(url_for('index'))
        except Exception:
            db.session.rollback()
            current_app.logger.exception("Error al momento de subir el aviso")
            flash('Error al momento de guardar el archivo', 'danger')
            return render_template('agregar.html', form=data, comunas=comunas)
    return render_template('agregar.html', comunas=comunas, regiones=regiones, form={})

@app.route('/aviso/<int:aviso_id>')
def detalle(aviso_id):
    aviso = models.AvisoAdopcion.query.get_or_404(aviso_id)
    return render_template('detalle.html', aviso= aviso)

@app.route('/uploads/<path:filename>')
def upload_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/stats/data') #stats para los 3 graficos
def stats_data():
    q_days = db.session.query(
        func.date(models.AvisoAdopcion.fecha_ingreso).label('day'),
        func.count(models.AvisoAdopcion.id).label('count')
    ).group_by(func.date(models.AvisoAdopcion.fecha_ingreso)).order_by(func.date(models.AvisoAdopcion.fecha_ingreso)).all()
    days = [row.day.strftime('%Y-%m-%d') for row in q_days]
    count_by_day = [row.count for row in q_days]
    #torta
    q_type = db.session.query(models.AvisoAdopcion.tipo, func.count(models.AvisoAdopcion.id)).group_by(models.AvisoAdopcion.tipo).all()
    types = [row[0] for row in q_type]
    count_by_type = [row[1] for row in q_type]
    #barras
    q_month = db.session.query(
        func.date_format(models.AvisoAdopcion.fecha_ingreso, '%Y-%m').label('month'),
        models.AvisoAdopcion.tipo,
        func.count(models.AvisoAdopcion.id).label('cnt')  
    ).group_by(func.date_format(models.AvisoAdopcion.fecha_ingreso, '%Y-%m'), models.AvisoAdopcion.tipo).order_by(func.date_format(models.AvisoAdopcion.fecha_ingreso, '%Y-%m')).all()

    #diccionario de mes -> perro, gato (cantidad)
    from collections import OrderedDict
    month_map = OrderedDict()
    for row in q_month:
        m = row.month
        tipo = row.tipo
        cnt = row.cnt
        if m not in month_map:
            month_map[m] = {'perro':0, 'gato':0}
        month_map[m][tipo] = cnt  
    months = list(month_map.keys())
    perros_per_month = [month_map[m]['perro'] for m in months]
    gatos_per_month = [month_map[m]['gato'] for m in months]
    return jsonify({
        'by_day': {'labels':days, 'data':count_by_day},
        'by_month': {'labels':months, 'perros': perros_per_month, 'gatos':gatos_per_month},
        'by_type': {'labels':types, 'data': count_by_type}
    })

@app.route('/aviso/<int:aviso_id>/comentarios')
def get_comentarios(aviso_id):
    try:
        comentarios_q = models.Comentario.query.filter_by(aviso_id=aviso_id).order_by(models.Comentario.fecha.desc()).all()
    except Exception:
        current_app.logger.exception("Error al consultar comentarios")
        return jsonify({'comentarios': []}), 500

    comentarios = [{
        'id': c.id,
        'nombre': c.nombre,
        'texto': c.texto,
        'fecha': c.fecha.strftime('%Y-%m-%d %H:%M')
    } for c in comentarios_q]
    return jsonify({'comentarios': comentarios})

@app.route('/aviso/<int:aviso_id>/comentario', methods=['POST'])
def agregar_comentario(aviso_id):
    aviso = models.AvisoAdopcion.query.get_or_404(aviso_id)
    
    data = request.get_json(silent=True) or request.form or {}
    nombre = (data.get('nombre') or '').strip()
    texto = (data.get('texto') or '').strip()
    errors = {}
    if not nombre or len(nombre) < 3 or len(nombre) > 80:
        errors['nombre'] = 'Nombre no válido'
    if not texto or len(texto) < 5 or len(texto) > 300:
        errors['texto'] = 'Comentario no válido'
    if errors:
        return jsonify({'ok':False, 'errors':errors}), 400
    c = models.Comentario(nombre=nombre, texto=texto, aviso_id=aviso.id, fecha = datetime.utcnow())
    db.session.add(c)
    db.session.commit()
    return jsonify({
        'ok': True,
        'comentario':{
            'id': c.id,
            'nombre':c.nombre,
            'texto':c.texto,
            'fecha':c.fecha.strftime('%Y-%m-%d %H:%M')
        }
    }), 201

@app.route('/estadisticas')
def estadisticas():
    return render_template('estadisticas.html')

for rule in app.url_map.iter_rules():
    print(rule.endpoint, rule.rule)

if __name__ == '__main__':
    app.run(debug=True)



