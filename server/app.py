import time

# Local imports
from config import api, app, bcrypt, db
from flask import jsonify, make_response, request, session
from flask_restful import Resource
# Add your model imports
from models import Location, Review, User

URL_PREFIX = '/api'

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
            first_name = data['first_name'],
            last_name = data['last_name'],
            image = data['image'],
            email = data['email'],
            password_hash = password_hash
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
        review = Review.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(review), 200)
        
    def delete(self,id):
        review = db.session.get(Review, id)
        db.session.delete(review)
        db.session.commit()
        return {}, 204

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict(rules=('-location.reviews',)) for review in Review.query.all()]
        return make_response(jsonify(reviews), 200)
    
    def post(self):
        data = request.get_json()
        current_time = time.strftime("%Y-%m-%d %H:%M:%S")
        new_review = Review(
            title = data['title'],
            spooky_score = data['spooky_score'],
            spooky_review = data['spooky_review'],
            hospitality_review = data['hospitality_review'],
            image = data['image'],
            hospitality_score = data['hospitality_score'],
            date = current_time,
            user_id = data['user_id'],
            location_name  = data['location_name']
        )
        db.session.add(new_review)
        db.session.commit()
        return make_response(new_review.to_dict(), 201)
    
    
class LocationById(Resource):
    def get(self,id):
        location = Location.query.filter_by(id=id).first().to_dict()
        return make_response(jsonify(location), 200)

    def delete(self, id):
        location = db.session.get(Location, id)
        db.session.delete(location)
        db.session.commit()
        return {}, 204
class Locations(Resource):
    def get(self):
        locations = [location.to_dict() for location in Location.query.all()]
        return make_response(jsonify(locations), 200)
    
    def post(self):
        data = request.get_json()
        new_location = Location(
            name = data['name'],
            address = data['address'],
            latitude = data['latitude'],
            longtitude = data['longtitude']
        )
        db.session.add(new_location)
        db.session.commit()
        return make_response(new_location.to_dict(), 201)
    
api.add_resource(Users, URL_PREFIX + '/users')
api.add_resource(Locations, URL_PREFIX + '/locations')
api.add_resource(Reviews, URL_PREFIX + '/reviews')
api.add_resource(UserById, URL_PREFIX + '/users/<int:id>')
api.add_resource(ReviewById, URL_PREFIX + '/reviews/<int:id>')
api.add_resource(LocationById, URL_PREFIX + '/locations/<int:id>')

# SESSION LOGIN/LOGOUT#

@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    email=data.get('email')
    user = User.query.filter(User.email == email).first()
    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        session["user_id"] = user.id
        return user.to_dict(), 201
    else:
        return { "message": "Invalid email or password" }, 401
    

@app.get(URL_PREFIX + '/check_session')
def check_session():
    user_id = session.get("user_id")
    user = User.query.filter(User.id == user_id).first()
    if user:
        return user.to_dict(), 200
    else:
        return { "message": "No logged in user" }, 401
    

@app.delete(URL_PREFIX + '/logout')
def logout():
    print("Logout route (DELETE) in backend accessed successfully.")
    print("Attempting to retrieve session credential for user ID.")
    user_id = session.get("user_id")
    print("User ID credential retrieved via session storage.")
    print("Attempting to retrieve matching user based on matched ID.")
    user = User.query.filter(User.id == user_id).first()
    print("Matching user (based on ID) retrieved successfully.")
    print("Attempting to remove user from session storage.")
    
    # NOTE: To remove the user, we can leverage the same functionality provided 
    #       by `session['user_id'] = ...`, where instead of passing in a 
    #       object attribute corresponding to the user's ID, we can simply pass
    #       in nothing, or `None`.
    # session.pop(user)
    session["user_id"] = None
    print("User removed successfully.")
    print("Returning empty user object with 204 status code.")
    return {}, 204


if __name__ == '__main__':
    app.run(port=5555, debug=True)