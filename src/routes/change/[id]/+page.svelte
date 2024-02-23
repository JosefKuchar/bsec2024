<script lang="ts">
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';
	import { goto, invalidateAll } from '$app/navigation';
	import type { PageData } from './$types';
	import { Frequency } from '$lib/enums';
	import { getTodayFormatted } from '$lib/utils';
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { Modal, getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent, ModalStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';

	initializeStores();

	const modalStore = getModalStore();

	export let data: PageData;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if(is_create) {
			fetch(`/api/change/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data.data)
			}).then(() => {
				goto('/change');
			});
		} else {
			fetch(`/api/change/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data.data)
			}).then(() => {
				goto('/change');
			});
		}
	};

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	let popupSettings: PopupSettings = {
	event: 'focus-click',
	target: 'popupAutocomplete',
	placement: 'bottom',
	};

	let is_create = data.data.id == 0 ? true : false;

	console.log(is_create);

	let inputType  = data.changeTypes.find((type) => Number(type.value) === data.data.typeId)?.label;

	let date_now = getTodayFormatted();

	console.log(data.data.from);

	console.log(data.data.to);

	function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputType = event.detail.label;
		data.data.typeId = Number(event.detail.value);
	}

	let modalbool = false;

	function openModal() {
		modalStore.trigger(modal);
		console.log('openModal', modalbool);
		modalbool = true;
	}

	function mycustomfn(typename: string) {
		console.log('mycustomfn', typename);
		modalbool = false;
		console.log('modalbool', modalbool);
		if (typename == 'false' || data == null || typename == 0) {
			return;
		}
		fetch(`/api/change/addtype`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({name: typename, dir: data.data.dir})
			}).then(() => {
				invalidateAll();
			});
	}


	const modal: ModalSettings = {
	type: 'prompt',
	// Data
	title: 'Název typu',
	// Populates the input value and attributes
	value: '',
	buttonTextCancel: 'Zrušit',
	/** Override the Confirm button label. */
	buttonTextSubmit: 'Uložit',
	valueAttr: { type: 'text', minlength: 3, maxlength: 10, required: true},
	// Returns the updated response value
	meta : {fn: mycustomfn},
	response: (r: string) => mycustomfn(r),
	};
	modalStore.trigger(modal);



	$: filteredTypes = data.changeTypes.filter((type) => type.dir === data.data.dir);
</script>
{#if modalbool}
	<Modal bind:store={$modalStore} />
{/if}
<div class="grid grid-cols-1 bg-clip-padding">
	<div class="flex items-center">
		<div>
		<span class="text-lg font-bold">Typ</span>
		</div>
		<div class="px-12">
			<button type="button" class="btn variant-filled-primary" on:click={openModal}>přidat typ</button>
		</div>
	</div>
	<div class="py-8">
		<input class="input" type="search" name="autocomplete-search" bind:value={inputType} placeholder="Search..." use:popup={popupSettings} />
		<div class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1" data-popup="popupAutocomplete">
			<Autocomplete bind:input={inputType} options={filteredTypes} on:selection={onFlavorSelection} />
		</div>
	</div>
	<div>
		<span class="text-lg font-bold">Suma</span>
	</div>
	<div class="py-4">
		<input class="input" type="number" placeholder="Suma" bind:value={data.data.amount} />
	</div>
	<div>
		<span class="text-lg font-bold">Frekvence</span>
	</div>
	<div class="py-4">
		<RadioGroup>
			<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.OneTime}
				>Jednorázově</RadioItem
			>
			<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Daily}
				>Denně</RadioItem
			>
			<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Weekly}
				>Týdně</RadioItem
			>
			<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Monthly}
				>Měsíčně</RadioItem
			>
			<RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Yearly}
				>Ročně</RadioItem
			>
		</RadioGroup>
	</div>
	<div>
		<span class="text-lg font-bold">Od</span>
	</div>
	<div class="py-4">
		{#if data.data.frequency === Frequency.OneTime}
			<input
				class="input w-40"
				title="Input (date)"
				type="date"
				bind:value={data.data.from}
			/>
		{:else}
			<input
				class="input w-40"
				title="Input (date)"
				type="date"
				bind:value={data.data.from}
			/>
			<div>
				<span class="text-lg font-bold">Do</span>
			</div>
			<input
				class="input w-40"
				title="Input (date)"
				type="date"
				bind:value={data.data.to}
			/>
		{/if}
	</div>
	<div class="py-4">
		{#if is_create}
			<button type="button" class="btn variant-filled-primary" on:click={handleSubmit}>Vytvořit</button>
		{:else}
			<button type="button" class="btn variant-filled-primary" on:click={handleSubmit}>Uložit</button>
		{/if}
	</div>
</div>
