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

registerSW();

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

window.addEventListener("load", () => {
  if (localStorage.getItem("title")) document.title = localStorage.getItem("title");
  if (localStorage.getItem("favicon")) setFavicon(localStorage.getItem("favicon"));
});


