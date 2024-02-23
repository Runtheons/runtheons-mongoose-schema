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
		photo: String,
		speciality: String
	});

	const IncapsultedValueSchema = new Schema({});

	const IncapsultedSourceSchema = new Schema({});

	const ParameterSchema = new Schema({
		parameter: {
			type: String,
			required: true,
			enum: Enum.PARAMETERS
		},
		date: {
			type: Date
		},
		athlete: IncapsultedAthleteSchema,
		source: IncapsultedSourceSchema,
		value: IncapsultedValueSchema
	}, { versionKey: false });

	const model = mongoose.model('Parameter', ParameterSchema, 'parameters');

	return model;
}