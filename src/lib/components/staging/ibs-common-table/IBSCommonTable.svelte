<script lang="ts">
    import SvgCaretDown from '$lib/assets/svg/SvgCaretDown.svelte';
    import SvgCaretUp from '$lib/assets/svg/SvgCaretUp.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    import SvgSortDown from '$lib/assets/svg/SvgSortDown.svelte';
    import SvgSortUp from '$lib/assets/svg/SvgSortUp.svelte';
    import { currentPage } from '$lib/stores/globalState';
    import { Button, PaginationItem, Select } from 'flowbite-svelte';

    // param for table data
    export let tableData: any[] = [];

    export let param:any;
    $: request = param;

    export let sortBy: string = Object.keys(tableData[0])[0];
    export let sortDirection: string = 'ascending';

    // =====================================================================
    // Functions
    // =====================================================================

    function handleSort(columnName: string) {
        // check the current sortBy
        if (columnName == sortBy) {
            // check the current sort direction
            if (sortDirection == 'ascending') {
                sortDirection = 'descending';
            } else {
                sortDirection = 'ascending';
            }
        } else {
            sortBy = columnName;
            sortDirection = 'ascending';
            param.orderBy = columnName;
        }

        // TODO: Fetch new data with the filter
    }
</script>

<p>in table orderby {param.orderBy}</p>

<button on:click={()=>{
    param.orderBy = "THIS";
}}>
    another change
</button>
<div>
    <div class="w-full overflow-x-auto h-[300px]">
        <table
            class="table w-full table-auto border-collapse border border-ios-labelColors-separator-light"
        >
            <!-- table head starts -->

            <thead class="sticky top-0">
                <!-- table head row starts -->

                <tr class="h-10 bg-ios-systemColors-quaternarySystemFill-light">
                    <!-- loop for each of the data key -->
                    {#each Object.keys(tableData[0]) as columnHeading}
                        <!-- return column header -->
                        <th
                            on:click={() => {
                                // alert(Object.values({ columnHeading }));
                                handleSort(
                                    Object.values({ columnHeading }).toString(),
                                );
                            }}
                            class="h-full cursor-pointer border border-ios-labelColors-separator-light px-2.5"
                        >
                            <div
                                class="flex h-full flex-row items-center justify-between"
                            >
                                <span
                                    class="text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                                >
                                    {columnHeading}
                                </span>
                                <div
                                    class="flex h-full max-h-full w-10 flex-col items-center justify-center gap-0"
                                >
                                    <div
                                        class=" {sortBy ==
                                        Object.values({
                                            columnHeading,
                                        }).toString()
                                            ? ' text-ios-labelColors-label-light'
                                            : ' text-ios-labelColors-tertiaryLabel-light'}"
                                    >
                                        {#if sortDirection == 'ascending' && sortBy == Object.values( { columnHeading }, ).toString()}
                                            <SvgSortUp size="18"></SvgSortUp>
                                        {:else}
                                            <SvgSortDown size="18"
                                            ></SvgSortDown>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </th>
                    {/each}
                </tr>

                <!-- table head row ends -->
            </thead>

            <!-- table head ends -->

            <!-- table body starts -->

            <tbody>
                <!-- loop trough all entries -->
                {#each Object.values(tableData) as row}
                    <tr
                        class=" h-10 bg-ios-backgroundColors-systemBackground-light"
                    >
                        <!-- loop through each property -->

                        {#each Object.values(row) as cell}
                            <td
                                class="h-full border border-ios-labelColors-separator-light px-2.5"
                            >
                                <span
                                    class="text-center align-middle text-base font-normal"
                                >
                                    {cell}
                                </span>
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>

            <!-- table body ends -->
        </table>
    </div>
    <!-- table control -->
    <div class="flex w-full flex-row justify-between">
        <p>leading</p>
        <div class="flex flex-wrap items-center justify-start gap-2.5">
            <div
                class=" flex h-[28px] flex-col items-center justify-center rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 focus:outline-none focus:ring-0"
            >
                <span class="text-sm text-txt-secondary">
                    1
                </span>
            </div>
            <Button
                class="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary focus:outline-none focus:ring-0"
                ><SvgChevronLeft size="14" /></Button
            >

                <PaginationItem
                    normalClass="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary"
                    >1</PaginationItem
                >
                ...

            

        </div>
    </div>
</div>
