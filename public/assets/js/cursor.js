var i, j, k;
var NS = 'http://www.w3.org/2000/svg';
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var delta = 0.001,
    i = 0, j,
    n = 500, // Total number of random points.
    k = 2; // Number of points to replace per frame.

var rx = d3.randomNormal(width / 2, 80),
    ry = d3.randomNormal(height / 2, 80),
    points = d3.range(n).map(function() { return [rx(), ry()]; });

var color = d3.scaleSequential(d3.interpolateLab("#330066", "#601fa7"))
    .domain([0, 20]);

var hexbin = d3.hexbin()
    .radius(12) // 60% smaller radius
    .extent([[0, 0], [width, height]]);

var hexagon = svg.selectAll("path")
  .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon(9.75)) 
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
      .attr("d", hexbin.hexagon(9.75))
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .merge(hexagon)
      .attr("fill", function(d) { return color(d.length); });
});
