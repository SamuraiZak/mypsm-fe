<script lang="ts">
    import { TableHeadCell } from 'flowbite-svelte';

    export let title: string = '';
</script>

<TableHeadCell padding="px-6 py-2 text-center border" class="px-2.5">
    <div class="flex flex-row items-center justify-center gap-1">
        <span class="text-center text-sm font-bold text-txt-secondary">
            {title}
        </span>
    </div>
</TableHeadCell>
