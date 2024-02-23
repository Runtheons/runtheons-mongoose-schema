module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const Enum = require("./enum");

	const IncapsultedAthleteSchema = new Schema({
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
			enum: Enum.ATHLETE_STATUS,
			uppercase: true,
			required: true,
			default: Enum.ATHLETE_STATUS_DEFAULT
		},
		photo: String,
		speciality: String
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

	return model;
}