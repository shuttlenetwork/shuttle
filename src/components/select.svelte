<script lang="ts">
	import type { Writable } from "svelte/store";
	interface ISetting {
		name: string
		value: string
	}
	export let settings: ISetting[];
	export let store: Writable<string | null>;

	function change(event: any) {
		$store = event.target.value;
	}
</script>

<select class="browsers" on:change={change}>
	{#each settings as setting}
		<option value={setting.value} selected={$store === setting.value}>{setting.name}</option>
	{/each}
</select>