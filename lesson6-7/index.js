var app = require('express')();
var template = require('consolidate').handlebars;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var todo = require('./model/todolist.js');

app.engine('hbs', template);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(cookieParser()); // req.cookies
app.use(session({keys: ['megasecretkey']})); // req.session
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

// Настройка стратегии авторизации
passport.use(new LocalStrategy(function (username, pass, done) {
    // Проверяем авторизационные данные
    if (username === 'admin' && pass === 'admin')
        return done(null, {username: username});

    done(null, false);
}));

// Метод сохранения данных пользователя в сессии
passport.serializeUser(function (user, done) {
    done(null, user.username);
});

// Метод извлечения данных пользователя из сессии
passport.deserializeUser(function (username, done) {
    done(null, {username: username});
});

// Получаем все задачи
app.get('/', mustBeAuthentificated, function (req, res) {
    todo.list(function (rows) {
        res.render('index', {
            table: rows,
            user: req.user.username
        });
    });
});

// Отмечаем задачу выполненной
app.get('/comp/:id', mustBeAuthentificated, function (req, res) {
    var id = +req.params.id;
    todo.complete(id, function () {
        res.redirect('/');
    });
});

// Повышаем приоритет задачи
app.get('/prior/:id', mustBeAuthentificated, function (req, res) {
    var id = +req.params.id;
    todo.prior(id, function () {
        res.redirect('/');
    });
});

// Удаляем задачу
app.get('/del/:id', mustBeAuthentificated, function (req, res) {
    var id = +req.params.id;
    todo.delete(id, function () {
        res.redirect('/');
    });
});

// Добавляем задачу
app.post('/add', mustBeAuthentificated, function (req, res) {
        todo.add(req.body.add, function () {
            res.redirect('/');
        });
});

// Изменяем название задачи
app.post('/name', mustBeAuthentificated, function (req, res) {
        todo.change(req.body.btn, req.body.nameTask, function () {
            res.redirect('/');
        });
});

app.get('/login', function (req, res) {
    res
        .status(200)
        .send(
            '<form action="/login" method="post">' +
            'Login: ' +
            '<input type="text" name="username" />' +
            '<input type="password" name="password" />' +
            '<input type="submit" />' +
            '</form>');
});

// Обработчик запроса на авторизацию
app.post('/login', bodyParser.urlencoded({extended: false}), passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

// Страница выхода
app.get('/logout', function (req, res) {
    req.logout(); // выполняем выход через passportJS
    res.redirect('/'); // переход на главную
});

// Метод для проверки пользователя
function mustBeAuthentificated(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login'); // переход на страницу логина
}

app.use(function (req, res) {
    res
        .status(404)
        .send('Ошибка 404. Такой страницы не существует.')
});

app.listen(8000, function () {
    console.log('Server was running on: ', 8000);
});