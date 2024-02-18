import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export const frameURL: Writable<string | null> = writable();

export const tabTitle = writable(localStorage.getItem("shuttle||title"));
export const tabIcon = writable(localStorage.getItem("shuttle||favicon"));

export const searchEngine = writable(localStorage.getItem("shuttle||search"));
export const proxy = writable(localStorage.getItem("shuttle||proxy"));

export const themeHex = writable(localStorage.getItem("shuttle||themehex"));
export const lightMode = writable(localStorage.getItem("shuttle||lightMode") === "true");
export const fortniteMode = writable(localStorage.getItem("shuttle||forniteMode") === "true");

export const defaultTitle = "Shuttle";
export const defaultIcon = "/favicon.ico";

const defaultSearchEngine = "google";
const defaultProxy = "uv";
const defaultThemeHex = "";

tabIcon.subscribe(icon => {
    if(!icon || defaultIcon === icon) return localStorage.removeItem("shuttle||favicon");
    localStorage.setItem("shuttle||favicon", icon);
});
tabTitle.subscribe(title => {
    if(!title || defaultTitle === title) return localStorage.removeItem("shuttle||title");
    localStorage.setItem("shuttle||title", title);
});

searchEngine.subscribe(search => {
    if(!search || defaultSearchEngine === search) return localStorage.removeItem("shuttle||search");
    localStorage.setItem("shuttle||search", search);
});

proxy.subscribe(proxy => {
    if(!proxy || defaultProxy === proxy) return localStorage.removeItem("shuttle||proxy");
    localStorage.setItem("shuttle||proxy", proxy);
});

themeHex.subscribe(hex => {
    if(!hex || defaultThemeHex === hex) {
		document.body.style.backgroundColor = "";
		return localStorage.removeItem("shuttle||themehex");
	}
	document.body.style.backgroundColor = hex;
    localStorage.setItem("shuttle||themehex", hex);
});

lightMode.subscribe(isLight => {
	if(isLight) {
		document.body.classList.add("light");
		localStorage.setItem("shuttle||lightMode", "true");
	} else {
		document.body.classList.remove("light");
		localStorage.removeItem("shuttle||lightMode");
	}
});

fortniteMode.subscribe(isEnabled => {
	if(isEnabled) {
		document.body.style.backgroundImage = "url(\"https://i.ytimg.com/vi/6evDWowLMbE/maxresdefault.jpg\")";
		localStorage.setItem("shuttle||fortniteMode", "true");
	} else {
		document.body.style.backgroundImage = "";
		localStorage.removeItem("shuttle||fortniteMode");
	}
})