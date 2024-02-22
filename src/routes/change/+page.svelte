<script lang="ts">
	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from './$types';
    import Time from "svelte-time";
    import Dateformatter from '$lib/dateformatter.svelte';

	export let data: PageData;
    const incomes_handler = new DataHandler(data.incomes, { rowsPerPage: 1 });
    const expenses_handler = new DataHandler(data.expenses, { rowsPerPage: 10 });

    let dir_bool = true;


    $: handler = dir_bool ? incomes_handler : expenses_handler;
    $: rows = handler.getRows();


</script>

<div>
	<h1>My Blog</h1>
	<main>
		<div class="table-container space-y-4">
			<header class="flex justify-between gap-4">
				<Search {handler} />
				<RowsPerPage {handler} />
			</header>
			<table class="table table-hover table-compact table-auto w-full">
				<thead>
					<tr>
						<ThSort {handler} orderBy="name">Název</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr>
							<td>{row.typeId}</td>
                            <td>{row.amount}</td>
                            <td>{row.from}</td>
                            <td>
                                <Dateformatter date_string={row.to} />
                            </td>
                            <td>{row.to}</td>
                            <td>{row.frequency}</td>
                            <!-- todo fix type missing in page data -->
                            <td>{row.type.name}</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<footer class="flex justify-between">
				<RowCount {handler} />
				<Pagination {handler} />
			</footer>
		</div>
	</main>
</div>
