<script lang="ts">
    import { translate } from '$lib/config/dictionary';
    import { object } from 'zod';

    interface treatmentDTO {
        name: string;
    }

    interface dataDTO {
        [key: string]: string | number | treatmentDTO[]; // Define an index signature
    }

    let mockData: dataDTO[] = [
        {
            patientName: 'Ali bin Abu',
            identityCardNumber: '881110127781',
            treatment: [{ name: 'Demam' }, { name: 'Selsema' }],
            relationship: 'Abang',
            total: 500,
        },
        {
            patientName: 'Anak Dia',
            identityCardNumber: '881110127781',
            treatment: [{ name: 'Kencing Manis' }],
            relationship: 'Anak',
            total: 1000,
        },
    ];

    // export let title = 'Title';

    // export let footer: string = 'Jumlah Bayaran';

    //find rowspan
    // let rowSpan: number = 2;
    // mockData.forEach((data) => {
    //     for (const key in data) {
    //         if (data.hasOwnProperty(key)) {
    //             const value = data[key];
    //             if (Array.isArray(value)) {
    //                 console.log(
    //                     `Property ${key} is an array with length: ${value.length}`,
    //                     //add rowspan here
    //                 );
                    
    //             }
    //         }
    //     }
    // });

</script>

<div class="flex h-full max-h-full w-full flex-col p-5">
    <table class="table max-h-full w-full table-fixed">
        <!-- header -->
        <thead class="sticky top-0 z-[1]">
            <tr class="h-7 min-h-7 w-full">
                <th
                    class="h-full w-[20px] rounded-md border border-ios-basic-darkBackgroundGray"
                >
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span
                            class="select-none text-center align-middle text-sm font-medium text-ios-systemColors-systemGrey5-dark"
                        >
                            Bil.
                        </span>
                    </div>
                </th>
                {#each mockData as item, i}
                    {#if i == 0}
                        {#each Object.keys(item) as value}
                            <th
                                class="h-full w-[90px] rounded-md border border-ios-basic-darkBackgroundGray p-2.5"
                            >
                                <div
                                    class="flex h-full flex-row items-center justify-center"
                                >
                                    <span
                                        class="select-none text-center align-middle text-sm font-medium text-ios-systemColors-systemGrey5-dark"
                                    >
                                        {translate(value)}
                                    </span>
                                </div>
                            </th>
                        {/each}
                    {/if}
                {/each}
            </tr>
        </thead>

        <!-- body -->
        <tbody>
            <!-- display each data -->
            {#if mockData.length > 0}
                {#each mockData as val, i}
                    <!-- Check if value is empty, remove the row from displaying -->
                    <tr>
                        <td
                            class="h-full border border-ios-basic-darkBackgroundGray"
                        >
                            <div
                                class="flex h-8 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                            >
                                <span>{i + 1}</span>
                            </div>
                        </td>
                        {#each Object.values(val) as value}
                            {#if typeof value == 'object'}
                                <td
                                    class="h-full border border-ios-basic-darkBackgroundGray "
                                >
                                    {#each Object.values(value) as eachItem, index}
                                        <div
                                            class="flex h-8 items-center justify-center text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                                        >
                                            <span>{index+1}. {eachItem.name}</span>
                                        </div>
                                    {/each}
                                </td>
                            {:else}
                                <td
                                    class="h-full border border-ios-basic-darkBackgroundGray"
                                >
                                    <div
                                        class="flex h-8 items-center justify-center text-sm font-normal text-ios-systemColors-systemGrey5-dark"
                                    >
                                        <span>{value}</span>
                                    </div>
                                </td>
                            {/if}
                        {/each}
                    </tr>
                {/each}
            {/if}
        </tbody>
    </table>
</div>
