const { Schema } = require('mongoose');

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

module.exports = IncapsultedPerformanceExpertSchema;