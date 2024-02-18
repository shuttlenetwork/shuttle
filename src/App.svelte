<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import { tabTitle, defaultTitle, tabIcon, defaultIcon } from "./lib/state";
	import Navbar from "./components/navbar.svelte";

	import Homepage from "./routes/index.svelte";
	import Games from "./routes/games.svelte";
	import Apps from "./routes/apps.svelte";
	import Settings from "./routes/settings.svelte";
	import NotFound from "./routes/notfound.svelte";

	import Cursor from "./components/cursor.svelte";
	import Frame from "./components/frame.svelte";
</script>

<svelte:head>
	<title>{$tabTitle || defaultTitle}</title>
	<link rel="icon" href={$tabIcon || defaultIcon}>
</svelte:head>

<Router>
	<Navbar />
	<Frame />
	<Route path="/"><Homepage /></Route>
	<Route path="/math"><Games /></Route>
	<Route path="physics"><Apps /></Route>
	<Route path="/settings"><Settings /></Route>
	<Route path="*"><NotFound /></Route>
	<Cursor />
</Router>