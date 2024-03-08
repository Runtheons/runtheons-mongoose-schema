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

PerformanceExpertSchema.methods.hasAthlete = function(_id) {
	return this.athletes.filter(x => x._id.equals(_id)).length > 0 || null;
}

PerformanceExpertSchema.methods.addAthlete = async function(athlete) {
	if (this.hasAthlete(athlete._id))
		return false
	let { _id, name, surname, photo, speciality, status } = athlete
	this.athletes.push({ _id, name, surname, photo, speciality, status });
	await this.save();
}

PerformanceExpertSchema.methods.removeAthlete = async function(_id) {
	if (!this.hasAthlete(_id))
		return false
	this.athletes.pull({ _id });
	await this.save();
}

PerformanceExpertSchema.methods.setName = async function(newName) {
	this.name = newName;
	await this.save();

	const { Athlete } = mongoose.models;

	await Athlete.updateMany({ 'performanceExperts._id': this._id }, {
		'$set': {
			'performanceExperts.$.name': newName
		}
	});
}
PerformanceExpertSchema.methods.setSurname = async function(newSurname) {
	this.surname = newSurname;
	await this.save();

	const { Athlete } = mongoose.models;

	await Athlete.updateMany({ 'performanceExperts._id': this._id }, {
		'$set': {
			'performanceExperts.$.surname': newSurname
		}
	});
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