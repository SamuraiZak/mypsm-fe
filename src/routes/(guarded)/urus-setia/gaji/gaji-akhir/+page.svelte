<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockFinalSalary } from '$lib/mocks/gaji/gaji-elaun/mockFinalSalary';
    import { status } from '$lib/mocks/status/status';
    export let data;
    let tempUrl: IntFinalSalary;

    let selectedMonth = months[5].value;
    let selectedStatus = 'Baru';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Gaji Akhir"
        description="Senarai nama kakitangan yang terlibat dengan persaraan secara paksa, terbitan, pilihan dan lain-lain."
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
            <StaffSelector selectorName="staff-lists" />
            <!-- Select dropdowns -->
            <DropdownSelect
                id="retire-type-dropdown"
                label="Jenis Persaraan"
                dropdownType="label-top"
                bind:index={selectedMonth}
                options={months}
            ></DropdownSelect>
            <DropdownSelect
                id="bulan-dropdown"
                label="Bulan"
                dropdownType="label-top"
                bind:index={selectedMonth}
                options={months}
            ></DropdownSelect>
            <DropdownSelect
                id="status-dropdown"
                label="Status"
                dropdownType="label-top"
                bind:index={selectedStatus}
                options={status}
            ></DropdownSelect>
        </FilterCard>
        <SectionHeader title="Senarai Kakitangan"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                tableItems={data.records.finalSalaryRecord}
                bind:passData={tempUrl}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './gaji-akhir/butiran-' +
                        tempUrl.employeeNumber +
                        '-' +
                        tempUrl.identityDocumentNumber;

                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
