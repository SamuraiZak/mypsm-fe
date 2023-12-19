<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { status } from '$lib/mocks/status/status.js';
    export let data;
    let selectedRow: IntExamAppl;

    let courseTitle = '-';
    let courseStartDate = '20-12-2023';
    let courseApplDate = '-';
    let courseLocation = '-';
    let courseAmount = '-';
    let selectedStatus = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pembiayaan Pembelajaran"
        description="Senarai pembiayaan pembelajaran yang telah diambil oleh kakitangan"
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
        <FilterContainer>
            <StaffSelector />
            <!-- Select dropdowns -->
            <FilterTextInput
                id="course-name"
                label="Kursus Pengajian"
                bind:value={courseTitle}
            />
            <FilterTextInput
                id="amount-fee"
                label="Jumlah Tuntutan Yuran"
                bind:value={courseAmount}
            />
            <FilterDateSelector
                id="course-start-date"
                label="Tarikh Mula Kursus"
                bind:selectedDate={courseStartDate}
                handleDateChange={() => {}}
            />
            <FilterDateSelector
                id="exam-application-date"
                label="Tarikh Mohon"
                bind:selectedDate={courseApplDate}
                handleDateChange={() => {}}
            />
            <FilterTextInput
                id="course-location"
                label="Lokasi"
                bind:value={courseLocation}
            />
            <DropdownSelect
                id="status-dropdown"
                label="Status"
                dropdownType="label-top"
                bind:index={selectedStatus}
                options={status}
            ></DropdownSelect>
        </FilterContainer>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader title="Rekod Tuntutan Pembiayaan Yuran Pengajian"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.studyAllowanceRecords}
                bind:passData={selectedRow}
                columnKeys={[
                    'candidate',
                    'candidateIdentityNumber',
                    'courseName',
                    'courseLevel',
                    'courseApplicationDate',
                    'coursePeriod',
                    'threeYearLnptAverage',
                    'claimAmount',
                    'status',
                ]}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './tuntutan-yuran/tuntutan-yuran-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.candidateIdentityNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
