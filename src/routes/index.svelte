<script lang="ts">
	import bare from "../lib/bareclient";
	import { frameURL } from "../lib/state";
	import resolveProxy from "../lib/resolveProxy";
	import Ad from "../components/ad.svelte";
	import HomepageLogo from "../assets/homepage.png";

	let input: string;
	let results: string[] = [];

	function go(url: string) {
		frameURL.set(resolveProxy(url));
	}
	
	let debounceTimeout = 0;
	var isRequestPending = false;

	async function fetchResults(searchText: string) {
		try {
			const response = await bare.fetch(
				`https://duckduckgo.com/ac/?q=${encodeURIComponent(
					searchText,
				)}`,
			);
			const data = await response.json();
			isRequestPending = false;
			if (!Array.isArray(data)) {
				console.log(
					`Error: Invalid response format. Expected Array (got ${typeof data})`,
				);
				return;
			}
			results = data.map((r) => r.phrase);
		} catch (e) {
			isRequestPending = false;
			console.error(e);
		}
	}
</script>

<div class="alignment-container-1" style="margin-top:15%;">
	<div class="header-container">
		<div class="logo-image">
			<img src={HomepageLogo} alt="Shuttle Logo" width="100%" />
		</div>
	</div>
	<div class="header-container" style="margin-bottom: 50px;"></div>
	<form id="form" on:submit|preventDefault={() => go(input)}>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			autofocus
			autocomplete="off"
			class="search"
			id="search"
			placeholder="URL Or Search"
			required
			bind:value={input}
			on:input={(event) => {
				clearTimeout(debounceTimeout);
				// @ts-ignore
				const searchText = event.target.value;

				debounceTimeout = setTimeout(() => {
					if (searchText.length >= 1) fetchResults(searchText);
					else results = [];
				}, 100);
			}}
		/>
		<button type="submit" class="submit-button">
			<i class="fas fa-search searchicon"></i>
		</button>
	</form>
	<div id="suggestions">
		{#each results as result}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="suggestions">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<span on:click|preventDefault={() => go(result)}>{result}</span>
			</div>
		{/each}
	</div>
	<div style="margin-top: 50px; z-index: 1;">
		<Ad />
	</div>

	<footer>
		<a title="discord" href="https://discord.gg/xi">Discord</a>
		<a title="github" href="https://github.com/shuttlenetwork/shuttle"
			>Github</a
		>
	</footer>
</div>
