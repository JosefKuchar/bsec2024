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
	import Dateformatter from '$lib/dateformatter.svelte';


	export let data: PageData;
	const handler = new DataHandler(data.investmentChange, { rowsPerPage: 10 });
	const rows = handler.getRows();

	const handleEditClick = (investmentId: number) => {
		console.log('investmentId', investmentId);
		goto(`/investments/${investmentId}`);
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
					<a class="btn variant-filled-primary" href="/stocks">Nová investice</a>
				</div>
			</header>
			<table class="table table-hover table-compact table-auto w-full">
				<thead>
					<tr>
						<ThSort {handler} orderBy="name">Název</ThSort>
						<ThSort {handler} orderBy="bic">BIC</ThSort>
						<ThSort {handler} orderBy="frequency">Frekvence</ThSort>
						<ThSort {handler} orderBy="from">Od</ThSort>
						<ThSort {handler} orderBy="to">Do</ThSort>
						<ThSort {handler} orderBy="price">Cena</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
						<ThFilter {handler} filterBy="bic" />
						<ThFilter {handler} filterBy="frequency" />
						<ThFilter {handler} filterBy="from" />
						<ThFilter {handler} filterBy="to" />
						<ThFilter {handler} filterBy="amount" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr on:click={() => handleEditClick(row.id)} class="cursor-pointer">
							<td>{row.name}</td>
							<td>{row.bic}</td>
							<td>{row.frequency}</td>
							<td>
								{row.from}
							</td>
							{#if row.frequency == 'Jednorázově'}
							<td><span class="font-bold">-</span></td>
							{:else}
							<td>{row.to}</td>
							{/if}
							<td>{row.amount} Kč</td>
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