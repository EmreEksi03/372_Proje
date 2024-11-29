from flask import Flask
from flask_cors import CORS
from db_config import app, mysql
from routes import users, games, purchases

# Enable CORS for cross-origin requests
CORS(app)

# Root endpoint
@app.route('/')
def home():
    return {"message": "Welcome to the Game Platform API"}

# Register blueprints (modular routes)
app.register_blueprint(users.bp, url_prefix='/users')
app.register_blueprint(games.bp, url_prefix='/games')
app.register_blueprint(purchases.bp, url_prefix='/purchases')

if __name__ == '__main__':
    app.run(debug=True)
