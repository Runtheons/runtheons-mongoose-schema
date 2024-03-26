const mongoose = require('mongoose');

module.exports = async(connectionstring, options = null) => {

	mongoose.connect(connectionstring, options);

	const User = require("./models/User")
	const Athlete = require("./models/Athlete")
	const PerformanceExpert = require("./models/PerformanceExpert")
	const PreferencesView = require("./models/PreferencesView")
	const File = require("./models/File")

	return {
		mongoose,
		User,
		Athlete,
		PerformanceExpert,
		PreferencesView,
		File
	}
}