const mongoose = require('mongoose')

const WalletSchema = new mongoose.Schema({
    coin: String,
    amount: String,
})

module.exports = mongoose.model('Wallet', WalletSchema)