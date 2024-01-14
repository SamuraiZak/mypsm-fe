<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryAndAllowance } from '$lib/mocks/gaji/gaji-elaun/mockSalaryAndAllowance';
    import { status } from '$lib/mocks/status/status';
    import type { SalaryAndAllowanceListResponse } from '$lib/view-models/mypsm/salary/salary-and-allowance/salary-and-allowancs-list-response.view-model.js';

    let selectedMonth = months[5].value;
    let selectedStatus = 'pending';

    export let data;

    let salaryAllowanceList: SalaryAndAllowanceListResponse = data.props.salaryAllowanceResult;

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Gaji & Elaun - Elaun"
        description="Hal-hal berkaitan pengurusan gaji dan elaun bagi kakitangan LKIM"
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
            <StaffSelector selectorName="staff-lists" />
            <FilterTextInput label="Jumlah Elaun"></FilterTextInput>
            <!-- Select dropdowns -->
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
        </FilterContainer>
        <SectionHeader title="Senarai Kakitangan"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                hasCheckbox
                onSelect={() => {}}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    goto('./gaji-elaun/butiran');
                }}
                tableItems={salaryAllowanceList.data.allowances}
                columnKeys={[]}
            ></DynamicTable>
        </div>
    </div>
</section>
