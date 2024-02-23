<script lang="ts">
	import { DonutChart } from '@carbon/charts-svelte';
	import { onMount } from 'svelte';
	import '@carbon/charts-svelte/styles.css';

	export let investmentValue: number;
	export let changeValue: number;
	let options = {
		title: '',
		resizable: true,
		legend: {
			enabled: true,
			alignment: 'center'
		},
		donut: {
			center: {
				label: 'Kč'
			},
			alignment: 'center'
		},
		theme: 'g100',
		toolbar: {
			enabled: false
		},
		color: {
			scale: {
				'Volné prostředky': '#3B82F6',
				Investováno: '#EAB308'
			}
		}
	};

	let data = [
		{
			group: 'Volné prostředky',
			value: changeValue
		},
		{
			group: 'Investováno',
			value: investmentValue
		}
	];

	let count = 0;
	$: target = investmentValue + changeValue; // Final number
	const duration = 6000; // Duration of the animation in milliseconds
	let interval = duration / target; // Calculate interval time

	onMount(() => {
		const counter = setInterval(() => {
			if (count < target) {
				// Calculate the increment to make the animation smooth
				// This calculation can be adjusted based on the animation's desired speed and smoothness
				let increment = Math.ceil(target / (duration / 100));

				count += increment;
				if (count > target) {
					count = target; // Ensure it doesn't go over the target
				}
			} else {
				clearInterval(counter);
			}
		}, interval);
	});
</script>

<div class="mt-10 bg-surface-700 h-2/5 flex rounded-3xl overflow-hidden">
	<div class=" w-1/3 h-full flex justify-center items-center">
		<div class="w-full h-4/5">
			<DonutChart style="color:white" {data} {options} />
		</div>
	</div>
	<div class="bg-surface-700 w-2/3 h-full flex p-10 justify-center items-center">
		<div class="bg-surface-700 h-full w-full">
			<h1 class="text-center h1">{count} Kč</h1>
			<p class="text-center">hodnota portfolia</p>
			<div class="w-full h-full flex justify-center mt-12">
				<div class="items-center w-2/5">
					<div class="items-center w-full">
						<div class="flex items-center">
							<p class="flex-col w-1/2 text-start">Volné prostředky</p>
							<p class="flex-col h4 w-1/2 text-end">{changeValue} Kč</p>
						</div>
						<div class="flex items-center">
							<p class="flex-col w-1/2 text-start">Investováno</p>
							<p class="flex-col h4 w-1/2 text-end">{investmentValue} Kč</p>
						</div>
					</div>
				</div>
			</div>
			<slot />
		</div>
	</div>
</div>
