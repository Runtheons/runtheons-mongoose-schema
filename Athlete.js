const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncapsultedPerformanceExpert = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	roles: {
		type: [String],
		uppercase: true,
		enum: ["HEAD_OF_PERFORMANCE"]
	},
	photo: String,
});

const AthleteSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	photo: String,
	status: {
		type: String,
		enum: ["ONBOARDING", "PLANNING", "ACCELLERATE", "KO"],
		uppercase: true,
		default: "ONBOARDING"
	},
	type: {
		type: String,
		enum: ["ATHLETE", "PERFORMANCE_EXPERT"],
		uppercase: true,
		default: "ATHLETE",
		immutable: true
	},
	performanceExperts: {
		type: [IncapsultedPerformanceExpert],
		required: false
	},
}, { versionKey: false });


AthleteSchema.methods.addPerformanceExpert = (performanceExpert) => {

}

AthleteSchema.methods.removePerformanceExpert = (performanceExpert) => {

}

const model = mongoose.model('Athlete', AthleteSchema, 'users');

const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [{...filter, type: "ATHLETE" }, projection, options]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [{...filter, type: "ATHLETE" }, projection, options]);

const fod = model.findOneAndDelete;
model.findOneAndDelete = (filter = {}, options) => fod.apply(model, [{...filter, type: "ATHLETE" }, options]);

const fore = model.findOneAndReplace;
model.findOneAndReplace = (filter = {}, replacement, options) => fore.apply(model, [{...filter, type: "ATHLETE" }, replacement, options]);

const fou = model.findOneAndUpdate;
model.findOneAndUpdate = (filter = {}, update, options) => fou.apply(model, [{...filter, type: "ATHLETE" }, update, options]);

module.exports = model;