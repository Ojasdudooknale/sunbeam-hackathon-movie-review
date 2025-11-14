const express = require('express');
const pool = require('../utils/db');
const result = require('../utils/result');

const router = express.Router();

//Get reviews that have been shared with the authenticated user ("Display Reviews Shared with Me")
router.get('/sharedWithMe', (req, res) => {
    const receivingUserId = req.userId; 

    const sql = `
        SELECT r.*, s.userId as recipientUserId
        FROM reviews r
        JOIN shares s ON r.id = s.reviewId
        WHERE s.userId = ?;
    `;
    
    pool.query(sql, [receivingUserId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

// 2. Share a review with another user ("Share Review")
router.post('/share', (req, res) => {
    const { reviewId, targetUserId } = req.body;

    const sql = `INSERT INTO shares (reviewId, userId) VALUES (?, ?);`;
    
    pool.query(sql, [reviewId, targetUserId], (error, data) => {
        if (error && error.code === 'ER_DUP_ENTRY') {
            res.status(409).send(result.createResult('This review has already been shared with this user.'));
        } else {
            res.send(result.createResult(error, data));
        }
    });
});

// 3. Stop sharing a specific review with a specific user (Delete the share record)
router.delete('/unshare', (req, res) => {
    const { reviewId, targetUserId } = req.body;
    
    const sql = `DELETE FROM shares WHERE reviewId = ? AND userId = ?;`;
    
    pool.query(sql, [reviewId, targetUserId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

module.exports = router;
