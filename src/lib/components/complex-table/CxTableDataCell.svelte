<script lang="ts">
    export let value: any = '';
</script>

<td
    class="p-2 cursor-pointer text-gray-900 dark:text-white whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"
    ><div class="flex h-full flex-row items-center justify-center">
        {#if value != ''}
            {value}
        {:else}
            <slot />
        {/if}
    </div></td
>
