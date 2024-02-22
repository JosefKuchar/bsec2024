<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script> 
	import MainFrame from "$lib/components/MainFrame.svelte";


	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
    import Dateformatter from '$lib/dateformatter.svelte';
</script>

<div class="h-full w-full mx-auto flex justify-center">
	<div class="flex-col w-full">
		<h1 class="h1 my-5">Můj účet</h1>
		<MainFrame>
			Slot 
		</MainFrame>
		
	</div>
</div>
