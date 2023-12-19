<!-- How to use this component -->
<!-- u can change the div height accordingly -->
<!-- 
    <div class="flex h-[300px] w-full flex-col items-center justify-start p-2.5">
        <CustomTable tableItems={data}></CustomTable>
    </div>
 -->

<script lang="ts">
    import { afterUpdate } from 'svelte';
    import SvgEllipsisVertical from './../../assets/svg/SvgEllipsisVertical.svelte';
    import { page, updated } from '$app/stores';
    import {
        Checkbox,
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        TableSearch,
        PaginationItem,
        Select,
        Button,
        Dropdown,
        DropdownItem,
        Search,
    } from 'flowbite-svelte';
    import SvgChevronUpDown from '$lib/assets/svg/SvgChevronUpDown.svelte';
    import TabContent from '../tabs/TabContent.svelte';

    let currentURL = $page.url.pathname;
    let tableItem = {};
    export let tableItems: Record<string, any>[] = [tableItem];
    export let checkedItems: Record<string, any>[] = [];
    export let excludeCol: string[] = [];
    tableItems = removeCols(tableItems, excludeCol);
    export let hasCheckbox: boolean = false;
    export let detailPath: string = '';
    let checkAll = false;
    let searchTerm = '';
    let sortColumn = '';

    // afterUpdate (() =>{
    //     console.log(tableItems)
    // })

    function removeCols(para: Record<string, any>[], keys: string[]) {
        let data: Record<string, any>[] = para;

        data.forEach((element) => {
            keys.forEach((item) => {
                delete element[item];
            });
        });

        // para.forEach((element) => {
        //     const { [excludeCol[0]]: _, ...newObj } = element;

        //     data.push(newObj);
        // });
        return data;
    }

    function sortTable(columnName: string) {
        if (sortColumn === columnName) {
            // If the same column is clicked again, reverse the sorting order
            tableItems = [...tableItems].reverse();
        } else {
            // Sort the table by the selected column
            tableItems = [...tableItems].sort((a, b) => {
                if (a[columnName] < b[columnName]) {
                    return -1;
                }
                if (a[columnName] > b[columnName]) {
                    return 1;
                }
                return 0;
            });
        }
        sortColumn = columnName;
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
    function toggleSelect(item: Record<string, any>) {
        item.selected = !item.selected;
        checkAll = updatedTableItems.every((i) => i.selected);
        checkedItems = tableItems.filter((i) => i.selected);
    }


    $: filteredItems = tableItems.filter((item) => {
        const values = Object.values(item);
        const searchTermLower = searchTerm.toLowerCase();

        // Check if any value in the item matches the search term
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

    $: pages = Array.from(
        { length: Math.ceil(filteredItems.length / itemsPerPage) },
        (_, index) => ({ name: (index + 1).toString() }),
        (lastPage = Math.ceil(filteredItems.length / itemsPerPage)),
    );

    const previous = () => {
        currentPage--;
    };
    const next = () => {
        currentPage++;
    };
    function pageClick(pageNo: number) {
        currentPage = pageNo;
    }

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
    let searchClass: string = 'fixed right-2.5';
    let innerDivClass: string = 'py-2.5 p-0 mb-8';
    let paginationBtnClass: string =
        'border bg-white px-2 py-0 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
</script>

<div
    class="flex h-full max-h-full w-full flex-col justify-start overflow-x-hidden"
>
    <!-- table-control -->
    <div
        class="flex h-fit w-full flex-wrap items-center justify-between gap-2.5 py-2.5"
    >
        <!-- leading -->
        <div class="flex flex-row items-center justify-start gap-2.5">
            <input
                bind:value={searchTerm}
                placeholder="Cari dengan kata kunci"
                class="flex h-[28px] w-[250px] items-end justify-end rounded-[3px] border border-bdr-primary px-2 text-sm placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 active:border disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
            />
        </div>

        <!-- trailing -->
        <div class="flex flex-wrap items-center justify-start gap-2.5">
            <div
                class=" flex h-[28px] flex-col items-center justify-center rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 focus:outline-none focus:ring-0"
            >
                <span class="text-sm text-txt-secondary">
                    {startIndex + 1} - {endIndex} / {filteredItems.length}
                </span>
            </div>
            <Button
                disabled={currentPage === 1 || tableItems.length === 0}
                class="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary focus:outline-none focus:ring-0"
                on:click={previous}>Previous</Button
            >
            {#if currentPage > 3}
                <PaginationItem
                    normalClass="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary"
                    on:click={() => {
                        pageClick(1);
                    }}>1</PaginationItem
                >
                ...
            {/if}
            {#each pages as pages, i}
                {#if i > currentPage - 4 && i < currentPage + 2}
                    {#if currentPage === i + 1}
                        <PaginationItem
                            normalClass="h-[28px] rounded-[3px] border border-bdr-primary  px-2.5 text-sm text-txt-secondary bg-bgr-tertiary"
                            on:click={() => {
                                pageClick(i + 1);
                            }}>{pages.name}</PaginationItem
                        >
                    {:else}
                        <PaginationItem
                            normalClass="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary"
                            on:click={() => {
                                pageClick(i + 1);
                            }}>{pages.name}</PaginationItem
                        >
                    {/if}
                {/if}
            {/each}
            {#if lastPage > currentPage + 2}
                ...
                <PaginationItem
                    normalClass="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary"
                    on:click={() => {
                        pageClick(lastPage);
                    }}>{lastPage}</PaginationItem
                >
            {/if}
            <Button
                disabled={currentPage === lastPage || tableItems.length === 0}
                class="h-[28px] rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 text-sm text-txt-secondary hover:bg-bgr-tertiary focus:outline-none focus:ring-0"
                on:click={next}>Next</Button
            >
            <Select
                placeholder=""
                class="block h-[28px] w-fit cursor-pointer rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-secondary hover:bg-bgr-tertiary focus:border-system-primary focus:outline-none focus:ring-0 disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                items={itemsPerPageSelect}
                bind:value={selected}
                on:change={() => {
                    itemsPerPage = selected;
                    currentPage = 1;
                }}
            />
        </div>
    </div>

    <!-- table -->
    <div
        class="h-full max-h-full w-full overflow-x-auto overflow-y-auto"
    >
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
                            padding = 'px-6 py-2 border text-center'
                            class="w-10 max-w-[40px] p-0"
                        >
                            <div
                                class="flex flex-row items-center justify-center gap-1"
                            >
                                <span class="text-sm">Bil.</span>
                            </div>
                        </TableHeadCell>
                        {#each Object.keys(updatedTableItems[0]) as key}
                            {#if key !== 'selected'}
                                <TableHeadCell
                                    {padding}
                                    on:click={() => sortTable(key)}
                                >
                                    <div
                                        class="flex flex-row items-center justify-center gap-1"
                                    >
                                        <span class="text-sm"
                                            >{key
                                                .replace(/([A-Z])/g, ' $1')
                                                .trim()
                                                .replace(/\b\w/g, (c) =>
                                                    c.toUpperCase(),
                                                )}</span
                                        >
                                        <span class="text-txt-tertiary">
                                            <SvgChevronUpDown
                                            ></SvgChevronUpDown>
                                        </span>
                                    </div>
                                </TableHeadCell>
                            {/if}
                        {/each}
                        {#if detailPath !== ''}
                            <TableHeadCell
                                padding="px-6 py-2 text-center border"
                                class="w-10 max-w-[40px] p-0"
                            ></TableHeadCell>
                        {/if}
                    </TableHead>
                    <TableBody>
                        {#each updatedTableItems as item, index}
                            <TableBodyRow>
                                {#if hasCheckbox}
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
                                {/if}

                                <TableBodyCell {tdClass}>
                                    {index + 1 + startIndex}
                                </TableBodyCell>
                                {#each Object.entries(item) as [key, value]}
                                    {#if key !== 'selected'}
                                        <TableBodyCell {tdClass}
                                            >{value}</TableBodyCell
                                        >
                                    {/if}
                                {/each}
                                {#if detailPath !== ''}
                                    <TableBodyCell
                                        tdClass="p-2 cursor-pointer text-sm whitespace-nowrap font-medium text-center border"
                                        ><SvgEllipsisVertical /></TableBodyCell
                                    >
                                    <Dropdown placement="left" class="p-0">
                                        <DropdownItem
                                            defaultClass="font-medium py-2 rounded-lg px-4 text-sm hover:bg-bgr-secondary"
                                            href={'/' + detailPath}
                                            >Lihat Butiran</DropdownItem
                                        >
                                    </Dropdown>
                                {/if}
                            </TableBodyRow>
                        {/each}
                    </TableBody>
                {:else}
                    <div class="flex items-center justify-start px-6 py-2">
                        <h1>No Items</h1>
                    </div>
                {/if}
            </Table>
        </div>
    </div>
</div>
