<script lang="ts">
    import GridInput from '$lib/components/inputs/grid-input/GridInput.svelte';
    import type {
        Misc,
        Payment,
        Period,
        PerkiraanGajiTest,
    } from './gaji_test.dto';

    let testData: PerkiraanGajiTest = {
        total: 341.13,
        period: [
            {
                month: 'DISEMBER 2022',
                total: 116.13,
                payment: [
                    {
                        type: 'ITP',
                        paid: 75.0,
                        total: 116.13,
                        misc: [
                            {
                                item: 'ITP (15*75.00/31)',
                                amount: 36.29,
                            },
                            {
                                item: 'ITP (16*300.00/31)',
                                amount: 154.84,
                            },
                        ],
                    },
                ],
            },
            {
                month: 'JANUARI 2023',
                total: 225.0,
                payment: [
                    {
                        type: 'ITP',
                        paid: 75.0,
                        total: 75.0,
                        misc: [
                            {
                                item: 'ITP',
                                amount: 300.0,
                            },
                        ],
                    },
                ],
            },
        ],
    };

    $: mockData = testData;

    function addPeriod() {
        let newPeriod: Period = {
            month: '',
            total: 0.0,
            payment: [
                {
                    type: '',
                    total: 0.0,
                    paid: 0.0,
                    misc: [
                        {
                            item: '',
                            amount: 0.0,
                        },
                    ],
                },
            ],
        };

        testData.period.push(newPeriod);
        testData = testData;
    }

    function removePeriod(index: number) {
        testData.period.splice(index, 1);

        if (testData.period.length == 0) {
            addPeriod();
        }
        testData = testData;
    }

    function addPayment(period: Period) {
        let newPayment: Payment = {
            type: '',
            paid: 0.0,
            total: 0.0,
            misc: [
                {
                    item: '',
                    amount: 0.0,
                },
            ],
        };

        period.payment.push(newPayment);

        testData = testData;
    }

    function removePayment(period: Period, index: number) {
        period.payment.splice(index, 1);

        if (period.payment.length == 0) {
            addPayment(period);
        }
        testData = testData;
    }

    function addMisc(payment: Payment) {
        let newMisc: Misc = {
            item: '',
            amount: 0.0,
        };

        payment.misc.push(newMisc);

        testData = testData;
    }

    function removeMisc(payment: Payment, index: number) {
        payment.misc.splice(index, 1);
        if (payment.misc.length == 0) {
            addMisc(payment);
        }
        testData = testData;
    }

    function countGrandTotal() {
        let grandTotal: number = 0.0;

        testData.period.forEach((element) => {
            grandTotal += element.total;
        });

        testData.total = grandTotal;
    }

    function countPeriodTotal(period: Period) {
        let periodTotal: number = 0.0;

        period.payment.forEach((element) => {
            periodTotal += element.total;
        });

        period.total = periodTotal;

        countGrandTotal();
    }

    function countCategoryTotal(payment: Payment, period: Period) {
        let miscTotal: number = 0.0;

        payment.misc.forEach((element) => {
            miscTotal += element.amount;
        });

        payment.total = miscTotal - payment.paid;

        countPeriodTotal(period);
    }
</script>

<div
    class="flex h-screen w-screen flex-col items-center justify-start gap-4 bg-white p-10"
>
    <div
        class=" flex h-fit w-full flex-col items-center justify-start border border-gray-400 bg-white"
    >
        <div
            class="grid w-full grid-cols-8 gap-0 divide-x divide-gray-400 border-b border-gray-400"
        >
            <div class="col-span-7 grid-rows-subgrid">
                <div class="grid grid-cols-7 divide-x divide-gray-400">
                    <div
                        class="flex flex-row items-center justify-center bg-white p-1"
                    >
                        <p
                            class="w-full text-wrap text-center text-md font-medium leading-tight"
                        >
                            Tempoh
                        </p>
                        <button
                            class="rounded-xl bg-gray-100 p-0.5 text-gray-500 print:hidden"
                            on:click={() => {
                                addPeriod();
                            }}
                        >
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 5V19"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <path
                                    d="M5 12H19"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="col-span-5 grid-rows-subgrid">
                        <div class="grid grid-cols-5 divide-x divide-gray-400">
                            <div
                                class="flex flex-row items-center justify-center bg-white p-1"
                            >
                                <p
                                    class="w-full text-wrap text-center text-md font-medium leading-tight"
                                >
                                    Kategori
                                </p>
                            </div>

                            <div class="col-span-2 grid-rows-subgrid">
                                <div
                                    class="grid h-full grid-cols-2 divide-x divide-gray-400"
                                >
                                    <div
                                        class="flex flex-row items-center justify-center bg-white p-1"
                                    >
                                        <p
                                            class="w-full text-wrap text-center text-md font-medium leading-tight"
                                        >
                                            Item
                                        </p>
                                    </div>
                                    <div
                                        class="flex flex-row items-center justify-center bg-white p-1"
                                    >
                                        <p
                                            class="w-full text-wrap text-center text-md font-medium leading-tight"
                                        >
                                            Sepatut Bayar (RM)
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="flex flex-row items-center justify-center bg-white p-1"
                            >
                                <p
                                    class="w-full text-wrap text-center text-md font-medium leading-tight"
                                >
                                    Telah Bayar (RM)
                                </p>
                            </div>
                            <div
                                class="flex flex-row items-center justify-center bg-white p-1"
                            >
                                <p
                                    class="w-full text-wrap text-center text-md font-medium leading-tight"
                                >
                                    Jumlah Tunggakan / Potongan (RM)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="flex flex-row items-center justify-center bg-white p-1"
                    >
                        <p
                            class="w-full text-wrap text-center text-md font-medium leading-tight"
                        >
                            Jumlah Mengikut Tempoh (RM)
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex flex-row items-center justify-center bg-white p-1">
                <p
                    class="w-full text-wrap text-center text-md font-medium leading-tight"
                >
                    Jumlah Keseluruhan (RM)
                </p>
            </div>
        </div>

        <div class="grid w-full grid-cols-8 gap-0 divide-x divide-gray-400">
            <div
                class="col-span-7 flex grid-rows-subgrid flex-col justify-start divide-y divide-gray-400"
            >
                {#each mockData.period as period, periodIndex}
                    <div class="grid grid-cols-7 divide-x divide-gray-400">
                        <GridInput
                            val={period.month}
                            valueType="text"
                            hasAdd
                            hasRemove
                            addFunction={() => {
                                addPayment(period);
                            }}
                            removeFunction={() => {
                                removePeriod(periodIndex);
                            }}
                        ></GridInput>
                        <div
                            class="col-span-5 flex grid-rows-subgrid flex-col justify-start divide-y divide-gray-400"
                        >
                            {#each period.payment as payment, paymentIndex}
                                <div
                                    class="grid h-full grid-cols-5 divide-x divide-gray-400"
                                >
                                    <GridInput
                                        bind:val={payment.type}
                                        valueType="text"
                                        hasAdd
                                        hasRemove
                                        addFunction={() => {
                                            addMisc(payment);
                                        }}
                                        removeFunction={() => {
                                            removePayment(period, paymentIndex);
                                        }}
                                    ></GridInput>
                                    <div
                                        class="col-span-2 flex grid-rows-subgrid flex-col justify-start divide-y divide-gray-400"
                                    >
                                        {#each payment.misc as misc, miscIndex}
                                            <div
                                                class="grid h-full grid-cols-2 divide-x divide-gray-400"
                                            >
                                                <GridInput
                                                    bind:val={misc.item}
                                                    valueType="text"
                                                    hasRemove={true}
                                                    removeFunction={() => {
                                                        removeMisc(
                                                            payment,
                                                            miscIndex,
                                                        );
                                                    }}
                                                ></GridInput>
                                                <GridInput
                                                    bind:val={misc.amount}
                                                    valueType="number"
                                                    editFunction={() => {
                                                        countCategoryTotal(
                                                            payment,
                                                            period,
                                                        );
                                                    }}
                                                ></GridInput>
                                            </div>
                                        {/each}
                                    </div>
                                    <GridInput
                                        bind:val={payment.paid}
                                        valueType="number"
                                        editFunction={() => {
                                            countCategoryTotal(payment, period);
                                        }}
                                    ></GridInput>
                                    <GridInput
                                        bind:val={payment.total}
                                        valueType="number"
                                    ></GridInput>
                                </div>
                            {/each}
                        </div>
                        <GridInput
                            bind:val={period.total}
                            valueType="number"
                            editFunction={() => {
                                countGrandTotal();
                            }}
                        ></GridInput>
                    </div>
                {/each}
            </div>
            <GridInput bind:val={mockData.total} valueType="number"></GridInput>
        </div>
    </div>
</div>
