const mongoose = require('mongoose');
const { Schema } = mongoose;

const Enum = require("./enum");

const IncapsultedItemSchema = new Schema({
	position: {
		columnStart: Number,
		columnEnd: Number,
		rowStart: Number,
		rowEnd: Number,
	},
	content: {
		title: String,
		parameter: {
			type: String,
			enum: Enum.PARAMETERS,
			lowercase: true
		},
		component: {
			// name: "Grapth1",
			// parameteter: {
			// 	type: "line"
			// }
		}
	}
});

const IncapsultedPreferencesSchema = new Schema({
	tabs: [{
		title: String,
		items: [IncapsultedItemSchema]
	}]
});

const PreferencesViewSchema = new Schema({
	athlete: Schema.Types.ObjectId,
	performanceExpert: Schema.Types.ObjectId,
	preferences: IncapsultedPreferencesSchema
}, { versionKey: false });

const model = mongoose.model('PreferencesView', PreferencesViewSchema, 'preferencesView');

module.exports = model;