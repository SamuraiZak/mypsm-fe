<script lang="ts">
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { onMount } from 'svelte';
    import ImpactButton from '../button/ImpactButton.svelte';
    import TextIconButton from '../button/TextIconButton.svelte';
    import FilterTextField from './filter/FilterTextField.svelte';
    import SvgSortUp from '$lib/assets/svg/SvgSortUp.svelte';
    import SvgSortDown from '$lib/assets/svg/SvgSortDown.svelte';
    import { translate } from '$lib/config/dictionary';
    import SvgAddCircle from '$lib/assets/svg/SvgAddCircle.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import {
        CommonListRequestConvert,
        type CommonListRequestDTO,
    } from '$lib/dto/core/common/common-list-request.dto';
    import { CommonResponseConvert } from '$lib/dto/core/common/common-response.dto';
    import { ExportHelper } from '$lib/helpers/core/export-excel.helper';
    import http from '$lib/services/implementation/service-provider.service';
    import IconButton from '../button/IconButton.svelte';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import { TableHelper } from '$lib/helpers/table-helper/table-helper';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import SvgArrowRightSquareFill from '$lib/assets/svg/SvgArrowRightSquareFill.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';

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
            const response: Response = await http
                .post(tableData.url, {
                    body: CommonListRequestConvert.toJson(tableData.param),
                })
                .json();

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

<div class="flex h-full w-full flex-col items-center justify-start gap-2">
    <!-- table title section -->
    <div class="flex h-9 w-full flex-row items-center justify-between">
        <div class="flex h-full w-fit flex-row items-center justify-start">
            <h1 class="w-fit text-start text-md font-medium">
                {title}
            </h1>
        </div>
        <div
            class="flex h-full w-fit flex-row items-center justify-start gap-1"
        >
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

    <div
        class="flex h-fit w-full flex-col items-center justify-start rounded border"
    >
        <!-- table filter section -->
        <div
            class="flex h-fit min-h-9 w-full flex-row items-center justify-start p-2"
        >
            <div
                class="flex h-full flex-col items-center justify-start gap-px px-2 py-1"
            >
                <p class="h-5 text-nowrap text-base font-medium">
                    Tetapan Pencarian
                </p>
                <TextIconButton
                    label="Cari"
                    icon="search"
                    onClick={() => {
                        addActions();
                    }}
                ></TextIconButton>
            </div>
            <div class="flex w-full flex-row flex-wrap gap-1 p-1">
                <FilterTextField
                    label="Nama"
                    bind:inputValue={tableData.param.filter.name}
                ></FilterTextField>
                <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={tableData.param.filter.employeeNumber}
                ></FilterTextField>
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={tableData.param.filter
                        .identityDocumentNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Tahun"
                    bind:inputValue={tableData.param.filter.year}
                ></FilterTextField>
                <FilterTextField
                    label="Bulan"
                    bind:inputValue={tableData.param.filter.month}
                ></FilterTextField>
                <FilterTextField
                    label="Status"
                    bind:inputValue={tableData.param.filter.status}
                ></FilterTextField>
            </div>
        </div>

        <!-- table section -->
        <div class="h-fit w-full max-w-full overflow-x-auto">
            <table class="min-w-full border-collapse border-b border-t">
                <thead class="bg-gray-50">
                    <tr class="h-9 min-h-9">
                        {#if tableData.option.checkbox}
                            <th class="h-full w-10 border border-l-0">
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
                        <th class="h-full w-10 border">
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
                        {#each Object.keys(tableData.data[0]) as column}
                            {#if !tableData.hiddenColumn.includes(column)}
                                <th
                                    class="h-full min-h-full min-w-32 cursor-pointer border px-1"
                                >
                                    <div
                                        class="flex h-full w-full flex-row items-center justify-between"
                                    >
                                        <span
                                            class="select-none text-nowrap text-center align-middle text-base font-medium text-gray-700"
                                        >
                                            {translator(column)}
                                        </span>
                                        <div
                                            class="flex h-full max-h-full w-10 flex-col items-center justify-center gap-0"
                                        >
                                            <div
                                                class="select-none {tableData
                                                    .param.orderBy ==
                                                Object.values({
                                                    column,
                                                }).toString()
                                                    ? ' text-ios-labelColors-label-light'
                                                    : ' text-ios-labelColors-tertiaryLabel-light'}"
                                            >
                                                {#if tableData.param.orderType == 0 && tableData.param.orderBy == Object.values( { column }, ).toString()}
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
                        {#if tableData.option.detail || tableData.option.edit || tableData.option.select}
                            <th class="h-full border"> </th>
                        {/if}
                    </tr>
                </thead>
                <tbody class="bg-white">
                    {#each Object.values(tableData.data) as row, index}
                        <tr class="min-h-10">
                            {#if tableData.option.checkbox}
                                <td
                                    class="h-full border border-l-0 text-center"
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
                                                    class="text-ios-activeColors-activeBlue-light"
                                                >
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="2"
                                                            width="20"
                                                            height="20"
                                                            rx="4"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            stroke-width="1"
                                                        />
                                                        <path
                                                            d="M6 12L10 16L18 8"
                                                            stroke="white"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
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
                                                    class="text text-gray-700"
                                                >
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="2"
                                                            y="2"
                                                            width="20"
                                                            height="20"
                                                            rx="4"
                                                            fill="white"
                                                            stroke="currentColor"
                                                            stroke-width="1"
                                                        />
                                                    </svg>
                                                </span>
                                            </IconButton>
                                        {/if}
                                    </div>
                                </td>
                            {/if}
                            <td
                                class="h-full border-r border-ios-labelColors-separator-light text-center"
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

                            <!-- the data -->
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
                                <td class="h-full text-center">
                                    <div
                                        class="flex h-full w-full flex-row items-center justify-center gap-2"
                                    >
                                        {#if tableData.option.detail}
                                            <button
                                                class="flex h-fit w-fit flex-col items-center justify-center"
                                            >
                                                <span>
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle
                                                            cx="8"
                                                            cy="8"
                                                            r="7"
                                                            stroke="#4A5568"
                                                            stroke-width="1"
                                                            fill="none"
                                                        />
                                                        <circle
                                                            cx="5"
                                                            cy="8"
                                                            r="1"
                                                            fill="#4A5568"
                                                        />
                                                        <circle
                                                            cx="8"
                                                            cy="8"
                                                            r="1"
                                                            fill="#4A5568"
                                                        />
                                                        <circle
                                                            cx="11"
                                                            cy="8"
                                                            r="1"
                                                            fill="#4A5568"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        {/if}
                                        {#if tableData.option.edit}
                                            <button
                                                class="flex h-fit w-fit flex-col items-center justify-center"
                                            >
                                                <span>
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z"
                                                            stroke="#4A5568"
                                                            stroke-width="1"
                                                            fill="none"
                                                        />
                                                        <path
                                                            d="M9.5 3.5L12.5 6.5"
                                                            stroke="#4A5568"
                                                            stroke-width="1"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        {/if}
                                        {#if tableData.option.edit}
                                            <button
                                                class="flex h-fit w-fit flex-col items-center justify-center"
                                            >
                                                <span>
                                                    <svg
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 16 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <circle
                                                            cx="8"
                                                            cy="8"
                                                            r="7"
                                                            stroke="#4A5568"
                                                            stroke-width="1"
                                                            fill="none"
                                                        />
                                                        <path
                                                            d="M5 8H11M8 5L11 8L8 11"
                                                            stroke="#4A5568"
                                                            stroke-width="1"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        {/if}
                                    </div>
                                </td>
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- table footer section -->
        <div
            class="flex h-10 min-h-10 w-full flex-row items-center justify-between px-2"
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
    </div>
</div>
