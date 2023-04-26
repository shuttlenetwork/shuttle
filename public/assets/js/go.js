const search = document.getElementById('search')

document.getElementById("form").addEventListener("submit", function(e) {
  e.preventDefault()
  pxy(search.value)
});
function uv(url) {
  window.location.hash = btoa(url)
  document.getElementById('align').style.display = 'flex';
  document.getElementsByClassName('sidebar').display = 'none';
  proxy()
}
function searchurl(url) {
  switch (localStorage.getItem("search")) {
    case 'DuckDuckGo':
      uv(`https://duckduckgo.com/?q=${url}`)
      break;
    case 'Brave':
      uv(`https://search.brave.com/search?q=${url}`)
      break;
    case 'Google':
      uv(`https://www.google.com/search?q=${url}`)
      break;
    default:
      localStorage.setItem("search", "Google")
      uv(`https://google.com/search?q=${url}`)
  }
}
function pxy(url) {
  console.log(`Going to ${url}`)
  if (!isUrl(url)) {
    searchurl(url)
  } else {
    if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'http://' + url
    uv(url)
  }
}
function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
  return false;
}