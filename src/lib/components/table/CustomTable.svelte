<script lang="ts">
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    import SvgDownload from '$lib/assets/svg/SvgDownload.svelte';
    import SvgReload from '$lib/assets/svg/SvgReload.svelte';
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import SvgSortDown from '$lib/assets/svg/SvgSortDown.svelte';
    import SvgSortUp from '$lib/assets/svg/SvgSortUp.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import { translate } from '$lib/config/dictionary';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { onMount } from 'svelte';

    // =====================================================================
    // Variables
    // =====================================================================

    // props: data for the table
    export let tableData: TableDTO;

    export let passData: any = {};

    // props: callback functions to handle sort and pagination actions
    export let onUpdate = () => {};

    // props: callback functions to handle view details
    export let detailActions = () => {};

    export let enableAdd = false;

    export let enableDetail = false;

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
            key: 100,
            value: 100,
        },
    ];

    // =====================================================================
    // Functions
    // =====================================================================

    // handle action when user clisck on the table header
    function handleSort(columnName: string) {
        if (tableData.param.orderBy == columnName) {
            switch (tableData.param.orderType) {
                case 'Ascending':
                    tableData.param.orderType = 'Descending';
                    break;

                case 'Descending':
                    tableData.param.orderType = 'Ascending';
                    break;

                default:
                    tableData.param.orderType = 'Ascending';
                    break;
            }
        } else {
            tableData.param.orderBy = columnName;
            tableData.param.orderType = 'Ascending';
        }

        onUpdate();
    }

    // handle actions when user click on pagination button
    function handlePagination(direction: string) {
        switch (direction) {
            case 'next':
                tableData.param.pageNum! += 1;
                onUpdate();
                break;

            case 'previous':
                tableData.param.pageNum! -= 1;
                onUpdate();
                break;

            default:
                break;
        }
    }

    // handle actions when user choose new page size
    function handlePageSize() {
        tableData.param.pageNum = 1;
        onUpdate();
    }

    function compareObject(objectRef: any) {
        const objectRefKey = Object.keys(objectRef)[0];

        const objectRefValue = objectRef[objectRefKey];
        const objectTarget = tableData.selectedData?.filter(
            (obj: any) => obj[objectRefKey] == objectRefValue,
        );

        if (objectTarget!.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    // handle for add action
    function handleAddSelectedData(item: any) {
        let isExist = compareObject(item);

        if (!isExist) {
            tableData.selectedData?.push(item);
            tableData = tableData;
        } else {
            const objectRefKey = Object.keys(item)[0];

            const objectRefValue = item[objectRefKey];
            const objectTarget = tableData.selectedData?.filter(
                (obj: any) => obj[objectRefKey] !== objectRefValue,
            );

            tableData.selectedData = objectTarget;
        }
    }

    let tableElement: any;

    onMount(async () => {
        tableElement = document.querySelector('#customTable');
    });

    function printDiv(elementId: any) {
        let printElement = document.getElementById(elementId);
        let printWindow = window.open('', 'PRINT');
        printWindow?.document.write(document.documentElement.innerHTML);
        setTimeout(() => {
            // Needed for large documents
            printWindow!.document.body.style.margin = '0 0';
            printWindow!.document.body.innerHTML = printElement!.outerHTML;
            printWindow!.document.close(); // necessary for IE >= 10
            printWindow!.focus(); // necessary for IE >= 10*/
            printWindow!.print();
            printWindow!.close();
        }, 1000);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col rounded-sm border border-ios-labelColors-separator-light"
>
    <!-- table info -->

    <div
        class="flex min-h-10 w-full flex-row items-center justify-between border-b p-2"
    >
        <!-- leading -->
        <div class="flex flex-row items-center gap-2">
            <button
                on:click={() => {
                    onUpdate();
                }}
                class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0"
            >
                <!-- icon -->
                <div class="flex h-full flex-row items-center justify-center">
                    <span class="leading-loose">
                        <!-- icon slot -->
                        <SvgReload size="12"></SvgReload>
                        <slot />
                    </span>
                </div>
            </button>
        </div>

        <!-- trailing -->
        <div class="flex flex-row items-center gap-2">

            <button
                on:click={() => {
                    printDiv('customTable');
                }}
                class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0"
            >
                <!-- icon -->
                <div class="flex h-full flex-row items-center justify-center">
                    <span class="leading-loose">
                        <!-- icon slot -->
                        <SvgDownload></SvgDownload>
                        <slot />
                    </span>
                </div>

                <!-- label -->
                <div class="flex h-full flex-row items-center justify-center">
                    <p class="text-sm font-normal leading-loose">PDF</p>
                </div>
            </button>
        </div>
    </div>

    <div class="h-full max-h-full min-h-[300px] w-full overflow-x-auto">
        <table
            id="customTable"
            class="table max-h-full w-full table-auto border-collapse"
        >
            <!-- table head starts -->

            <thead class="sticky top-0 z-10">
                <!-- table head row starts -->

                <tr class="h-10 bg-ios-systemColors-quaternarySystemFill-light">
                    {#if enableAdd}
                        <th
                            class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                        >
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <span
                                    class="select-none text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                                >
                                </span>
                            </div>
                        </th>
                    {/if}
                    {#if tableData.data.length > 0}
                        {#each Object.keys(tableData.data[0]) as columnHeading}
                            <!-- return column header -->
                            <th
                                on:click={() => {
                                    // alert(Object.values({ columnHeading }));
                                    handleSort(
                                        Object.values({
                                            columnHeading,
                                        }).toString(),
                                    );
                                }}
                                class="h-full cursor-pointer border-r border-ios-labelColors-separator-light px-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-between"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                                    >
                                        {translate(columnHeading)}
                                    </span>
                                    <div
                                        class="flex h-full max-h-full w-10 flex-col items-center justify-center gap-0"
                                    >
                                        <div
                                            class="select-none {tableData.param
                                                .orderBy ==
                                            Object.values({
                                                columnHeading,
                                            }).toString()
                                                ? ' text-ios-labelColors-label-light'
                                                : ' text-ios-labelColors-tertiaryLabel-light'}"
                                        >
                                            {#if tableData.param.orderType == 'Ascending' && tableData.param.orderBy == Object.values( { columnHeading }, ).toString()}
                                                <SvgSortUp size="18"
                                                ></SvgSortUp>
                                            {:else}
                                                <SvgSortDown size="18"
                                                ></SvgSortDown>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </th>
                        {/each}

                        <!-- actions -->

                        {#if enableDetail}
                            <th
                                class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                                    >
                                    </span>
                                </div>
                            </th>
                        {/if}
                    {:else}
                        <th>
                            <span
                                class="select-none text-center align-middle text-sm font-semibold text-ios-labelColors-secondaryLabel-light"
                            >
                                Tiada Rekod
                            </span>
                        </th>
                    {/if}
                    <!-- loop for each of the data key -->
                </tr>

                <tr>
                    <th
                        class="h-[1px] bg-ios-labelColors-separator-light p-0"
                        colspan="15"
                    ></th>
                </tr>

                <!-- table head row ends -->
            </thead>

            <!-- table head ends -->

            <!-- table body starts -->

            <tbody>
                <!-- loop trough all entries -->
                {#each Object.values(tableData.data) as row}
                    <tr
                        class=" h-10 border-b border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light"
                    >
                        {#if enableAdd}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    {#if compareObject(row)}
                                        <IconButton
                                            onClick={() => {
                                                passData = row;
                                                handleAddSelectedData(row);
                                            }}
                                        >
                                            <span
                                                class=" text-ios-systemColors-systemRed-light"
                                            >
                                                <SvgMinusCircle
                                                ></SvgMinusCircle>
                                            </span>
                                        </IconButton>
                                    {:else}
                                        <IconButton
                                            onClick={() => {
                                                passData = row;
                                                handleAddSelectedData(row);
                                            }}
                                        >
                                            <span
                                                class="text-ios-activeColors-activeBlue-light"
                                            >
                                                <SvgAddCircle></SvgAddCircle>
                                            </span>
                                        </IconButton>
                                    {/if}
                                </div>
                            </td>
                        {/if}
                        <!-- loop through each property -->
                        {#each Object.values(row) as cell}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                            >
                                <span
                                    class="relative text-center align-middle text-base font-normal"
                                >
                                    {cell}
                                </span>
                            </td>
                        {/each}

                        <!-- actions column starts -->
                        {#if enableDetail}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <IconButton
                                        onClick={() => {
                                            passData = row;
                                            detailActions();
                                        }}
                                    >
                                        <SvgEllipsisCircle></SvgEllipsisCircle>
                                    </IconButton>
                                </div>
                            </td>
                        {/if}

                        <!-- action columns ends -->
                    </tr>
                {/each}
            </tbody>

            <!-- table body ends -->
        </table>
    </div>
    <!-- table control -->

    <div
        class="flex min-h-10 w-full flex-row items-center justify-between border-t border-ios-labelColors-separator-light p-2"
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
                bind:value={tableData.param.pageSize}
                on:change={handlePageSize}
                class=" block h-9 appearance-none rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            >
                {#each pageSizeOption as option}
                    <option value={option.value}>{option.key}</option>
                {/each}
            </select>
        </div>

        <!-- trailing -->
        <div class="flex flex-row items-center gap-2">
            <button
                disabled={tableData.param.pageNum == 1}
                on:click={() => {
                    handlePagination('previous');
                }}
                type="button"
                class=" block h-9 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light disabled:text-ios-basic-inactiveGray"
            >
                <span>
                    <SvgChevronLeft></SvgChevronLeft>
                </span>
            </button>

            <button
                disabled={tableData.param.pageNum == tableData.meta.totalPage}
                on:click={() => {
                    handlePagination('next');
                }}
                type="button"
                class=" block h-9 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light disabled:text-ios-basic-inactiveGray"
            >
                <span>
                    <SvgChevronRight></SvgChevronRight>
                </span>
            </button>
        </div>
    </div>
</div>
