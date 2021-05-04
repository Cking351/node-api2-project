// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express();

server.use(express.json());

const postsRouter = require("./posts/posts-router.js");

server.use("/api/posts", postsRouter);

server.get("/", (req, res) => {
	res.send(`
    <h1>Chris King's API</h1>`);
});

module.exports = server;
