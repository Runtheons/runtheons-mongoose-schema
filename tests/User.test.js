const { setUp, testData, dropDatabase, dropCollections } = require("./db");

describe("User", () => {
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

	test("C - Create an user", async() => {
		const { User } = database;

		let a = await User.find();

		let at = new User({ email: "roberto@runtheons.com", password: "123", type: "ATHLETE" });
		await at.save();

		let b = await User.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("C - Create an user again", async() => {
		const { User } = database;

		let a = await User.find();

		let at = new User({ email: "roberto@runtheons.com", password: "123", type: "ATHLETE" });
		await at.save();

		let b = await User.find();
		expect(b.length).toEqual(a.length + 1);
	});

	test("R - Read all users", async() => {
		const { User } = database;
		let i = new User(testData.ATHLETE1);
		await i.save();

		let a = await User.find();

		expect(a.length).toEqual(1);
	});

	test("R - Search users by id", async() => {
		const { User } = database;
		let i = new User(testData.ATHLETE1);
		await i.save();

		let a = await User.findById("65967c7a3d7a535b779e31d0");
		expect(a.email).toEqual("prva@runtheons.com");
	});

	test("R - Search users by email", async() => {
		const { User } = database;
		let i = new User(testData.ATHLETE1);
		await i.save();

		let a = await User.find({ email: /@runtheons/ });

		expect(a.length).toEqual(1);
	});

});