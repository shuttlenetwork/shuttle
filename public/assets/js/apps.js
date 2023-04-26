const buildGS = async () => {
  const res = await fetch('/assets/json/apps.json')
  const json = await res.json()
  console.log(json)
  json.forEach(element => {
    const div = document.createElement('div')
    div.className = "box"
    div.innerHTML = `<img class="gs-img" src="${element.image}" /><h7 class="h7 gs-box-header">${element.title}</h7>`
    div.setAttribute("onclick", `window.open('${element.loc}')`)
    document.getElementById('apps-container').append(div);
  })
}

buildGS()