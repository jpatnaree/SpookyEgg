from config import db
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


class User(db.Model, SerializerMixin):
    __tablename__='users_table'
    
    serialize_rules = ('-reviews.user', '-comments.user', '-reviews.comments.review','-reviews.comments.user','-commnents.review.user')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String, nullable=True)
    
    reviews = db.relationship('Review', back_populates='user', cascade ='all, delete-orphan')
    locations = association_proxy('reviews', 'location')
    comments = db.relationship('Comment', back_populates='user', cascade ='all, delete-orphan' )

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews_table'
    
    serialize_rules = ('-user.reviews', '-location.reviews', '-comments.review', '-user.comments',)
    
    id = db.Column(db.Integer, primary_key=True)
    title =  db.Column(db.String)
    spooky_score = db.Column(db.Integer, nullable=False)
    spooky_review =  db.Column(db.String, nullable=False)
    hospitality_score = db.Column(db.Integer)
    hospitality_review =  db.Column(db.String)
    image = db.Column(db.String)
    date = db.Column(db.String, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    location_name = db.Column(db.String, db.ForeignKey('locations_table.name'), nullable=False)
    user = db.relationship('User', back_populates='reviews')
    location = db.relationship('Location', back_populates='reviews')
    comments = db.relationship('Comment', back_populates='review', cascade ='all, delete-orphan')
    
    
class Comment(db.Model, SerializerMixin):
    __tablename__ = 'comments_table'
    
    serialize_rules = ('-user.comments', '-review.comments', '-review.location.reviews', '-user.reviews')
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    
    
    review_id = db.Column(db.Integer, db.ForeignKey('reviews_table.id'), nullable=False)
    poster_id = db.Column(db.Integer, db.ForeignKey('users_table.id'), nullable=False)
    
    user = db.relationship('User', back_populates='comments')
    review = db.relationship('Review', back_populates='comments')
    
class Location(db.Model, SerializerMixin):
    __tablename__ = 'locations_table'
    
    serialize_rules = ('-reviews.location', '-users.comments', '-users.comments', '-reviews.comments.review', '--reviews.comments.location', '-reviews.user.locations', '-reviews.user.comments',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    latitude = db.Column(db.String)
    longtitude = db.Column(db.String)
    
    reviews = db.relationship('Review', back_populates='location', cascade ='all, delete-orphan')
    Users = association_proxy('reviews', 'user')