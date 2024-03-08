const mongoose = require('mongoose');
const { Schema } = mongoose;

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
	type: {
		type: String,
		enum: Enum.USER_TYPE,
		uppercase: true,
	},
}, { versionKey: false });

const model = mongoose.model('User', UserSchema, 'users');


const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [
	filter,
	{ performanceExperts: 0, athletes: 0, status: 0, ...projection },
	options
]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [
	filter,
	{ performanceExperts: 0, athletes: 0, status: 0, ...projection },
	options
]);

const fod = model.findOneAndDelete;
model.findOneAndDelete = (filter = {}, options) => fod.apply(model, [
	filter,
	options
]);

const fore = model.findOneAndReplace;
model.findOneAndReplace = (filter = {}, replacement, options) => fore.apply(model, [
	filter,
	replacement,
	options
]);

const fou = model.findOneAndUpdate;
model.findOneAndUpdate = (filter = {}, update, options) => fou.apply(model, [
	filter,
	update,
	options
]);


module.exports = model;