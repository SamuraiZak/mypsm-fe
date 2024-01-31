<script lang="ts">
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from 'flowbite-svelte';
    import IconButton from '../buttons/IconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';

    export let sampleData: any = {};

    let data: any[] = [{ ...sampleData }];

    export let passData = data;

    function addRow() {
        let newData = {
            ...sampleData,
        };

        data = [...data, newData];
    }

    function deleteRow(rowToBeDeleted: any) {
        if (data.length == 1) {
            data = data.filter((row) => row != rowToBeDeleted);

            let newData = {
                ...sampleData,
            };

            data = [...data, newData];
        } else {
            data = data.filter((row) => row != rowToBeDeleted);
        }
    }
</script>

<div class="w-full overflow-x-auto p-2.5">
    <table
        class="w-full border-collapse border border-slate-400 text-left text-sm text-txt-primary"
    >
        <thead class="text-xs h-[40px] min-h-[40px] uppercase text-txt-primary">
            <tr class="h-[40px] min-h-[40px]">
                {#each Object.entries(data[0]) as [key, value]}
                    <th
                        scope="col"
                        class="min-w-[300px] border border-slate-400 p-2.5 font-bold text-gray-900"
                    >
                        <p class="text-sm text-txt-secondary">{key}</p>
                    </th>
                {/each}

                <th
                    scope="row"
                    class="w-[40px] min-w-[40px] border border-slate-400 font-medium text-gray-900"
                >
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <IconButton
                            onClick={() => {
                                addRow();
                            }}
                        >
                            <SvgPlus></SvgPlus>
                        </IconButton>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each data as item, index}
                <tr class="border-b">
                    {#each Object.entries(item) as [key, val], i}
                        <!-- <td
                            bind:value={passData}
                            class="min-w-[300px] cursor-text border border-slate-400 p-2.5 font-medium text-gray-900 focus:border-system-primary focus:outline-none focus:ring-0"
                        >
                            {#if typeof val == 'string'}
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder={key}
                                    bind:value={item[key]}
                                />
                            {:else}
                                <input
                                    type="number"
                                    name=""
                                    id=""
                                    placeholder={key}
                                    bind:value={item[key]}
                                />
                            {/if}
                        </td> -->

                        <TableBodyCell
                            bind:value={passData}
                            tdClass="px-6 py-2 text-sm whitespace-nowrap font-medium text-center border"
                        >
                            {#if typeof val == 'string'}
                                <input
                                    class="text-base text-txt-primary"
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder={key}
                                    bind:value={item[key]}
                                />
                            {:else}
                                <input
                                    class="text-base text-txt-primary"
                                    type="number"
                                    name=""
                                    id=""
                                    placeholder={key}
                                    bind:value={item[key]}
                                />
                            {/if}
                        </TableBodyCell>
                    {/each}

                    <th
                        scope="row"
                        class="w-[40px] min-w-[40px] border border-slate-400 font-medium text-gray-900"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <IconButton
                                onClick={() => {
                                    deleteRow(item);
                                }}
                            >
                                <SvgXMark></SvgXMark>
                            </IconButton>
                        </div>
                    </th>
                </tr>
            {/each}
        </tbody>
    </table>
    <button
        on:click={() => {
        }}
    >
        show
    </button>
</div>
