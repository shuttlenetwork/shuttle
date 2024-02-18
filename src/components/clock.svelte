<script lang="ts">
	import { onMount } from "svelte";

	let time = "";
	onMount(() => {
		const interval = setInterval(mostUselessFunction, 1000);
		return () => clearInterval(interval);
	});

	function mostUselessFunction() {
		var currentTime = new Date();

		var year: any = currentTime.getFullYear();
		var month: any = currentTime.getMonth() + 1; // Months are zero-based
		var day: any = currentTime.getDate();

		var hours: any = currentTime.getHours();
		var minutes: any = currentTime.getMinutes();
		var seconds: any = currentTime.getSeconds();

		var ampm = hours >= 12 ? "PM" : "AM";

		hours = hours % 12 || 12;
		month = (month < 10 ? "0" : "") + month;
		day = (day < 10 ? "0" : "") + day;
		hours = (hours < 10 ? "0" : "") + hours;
		minutes = (minutes < 10 ? "0" : "") + minutes;
		seconds = (seconds < 10 ? "0" : "") + seconds;
		time = `${year}/${month}/${day} ${hours}:${minutes}:${seconds} ${ampm}`;
	}
</script>

<span class="nav-btn">{time}</span>

<style>
	.nav-btn {
		display: flex;
		justify-content: flex-end;
		margin-left: auto;
	}
</style>