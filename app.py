# app.py
from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from extensions import db
from models import Job, Review

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/job')
def job():
    return render_template('job.html')

@app.route('/search')
def search():
    jobs = Job.query.all()
    return render_template('search.html', jobs=jobs)

@app.route('/search_results', methods=['GET'])
def search_results():
    job_name = request.args.get('job_name')
    jobs = Job.query.filter(Job.title.ilike(f'%{job_name}%')).all()
    reviews = Review.query.filter(Review.job_id.in_([job.id for job in jobs])).all()
    return render_template('search_results.html', jobs=jobs, reviews=reviews)


@app.route('/review', methods=['GET', 'POST'])
def review():
    if request.method == 'POST':
        job_title = request.form['job_title']
        new_job_title = request.form.get('new_job_title')
        rating = request.form['rating']
        comment = request.form['comment']
        
        if job_title == 'new' and new_job_title:
            job = Job.query.filter_by(title=new_job_title).first()
            if not job:
                job = Job(title=new_job_title, description="Description not provided.")
                db.session.add(job)
                db.session.commit()
        else:
            job = Job.query.filter_by(title=job_title).first()
        
        if job:
            # Create a new review instance
            new_review = Review(job_id=job.id, rating=rating, comment=comment)
            db.session.add(new_review)
            db.session.commit()
            return "Form submitted successfully"
        else:
            return "Job not found", 404
    else:
        # Render the review form with job options
        jobs = Job.query.all()
        return render_template('review.html', jobs=jobs)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created
    app.run(debug=True)
