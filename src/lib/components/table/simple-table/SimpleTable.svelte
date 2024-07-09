<script lang="ts">
    import type { TableConfigDTO } from '$lib/dto/core/table/table-config.dto';

    export let tableData: TableConfigDTO;

    // page size options
    const pageSizeOption = [
        {
            key: 5,
            value: 5,
        },
        {
            key: 10,
            value: 10,
        },
        {
            key: 15,
            value: 15,
        },
        {
            key: 20,
            value: 20,
        },
        {
            key: 50,
            value: 50,
        },
    ];
</script>

<div class="flex h-full w-full flex-col items-center justify-start gap-1">
    <!-- title section -->

    <!-- filter section -->

    <!-- table section -->
    <div
        class="flex h-full w-full max-w-full flex-col items-start justify-start overflow-x-auto border"
    >
        <table class="m-1 min-w-full border-collapse border border-gray-300">
            <thead class="bg-gray-50">
                <tr class="h-9 min-h-9">
                    {#each tableData.columns as column, columnIndex}
                        <th class="min-width border">
                            <!-- Minimum width applied here -->
                            <button
                                class="flex h-full w-full flex-row items-center justify-between px-1"
                            >
                                <p
                                    class="text-wrap text-start text-base font-semibold text-gray-600"
                                >
                                    {column.name}
                                </p>
                            </button>
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody class="bg-white">
                {#if tableData.rows != null}
                    {#each tableData.rows as row, rowIndex}
                        <tr class="h-9 min-h-9">
                            {#each tableData.columns as column}
                                <td class="min-width border">
                                    <!-- Minimum width applied here -->
                                    <p
                                        class="text-wrap px-1 text-start text-base font-medium text-gray-700"
                                    >
                                        {row[column.key]}
                                    </p>
                                </td>
                            {/each}
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>

    <!-- pagination section -->
    <div
        class="flex h-12 w-full flex-row items-center justify-between border px-1"
    >
        <div
            class="flex h-full w-full flex-row items-center justify-start gap-1 border"
        >
            <label
                for="idType"
                class=" w-fit text-base font-medium text-gray-700"
            >
                Saiz Data
            </label>
            <select
                name="idType"
                class=" block h-7 appearance-none rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                {#each pageSizeOption as option}
                    <option value={option.value}>{option.key}</option>
                {/each}
            </select>
        </div>
        <div
            class="flex h-full w-full flex-row items-center justify-start gap-1 border"
        >
            <label
                for="idType"
                class=" w-fit text-base font-medium text-gray-700"
            >
                Saiz Data
            </label>
            <select
                name="idType"
                class=" block h-7 appearance-none rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                {#each pageSizeOption as option}
                    <option value={option.value}>{option.key}</option>
                {/each}
            </select>
        </div>
        <div
            class="flex h-full w-full flex-row items-center justify-start gap-1 border"
        >
            <label
                for="idType"
                class=" w-fit text-base font-medium text-gray-700"
            >
                Saiz Data
            </label>
            <select
                name="idType"
                class=" block h-7 appearance-none rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                {#each pageSizeOption as option}
                    <option value={option.value}>{option.key}</option>
                {/each}
            </select>
        </div>
    </div>
</div>

<style>
    .min-width {
        min-width: 8rem; /* Minimum width of 8rem (128px) */
    }
</style>
