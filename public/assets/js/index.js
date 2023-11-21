window.bare = new Ultraviolet.BareClient(new URL(__uv$config.bare, window.location));

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
  await navigator.serviceWorker.register("/dynamic.sw-handler.js", {
    scope: "/shuttle-dn",
  });
  const workerURL = "/uv.sw-handler.js";
  const worker = await navigator.serviceWorker.getRegistration(workerURL, {
    scope: "/shuttle-uv",
  });
  if (worker) return worker;
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

function encodeUVUrlWithPath(url = "") {
  return __uv$config.prefix + __uv$config.encodeUrl(url);
}

function abc() {
	let inFrame;

	try {
		inFrame = window !== top;
	} catch (e) {
		inFrame = true;
	}

	if (inFrame) return;
	const popup = window.open();
	if (!popup || popup.closed) {
		alert("Auto tab mask failed to open a new tab, allow popups and reload");
		return;
	}

	popup.document.body.innerHTML = `<title>${localStorage.getItem("shuttle||name") || "Sign in to your account"}</title>
<link rel="icon" href="${localStorage.getItem("shuttle||icon") || "https://www.microsoft.com/favicon.ico"}">
<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="${window.location.href}"></iframe>`;

	window.location.replace("https://www.google.com/");
}

registerSW();

window.addEventListener("load", () => {
  if (localStorage.getItem("shuttle||title")) document.title = localStorage.getItem("shuttle||title");
  if (localStorage.getItem("shuttle||favicon")) setFavicon(localStorage.getItem("shuttle||favicon"));
});