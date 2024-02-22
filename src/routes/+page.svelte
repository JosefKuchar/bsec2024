<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts"> 
	import MainFrame from "$lib/components/MainFrame.svelte";


	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
    import Dateformatter from '$lib/dateformatter.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from "./$types";
	import { Dir } from "$lib/enums";

	export let data : PageData;

	const handler = new DataHandler(data.transactions, { rowsPerPage: 10 });
	const rows = handler.getRows();

</script>

<div class="h-full w-full mx-auto flex justify-center">
	<div class="flex-col w-full">
		<h1 class="h1 my-5">Můj účet</h1>
		<MainFrame>
			Slot 
		</MainFrame>
		<div class="table-container space-y-4 mt-10">
			<header class="flex justify-between gap-4">
				<Search {handler}/>
				<div class="flex gap-4">
					<RowsPerPage {handler} />
					<a class="btn variant-filled-primary" href="change/new"
						>Nový</a
					>
				</div>
			</header>
			<table class="table table-hover table-compact table-auto w-full">
				<thead>
					<tr>
						<ThSort {handler} orderBy="name">Název</ThSort>
						<ThSort {handler} orderBy="amount">Částka</ThSort>
						<ThSort {handler} orderBy="from">Datum</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
						<ThFilter {handler} filterBy="amount" />
						<ThFilter {handler} filterBy="date" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr class="cursor-pointer">
							<td>{row.name}</td>
							<td class={`${row.type == Dir.Incomes? 'text-success-500' : 'text-error-500'}`}>
								{#if row.type == Dir.Incomes}
									+{:else}
									-{/if}{row.amount} Kč</td>
                            <td><Dateformatter date_string={row.date}/></td>

                            <!-- todo fix type missing in page data -->
						</tr>
					{/each}
				</tbody>
			</table>
			<footer class="flex justify-between">
				<RowCount {handler} />
				<Pagination {handler} />
			</footer>
		</div>
	</div>
</div>
