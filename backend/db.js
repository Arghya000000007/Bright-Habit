const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123',
    database: 'blog',
});

module.exports = db;