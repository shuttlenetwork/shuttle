import "./app.css";

// Fonts
import "@fortawesome/fontawesome-free/css/all.css";
import "@fontsource/poppins/700.css";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/montserrat/600.css";

import App from "./App.svelte";
import "./lib/bareclient";
import { registerSW } from "./lib/sw";
import posthog from "posthog-js";

if("serviceWorker" in navigator) {
	// @ts-ignore
	registerSW("/uv/sw-handler.js", { scope: __uv$config.prefix });
	registerSW("/dynamic.sw-handler.js", { scope: "/dynamic~service" });
}

if(import.meta.env.PROD && import.meta.env.VITE_SHUTTLE_PROD) {
	posthog.init("api_key", {
		api_host: "/ph",
		ui_host: "ph.shuttleproxy.com"
	});
};

// @ts-ignore
const app = new App({
  target: document.body
})

export default app
