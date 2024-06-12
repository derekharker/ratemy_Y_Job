from flask import Flask, jsonify  # potentially use a virtual env ?
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')  # Consider limiting domains with CORS policy

@app.route('/api/users', methods=['GET'])
def users():
    return jsonify(
        {
            "users": [
                'Harry',
                'Ben',
                'Derek',
                'Kaden',
                'Michael'
            ]
        }
    )

if __name__ == '__main__':
    app.run(debug=True, port=8080)