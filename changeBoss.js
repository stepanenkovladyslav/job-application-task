const jwt = require("jsonwebtoken");
const { Boss, Administrator } = require("./model/models");
module.exports = changeBoss = (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const user = jwt.decode(token);
		body = "";
		req.on("data", (chunk) => {
			body += chunk;
		});
		req.on("end", async () => {
			const { userId, newBossId } = JSON.parse(body);
			if (user.role === "Boss") {
				const currentBoss = await Boss.findOne({
					where: { id: user.id },
				});
				const subordinates = await currentBoss.getSubordinates();
				const changeBossUser = subordinates.find(
					(user) => user.id === userId
				);
				changeBossUser.BossId = newBossId;
				changeBossUser.save();
				res.write(JSON.stringify(changeBossUser));
				res.end();
			} else if (user.role === "Administrator") {
				const currentBoss = await Administrator.findOne({
					where: { id: user.id },
				});
				const subordinates = await currentBoss.getSubordinates();
				const changeBossUser = subordinates.find(
					(user) => user.id === userId
				);
				if (changeBossUser) {
					changeBossUser.AdministratorId = newBossId;
					changeBossUser.save();
					res.write(JSON.stringify(changeBossUser));
					res.end();
				} else {
					res.write(
						JSON.stringify({
							message: "This is not your subordinate",
						})
					);
					res.end();
				}
			} else {
				res.write(JSON.stringify({ message: "Not allowed" }));
				res.end();
			}
		});
	} catch (error) {
		res.write(JSON.stringify(error));
		res.end();
	}
};
