<script lang="ts">
    import type { PageData } from './$types';
    import { Frequency} from '$lib/enums';
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import AmountColor from '$lib/components/AmountColor.svelte';


    export let data: PageData;
</script>


{#if data.data.id === 0}
	<h1 class="h1 my-5">Nová akcie</h1>
{:else}
	<h1 class="h1 mt-5">{data.data.investment.name}</h1>
    <span class="h3">{data.data.investment.bic}</span>
{/if}
<div>
    <h2 class="h2 mt-5">{data.data.investment.rate} Kč</h2>
    <div class="grid grid-cols-3 w-1/4 mb-5">
        <div>
            <i class="las la-frown text-xl"></i>
            <AmountColor value={data.data.investment.negative}>{data.data.investment.negative}%</AmountColor>
        </div>
        <div>
            <i class="las la-meh text-xl"></i>
            <AmountColor value={data.data.investment.neutral}>{data.data.investment.neutral}%</AmountColor>
        </div>
        <div>
            <i class="las la-laugh text-xl"></i>
            <AmountColor value={data.data.investment.positive}>{data.data.investment.positive}%</AmountColor>
        </div>
    </div>
    
	<form on:submit={handleSubmit}>
		<div class="w-full space-y-4">
            <label class="label">
                <span>Frekvence nákupu</span>
                <div>
                    <RadioGroup>
                        <RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.OneTime}>Jednorázově</RadioItem>
                        <RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Daily}>Denně</RadioItem>
                        <RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Monthly}>Týdně</RadioItem>
                        <RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Weekly}>Měsíčně</RadioItem>
                        <RadioItem bind:group={data.data.frequency} name="justify" value={Frequency.Yearly}>Ročně</RadioItem>
                    </RadioGroup>
                </div>
            </label>
			<label class="label w-1/4">
				<span>Množství</span>
				<div class="input-group input-group-divider grid-cols-[1fr_auto]">
					<input bind:value={data.data.amount} type="number" min=0/>
					<div class="input-group-shim">Ks</div>
				</div>
			</label>
			<button type="submit" class="btn variant-filled-primary">Uložit</button>
		</div>
	</form>
</div>