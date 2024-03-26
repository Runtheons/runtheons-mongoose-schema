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
	upload: {
		type: Date,
		default: Date.now
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

const model = mongoose.model('File', FileSchema, 'files');

module.exports = model;