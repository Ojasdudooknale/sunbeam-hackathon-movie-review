CREATE DATABASE MOVIE_REVIEWS; -- Changed database name to camelCase
USE MOVIE_REVIEWS;

-- Create the movies table
CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    releaseDate DATE -- Changed `release` to releaseDate (as `release` is a reserved word)
);

-- Create the users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstName TEXT,     -- Changed first_name to firstName
    lastName TEXT,      -- Changed last_name to lastName
    email VARCHAR(255) UNIQUE,
    password TEXT,
    mobileNo TEXT,
    birthDate DATE      -- Changed birth to birthDate
);

-- Create the reviews table with ON DELETE CASCADE for userId
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movieId INT,        -- Changed movie_id to movieId
    review TEXT,
    rating INT,
    userId INT,         -- Changed user_id to userId
    modified TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movieId) REFERENCES movies(id)
);

-- Create the shares junction table with ON DELETE CASCADE for userId and reviewId
CREATE TABLE shares (
    reviewId INT,       -- Changed review_id to reviewId
    userId INT,         -- Changed user_id to userId
    PRIMARY KEY (reviewId, userId),
    FOREIGN KEY (reviewId) REFERENCES reviews(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
