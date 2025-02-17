from flask import Blueprint, request, jsonify
from aldo.models.user import User
from aldo.extensions import db
from werkzeug.security import check_password_hash


user_bp = Blueprint('user', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already registered'}), 400

    new_user = User(first_name=first_name, last_name=last_name, email=email, password=password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201

@user_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({'error': 'Invalid email or password'}), 401

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid email or password'}), 401

    user_data = {
        'id': user.id,
        'name': user.first_name, 
        'email': user.email,
        'role': user.role
    }

    return jsonify({'message': 'Login successful', 'user': user_data}), 200
