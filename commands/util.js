const readline = require('readline');

exports.ask = function ask(question, cb) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(question, function(text) {
        cb(text);
        rl.close();
    });
};