particlesJS("particles-js", {"particles":{"number":{"value":558,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.9700642968236413,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"bottom","random":true,"straight":true,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":false,"mode":"push"},"resize":true},"modes":{"grab":{"distance":292.33117874427535,"line_linked":{"opacity":0.2714664122011815}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/uv.sw-handler.js', { scope: __uv$config.prefix })
}

function fullscreen() {
  var elem = document.getElementById('ifr')
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
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = f;
}
window.onload = () => {
  if(localStorage.getItem('title')) {
    document.title = localStorage.getItem('title')
  }
  if(localStorage.getItem('favicon')) {
    changeFavicon(localStorage.getItem('favicon'))
  }
}
/*document.addEventListener("visibilitychange", () => {
  var l = localStorage.getItem('autoCloak')
  if(!l) return;
  if (document.visibilityState === 'hidden') {
    switch (l) {
      case 'low':
        changeFavicon('https://google.com/favicon.ico')
        document.title = 'Google'
      case 'high':
        document.location.href = 'https://google.com'
    }
  } else if (document.visibilityState === 'visible') {
    changeFavicon(localStorage.getItem('favicon'))
    document.title = localStorage.getItem('title')
  } else{ console.log('Visibility Change: ' + document.visibilityState) }
});*/