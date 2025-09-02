from .db import db
from datetime import datetime

class Region(db.Model):
    __tablename__ = 'region'
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(200), nullable=False)
    comunas = db.relationship('Comuna', back_populates = 'region', cascade = 'all, delete-orphan')

class Comuna(db.Model):
    __tablename__ = 'comuna'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(200), nullable=False)
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    region = db.relationship('Region', back_populates='comunas')
    avisos = db.relationship('AvisoAdopcion', back_populates='comuna', cascade='all, delete-orphan')

class AvisoAdopcion(db.Model):
    __tablename__ = 'aviso_adopcion'
    id = db.Column(db.Integer, primary_key=True)
    fecha_ingreso = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    comuna_id = db.Column(db.Integer, db.ForeignKey('comuna.id'), nullable=False)
    comuna = db.relationship('Comuna', back_populates='avisos')
    sector = db.Column(db.String(100))
    nombre = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    celular = db.Column(db.String(15))
    tipo = db.Column(db.Enum('gato','perro'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    edad = db.Column(db.Integer, nullable=False)
    unidad_medida = db.Column(db.Enum('a','m'), nullable=False)
    fecha_entrega = db.Column(db.DateTime, nullable=False)
    descripcion = db.Column(db.Text)
    fotos = db.relationship('Foto', back_populates='aviso', cascade='all, delete-orphan')
    contactos = db.relationship('ContactarPor', back_populates='aviso', cascade='all, delete-orphan')
    comentarios = db.relationship('Comentario', back_populates='aviso', cascade='all, delete-orphan')
class Foto(db.Model):
    __tablename__ = 'foto'
    id = db.Column(db.Integer, primary_key=True)
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable = False)
    ruta_archivo = db.Column(db.String(300), nullable=False)
    nombre_archivo = db.Column(db.String(300), nullable=False)
    aviso = db.relationship('AvisoAdopcion', back_populates='fotos')

class ContactarPor(db.Model):
    __tablename__ = 'contactar_por'
    id = db.Column(db.Integer, primary_key=True)
    actividad_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable = False)
    nombre = db.Column(db.Enum('whatsapp','telegram','X','instagram','tiktok','otra'), nullable=False)
    identificador = db.Column(db.String(150), nullable=False)
    aviso = db.relationship('AvisoAdopcion', back_populates = 'contactos')

class Comentario(db.Model):
    __tablename__ = 'comentario'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(80), nullable=False)
    texto = db.Column(db.String(300), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    aviso_id = db.Column(db.Integer, db.ForeignKey('aviso_adopcion.id'), nullable=False)
    aviso = db.relationship('AvisoAdopcion', back_populates='comentarios')