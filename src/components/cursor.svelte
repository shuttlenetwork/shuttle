<script lang="ts">
	import {
		timer as d3timer,
		randomNormal,
		range,
		scaleSequential,
		interpolateLab,
		pointer,
		select
	} from "d3";
	import { hexbin as createHexbin } from "d3-hexbin";
	import { onMount } from "svelte";
	
	let svgElem: SVGSVGElement;

	onMount(() => {
		var svg = select(svgElem),
			width = +svg.attr("width"),
			height = +svg.attr("height");

		var i = 0,
			j,
			n = 500, // Total number of random points.
			k = 2; // Number of points to replace per frame.

		var rx = randomNormal(width / 2, 80),
			ry = randomNormal(height / 2, 80),
			points: [number, number][] = range(n).map(() => [rx(), ry()]);

		var color = scaleSequential(interpolateLab("#330066", "#601fa7")).domain([0, 20]);

		var hexbin = createHexbin()
			.radius(12) // 60% smaller radius
			.extent([
				[0, 0],
				[width, height]
			]);

		var hexagon = svg
			.selectAll("path")
			.data(hexbin(points))
			.enter()
			.append("path")
			.attr("d", hexbin.hexagon(9.75))
			.attr("transform", (d) => {
				return "translate(" + d.x + "," + d.y + ")";
			})
			.attr("fill", (d) => {
				return color(d.length);
			});

		// Listen for mousemove events on the SVG element
		svg.on("mousemove", (event) => {
			var [mouseX, mouseY] = pointer(event);
			rx = randomNormal(mouseX, 80)
			ry = randomNormal(mouseY, 80)
		});

		const timer = d3timer(() => {
			for (j = 0; j < k; ++j, i = (i + 1) % n) points[i] = [rx(), ry()];

			hexagon = hexagon.data(hexbin(points), (d) => {
				return d.x + "," + d.y;
			});

			hexagon.exit().remove();

			hexagon = hexagon
				.enter()
				.append("path")
				.attr("d", hexbin.hexagon(9.75))
				.attr("transform", (d) => {
					return "translate(" + d.x + "," + d.y + ")";
				})
				.merge(hexagon)
				.attr("fill", (d) => {
					return color(d.length);
				});
		});
		return () => {
			timer.stop();
		}
	});
</script>

<svg height="100%" width="100%" style="position: fixed; z-index: 0;" bind:this={svgElem}></svg>