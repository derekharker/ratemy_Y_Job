# models.py
from extensions import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    reviews = db.relationship('Review', backref='job', lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    supervisor_rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    pay = db.Column(db.Float, nullable=False)
    tags = db.Column(db.String(100))

    def __repr__(self):
        return f"Review('{self.department}', '{self.rating}', '{self.comment}', '{self.pay}', '{self.tags}')"
