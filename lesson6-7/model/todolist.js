// Пример модуля для обработки задач
var mysql = require('mysql');
var config = require('./config');
var connectionPool = mysql.createPool(config);

var todoList = {
    // Получение всех задач
    list: function (callback) {
        connectionPool.getConnection(function (err, connection) {
                if (err)
                    throw err;

                connection.query('select * from todos;', function(err, rows){
                    if (err)
                        throw err;
                    callback(rows);
                    connection.release();
                });
        });
    },

    // Добавить задачу
    add: function (text, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                throw err;

            connection.query('insert into todos (text, completed) values (?, "false");', [text], function(err, rows){
                if (err)
                    throw err;
                callback();
                connection.release();
            });
        });
    },

    // Изменить описание задачи
    change: function (id, newText, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                throw err;

            connection.query('update todos set text=? where id=?;', [newText, id], function(err, rows){
                if (err)
                    throw err;
                callback();
                connection.release();
            });
        });
    },

    // Изменить приоритет задачи
    prior: function (id, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                throw err;

            connection.query('update todos set priority="high" where id=?;', [id], function(err, rows){
                if (err)
                    throw err;
                callback();
                connection.release();
            });
        });
    },

    // Отметить задачу как сделанную
    complete: function (id, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                throw err;

            connection.query('update todos set completed="true" where id=?;', [id], function(err, rows){
                if (err)
                    throw err;
                callback();
                connection.release();
            });
        });
    },

    // Удаление задачи
    delete: function (id, callback) {
        connectionPool.getConnection(function (err, connection) {
            if (err)
                throw err;

            connection.query('delete from todos where id=?;', [id], function(err, rows){
                if (err)
                    throw err;
                callback();
                connection.release();
            });
        });
    }
};

module.exports = todoList;