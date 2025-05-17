from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import db, User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "User already exists"}), 400

    hashed_password = generate_password_hash(data['password'])
    user = User(
        username=data['username'],
        password=hashed_password,
        full_name=data.get('full_name', ''),
        email=data.get('email', '')
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Registered"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    print('🟡 Próba logowania:')
    print('Użytkownik (e-mail):', data.get('username'))
    print('Hasło (surowe):', data.get('password'))

    user = User.query.filter_by(email=data['username']).first()

    if user:
        print('✅ Użytkownik znaleziony:', user.email)
        print('✅ Porównanie hasła:', check_password_hash(user.password, data['password']))
    else:
        print('❌ Nie znaleziono użytkownika')

    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=str(user.id))
        print('🔐 Wygenerowano token:', access_token)
        return jsonify(access_token=access_token), 200

    print('❌ Nieprawidłowe dane logowania')
    return jsonify({"msg": "Invalid credentials"}), 401

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    print("🧪 JWT identity:", user_id, type(user_id))

    if not user:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "full_name": user.full_name,
        "email": user.email
    }), 200
