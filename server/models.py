from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__='users_table'
    
    serialize_rules = ('-reviews.user',)

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=True)
    
    reviews = db.relationship('Review', back_populates='user', cascade ='all, delete-orphan')
    locations = association_proxy('reviews', 'location')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews_table'
    
    serialize_rules = ('-user.reviews', 'location.reviews',)
    
    id = db.Column(db.Integer, primary_key=True)
    title =  db.Column(db.String)
    spooky_score = db.Column(db.Integer, nullable=False)
    spooky_review =  db.Column(db.String, nullable=False)
    hospitality_score = db.Column(db.Integer)
    hospitality_review =  db.Column(db.String)
    image = db.Column(db.String)
    date = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations_table.id'), nullable=False)
    user = db.relationship('User', back_populates='reviews')
    location = db.relationship('Location', back_populates='reviews')
    
class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations_table'
    
    serialize_rules = ('-reviews.location',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    latitude = db.Column(db.String)
    longtitude = db.Column(db.String)
    
    reviews = db.relationship('Review', back_populates='location', cascade ='all, delete-orphan')
    Users = association_proxy('reviews', 'user')