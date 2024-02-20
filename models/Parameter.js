module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const Enum = require("./enum");

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
		photo: String,
		speciality: String
	});

	const IncapsultedValue = new Schema({});

	const IncapsultedSourceAthlete = new Schema({});

	const ParameterSchema = new Schema({
		parameter: {
			type: String,
			required: true,
			enum: Enum.PARAMETERS
		},
		date: {
			type: Date
		},
		athlete: IncapsultedAthlete,
		source: IncapsultedSourceAthlete,
		value: IncapsultedValue
	}, { versionKey: false });

	const model = mongoose.model('Parameter', ParameterSchema, 'parameters');

	return model;
}