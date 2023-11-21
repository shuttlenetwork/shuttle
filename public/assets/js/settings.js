function findSel(sel, name) {
	return [...sel.querySelectorAll("option")].filter(e => e.value == name)[0];
}

function changeFavicon(value) {
	setFavicon(value);
	localStorage.setItem("shuttle||favicon", value);
}

function changeTitle(value) {
	document.title = value;
	localStorage.setItem("shuttle||title", value);
}


window.addEventListener("load", () => {
	const searchSelector = document.getElementById("se");
	const proxySelector = document.getElementById("proxy");
	try {
	const st = localStorage.getItem("shuttle||themehex");
	if (st) document.querySelector("#colorPicker").value = savedTheme;
	if(localStorage.getItem("shuttle||search")) findSel(searchSelector, localStorage.getItem("shuttle||search")).selected = true;
	if(localStorage.getItem("shuttle||proxy")) findSel(proxySelector, localStorage.getItem("shuttle||proxy")).selected = true;
	} catch {}
	searchSelector.addEventListener("change", e => localStorage.setItem("shuttle||search", e.target.value));
	proxySelector.addEventListener("change", e => localStorage.setItem("shuttle||proxy", e.target.value));
	document.querySelector("#reset-theme").addEventListener("click", resetTheme);
	document.querySelector("#abc").addEventListener("click", abc);
	document.querySelector("#mystery-button").addEventListener("click", setFortniteMode);
});

function changeTheme(value) {
	localStorage.setItem("shuttle||themehex", value);
	document.body.style.backgroundColor = value;
}

function resetTheme() {
	localStorage.removeItem("shuttle||themehex");
	document.body.style.backgroundColor = "#0b0b0b";
	document.querySelector("#colorPicker").value = "#0b0b0b";
}

function setFortniteMode() {
	if (localStorage.getItem("shuttle||fortniteMode") === "activated") {
		// If Fortnite Mode is already activated, deactivate it
		document.body.style.backgroundImage = "";
		localStorage.removeItem("shuttle||fortniteMode")
	} else {
		// Otherwise, activate it
		document.body.style.backgroundImage = "url(\"https://i.ytimg.com/vi/6evDWowLMbE/maxresdefault.jpg\")";
		localStorage.setItem("shuttle||fortniteMode", "activated");
	}
}