// require your server and launch it here
const server = require("./api/server.js");

const port = 5000;

server.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
