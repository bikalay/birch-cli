#!/usr/bin/env node

var birchCli = require('../index.js');
var clc = require('cli-color');

var args = process.argv.splice(process.execArgv.length + 2);

var command = args[0];
if (command) {
    switch (command) {
        case 'create':
            birchCli.create(args[1]);
            break;
        default:
            console.log(clc.red('Unknown command ' + command));
            break;
    }
} else {
    console.log('type "birch-cli create [appName]" - to create project');
}
