var request = require('request');
var cheerio = require('cheerio');

request('https://geekbrains.ru/posts', function (error, responce, html) {
    if (error)
        throw error;
    if (responce.statusCode !== 200 ) {
        return console.log('Incorrect StatusCode', responce.statusCode);
    }
    var $ = cheerio.load(html);
    var title = $('a.post-item__title').map(function(ind, elem){return $(elem).text()});
    console.log('Список новых статей на GeekBrains:\n');
    title.forEach(function(item, i, arr) {
        console.log(item);
    });
});