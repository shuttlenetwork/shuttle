if(!localStorage.getItem("visited")) {
	alert(`Hello! This website is available at no cost to you, however,
it requires alot of money to keep the servers running, which can be expensive.
If you have an ad blocker, we would appreciate it if you could disable it to help us maintain the website.
Your support means a lot to us.  <3`);
	localStorage.setItem("visited", true);
}

registerSW();

function fullscreen() {
	var elem = document.getElementById("ifr")
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}
}

async function registerSW() {
	if (!("serviceWorker" in navigator)) return;
	const workerURL = "/uv.sw-handler.js";
	const worker = await navigator.serviceWorker.getRegistration(workerURL);
	if(worker) return worker;
	return navigator.serviceWorker.register(workerURL, { scope: __uv$config.prefix });
}

function setFavicon(f) {
	var link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement("link");
		link.rel = "icon";
		document.head.appendChild(link);
	}
	link.href = f;
}

window.addEventListener("load", () => {
	if (localStorage.getItem("title")) document.title = localStorage.getItem("title");
	if (localStorage.getItem("favicon")) setFavicon(localStorage.getItem("favicon"));
});