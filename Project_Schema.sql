CREATE DATABASE game_platform;
-- USERS Table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- GAMES Table
CREATE TABLE Games (
    game_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    release_date DATE,
    genre VARCHAR(50),
    price DECIMAL(10, 2) NOT NULL,
    metadata JSON
);

-- LIBRARY Table
CREATE TABLE Library (
    library_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);

-- PURCHASES Table
CREATE TABLE Purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);

-- TAGS Table
CREATE TABLE Tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) UNIQUE NOT NULL
);

-- GAME_TAGS Table
CREATE TABLE Game_Tags (
    game_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (game_id, tag_id),
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id) ON DELETE CASCADE
);

-- ACHIEVEMENTS Table
CREATE TABLE Achievements (
    achievement_id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    metadata JSON,
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);

-- REVIEWS Table
CREATE TABLE Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    rating TINYINT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES Games(game_id) ON DELETE CASCADE
);

-- DEVELOPERS Table
CREATE TABLE Developers (
    developer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    company_name VARCHAR(100),
    website VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- FRIENDS Table
CREATE TABLE Friends (
    user_id INT NOT NULL,
    friend_user_id INT NOT NULL,
    status ENUM('Pending', 'Accepted', 'Blocked') DEFAULT 'Pending',
    PRIMARY KEY (user_id, friend_user_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (friend_user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
