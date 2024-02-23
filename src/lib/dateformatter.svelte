

<script lang="ts">
    
    // get input date
    export let date_string : Date; // = "2021-10-10T10:10:10";
    import Time from "svelte-time";
</script>

<Time timestamp ={date_string} format="DD.MM.YYYY" />
