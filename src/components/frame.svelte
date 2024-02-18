<script lang="ts">
	import { frameURL } from "../lib/state";

	let message: string;
	let ifr: HTMLIFrameElement;
</script>

<div id="align" style={`display: ${$frameURL ? "flex" : "none"}`}>
	<nav id="nav">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={() => frameURL.set(null)}>
			<i class="fa-solid fa-xmark"
				style="color: white; margin-right: auto; margin-left: 20px; font-size: 24px;cursor: pointer;"></i>
		</span>
		<span id="m" style="margin: auto;">{message}</span>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<span on:click={() => ifr.requestFullscreen()}>
			<i class="fa-solid fa-expand"
			style="color: white; margin-left: auto; margin-right: 45px; font-size: 20px;cursor: pointer;"></i>
		</span>
	</nav>
	<iframe id="ifr" src={$frameURL} title="Frame" on:load={(event) => {
		// @ts-ignore
		const title = event.target.contentDocument?.title;
		message = title || "";
	}} bind:this={ifr} />
</div>