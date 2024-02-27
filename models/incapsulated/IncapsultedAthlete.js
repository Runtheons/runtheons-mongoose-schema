const { Schema } = require('mongoose');

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
	photo: String,
	speciality: String
});

module.exports = IncapsultedAthleteSchema;