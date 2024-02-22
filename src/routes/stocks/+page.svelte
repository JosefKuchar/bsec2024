<script lang="ts">
	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from './$types';
	import AmountColor from '$lib/components/AmountColor.svelte';

	export let data: PageData;
	const handler = new DataHandler(data.stocks, { rowsPerPage: 10 });
	const rows = handler.getRows();
</script>

<div>
	<h1>My blog</h1>
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
						<ThSort {handler} orderBy="bic">BIC</ThSort>
						<ThSort {handler} orderBy="isin">ISIN</ThSort>
						<ThSort {handler} orderBy="min">Min. cena</ThSort>
						<ThSort {handler} orderBy="max">Max. cena</ThSort>
						<ThSort {handler} orderBy="rate">Aktuální cena</ThSort>
						<ThSort {handler} orderBy="negative"><i class="las la-frown text-xl"></i> scénář</ThSort>
						<ThSort {handler} orderBy="neutral"><i class="las la-meh text-xl"></i> scénář</ThSort>
						<ThSort {handler} orderBy="positive"><i class="las la-laugh text-xl"></i> scénář</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
						<ThFilter {handler} filterBy="bic" />
						<ThFilter {handler} filterBy="isin" />
						<ThFilter {handler} filterBy="min" />
						<ThFilter {handler} filterBy="max" />
						<ThFilter {handler} filterBy="rate" />
						<ThFilter {handler} filterBy="negative" />
						<ThFilter {handler} filterBy="neutral" />
						<ThFilter {handler} filterBy="positive" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr>
							<td>{row.name}</td>
							<td>{row.bic}</td>
							<td>{row.isin}</td>
							<td>{row.min} Kč</td>
							<td>{row.max} Kč</td>
							<td>{row.rate} Kč</td>
							<td><AmountColor value={row.negative}>{row.negative} %</AmountColor></td>
							<td><AmountColor value={row.neutral}>{row.neutral} %</AmountColor></td>
							<td><AmountColor value={row.positive}>{row.positive} %</AmountColor></td>
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
