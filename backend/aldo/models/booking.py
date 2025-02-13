from aldo.extensions import db
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.sql import func

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    tour_id = Column(Integer, ForeignKey('tourss.id'), nullable=False)
    date = Column(DateTime, nullable=False, default=func.now())
    status = Column(String(50), nullable=False, default="Pending")
    total_cost = Column(Float, nullable=False)
    number_of_people = Column(Integer, nullable=False)  

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "tour_id": self.tour_id,
            "date": self.date,
            "status": self.status,
            "total_cost": self.total_cost,
            "number_of_people": self.number_of_people,  
        }
