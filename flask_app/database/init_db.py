from .db import db
from .models import Region, Comuna, AvisoAdopcion, Foto, Contacto

def create_all(app):
    with app.app_context():
        db.create_all()