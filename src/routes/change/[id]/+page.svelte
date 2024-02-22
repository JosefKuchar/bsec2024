<script lang="ts">
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { Frequency } from '$lib/enums';
	import { getTodayFormatted } from '$lib/utils';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		fetch(`/api/change/new`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data.data)
		}).then(() => {
			goto('/change');
		});
	};

	let inputType = '';

	let date_now = getTodayFormatted();

	function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputType = event.detail.label;
		data.data.typeId = Number(event.detail.value);
	}

	$: filteredTypes = data.changeTypes.filter((type) => type.dir === data.data.dir);
</script>

<div>
	<!-- pridavani polozky , dropdown typ, suma, radio item frekvence, datepicker od/do -->
	<!-- typ autocomplete -->
	<!-- <input
			class="input autocomplete"
			type="search"
			name="autocomplete-search"
			bind:value={data.data..type}
			placeholder="Search..."
			use:popup={popupSettings}
		/>
		<div data-popup="popupAutocomplete">
			<Autocomplete
				bind:input={data.data..type}
				options={flavorOptions}
				on:selection={onPopupDemoSelect}
			/>
		</div> -->
	<!-- input suma -->
	<input class="input" type="search" name="demo" bind:value={inputType} placeholder="Search..." />
	<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
		<Autocomplete bind:input={inputType} options={filteredTypes} on:selection={onFlavorSelection} />
	</div>

	<input class="input" type="number" placeholder="Suma" bind:value={data.data.amount} />

	<RadioGroup>
		<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.OneTime}
			>Jednorázově</RadioItem
		>
		<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Daily}
			>Denně</RadioItem
		>
		<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Monthly}
			>Týdně</RadioItem
		>
		<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Weekly}
			>Měsíčně</RadioItem
		>
		<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Yearly}
			>Ročně</RadioItem
		>
	</RadioGroup>
	<!-- time picker -->

	<!-- add button -->
	{#if data.data.frequency === Frequency.OneTime}
		<input
			class="input w-40"
			title="Input (date)"
			type="date"
			bind:value={data.data.from}
			min={date_now}
		/>
	{:else}
		<input
			class="input w-40"
			title="Input (date)"
			type="date"
			bind:value={data.data.from}
			min={date_now}
		/>

		<input
			class="input w-40"
			title="Input (date)"
			type="date"
			bind:value={data.data.to}
			min={date_now}
		/>
	{/if}
	<button type="button" class="btn variant-filled" on:click={handleSubmit}>Přidat</button>
</div>
