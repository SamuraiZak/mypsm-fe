<script lang="ts">
    import {
        Checkbox,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        // PaginationItem,
        // Select,
        // Button,
        // Dropdown,
        // DropdownItem,
        // Tooltip,
    } from 'flowbite-svelte';
    // import SvgChevronUpDown from '$lib/assets/svg/SvgChevronUpDown.svelte';
    // import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import { translate } from '$lib/config/dictionary';
    // import SvgChevronRight from '$lib/assets/svg/SvgChevronRight.svelte';
    // import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { afterUpdate } from 'svelte';
    // import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    // import SvgTrash from '$lib/assets/svg/SvgTrash.svelte';
    // import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { TableHelper } from '$lib/helpers/table-helper/table-helper';

    let tableHelper = TableHelper;

    let tableItem = {};
    export let tableItems: Record<string, any>[] = [tableItem];
    let initialTableItems = tableItems;
    let selectedTableData = tableItems;
    export let checkedItems: Record<string, any>[] = [];
    export let hasCheckbox: boolean = false;
    let checkAll = false;
    let searchTerm = '';
    let sortColumn = '';
    export let editable: boolean = false;
    export let withRowSelection: boolean = false;
    // export let selectAdd: boolean = false;
    // export let passData: any = {};
    // export let onEditClick = () => {};
    // export let onSelect = () => {};

    export let selectedItems: Record<string, any>[] = [];

    export let withActions: boolean = false;
    // export let actionOptions: string[] = ['detail', 'edit', 'delete', 'print'];
    // export let editActions = () => {};
    // export let detailActions = () => {};
    // export let deleteActions = () => {};
    // export let printActions = () => {};

    export let columnKeys: string[] = [];
    function filterColumns(para: Record<string, any>[], keys: string[]) {
        const filteredData = para.map((element) => {
            const newObj: Record<string, any> = {};

            keys.forEach((item) => {
                if (element.hasOwnProperty(item)) {
                    newObj[item] = element[item];
                } else newObj[item] = '';
            });

            return newObj;
        });

        return filteredData;
    }
    console.table(tableItems);
    afterUpdate(() => {
        if (columnKeys.length > 0)
            selectedTableData = filterColumns(tableItems, columnKeys);

        if (excludeCol.length > 0)
            selectedTableData = removeCols(tableItems, excludeCol);
    });

    function pushSelected(data: any) {
        let tempSelected = selectedItems;
        if (!tempSelected.includes(data)) {
            tempSelected.push(data);
            selectedItems = tempSelected;
        }
        console.log(selectedItems);
    }

    // function popSelected(data: any) {
    //     let tempSelected = selectedItems;
    //     tempSelected = tempSelected.filter((item) => item !== data);

    //     selectedItems = tempSelected;

    //     console.log(selectedItems);
    // }

    export let excludeCol: string[] = [];
    function removeCols(para: Record<string, any>[], keys: string[]) {
        let data: Record<string, any>[] = para;

        data.forEach((element) => {
            keys.forEach((item) => {
                delete element[item];
            });
        });
        return data;
    }

    // function sortTable(columnName: string) {
    //     // Check if the columnName exists in each item of tableItems
    //     const columnExists = initialTableItems.every((item) =>
    //         item.hasOwnProperty(columnName),
    //     );

    //     if (columnExists) {
    //         if (sortColumn === columnName) {
    //             // If the same column is clicked again, reverse the sorting order
    //             tableItems = [...tableItems].reverse();
    //         } else {
    //             // Sort the table by the selected column
    //             tableItems = [...tableItems].sort((a, b) => {
    //                 if (a[columnName] < b[columnName]) {
    //                     return -1;
    //                 }
    //                 if (a[columnName] > b[columnName]) {
    //                     return 1;
    //                 }
    //                 return 0;
    //             });
    //         }
    //         sortColumn = columnName;
    //     }
    // }

    // let sortBy = {
    //     column: '',
    //     order: 0,
    // };

    function sort(key: string) {
        // if (key == sortBy.column && sortBy.order == 1) {
        //     tableItems = tableItems.sort(createCompareFn(key, 'desc'));

        //     sortBy.order = 2;
        // } else if (key == sortBy.column && sortBy.order == 2) {
        //     tableItems = tableItems.sort(createCompareFn(key, 'asc'));
        //     sortBy.order = 1;
        // } else {
        //     tableItems = tableItems.sort(createCompareFn(key, 'asc'));
        //     sortBy.column = key;
        //     sortBy.order = 1;
        // }

        let lastItemIndex = tableItems.length - 1;
        let firstItem = tableItems[0][key];
        let lastItem = tableItems[lastItemIndex][key];

        let order = firstItem.localeCompare(lastItem);

        console.log(order);

        if (order == -1) {
            tableItems = tableItems.sort(tableHelper.sort(key, 'desc'));
        } else if (order == 1) {
            tableItems = tableItems.sort(tableHelper.sort(key, 'asc'));
        }
    }

    // Function to handle checkbox change
    function toggleAll(items: Record<string, any>[]) {
        checkAll = !checkAll;

        for (let index = 0; index < items.length; index++) {
            updatedTableItems[index].selected = checkAll;
        }

        // filteredItems = filteredItems.map((item, index) => ({
        //     ...item,
        //     selected: (index >= startIndex  && index < endIndex) ? checkAll : item.selected,
        // }));

        checkedItems = tableItems.filter((i) => i.selected);
    }

    // Function to handle single row checkbox change
    // function toggleSelect(item: Record<string, any>) {
    //     item.selected = !item.selected;
    //     checkAll = updatedTableItems.every((i) => i.selected);
    //     checkedItems = tableItems.filter((i) => i.selected);
    // }

    $: filteredItems = tableItems.filter((item) => {
        const values = Object.values(item);
        const searchTermLower = searchTerm.toLowerCase();

        let searchIncluded = selectedTableData.filter((key) => {
            return Object.values(key).some((selectedValue) =>
                String(selectedValue).toLowerCase().includes(searchTermLower),
            );
        });

        // Check if any value in the item matches the search term
        if (searchIncluded.length > 0)
            return values.some((value) =>
                String(value).toLowerCase().includes(searchTermLower),
            );
    });

    $: {
        searchTerm;
        currentPage = 1;
    }
    let currentPage: number = 1;
    let lastPage: number;
    let itemsPerPage: number = 10;
    let updatedTableItems = filteredItems;

    const itemsPerPageSelect = [
        { value: 10, name: 10 },
        { value: 15, name: 15 },
        { value: 20, name: 20 },
        { value: 25, name: 25 },
    ];
    let selected: number = itemsPerPage;

    // $: pages = Array.from(
    //     { length: Math.ceil(filteredItems.length / itemsPerPage) },
    //     (_, index) => ({ name: (index + 1).toString() }),
    //     (lastPage = Math.ceil(filteredItems.length / itemsPerPage)),
    // );

    // const previous = () => {
    //     currentPage--;
    // };
    // const next = () => {
    //     currentPage++;
    // };
    // function pageClick(pageNo: number) {
    //     currentPage = pageNo;
    // }

    let startIndex: number = 1;
    let endIndex: number = 10;

    $: {
        currentPage;
        startIndex = (currentPage - 1) * itemsPerPage;
        endIndex = startIndex + itemsPerPage;
        if (endIndex > filteredItems.length) endIndex = filteredItems.length;
        updatedTableItems = filteredItems.slice(startIndex, endIndex);
        checkAll = updatedTableItems.every((i) => i.selected);
    }

    // custom tailwind classes for the table components as depicted in the design
    let tdClass =
        'px-6 py-2 text-sm whitespace-nowrap font-medium text-center border';
    let divClass = 'relative pb-0';
    let padding = 'px-6 py-2 border text-center  cursor-pointer';
    let inputClass =
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-[3px] h-8 focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    let svgDivClass =
        'absolute inset-y-0 right-0 flex items-center order-2 pr-3 pointer-events-none';
    // let searchClass: string = 'fixed right-2.5';
    let innerDivClass: string = 'py-2.5 p-0 mb-8';
    // let paginationBtnClass: string =
    //     'border bg-white px-2 py-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
</script>

<div
    class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
>
    <!-- table -->
    <div class="h-full max-h-full w-full overflow-x-auto overflow-y-auto">
        <div class="h-fit bg-bgr-primary">
            <Table
                {inputClass}
                {svgDivClass}
                {divClass}
                {innerDivClass}
                hoverable={true}
                shadow={false}
                noborder={true}
            >
                {#if updatedTableItems.length !== 0}
                    <TableHead>
                        {#if withRowSelection}
                            <TableHeadCell
                                padding="px-6 py-2 text-center border"
                                class="w-10 max-w-[40px] p-0"
                            ></TableHeadCell>
                        {/if}
                        {#if hasCheckbox}
                            <TableHeadCell {padding} class="w-10 max-w-[40px]">
                                <Checkbox
                                    class="m-0 flex justify-center"
                                    bind:checked={checkAll}
                                    on:click={() =>
                                        toggleAll(updatedTableItems)}
                                />
                            </TableHeadCell>
                        {/if}
                        <TableHeadCell
                            padding="px-6 py-2 border text-center"
                            class="w-10 max-w-[40px] p-0"
                        >
                            <div
                                class="flex flex-row items-center justify-center gap-1"
                            >
                                <span class="text-sm">Bil.</span>
                            </div>
                        </TableHeadCell>
                        {#each Object.entries(updatedTableItems[0]) as [key, value]}
                            {#if key !== 'selected'}
                                {#if columnKeys.length > 0}
                                    {#if columnKeys.includes(key)}
                                        {#if typeof value !== 'object'}
                                            <TableHeadCell
                                                {padding}
                                                on:click={() => sort(key)}
                                            >
                                                <div
                                                    class="flex flex-row items-center justify-center gap-1"
                                                >
                                                    <span class="text-sm"
                                                        >{translate(key)}</span
                                                    >
                                                    <span
                                                        class="text-txt-tertiary"
                                                    >
                                                        <!-- <SvgChevronUpDown
                                                        ></SvgChevronUpDown> -->
                                                    </span>
                                                </div>
                                            </TableHeadCell>
                                        {:else if typeof value === 'object' && value !== null}
                                            {#if Object.keys(value)[0] !== '0'}
                                                {#each Object.entries(value) as [objectKey, val]}
                                                    <TableHeadCell
                                                        {padding}
                                                        on:click={() =>
                                                            sort(objectKey)}
                                                    >
                                                        <div
                                                            class="flex flex-row items-center justify-center gap-1"
                                                        >
                                                            <span
                                                                class="text-sm"
                                                                >{translate(
                                                                    objectKey,
                                                                )}</span
                                                            >
                                                            <span
                                                                class="text-txt-tertiary"
                                                            >
                                                                <!-- <SvgChevronUpDown
                                                                ></SvgChevronUpDown> -->
                                                            </span>
                                                        </div>
                                                    </TableHeadCell>
                                                {/each}
                                            {:else if Object.keys(value)[0] === '0'}
                                                <TableHeadCell
                                                    {padding}
                                                    on:click={() => sort(key)}
                                                >
                                                    <div
                                                        class="flex flex-row items-center justify-center gap-1"
                                                    >
                                                        <span class="text-sm"
                                                            >{translate(
                                                                key,
                                                            )}</span
                                                        >
                                                        <span
                                                            class="text-txt-tertiary"
                                                        >
                                                            <!-- <SvgChevronUpDown
                                                            ></SvgChevronUpDown> -->
                                                        </span>
                                                    </div>
                                                </TableHeadCell>
                                            {/if}
                                        {/if}
                                    {/if}

                                    <!-- lvl1 -->
                                {:else if value !== null}
                                    {#if typeof value !== 'object'}
                                        <TableHeadCell
                                            {padding}
                                            on:click={() => sort(key)}
                                        >
                                            <div
                                                class="flex flex-row items-center justify-center gap-1"
                                            >
                                                <span class="text-sm"
                                                    >{translate(key)}</span
                                                >
                                                <span class="text-txt-tertiary">
                                                    <!-- <SvgChevronUpDown
                                                    ></SvgChevronUpDown> -->
                                                </span>
                                            </div>
                                        </TableHeadCell>
                                    {:else if typeof value === 'object'}
                                        {#if Object.keys(value)[0] !== '0'}
                                            {#each Object.entries(value) as [objectKey, val]}
                                                <TableHeadCell
                                                    {padding}
                                                    on:click={() =>
                                                        sort(objectKey)}
                                                >
                                                    <div
                                                        class="flex flex-row items-center justify-center gap-1"
                                                    >
                                                        <span class="text-sm"
                                                            >{translate(
                                                                objectKey,
                                                            )}</span
                                                        >
                                                        <span
                                                            class="text-txt-tertiary"
                                                        >
                                                            <!-- <SvgChevronUpDown
                                                            ></SvgChevronUpDown> -->
                                                        </span>
                                                    </div>
                                                </TableHeadCell>
                                            {/each}
                                        {:else if Object.keys(value)[0] === '0'}
                                            <TableHeadCell
                                                {padding}
                                                on:click={() => sort(key)}
                                            >
                                                <div
                                                    class="flex flex-row items-center justify-center gap-1"
                                                >
                                                    <span class="text-sm"
                                                        >{translate(key)}</span
                                                    >
                                                    <span
                                                        class="text-txt-tertiary"
                                                    >
                                                        <!-- <SvgChevronUpDown
                                                        ></SvgChevronUpDown> -->
                                                    </span>
                                                </div>
                                            </TableHeadCell>
                                        {/if}
                                    {/if}
                                {/if}
                            {/if}
                        {/each}
                        {#if editable}
                            <TableHeadCell
                                padding="px-6 py-2 text-center border"
                                class="w-10 max-w-[40px] p-0"
                            ></TableHeadCell>
                        {/if}
                        {#if withActions}
                            <TableHeadCell
                                padding="px-6 py-2 text-center border"
                                class="px-2.5"
                            >
                                <div
                                    class="flex flex-row items-center justify-center gap-1"
                                >
                                    <span class="text-sm"
                                        >{translate('actions')}</span
                                    >
                                </div>
                            </TableHeadCell>
                        {/if}
                    </TableHead>
                    <TableBody>
                        {#each updatedTableItems as item, index}
                            <TableBodyRow>
                                <!-- {#if withRowSelection}
                                    <TableBodyCell
                                        bind:value={selectedItems}
                                        class="whitespace-nowrap border px-3 py-2 text-center text-sm font-medium"
                                    >
                                        {#if selectAdd}
                                            {#if selectedItems.includes(item)}
                                                <IncrementButton
                                                    type="minus"
                                                    onClick={() => {
                                                        passData = item;
                                                        popSelected(item);
                                                        onSelect();
                                                    }}
                                                ></IncrementButton>
                                            {:else}
                                                <IncrementButton
                                                    type="plus"
                                                    onClick={() => {
                                                        passData = item;
                                                        pushSelected(item);
                                                        onSelect();
                                                    }}
                                                ></IncrementButton>
                                            {/if}
                                        {:else}
                                            <IncrementButton
                                                type="minus"
                                                onClick={() => {
                                                    passData = item;
                                                    popSelected(item);
                                                    onSelect();
                                                }}
                                            ></IncrementButton>
                                        {/if}
                                    </TableBodyCell>
                                {/if} -->
                                <!-- {#if hasCheckbox}
                                    <TableBodyCell
                                        {tdClass}
                                        class="w-10 max-w-[40px]"
                                    >
                                        <Checkbox
                                            class="m-0 flex justify-center"
                                            on:click={() => toggleSelect(item)}
                                            bind:checked={item.selected}
                                        />
                                    </TableBodyCell>
                                {/if} -->

                                <TableBodyCell {tdClass}>
                                    {index + 1 + startIndex}
                                </TableBodyCell>
                                {#each Object.entries(item) as [key, value]}
                                    {#if key !== 'selected'}
                                        {#if columnKeys.length > 0}
                                            {#if columnKeys.includes(key)}
                                                {#if value === '' && typeof value !== 'object'}
                                                    <TableBodyCell {tdClass}>
                                                        -
                                                    </TableBodyCell>
                                                {:else if value && value === true && typeof value !== 'object'}
                                                    <TableBodyCell {tdClass}>
                                                        <div
                                                            class="flex w-full items-center justify-center"
                                                        >
                                                            <SvgCheck
                                                            ></SvgCheck>
                                                        </div>
                                                    </TableBodyCell>
                                                {:else if value === false && typeof value !== 'object'}
                                                    <TableBodyCell {tdClass}>
                                                        <div
                                                            class="flex w-full items-center justify-center"
                                                        >
                                                            <SvgXMark
                                                            ></SvgXMark>
                                                        </div>
                                                    </TableBodyCell>
                                                {:else if typeof value === 'object' && value !== null}
                                                    <!-- Check for nested json or array -->
                                                    {#if Object.keys(value)[0] !== '0'}
                                                        <!-- Object -->
                                                        {#each Object.entries(value) as [objectKey, val]}
                                                            <TableBodyCell
                                                                {tdClass}
                                                            >
                                                                {val}
                                                            </TableBodyCell>
                                                        {/each}
                                                    {:else if Object.keys(value)[0] === '0'}
                                                        <!-- Array -->
                                                        <TableBodyCell
                                                            {tdClass}
                                                        >
                                                            {#each value as val}
                                                                <div>
                                                                    {val}
                                                                </div>
                                                            {/each}
                                                        </TableBodyCell>
                                                    {/if}
                                                {:else}
                                                    <TableBodyCell {tdClass}>
                                                        {value}
                                                    </TableBodyCell>
                                                {/if}
                                            {/if}
                                        {:else if value === ''}
                                            <TableBodyCell {tdClass}
                                                >-</TableBodyCell
                                            >
                                        {:else if value === '' && typeof value !== 'object'}
                                            <TableBodyCell {tdClass}
                                                >-</TableBodyCell
                                            >
                                        {:else if value && value === true && typeof value !== 'object'}
                                            <TableBodyCell {tdClass}>
                                                <div
                                                    class="flex w-full items-center justify-center"
                                                >
                                                    <SvgCheck></SvgCheck>
                                                </div>
                                            </TableBodyCell>
                                        {:else if value === false && typeof value !== 'object'}
                                            <TableBodyCell {tdClass}>
                                                <div
                                                    class="flex w-full items-center justify-center"
                                                >
                                                    <SvgXMark></SvgXMark>
                                                </div>
                                            </TableBodyCell>
                                        {:else if typeof value === 'object' && value != null}
                                            <!-- Check for nested json or array -->
                                            {#if Object.keys(value)[0] !== '0'}
                                                <!-- Object -->
                                                {#each Object.entries(value) as [objectKey, val]}
                                                    <TableBodyCell {tdClass}>
                                                        {val}
                                                    </TableBodyCell>
                                                {/each}
                                            {:else if Object.keys(value)[0] === '0'}
                                                <!-- Array -->
                                                <TableBodyCell {tdClass}>
                                                    {#each value as val}
                                                        <div>
                                                            {val}
                                                        </div>
                                                    {/each}
                                                </TableBodyCell>
                                            {/if}
                                        {:else}
                                            <TableBodyCell {tdClass}>
                                                {value}
                                            </TableBodyCell>
                                        {/if}
                                    {/if}
                                {/each}
                                <!-- {#if editable}
                                    <TableBodyCell
                                        bind:value={passData}
                                        tdClass="p-2 cursor-pointer text-sm whitespace-nowrap font-medium text-center border"
                                    >
                                        <IconButton
                                            onClick={() => {
                                                passData = item;
                                                onEditClick();
                                            }}><SvgEdit></SvgEdit></IconButton
                                        >
                                    </TableBodyCell>
                                {/if}
                                {#if withActions}
                                    <TableBodyCell
                                        bind:value={passData}
                                        tdClass="p-2 cursor-pointer text-sm whitespace-nowrap font-medium text-center border"
                                    >
                                        <div
                                            class="flex h-full flex-row items-center justify-center"
                                        >
                                            {#if actionOptions.includes('detail')}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = item;
                                                        detailActions();
                                                    }}
                                                >
                                                    <SvgEllipsisCircle
                                                    ></SvgEllipsisCircle>
                                                </IconButton>
                                                <Tooltip
                                                    class="px-2 py-1 text-sm font-normal text-txt-blend"
                                                >
                                                    Butiran
                                                </Tooltip>
                                            {/if}

                                            {#if actionOptions.includes('edit')}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = item;
                                                        editActions();
                                                    }}
                                                    ><SvgEdit></SvgEdit>
                                                </IconButton>
                                                <Tooltip
                                                    class="px-2 py-1 text-sm font-normal text-txt-blend"
                                                >
                                                    Kemaskini
                                                </Tooltip>
                                            {/if}

                                            {#if actionOptions.includes('delete')}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = item;
                                                        deleteActions();
                                                    }}
                                                >
                                                    <SvgTrash></SvgTrash>
                                                </IconButton>
                                                <Tooltip
                                                    class="px-2 py-1 text-sm font-normal text-txt-blend"
                                                >
                                                    Hapus
                                                </Tooltip>
                                            {/if}

                                            {#if actionOptions.includes('print')}
                                                <IconButton
                                                    onClick={() => {
                                                        passData = item;
                                                        printActions();
                                                    }}
                                                >
                                                    <SvgPrinter></SvgPrinter>
                                                </IconButton>
                                                <Tooltip
                                                    class="px-2 py-1 text-sm font-normal text-txt-blend"
                                                >
                                                    Cetak
                                                </Tooltip>
                                            {/if}
                                        </div>
                                    </TableBodyCell>
                                {/if} -->
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                {:else}
                    <!-- <div class="flex items-center justify-start px-6 py-2">
                        <h1>No Items</h1>
                    </div> -->

                    <TableHead>
                        <TableHeadCell {padding}>
                            <div
                                class="flex flex-row items-center justify-center gap-1"
                            >
                                <span class="text-sm">Tiada Rekod</span>
                            </div>
                        </TableHeadCell>
                    </TableHead>
                {/if}
            </Table>
        </div>
    </div>
</div>
