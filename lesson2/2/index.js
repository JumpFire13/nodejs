var readline = require('readline');
var luck = require('underscore');
var fs = require('fs');
var arg = process.argv;
var file = arg[2];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('*** Игра "Орел или решка" ***');

rl.question('Орел или решка? Введите 1 или 2:\n', function(answer) {
    var arr = {1:'Орел', 2:'Решка'};
    var monet = luck.random(1, 2);
    if (monet == answer) {
        console.log(arr[monet]+'. Вы угадали!');
        if (file !== undefined) {
            fs.appendFile(file, arr[monet]+'. Вы угадали!\n', function (err) {
                if (err) throw err;
            });
        }
    } else {
        console.log(arr[monet]+'. Вы не угадали.');
        if (file !== undefined) {
            fs.appendFile(file, arr[monet]+'. Вы не угадали.\n', function (err) {
                if (err) throw err;
            });
        }
    }
    rl.close();
});
