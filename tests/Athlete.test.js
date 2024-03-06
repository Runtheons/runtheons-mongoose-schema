const { setUp, testData, dropDatabase, dropCollections } = require("./db");

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
		let i = new Athlete(testData.ATHLETE1);
		await i.save();

		let a = await Athlete.find();

		expect(a.length).toEqual(1);
	});

	test("R - Search athletes by id", async() => {
		const { Athlete } = database;
		let i = new Athlete(testData.ATHLETE1);
		await i.save();

		let a = await Athlete.findById("65967c7a3d7a535b779e31d0");
		expect(a.name).toEqual("Roberto");
	});

	test("R - Search athletes by name", async() => {
		const { Athlete } = database;
		let i = new Athlete(testData.ATHLETE1);
		await i.save();

		let a = await Athlete.find({ name: /er/ });

		expect(a.length).toEqual(1);
	});

	test("R - Search athletes by surname", async() => {
		const { Athlete } = database;
		let i = new Athlete(testData.ATHLETE1);
		await i.save();

		let a = await Athlete.find({ surname: /all/ });

		expect(a.length).toEqual(1);
	});

	test("U - Update name of and athlete", async() => {
		const { Athlete } = database;
		let i = new Athlete(testData.ATHLETE1);
		await i.save();

		let a = await Athlete.findById("65967c7a3d7a535b779e31d0")
		a.name = "Pippo";
		await a.save();

		let b = await Athlete.findOne();
		expect(b.name).toEqual("Pippo");
	});

	test("U - Have performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		expect(a.performanceExperts.length).toEqual(1);
		expect(a.hasPerformanceExpert(p._id)).toEqual(true);
	});

	test("U - Add performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await a.removePerformanceExpert(p._id);
		expect(a.performanceExperts.length).toEqual(0);

		await a.addPerformanceExpert(p);
		let b = await Athlete.findOne();
		expect(b.performanceExperts.length).toEqual(1);
	});

	test("U - Remove performance expert ", async() => {
		const { Athlete, PerformanceExpert } = database;
		let ia = new Athlete(testData.ATHLETE1);
		await ia.save();
		let ip = new PerformanceExpert(testData.PERFORMANCE_EXPERT1);
		await ip.save();

		let a = await Athlete.findOne();
		let p = await PerformanceExpert.findOne();

		await a.removePerformanceExpert(p._id);
		expect(a.performanceExperts.length).toEqual(0);

		await a.addPerformanceExpert(p);
		let b = await Athlete.findOne();
		expect(b.performanceExperts.length).toEqual(1);
	});

});