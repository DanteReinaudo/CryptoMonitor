const mongoose = require('mongoose')

const VariableSchema = new mongoose.Schema({
    name: String,
    type: String,
    value: String,
    userId:String,
})

module.exports = mongoose.model('Variable', VariableSchema)