const { Schema } = require('mongoose');

const Enum = require("./enum");

const UserSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	photo: String,
	type: {
		type: String,
		enum: Enum.USER_TYPE,
		uppercase: true,
	},
}, { versionKey: false });


const model = mongoose.model('User', UserSchema, 'users');

module.exports = model;