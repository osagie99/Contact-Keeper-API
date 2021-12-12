const mongoose = require ('mongoose');
const config = require ('config');

const db = config.get('mongoURI')

const connectDB = async () => {
    await mongoose.connect(db, {})
    .then (() => console.log('Database Connect'))
    .catch((err) => {
        console.error(err.message)
        process.exit(1);
    })
}

module.exports = connectDB;
