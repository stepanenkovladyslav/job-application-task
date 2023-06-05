const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Administrator, Boss, RegularUser } = require("./model/models");

const generateToken = (id, username, role) => {
	return jwt.sign({ id, username, role }, process.env.SECRET_KEY, {
		expiresIn: "2h",
	});
};

module.exports = createUsers = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", async () => {
		const { username, password, role, bossId } = JSON.parse(body);
		if (role === "Boss") {
			try {
				const admin = await Administrator.findOne({ where: { id: 3 } }); // there is meant to be one admin
				const hashedPassword = await bcrypt.hash(password, 10);
				const boss = await admin.createSubordinate({
					username,
					password: hashedPassword,
					bossId: admin.id,
				});
				const token = generateToken(boss.id, username, role);
				res.write(JSON.stringify(token));
				res.end();
			} catch (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
		} else if (role === "RegularUser") {
			try {
				const boss = await Boss.findOne({ where: { id: bossId } });
				const hashedPassword = await bcrypt.hash(password, 10);
				const user = await boss.createSubordinate({
					username,
					password: hashedPassword,
					bossId,
				});
				const token = generateToken(user.id, username, role);
				res.write(token);
				res.end();
			} catch (error) {
				res.write(JSON.stringify(error));
				res.end();
			}
		} else if (role === "Administrator") {
			try {
				const hashedPassword = await bcrypt.hash(password, 10);
				const admin = await Administrator.create({
					username,
					password: hashedPassword,
				});
				const token = generateToken(admin.id, username, role);
				res.write(JSON.stringify(token));
				res.end();
			} catch (error) {
				res.write(JSON.stringify(error));
				res.end;
			}
		} else {
			res.end();
		}
	});
};
