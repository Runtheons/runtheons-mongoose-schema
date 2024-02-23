module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const Enum = require("./enum");

	const IncapsultedPerformanceExpertSchema = new Schema({
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

	return model;
}