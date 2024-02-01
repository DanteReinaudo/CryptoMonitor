const mongoose = require('mongoose')

const RuleSchema = mongoose.Schema({
  name: String,
  description: String,
  format: String,
  path:String,
  file_name:String,
});

module.exports = mongoose.model('Rule', RuleSchema)