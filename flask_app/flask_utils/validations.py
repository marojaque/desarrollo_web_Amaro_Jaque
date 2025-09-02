from datetime import datetime

def validate_email_simple(email: str) -> bool:
    return '@' in email and '.' in email

def parse_datetime_input(s: str):
    if not s:
        return None
    try:
        return datetime.fromisoformat(s)
    except Exception:
        pass
    for fmt in ('%Y-%m-%d %H:%M', '%Y-%m-%d'):
        try:
            return datetime.strptime(s, fmt)
        except Exception:
            pass
    return None

def validate_aviso_server(data: dict):
    errors = []
    if not data.get('nombre'):
        errors.append('El campo nombre es obligatorio')
    if not data.get('email') or not validate_email_simple(data.get('email','')):
        errors.append('Email inválido')
    if not data.get('tipo') or data.get('tipo') not in ('perro', 'gato'):
        errors.append('Tipo inválido')
    try:
        cantidad = int(data.get('cantidad', 0))
        if cantidad < 1:
            errors.append('Se debe poner en adopción al menos 1 mascota')
    except Exception:
        errors.append('Cantidad inválida')
    try:
        edad = int(data.get('edad', -1))
        if edad < 0:
            errors.append('Edad inválida')
    except Exception:
        errors.append('Edad inválida')
    if data.get('unidad_medida') not in ('a', 'm'):
        errors.append('Unidad de medida inválida')
    if not data.get('fecha_entrega') or not parse_datetime_input(data.get('fecha_entrega')):
        errors.append('Fecha de entrega inválida')
    try:
        comuna_id = int(data.get('comuna_id', 0))
        if comuna_id <= 0:
            errors.append('Comuna inválida')
    except Exception:
        errors.append('Comuna inválida')
    if data.get('nombre') and len(data.get('nombre')) > 200:
        errors.append('El nombre es demasiado largo')
    if data.get('descripcion') and len(data.get('descripcion')) > 500:
        errors.append('La descripción es demasiado larga')
    return errors 
        