<script lang="ts">
	import type { DataHandler } from '@vincjo/datatables';
	export let handler: DataHandler;
	let value: string;
</script>

<input
	class="input sm:w-64 w-36"
	type="search"
	placeholder="Hledat..."
	bind:value
	on:input={() => handler.search(value)}
/>
