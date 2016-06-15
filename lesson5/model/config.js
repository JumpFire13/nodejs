var mysql = require('mysql');

// Настройка пула соединения
var connectionPool = mysql.createPool({
    host: 'localhost',
    database: 'todo',
    user: 'root',
    pass: ''
});

module.exports = connectionPool;