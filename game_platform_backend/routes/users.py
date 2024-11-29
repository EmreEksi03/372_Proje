from flask import Blueprint, request, jsonify
from models.db import query_db, modify_db

bp = Blueprint('users', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password_hash = data.get('password_hash')
    
    # Insert user into the database
    try:
        modify_db(
            "INSERT INTO Users (username, email, password_hash) VALUES (%s, %s, %s)",
            (username, email, password_hash)
        )
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = query_db("SELECT * FROM Users WHERE user_id = %s", (user_id,), one=True)
    if user:
        return jsonify({
            'user_id': user[0],
            'username': user[1],
            'email': user[2],
            'created_at': user[4]
        })
    return jsonify({'error': 'User not found'}), 404
