const { setUp, testData, dropDatabase, dropCollections } = require("./db");

describe("PERFORMANCE EXPERT", () => {
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

	test("C - Create a performance expert", async() => {
		const { PerformanceExpert } = database;

		let a = await PerformanceExpert.find();

		let at = new PerformanceExpert({ name: "Roberto", surname: "Gallina" });
		await at.save();

		let b = await PerformanceExpert.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an PerformanceExpert again", async() => {
		const { PerformanceExpert } = database;

		let a = await PerformanceExpert.find();

		let at = new PerformanceExpert({ name: "Roberto", surname: "Gallina" });
		await at.save();

		let b = await PerformanceExpert.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("R - Read all PerformanceExperts", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.find();

		expect(a.length).toEqual(1);
	});

	test("R - Search PerformanceExperts by id", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.findById("65967cc93d7a535b779e31d3");
		expect(a.name).toEqual("Roberto");
	});

	test("R - Search PerformanceExperts by name", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.find({ name: /er/ });

		expect(a.length).toEqual(1);
	});

	test("R - Search PerformanceExperts by surname", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.find({ surname: /all/ });

		expect(a.length).toEqual(1);
	});

	test("U - Update name of and PerformanceExpert", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.findById("65967cc93d7a535b779e31d3")
		await a.setName("Pippo");

		let b = await PerformanceExpert.findById("65967cc93d7a535b779e31d3");
		expect(b.name).toEqual("Pippo");
	});

	test("U - Update name of and PerformanceExpert (check collateral)", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await PerformanceExpert.findById("65967cc93d7a535b779e31d3")
		await a.setName("Pippo");

		let b = await Athlete.findById("65967c7a3d7a535b779e31d0")
		expect(b.performanceExperts[0].name).toEqual("Pippo");
	});

	test("U - Update surname of and PerformanceExpert", async() => {
		const { PerformanceExpert } = database;
		let i = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await i.save();

		let a = await PerformanceExpert.findById("65967cc93d7a535b779e31d3")
		await a.setSurname("Pippo");

		let b = await PerformanceExpert.findById("65967cc93d7a535b779e31d3");
		expect(b.surname).toEqual("Pippo");
	});

	test("U - Update surname of and PerformanceExpert (check collateral)", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await PerformanceExpert.findById("65967cc93d7a535b779e31d3")
		await a.setSurname("Pippo");

		let b = await Athlete.findById("65967c7a3d7a535b779e31d0")
		expect(b.performanceExperts[0].surname).toEqual("Pippo");
	});

	test("U - Have performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		expect(p.athletes.length).toEqual(1);
		expect(p.hasAthlete(a._id)).toEqual(true);
	});

	test("U - Add performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await p.removeAthlete(a._id);
		expect(p.athletes.length).toEqual(0);

		await p.addAthlete(a);
		let b = await PerformanceExpert.findOne();
		expect(b.athletes.length).toEqual(1);
	});

	test("U - Try to add an already added performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await p.addAthlete(a);
		expect(p.athletes.length).toEqual(1);
	});

	test("U - Remove performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await p.removeAthlete(a._id);
		expect(p.athletes.length).toEqual(0);

		await p.addAthlete(a);
		let b = await PerformanceExpert.findOne();
		expect(b.athletes.length).toEqual(1);
	});

	test("U - Try to remove not exists performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await p.removeAthlete("12245");
		expect(p.athletes.length).toEqual(1);

		let b = await PerformanceExpert.findOne();
		expect(b.athletes.length).toEqual(1);
	});

});