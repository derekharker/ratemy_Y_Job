import os

directories = ["templates", "static"]
files = {
    "app.py": "",
    "models.py": "",
    "templates/index.html": "",
    "templates/job.html": "",
    "templates/submit_review.html": "",
    "templates/register.html": "",
    "templates/login.html": "",
    "static/style.css": ""
}

for directory in directories:
    os.makedirs(directory, exist_ok=True)

for file_path, content in files.items():
    with open(file_path, 'w') as file:
        file.write(content)

print("Project structure created successfully.")