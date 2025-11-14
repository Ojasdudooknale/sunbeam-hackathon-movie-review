const express = require('express');
const pool = require('../utils/db');
const result = require('../utils/result');

const router = express.Router();

// Get all reviews
router.get('/allReviews', (req, res) => {
    const sql = `SELECT * FROM reviews;`;
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Get a single review by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM reviews WHERE id = ?;`;
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Get all reviews for a specific movie ID
router.get('/movie/:movieId', (req, res) => {
    const { movieId } = req.params;
    const sql = `SELECT * FROM reviews WHERE movieId = ?;`;
    pool.query(sql, [movieId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});


//Get reviews belonging to the authenticated user ("Display My Reviews")
router.get('/my', (req, res) => {
    const userId = req.userId; 
    const sql = `SELECT * FROM reviews WHERE userId = ?;`;
    pool.query(sql, [userId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Add a new review ("Create a Review")
router.post('/add', (req, res) => {
    const userId = req.userId;
    const { movieId, review, rating } = req.body;
    const sql = `INSERT INTO reviews (movieId, review, rating, userId) VALUES (?, ?, ?, ?);`;
    
    pool.query(sql, [movieId, review, rating, userId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Update a review by ID ("Edit Review") - Ensures ownership
router.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    const { review, rating } = req.body;
    
    const sql = `UPDATE reviews SET review = ?, rating = ?, modified = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?;`;
    
    pool.query(sql, [review, rating, id, userId], (error, data) => {
        if (data && data.affectedRows === 0) {
            res.status(403).send(result.createResult('Unauthorized access: You do not own this review or it does not exist.'));
        } else {
            res.send(result.createResult(error, data));
        }
    });
});

// 7. Delete a review by ID ("Delete Review") - Ensures ownership
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const userId = req.userId; // From auth middleware

    const sql = `DELETE FROM reviews WHERE id = ? AND userId = ?;`;
    
    pool.query(sql, [id, userId], (error, data) => {
         if (data && data.affectedRows === 0) {
            res.status(403).send(result.createResult('Unauthorized access: You do not own this review or it does not exist.'));
        } else {
            res.send(result.createResult(error, data));
        }
    });
});

module.exports = router;
