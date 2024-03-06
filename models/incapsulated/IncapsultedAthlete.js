const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./../enum");

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
	speciality: String,
	status: {
		type: String,
		enum: Enum.ATHLETE_STATUS,
		uppercase: true,
		default: Enum.ATHLETE_STATUS_DEFAULT
	}
});

module.exports = IncapsultedAthleteSchema;