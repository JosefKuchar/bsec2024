<script lang="ts">
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import { Frequency } from '$lib/enums';
	import { getTodayFormatted } from '$lib/utils';
	export let data: PageData;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		fetch(`/api/change/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(() => {
			goto('/change');
		});
	};

	let date_now = getTodayFormatted();
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
