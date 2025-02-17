
from flask import Blueprint, request, jsonify
from aldo.extensions import db
from aldo.models.tour import Tour
import json

tour_bp = Blueprint('tour_bp', __name__)

@tour_bp.route('/add_tour', methods=['POST'])
def add_tour():

    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON body provided"}), 400

    title = data.get('title')
    content = data.get('content')
    country = data.get('country')
    district = data.get('district')
    area = data.get('area')
    price = data.get('price')
    image1 = data.get('image1')
    image2 = data.get('image2')
    image3 = data.get('image3')
    image4 = data.get('image4')
    included = data.get('included', {})

    required = [title, content, country, district, area, price]
    if any(x is None or x == "" for x in required):
        return jsonify({"error": "Missing required fields"}), 400


    try:
        price = float(price)
    except ValueError:
        return jsonify({"error": "Price must be a valid float"}), 400


    try:
        new_tour = Tour(
            title=title,
            content=content,
            country=country,
            district=district,
            area=area,
            price=price,
            image1=image1 or "",
            image2=image2 or "",
            image3=image3 or "",
            image4=image4 or "",
            included=json.dumps(included)  
        )

        db.session.add(new_tour)
        db.session.commit()

        return jsonify({"message": "Tour added successfully!", "tour_id": new_tour.id}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@tour_bp.route('/list_tours', methods=['GET'])
def list_tours():

    try:
        tours = Tour.query.all()
        tours_list = [tour.to_dict() for tour in tours]
        return jsonify(tours_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@tour_bp.route('/get_tour/<int:tour_id>', methods=['GET'])
def get_tour(tour_id):

    try:
        tour = Tour.query.get(tour_id)
        if not tour:
            return jsonify({"error": "Tour not found"}), 404

        return jsonify(tour.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
