<script lang="ts">
    import { AppBar, Avatar } from '@skeletonlabs/skeleton';
    import { selectedDate } from '$lib/store.ts';
    import { getTodayFormatted } from '$lib/utils';

    let minDate = getTodayFormatted();

    $: console.log('minDate', minDate);
</script>


<AppBar background="bg-transparent" slotTrail="place-content-end">
    <svelte:fragment slot="trail">
        <input class="input w-40" title="Input (date)" type="date" bind:value={$selectedDate} min={minDate}/>
        <h3 class="h3">Jan Novák</h3>
        <Avatar initials="JN" background="bg-surface-700" />
    </svelte:fragment>
</AppBar>