from flask import Flask, abort
from os import environ
import populartimes
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

API_KEY = environ.get("API_KEY")
# @app.route("/location")
# def index():
#     return {"lat": 43.083982884720356, "lng": -89.43660402022822}
# ChIJMwrMIKelfDURFATcnSITUWM
@app.route("/test")
def index():
    return "Test"


@app.route("/placeId/<place_Id>")
def index(place_Id):
    # if not place_Id:
    #     return abort(400)
    print("test")
    data = populartimes.get_id(API_KEY, place_Id)
    return data

