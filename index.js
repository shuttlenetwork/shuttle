import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { createServer } from "node:http";
import express from "express";
import ms from "ms";

const routes = {
	"/": "index",
	"/games": "games",
	"/settings": "settings",
	"/apps": "apps",
	"/chat": "chat",
	"/shuttleai": "shuttleai"
};

const navItems = [
	["/", "Home"],
	["/games", "Games"],
	["/shuttleai", "ShuttleAI"],
	["/chat", "Chat"],
	["/settings", "Settings"]
];

const bare = createBareServer("/bare/");
const app = express();

app.set("view engine", "ejs")

app.use(express.static("./public", { maxAge: ms("1d") }));
app.use("/uv/", express.static(uvPath));

for (const [path, page] of Object.entries(routes)) {
	app.get(path, (_, res) => res.render("layout", {
		path,
		navItems,
		page
	}));
}

app.use((_, res) => res.status(404).render("404"));

const httpServer = createServer();

httpServer.on("request", (req, res) => {
	if (bare.shouldRoute(req)) bare.routeRequest(req, res); else app(req, res);
});

httpServer.on("error", (err) => console.log(err));
httpServer.on("upgrade", (req, socket, head) => {
	if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head); else socket.end();
});

httpServer.listen({ port: process.env.PORT || 80 }, () => {
	const addr = httpServer.address();
	console.log(`\x1b[42m\x1b[1m shuttle\n Port: ${addr.port}\x1b[0m`);
	console.log("\x1b[41m\x1b[5m\x1b[1m\x1b[33m PLEASE NOTE: Shuttle is in a development stage. Expect bugs!\x1b[0m");
});