const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aditya@23',
    database: 'MOVIE_REVIEWS'
})

module.exports = pool;