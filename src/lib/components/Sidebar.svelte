<script lang="ts">
    import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
    import cash_white from '../assets/cash_white.svg';
    import home_white from '../assets/home_white.svg';
    import graph_white from '../assets/graph_white.svg';
    import invest_white from '../assets/invest_white.svg';
    let currentTile: number = 0;

</script>

<AppRail background="bg-surface-800">
	<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <img src={home_white} alt="Description" class="h-8 w-8 flex items-center justify-center">
            </div>
        </svelte:fragment>
		<span>Domů</span>
	</AppRailTile>
	<!-- --- -->
	<AppRailTile bind:group={currentTile} name="tile-1" value={1} title="tile-1">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <img src={cash_white} alt="Description" class="h-8 w-8">
            </div>
        </svelte:fragment>
		<span>Příjmy a výdaje</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-2" value={2} title="tile-2">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <img src={invest_white} alt="Description" class="h-8 w-8">
            </div>
        </svelte:fragment>
		<span>Investice</span>
	</AppRailTile>
	<AppRailTile bind:group={currentTile} name="tile-3" value={3} title="tile-3">
		<svelte:fragment slot="lead">
            <div class="flex items-center justify-center">
                <img src={graph_white} alt="Description" class="h-8 w-8">
            </div>
        </svelte:fragment>
		<span>Grafy</span>
	</AppRailTile>
</AppRail>