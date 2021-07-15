const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/CVmaker';

const db = mongoose.connect(mongoUri);

module.exports = db;
