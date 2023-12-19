<script lang="ts">
    import { TableBodyCell } from 'flowbite-svelte';

    export let value: any = '';
</script>

<TableBodyCell
    tdClass="p-2 cursor-pointer text-sm whitespace-nowrap font-medium text-center border"
    class="whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"
>
    <div class="flex h-full flex-row items-center justify-center">
        {#if value != ''}
            {value}
        {:else}
            <slot />
        {/if}
    </div>
</TableBodyCell>
