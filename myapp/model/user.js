var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
		type: String,
		unique: true  //唯一的  用户名相同的不能存储
	}, //昵称
	password: String
});

module.exports = mongoose.model('user', userSchema);