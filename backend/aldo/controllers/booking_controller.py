from flask import Blueprint, request, jsonify
from aldo.extensions import db
from aldo.models.booking import Booking
from aldo.models.tour import Tour
from aldo.models.user import User
from datetime import datetime

booking_bp = Blueprint('booking_bp', __name__)

@booking_bp.route('/create_booking', methods=['POST'])
def create_booking():
    data = request.get_json()

    # Extract fields
    user_id = data.get('user_id')
    tour_id = data.get('tour_id')
    date = data.get('date')
    total_cost = data.get('total_cost')
    number_of_people = data.get('number_of_people')

    if not all([user_id, tour_id, date, total_cost, number_of_people]):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        new_booking = Booking(
            user_id=user_id,
            tour_id=tour_id,
            date=date,
            total_cost=total_cost,
            number_of_people=number_of_people,
        )

        db.session.add(new_booking)
        db.session.commit()

        return jsonify({'message': 'Booking created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
        
@booking_bp.route('/get_bookings', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    booking_list = []

    for booking in bookings:
        tour = Tour.query.get(booking.tour_id)
        booking_list.append({
            "id": booking.id,
            "tour_id": booking.tour_id,
            "tour_title": tour.title if tour else "Unknown Tour",
            "date": booking.date,
            "number_of_people": booking.number_of_people,
            "total_cost": booking.total_cost,
            "status": booking.status,
        })

    return jsonify(booking_list), 200    

@booking_bp.route('/update_status/<int:booking_id>', methods=['PUT'])
def update_status(booking_id):
    data = request.get_json()
    status = data.get('status')

    if status not in ["Approved", "Cancelled"]:
        return jsonify({"error": "Invalid status"}), 400

    booking = Booking.query.get_or_404(booking_id)
    booking.status = status
    db.session.commit()

    return jsonify({"message": "Booking status updated successfully"}), 200

@booking_bp.route('/get_bookings_by_user/<int:user_id>', methods=['GET'])
def get_bookings_by_user(user_id):
    try:

        bookings = (
            db.session.query(Booking, Tour.title)
            .join(Tour, Booking.tour_id == Tour.id)
            .filter(Booking.user_id == user_id)
            .all()
        )

        result = []
        for booking, tour_title in bookings:
            result.append({
                "id": booking.id,
                "user_id": booking.user_id,
                "tour_id": booking.tour_id,
                "tour_title": tour_title,
                "date": booking.date.strftime('%Y-%m-%d'),
                "status": booking.status,
                "total_cost": booking.total_cost,
                "number_of_people": booking.number_of_people,
            })

        return jsonify(result), 200

    except Exception as e:
        print(f"Error fetching bookings for user {user_id}: {e}")
        return jsonify({"error": "Failed to fetch bookings."}), 500


