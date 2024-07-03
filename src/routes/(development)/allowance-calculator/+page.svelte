<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';

    interface dataDTO {
        [key: string]: any; // Define an index signature
        // [key: string]: string | number | string[] | number[] | { [key: string]: any } | any[];
    }

    let mock: dataDTO = {
        overallTotal: 212.3,
        recordId: 1,
        list: [
            {
                tempoh: 'Disember 2023',
                totalOfMonth: 121.8,
                details: [
                    {
                        jenis: 'ITP',
                        jumlahPotongan: 41.5,
                        item: [
                            {
                                name: 'ITP 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                            {
                                name: 'ITP 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                            {
                                name: 'ITP 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                        ],
                    },
                    {
                        jenis: 'ITKA',
                        jumlahPotongan: 43.5,
                        item: [
                            {
                                name: 'ITKA 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                            {
                                name: 'ITKA 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                        ],
                    },
                ],
            },
            {
                tempoh: 'November 2023',
                totalOfMonth: 121.8,
                details: [
                    {
                        jenis: 'ITP',
                        jumlahPotongan: 41.5,
                        item: [
                            {
                                name: 'ITP 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                            {
                                name: 'ITP 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                        ],
                    },
                    {
                        jenis: 'ITKA',
                        jumlahPotongan: 43.5,
                        item: [
                            {
                                name: 'ITKA 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                            {
                                name: 'ITKA 15*75.00/31',
                                sepatutBayar: 121.0,
                            },
                        ],
                    },
                ],
            },
        ],
    };

    let lengthOfJumlah: number[] = [];
    let lengthOfTempoh: number[] = [];
    let overallSize: number = 0;

    mock.list.map((x: dataDTO, grandIndex: number) => {
        let tempData = 0;
        console.log(x); //grandIndex (to be used for adding)

        x.details.forEach((s: dataDTO, parentIndex: number) => {
            console.log(s, 'parentIndex:', parentIndex); //parentIndex (to be used for adding)
            tempData += s.item.length
            lengthOfJumlah.push(s.item.length)
            s.item.map((f: dataDTO, childIndex: number) => {
                console.log(f, 'childIndex:', childIndex); //childIndex (to be used for adding)
            });
        });
        lengthOfTempoh.push(tempData)
    });
    
    lengthOfTempoh.map((x) => {
        overallSize += x;
    })


        console.log("rowspan of overall: ", overallSize)
        console.log("rowspan of each tempoh: ", lengthOfTempoh)
        console.log("rowspan of each jenis/jumlah: ",lengthOfJumlah)
    

    // export let columnLabel = [{ name: 'Perkara' }, { name: 'Jumlah (RM)' }];
    export let title = 'Title';
    export let rowData: dataDTO[] = [];
    export let singleRowData: dataDTO = {
        label: '',
        total: 0,
    };
    // export let footer: string = 'Jumlah Bayaran';
    export let total: number = 0;

    function removeRow(i: number) {
        rowData.splice(i, 1);

        rowData = [...rowData];
    }

    function addRow() {
        //insert new entered input
        rowData.push({ ...singleRowData });
        rowData = [...rowData];

        //reset input after add
        for (const key in singleRowData) {
            if (typeof singleRowData[key] === 'string') {
                singleRowData[key] = '';
            } else if (typeof singleRowData[key] === 'number') {
                singleRowData[key] = 0;
            }
            // other data type here
        }
        return total;
    }

    $: {
        //calculate total
        total = rowData.reduce((sum, obj) => {
            for (const key in obj) {
                if (typeof obj[key] === 'number') {
                    sum += obj[key] as number;
                }
            }
            return sum;
        }, 0);
    }
</script>

<div class="flex h-full max-h-full w-full flex-col rounded-md border py-3">
    <span class="text-md text-ios-activeColors-activeBlue-dark">{title}</span>
    <table class="table max-h-full w-full table-fixed border-none">
        <!-- header -->
        <thead class="sticky top-0 z-[1]">
            <tr class="h-7 min-h-7 w-full">
                {#each mock.list as col, i}
                {#each Object.keys(col) as value }
                    <th
                        class="h-full {i == 0 ? 'w-[90px]' : 'w-[30px]'} px-2.5"
                    >
                        <div
                            class="flex h-full flex-row items-center justify-center"
                        >
                            <span
                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >
                                {value}
                            </span>
                        </div>
                    </th>
                    {/each}
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
                    <!-- Check if value is empty, remove the row from displaying -->
                    <tr class="h-10">
                        {#each Object.values(val) as value, iy}
                            <td class="h-full px-2.5 text-center">
                                <div
                                    class="flex h-8 items-center justify-center rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                >
                                    <span>{value}</span>
                                </div>
                            </td>
                        {/each}
                        <td class="h-full px-2.5">
                            <div class="flex h-full flex-row items-center">
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
                        {:else}
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
                    <div class="flex h-full flex-row items-center">
                        <TextIconButton
                            label=""
                            icon="add"
                            onClick={() => addRow()}
                        />
                    </div>
                </td>
                <!-- {/each} -->
            </tr>
        </tbody>
    </table>
</div>
