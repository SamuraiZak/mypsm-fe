<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { cutiGantian } from '$lib/mocks/pelulus/cuti/cuti-gantian';
    import { cutiTanpaRekod } from '$lib/mocks/pelulus/cuti/cuti-tanpa-rekod';
    import { Select } from 'flowbite-svelte';
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Cuti Gantian Kakitangan"
        description="Berikut adalah senarai permohonan berkaitan cuti gantian yang telah sah"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Cuti Gantian">
            <FilterContainer>
                <StaffSelector />
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <p class="text-sm font-normal">Bulan Cuti*</p>
                        <div
                            class="flex flex-row items-center justify-start gap-x-2.5"
                        >
                            <Select
                                id="bulan-cuti-bulan"
                                items={[
                                    {
                                        value: 1,
                                        name: 'January',
                                    },
                                    {
                                        value: 2,
                                        name: 'Febrary',
                                    },
                                    {
                                        value: 3,
                                        name: 'March',
                                    },
                                    {
                                        value: 4,
                                        name: 'April',
                                    },
                                    {
                                        value: 5,
                                        name: 'May',
                                    },
                                    {
                                        value: 6,
                                        name: 'June',
                                    },
                                    {
                                        value: 7,
                                        name: 'July',
                                    },
                                    {
                                        value: 8,
                                        name: 'August',
                                    },
                                    {
                                        value: 9,
                                        name: 'September',
                                    },
                                    {
                                        value: 10,
                                        name: 'October',
                                    },
                                    {
                                        value: 11,
                                        name: 'November',
                                    },
                                    {
                                        value: 12,
                                        name: 'December',
                                    },
                                ]}
                                placeholder="Bulan"
                                class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                                value={''}
                            ></Select>
                            <Select
                                id="bulan-cuti-tahun"
                                items={[
                                    {
                                        value: 1,
                                        name: '2020',
                                    },
                                    {
                                        value: 2,
                                        name: '2021',
                                    },
                                    {
                                        value: 3,
                                        name: '2022',
                                    },
                                    {
                                        value: 4,
                                        name: '2023',
                                    },
                                ]}
                                placeholder="Tahun"
                                class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                                value={''}
                            ></Select>
                        </div>
                    </div>
                </div>
                <ShortTextField label="Kod Jenis Cuti" type="text" />
            </FilterContainer>
            <SectionHeader title="Senarai Cuti-Cuti Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={data.replacementLeaveHistoryList}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pelulus/cuti/permohonan-cuti/butiran-cuti-gantian',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Cuti Tanpa Rekod">
            <FilterContainer>
                <StaffSelector />
                <div class="flex flex-row gap-x-2.5">
                    <div
                        class="flex flex-row items-center justify-center gap-x-2.5"
                    >
                        <p class="text-sm font-normal">Bulan Cuti*</p>
                        <div
                            class="flex flex-row items-center justify-start gap-x-2.5"
                        >
                            <Select
                                id="bulan-cuti-bulan"
                                items={[
                                    {
                                        value: 1,
                                        name: 'January',
                                    },
                                    {
                                        value: 2,
                                        name: 'Febrary',
                                    },
                                    {
                                        value: 3,
                                        name: 'March',
                                    },
                                    {
                                        value: 4,
                                        name: 'April',
                                    },
                                    {
                                        value: 5,
                                        name: 'May',
                                    },
                                    {
                                        value: 6,
                                        name: 'June',
                                    },
                                    {
                                        value: 7,
                                        name: 'July',
                                    },
                                    {
                                        value: 8,
                                        name: 'August',
                                    },
                                    {
                                        value: 9,
                                        name: 'September',
                                    },
                                    {
                                        value: 10,
                                        name: 'October',
                                    },
                                    {
                                        value: 11,
                                        name: 'November',
                                    },
                                    {
                                        value: 12,
                                        name: 'December',
                                    },
                                ]}
                                placeholder="Bulan"
                                class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                                value={''}
                            ></Select>
                            <Select
                                id="bulan-cuti-tahun"
                                items={[
                                    {
                                        value: 1,
                                        name: '2020',
                                    },
                                    {
                                        value: 2,
                                        name: '2021',
                                    },
                                    {
                                        value: 3,
                                        name: '2022',
                                    },
                                    {
                                        value: 4,
                                        name: '2023',
                                    },
                                ]}
                                placeholder="Tahun"
                                class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                                value={''}
                            ></Select>
                        </div>
                    </div>
                </div>
                <ShortTextField label="Kod Jenis Cuti" type="text" />
            </FilterContainer>
            <SectionHeader title="Senarai Cuti-Cuti Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={data.untrackedLeaveHistoryList}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pelulus/cuti/permohonan-cuti/butiran-cuti-tanpa-rekod',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
