const mongoose = require('mongoose')

const MarketSchema = new mongoose.Schema({
    coin: String,
    value: Array,
    date: Array,
    lastValue:Number
})

module.exports = mongoose.model('Market', MarketSchema)