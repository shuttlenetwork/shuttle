<script lang="ts">
	import GamesList from "../components/gameslist.svelte";
	import ShuttleNavLogo from "../assets/shuttle.png";
	
	const games = [
		{
			src: "https://example.com",
			name: "shuttle test",
			image: ShuttleNavLogo
		}
	];
</script>

<GamesList games={games} title="Apps" />