<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { months } from '$lib/mocks/dateSelection/months';
    import { mockSalaryMovementRecord } from '$lib/mocks/gaji/salaryMovementRecord/mockSalaryMovementRecord';
    import { greds } from '$lib/mocks/gred/gred';
    import { Tooltip } from 'flowbite-svelte';
    import type { SalaryMovementListDTO } from '$lib/dto/mypsm/salary/salary-movement/list-salary-movement.dto';
    let tempData: SalaryMovementListDTO;
    export let data;
    let selectedMonth = months[6].value;
    let tooltipContent: string = '';
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id;

            switch (eventName) {
                default:
                    tooltipContent =
                        'Pergerakan gaji kakitangan akan diadakan sebanyak 4 kali setahun iaitu 3 bulan sekali (Januari, April, Julai, Oktober)';
            }
        }
    }

    let selectedGrade = 'All';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pergerakan Gaji"
        description="Hal-hal berkaitan pengurusan gaji bagi kakitangan LKIM"
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
            <!-- Select dropdowns -->
            <DropdownSelect
                toolTipID="bulanTooltip"
                hasTooltip={true}
                id="bulan-dropdown"
                label="Bulan Pergerakan Gaji"
                dropdownType="label-top"
                bind:index={selectedMonth}
                options={months}
            ></DropdownSelect>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="KGT Pegawai"></FilterTextInput>
            <DropdownSelect
                id="gred-dropdown"
                label="Gred"
                dropdownType="label-top"
                bind:index={selectedGrade}
                options={greds}
            ></DropdownSelect>
        </FilterContainer>
        <SectionHeader title="Luluskan semua medan yang dipilih dibawah"
            ><FormButton type="approve"></FormButton>
        </SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                hasCheckbox
                onSelect={() => {}}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                    '/pengarah-khidmat-pengurusan/gaji/pergerakan-gaji/butiran-' +
                    tempData.meetingId+'-'+tempData.employeeNumber
                    goto(url);
                }}
                tableItems={data.salaryMovementApprovalList}
                bind:passData={tempData}
                columnKeys={[
                    'employeeNumber',
                    'employeeName',
                    'employeeGrade',
                    'tpg',
                    'kgt',
                    'salary1',
                    'wilayahAllowance1',
                    'criticalAllowance1',
                    'salary2',
                    'wilayahAllowance2',
                    'criticalAllowance2',
                    'specialkgt',
                    'specialSalary',
                    'specialWilayahAllowance',
                    'specialAid',
                    'status'
                ]}
            ></DynamicTable>
        </div>
    </div>
</section>
<!-- Tooltip body -->
<Tooltip
    type="dark"
    triggeredBy="[id^='bulanTooltip']"
    class="w-[350px] text-center"
    on:show={assignContent}>{tooltipContent}</Tooltip
>
