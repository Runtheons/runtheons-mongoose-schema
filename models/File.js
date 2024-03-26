const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./enum");

const FileSchema = new Schema({
	athlete: Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	extension: {
		type: String,
		required: true
	},
	creator: {
		type: new Schema({
			name: {
				type: String,
				required: true
			},
			surname: {
				type: String,
				required: true
			}
		}),
		required: true
	},
	tags: {
		type: [String],
		required: false,
		enum: Enum.FILE_TAGS
	},
}, { versionKey: false });

// AthleteSchema.methods.hasPerformanceExpert = function(_id) {
// 	return this.performanceExperts.filter(x => x._id.equals(_id)).length > 0 || null;
// }

// AthleteSchema.methods.addPerformanceExpert = async function(performanceExpert) {
// 	if (this.hasPerformanceExpert(performanceExpert._id))
// 		return false
// 	let { _id, name, surname, photo, title } = performanceExpert
// 	this.performanceExperts.push({ _id, name, surname, photo, title });
// 	await this.save();
// }

// AthleteSchema.methods.removePerformanceExpert = async function(_id) {
// 	if (!this.hasPerformanceExpert(_id))
// 		return false
// 	this.performanceExperts.pull({ _id });
// 	await this.save();
// }

// AthleteSchema.methods.setName = async function(newName) {
// 	this.name = newName;
// 	await this.save();

// 	const { PerformanceExpert } = mongoose.models;

// 	await PerformanceExpert.updateMany({ 'athletes._id': this._id }, {
// 		'$set': {
// 			'athletes.$.name': newName
// 		}
// 	});
// }
// AthleteSchema.methods.setSurname = async function(newSurname) {
// 	this.surname = newSurname;
// 	await this.save();

// 	const { PerformanceExpert } = mongoose.models;

// 	await PerformanceExpert.updateMany({ 'athletes._id': this._id }, {
// 		'$set': {
// 			'athletes.$.surname': newSurname
// 		}
// 	});
// }
// AthleteSchema.methods.setPhoto = async function(newPhoto) {
// 	this.photo = newPhoto;
// 	await this.save();

// 	const { PerformanceExpert } = mongoose.models;

// 	await PerformanceExpert.updateMany({ 'athletes._id': this._id }, {
// 		'$set': {
// 			'athletes.$.photo': newPhoto
// 		}
// 	});
// }

const model = mongoose.model('File', FileSchema, 'files');

module.exports = model;