var clc = require('cli-color');
var fs = require('fs');
var ask = require('./util').ask;
var ncp = require('ncp').ncp;

function askProjectName(cb) {
    ask('Project name?: ', cb);
}

function createDirectories(projectName) {
    const projectDir = process.cwd() + '/' + projectName;
    fs.mkdirSync(projectDir);
    fs.mkdirSync(projectDir + '/' + projectName + '-server');
    fs.mkdirSync(projectDir + '/' + projectName + '-client-core');
    fs.mkdirSync(projectDir + '/' + projectName + '-clinet-web');
    fs.mkdirSync(projectDir + '/' + projectName + '-clinet-mobile');
    fs.mkdirSync(projectDir + '/' + projectName + '-birchconfig');
}

function createAppConfig(projectName) {
    const projectDir = process.cwd() + '/' + projectName;
    const config = {
        projectName: projectName
    };
    fs.writeFileSync(projectDir + '/' + projectName + '-birchconfig/project.config.json', JSON.stringify(config, null, '\t'));
}

// function createServerApp(projectName) {
//     const source = __dirname+
//     ncp(source, destination, function (err) {
//         if (err) {
//             return console.error(err);
//         }
//         console.log('done!');
//     });
// }

exports.createApp = function createApp(appName) {
    if(appName) {
        createDirectories(appName);
        createAppConfig(appName);
        return console.log(appName + ' ' + clc.green('created!'));
    } else {
        askProjectName(function(appName) {
            if(appName) {
                createDirectories(appName);
                createAppConfig(appName);
                return console.log(appName + ' ' + clc.green('created!'));
            } else {
                return console.log(clc.red('App name is undefined'));
            }
        });
    }
};




