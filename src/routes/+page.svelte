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
	import { selectedDate } from '$lib/store';
	import { getTodayFormatted } from '$lib/utils';
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';

	let minDate = getTodayFormatted();
	let scenario: number = 2;

	$: console.log('minDate', minDate);

	export let data : PageData;

	const handler = new DataHandler(data.transactions, { rowsPerPage: 10 });
	const rows = handler.getRows();

</script>

<div class="h-full w-full mx-auto flex justify-center">
	<div class="flex-col w-full">
		<h1 class="h1 my-5">Můj účet</h1>
		<div class="flex justify-end h-auto">
			<div class="flex items-center justify-center h2 mr-5">
				<RadioGroup>
					<RadioItem bind:group={scenario} name="justify" value={0}
						><i class="las la-frown text-xl"></i> scénář</RadioItem
					>
					<RadioItem bind:group={scenario} name="justify" value={1}
						><i class="las la-meh text-xl"></i> scénář</RadioItem
					>
					<RadioItem bind:group={scenario} name="justify" value={2}
						><i class="las la-laugh text-xl"></i> scénář</RadioItem
					>
				</RadioGroup>
			</div>
			<input class=" mb-0 input w-40" title="Input (date)" type="date" bind:value={$selectedDate} min={minDate}/>
		</div>
		<MainFrame>
			Slot 
		</MainFrame>
		<h2 class="h2 mb-5 mt-5">Pohyby</h2>
		<div class="table-container space-y-4">
			<header class="flex justify-between gap-4">
				<Search {handler}/>
				<div class="flex gap-4">
					<RowsPerPage {handler} />

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
