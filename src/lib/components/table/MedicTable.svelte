<script lang="ts">
    import { translate } from '$lib/config/dictionary';

    interface treatmentDTO {
        name: string;
    }

    interface dataDTO {
        [key: string]: string | number | treatmentDTO[]; // Define an index signature
    }

    export let tableData: dataDTO[];

</script>

<div class="flex h-full max-h-full w-full">
    <table class="table max-h-full w-full table-fixed">
        <!-- header -->
        <thead class="sticky top-0 z-[1]">
            <tr class="h-7 min-h-7 w-full">
                <th
                    class="h-full w-[25px] rounded-md border border-ios-basic-darkBackgroundGray"
                >
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span
                            class="select-none text-center align-middle text-sm font-medium text-ios-systemColors-systemGrey5-dark"
                        >
                            Bil.
                        </span>
                    </div>
                </th>
                {#each tableData as item, i}
                    {#if i == 0}
                        {#each Object.keys(item) as value}
                            <th
                                class="h-full w-[90px] rounded-md border border-ios-basic-darkBackgroundGray p-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-medium text-ios-systemColors-systemGrey5-dark"
                                    >
                                        {translate(value)}
                                    </span>
                                </div>
                            </th>
                        {/each}
                    {/if}
                {/each}
            </tr>
        </thead>

        <!-- body -->
        <tbody>
            <!-- display each data -->
            {#if tableData.length > 0}
                {#each tableData as val, i}
                    <!-- Check if value is empty, remove the row from displaying -->
                    <tr>
                        <td
                            class="h-full border border-ios-basic-darkBackgroundGray"
                        >
                            <div
                                class="flex h-8 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                            >
                                <span>{i + 1}</span>
                            </div>
                        </td>
                        {#each Object.values(val) as value}
                            {#if typeof value == 'object'}
                                <td
                                    class="h-full border border-ios-basic-darkBackgroundGray p-1"
                                >
                                    {#each Object.values(value) as eachItem, index}
                                        <div
                                            class="flex h-8 items-center justify-center text-center text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                                        >
                                            <span>{index+1}. {eachItem.name}</span>
                                        </div>
                                    {/each}
                                </td>
                            {:else}
                                <td
                                    class="h-full border border-ios-basic-darkBackgroundGray"
                                >
                                    <div
                                        class="flex h-8 items-center justify-center text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                                    >
                                        <span>{value}</span>
                                    </div>
                                </td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
