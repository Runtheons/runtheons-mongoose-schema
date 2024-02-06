const mongoose = require('mongoose');


module.exports = async(config) => {

	mongoose.connect(config);

	const Athlete = require("./models/Athlete")
	const PerformanceExpert = require("./models/PerformanceExpert")

	return {
		mongoose,
		Athlete,
		PerformanceExpert
	}
}