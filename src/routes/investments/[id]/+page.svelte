<script lang="ts">
	import type { PageData } from './$types';
	import { Frequency } from '$lib/enums';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import AmountColor from '$lib/components/AmountColor.svelte';
	import { getTodayFormatted } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let minDate = getTodayFormatted();

	export let data: PageData;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		if (data.data.id == 0) {
			fetch(`/api/investments/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data.data)
			}).then(() => {
				goto('/investments');
			});
		} else {
			fetch(`/api/investments/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data.data)
			}).then(() => {
				goto('/investments');
			});
		}
	};

	$: console.log('from', data.data.from);
</script>

<h1 class="h1 mt-5">{data.data.investment.name}</h1>
<span class="h3">{data.data.investment.bic}</span>
<div>
	<h2 class="h2 mt-5">{data.data.investment.rate} Kč</h2>
	<div class="grid grid-cols-3 w-1/4 mb-5">
		<div>
			<i class="las la-frown text-xl"></i>
			<AmountColor value={data.data.investment.negative}
				>{data.data.investment.negative}%</AmountColor
			>
		</div>
		<div>
			<i class="las la-meh text-xl"></i>
			<AmountColor value={data.data.investment.neutral}>{data.data.investment.neutral}%</AmountColor
			>
		</div>
		<div>
			<i class="las la-laugh text-xl"></i>
			<AmountColor value={data.data.investment.positive}
				>{data.data.investment.positive}%</AmountColor
			>
		</div>
	</div>

	<form on:submit={handleSubmit}>
		<div class="w-full space-y-4">
			<label class="label">
				<span>Frekvence nákupu</span>
				<div>
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
			</label>
			<label class="label w-1/4">
				<span>Od</span>
				<div>
					<input
						class="input w-40"
						title="From"
						type="date"
						bind:value={data.data.from}
						min={minDate}
					/>
				</div>
			</label>
			{#if data.data.frequency != Frequency.OneTime}
				<label class="label w-1/4" transition:fade>
					<span>Do</span>
					<div>
						<input
							class="input w-40"
							title="To"
							type="date"
							bind:value={data.data.to}
							min={minDate}
						/>
					</div>
				</label>
			{/if}
			<label class="label w-1/4">
				<span>Cena</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.amount} type="number" min="0" />
					<div class="input-group-shim">Kč</div>
				</div>
			</label>
			<button type="submit" class="btn variant-filled-primary">Uložit</button>
		</div>
	</form>
</div>
