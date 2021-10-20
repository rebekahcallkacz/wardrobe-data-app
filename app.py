""" Flask application that runs the API and renders the html pages """
from flask import Flask, render_template, jsonify

# Spin up flask app
app = Flask(__name__)

# This route renders the homepage
@app.route("/")
def index():
    return render_template("index.html")

# This route returns the data from the database
@app.route("/api/data")
def wardrobe_data():
    return jsonify("This is where the data will be")

if __name__ == "__main__":
    app.run(debug=True)