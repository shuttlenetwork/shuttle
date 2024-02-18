<script lang="ts">
	import Select from "../components/select.svelte";
	import {
		searchEngine,
		proxy,
		tabTitle,
		tabIcon,
		themeHex,
		fortniteMode
	} from "../lib/state";
	import abc from "../lib/abc";
	import Ad from "../components/ad.svelte";
</script>

<div class="container">
	<div class="row" style="margin-top:5%;">
		<div class="box">
			<p>Search Engine</p>
				<Select settings={[
					{ name: "Google", value: "google" },
					{ name: "DuckDuckGo", value: "ddg" },
					{ name: "Brave", value: "brave" }
				]} store={searchEngine} />
		</div>
		<div class="box">
			<p>Title</p>
			<input type="text" class="settingsInput button" bind:value={$tabTitle}
				placeholder="Change Title" />
			<input type="text" class="settingsInput button" bind:value={$tabIcon}
				placeholder="Change Favicon (URL)" />
		</div>
		<div class="box">
			<p>Proxy Type</p>
			<Select settings={[
				{ name: "Ultraviolet", value: "uv" },
				{ name: "Dynamic (BETA)", value: "dy" }
			]} store={proxy} />
		</div>
	</div>

	<div class="row">
		<div class="box">
			<p>Mystery</p>
			<button class="button" id="mystery-button" on:click={() => fortniteMode.set(!$fortniteMode)}>Toggle</button>
		</div>
		<div class="box">
			<p>Custom Themes</p>
			<input type="color" id="colorPicker" class="settingsInput button" bind:value={$themeHex}>
			<button class="button" id="reset-theme" on:click={() => themeHex.set(null)}>Reset</button>
		</div>
		<div class="box">
			<p>About:Blank Cloaking</p>
			<button class="button" id="abc" on:click={abc}>Click Me</button>
		</div>
	</div>
</div>

<div style="margin-top: 50%; z-index: 1;">
	<Ad />
</div>

<style>
	.box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 25px;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.container {
		display: flex;
		flex-direction: column;
	}
</style>