import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
import express from "express";
import masqr from "@mercuryworkshop/masqrbackend";

const routes = ["/", "/math", "/physics", "/settings"];

import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const bare = createBareServer("/bare/");
const app = express();

app.use(masqr({
	licenseServerUrl: "http://localhost:8004",
	fail: (req, res) => {
		res.end("fail!!!")
	}
}));

app.use(express.static("./dist"));
app.use("/uv/", express.static(uvPath));
app.use("/dynamic/", express.static(dynamicPath))

for (const [path, page] of routes) {
	app.get(path, (_, res) => res.sendFile("./dist/index.html", { root: __dirname }));
}

app.use((_, res) => res.status(404).sendFile("./dist/index.html", { root: __dirname }));

const httpServer = createServer();

httpServer.on("request", (req, res) => {
	if (bare.shouldRoute(req)) bare.routeRequest(req, res);
	else app(req, res);
});

httpServer.on("error", (err) => console.log(err));
httpServer.on("upgrade", (req, socket, head) => {
	if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
	else socket.end();
});

httpServer.listen({ port: process.env.PORT || 8080 }, () => {
	const addr = httpServer.address();
	console.log(`\x1b[42m\x1b[1m shuttle\n Port: ${addr.port}\x1b[0m`);
});
