const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncapsultedAthlete = new Schema({
	_id: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ["ONBOARDING", "PLANNING", "ACCELLERATE", "KO"],
		uppercase: true,
		required: true,
		default: "ONBOARDING"
	},
	relativeRoles: {
		type: [String],
		uppercase: true,
		enum: ["HEAD_OF_PERFORMANCE"]
	},
	photo: String,
});

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
		enum: ["PERFORMANCE_EXPERT", "PERFORMANCE_EXPERT"],
		uppercase: true,
		default: "PERFORMANCE_EXPERT",
		immutable: true
	},
	athletes: {
		type: [IncapsultedAthlete],
		required: false
	},
}, { versionKey: false });


PerformanceExpertSchema.methods.addAthelte = (athelte) => {

}

PerformanceExpertSchema.methods.removeAthelte = (athelte) => {

}

const model = mongoose.model('PerformanceExpert', PerformanceExpertSchema, 'users');

const f = model.find;
model.find = (filter = {}, projection, options) => f.apply(model, [{...filter, type: "PERFORMANCE_EXPERT" }, projection, options]);

const fo = model.findOne;
model.findOne = (filter = {}, projection, options) => fo.apply(model, [{...filter, type: "PERFORMANCE_EXPERT" }, projection, options]);

const fod = model.findOneAndDelete;
model.findOneAndDelete = (filter = {}, options) => fod.apply(model, [{...filter, type: "PERFORMANCE_EXPERT" }, options]);

const fore = model.findOneAndReplace;
model.findOneAndReplace = (filter = {}, replacement, options) => fore.apply(model, [{...filter, type: "PERFORMANCE_EXPERT" }, replacement, options]);

const fou = model.findOneAndUpdate;
model.findOneAndUpdate = (filter = {}, update, options) => fou.apply(model, [{...filter, type: "PERFORMANCE_EXPERT" }, update, options]);

module.exports = model;