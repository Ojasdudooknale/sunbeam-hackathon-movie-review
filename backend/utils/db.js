const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'D5-93027-OJASVI',
    password: 'manager',
    database: 'MOVIE_REVIEWS'
})

module.exports = pool;