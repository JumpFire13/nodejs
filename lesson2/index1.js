var readline = require('readline');
var random = require('random-js')();

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('*** Игра "21 ***"');


rl.question('Вы хотите начать игру? Да или Нет\n', function(answer) {
    if (answer == 'Да') {
        var self = 0;
        var cards = 0;
        var i = 0;
        console.log('Раздаю вам карты...');
        cards = random.integer(1, 10) + random.integer(1, 10);
        console.log('У вас ', cards, 'очков');
        while (i<1) {
            rl.question('Еще карту? Да или Нет\n', function (answer1) {
                if (answer1 == 'Да') {
                    console.log('Даю карту...');
                    cards = +random.integer(1, 10);
                    console.log('У вас ', cards, 'очков');
                } else {return i = 1};
            });
        }
        console.log('Раздаю карты себе...');
        while (self < cards) {
            self = +random.integer(1, 10);
        }
        if (self > cards && self < 22) {
            console.log('У компьютера ', self, 'очков. Вы проиграли');
        }
        else console.log('У компьютера ', self, 'очков. Вы победили!');
    }
    else {
        console.log('До свидания!');
        rl.close();
    }
});
