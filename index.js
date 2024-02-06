const mongoose = require('mongoose');


module.exports = async(connectionstring, options = null) => {

	mongoose.connect(connectionstring, options);

	const Athlete = require("./models/Athlete")(mongoose)
	const PerformanceExpert = require("./models/PerformanceExpert")(mongoose)

	return {
		mongoose,
		Athlete,
		PerformanceExpert
	}
}