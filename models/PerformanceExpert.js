const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./enum");

const IncapsultedAthleteSchema = require("./incapsulated/IncapsultedAthlete")

const PerformanceExpertSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	photo: String,
	title: String,
	type: {
		type: String,
		enum: Enum.USER_TYPE,
		uppercase: true,
		default: Enum.USER_PERFORMANCE_EXPERT,
		immutable: true
	},
	athletes: {
		type: [IncapsultedAthleteSchema],
		required: false
	},
}, { versionKey: false });

PerformanceExpertSchema.methods.hasAthlete = (_id) => {
	return this.athletes.filter(x => x._id == _id).length > 0 || null;
}

PerformanceExpertSchema.methods.addAthelte = (athelte) => {
	if (!this.hasAthlete(athelte))
		return false
	let { _id, name, surname, photo, speciality, status } = athelte
	this.athletes.push({ _id, name, surname, photo, speciality, status });
}

PerformanceExpertSchema.methods.removeAthelte = (_id) => {
	this.athletes = this.athletes.filter(x => x._id != _id);
}

const model = mongoose.model('PerformanceExpert', PerformanceExpertSchema, 'users');

const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [
	{...filter, type: "PERFORMANCE_EXPERT" },
	{...projection, email: 0, password: 0 },
	options
]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [
	{...filter, type: "PERFORMANCE_EXPERT" },
	{...projection, email: 0, password: 0 },
	options
]);

const fod = model.findOneAndDelete;
model.findOneAndDelete = (filter = {}, options) => fod.apply(model, [
	{...filter, type: "PERFORMANCE_EXPERT" },
	options
]);

const fore = model.findOneAndReplace;
model.findOneAndReplace = (filter = {}, replacement, options) => fore.apply(model, [
	{...filter, type: "PERFORMANCE_EXPERT" },
	replacement,
	options
]);

const fou = model.findOneAndUpdate;
model.findOneAndUpdate = (filter = {}, update, options) => fou.apply(model, [
	{...filter, type: "PERFORMANCE_EXPERT" },
	update,
	options
]);

module.exports = model;