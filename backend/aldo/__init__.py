from flask import Flask
from flask_mail import Mail
from flask_cors import CORS
from dotenv import load_dotenv
from aldo.extensions import db, migrate, jwt, bcrypt
from aldo.controllers.user_controller import user_bp
from aldo.controllers.tour_controller import tour_bp
from aldo.controllers.upload_controller import upload_bp
from aldo.controllers.booking_controller import booking_bp
import os

mail = Mail()

def create_app():
    app = Flask(__name__, static_folder="static")
    CORS(app)
    
    # Configure your SQL details here
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL', 
        'mysql+mysqlconnector://root:@localhost/aldo'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        "pool_pre_ping": True,
        "pool_recycle": 280
    }
    
    db.init_app(app)
    
    with app.app_context():
        db.create_all()
    
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(tour_bp, url_prefix='/api/tours')
    app.register_blueprint(upload_bp, url_prefix='/api')
    app.register_blueprint(booking_bp, url_prefix='/api/bookings')

    @app.route("/")
    def home():
        return "Flask is serving static files!"

    return app
