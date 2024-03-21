<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';

    interface dataDTO {
        [key: string]: string | number; // Define an index signature
    }

    export let columnLabel = [
        { name: 'Elaun' },
        { name: 'Tempoh Tahun Perkhidmatan' },
        { name: 'Amaun Semasa (RM)' },
        { name: 'Jumlah Hari Pada Bulan Pencen' },
        { name: 'Jumlah (RM)' },
    ];
    export let rowData: dataDTO[] = [];
    export let singleRowData: dataDTO = {
        label: '',
        yearOfServices: 0,
        currentAmount: 0,
        dayOnPension: 0,
        total: 0,
    };

    export let total: number = 0;

    function removeRow(i: number) {
        rowData.splice(i, 1);

        rowData = [...rowData];

        total = addRow();
    }

    function addRow() {
        //insert new entered input
        rowData.push({ ...singleRowData });
        rowData = [...rowData];

        //calculate total
        total = rowData.reduce((sum, obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'number') {
                    sum += obj[key] as number;
                }
            }
            return sum;
        }, 0);

        //reset input
        for (const key in singleRowData) {
            if (typeof singleRowData[key] === 'string') {
                singleRowData[key] = '';
            } else if (typeof singleRowData[key] === 'number') {
                singleRowData[key] = 0;
            }
            // other data here
        }
        return total;
    }
</script>

<div class="flex h-full max-h-full w-full flex-col gap-10 rounded-md py-5">
    <table class="table max-h-full w-full table-fixed border-none">
        <!-- header -->
        <thead class="sticky top-0 z-[1]">
            <tr class="h-7 min-h-7 w-full">
                <th class="h-full w-[5px]">
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span
                            class="align-right select-none text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >
                        </span>
                    </div>
                </th>
                {#each columnLabel as col, i}
                    <th
                        class="h-full {i == 0 ? 'w-[90px]' : 'w-[30px]'} px-2.5"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span
                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >
                                {col.name}
                            </span>
                        </div>
                    </th>
                {/each}
                <th class="h-full w-[20px] px-2.5">
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span
                            class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >
                        </span>
                    </div>
                </th>
            </tr>
        </thead>

        <!-- body -->
        <tbody>
            <!-- display each data -->
            {#if rowData.length > 0}
                {#each rowData as val, i}
                    <tr class=" h-10">
                        <td class="h-full px-2.5 text-right">
                            <span
                                class="relative text-center align-middle text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                >{i + 1}
                            </span>
                        </td>
                        {#each Object.values(val) as value, i}
                            <td class="h-full px-2.5 text-center">
                                <div
                                    class="flex h-8 items-center justify-center rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                >
                                    <span class="">{value} </span>
                                </div>
                            </td>
                        {/each}
                        <td class="h-full px-2.5 text-center">
                            <div
                                class="flex h-full flex-row items-center justify-center"
                            >
                                <TextIconButton
                                    label=""
                                    icon="cancel"
                                    type="danger"
                                    onClick={() => removeRow(i)}
                                />
                            </div>
                        </td>
                    </tr>
                {/each}
            {/if}

            <!-- enter input here -->
            <tr class=" h-10">
                <td class="h-full px-2.5 text-center"> </td>
                {#each Object.keys(singleRowData) as key, i}
                    <td class="h-full px-2.5 text-center">
                        {#if typeof singleRowData[key] === 'string'}
                            <input
                                class="autofill:hide-default-inner-shadow text-ios-labelColors-secondaryLabel-light' block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light
                                p-2 text-sm focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                                type="text"
                                id={key}
                                bind:value={singleRowData[key]}
                            />
                        {:else if typeof singleRowData[key] === 'number'}
                            <input
                                class="autofill:hide-default-inner-shadow text-ios-labelColors-secondaryLabel-light' block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2
                                     text-center text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                type="number"
                                id={key}
                                bind:value={singleRowData[key]}
                            />
                        {/if}
                    </td>
                {/each}

                <td class="h-full px-2.5 text-center">
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <TextIconButton
                            label=""
                            icon="add"
                            onClick={() => addRow()}
                        />
                    </div>
                </td>
                <!-- {/each} -->
            </tr>
            <tr>
                {#each columnLabel as _,i}
                    <td></td>
                {/each}
                <td class="h-full px-2.5 text-center">
                    <div
                        class="flex h-8 items-center justify-center text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                    >
                        <span class="">Jumlah Keseluruhan: {total}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
