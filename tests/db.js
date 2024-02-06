const { MongoMemoryServer } = require('mongodb-memory-server');

const mongooseSchema = require("./../index");

let mongo = undefined;

let database = undefined;

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