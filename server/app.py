from flask import request, make_response, jsonify, session
from flask_restful import Resource
import time

# Local imports
from config import app, db, api, bcrypt
# Add your model imports
from models import User, Review, Location

URL_PREFIX = '/api'

# HELPER METHOD #

def current_user():
    if session["user_id"]:
        return User.query.filter(User.id == session["user_id"]).first()
    
class Users(Resource):
    def get(self):
        users = [user.to_dict(rules = ('-password_hash',)) for user in User.query.all()]
        return make_response(jsonify(users), 200)
    
    def post(self):
        data = request.get_json()
        password_hash = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(
            fist_name = data['first_name'],
            last_name = data['last_name'],
            image = data['image'],
            email = data['email'],
            password_hash=password_hash
        )
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id

        return make_response(new_user.to_dict(), 201)

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(user), 200)
    
class ReviewById(Resource):
    def get(self, id):
        review = db.session.get(Review,id)
        return make_response(jsonify(review), 200)

class Review(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(jsonify(reviews), 200)
    
    def post(self):
        data = request.get_json()
        current_time = time.strftime("%Y-%m-%d %H:%M:%S")
        new_review = Review(
            title = data['title'],
            spooky_review = data['spooky_review'],
            hospitality_review = data['hospitality_review'],
            image = data['image'],
            hostpitality_score = data['hostpitality_score'],
            spooky_score = data['spooky_score'],
            date = current_time
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
    
    def patch(self, id):
            review = db.session.get(Review, id)
            try:
                data = request.json
                for key in data:
                    setattr(review, key, data[key])
                db.session.add(review)
                db.session.commit()
                return review.to_dict(), 206
            except Exception as e:
                return {'error': f'{e}'}, 406
        
    def delete(self,id):
        review = db.session.get(Review, id)
        db.session.delete(review)
        db.session.commit()
        return {}, 204
    
class LocationById(Resource):
    def get(self,id):
        location = db.session.get(Location,id)
        return make_response(jsonify(location), 200)
    
class Location(Resource):
    def get(self):
        locations = [location.to_dict() for location in Location.query.all()]
        return make_response(jsonify(locations), 200)
    
    def post(self):
        data = request.get_json()
        new_location = Location(
            name = data['name'],
            address = data['address'],
            latitude = data['latitude'],
            longtitide = data['longtitide']
        )
        db.session.add(new_location)
        db.session.commit()
        return make_response(new_location.to_dict(), 201)
    
    
api.add_resource(Users, URL_PREFIX + '/users')
api.add_resource(Location, URL_PREFIX + '/locations')
api.add_resource(Review, URL_PREFIX + '/reviews')
api.add_resource(UserById, URL_PREFIX + '/users/<int:id>')
api.add_resource(ReviewById, URL_PREFIX + '/reviews/<int:id>')
api.add_resource(LocationById, URL_PREFIX + '/locations/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)