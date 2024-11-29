from db_config import mysql

def query_db(query, args=(), one=False):
    """Fetch data from the database."""
    cursor = mysql.connection.cursor()
    cursor.execute(query, args)
    rv = cursor.fetchall()
    cursor.close()
    return (rv[0] if rv else None) if one else rv

def modify_db(query, args=()):
    """Insert, update, or delete data."""
    cursor = mysql.connection.cursor()
    cursor.execute(query, args)
    mysql.connection.commit()
    cursor.close()
