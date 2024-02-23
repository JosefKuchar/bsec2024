<script lang="ts">
	import Search from '$lib/components/client/Search.svelte';
	import ThFilter from '$lib/components/client/ThFilter.svelte';
	import ThSort from '$lib/components/client/ThSort.svelte';
	import RowCount from '$lib/components/client/RowCount.svelte';
	import RowsPerPage from '$lib/components/client/RowsPerPage.svelte';
	import Pagination from '$lib/components/client/Pagination.svelte';
	import { DataHandler } from '@vincjo/datatables';
	import type { PageData } from './$types';
	import Time from 'svelte-time';
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';
	import Dateformatter from '$lib/dateformatter.svelte';
	import { Frequency } from '$lib/enums';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { getFrequencyString, getTodayFormatted } from '$lib/utils';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let date_now = getTodayFormatted();

	$: console.log('minDate', date_now);

	export let data: PageData;
	const incomes_handler = new DataHandler(data.incomes, { rowsPerPage: 10 });
	const expenses_handler = new DataHandler(data.expenses, { rowsPerPage: 10 });
	let dir_bool: boolean = true;
	$: handler = dir_bool ? incomes_handler : expenses_handler;
	$: rows = handler.getRows();

	const handleEditClick = (stockId: number) => {
		goto(`/change/${stockId}`);
	};

	let inputPopupDemo: string = '';

	function onPopupDemoSelect(event: CustomEvent<AutocompleteOption<string>>): void {
		inputPopupDemo = event.detail.label;
	}

	const flavorOptions: AutocompleteOption<string>[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	// date
	let selectedDate = getTodayFormatted();

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		fetch(`/api/change/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formdata)
		}).then(() => {
			goto('/change');
		});
	};
</script>

<div>
	<h1 class="h1 my-5">{dir_bool ? 'Příjmy' : 'Výdaje'}</h1>
	<main>
		<div class="table-container space-y-4">
			<header class="flex justify-between gap-4">
				<Search {handler} />
				<RadioGroup>
					<RadioItem bind:group={dir_bool} name="justify" value={true}>Příjmy</RadioItem>
					<RadioItem bind:group={dir_bool} name="justify" value={false}>Výdaje</RadioItem>
				</RadioGroup>
				<div class="flex gap-4">
					<RowsPerPage {handler} />
					<a
						class="btn variant-filled-primary"
						href={dir_bool ? 'change/new-income' : 'change/new-expense'}
						>Nový {dir_bool ? 'příjem' : 'výdaj'}</a
					>
				</div>
			</header>
			<table class="table table-hover table-compact table-auto w-full">
				<thead>
					<tr>
						<ThSort {handler} orderBy="type">Název</ThSort>
						<ThSort {handler} orderBy="amount">Částka</ThSort>
						<ThSort {handler} orderBy="from">Od</ThSort>
						<ThSort {handler} orderBy="to">Do</ThSort>
						<ThSort {handler} orderBy="frequency">Frekvence</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="type" />
						<ThFilter {handler} filterBy="amount" />
						<ThFilter {handler} filterBy="from" />
						<ThFilter {handler} filterBy="to" />
						<ThFilter {handler} filterBy="frequency" />
					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr on:click={() => handleEditClick(row.id)} class="cursor-pointer">
							<td>{row.type}</td>
							<td>{row.amount} Kč</td>
							<td>{row.from}</td>
							<td>{row.to}</td>
							<td>{row.frequency}</td>
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
	</main>
</div>
