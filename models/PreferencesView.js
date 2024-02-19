module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const PreferencesViewSchema = new Schema({
		athlete: Schema.Types.ObjectId,
		performanceExpert: Schema.Types.ObjectId,
		preferences: {}
	}, { versionKey: false });

	const model = mongoose.model('PreferencesView', PreferencesViewSchema, 'preferencesView');

	return model;
}