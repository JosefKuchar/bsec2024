<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { LineChart } from '@carbon/charts-svelte';
	import { Dir, Frequency } from '$lib/enums';
	import moment from 'moment';
	import { frequencyToDays } from '$lib/utils';

	export let data: PageData;
	let graphValues = [];

	onMount(() => {
		let stocks: { [key: number]: number } = {};
		data.investments.forEach((investment) => {
			stocks[investment.id] = investment.rate;
		});
		let investments: { [key: number]: number } = {};
		data.investmentChange.forEach((change) => {
			investments[change.id] = 0;
		});

		let now = moment();
		let values = [];
		let duration = 365;
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
					if (dateFrom.isAfter(now, 'day') && now.isBefore(dateTo, 'day')) {
						// Check if we hit interval
						if (now.diff(dateFrom, 'days') % frequencyToDays(change.frequency) === 0) {
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
						investments[change.id] += change.amount / stocks[change.id];
					}
				} else {
					if (dateFrom.isAfter(now, 'day') && now.isBefore(dateTo, 'day')) {
						// Check if we hit interval
						if (now.diff(dateFrom, 'days') % frequencyToDays(change.frequency) === 0) {
							investments[change.id] += change.amount / stocks[change.id];
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
			values.push({ date: now.format('YYYY-MM-DD'), cash: currentChange, investmentValue: value });

			// Update rates for next day
			data.investments.forEach((investment) => {
				const rate = stocks[investment.id];
				stocks[investment.id] = rate + (rate * investment.neutral) / 100 / 365;
			});

			// Move to next day
			now.add(1, 'day');
		}

		console.log(values);
	});
</script>

<h1>Dashboard</h1>
<div></div>
