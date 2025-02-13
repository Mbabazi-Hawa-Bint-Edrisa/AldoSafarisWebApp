from aldo.extensions import db
from sqlalchemy import Column, Integer, String, Float, Text
import json

class Tour(db.Model):
    __tablename__ = 'tourss'

    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=True)
    content = Column(Text, nullable=True)
    country = Column(String(255), nullable=True)
    district = Column(String(255), nullable=True)
    area = Column(String(255), nullable=True)
    price = Column(Float, nullable=True)

    image1 = Column(String(255), nullable=True)
    image2 = Column(String(255), nullable=True)
    image3 = Column(String(255), nullable=True)
    image4 = Column(String(255), nullable=True)

    included = Column(Text, nullable=True)

    def __repr__(self):
        return f"<Tour id={self.id}, title={self.title}>"

    def to_dict(self):
        """
        Optional helper if you want to return JSON data easily.
        Convert included from string->dict if needed.
        """
        try:
            included_dict = json.loads(self.included) if self.included else {}
        except:
            included_dict = {}

        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'country': self.country,
            'district': self.district,
            'area': self.area,
            'price': self.price,
            'image1': self.image1,
            'image2': self.image2,
            'image3': self.image3,
            'image4': self.image4,
            'included': included_dict
        }
