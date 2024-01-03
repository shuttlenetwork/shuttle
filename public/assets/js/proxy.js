const msg = document.getElementById("m");
const frame = document.getElementById("ifr");

frame.addEventListener("load", () => msg.innerText = frame.contentDocument.title);

function searchurl(url) {
	switch (localStorage.getItem("shuttle||search")) {
		case "ddg":
			proxy(`https://duckduckgo.com/?q=${url}`)
			break;
		case "brave":
			proxy(`https://search.brave.com/search?q=${url}`)
			break;
		default:
		case "google":
			proxy(`https://www.google.com/search?q=${url}`)
			break;
	}
}

function go(url) {
	if (!isUrl(url)) searchurl(url); else {
		if (!(url.startsWith("https://") || url.startsWith("http://"))) url = "http://" + url
		proxy(url)
	}
}

function isUrl(val = "") {
	if (/^http(s?):\/\//.test(val) || val.includes(".") && val.substr(0, 1) !== " ") return true;
	return false;
}

function resolveURL(url) {
	switch(localStorage.getItem("shuttle||proxy")) {
		case "dy": 
			return "/shuttle-dn/" + Ultraviolet.codec.xor.decode(url);
		default:
		case "uv":
			return  __uv$config.prefix + __uv$config.encodeUrl(url);
	}
}

function proxy(url) {
	document.getElementById("align").style.display = "flex";
	document.querySelector(".sidebar").style.display = "none";
	registerSW().then(worker => {
		if(!worker) {
			return msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
		}
		frame.src = resolveURL(url);
	});
}

function exit() {
	document.getElementById("align").style.display = "none";
	document.querySelector(".sidebar").style.display = "";
	frame.src = "";
}