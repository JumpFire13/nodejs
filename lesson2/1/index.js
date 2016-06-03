var readline = require('readline');
var random = require('random-js')();
var fs = require('fs');
var arg = process.argv;
var file = arg[2];

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('*** Игра "Орел или решка" ***');

rl.question('Орел или решка? 1 или 2\n', function(answer) {
    var monet = random.integer(1, 2);
    if (monet == answer) {
        console.log('Вы угадали!');
        if (file !== undefined) {
            fs.appendFile(file, 'Вы угадали!\n');
        }
    } else {
        console.log('Вы не угадали.');
        if (file !== undefined) {
            fs.appendFile(file, 'Вы не угадали!\n');
        }
    }
    rl.close();
});
