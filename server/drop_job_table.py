# drop_review_table.py
from extensions import db
from models import Job
from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)

def drop_review_table():
    with app.app_context():
        Job.__table__.drop(db.engine)
        db.create_all()  # Recreate all tables

if __name__ == '__main__':
    drop_review_table()
