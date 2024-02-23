<script lang="ts">
    import { AppBar, Avatar } from '@skeletonlabs/skeleton';
    import { getTodayFormatted } from '$lib/utils';
    import AvatarIcon from '$lib/assets/avatar.jpg';

</script>


<AppBar background="bg-transparent" slotTrail="place-content-end">
    <svelte:fragment slot="trail">
        <h3 class="h3">Jan Novák</h3>
        <Avatar src={AvatarIcon} background="bg-surface-700" />
    </svelte:fragment>
</AppBar>