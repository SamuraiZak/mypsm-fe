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
    import IconButton from '$lib/components/button/IconButton.svelte';
    import { translate } from '$lib/config/dictionary';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { onMount } from 'svelte';
    import generatePDF from '$lib/services/implementation/core/pdf-generator/puppeteer-pdf-generator.helper';
    import { TableHelper } from '$lib/helpers/table-helper/table-helper';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import { string } from 'zod';
    import TextIconButton from '../button/TextIconButton.svelte';
    import TableCellButton from '../button/TableCellButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TableIconButton from '../button/TableIconButton.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    // import { generatePDF } from '$lib/helpers/core/puppeteer-pdf-generator.helper';

    // =====================================================================
    // Variables
    // =====================================================================

    // table id
    export let tableId = 'tableId';

    export let title = 'Table title';

    // props: data for the table
    export let tableData: TableDTO;

    export let passData: any = {};

    // props: callback functions to handle sort and pagination actions
    export let onUpdate = () => {};

    // props: callback functions to handle view details
    export let detailActions = () => {};

    export let selectActions = () => {};

    export let editActions = () => {};

    export let enableAdd = false;

    export let enableDetail = false;

    export let enableSelect = false;

    export let enableEdit = false;

    export let hiddenFooter = false;

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

    // =====================================================================
    // Functions
    // =====================================================================

    // handle action when user clisck on the table header
    function handleSort(columnName: string) {
        if (tableData.param.orderBy == columnName) {
            switch (tableData.param.orderType) {
                case 0:
                    tableData.param.orderType = 1;
                    break;

                case 1:
                    tableData.param.orderType = 0;
                    break;

                default:
                    tableData.param.orderType = 0;
                    break;
            }
        } else {
            tableData.param.orderBy = columnName;
            tableData.param.orderType = 0;
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

    let prefix = '#' + tableId;
    let tableElement: any;

    onMount(async () => {
        tableElement = document.querySelector(prefix);
    });

    function printDiv(elementId: any) {
        let printElement = document.getElementById(elementId);
        generatePDF<HTMLElement | null>('Title Example', printElement);

        // let printWindow = window.open('', 'PRINT');
        // printWindow?.document.write(document.documentElement.innerHTML);
        // setTimeout(() => {
        //     // Needed for large documents
        //     printWindow!.document.body.style.margin = '0 0';
        //     printWindow!.document.body.innerHTML = printElement!.outerHTML;
        //     printWindow!.document.close(); // necessary for IE >= 10
        //     printWindow!.focus(); // necessary for IE >= 10*/
        //     printWindow!.print();
        //     printWindow!.close();
        // }, 1000);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col rounded-md border border-ios-labelColors-separator-light"
>
    <!-- table info -->

    <div
        class="flex min-h-10 w-full flex-row items-center justify-between rounded-tl-md rounded-tr-md border-b bg-ios-basic-white p-2"
    >
        <!-- leading -->
        <div class="flex flex-row items-center gap-2">
            <div class="flex h-full flex-row items-center justify-center">
                <span class="text-base font-medium"> {title} </span>
            </div>
        </div>

        <!-- trailing -->
        <div class="flex flex-row items-center gap-2">
            {#if tableData.selectedData?.length ?? 0 > 0}
                <span class="text-base font-normal">
                    {tableData.selectedData?.length} item dipilih
                </span>
            {/if}
            <slot name="buttons" />
            <button
                on:click={() => {
                    printDiv(prefix);
                }}
                class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0"
            >
                <!-- icon -->
                <div class="flex h-full flex-row items-center justify-center">
                    <span class="leading-loose">
                        <!-- icon slot -->
                        <SvgDownload></SvgDownload>
                    </span>
                </div>

                <!-- label -->
                <div class="flex h-full flex-row items-center justify-center">
                    <p class="text-sm font-normal leading-loose">PDF</p>
                </div>
            </button>
        </div>
    </div>

    <div
        class="h-full max-h-full min-h-[100px] w-full overflow-x-auto border-b"
    >
        <table
            id={prefix}
            class="table max-h-full w-full table-auto border-collapse"
        >
            <!-- table head starts -->

            <thead class="sticky top-0 z-[1]">
                <!-- table head row starts -->

                <tr
                    class="h-7 min-h-7 bg-ios-systemColors-quaternarySystemFill-light"
                >
                    {#if enableAdd}
                        <th class="h-full w-10 border border-r px-2.5">
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <span
                                    class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                >
                                </span>
                            </div>
                        </th>
                    {/if}
                    <th
                        class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span
                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >
                                Bil.
                            </span>
                        </div>
                    </th>
                    {#if tableData.data.length > 0}
                        {#each Object.keys(tableData.data[0]) as columnHeading}
                            {#if !tableData.hiddenData?.includes(columnHeading)}
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
                                            class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                        >
                                            {translate(columnHeading)}
                                        </span>
                                        <div
                                            class="flex h-full max-h-full w-10 flex-col items-center justify-center gap-0"
                                        >
                                            <div
                                                class="select-none {tableData
                                                    .param.orderBy ==
                                                Object.values({
                                                    columnHeading,
                                                }).toString()
                                                    ? ' text-ios-labelColors-label-light'
                                                    : ' text-ios-labelColors-tertiaryLabel-light'}"
                                            >
                                                {#if tableData.param.orderType == 0 && tableData.param.orderBy == Object.values( { columnHeading }, ).toString()}
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
                            {/if}
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
                                        class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                    >
                                    </span>
                                </div>
                            </th>
                        {/if}
                        {#if enableSelect}
                            <th
                                class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                    >
                                    </span>
                                </div>
                            </th>
                        {/if}
                        {#if enableEdit}
                            <th
                                class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                    >
                                    </span>
                                </div>
                            </th>
                        {/if}
                    {:else}
                        <th>
                            <span
                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
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
                {#each Object.values(tableData.data) as row, index}
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
                        <td
                            class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                        >
                            <span
                                class="relative text-center align-middle text-sm font-normal"
                            >
                                {index +
                                    1 +
                                    (tableData.meta.pageNum - 1) *
                                        tableData.meta.pageSize}
                            </span>
                        </td>
                        <!-- loop through each property -->
                        {#each Object.keys(row) as key}
                            {#if !TableHelper.isHidden(tableData.hiddenData ?? [], key)}
                                <td
                                    class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                                >
                                    <span
                                        class="relative text-center align-middle text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        {#if TableHelper.getKey(row, key) !== '' || TableHelper.getKey(row, key) !== null || TableHelper.getKey(row, key) !== null}
                                            {#if typeof TableHelper.getKey(row, key) == 'string'}
                                                {TextAppearanceHelper.toProper(
                                                    TableHelper.getKey(
                                                        row,
                                                        key,
                                                    ),
                                                )}
                                            {:else}
                                                {TableHelper.getKey(row, key)}
                                            {/if}
                                        {:else}
                                            Tiada data
                                        {/if}
                                    </span>
                                </td>
                            {/if}
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
                        {#if enableSelect}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <TableCellButton
                                        label="Pilih"
                                        onClick={() => {
                                            passData = row;
                                            selectActions();
                                        }}
                                    >
                                        <SvgCheck slot="icon"></SvgCheck>
                                    </TableCellButton>
                                </div>
                            </td>
                        {/if}
                        {#if enableEdit}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <TableIconButton
                                        color="light"
                                        onClick={() => {
                                            passData = row;
                                            editActions();
                                        }}
                                    >
                                        <SvgEdit slot="icon" size="15"
                                        ></SvgEdit>
                                    </TableIconButton>
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
        class="flex min-h-10 w-full flex-row items-center justify-between rounded-bl-md rounded-br-md border-ios-labelColors-separator-light bg-ios-basic-white p-2"
    >
        {#if !hiddenFooter}
            <!-- leading -->
            <div class="flex flex-row items-center gap-2">
                <label
                    for="idType"
                    class=" w-full text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                >
                    Saiz Data
                </label>
                <select
                    name="idType"
                    bind:value={tableData.param.pageSize}
                    on:change={handlePageSize}
                    class=" block h-7 appearance-none rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                >
                    {#each pageSizeOption as option}
                        <option value={option.value}>{option.key}</option>
                    {/each}
                </select>
            </div>
            <div class="flex flex-row items-center gap-2">
                <label
                    for="idType"
                    class=" w-full text-nowrap text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                >
                    {tableData.meta.totalData} hasil carian
                </label>
            </div>

            <!-- trailing -->
            <div class="flex flex-row items-center gap-2">
                <button
                    disabled={tableData.param.pageNum == 1}
                    on:click={() => {
                        handlePagination('previous');
                    }}
                    type="button"
                    class=" block h-7 w-7 rounded border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light disabled:text-ios-basic-inactiveGray"
                >
                    <span
                        class="flex flex-col items-center justify-center text-center"
                    >
                        <SvgChevronLeft></SvgChevronLeft>
                    </span>
                </button>

                <button
                    disabled={tableData.param.pageNum ==
                        tableData.meta.totalPage}
                    on:click={() => {
                        handlePagination('next');
                    }}
                    type="button"
                    class=" block h-7 w-7 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light disabled:text-ios-basic-inactiveGray"
                >
                    <span
                        class="flex flex-col items-center justify-center text-center"
                    >
                        <SvgChevronRight></SvgChevronRight>
                    </span>
                </button>
            </div>
        {/if}
    </div>
</div>
