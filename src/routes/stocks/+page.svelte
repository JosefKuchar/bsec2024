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
	import { goto } from '$app/navigation';

	export let data: PageData;
	const handler = new DataHandler(data.stocks, { rowsPerPage: 10 });
	const rows = handler.getRows();

	const handleEditClick = (stockId: number) => {
		goto(`/stocks/${stockId}`);
	};
</script>

<div>
	<h1 class="h1 my-5">Investice</h1>
	<main>
		<div class="table-container space-y-4">
			<header class="flex justify-between gap-4">
				<Search {handler} />
				<div class="flex gap-4">
					<RowsPerPage {handler} />
					<a class="btn variant-filled-primary" href="stocks/new">Nová akcie</a>
				</div>
			</header>
			<table class="table table-hover table-compact table-auto w-full">
				<thead>
					<tr>
						<ThSort {handler} orderBy="name">Název</ThSort>
						<ThSort {handler} orderBy="bic">BIC</ThSort>
						<ThSort {handler} orderBy="isin">ISIN</ThSort>
						<ThSort {handler} orderBy="min">Min. cena</ThSort>
						<ThSort {handler} orderBy="max">Max. cena</ThSort>
						<ThSort {handler} orderBy="rate">Cena</ThSort>
						<ThSort {handler} orderBy="negative"><i class="las la-frown text-xl"></i> scénář</ThSort
						>
						<ThSort {handler} orderBy="neutral"><i class="las la-meh text-xl"></i> scénář</ThSort>
						<ThSort {handler} orderBy="positive"><i class="las la-laugh text-xl"></i> scénář</ThSort
						>
						<th></th>
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
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr class="cursor-pointer" on:click={() => handleEditClick(row.id)}>
							<td>{row.name}</td>
							<td>{row.bic}</td>
							<td>{row.isin}</td>
							<td>{row.min} Kč</td>
							<td>{row.max} Kč</td>
							<td>{row.rate} Kč</td>
							<td><AmountColor value={row.negative}>{row.negative} %</AmountColor></td>
							<td><AmountColor value={row.neutral}>{row.neutral} %</AmountColor></td>
							<td><AmountColor value={row.positive}>{row.positive} %</AmountColor></td>
							<td
								><a href="/todo"
									><button type="button" class="btn-icon variant-filled-primary"
										><i class="las la-money-check-alt"></i></button
									></a
								></td
							>
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
