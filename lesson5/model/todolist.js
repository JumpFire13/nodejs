// Пример модуля для обработки задач
var connect = require('./pool-server.js');

var todoList = {
    // Получение всех задач
    list: function (callback) {
        connect.getTasks(function(err, rows) {
            if (err)
                throw err;
            callback(rows);
        });
    },

    // Добавить задачу
    add: function (text, callback) {
        connect.addTask(text, function (err) {
            if (err)
                throw err;
        })
    },

    // Изменить описание задачи
    change: function (id, newText, callback) {
        connect.updateTask(id, newText, function (err) {
            if (err)
                throw err;
        })
    },

    // Отметить задачу как сделанную
    complete: function (id, callback) {
        connect.completeTask(id, function (err) {
            if (err)
                throw err;
        })
    },

    // Удаление задачи
    delete: function (id, callback) {
        connect.deleteTask(id, function (err) {
            if (err)
                throw err;
        })
    }
};

module.exports = todoList;