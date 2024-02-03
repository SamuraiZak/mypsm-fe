<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { cutiRks } from '$lib/mocks/kakitangan/cuti/cuti-rks/cuti-rks';
    import { Select } from 'flowbite-svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Cuti Rehat, Kecemasan & Sakit"
        description="Senarai cuti berdasarkan Sistem HRMIS"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
>
    <FilterContainer>
        <div class="flex w-full flex-wrap gap-2.5">
            <FilterTextInput label="Nama Pekerja"></FilterTextInput>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
            <FilterTextInput label="Bulan Cuti"></FilterTextInput>
            <FilterTextInput label="Tahun"></FilterTextInput>
            <FilterTextInput label="Unit Organisasi"></FilterTextInput>
            <FilterTextInput label="Message ID"></FilterTextInput>

            <!-- <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <p class="text-sm font-normal">Bulan Cuti*</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
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
            </div> -->
        </div>
        <!-- <ShortTextField label="Unit Organisasi*" type="text" />
        <ShortTextField label="Message ID" type="text" /> -->
    </FilterContainer>

    <SectionHeader title="Senarai Keluar Ofis"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable tableItems={data.hrmisOutOfOffice ?? undefined}
        ></DynamicTable>
    </div>

    <SectionHeader title="Senarai Cuti Rehat, Kecemasan & Sakit"
    ></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable tableItems={data.hrmisLeaveList ?? undefined}
        ></DynamicTable>
    </div>
</section>
