const express = require('express');
const pool = require('../utils/db');
const result = require('../utils/result');

const router = express.Router();

//Get all movies
router.get('/allMovies', (req, res) => {
    const sql = `SELECT * FROM movies;`;
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data));
    });
});

// 2. Get a single movie by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM movies WHERE id = ?;`;
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Add a new movie
router.post('/addMovie', (req, res) => {
    const { title, releaseDate } = req.body;
    const sql = `INSERT INTO movies (title, releaseDate) VALUES (?, ?);`;
    pool.query(sql, [title, releaseDate], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Delete a movie by ID
router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM movies WHERE id = ?;`;
    pool.query(sql, [id], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

//Update a movie by ID
router.put('/update/id', (req, res) => {
    const { id } = req.params;
    const { title, releaseDate } = req.body;
    const sql = `UPDATE movies SET title = ?, releaseDate = ? WHERE id = ?;`;
    pool.query(sql, [title, releaseDate, id], (error, data) => {
        res.send(result.createResult(error, data));
    });
});


module.exports = router;
