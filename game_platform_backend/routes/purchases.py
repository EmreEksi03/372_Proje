from flask import Blueprint, request, jsonify
from models.db import query_db, modify_db

bp = Blueprint('purchases', __name__)

@bp.route('/add', methods=['POST'])
def add_purchase():
    data = request.json
    user_id = data.get('user_id')
    game_id = data.get('game_id')
    price_at_purchase = data.get('price_at_purchase')
    
    try:
        modify_db(
            "INSERT INTO Purchases (user_id, game_id, price_at_purchase) VALUES (%s, %s, %s)",
            (user_id, game_id, price_at_purchase)
        )
        return jsonify({'message': 'Purchase added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_purchases(user_id):
    purchases = query_db(
        "SELECT p.purchase_id, g.title, p.purchase_date, p.price_at_purchase "
        "FROM Purchases p "
        "JOIN Games g ON p.game_id = g.game_id "
        "WHERE p.user_id = %s",
        (user_id,)
    )
    return jsonify([
        {
            'purchase_id': purchase[0],
            'game_title': purchase[1],
            'purchase_date': purchase[2],
            'price_at_purchase': float(purchase[3])
        }
        for purchase in purchases
    ])
