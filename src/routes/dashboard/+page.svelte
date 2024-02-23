<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { LineChart } from '@carbon/charts-svelte';
	import { Dir, Frequency } from '$lib/enums';
	import moment from 'moment';
	import { frequencyToDays } from '$lib/utils';
	import { ComboChart } from '@carbon/charts-svelte';

	export let data: PageData;
	let graphValues: {
		group: string;
		date: string;
		value: number;
	}[] = ([] = []);

	let options = {
		title: 'Vývoj portfolia',
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

	onMount(() => {
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
		let duration = 100;
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
			values.push(
				{ group: 'Investice', date: now.toISOString(), value },
				{ group: 'Volné prostředky', date: now.toISOString(), value: currentChange }
			);

			// Update rates for next day
			data.investments.forEach((investment) => {
				const rate = stocks[investment.id];
				stocks[investment.id] = rate + (rate * investment.neutral) / 100 / 365;
			});

			// Move to next day
			now.add(1, 'day');
		}
		graphValues = values;
	});
</script>

<h1 class="h1">Graf</h1>
{#if graphValues.length === 0}
	<p>Načítám data...</p>
{:else}
	<ComboChart data={graphValues} {options} />
{/if}
<div class="p-10"></div>
