const Enum = require("./../enum");

module.exports = new Schema({
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