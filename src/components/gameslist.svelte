<script lang="ts">
	import { frameURL } from "../lib/state";

	interface IGame {
		src: string;
		name: string;
		image: string;
	}
	export let games: IGame[];
	export let title: string;

	let filteredGames = games;
	function go(url: string) {
		$frameURL = url;
	}

	function onInput(event: any) {
		const q: string = event.target.value.toLowerCase();
		filteredGames = games.filter((i) => i.name.toLowerCase().includes(q));
	}
</script>

<div class="games-body">
	<h1 style="margin-top: 40px; z-index: 5;">{title}</h1>
	<form>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			type="search"
			autofocus
			autocomplete="off"
			class="search"
			id="search"
			placeholder="Search"
			style="cursor: inherit;"
			on:input={onInput}
		/>
	</form>
	<div class="games">
		{#each filteredGames as game}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="game" on:click={() => go(game.src)}>
				<img src={game.image} alt={game.name} />
				<h2>{game.name}</h2>
			</div>
		{/each}
	</div>
</div>

<style>
	.games-body {
		overflow: auto;
		color: #8151ff;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-family: "Poppins", sans-serif;
	}

	.games {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 1200px;
		width: 100%;
		margin-top: 40px;
	}

	.game {
		flex-basis: calc(25% - 20px);
		margin: 10px;
		padding: 20px;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.2s ease;
		background: rgba(35, 37, 36, 0.1);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		-moz-backdrop-filter: blur(8px);
		-ms-backdrop-filter: blur(8px);
		-webkit-box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.75);
		box-shadow: 0 0 50px -5px rgba(0, 0, 0, 0.75);
		border: 1px solid rgba(0, 0, 0, 0.2);
		z-index: 4;
	}

	.game:hover {
		transform: scale(1.05);
	}

	.game img {
		display: block;
		width: 200px;
		height: 200px;
		margin-bottom: 20px;
		border-radius: 10px;
		margin: auto;
	}

	.game h2 {
		font-size: 1.8rem;
		margin-top: 1;
		margin-bottom: 10px;
		text-align: center;
		font-family: "Poppins", sans-serif;
	}

	.game p {
		display: none;
	}

	@media screen and (max-width: 1200px) {
		.games {
			max-width: 900px;
		}

		.game {
			flex-basis: calc(33.33% - 20px);
			margin: 10px 20px;
		}
	}

	@media screen and (max-width: 900px) {
		.games {
			max-width: 600px;
		}

		.game {
			flex-basis: calc(50% - 20px);
			margin: 10px 20px;
		}
	}

	@media screen and (max-width: 600px) {
		.game {
			flex-basis: calc(50% - 20px);
			margin: 10px 20px;
		}
	}

	@media screen and (max-width: 400px) {
		.game {
			flex-basis: calc(100% - 20px);
			margin: 10px;
		}
	}

	.search {
		border-radius: 5px;
		outline-color: transparent;
		font-size: 16px;
		padding: 5px;
		width: 100%;
		height: 30px;
		background-color: inherit;
		color: #616161;
		border: none;
		z-index: 5;
	}

	.search-bar input {
		width: 100%;
		padding: 5px 10px;
		border-radius: 5px;
		border: none;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		border-radius: 15px;
		outline-color: transparent;
		font-size: 16px;
		padding: 8px;
		height: 30px;
		background-color: transparent;
		padding-right: 10px;
		color: #616161;
		width: 50%;
		margin: 0 auto;
		z-index: 5;
		transition:
			width 0.5s ease,
			border-radius 0.5s ease,
			box-shadow 0.5s ease;
		box-shadow:
			0 0 10px rgba(119, 0, 255, 0.7),
			0 0 20px rgba(49, 0, 128, 0.7);
	}
</style>
