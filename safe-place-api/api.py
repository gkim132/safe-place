from flask import Flask
from os import environ
import populartimes


app = Flask(__name__)

API_KEY = environ.get("API_KEY")
# @app.route("/location")
# def index():
#     return {"lat": 43.083982884720356, "lng": -89.43660402022822}
# ChIJMwrMIKelfDURFATcnSITUWM


@app.route("/placeId/<place_Id>")
def index(place_Id):
    data = populartimes.get_id(API_KEY, place_Id)
    return data

