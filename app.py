from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from extensions import db
from models import Job, Review

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
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
    predefined_departments = ['Aerospace Studies', 'Alumni Aspen Grove', 'Athletics', 'Ballard Center', 'Biology', 'Brand & Creative',
                              'BYU Security', 'BYU Store Campus Store', 'BYUB Operations', 'Campus Life Facililities', 'CE Multimedia Services',
                              'Communications', 'Cougareat', 'Custodial', 'Dean\'s Office Education', 'Dean\'s Office FHSS', 'Dining Services', 'Enrollment Services Office',
                              'Facilities', 'Financial Accountant', 'Fine Arts', 'Geography', 'Housing Administration', 'Humanities', 'Intramurals',
                              'IT Administration', 'IT Offices', 'HBLL Library', 'Life Sciences', 'Marriott School', 'Mathematics Laboratory',
                              'Mechanical Engineering', 'Multicultural', 'Museum of Art', 'Physics and Astronomy', 'Public Service and Ethics',
                              'Research Administration', 'Special Events', 'Student Life Wellness', 'Theatre and Media Arts'
    ]
    
    predefined_job_list = [
        'Software Trainer',
        'Makerspace'
        # Add more predefined job titles here as needed
    ]

    predefined_tags = [
        'Tag1','Tag2'
    ]

    if request.method == 'POST':
        job_title = request.form['job_title']
        department = request.form['department']
        rating = request.form['rating']
        supervisor_rating = request.form['supervisor_rating']
        comment = request.form['comment']
        pay = request.form['pay']
        tags = request.form.getlist('tags')  # Retrieve selected tags from the form

        new_job_titles = request.form.get('new_job_titles')
        new_departments = request.form.get('new_departments')

        if new_job_titles:
            with open('new_job_titles.txt', 'a') as f:
                f.write(new_job_titles + '\n')
        
        if new_departments:
            with open('new_departments.txt', 'a') as f:
                f.write(new_departments + '\n')

        # Find or create the job by title
        job = Job.query.filter_by(title=job_title).first()
        if not job and job_title != "Other":
            job = Job(title=job_title, description='')  # Add a default description or modify as needed
            db.session.add(job)
            db.session.commit()
        elif job_title == "Other":
            job_title = None

        # Create a new review instance
        new_review = Review(
            job_id=job.id if job else None,
            department=department,
            rating=rating,
            supervisor_rating=supervisor_rating,
            comment=comment,
            pay=pay,
            tags=tags  # Assign the retrieved tags to the review instance
        )
        db.session.add(new_review)
        db.session.commit()
        return "Form submitted successfully"

    else:
        # Render the review form with predefined options
        return render_template('review.html', jobs=predefined_job_list, departments=predefined_departments, tags=predefined_tags)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created
    app.run(debug=True)
