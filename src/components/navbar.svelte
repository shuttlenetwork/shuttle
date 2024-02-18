<script lang="ts">
	import { Link } from "svelte-routing";
	import { frameURL, lightMode } from "../lib/state";
	import Clock from "./clock.svelte";
	import ShuttleNavLogo from "../assets/shuttle.png";

	function getProps({ isCurrent } : { isCurrent: boolean }) {
		return isCurrent ? { class: "nav-active" } : { class: "nav-btn" };
	}
</script>

{#if !$frameURL}
	<div class="sidebar">
		<Link to="/" id="logo">
			<img src={ShuttleNavLogo} alt="Logo" />
		</Link>

		<Link to="/" {getProps}>Home</Link>
		<Link to="/math" {getProps}>Games</Link>
		<Link to="/physics" {getProps}>Apps</Link>
		<Link to="/settings" {getProps}>Settings</Link>

		<Clock />
		
		<div>
			<input type="checkbox" class="checkbox" id="checkbox" bind:checked={$lightMode} />
			<label for="checkbox" class="checkbox-label">
				<i class="fas fa-moon"></i>
				<i class="fas fa-sun"></i>
				<span class="ball"></span>
			</label>
		</div>
	</div>
{/if}