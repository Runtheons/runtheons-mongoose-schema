const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./enum");

const IncapsultedPerformanceExpertSchema = require("./incapsulated/IncapsultedPerformanceExpert");

const AthleteSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		default: ""
	},
	speciality: String,
	status: {
		type: String,
		enum: Enum.ATHLETE_STATUS,
		uppercase: true,
		default: Enum.ATHLETE_STATUS_DEFAULT
	},
	type: {
		type: String,
		enum: Enum.USER_TYPE,
		uppercase: true,
		default: Enum.USER_ATHLETE,
		immutable: true
	},
	performanceExperts: {
		type: [IncapsultedPerformanceExpertSchema],
		required: false
	},
}, { versionKey: false });

AthleteSchema.methods.hasPerformanceExpert = function(_id) {
	return this.performanceExperts.filter(x => x._id.equals(_id)).length > 0 || null;
}

AthleteSchema.methods.addPerformanceExpert = async function(performanceExpert) {
	if (this.hasPerformanceExpert(performanceExpert._id))
		return false
	let { _id, name, surname, photo, title } = performanceExpert
	this.performanceExperts.push({ _id, name, surname, photo, title });
	await this.save();
}

AthleteSchema.methods.removePerformanceExpert = async function(_id) {
	if (!this.hasPerformanceExpert(_id))
		return false
	this.performanceExperts.pull({ _id });
	await this.save();
}

AthleteSchema.methods.setName = async function(newName) {
	this.name = newName;
	await this.save();

	const { PerformanceExpert } = mongoose.models;

	await PerformanceExpert.updateMany({ 'athletes._id': this._id }, {
		'$set': {
			'athletes.$.name': newName
		}
	});
}
AthleteSchema.methods.setSurname = async function(newSurname) {
	this.surname = newSurname;
	await this.save();

	const { PerformanceExpert } = mongoose.models;

	await PerformanceExpert.updateMany({ 'athletes._id': this._id }, {
		'$set': {
			'athletes.$.surname': newSurname
		}
	});
}

const model = mongoose.model('Athlete', AthleteSchema, 'users');

const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [
	{...filter, type: "ATHLETE" },
	{...projection, email: 0, password: 0 },
	options
]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [
	{...filter, type: "ATHLETE" },
	{...projection, email: 0, password: 0 },
	options
]);

const fod = model.findOneAndDelete;
model.findOneAndDelete = (filter = {}, options) => fod.apply(model, [
	{...filter, type: "ATHLETE" },
	options
]);

const fore = model.findOneAndReplace;
model.findOneAndReplace = (filter = {}, replacement, options) => fore.apply(model, [
	{...filter, type: "ATHLETE" },
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