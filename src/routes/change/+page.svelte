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
    import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';
    import Dateformatter from '$lib/dateformatter.svelte';
	import { Frequency } from '$lib/enums';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import { getTodayFormatted } from '$lib/utils';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';


    let date_now = getTodayFormatted();

    $: console.log('minDate', date_now);

	export let data: PageData;
    const incomes_handler = new DataHandler(data.incomes, { rowsPerPage: 10 });
    const expenses_handler = new DataHandler(data.expenses, { rowsPerPage: 10 });

    let dir_bool:boolean = true;
	let frequency: Frequency = Frequency.OneTime;
	let sum: number = 0;

	let popupSettings: PopupSettings = {
	event: 'focus-click',
	target: 'popupAutocomplete',
	placement: 'bottom',
	};

    $: handler = dir_bool ? incomes_handler : expenses_handler;
    $: rows = handler.getRows();


	let inputPopupDemo: string = '';

	function onPopupDemoSelect(event: CustomEvent<AutocompleteOption<string>>): void {
		inputPopupDemo = event.detail.label;
	}

	const flavorOptions: AutocompleteOption<string>[] = [
	{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
	{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
	{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Neapolitan', value: 'neapolitan', keywords: 'mix, strawberry, chocolate, vanilla', meta: { healthy: false } },
	{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
	{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	let count = 0;
	function onbuttonadd() {
		console.log("adding");
		count++
	}

	// date
	let selectedDate = getTodayFormatted();
</script>

<div>
    <RadioGroup>
        <RadioItem bind:group={dir_bool} name="justify" value={true}>Příjmy</RadioItem>
        <RadioItem bind:group={dir_bool} name="justify" value={false}>Výdaje</RadioItem>
    </RadioGroup>
	<div>
		<!-- pridavani polozky , dropdown typ, suma, radio item frekvence, datepicker od/do -->
		<!-- typ autocomplete -->
		<input
			class="input autocomplete"
			type="search"
			name="autocomplete-search"
			bind:value={inputPopupDemo}
			placeholder="Search..."
			use:popup={popupSettings}
		/>
		<div data-popup="popupAutocomplete">
			<Autocomplete
				bind:input={inputPopupDemo}
				options={flavorOptions}
				on:selection={onPopupDemoSelect}
			/>
		</div>
		<!-- input suma -->
		<input class="input" type="number" placeholder="Suma" bind:value={sum} />
		
		<RadioGroup>
			<RadioItem bind:group={frequency} name="justify" value={Frequency.OneTime}>Jednorázově</RadioItem>
			<RadioItem bind:group={frequency} name="justify" value={Frequency.Daily}>Denně</RadioItem>
			<RadioItem bind:group={frequency} name="justify" value={Frequency.Monthly}>Týdně</RadioItem>
			<RadioItem bind:group={frequency} name="justify" value={Frequency.Weekly}>Měsíčně</RadioItem>
			<RadioItem bind:group={frequency} name="justify" value={Frequency.Yearly}>Ročně</RadioItem>
		</RadioGroup>
		<!-- time picker -->
		<input class="input w-40" title="Input (date)" type="date" bind:value={selectedDate} min={date_now}/>
		<!-- add button -->
		<button type="button" class="btn variant-filled" on:click={onbuttonadd}>(Pridat {count})</button>
	</div>
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
                        <ThSort {handler} orderBy="amount">Částka</ThSort>
                        <ThSort {handler} orderBy="from">Od</ThSort>
                        <ThSort {handler} orderBy="to">Do</ThSort>
                        <ThSort {handler} orderBy="frequency">Frekvence</ThSort>
                        <ThSort {handler} orderBy="type">Typ</ThSort>
					</tr>
					<tr>
						<ThFilter {handler} filterBy="name" />
                        <ThFilter {handler} filterBy="amount" />
                        <ThFilter {handler} filterBy="from" />
                        <ThFilter {handler} filterBy="to" />
                        <ThFilter {handler} filterBy="frequency" />
                        <ThFilter {handler} filterBy="type" />

					</tr>
				</thead>
				<tbody>
					{#each $rows as row}
						<tr>
							<td>{row.typeId}</td>
                            <td>{row.amount} Kč</td>
                            <td>
                                <Dateformatter date_string={row.from} />
                            </td>
                            <td>
                                <Dateformatter date_string={row.to} />
                            </td>
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
