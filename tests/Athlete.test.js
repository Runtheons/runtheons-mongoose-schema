const { setUp, dropDatabase, dropCollections } = require("./db");

describe("ATHLETE", () => {
	let database = undefined;

	beforeAll(async() => {
		database = await setUp()
	});

	afterAll(async() => {
		await dropDatabase();
	});

	afterEach(async() => {
		await dropCollections();
	});

	test("C - Create an athlete", async() => {
		const { Athlete } = database;

		let a = await Athlete.find();

		let at = new Athlete({ name: "Roberto", surname: "Gallina" });
		await at.save();

		let b = await Athlete.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an athlete again", async() => {
		const { Athlete } = database;

		let a = await Athlete.find();

		let at = new Athlete({ name: "Roberto", surname: "Gallina" });
		await at.save();

		let b = await Athlete.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("R - Read all athletes", async() => {
		const { Athlete } = database;

		let a = await Athlete.find();

		expect(a.length).toEqual(0);
	});

});