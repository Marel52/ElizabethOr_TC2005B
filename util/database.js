const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    database: 'marels',
    port: 3306
});

module.exports = pool.promise();