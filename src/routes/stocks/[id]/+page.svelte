<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		fetch(`/api/stocks/edit`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data.data)
		}).then(() => {
			goto('/stocks');
		});
	};
</script>

<div>
	<form on:submit={handleSubmit}>
		<div class="p-4 w-full space-y-4">
			<label class="label">
				<span>Název</span>
				<input bind:value={data.data.name} class="input" type="text" />
			</label>
			<label class="label">
				<span>BIC</span>
				<input bind:value={data.data.bic} class="input" type="text" />
			</label>
			<label class="label">
				<span>ISIN</span>
				<input bind:value={data.data.isin} class="input" type="text" />
			</label>
			<label class="label">
				<span>Aktuální cena</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.rate} type="text" />
					<div class="input-group-shim">Kč</div>
				</div>
			</label>
			<label class="label">
				<span>Minimální cena</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.min} type="text" />
					<div class="input-group-shim">Kč</div>
				</div>
			</label>
			<label class="label">
				<span>Maximální cena</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.max} type="text" />
					<div class="input-group-shim">Kč</div>
				</div>
			</label>
			<label class="label">
				<span>Negativní scénář (růstová míra)</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.negative} type="text" />
					<div class="input-group-shim">%</div>
				</div>
			</label>
			<label class="label">
				<span>Neutrální scénář (růstová míra)</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.neutral} type="text" />
					<div class="input-group-shim">%</div>
				</div>
			</label>
			<label class="label">
				<span>Pozitivní scénář (růstová míra)</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.positive} type="text" />
					<div class="input-group-shim">%</div>
				</div>
			</label>
			<button type="submit" class="btn variant-filled-primary">Uložit</button>
		</div>
	</form>
</div>
