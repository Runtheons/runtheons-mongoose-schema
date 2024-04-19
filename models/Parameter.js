const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./enum");

const IncapsultedValueSchema = new Schema({});
const IncapsultedSourceSchema = new Schema({});

const ParameterSchema = new Schema({
	parameter: {
		type: String,
		required: true,
		// enum: Enum.PARAMETERS
	},
	date: {
		type: Date
	},
	athlete: Schema.Types.ObjectId,
	source: IncapsultedSourceSchema,
	value: IncapsultedValueSchema
}, { versionKey: false });

const model = mongoose.model('Parameter', ParameterSchema, 'parameters');

module.exports = model;