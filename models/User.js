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


const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [
	filter,
	{...projection, performanceExperts: 0, athletes: 0, status: 0 },
	options
]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [
	filter,
	{...projection, performanceExperts: 0, athletes: 0, status: 0 },
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
	{...filter, type: "ATHLETE" },
	update,
	options
]);


module.exports = model;