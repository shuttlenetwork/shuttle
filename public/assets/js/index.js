//particlesJS("particles-js", {"particles":{"number":{"value":558,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.9700642968236413,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"bottom","random":true,"straight":true,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":292.33117874427535,"line_linked":{"opacity":0.2714664122011815}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = "absolute"; stats.domElement.style.left = "0px"; stats.domElement.style.top = "0px"; document.body.appendChild(stats.domElement); count_particles = document.querySelector(".js-count-particles"); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

if (localStorage.getItem("visited") === null) {
  alert("Hello! This website is available at no cost to you, however, it requires alot of money to keep the servers running, which can be expensive. If you have an ad blocker, we would appreciate it if you could disable it to help us maintain the website. Your support means a lot to us.  <3 ");
  localStorage.setItem("visited", true);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/uv.sw-handler.js", { scope: __uv$config.prefix })
}

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
function changeFavicon(f) {
  var link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = f;
}
window.onload = () => {
  if(localStorage.getItem("title")) {
    document.title = localStorage.getItem("title")
  }
  if(localStorage.getItem("favicon")) {
    changeFavicon(localStorage.getItem("favicon"))
  }
}
/*document.addEventListener("visibilitychange", () => {
  var l = localStorage.getItem("autoCloak")
  if(!l) return;
  if (document.visibilityState === "hidden") {
    switch (l) {
      case "low":
        changeFavicon("https://google.com/favicon.ico")
        document.title = "Google"
      case "high":
        document.location.href = "https://google.com"
    }
  } else if (document.visibilityState === "visible") {
    changeFavicon(localStorage.getItem("favicon"))
    document.title = localStorage.getItem("title")
  } else{ console.log("Visibility Change: " + document.visibilityState) }
});*/

var curzr = `<div class="curzr" hidden></div>`
document.body.insertAdjacentHTML("beforeend", curzr)

class GlitchEffect {
  constructor() {
    this.root = document.body
    this.cursor = document.querySelector(".curzr")

    this.distanceX = 0, 
    this.distanceY = 0,
    this.pointerX = 0,
    this.pointerY = 0,
    this.previousPointerX = 0
    this.previousPointerY = 0
    this.cursorSize = 25
    this.glitchColorB = "#00feff"
    this.glitchColorR = "#ff4f71"

    this.cursorStyle = {
      boxSizing: "border-box",
      position: "fixed",
      top: `${ this.cursorSize / -2 }px`,
      left: `${ this.cursorSize / -2 }px`,
      zIndex: "2147483647",
      width: `${ this.cursorSize }px`,
      height: `${ this.cursorSize }px`,
      backgroundColor: "#222",
      borderRadius: "50%",
      boxShadow: `0 0 0 ${this.glitchColorB}, 0 0 0 ${this.glitchColorR}`,
      transition: "100ms, transform 100ms",
      userSelect: "none",
      pointerEvents: "none"
    }

    if (CSS.supports("backdrop-filter", "invert(1)")) {
      this.cursorStyle.backdropFilter = "invert(1)"
      this.cursorStyle.backgroundColor = "#fff0"
    } else {
      this.cursorStyle.backgroundColor = "#222"
    }

    this.init(this.cursor, this.cursorStyle)
  }

  init(el, style) {
    Object.assign(el.style, style)
    this.cursor.removeAttribute("hidden")
    
    document.body.style.cursor = "none"
    document.body.querySelectorAll("button, label, input, textarea, select, a").forEach((el) => {
      el.style.cursor = "inherit"
    })
  }

  move(event) {
    this.previousPointerX = this.pointerX
    this.previousPointerY = this.pointerY
    this.pointerX = event.pageX + this.root.getBoundingClientRect().x
    this.pointerY = event.pageY + this.root.getBoundingClientRect().y
    this.distanceX = Math.min(Math.max(this.previousPointerX - this.pointerX, -10), 10)
    this.distanceY = Math.min(Math.max(this.previousPointerY - this.pointerY, -10), 10)

    if (event.target.localName === "button" || 
        event.target.localName === "a" || 
        event.target.onclick !== null ||
        event.target.className.includes("curzr-hover")) {
      this.hover()
    } else {
      this.hoverout()
    }

    if (
      this.pointerX < 0 ||
      this.pointerY < 0 ||
      this.pointerX >= window.innerWidth ||
      this.pointerY >= window.innerHeight
    ) {
      this.cursor.style.display = "none";
    } else {
      this.cursor.style.display = "flex";
    }

    this.cursor.style.transform = `translate3d(${this.pointerX}px, ${this.pointerY}px, 0)`
    this.cursor.style.boxShadow = `
      ${+this.distanceX}px ${+this.distanceY}px 0 ${this.glitchColorB}, 
      ${-this.distanceX}px ${-this.distanceY}px 0 ${this.glitchColorR}`
    this.stop()
  }

  hover() {
  }

  hoverout() {
  }

  click() {
    this.cursor.style.transform += `scale(0.75)`
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(` scale(0.75)`, "")
    }, 35)
  }

  stop() {
    if (!this.moving) {
      this.moving = true
      setTimeout(() => {
        this.cursor.style.boxShadow = ""
        this.moving = false
      }, 50)
    }
  }

  remove() {
    this.cursor.remove()
  }
}

(() => {
  const cursor = new GlitchEffect()
  if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.onmousemove = function (event) {
        cursor.move(event);
    }
    document.onclick = function () {
      cursor.click();
    }
    document.addEventListener("mouseleave", function(event) {
      if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {
        cursor.cursor.style.display = "none";
      } else {
        cursor.cursor.style.display = "flex";
      }
    });
    document.addEventListener("mouseover", (event) => {
      const targetElement = event.target;
      const isCursorOverDisappearElement = targetElement.tagName.toLowerCase() === "iframe";
    
      if (isCursorOverDisappearElement) {
        cursor.cursor.style.display = "none";
      }
    });
  } else {
    cursor.remove();
  }
})()

var splash = [
  "shuttle is so hot",
  "Go ahead, browse your ex's social media profiles.",
  "We take your online privacy as seriously as your ex takes stalking your social media profiles.",
  "Check our our github.",
  "Shhh... we won't tell anyone you're here.",
  "Join our discord for more links.",
  "We have ads to support the creators.",
  "Imagine not using shuttle",
  "No website is out of your reach now.",
  "Your online freedom, our promise.",
  "Because a blocked internet, is no internet at all.",
  "Site blocked? Not on our watch!",
  "What site r u going on.",
]

var p = document.querySelector("#splash")
p.innerHTML = splash[Math.floor(Math.random() * (splash.length))]

p.style.color = "rgba(180, 180, 180, 0.5)";
p.style.fontFamily = "Poppins, sans-serif"; 
p.style.marginBottom = "30px"; 
p.style.textAlign = "center";