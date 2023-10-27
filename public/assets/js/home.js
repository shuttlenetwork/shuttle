const search = document.getElementById("search");
const msg = document.getElementById("m");
const frame = document.getElementById("ifr");

const splash = [
	"shuttle is so hot",
	"Go ahead, browse your ex's social media profiles.",
	"We take your online privacy as seriously as your ex takes stalking your social media profiles.",
	"Check our our github.",
	"Shhh... we won't tell anyone you're here.",
	"Join our discord for more links.",
	"We have ads to pay for the servers.",
	"Imagine not using shuttle",
	"No website is out of your reach now.",
	"Your online freedom, our promise.",
	"Because a blocked internet, is no internet at all.",
	"Site blocked? Not on our watch!",
	"What site r u going on.",
	"Now 99% less skiddy... wait who put that there??? :<",
	"try shittle toilet services"
];

// Only display the loading animation if it is needed
window.addEventListener("load", () => {
	const loaderContainer = document.querySelector(".loader-container");
	loaderContainer.style.opacity = "0";
	setTimeout(() => loaderContainer.style.display = "none", 500);
	document.querySelector("#splash").innerHTML = splash[Math.floor(Math.random() * (splash.length))];
  });

frame.addEventListener("load", () => msg.innerText = frame.contentDocument.title);

document.getElementById("form").addEventListener("submit", (event) => {
	event.preventDefault();
	go(search.value);
});

function searchurl(url) {
	switch (localStorage.getItem("search")) {
		case "DuckDuckGo":
			proxy(`https://duckduckgo.com/?q=${url}`)
			break;
		case "Brave":
			proxy(`https://search.brave.com/search?q=${url}`)
			break;
		case "Google":
			proxy(`https://www.google.com/search?q=${url}`)
			break;
		default:
			localStorage.setItem("search", "Google")
			proxy(`https://google.com/search?q=${url}`)
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

function proxy(url, dynamic = false) {
	document.getElementById("align").style.display = "flex";
	document.querySelector(".sidebar").style.display = "none";
	registerSW().then(worker => {
		if(!worker) {
			return msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
		}
		frame.src = dynamic ? "/shuttle-dn/" + __uv$config.encodeUrl(url): __uv$config.prefix + __uv$config.encodeUrl(url);
	});
}

window.addEventListener("DOMContentLoaded", () => {
	const link = btoa(window.location.hash.slice(1));
	if (link) go(link);
});

function exit() {
	document.getElementById("align").style.display = "none";
	document.querySelector(".sidebar").style.display = "";
	frame.src = "";
}