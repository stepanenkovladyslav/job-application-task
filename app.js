const http = require("http");
const fs = require("fs");

const { Administrator, Boss, RegularUser } = require("./model/models");
const createUsers = require("./createUsers");
const { join } = require("path");
const path = require("path");
const getUsers = require("./getUsers");
const loginUsers = require("./loginUsers");
const changeBoss = require("./changeBoss");

http.createServer((req, res) => {
	res.setHeader("Content-Type", "application/json");
	if (req.method === "POST" && req.url === "/register") {
		createUsers(req, res);
	}
	if (req.method === "POST" && req.url === "/login") {
		loginUsers(req, res);
	}
	if (req.method === "PUT") {
		changeBoss(req, res);
	}
	if (req.method === "GET") {
		getUsers(req, res);
	}
}).listen(3000, () => console.log("Started listening"));
