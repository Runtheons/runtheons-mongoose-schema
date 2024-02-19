module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const PreferencesView = new Schema({
		athlete: Schema.Types.ObjectId,
		performanceExpert: Schema.Types.ObjectId,
		preferences: {}
	}, { versionKey: false });

	const model = mongoose.model('PreferencesView', PreferencesView, 'preferencesView');

	return model;
}