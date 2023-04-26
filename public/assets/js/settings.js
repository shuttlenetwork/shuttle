const changeSearch = (target) => {
  switch (target.value) {
    case 'DuckDuckGo':
      localStorage.setItem('search', 'DuckDuckGo')
      break;
    case 'Brave':
      localStorage.setItem('search', 'Brave');
      break;
    case 'Google':
      localStorage.setItem('search', 'Google');
      break;
    default: 
      localStorage.setItem('search', 'Google')
  }
}
/*const changeAutoCloak = (target) => {
  switch (target.value) {
    case 'None':
      localStorage.setItem('autoCloak', false)
      break;
    case 'Low':
      localStorage.setItem('autoCloak', 'low');
      break;
    case 'High':
      localStorage.setItem('autoCloak', 'high');
      break;
  }
}*/
