<script lang="ts">
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';

    const columnLabel = [
        { name: 'Sangat Rendah' },
        { name: 'Rendah' },
        { name: 'Sederhana' },
        { name: 'Tinggi' },
        { name: 'Sangat Tinggi' },
    ];
    const columnValue: RadioDTO[] = [
        { name: '1', value: 1 },
        { name: '2', value: 2 },
        { name: '3', value: 3 },
        { name: '4', value: 4 },
        { name: '5', value: 5 },
        { name: '6', value: 6 },
        { name: '7', value: 7 },
        { name: '8', value: 8 },
        { name: '9', value: 9 },
        { name: '10', value: 10 },
    ];

    export let scaleLabel = [
        { name: 'Ilmu Pengetahuan Dan Kemahiran Dalam Bidang Kerja' },
        { name: 'Kuantiti Hasil Kerja' },
        { name: 'Kualiti Hasil Kerja' },
        { name: 'Penganalisan' },
        { name: 'Nilai Tambah' },
    ];

    //scaling title
    export let title: string = "Skala Penilaian Pengetahuan, Kemahiran dan Penghasilan Kerja"
    
    //total scaling value
    export let totalVal: number;

    //label for total scaling value
    export let totalLabel: string = "Jumlah Markah Aspek A ( /50)"
    let eachVal: number[] = [];
    $: {
        totalVal = eachVal.reduce((acc, curr) => acc + curr, 0);
    }
</script>

<div class="flex h-full max-h-full w-full flex-col gap-10 rounded-md">
    <table class="table max-h-full w-full table-auto border-collapse">
        <thead class="sticky top-0 z-[1]">
            <tr
                class="h-7 min-h-7 bg-ios-systemColors-quaternarySystemFill-light"
            >
                <th
                    colSpan={10}
                    class="h-full w-10 border border-ios-labelColors-separator-light px-2.5"
                >
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span
                            class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >
                            {title}
                        </span>
                    </div>
                </th>
            </tr>

            <tr
                class="h-7 min-h-7 bg-ios-systemColors-quaternarySystemFill-light"
            >
                {#each columnLabel as col}
                    <th
                        colSpan={2}
                        class="h-full w-10 border border-ios-labelColors-separator-light px-2.5"
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
            </tr>
        </thead>
        <!-- body -->
        <tbody>
            <tr
                class=" h-10 border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light"
            >
                {#each columnValue as colVal}
                    <td
                        class="h-full border border-ios-labelColors-separator-light px-2.5 text-center"
                    >
                        <span
                            class="relative text-center align-middle text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                            >{colVal.name}
                        </span>
                    </td>
                {/each}
            </tr>
        </tbody>
    </table>

    <div class="flex w-full flex-col items-center justify-center">
        {#each scaleLabel as eachLabel, i}
            <CustomRadioField
                label={eachLabel.name}
                options={columnValue}
                bind:val={eachVal[i]}
            />
        {/each}

        <div class="item-start flex w-full flex-row justify-start gap-3">
            <span
                class="select-none align-middle text-base font-medium text-ios-labelColors-secondaryLabel-light"
                >{totalLabel} :</span
            >
            <span
                class="select-none align-middle text-base font-medium text-ios-labelColors-secondaryLabel-light"
                >{totalVal}</span
            >
        </div>
    </div>
</div>
