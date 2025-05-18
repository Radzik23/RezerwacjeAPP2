from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from models import db, Restaurant
from auth import auth_bp
from reservations import reservations_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)
CORS(app)

# Blueprinty (endpointy)
app.register_blueprint(auth_bp)
app.register_blueprint(reservations_bp)

# Tworzenie bazy danych
with app.app_context():
    db.create_all()
    if not Restaurant.query.first():
        db.session.add(Restaurant(name="Pizzeria Roma", address="ul. Serowa 1"))
        db.session.add(Restaurant(name="Sushi Zen", address="ul. Wasabi 9"))
        db.session.commit()


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
