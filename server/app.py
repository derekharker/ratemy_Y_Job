from flask import Flask, render_template, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from extensions import db
from sqlalchemy.sql import func
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db?timeout=60'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app);

db.init_app(app)
migrate = Migrate(app, db)

class Job(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    reviews = db.relationship('Review', backref='job', lazy=True)

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    job_id = db.Column(db.Integer, db.ForeignKey('job.id'), nullable=True)
    job_title = db.Column(db.String(100), nullable=False)
    department = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    supervisor_rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    pay = db.Column(db.Float, nullable=False)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/review', methods=['GET', 'POST'])
def review():
    print(f"This is the json that came in: {request.json}")
    predefined_departments = [ 'Aerospace Studies', 'Alumni Aspen Grove', 'Athletics', 'Ballard Center', 'Biology', 'Brand & Creative',
        'BYU Security', 'BYU Store Campus Store', 'BYUB Operations', 'Campus Life Facilities', 'CE Multimedia Services',
        'Communications', 'Cougareat', 'Custodial', 'Dean\'s Office Education', 'Dean\'s Office FHSS', 'Dining Services',
        'Enrollment Services Office', 'Facilities', 'Financial Accountant', 'Fine Arts', 'Geography', 'Housing Administration',
        'Humanities', 'Intramurals', 'IT Administration', 'IT Offices', 'HBLL Library', 'Life Sciences', 'Marriott School',
        'Mathematics Laboratory', 'Mechanical Engineering', 'Multicultural', 'Museum of Art', 'Physics and Astronomy',
        'Public Service and Ethics', 'Research Administration', 'Special Events', 'Student Life Wellness', 'Theatre and Media Arts']
    
    predefined_job_list = ['Software Trainer', 'Makerspace']

    if request.method == 'POST':
        job_title = request.json['jobTitle']
        department = request.json['department']
        rating = request.json['rating']
        supervisor_rating = request.json['supervisorRating']
        comment = request.json['comment']
        pay = request.json['pay']

        job = Job.query.filter_by(title=job_title, department=department).first()
        if not job and job_title != "Other":
            job = Job(title=job_title, department=department)
            db.session.add(job)
            db.session.commit()
        elif job_title == "Other":
            job_title = request.form['custom_job_title']

        new_review = Review(
            job_id=job.id if job else None,
            job_title=job_title,
            department=department,
            rating=rating,
            supervisor_rating=supervisor_rating,
            comment=comment,
            pay=pay
        )
        db.session.add(new_review)
        db.session.commit()
        return jsonify({"Message: ": "Review Submitted Successfully!"}), 200
        

    else:
        return jsonify({"Message: ": "Not sure why you're doing a GET method..."}), 200
        # return render_template('review.html', jobs=predefined_job_list, departments=predefined_departments)

@app.route('/review/success')
def review_success():
    return render_template('review_success.html')

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('job_name', '')
    job_ratings = get_sorted_jobs(query)
    return render_template('search.html', job_ratings=job_ratings, query=query)

@app.route('/autocomplete', methods=['GET'])
def autocomplete():
    query = request.args.get('query', '')
    job_ratings = get_sorted_jobs(query)
    # app.logger.info(job_ratings)  # Uncomment to see the job ratings in the console; for debugging purposes
    return jsonify(job_ratings)

def get_sorted_jobs(query):
    jobs = Job.query.all()

    job_ratings = []
    for job in jobs:
        average_rating = db.session.query(func.avg(Review.rating)).filter_by(job_id=job.id).scalar()
        total_ratings = db.session.query(func.count(Review.id)).filter_by(job_id=job.id).scalar()

        relevance = 0
        jobName, jobDepartment = query.rsplit(" (", 1)
        jobDepartment = jobDepartment.rsplit(")")[0]
        if jobName.lower() in job.title.lower():
            relevance += 2  # Higher weight for title match
        if jobDepartment.lower() in job.department.lower():
            relevance += 1  # Lower weight for department match

        job_ratings.append({
            'id': job.id,
            'title': job.title,
            'department': job.department,
            'average_rating': round(average_rating, 2) if average_rating else 'No ratings',
            'total_ratings': total_ratings,
            'relevance': relevance
        })

    # Sort jobs by relevance and then by title as a secondary sort key
    job_ratings.sort(key=lambda x: (-x['relevance'], x['title']))
    return job_ratings

@app.route('/job/<int:job_id>')
def job_detail(job_id):
    job = Job.query.get_or_404(job_id)
    reviews = Review.query.filter_by(job_id=job.id).all()
    average_rating = db.session.query(func.avg(Review.rating)).filter_by(job_id=job.id).scalar()
    average_supervisor_rating = db.session.query(func.avg(Review.supervisor_rating)).filter_by(job_id=job.id).scalar()
    
    reviews_list = [
        {
            "id": review.id,
            "rating": review.rating,
            "supervisor_rating": review.supervisor_rating,
            "pay": review.pay,
            "comment": review.comment
        } for review in reviews
    ]

    job_info = {
        "job": {
            "title": job.title,
            "department": job.department,
        },
        "reviews": reviews_list,
        "average_rating": average_rating,
        "average_supervisor_rating": average_supervisor_rating,
    }

    return jsonify(job_info)
    
    # return render_template('job_detail.html', job=job, reviews=reviews, 
    #                        average_rating=average_rating, 
    #                        average_supervisor_rating=average_supervisor_rating)

@app.route('/search_results', methods=['GET'])
def search_results():
    query = request.args.get('job_name')
    jobs = Job.query.filter((Job.title.like(f'%{query}%')) | (Job.department.like(f'%{query}%'))).all()
    reviews = Review.query.all()

    return render_template('search_results.html', jobs=jobs, reviews=reviews)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=8000)
