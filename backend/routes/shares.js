const express = require('express');
const pool = require('../utils/db');
const result = require('../utils/result');

const router = express.Router();

//Get reviews that have been shared with the user
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

// 2. Share a review with another user using their EMAIL
router.post('/share', (req, res) => {
    const { reviewId, targetUserEmail } = req.body;

    const findUserIdSql = `SELECT id FROM users WHERE email = ?;`;

    pool.query(findUserIdSql, [targetUserEmail], (error, userData) => {
        if (error || !userData || userData.length === 0) {
            
            return res.send(result.createResult('Target user email not found.'));
        }

        // We found the target user's ID
        const targetUserId = userData[0].id;
        

        if (targetUserId === req.userId) {
             return res.send(result.createResult('Cannot share a review with yourself.'));
        }

        const insertShareSql = `INSERT INTO shares (reviewId, userId) VALUES (?, ?);`;
        
        pool.query(insertShareSql, [reviewId, targetUserId], (shareError, shareData) => {
            if (shareError) {
                if (shareError.code === 'ER_DUP_ENTRY') {
                    res.send(result.createResult('This review has already been shared with this user.'));
                } else {
                    res.send(result.createResult(shareError.message || 'Error sharing review'));
                }
            } else {
                res.send(result.createResult(null, { message: `Review ${reviewId} shared successfully with user ${targetUserId}.` }));
            }
        });
    });
});

module.exports = router;
