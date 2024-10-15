const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favorite extends Model { }

Favorite.init(
	{
		country_name: {
			type: DataTypes.STRING,
		},
		city_name: {
			type: DataTypes.STRING,
		},
		state_name: {
			type: DataTypes.STRING,
		},
		landmark_name: {
			type: DataTypes.STRING,
			allowNull: false,
		}
		// rating: {
		//   type: DataTypes.INTEGER
		// }
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'favorite'
	}
);

module.exports = Favorite;

