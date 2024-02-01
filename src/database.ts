const mongoose = require('mongoose');

const { keys } = require('./keys');

mongoose.connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then((db: any) => console.log("Database connection established!"))
    .catch((err: any) => { console.log("Error connecting Database instance due to:", err) });// Connect MongoDB Atlas using mongoose connect method

