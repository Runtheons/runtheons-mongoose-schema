const mongoose = require('mongoose');
const { Schema } = mongoose;

const IncapsultedPreferencesSchema = new Schema({});

const PreferencesViewSchema = new Schema({
	athlete: Schema.Types.ObjectId,
	performanceExpert: Schema.Types.ObjectId,
	preferences: IncapsultedPreferencesSchema
}, { versionKey: false });

const model = mongoose.model('PreferencesView', PreferencesViewSchema, 'preferencesView');


module.exports = model;