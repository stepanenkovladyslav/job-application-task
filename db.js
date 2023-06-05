require("dotenv").config();
const Sequelize = require("sequelize");

module.exports = new Sequelize(
	process.env.DB_NAME,
	process.env.USER_LOGIN,
	process.env.USER_PASSWORD,
	{
		dialect: process.env.DB_DIALECT,
		port: process.env.DB_PORT,
	}
);
