var express = require('express');
var template = require('consolidate').handlebars;
var bodyParser = require('body-parser');
var request = require('request');
var cheerio = require('cheerio');
var cookieParser = require('cookie-parser');
var app = express();

app.engine('hbs', template);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(cookieParser());

app.use(express.static(__dirname + '/js'));

app.get('/', function (req, res) {
    if (req.cookies.count) {var count = req.cookies.count}
    else {var count = req.query.count}  // Проверяем есть ли cookie, если нет берем значение из GET параметров
    res.render('index', {
        form: getForm(count),
        script: '<script src="script.js"></script>'
    });
});

app.post('/', function (req, res) {
    request('https://geekbrains.ru/posts', function (error, responce, html) {
        if (error)
            throw error;
        if (responce.statusCode !== 200 ) {
            return console.log('Incorrect StatusCode', responce.statusCode);
        }
        var $ = cheerio.load(html);
        var title = $('a.post-item__title').map(function(ind, elem){return $(elem).text()});
        var preview = $('div.small.search_text').map(function(ind, elem){return $(elem).text()});
        title = title.splice(0, req.body.count);
        preview = preview.splice(0, req.body.count);
        var cont = [];
        for (var i = 0; i < req.body.count; i++) {
            cont[i]= {head: title[i], text: preview[i]};
        }
        res.cookie('count', req.body.count, { maxAge: 36000000 }); //создаем cookie на час
        res.render('index', {
            content: cont
        });
    });

});

var getForm = function (count) {
        return '<form action="/" method="post">'+
        '<p><b>Сколько новых статей показать (1-30):</b><br>'+
        '<input type="range" name="count" id="r1" oninput="showCount()" min="1" max="30" step="1" value="'+ (count || '1') +'">'+
        '<span id="one">'+ (count || '1') +'</span><br>'+
        '<input type="submit" value="Показать" />'+
        '</form>';
};

app.use(function (req, res){
    res.send('404. Такой страницы не существует.')
});

app.listen(8000, function () {
    console.log('Server was running on: ', 8000);
});