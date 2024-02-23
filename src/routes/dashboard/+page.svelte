
<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { LineChart } from '@carbon/charts-svelte';
	import { Dir, Frequency } from '$lib/enums';
	import moment from 'moment';
	import { frequencyToDays } from '$lib/utils';
    import { ComboChart } from '@carbon/charts-svelte'

	export let data: PageData;
	let graphValues = [];

    let data2 = [
  {
    "group": "Volné prostředky",
    "date": "2018-12-31T23:00:00.000Z",
    "value": 10000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-04T23:00:00.000Z",
    "value": 65000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 10000
  },
  {
    "group": "Volné prostředky",
    "date": "2019-01-12T23:00:00.000Z",
    "value": 49213
  },
  {
    "group": "Investice",
    "date": "2019-01-16T23:00:00.000Z",
    "value": 51213
  },
  {
    "group": "Investice",
    "date": "2018-12-31T23:00:00.000Z",
    "value": 20000
  },
  {
    "group": "Investice",
    "date": "2019-01-04T23:00:00.000Z",
    "value": 25000
  },
  {
    "group": "Investice",
    "date": "2019-01-07T23:00:00.000Z",
    "value": 60000
  },
  {
    "group": "Investice",
    "date": "2019-01-12T23:00:00.000Z",
    "value": 30213
  },
  {
    "group": "Investice",
    "date": "2019-01-16T23:00:00.000Z",
    "value": 55213
  },
]

let options = {
  "title": "Vývoj portfolia",
  "axes": {
    "left": {
      "title": "Hodnota (Kč)",
      "stacked": true,
      "mapsTo": "value",
      "titleOrientation": "right"
    },
    "bottom": {
      "scaleType": "time",
      "mapsTo": "date"
    },

  },
  "curve": "curveMonotoneX",
  "comboChartTypes": [
    {
      "type": "stacked-area",
      "options": {
        "points": {
          "enabled": false
        }
      },
      "correspondingDatasets": [
        "Investice",
        "Volné prostředky",
      ]
    },
  ],
  "color" : {
    "scale" :
        {
        "Volné prostředky" : "#3B82F6",
        "Investice" : "#EAB308"
    },
    "" : "#ffffff"
  },
  "height": "400px",
  "theme": "g100"
}

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


<h1 class="h1">Graf</h1>
<div class="w-3/4">
    <ComboChart style="background:transparent" {data2} {options} />
</div>
<div class="p-10"></div>
