<script lang="ts">
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgSortDown from '$lib/assets/svg/SvgSortDown.svelte';
    import SvgSortUp from '$lib/assets/svg/SvgSortUp.svelte';
    import { translate } from '$lib/config/dictionary';
    import {
        CommonListRequestConvert,
        type CommonListRequestDTO,
    } from '$lib/dto/core/common/common-list-request.dto';
    import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import { TableHelper } from '$lib/helpers/table-helper/table-helper';
    import http from '$lib/services/implementation/service-provider.service';
    import { afterUpdate, onMount } from 'svelte';
    import IconButton from '../button/IconButton.svelte';
    import ImpactButton from '../button/ImpactButton.svelte';
    import TableCellButton from '../button/TableCellButton.svelte';
    import TableIconButton from '../button/TableIconButton.svelte';
    import { ExportHelper } from '$lib/helpers/core/export-excel.helper';
    import LoadingOverlay from '../loading-overlay/LoadingOverlay.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '../button/TextIconButton.svelte';
    import SvgEmptyBox from '$lib/assets/svg/SvgEmptyBox.svelte';
    import { Span } from 'flowbite-svelte';
    import SvgCheckedTrue from '$lib/assets/svg/checkbox.svelte/SvgCheckedTrue.svelte';
    import SvgCheckedFalse from '$lib/assets/svg/checkbox.svelte/SvgCheckedFalse.svelte';
    import SvgDetailsIcon from '$lib/assets/svg/SvgDetailsIcon.svelte';
    import SvgEditIcons from '$lib/assets/svg/SvgEditIcons.svelte';
    import SvgSelectIcon from '$lib/assets/svg/SvgSelectIcon.svelte';
    import {
        toasterCommon,
        toasterFilteringData,
    } from '$lib/helpers/core/french-toast.helper';

    // =====================================================================
    // Variables
    // =====================================================================

    // title
    export let title: string = 'Table Title';

    // table id
    let loading: boolean = false;

    // main table settings
    export let tableData: TableSettingDTO;

    // data to be passed between pages
    export let passData: any = {};

    export let maxheight: string = 'max-h-[400px]';

    // action when detail button is clicked
    export let detailActions = () => {};

    // action when edit button is clicked
    export let editActions = () => {};

    // action when select button is clicked
    export let selectActions = () => {};

    // action when add button is clicked
    export let addActions = () => {};


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

    // =====================================================================
    // Functions
    // =====================================================================

    // handle data fetch
    async function fetchData() {
        try {
            const promiseResponse: Promise<Response> = http
                .post(tableData.url, {
                    body: CommonListRequestConvert.toJson(tableData.param),
                })
                .json();

            const response = await toasterFilteringData(promiseResponse);

            const result = CommonResponseConvert.fromResponse(response);

            if (result.status == 'success') {
                tableData.data = result.data?.dataList as object[];

                tableData.meta = result.data?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };

                tableData.param.pageSize = tableData.meta.pageSize;

                tableData.param.pageNum = tableData.meta.pageNum;
            }
        } catch (error) {
            throw new Error('Something went wrong');
        }
    }

    // handle translation
    function translator(keyword: string | number) {
        let result: string | number;

        if (typeof keyword == 'string') {
            let tempResult = tableData.dictionary.find(
                (item) => item.english == keyword,
            )?.malay;

            if (tempResult != undefined) {
                result = tempResult;
            } else {
                result = translate(keyword);
            }
        } else {
            result = keyword;
        }

        return result;
    }

    // handle sorting action
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

        fetchData();
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

    function handlePageSize() {
        tableData.param.pageNum = 1;
        fetchData();
    }

    // handle actions when user click on pagination button
    function handlePagination(direction: string) {
        switch (direction) {
            case 'next':
                tableData.param.pageNum! += 1;
                fetchData();
                break;

            case 'previous':
                tableData.param.pageNum! -= 1;
                fetchData();
                break;

            default:
                break;
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

    async function handleExportPDF(elementId: any) {
        try {
            loading = true;
            let printParam: CommonListRequestDTO = {
                pageNum: 1,
                pageSize: tableData.meta.totalData,
                orderBy: tableData.param.orderBy,
                orderType: tableData.param.orderType,
                filter: tableData.param.filter,
            };

            if (tableData.url !== '') {
                const response: Response = await http
                    .post(tableData.url, {
                        body: CommonListRequestConvert.toJson(printParam),
                    })
                    .json();

                const result = CommonResponseConvert.fromResponse(response);

                if (result.status == 'success') {
                    let tempData: object[] = result.data?.dataList as object[];

                    tableData.exportData = tempData;

                    let printElement = document.getElementById(elementId);

                    let printWindow = window.open('', 'PRINT');
                    printWindow?.document.write(
                        document.documentElement.innerHTML,
                    );
                    setTimeout(() => {
                        // Needed for large documents
                        printWindow!.document.body.style.margin = '0 0';
                        printWindow!.document.body.innerHTML =
                            printElement!.outerHTML;
                        printWindow!.document.close(); // necessary for IE >= 10
                        printWindow!.focus(); // necessary for IE >= 10*/
                        printWindow!.print();
                        printWindow!.close();
                    }, 1000);
                }
            } else if (tableData.url == '') {
                tableData.exportData = tableData.data;

                let printElement = document.getElementById(elementId);

                let printWindow = window.open('', 'PRINT');
                printWindow?.document.write(document.documentElement.innerHTML);
                setTimeout(() => {
                    // Needed for large documents
                    printWindow!.document.body.style.margin = '0 0';
                    printWindow!.document.body.innerHTML =
                        printElement!.outerHTML;
                    printWindow!.document.close(); // necessary for IE >= 10
                    printWindow!.focus(); // necessary for IE >= 10*/
                    printWindow!.print();
                    printWindow!.close();
                }, 1000);
            }

            loading = false;
        } catch (error) {
            loading = false;
            throw new Error('Something went wrong');
        }
    }

    async function handleExportExcel() {
        try {
            loading = true;

            setTimeout(async () => {
                let printParam: CommonListRequestDTO = {
                    pageNum: 1,
                    pageSize: tableData.meta.totalData,
                    orderBy: tableData.param.orderBy,
                    orderType: tableData.param.orderType,
                    filter: tableData.param.filter,
                };

                if (tableData.url !== '') {
                    const response: Response = await http
                        .post(tableData.url, {
                            body: CommonListRequestConvert.toJson(printParam),
                        })
                        .json();

                    const result = CommonResponseConvert.fromResponse(response);

                    if (result.status == 'success') {
                        let tempData: object[] = result.data
                            ?.dataList as object[];

                        tableData.exportData = tempData;

                        ExportHelper.excel(
                            title,
                            tableData,
                            tableData.dictionary,
                        );
                    }
                } else if (tableData.url == '') {
                    tableData.exportData = tableData.data;
                    ExportHelper.excel(title, tableData, tableData.dictionary);
                }

                loading = false;
            }, 1000);
        } catch (error) {
            loading = false;
            throw new Error('Something went wrong');
        }
    }

    onMount(() => {
        tableData.controls.header = true;
        if (tableData.option.footer == undefined) {
            tableData.option.footer = true;
        }
    });
</script>

{#if loading}
    <LoadingOverlay></LoadingOverlay>
{/if}

<div
    class="just-start flex h-fit w-full flex-col items-center overflow-x-hidden overflow-y-hidden"
>
    <!-- component header -->
    {#if tableData.controls.header}
        <div
            class="flex h-10 max-h-10 min-h-10 w-full flex-row items-center justify-between"
        >
            <!-- leading -->
            <div class="flex h-fit w-fit flex-row items-center justify-start">
                <p class="text-md font-medium">{title}</p>
            </div>
            <!-- trailing -->
            <div
                class="flex h-fit w-fit flex-row items-center justify-start gap-1"
            >
                <slot name="extras" />
                {#if tableData.controls.add}
                    <TextIconButton
                        label="Tambah"
                        icon="add"
                        onClick={() => {
                            addActions();
                        }}
                    ></TextIconButton>
                {/if}
                {#if tableData.controls.pdf}
                    <ImpactButton
                        label="PDF"
                        onClick={() => {
                            handleExportPDF(tableData.id);
                        }}
                    ></ImpactButton>
                {/if}
                {#if tableData.controls.excel}
                    <ImpactButton
                        label="Excel"
                        onClick={() => {
                            handleExportExcel();
                        }}
                    ></ImpactButton>
                {/if}
            </div>
        </div>
    {/if}

    <!-- table wrapper -->
    <div
        class="flex h-fit max-h-full w-full flex-col items-center justify-start rounded border"
    >
        <!-- filter area -->
        {#if tableData.option.filter}
            <div
                class="flex h-fit min-h-10 w-full flex-col items-center justify-center"
            >
                <div
                    class="flex h-fit min-h-14 w-full flex-row items-start justify-between overflow-hidden rounded-tl rounded-tr border-b bg-ios-basic-white p-2"
                >
                    <div
                        class=" flex min-h-10 w-full flex-row flex-wrap items-end justify-start gap-2 py-1"
                    >
                        <slot name="filter" />
                    </div>
                    <div
                        class="flex w-fit flex-col items-center justify-start gap-2 py-1"
                    >
                        <div
                            class="flex h-[44.5px] w-fit flex-col justify-end
         px-2"
                        >
                            <TextIconButton
                                label="Cari"
                                icon="search"
                                type="primary"
                                onClick={() => {
                                    fetchData();
                                }}
                            ></TextIconButton>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        <div
            class="flex h-fit {maxheight} w-full flex-col items-start justify-start overflow-auto"
        >
            {#if tableData.data.length == 0}
                <div
                    class="flex h-60 min-h-60 w-full flex-col items-center justify-center bg-ios-basic-white"
                >
                    <span class=" text-ios-labelColors-secondaryLabel-light">
                        <SvgEmptyBox size="30"></SvgEmptyBox>
                    </span>
                    <span
                        class=" text-base text-ios-labelColors-secondaryLabel-light"
                    >
                        Tiada Data
                    </span>
                </div>
            {:else}
                <table class="table h-fit w-full table-auto">
                    <thead class="sticky top-0 z-[1]">
                        <!-- table head row starts -->

                        <tr
                            class="h-10 min-h-10 w-full bg-ios-basic-extraLightBackgroundGray"
                        >
                            {#if tableData.option.checkbox}
                                <th class="h-full w-10 border-r px-2.5">
                                    <div
                                        class="flex h-full flex-row items-center justify-center"
                                    >
                                        <span
                                            class="select-none text-center align-middle text-base font-medium text-gray-700"
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
                                        class="select-none text-center align-middle text-base font-medium text-gray-700"
                                    >
                                        Bil.
                                    </span>
                                </div>
                            </th>
                            {#if tableData.data.length > 0}
                                {#each Object.keys(tableData.data[0]) as columnHeading}
                                    {#if !tableData.hiddenColumn?.includes(columnHeading)}
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
                                                class="flex h-full w-fit flex-row items-center justify-between"
                                            >
                                                <span
                                                    class="select-none text-nowrap text-center align-middle text-base font-medium text-gray-700"
                                                >
                                                    {translator(columnHeading)}
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
                                                            <SvgSortDown
                                                                size="18"
                                                            ></SvgSortDown>
                                                        {/if}
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    {/if}
                                {/each}

                                <!-- actions -->

                                {#if tableData.option.detail || tableData.option.edit || tableData.option.select}
                                    <th
                                        class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                                    >
                                        <div
                                            class="flex h-full flex-row items-center justify-center"
                                        >
                                            <span
                                                class="select-none text-center align-middle text-base font-medium text-gray-700"
                                            >
                                            </span>
                                        </div>
                                    </th>
                                {/if}
                            {:else}
                                <th>
                                    <span
                                        class="select-none text-center align-middle text-base font-medium text-gray-700"
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
                    <tbody>
                        <!-- loop trough all entries -->
                        {#each Object.values(tableData.data) as row, index}
                            <tr
                                class=" h-10 bg-ios-backgroundColors-systemBackground-light hover:bg-ios-systemColors-systemGrey6-light {index +
                                    1 ==
                                tableData.data.length
                                    ? ''
                                    : 'border-b'}"
                            >
                                {#if tableData.option.checkbox}
                                    <td
                                        class="h-full border-r px-2.5 text-center"
                                    >
                                        <div
                                            class="flex h-full flex-row items-center justify-center"
                                        >
                                            {#if compareObject(row)}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = row;
                                                        handleAddSelectedData(
                                                            row,
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        class=" text-ios-systemColors-systemRed-light"
                                                    >
                                                        <SvgCheckedTrue
                                                        ></SvgCheckedTrue>
                                                    </span>
                                                </IconButton>
                                            {:else}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = row;
                                                        handleAddSelectedData(
                                                            row,
                                                        );
                                                    }}
                                                >
                                                    <span
                                                        class="text-ios-activeColors-activeBlue-light"
                                                    >
                                                        <SvgCheckedFalse
                                                        ></SvgCheckedFalse>
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
                                        class="relative text-center align-middle text-base font-normal"
                                    >
                                        {index +
                                            1 +
                                            (tableData.meta.pageNum - 1) *
                                                tableData.meta.pageSize}
                                    </span>
                                </td>
                                <!-- loop through each property -->
                                {#each Object.keys(row) as key}
                                    {#if !TableHelper.isHidden(tableData.hiddenColumn ?? [], key)}
                                        <td
                                            class="h-full w-fit border-r border-ios-labelColors-separator-light px-2.5 text-start"
                                        >
                                            <span
                                                class="relative text-nowrap text-start align-middle text-base font-normal text-ios-labelColors-label-light"
                                            >
                                                {#if TableHelper.getKey(row, key) == null}
                                                    Tiada Maklumat
                                                {:else if TableHelper.getKey(row, key) !== ''}
                                                    {#if typeof TableHelper.getKey(row, key) == 'string'}
                                                        {TextAppearanceHelper.toProper(
                                                            TableHelper.getKey(
                                                                row,
                                                                key,
                                                            ),
                                                        )}
                                                    {:else}
                                                        {TableHelper.getKey(
                                                            row,
                                                            key,
                                                        )}
                                                    {/if}
                                                {/if}
                                            </span>
                                        </td>
                                    {/if}
                                {/each}

                                {#if tableData.option.detail || tableData.option.edit || tableData.option.select}
                                    <td
                                        class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                                    >
                                        <div
                                            class="flex h-full flex-row items-center justify-center gap-2"
                                        >
                                            {#if tableData.option.detail}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = row;
                                                        detailActions();
                                                    }}
                                                >
                                                    <SvgDetailsIcon
                                                    ></SvgDetailsIcon>
                                                </IconButton>
                                            {/if}
                                            {#if tableData.option.edit}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = row;
                                                        editActions();
                                                    }}
                                                >
                                                    <SvgEditIcons
                                                    ></SvgEditIcons>
                                                </IconButton>
                                            {/if}
                                            {#if tableData.option.select}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = row;
                                                        selectActions();
                                                    }}
                                                >
                                                    <SvgSelectIcon
                                                    ></SvgSelectIcon>
                                                </IconButton>
                                            {/if}
                                        </div>
                                    </td>
                                {/if}

                                <!-- action columns ends -->
                            </tr>
                        {/each}
                    </tbody>
                </table>
            {/if}
        </div>
        <!-- footer area -->
        {#if tableData.option.footer}
            <div
                class="flex h-10 min-h-10 w-full flex-row items-center justify-between rounded-bl rounded-br border-t bg-white px-2"
            >
                <!-- leading -->
                <div class="flex flex-row items-center gap-2">
                    <label
                        for="idType"
                        class=" w-full text-base font-medium text-gray-700"
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
                        class=" w-full text-nowrap text-base font-medium text-gray-700"
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
            </div>
        {/if}
    </div>
</div>

<!-- =========================================================== -->
<!-- Table Printing Area -->
<!-- =========================================================== -->

<div class="hidden">
    <div
        id={tableData.id}
        class="flex h-fit w-full flex-col items-center justify-start bg-white"
    >
        <!-- table title -->
        <div class="flex h-10 w-full flex-col items-start justify-center">
            <p class="text text-lg font-semibold">
                {title}
            </p>
        </div>
        <div class="flex h-fit w-full flex-col items-center justify-start">
            <table
                class="table w-full max-w-full table-auto border-collapse border"
            >
                {#if tableData.exportData.length > 0}
                    <thead>
                        <tr class="h-10 min-h-10">
                            <th
                                class="h-full w-10 border-r border-ios-labelColors-separator-light px-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-base font-medium text-gray-700"
                                    >
                                        Bil.
                                    </span>
                                </div>
                            </th>
                            {#if tableData.exportData.length > 0}
                                {#each Object.keys(tableData.exportData[0]) as columnHeading}
                                    {#if !tableData.hiddenColumn?.includes(columnHeading)}
                                        <!-- return column header -->
                                        <th
                                            class="h-full border border-r px-2.5"
                                        >
                                            <div
                                                class="flex h-full flex-row items-center justify-start"
                                            >
                                                <span
                                                    class="select-none text-start align-middle text-base font-medium text-ios-labelColors-label-light"
                                                >
                                                    {translate(columnHeading)}
                                                </span>
                                            </div>
                                        </th>
                                    {/if}
                                {/each}
                            {/if}
                        </tr>
                    </thead>
                    <tbody>
                        {#if tableData.exportData != undefined}
                            {#each Object.values(tableData.exportData) as row, index}
                                <tr class="h-10 border bg-ios-basic-white">
                                    <td
                                        class="h-full border-r border-ios-labelColors-separator-light px-2.5 text-center"
                                    >
                                        <span
                                            class="relative text-center align-middle text-base font-normal"
                                        >
                                            {index +
                                                1 +
                                                (tableData.meta.pageNum - 1) *
                                                    tableData.meta.pageSize}
                                        </span>
                                    </td>
                                    {#each Object.keys(row) as key}
                                        {#if !TableHelper.isHidden(tableData.hiddenColumn ?? [], key)}
                                            <td
                                                class="h-full border-r px-2.5 text-start"
                                            >
                                                <span
                                                    class="relative text-start align-middle text-base font-normal text-ios-labelColors-secondaryLabel-light"
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
                                                            {TableHelper.getKey(
                                                                row,
                                                                key,
                                                            )}
                                                        {/if}
                                                    {:else}
                                                        Tiada data
                                                    {/if}
                                                </span>
                                            </td>
                                        {/if}
                                    {/each}
                                </tr>
                            {/each}
                        {/if}
                    </tbody>
                {:else}
                    <p
                        class="w-full text-start text-base italic text-ios-basic-destructiveRed"
                    >
                        ***Tiada data untuk dicetak***
                    </p>
                {/if}
            </table>
        </div>
    </div>
</div>
