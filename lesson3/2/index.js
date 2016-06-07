var request = require('request');
var arg = process.argv;
arg.splice(0, 2);
var textTranslate = arg.join(' ');

request('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160607T141554Z.a49cd65e8a64ae9e.e7a7e7567f94b273870554f8c9df76f0e0cc988f&lang=en-ru&text=' + textTranslate, function (error, responce, answer) {
    if (error)
        throw error;
    if (responce.statusCode !== 200 ) {
        return console.log('Incorrect StatusCode', responce.statusCode);
    }
    answer = JSON.parse(answer);
    console.log(answer.text[0]);
});