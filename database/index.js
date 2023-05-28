const mongoose = require('mongoose');
const { dbHost, dbUser, dbPassword, dbPort, dbName } = require('../config/index');

mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


module.exports = db;
