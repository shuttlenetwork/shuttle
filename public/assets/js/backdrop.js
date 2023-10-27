function GEBI(tgt){return document.getElementById(tgt);}
function pGEBI(parent,id) {return parent.getElementById(id);}
function QS(tgt){return document.querySelector(tgt);}
function QSA(tgt){return document.querySelectorAll(tgt);}
function pQSA(parent,tgt){return parent.querySelectorAll(tgt);}
function pQS(parent,tgt){return parent.querySelector(tgt);}
function DCE(type){return document.createElement(type);}
function DCEns(NS,type){return document.createElementNS(NS,type);}
function AC(parent,tgt){return parent.appendChild(tgt);}
function ATTR(elem,attr,value){return elem.setAttribute(attr,value);}
function gATTR(elem,attr){return elem.getAttribute(attr);}
function AEL(target,type,listener){return target.addEventListener(type,listener);}
function REL(target,type,listener){return target.removeEventListener(type,listener);}
function CLEAN(tgt,sty,symbol){return Number(tgt.style[sty].replace(symbol,''))}
function gST(tgt,sty){return tgt.style[sty];}
function sST(tgt,sty,val){
 if(Array.isArray(sty)){  //if arrays sty and val should be same size
   let i,n=sty.length;
   for(i=0;i<n;i++){tgt.style[sty[i]]=val[i];}
 }else{
    tgt.style[sty]=val;
 }
}
var i,j,k;
var NS='http://www.w3.org/2000/svg';
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var delta = 0.001,
    i = 0, j,
    n = 2000, // Total number of random points.
    k = 20; // Number of points to replace per frame.

var rx = d3.randomNormal(width / 2, 80),
    ry = d3.randomNormal(height / 2, 80),
    points = d3.range(n).map(function() { return [rx(), ry()]; });

var color = d3.scaleSequential(d3.interpolateLab("black", "steelblue"))
    .domain([0, 20]);

var hexbin = d3.hexbin()
    .radius(20)
    .extent([[0, 0], [width, height]]);

var hexagon = svg.selectAll("path")
  .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon(19.5))
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return color(d.length); });

// Listen for mousemove events on the SVG element
svg.on("mousemove", function() {
  var mouse = d3.mouse(this);
  rx = d3.randomNormal(mouse[0], 80),
  ry = d3.randomNormal(mouse[1], 80);
});

d3.timer(function(elapsed) {
  for (j = 0; j < k; ++j, i = (i + 1) % n) points[i] = [rx(), ry()];

  hexagon = hexagon
    .data(hexbin(points), function(d) { return d.x + "," + d.y; });

  hexagon.exit().remove();

  hexagon = hexagon.enter().append("path")
      .attr("d", hexbin.hexagon(19.5))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagon)
      .attr("fill", function(d) { return color(d.length); });
});