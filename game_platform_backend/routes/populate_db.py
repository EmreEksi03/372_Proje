import mysql.connector
from faker import Faker
import random
import json
from datetime import datetime

# MySQL veritabanına bağlan
db = mysql.connector.connect(
    host='127.0.0.1',  # MySQL sunucu adresi
    user='root',  # MySQL kullanıcı adı
    password="123123",  # MySQL parola
    database="game_platform"  # Veritabanı adı
)

cursor = db.cursor()

# Faker ile dummy veri oluşturma
fake = Faker()

# Kullanıcılar için dummy veri
def generate_users(num_users):
    users = []
    for _ in range(num_users):
        username = fake.user_name()
        email = fake.email()
        password_hash = fake.password(length=12)  # Parola hash'i için sahte veri
        created_at = fake.date_this_decade()
        users.append((username, email, password_hash, created_at))
    return users

# Oyunlar için dummy veri
def generate_games(num_games):
    games = []
    for _ in range(num_games):
        title = fake.word().capitalize() + " " + fake.word().capitalize()
        description = fake.sentence()
        release_date = fake.date_this_decade()
        genre = random.choice(['Action', 'Adventure', 'RPG', 'Shooter', 'Strategy'])
        price = round(random.uniform(5.99, 59.99), 2)
        metadata = json.dumps({"developer": fake.company(), "platform": random.choice(['PC', 'PS5', 'Xbox'])})
        games.append((title, description, release_date, genre, price, metadata))
    return games

# Kullanıcılar için dummy verileri ekleme
users_data = generate_users(10)
cursor.executemany('''INSERT INTO Users (username, email, password_hash, created_at)
                      VALUES (%s, %s, %s, %s)''', users_data)

# Oyunlar için dummy verileri ekleme
games_data = generate_games(10)
cursor.executemany('''INSERT INTO Games (title, description, release_date, genre, price, metadata)
                      VALUES (%s, %s, %s, %s, %s, %s)''', games_data)

# Veritabanını kaydetme
db.commit()

# Kullanıcıların kütüphaneye oyun eklemesi (Library tablosu)
for user_id in range(1, 11):
    game_id = random.randint(1, 10)
    cursor.execute('''INSERT INTO Library (user_id, game_id)
                      VALUES (%s, %s)''', (user_id, game_id))

# Kullanıcıların oyunlar için inceleme yapması (Reviews tablosu)
for user_id in range(1, 11):
    game_id = random.randint(1, 10)
    rating = random.randint(1, 5)
    comment = fake.text(max_nb_chars=200)
    cursor.execute('''INSERT INTO Reviews (user_id, game_id, rating, comment)
                      VALUES (%s, %s, %s, %s)''', (user_id, game_id, rating, comment))

# Kullanıcılar arasında arkadaşlık ekleme (Friends tablosu)
for user_id in range(1, 6):  # İlk 5 kullanıcı için
    friend_user_id = random.randint(1, 10)
    if user_id != friend_user_id:
        cursor.execute('''INSERT INTO Friends (user_id, friend_user_id, status)
                          VALUES (%s, %s, %s)''', (user_id, friend_user_id, 'Accepted'))

# Veritabanını kaydetme
db.commit()

# Bağlantıyı kapatma
cursor.close()
db.close()

print("Dummy veriler başarıyla eklendi!")
