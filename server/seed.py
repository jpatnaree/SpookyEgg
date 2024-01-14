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
                            location_id = 2,
                            date = time.strftime("%Y-%m-%d %H:%M:%S")
        ))
        reviews.append(Review(title = "What the ?!?!", 
                            spooky_score = 5,
                            spooky_review = "I was sleeping in my bed, then I felt like somebody was looking at me. I opened my eyes and saw a man in dirty outfit standing over me on the side of the bed staring at me. I was shocked but got up to turn on the lamp right away. But once I did that, the man was disappeared right in front of me ",
                            hospitality_score = 5,
                            hospitality_review = "clean and solid",
                            user_id = 7,
                            location_id = 1,
                            date = time.strftime("%Y-%m-%d %H:%M:%S")
        ))
        reviews.append(Review(title = "Silly me", 
                            spooky_score = 1,
                            spooky_review = "There was a scary looking shadow wandering around the hallway at 3 am. I was so scared to go out of my room to pick up the food I ordered so I bribe my delivery guy to deliver to my door with extra $20 tip. The next day I found out that ghost thing was just a drunk guy from another floor lost his key and couldn't find his room",
                            hospitality_score = 4,
                            hospitality_review = "very beautiful hotel and friendly staff",
                            user_id = 10,
                            location_id = 3,
                            date = time.strftime("%Y-%m-%d %H:%M:%S")))

        # reviews.append(Review(title = fake.catch_phrase(), 
        #                     spooky_score = randint(1,5),
        #                     spooky_review = fake.sentences(),
        #                     hospitality_score = randint(1,5),
        #                     hospitality_review = fake.bs(),
        #                     user_id = randint(1,10),
        #                     location_id = randint(1,11),
        #                     date = time.strftime("%Y-%m-%d %H:%M:%S")))
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
                    name = "Hotel Chelsea"
                    ))
        locations.append(Location(
                    address= "335 Bowery, New York, NY 10003",
                    latitude = "40.720600",
                    longtitude = "-73.993896",
                    name = "The Bowery Hotel"
                    ))
        locations.append(Location(
                    address= "Veterans Rd W, Staten Island, NY 10309",
                    latitude = "40.554157",
                    longtitude = "-74.215248",
                    name = "The Historic Bermuda Inn"
                    ))
        locations.append(Location(
                    address= "768 5th Ave, New York, NY 10019",
                    latitude = "40.76446",
                    longtitude = "-73.974494",
                    name = " The Plaza"
                    ))
        locations.append(Location(
                    address= "113 Jane Street, Greenwich Village, New York, NY 10014",
                    latitude = "40.738233",
                    longtitude = "-74.009313",
                    name = "The Jane Hotel"
                    ))
        locations.append(Location(
                    address= "56 Main St, Napanoch, NY 12458",
                    latitude = "41.740605",
                    longtitude = "-74.373699",
                    name = "Shanley Hotel"
                    ))
        locations.append(Location(
                    address= "110 Sagamore Rd, Bolton Landing, NY 12814",
                    latitude = "43.555723",
                    longtitude = "-73.64556",
                    name = "The Sagamore Resort"
                    ))
        locations.append(Location(
                    address= "1311 W River Rd, Nichols, NY 13812",
                    latitude = "42.026885",
                    longtitude = "-76.391632",
                    name = "Fainting Goat Island Inn"
                    ))
        locations.append(Location(
                    address= "4069 W Lake Rd, Geneva, NY 14456",
                    latitude = "42.839362",
                    longtitude = "-76.978528",
                    name = "Belhurst Castle"
                    ))
        locations.append(Location(
                    address= "11 Broadway, New York, NY 10004",
                    latitude = "40.705311",
                    longtitude = "-74.01405",
                    name = "Flatiron School"
                    ))
        db.session.add_all(locations)
        db.session.commit()
        print("Done seeding...")
