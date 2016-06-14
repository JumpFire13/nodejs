var express = require('express');
var template = require('consolidate').handlebars;
var bodyParser = require('body-parser');
var todo = require('./model/todolist.js');
var app = express();

app.engine('hbs', template);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/', function (req, res) {
    if (req.query.del) {
        todo.delete(req.query.del, function () {
            res.redirect('/');  
        });
    } else {
        todo.list(function (rows) {
            res.render('index', {
                table: rows
            });
        });
    }
});

app.post('/', function (req, res) {
    if (req.body.add) {
    todo.add(req.body.add)}
    res.redirect('/');
});

app.use(function (req, res){
    res.send('404. Такой страницы не существует.')
});

app.listen(8000, function () {
    console.log('Server was running on: ', 8000);
});