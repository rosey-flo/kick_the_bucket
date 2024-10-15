const sequelize = require('../config/connection');
const { User, Place, Landmark } = require('../models');

const placeSeedData = require('./placeSeedData.json');
const landmarkSeedData = require('./landmarkSeedData.json');

const seedDatabase = async () => {
	await sequelize.sync({force: false});

	const places = await Place.bulkCreate(placeSeedData);

	const landmarks = await Landmark.bulkCreate(landmarkSeedData);

	process.exit();
};

seedDatabase();