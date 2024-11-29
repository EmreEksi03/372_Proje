from flask import Blueprint, jsonify
from models.db import query_db

bp = Blueprint('games', __name__)

@bp.route('/', methods=['GET'])
def get_games():
    games = query_db("SELECT * FROM Games")
    return jsonify([
        {
            'game_id': game[0],
            'title': game[1],
            'description': game[2],
            'release_date': game[3],
            'genre': game[4],
            'price': float(game[5]),
            'metadata': game[6]
        }
        for game in games
    ])
