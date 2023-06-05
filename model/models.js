const { INTEGER, STRING } = require("sequelize");
const sequelize = require("../db.js");

const Administrator = sequelize.define("Administrator", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	username: {
		type: STRING,
		allowNull: false,
	},

	password: {
		type: STRING,
		allowNull: false,
	},
});

const Boss = sequelize.define("Boss", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	username: {
		type: STRING,
		allowNull: false,
	},

	password: {
		type: STRING,
		allowNull: false,
	},
});

const RegularUser = sequelize.define("RegularUser", {
	id: {
		type: INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},

	username: {
		type: STRING,
		allowNull: false,
	},

	password: {
		type: STRING,
		allowNull: false,
	},
});

Administrator.hasMany(Boss, { as: "subordinates" });
Boss.belongsTo(Administrator);
Boss.hasMany(RegularUser, { as: "subordinates" });
RegularUser.belongsTo(Boss);

sequelize.sync();

module.exports = { Administrator, Boss, RegularUser };
