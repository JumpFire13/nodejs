var fs = require('fs');
require('sugar');
var arg = process.argv;
var file = arg[2];

if (file !== undefined) {
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        var text = data.toString().lines(),
            total = text.length,
            win = data.toString().each('Вы угадали').length,
            loss = data.toString().each('Вы не угадали').length;
        function maxWin() {
            var max = 0,
                max1 = 0;
            for (var i=0; i < total; i++) {
                if (text[i].has('Вы угадали')) {
                    max1++;
                    max = max1 > max ? max1 : max;
                } else {max1=0}
            }
            return max;
        }
        function maxLoss() {
            var max = 0,
                max1 = 0;
            for (var i=0; i < total; i++) {
                if (text[i].has('Вы не угадали')) {
                    max1++;
                    max = max1 > max ? max1 : max;
                } else {max1=0}
            }
            return max;
        }
        console.log("Общее количество партий:", total);
        console.log("Выигранных партий:", win);
        console.log("Проигранных партий:", loss);
        console.log("Соотношение выигранных/проигранных партий:", win+"/"+loss );
        console.log("Максимальное число побед подряд:", maxWin());
        console.log("Максимальное число проигрышей подряд:", maxLoss());
    });
} else console.log("Не указан файл для анализа");

