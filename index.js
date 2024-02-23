const mongoose = require('mongoose');


module.exports = async(connectionstring, options = null) => {

	mongoose.connect(connectionstring, options);

	const User = require("./models/User")(mongoose)
	const Athlete = require("./models/Athlete")(mongoose)
	const PerformanceExpert = require("./models/PerformanceExpert")(mongoose)
	const PerformanceView = require("./models/PerformanceView")(mongoose)

	return {
		mongoose,
		User,
		Athlete,
		PerformanceExpert,
		PerformanceView
	}
}