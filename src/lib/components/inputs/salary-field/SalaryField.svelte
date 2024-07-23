<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { SalaryDetail } from '$lib/dto/mypsm/gaji/gaji-akhir/final-salary-detail.dto';
    import { Alert, Modal } from 'flowbite-svelte';

    interface dataDTO {
        [key: string]: string | number; // Define an index signature
    }

    export let columnLabel = [{ name: 'Perkara' }, { name: 'Jumlah (RM)' }];
    export let title = 'Title';
    export let rowData: SalaryDetail[] = [];
    export let disabled: boolean = false;
    export let singleRowData: SalaryDetail = {
        decription: '',
        amount: 0,
    };
    export let footer: string = 'Jumlah Bayaran';
    export let total: number = 0;
    let emptyForm: boolean = false;
    function removeRow(i: number) {
        rowData.splice(i, 1);

        rowData = [...rowData];
    }

    function addRow() {
        if (singleRowData.decription == '') {
            return;
        }
        //insert new entered input
        rowData.push({ ...singleRowData });
        rowData = [...rowData];

        //reset input after add
        // for (const key in singleRowData) {
        //     if (typeof singleRowData[key] === 'string') {
        //         singleRowData[key] = '';
        //     } else if (typeof singleRowData[key] === 'number') {
        //         singleRowData[key] = 0;
        //     }
        //     // other data type here
        // }

        singleRowData.decription = '';
        singleRowData.amount = 0;

        return total;
    }

    $: {
        //calculate total
        total = rowData.reduce((sum, obj) => {
            // for (const key in obj) {
            //     if (typeof obj[key] === 'number') {
            //         sum += obj[key] as number;
            //     }
            // }
            sum += obj.amount;

            return sum;
        }, 0);
    }

</script>

<div
    class="flex h-full max-h-full w-full flex-col gap-5 rounded-md border py-3"
>
    <span
        class="pl-3 text-sm font-semibold text-ios-activeColors-activeBlue-dark"
        >{title}</span
    >
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
                        <div class="flex h-full flex-row items-center">
                            <span
                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                            >
                                {col.name}
                            </span>
                        </div>
                    </th>
                {/each}
                {#if !disabled}
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
                {/if}
            </tr>
        </thead>

        <!-- body -->
        <tbody>
            <!-- display each data -->
            {#if rowData.length > 0}
                {#each rowData as val, i}
                    <!-- Check if value is empty, remove the row from displaying -->
                    <tr class="h-10">
                        <td class="h-full px-2.5 text-right">
                            <span
                                class="relative text-center align-middle text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                >{i + 1}
                            </span>
                        </td>
                        {#each Object.values(val) as value}
                            <td class="h-full px-2.5 text-center">
                                <div
                                    class="flex h-8 items-center rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light px-3 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                >
                                    <span>{value}</span>
                                </div>
                            </td>
                        {/each}
                        {#if !disabled}
                        <td class="h-full px-2.5">
                            <div class="flex h-full flex-row items-center justify-center">
                                <TextIconButton
                                    label=""
                                    icon="delete"
                                    type="danger"
                                    onClick={() => removeRow(i)}
                                />
                            </div>
                        </td>
                        {/if}
                    </tr>
                {/each}
            {/if}

            {#if !disabled}
            <!-- enter input here -->
            <tr class=" h-10">
                <td class="h-full px-2.5 text-left"> </td>
                <td class="h-full px-2.5 text-left">
                    <input
                        class="autofill:hide-default-inner-shadow text-ios-labelColors-secondaryLabel-light' block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light
                                p-2 text-sm focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                        type="text"
                        id="decription"
                        bind:value={singleRowData.decription}
                    />
                </td>
                <td class="h-full px-2.5 text-left">
                    <input
                        class="autofill:hide-default-inner-shadow text-ios-labelColors-secondaryLabel-light' block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light p-2
                         text-left text-sm [appearance:textfield] focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        type="number"
                        id="amount"
                        bind:value={singleRowData.amount}
                    />
                </td>

                <td class="h-full px-2.5 text-center">
                    <div class="flex h-full flex-row items-center justify-center">
                        <TextIconButton
                            label=""
                            icon="add"
                            onClick={() => {
                                if (singleRowData.decription !== '') {
                                    addRow();
                                } else {
                                    emptyForm = true;
                                }
                            }}
                        />
                    </div>
                </td>
                <!-- {/each} -->
            </tr>
            {/if}

            <tr>
                {#each columnLabel as _}
                    <td></td>
                {/each}
                <td class="h-full px-2.5 text-center">
                    <div
                        class="flex h-8 items-center text-base font-normal text-ios-labelColors-secondaryLabel-light"
                    >
                        <span>{footer} (RM): {total.toFixed(2)}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<Modal bind:open={emptyForm} title="Sistem MyPSM" size="sm" dismissable={false}>
    <Alert color="red">
        <p>
            <span class="font-medium">Ralat! </span>
            Pastikan maklumat-maklumat yang ditambah telah diisi dengan lengkap.
        </p>
    </Alert>
    <div class="flex w-full justify-center">
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="previous"
            onClick={() => (emptyForm = false)}
        />
    </div>
</Modal>
