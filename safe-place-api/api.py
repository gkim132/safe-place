from flask import Flask

app = Flask(__name__)


@app.route("/location")
def index():
    return {"lat": 43.083982884720356, "lng": -89.43660402022822}

