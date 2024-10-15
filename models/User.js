const { Model, DataTypes } = require('sequelize');
const { hash, compare } = require('bcrypt');

const sequelize = require('../config/connection');


// create our Traveller model
class User extends Model {
	async validatePassword (formPassword) {
		const is_valid = await compare(formPassword, this.password);

		return is_valid;
	}
}

// create fields/columns for Traveller model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
	  validate: {
		len: 2
	  }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: 6
		}
	}
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
	hooks: {
		async beforeCreate (user) {
			user.password = await hash(user.password, 10); 

			return user;
		}
	}
  }
);

module.exports = User;