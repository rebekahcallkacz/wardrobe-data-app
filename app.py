""" Flask application that runs the API and renders the html pages """
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy

# Spin up flask app
app = Flask(__name__)

# Add the connection to the sqlite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wardrobe_data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Get the db instance
db = SQLAlchemy(app)

# Table classes which are based on db schema
class ItemInfo(db.Model):
    __tablename__ = "item_info"
    unique_id = db.Column(db.String, primary_key = True)
    item = db.Column(db.String)
    total_wears = db.Column(db.Integer)
    cost_per_wear = db.Column(db.Integer)
    wears_per_month = db.Column(db.Integer)
    date_acquired = db.Column(db.String)
    cost = db.Column(db.Integer)
    source = db.Column(db.String)
    category = db.Column(db.String)

class WearCount(db.Model):
    __tablename__ = "wear_count"
    unique_id = db.Column(db.String, primary_key = True)
    month = db.Column(db.String)
    wears = db.Column(db.Integer)

# This route renders the homepage
@app.route("/")
def index():
    return render_template("index.html")

# This route returns the data from the database
@app.route("/api/items")
def get_items():
    items = db.session.query(ItemInfo)
    items_parsed = []
    for item in items:
        item_dict = {
            "unique_id": item.unique_id,
            "item": item.item,
            "total_wears": item.total_wears,
            "cost_per_wear": item.cost_per_wear,
            "wears_per_month": item.wears_per_month,
            "date_acquired": item.date_acquired,
            "cost": item.cost,
            "source": item.source,
            "category": item.category
        }
        items_parsed.append(item_dict)
    return jsonify(items_parsed)

@app.route("/api/wears")
def get_wears():
    wears = db.session.query(WearCount, ItemInfo.item, ItemInfo.source, ItemInfo.category).join(ItemInfo, WearCount.unique_id == ItemInfo.unique_id)
    items_parsed = []
    for item in wears:
        item_dict = {
            "unique_id": item[0].unique_id,
            "month": item[0].month,
            "wears": item[0].wears,
            "item": item[1],
            "source": item[2],
            "category": item[3]
        }
        items_parsed.append(item_dict)
    return jsonify(items_parsed)

if __name__ == "__main__":
    app.run(debug=True)