<script lang="ts">
	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from './$types';

	export let data: PageData;
	const handler = new DataHandler(data.stocks, { rowsPerPage: 10 });
	const rows = handler.getRows();
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
							<td>{row.name}</td>
							<!-- <td>{row.negative}</td> -->
							<!-- <td>{row.email}</td> -->
						</tr>
					{/each}
				</tbody>
			</table>
			<footer class="flex justify-between">
				<!-- <RowCount {handler} /> -->
				<Pagination {handler} />
			</footer>
		</div>
	</main>
</div>
