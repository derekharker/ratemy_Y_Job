from app import app, db
from app import User, Job, Review  # Import models

# Create an application context
app_ctx = app.app_context()
app_ctx.push()

# Create database tables
db.create_all()

# Pop the application context
app_ctx.pop()

# kadenWasHere