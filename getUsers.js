const jwt = require("jsonwebtoken");
const { Administrator, Boss, RegularUser } = require("./model/models");

module.exports = getUsers = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.decode(token);
		if (user.role === "Administrator") {
			const admins = await Administrator.findAll();
			const bosses = await Boss.findAll();
			const regulars = await RegularUser.findAll();
			res.write(JSON.stringify([...admins, ...bosses, ...regulars]));
			res.end();
		} else if (user.role === "Boss") {
			const boss = await Boss.findOne({ where: { id: user.id } });
			const subordinates = await boss.getSubordinates();
			res.write(JSON.stringify([boss, ...subordinates]));
			res.end();
		} else if (user.role === "RegularUser") {
			const regularUser = await RegularUser.findOne({
				where: { id: user.id },
			});
			console.log(regularUser);
			res.write(JSON.stringify(regularUser));
			res.end();
		}
	} catch (error) {
		res.write(JSON.stringify(error));
		res.end();
	}
};
