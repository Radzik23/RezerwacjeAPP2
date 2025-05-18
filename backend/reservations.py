from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Restaurant, Reservation, User

reservations_bp = Blueprint('reservations', __name__)

@reservations_bp.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    return jsonify([
        {
            "id": r.id,
            "name": r.name,
            "address": r.address
        } for r in restaurants
    ]), 200

@reservations_bp.route('/reservations', methods=['POST'])
@jwt_required()
def create_reservation():
    data = request.get_json()
    user_id = get_jwt_identity()

    reservation = Reservation(
        user_id=user_id,
        restaurant_id=data['restaurant_id'],
        reservation_time=data['reservation_time'],
        number_of_people=data['number_of_people']
    )
    db.session.add(reservation)
    db.session.commit()
    return jsonify({"msg": "Reservation created"}), 201

@reservations_bp.route('/reservations', methods=['GET'])
@jwt_required()
def get_reservations():
    user_id = get_jwt_identity()
    reservations = Reservation.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            "id": r.id,
            "restaurant_id": r.restaurant_id,
            "reservation_time": r.reservation_time,
            "number_of_people": r.number_of_people
        } for r in reservations
    ]), 200

@reservations_bp.route('/reservations/<int:id>', methods=['PUT'])
@jwt_required()
def update_reservation(id):
    user_id = get_jwt_identity()
    reservation = Reservation.query.filter_by(id=id, user_id=user_id).first()

    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404

    data = request.get_json()
    reservation.reservation_time = data.get('reservation_time', reservation.reservation_time)
    reservation.number_of_people = data.get('number_of_people', reservation.number_of_people)

    db.session.commit()
    return jsonify({"msg": "Reservation updated"}), 200

@reservations_bp.route('/reservations/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_reservation(id):
    user_id = get_jwt_identity()
    reservation = Reservation.query.filter_by(id=id, user_id=user_id).first()

    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404

    db.session.delete(reservation)
    db.session.commit()
    return jsonify({"msg": "Reservation deleted"}), 200
