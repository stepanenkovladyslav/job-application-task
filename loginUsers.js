const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { RegularUser, Boss, Administrator } = require("./model/models");

module.exports = loginUsers = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	req.on("end", async () => {
		const { username, password } = JSON.parse(body);
		const user = await RegularUser.findOne({ where: { username } });
		if (user) {
			const verifier = await bcrypt.compare(password, user.password);
			if (verifier) {
				try {
					const token = jwt.sign(
						{
							id: user.id,
							username,
							role: "RegularUser",
						},
						process.env.SECRET_KEY,
						{
							expiresIn: "2h",
						}
					);
					res.write(token);
					res.end();
				} catch (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
			} else {
				res.write(JSON.stringify({ message: "Wrong password" }));
				res.end();
			}
		}
		const boss = await Boss.findOne({ where: { username } });
		if (boss) {
			const verifier = await bcrypt.compare(password, boss.password);
			if (verifier) {
				try {
					const token = jwt.sign(
						{
							id: boss.id,
							username,
							role: "Boss",
						},
						process.env.SECRET_KEY,
						{
							expiresIn: "2h",
						}
					);
					res.write(token);
					res.end();
				} catch (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
			} else {
				res.write(JSON.stringify({ message: "Wrong password" }));
				res.end();
			}
		}
		const admin = await Administrator.findOne({ where: { username } });
		if (admin) {
			const verifier = await bcrypt.compare(password, admin.password);
			if (verifier) {
				try {
					const token = jwt.sign(
						{
							id: admin.id,
							username,
							role: "Administrator",
						},
						process.env.SECRET_KEY,
						{
							expiresIn: "2h",
						}
					);
					res.write(token);
					res.end();
				} catch (error) {
					res.write(JSON.stringify(error));
					res.end();
				}
			} else {
				res.write(JSON.stringify({ message: "Wrong password" }));
				res.end();
			}
		}
		res.write(JSON.stringify({ message: "There is no such user" }));
		res.end();
	});
};
