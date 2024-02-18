import { defineConfig, type Plugin, Connect } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import serveStatic from "serve-static";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
import bareServerPlugin from "@tomphttp/vite-plugin-bare";

function use(app: Connect.Server, path: string, func: Connect.NextHandleFunction) {
	if(!path.endsWith("/")) path = path + "/";
	app.use((req, res, next) => {
		if(req.originalUrl.startsWith(path)) {
			// @ts-ignore
			req.url = req.originalUrl.replace(path, "/");
			func(req, res, next);
		} else next();
	});
}

const shuttle: Plugin = {
	name: "shuttle",
	async configureServer(server) {
	  	return () => {
			use(server.middlewares, "/uv/", serveStatic(uvPath));
			use(server.middlewares, "/dynamic/", serveStatic(dynamicPath));
		}
	}
  };

  
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), bareServerPlugin("/bare/"), shuttle],
  build: {
	target: "esnext"
  }
})
