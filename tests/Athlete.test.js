const { setUp } = require("./db");

describe("ATHLETE", () => {
	let database = undefined;

	beforeEach(async() => {
		database = await setUp()
	});

	afterEach(async() => {});

	test("R - Read all sex", async() => {
		const { Athlete } = database;

		let a = await Athlete.find();

		expect(a.length).toEqual(0);
	});

});