# drop_review_table.py
from extensions import db
from models import Review
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)

def drop_review_table():
    with app.app_context():
        Review.__table__.drop(db.engine)

if __name__ == '__main__':
    drop_review_table()
