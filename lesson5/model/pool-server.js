// Использование пула соединений
var mysql = require('mysql');
var connectionPool = require('./config');

// Внешний метод для использования
function getTasks(callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('select * from todos;', callback);
        connection.release();
    });
}

function addTask(text, callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('insert into todos (text, completed) values (?, "false");', [text], callback);
        connection.release();
    });
}
function updateTask(id, newText, callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('update todos set text=? where id=?;', [newText, id], callback);
        connection.release();
    });
}
function priorTask(id, callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('update todos set priority="high" where id=?;', [id], callback);
        connection.release();
    });
}
function completeTask(id, callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('update todos set completed="true" where id=?;', [id], callback);
        connection.release();
    });
}
function deleteTask(id, callback) {
    connectionPool.getConnection(function (err, connection) {
        if (err)
            throw err;

        connection.query('delete from todos where id=?;', [id], callback);
        connection.release();
    });
}

// Экспорт метода для использования
module.exports.getTasks = getTasks;
module.exports.addTask = addTask;
module.exports.updateTask = updateTask;
module.exports.completeTask = completeTask;
module.exports.priorTask = priorTask;
module.exports.deleteTask = deleteTask;