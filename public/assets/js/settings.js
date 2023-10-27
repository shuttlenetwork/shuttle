function changeSearch(target) {
  switch (target.value) {
    case "DuckDuckGo":
      localStorage.setItem("search", "DuckDuckGo")
      break;
    case "Brave":
      localStorage.setItem("search", "Brave");
      break;
    case "Google":
      localStorage.setItem("search", "Google");
      break;
    default: 
      localStorage.setItem("search", "Google")
  }
}
function changeProxy(target) {
  switch (target.value) {
    case "Dynamic":
      localStorage.setItem("proxy", "Dynamic");
      break;
    case "Ultraviolet":
      localStorage.setItem("proxy", "Ultraviolet");
      break;
    default: 
      localStorage.setItem("proxy", "Dynamic")
  }
}

function changeFavicon(value) {
	setFavicon(value);
	localStorage.setItem("shuttle||favicon", value);
}

function changeTitle(value) {
	document.title = value;
	localStorage.setItem("shuttle||title", value);
}

function abc() {
	window.open().document.body.innerHTML =`<iframe style="height:100%; width: 100%; border: none; position: fixed; top: 0; right: 0; left: 0; bottom: 0; border: none" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation" src="${window.location.href}"></iframe>`;
	window.location = "https://google.com";
}

function changeTheme(value) {
  localStorage.setItem("themehex", value);
  document.body.style.backgroundColor = value;
  document.querySelector('#colorPicker').value = value;
}

function resetTheme() {
  localStorage.removeItem("themehex");
  document.body.style.backgroundColor = "#0b0b0b";
  document.querySelector('#colorPicker').value = "#0b0b0b";
}

function initTheme() {
  const savedTheme = localStorage.getItem("themehex");
  if (savedTheme) {
    document.body.style.backgroundColor = savedTheme;
    document.querySelector('#colorPicker').value = savedTheme;
  }
}

window.addEventListener('load', initTheme);



