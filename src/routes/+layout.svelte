<script lang="ts">
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar/>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader">
		<PageHeader/>
	</svelte:fragment>
	<svelte:fragment>
		<div class="mx-20 h-full">
			<slot />
		</div>
	</svelte:fragment>
</AppShell>


