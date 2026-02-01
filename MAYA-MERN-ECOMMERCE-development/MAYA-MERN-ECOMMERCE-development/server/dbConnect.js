const mongoose = require('mongoose');
require("dotenv").config();

let mongoDBUrl = process.env.DB_URI;

mongoose.connect(mongoDBUrl)

let dbConnect = mongoose.connection;

dbConnect.on('error', () => {
    console.log("errorrrrrr");
});

dbConnect.on('connected', () => {
    console.log('mongodb connected');
});

module.exports = mongoose;