const mongoose = require('mongoose');

const connectDB = async () => {

    await mongoose.connect('mongodb+srv://namastedev:oqVLJwXThphZypL4@namastenode.kfqtzhz.mongodb.net/devTinder');
};

module.exports = connectDB;

