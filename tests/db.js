const { MongoMemoryServer } = require('mongodb-memory-server');

const mongooseSchema = require("./../index");

let mongo = undefined;

let database = undefined;

module.exports.testData = {
	ATHLETE1: {
		_id: "65967c7a3d7a535b779e31d0",
		email: "prva@runtheons.com",
		password: "$2b$10$bJHmNSOUJVUd1cDO8GemweOmFf9m6J0bH5oyUTai4U7CIfmozYjnq",
		type: "ATHLETE",
		name: "Roberto",
		surname: "Gallina",
		photo: "./photo.png",
		status: "KO",
		performanceExperts: [{
			name: "Roberto",
			photo: "./photo.png",
			surname: "Gallina",
			title: "Nutrizionista",
			_id: "65967cc93d7a535b779e31d3"
		}],
		speciality: "Centometrista"
	},
	PERFORMANCE_EXPERT1: {
		_id: "65967cc93d7a535b779e31d3",
		email: "prova@runtheons.com",
		password: "$2b$10$bJHmNSOUJVUd1cDO8GemweOmFf9m6J0bH5oyUTai4U7CIfmozYjnq",
		type: "PERFORMANCE_EXPERT",
		name: "Roberto",
		surname: "Gallina",
		photo: "./photo.png",
		title: "Nutritionist Performance Expert",
		athletes: [{
			name: "Roberto",
			photo: "./photo.png",
			surname: "Gallina",
			_id: "65967c7a3d7a535b779e31d0",
			speciality: "Centometrista"
		}]
	}
}

module.exports.setUp = async() => {
	mongo = await MongoMemoryServer.create();
	const url = mongo.getUri();

	database = await mongooseSchema(url, {
		useNewUrlParser: true,
	});

	return database;
};

module.exports.dropDatabase = async() => {
	if (mongo) {
		await database.mongoose.connection.dropDatabase();
		await database.mongoose.connection.close();
		await mongo.stop();
	}
};

module.exports.dropCollections = async() => {
	if (mongo) {
		const collections = database.mongoose.connection.collections;

		for (const key in collections) {
			const collection = collections[key];
			await collection.deleteMany();
		}
	}
};