const msg = document.getElementById("m");
const frame = document.getElementById("ifr");

window.aiptag = window.aiptag || {cmd: []};
aiptag.cmd.player = aiptag.cmd.player || [];
//CMP tool settings
aiptag.cmp = {
	show: true,
	position: "centered",  //centered, bottom
	button: true,
	buttonText: "Privacy settings",
	buttonPosition: "bottom-left" //bottom-left, bottom-right, bottom-center, top-left, top-right
}
aiptag.cmd.player.push(function() {
	aiptag.adplayer = new aipPlayer({
		AD_WIDTH: 960,
		AD_HEIGHT: 540,
		AD_DISPLAY: 'fullscreen', //default, fullscreen, fill, center, modal-center
		LOADING_TEXT: 'Loading Shuttle AD',
		PREROLL_ELEM: function(){return document.getElementById('videoad')},
		AIP_COMPLETE: function (state)  {
			/*******************
			 ***** WARNING *****
			 *******************
			 Please do not remove the PREROLL_ELEM
			 from the page, it will be hidden automaticly.
			*/
			
			// alert("Video Ad Completed: " + state);
		}
	});

		});

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
    show_videoad()
        .then(() => {
            document.getElementById("align").style.display = "flex";
            document.querySelector(".sidebar").style.display = "none";
            registerSW().then(worker => {
                if (!worker) {
                    return msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
                }
                frame.src = resolveURL(url);
            });
        })
        .catch(() => {
            console.warn("Ad failed to load, continuing without ad...");
            document.getElementById("align").style.display = "flex";
            document.querySelector(".sidebar").style.display = "none";
            registerSW().then(worker => {
                if (!worker) {
                    return msg.innerHTML = "Error: Your browser does not support service workers or is blocking them (private browsing mode?), try using a different browser";
                }
                frame.src = resolveURL(url);
            });
        });
}

function exit() {
	document.getElementById("align").style.display = "none";
	document.querySelector(".sidebar").style.display = "";
	frame.src = "";
}

function show_videoad() {
	if (typeof aiptag.adplayer !== 'undefined') {
		aiptag.cmd.player.push(function() { aiptag.adplayer.startVideoAd(); });
	} else {
		aiptag.adplayer.aipConfig.AIP_COMPLETE();
	}
}
