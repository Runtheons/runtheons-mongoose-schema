module.exports = (mongoose) => {
	const { Schema } = mongoose;

	const PreferencesSchema = new Schema({

	});

	const PreferencesViewSchema = new Schema({
		athlete: Schema.Types.ObjectId,
		performanceExpert: Schema.Types.ObjectId,
		preferences: PreferencesSchema
	}, { versionKey: false });

	const model = mongoose.model('PreferencesView', PreferencesViewSchema, 'preferencesView');

	return model;
}