<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { TableConfigDTO } from '$lib/dto/core/table/table-config.dto';

    let table: TableConfigDTO = {
        columns: [
            {
                key: 'key',
                name: 'name',
            },
            {
                key: 'key',
                name: 'name',
            },
            {
                key: 'key',
                name: 'name',
            },
            {
                key: 'key',
                name: 'name',
            },
        ],
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <div
            class="flex h-10 min-h-10 w-full flex-row items-center justify-between border-b bg-ios-basic-white px-2"
        >
            <!-- leading starts here -->
            <div
                class="flex h-full max-h-full min-h-full w-fit flex-row items-center justify-start"
            >
                <span class="text-md font-medium text-gray-700">
                    Kelayakan Cuti
                </span>
            </div>
            <!-- leading ends here -->

            <!-- trailing starts here -->
            <div
                class="flex h-full max-h-full min-h-full w-fit flex-row items-center justify-end gap-2"
            >
                <slot />
            </div>

            <!-- trailing ends here -->
        </div>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DynamicTable tableData={table}></DynamicTable>
        </div>
    </div>
</div>
