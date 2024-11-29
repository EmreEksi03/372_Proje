from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

# MySQL configuration
app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Berromerro12'
app.config['MYSQL_DB'] = 'game_platform'

# Initialize MySQL
mysql = MySQL(app)
