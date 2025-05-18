from app import app
from models import db

with app.app_context():
    db.drop_all()  # usunie starą strukturę (opcjonalnie)
    db.create_all()  # stworzy nową bazę z aktualnymi kolumnami
    print("Baza danych została utworzona!")