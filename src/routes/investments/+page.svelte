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
	const handler = new DataHandler(data.investmentChange, { rowsPerPage: 10 });
	const rows = handler.getRows();

</script>

<div>
	<h1 class="h1 my-5">Investice</h1>
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
						<ThSort {handler} orderBy="frequency">Frekvence</ThSort>
						<ThSort {handler} orderBy="rate">Kurz</ThSort>
						<ThSort {handler} orderBy="amount">Množství</ThSort>
						<ThSort {handler} orderBy="price">Cena</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
						<ThFilter {handler} filterBy="bic" />
						<ThFilter {handler} filterBy="frequency" />
						<ThFilter {handler} filterBy="rate" />
						<ThFilter {handler} filterBy="amount" />
						<ThFilter {handler} filterBy="price" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr class="cursor-pointer">
							<td>{row.investment.name}</td>
							<td>{row.investment.bic}</td>
							<td>{row.frequency}</td>
							<td>{row.investment.rate} Kč</td>
							<td>{row.amount}</td>
							<td>{row.amount * row.investment.rate} Kč</td>
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