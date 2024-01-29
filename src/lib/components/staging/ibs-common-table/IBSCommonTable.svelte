<script lang="ts">
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    import SvgSortDown from '$lib/assets/svg/SvgSortDown.svelte';
    import SvgSortUp from '$lib/assets/svg/SvgSortUp.svelte';
    import { TranslationHelper } from '$lib/helper/core/translator-helper/translator-helper';

    // =====================================================================
    // Variables
    // =====================================================================

    // param for table data
    export let tableData: any[] = [];

    export let param: any;
    $: request = param;

    // =====================================================================
    // Functions
    // =====================================================================

    export let onUpdate : ()=>{};

    function handleSort(columnName: string) {
        if (param.orderBy == columnName) {
            switch (param.orderType) {
                case 'Ascending':
                    param.orderType = 'Descending'
                    break;
            
                case 'Descending':
                    param.orderType = 'Ascending'
                    break;
            
                default:
                    param.orderType = 'Ascending'
                    break;
            }
        } else {
            param.orderBy = columnName;
            param.orderType = 'Ascending'
        }

        onUpdate;
    }

</script>

<p>orderBy : {param.orderBy}</p>
<p>orderBy : {param.orderType}</p>
<p>pageSize : {param.pageSize}</p>
<p>pageSize : {param.pageNum}</p>

<div class="flex flex-col gap-2">
    <div class="h-[300px] w-full overflow-x-auto border border-ios-labelColors-separator-light">
        <table
            class="table m-1 w-full table-auto border border-collapse  border-ios-labelColors-separator-light relative"
        >
            <!-- table head starts -->

            <thead class="sticky top-0">
                <!-- table head row starts -->

                <tr class="h-10 bg-ios-systemColors-quaternarySystemFill-light border">
                    <!-- loop for each of the data key -->
                    {#each Object.keys(tableData[0]) as columnHeading}
                        <!-- return column header -->
                        <th
                            on:click={() => {
                                // alert(Object.values({ columnHeading }));
                                handleSort(
                                    Object.values({ columnHeading }).toString(),
                                );

                                onUpdate();
                            }}
                            class="h-full cursor-pointer border border-ios-labelColors-separator-light px-2.5"
                        >
                            <div
                                class="flex h-full flex-row items-center justify-between"
                            >
                                <span
                                    class="text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                                >
                                    {TranslationHelper.toMalay(columnHeading)}
                                </span>
                                <div
                                    class="flex h-full max-h-full w-10 flex-col items-center justify-center gap-0"
                                >
                                    <div
                                        class="select-none {param.orderBy ==
                                        Object.values({
                                            columnHeading
                                        }).toString()
                                            ? ' text-ios-labelColors-label-light'
                                            : ' text-ios-labelColors-tertiaryLabel-light'}"
                                    >
                                        {#if param.orderType == 'Ascending' && param.orderBy == Object.values( { columnHeading }, ).toString()}
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
                                class="h-full text-center border border-ios-labelColors-separator-light px-2.5"
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

    <div
        class="flex h-10 min-h-10 w-full flex-row items-center justify-between"
    >
        <!-- leading -->
        <div class="flex flex-row items-center gap-2">
            <label
                for="idType"
                class=" w-full text-sm font-medium text-gray-900 dark:text-white"
            >
                Saiz Data
            </label>
            <select
                name="idType"
                bind:value={param.pageSize}
                class=" block h-9 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                <option value=5>5</option>
                <option value=10>10</option>
                <option value=15>15</option>
                <option value=20>20</option>
            </select>
        </div>

        <!-- trailing -->
        <div class="flex flex-row items-center gap-2">
            <button
                type="button"
                class=" block h-9 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                <span>
                    <SvgChevronLeft></SvgChevronLeft>
                </span>
            </button>

            <button
                type="button"
                class=" block h-9 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                <span>
                    <SvgChevronRight></SvgChevronRight>
                </span>
            </button>
        </div>
    </div>
</div>
