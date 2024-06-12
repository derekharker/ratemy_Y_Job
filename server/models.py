from extensions import db

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=True)  # Keep this if you still want to reference the job table
    job_title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    supervisor_rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    pay = db.Column(db.Float, nullable=False)
