module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const Enum = require("./enum");

	const IncapsultedAthleteSchema = require("./incapsulated/IncapsultedAthlete");

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