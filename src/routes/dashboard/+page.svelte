<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { LineChart } from '@carbon/charts-svelte';
	import { Dir, Frequency } from '$lib/enums';
	import moment from 'moment';
	import { frequencyToDays } from '$lib/utils';
	import { ComboChart } from '@carbon/charts-svelte';
	import { RadioGroup, RadioItem, popup } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let graphValues: {
		group: string;
		date: string;
		value: number;
	}[] = ([] = []);

	let scenario: number = 2;
	let interval: number = 1;

	const currentDate = new Date();
	let limitDate = new Date();

	const dateMapping = {
		1: 30,
		2: 365,
		3: 365 * 5,
		4: 365 * 10,
		5: 365 * 20
	};

	let options = {
		title: '',
		axes: {
			left: {
				title: 'Hodnota (Kč)',
				stacked: true,
				mapsTo: 'value',
				titleOrientation: 'right'
			},
			bottom: {
				scaleType: 'time',
				mapsTo: 'date',
				title: 'Datum'
			}
		},
		curve: 'curveMonotoneX',
		comboChartTypes: [
			{
				type: 'stacked-area',
				options: {
					points: {
						enabled: false
					}
				},
				correspondingDatasets: ['Investice', 'Volné prostředky']
			}
		],
		color: {
			scale: {
				'Volné prostředky': '#3B82F6',
				Investice: '#EAB308'
			},
			'': '#ffffff'
		},
		height: '400px',
		theme: 'g100'
	};

	$: {
		let stocks: { [key: number]: number } = {};
		data.investments.forEach((investment) => {
			stocks[investment.id] = investment.rate;
		});
		let investments: { [key: number]: number } = {};
		data.investmentChange.forEach((change) => {
			investments[change.investmentId] = 0;
		});

		let now = moment();
		let values: {
			group: string;
			date: string;
			value: number;
		}[] = [];
		let duration = dateMapping[interval];
		let currentChange = 0;

		for (let i = 0; i < duration; i++) {
			data.change.forEach((change) => {
				const dateFrom = moment(change.from);
				const dateTo = moment(change.to);
				const amount = change.dir === Dir.Incomes ? change.amount : -change.amount;
				if (change.frequency === Frequency.OneTime) {
					if (dateFrom.isSame(now, 'day')) {
						currentChange += amount;
					}
				} else {
					if (now.isBetween(dateFrom, dateTo, 'day')) {
						// Check if we hit interval
						if (dateFrom.diff(now, 'days') % frequencyToDays(change.frequency) === 0) {
							currentChange += amount;
						}
					}
				}
			});

			// Buys
			data.investmentChange.forEach((change) => {
				const dateFrom = moment(change.from);
				const dateTo = moment(change.to);
				if (change.frequency === Frequency.OneTime) {
					if (dateFrom.isSame(now, 'day')) {
						investments[change.investmentId] += change.amount / stocks[change.id];
						currentChange -= change.amount;
					}
				} else {
					if (now.isBetween(dateFrom, dateTo, 'day')) {
						// Check if we hit interval
						if (dateFrom.diff(now, 'days') % frequencyToDays(change.frequency) === 0) {
							investments[change.investmentId] += change.amount / stocks[change.id];
							currentChange -= change.amount;
						}
					}
				}
			});

			// Calculate current value of investments
			let value = 0;
			Object.entries(investments).forEach(([id, amount]) => {
				value += stocks[Number(id)] * amount;
			});

			// Save current day
			if (i % Math.max(1, Math.floor(duration / 100)) === 0) {
				values.push(
					{ group: 'Investice', date: now.toISOString(), value },
					{ group: 'Volné prostředky', date: now.toISOString(), value: currentChange }
				);
			}

			// Update rates for next day
			data.investments.forEach((investment) => {
				const rate = stocks[investment.id];
				let s = 0;
				if (scenario === 0) {
					s = investment.negative;
				} else if (scenario === 1) {
					s = investment.neutral;
				} else {
					s = investment.positive;
				}
				stocks[investment.id] = rate + (rate * s) / 100 / 365;
			});

			// Move to next day
			now.add(1, 'day');
		}
		graphValues = values;
	}
</script>

<div>
	<div class="flex items-center w-full">
		<h1 class="h1 flex-col pb-5">Vývoj portfolia</h1>
	</div>
	<div class="w-full">
		<div class="w-full">
			<div class="flex items-center justify-center h2 gap-5">
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
				<RadioGroup>
					<RadioItem bind:group={interval} name="justify" value={1}>Měsíc</RadioItem>
					<RadioItem bind:group={interval} name="justify" value={2}>Rok</RadioItem>
					<RadioItem bind:group={interval} name="justify" value={3}>5 let</RadioItem>
					<RadioItem bind:group={interval} name="justify" value={4}>10 let</RadioItem>
					<RadioItem bind:group={interval} name="justify" value={5}>20 let</RadioItem>
				</RadioGroup>
			</div>
		</div>
	</div>
	{#if graphValues.length === 0}
		<p>Načítám data...</p>
	{:else}
		<ComboChart data={graphValues} {options} />
	{/if}
	<div class="p-10"></div>
</div>
