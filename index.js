var createApp = require('./commands/create').createApp;

exports.create = function(appName) {
    createApp(appName);
};

