CREATE DATABASE MOVIE_REVIEWS;
USE MOVIE_REVIEWS;

-- Create the movies table
CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    `release` DATE
);

-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name TEXT,
    last_name TEXT,
    email VARCHAR(255) UNIQUE,
    password TEXT,
    mobile TEXT,
    birth DATE
);

-- Create the reviews table with ON DELETE CASCADE for user_id
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    review TEXT,
    rating INT,
    user_id INT,
    modified TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE, -- Ensures reviews are deleted when a user is deleted
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);

-- Create the shares junction table with ON DELETE CASCADE for user_id and review_id
CREATE TABLE shares (
    review_id INT,
    user_id INT,
    PRIMARY KEY (review_id, user_id),
    FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
