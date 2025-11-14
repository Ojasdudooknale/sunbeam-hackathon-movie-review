const express = require('express');
const pool = require('../utils/db');
const result = require('../utils/result');

const router = express.Router();

//add revies for a movie
router.post('/add', (req, res) => {
    const userId = req.id; 
    const { movieId, review, rating } = req.body;
    const modified = new Date(); 

    const sql = `INSERT INTO reviews (movieId, review, rating, userId, modified) VALUES (?, ?, ?, ?, ?);`;
    
    pool.query(sql, [movieId, review, rating, userId, modified], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Get all reviews for a specific movie
router.get('/movie/:movieId', (req, res) => {
    const { movieId } = req.params;
    const sql = `
        SELECT 
            r.id AS reviewId, r.review, r.rating, r.modified,
            u.firstName, u.lastName, u.email
        FROM 
            reviews r
        JOIN 
            users u ON r.userId = u.id
        WHERE 
            r.movieId = ?
        ORDER BY
            r.modified DESC;
    `;
    
    pool.query(sql, [movieId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Get all reviews written by the currently logged-in user
router.get('/myReviews', (req, res) => {
    const userId = req.id; 

    const sql = `
        SELECT 
            r.id AS reviewId, r.review, r.rating, r.modified,
            m.title AS movieTitle
        FROM 
            reviews r
        JOIN
            movies m ON r.movieId = m.id
        WHERE 
            r.userId = ?
        ORDER BY
            r.modified DESC;
    `;
    
    pool.query(sql, [userId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Delete a specific review 
router.delete('/delete/:reviewId', (req, res) => {
    const userId = req.id; 
    const { reviewId } = req.params; 

    const sql = `DELETE FROM reviews WHERE id = ? AND userId = ?;`;
    
    pool.query(sql, [reviewId, userId], (error, data) => {
        if (data && data.affectedRows === 0) {
            res.send(result.createErrorResult("Review not found or user not authorized to delete it."));
        } else {
            res.send(result.createResult(error, data));
        }
    });
});


module.exports = router;
