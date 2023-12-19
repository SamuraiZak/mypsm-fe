<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { status } from '$lib/mocks/status/status.js';
    import type { SelectOptionType } from 'flowbite-svelte';
    export let data;
    let selectedRow: IntExamAppl;

    const results: SelectOptionType<any>[] = [
        {
            value: 'pass',
            name: 'LULUS',
        },
        {
            value: 'fail',
            name: 'GAGAL',
        },
        {
            value: 'absent',
            name: 'TIDAK HADIR',
        },
    ];

    let examTitle = '-';
    let examDate = '20-12-2023';
    let examApplDate = '-';
    let examLocation = '-';
    let selectedStatus = '-';
    let selectedExamResult: any = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <FilterCard>
            <StaffSelector />
            <FilterTextInput
                id="exam-name"
                label="Nama Peperiksaan"
                bind:value={examTitle}
            />
            <FilterDateSelector
                id="exam-date"
                label="Tarikh Peperiksaan"
                bind:selectedDate={examDate}
                handleDateChange={() => {}}
            />
            <FilterDateSelector
                id="exam-application-date"
                label="Tarikh Mohon"
                bind:selectedDate={examApplDate}
                handleDateChange={() => {}}
            />
            <FilterTextInput
                id="exam-location"
                label="Lokasi Peperiksaan"
                bind:value={examLocation}
            />
            <DropdownSelect
                id="exam-result-dropdown"
                label="Keputusan Peperiksaan"
                dropdownType="label-top"
                bind:index={selectedExamResult}
                options={results}
            ></DropdownSelect>
            <DropdownSelect
                id="exam-status-dropdown"
                label="Status Peperiksaan"
                dropdownType="label-top"
                bind:index={selectedStatus}
                options={status}
            ></DropdownSelect>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader title="Senarai Peperiksaan Perkhidmatan"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.perhidmatanExamRecords}
                bind:passData={selectedRow}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './rekod-peperiksaan/butiran-peperiksaan-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.candidateIdentityNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader
                title="Senarai Peperiksaan Peningkatan Secara Lantikan (PSL)"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.pslExamRecords}
                bind:passData={selectedRow}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './rekod-peperiksaan/butiran-peperiksaan-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.candidateIdentityNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
