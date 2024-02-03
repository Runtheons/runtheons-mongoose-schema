const mongoose = require('mongoose');


module.exports = async(config) => {

	mongoose.connect(config);

	const Athlete = require("./Athlete")
	const PerformanceExpert = require("./PerformanceExpert")

	return {
		mongoose,
		Athlete,
		PerformanceExpert
	}
}