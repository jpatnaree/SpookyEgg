#!/usr/bin/env python3

# Standard library imports
import time
from random import choice as rc
from random import randint, sample

# Local imports
from app import app
from config import bcrypt
# Remote library imports
from faker import Faker
from models import Location, Review, User, db

users_pictures =['https://i.imgur.com/GLU0AUM.png','https://i.imgur.com/zUdGUa4.png','https://i.imgur.com/wZTdK6G.png','https://i.imgur.com/qY5pyyd.png','https://i.imgur.com/OAKvD5z.jpg','https://i.imgur.com/1nhB0uB.png','https://i.imgur.com/ATWxhhf.png','https://i.imgur.com/7TF33Pq.png','https://i.imgur.com/CZP1Txg.png','https://i.imgur.com/VUi5x4C.png']

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        
        print("Start seeding...")
        User.query.delete()
        users=[]
        for i in range(9):
            users.append(User(first_name = fake.first_name(), 
                            last_name = fake.last_name(),
                            image = users_pictures[i], 
                            email = fake.email(),
                            password_hash= bcrypt.generate_password_hash('boo').decode('utf-8')))
        users.append(User(first_name = "Scooby D", 
                            last_name = "Doo",
                            image = 'https://i.ytimg.com/vi/J4fbjNUTGg4/hqdefault.jpg', 
                            email = "demo@demo.com",
                            password_hash= bcrypt.generate_password_hash('boo').decode('utf-8')))
        db.session.add_all(users)
        db.session.commit()
        
        
        Review.query.delete()
        reviews=[]
        reviews.append(Review(title = "I might have seen something", 
                            spooky_score = 4,
                            spooky_review = "I saw a weird shadow at the end of hallway when I came to my room at 2am. The same night after I fell asleep in my bed, I heard someone was using the shower, so I got up and check. The sound was gone, the bathroom floor was completely dry but I felt the warmth around me and there were the steam on the windows",
                            hospitality_score = 5,
                            hospitality_review = "very nice and stylish hotel",
                            image = "https://s3.amazonaws.com/Ocoos_Sp_Content/2915/product/4-37c9b9bfdc5473d4b36f8f1d3c71745c.jpg",
                            user_id = 5,
                            location_name = 'The Hotel Chelsea',
                            date = time.strftime("%Y-%m-%d %H:%M:%S")
        ))
        reviews.append(Review(title = "What the ?!?!", 
                            spooky_score = 5,
                            spooky_review = "I was sleeping, them I felt like somebody was looking at me. I opened my eyes and saw a man in dirty outfit standing over me on the side of the bed staring at me. I was shocked but got up to turn on the lamp right away. But once I did that, the man was disappeared right in front of me ",
                            hospitality_score = 5,
                            hospitality_review = "clean and solid",
                            user_id = 7,
                            location_name = 'The Algonquin Hotel',
                            date = time.strftime("%Y-%m-%d %H:%M:%S")
        ))
        reviews.append(Review(title = "Silly me", 
                            spooky_score = 1,
                            spooky_review = "I saw a shadow wandering around the hallway at 3 am. I was so scared to go out of my room to pick up the food I ordered so I bribe my delivery guy to deliver to my door with extra $20 tip. The next day I found out that ghost thing was just a drunk guy from the other floor couldn't find his room",
                            hospitality_score = 5,
                            hospitality_review = "very beautiful hotel and friendly staff",
                            user_id = 10,
                            location_name = 'The Bowery Hotel',
                            date = time.strftime("%Y-%m-%d %H:%M:%S")))
        db.session.add_all(reviews)
        db.session.commit()
        
        Location.query.delete()
        locations = []
        locations.append(Location(
                    address= "59 W 44th St, New York, NY 10036",
                    latitude = "40.75553",
                    longtitude = "-73.9819",
                    name = "The Algonquin Hotel"
                    ))
        locations.append(Location(
                    address= "222 W 23rd St, New York, NY 10011",
                    latitude = "40.744484",
                    longtitude = "-73.996937",
                    name = "The Hotel Chelsea"
                    ))
        locations.append(Location(
                    address= "335 Bowery, New York, NY 10003",
                    latitude = "40.720600",
                    longtitude = "-73.993896",
                    name = "The Bowery Hotel"
                    ))
        db.session.add_all(locations)
        db.session.commit()
        print("Done seeding...")
