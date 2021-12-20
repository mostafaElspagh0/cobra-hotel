const mongoose = require('mongoose');
const config = require('config');

function dbURI() {
    const dbConfig = config.get('database_config');
    if(dbConfig.uri) {
        return dbConfig.uri;
    }
    if (dbConfig.type !== 'mongodb') {
        throw new Error('Invalid database type');
    }
    if (!dbConfig.host || !dbConfig.port) {
        throw new Error('Invalid database configuration');
    }
    if (dbConfig.username && dbConfig.password) {
        return `mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
    }
    return `mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`;
}

function registerModels() {
    require ('./models/user');
}

function registerEventHandlers() {
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open to ' + dbURI());
    });

    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

async function initDb() {
    await mongoose.connect(dbURI());
    registerEventHandlers();
    registerModels();
}

module.exports = {
    initDb
}