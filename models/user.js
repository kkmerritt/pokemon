var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var userSchema = new Schema ({
  username:  String,
  password:  String,
  wins: Number,
  losses: Number
},{collection: 'user', strict: false})

var User = mongoose.model("user", userSchema);

module.exports = User;
