const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    userId: String,
    action: String,
    symbol: String,
    oriqQty: String,
    executedQty: String,
    cummulativeQty: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema)