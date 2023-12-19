<script lang="ts">
    export let condition: boolean = false;
    export let message: string = '';
</script>

{#if condition}
    <span class="ml-[220px] font-sans text-sm italic text-system-danger"
        >{message}</span
    >
{/if}
