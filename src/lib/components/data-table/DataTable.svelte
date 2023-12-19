<script lang="ts">
    import { Table } from 'flowbite-svelte';
    export let title = 'Table Title';
</script>

<div
    class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
>
    <p class="pb-2.5 text-sm font-semibold">{title}</p>

    <!-- table -->
    <div class="h-full max-h-full w-full overflow-x-auto overflow-y-auto">
        <div class="h-fit bg-bgr-primary">
            <Table>
                <slot />
            </Table>
        </div>
    </div>
</div>
