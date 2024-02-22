<script lang="ts">
    export let value: number;
</script>

<span class:text-success-500={value > 0} class:text-error-500={value < 0}>
    <slot />
</span>
