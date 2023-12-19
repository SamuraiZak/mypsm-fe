<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgCalc from '$lib/assets/svg/SvgCalc.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import { positions } from '$lib/mocks/positions/positions.js';
    import { status } from '$lib/mocks/status/status';
    export let data;
    let tempUrl: IntFinalSalary;

    let selectedGred = '-';
    let selectedPosition = '-';
    let selectedStatus = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Laporan Nilaian Prestasi Tahunan (LNPT)"
        description="Hal-hal berkaitan pengurusan prestasi kakitangan LKIM"
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
                id="gred-dropdown"
                label="Gred Semasa"
                dropdownType="label-top"
                bind:index={selectedGred}
                options={greds}
            ></DropdownSelect>
            <DropdownSelect
                id="position-dropdown"
                label="Jawatan"
                dropdownType="label-top"
                bind:index={selectedPosition}
                options={positions}
            ></DropdownSelect>
            <DropdownSelect
                id="status-dropdown"
                label="Status"
                dropdownType="label-top"
                bind:index={selectedStatus}
                options={status}
            ></DropdownSelect>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <ContentHeader
                title="Nota: Pilih senarai nama kakitangan yang terlibat untuk dipuratakan."
                description=""
                ><TextIconButton
                    primary
                    label="Kira Purata"
                    onClick={() => {
                        goto('./purata-lnpt/kira-purata');
                    }}
                >
                    <SvgCalc />
                </TextIconButton></ContentHeader
            >
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <DynamicTable
                hasCheckbox
                tableItems={data.records.LnptAverageRecord}
                bind:passData={tempUrl}
            ></DynamicTable>
        </div>
    </div>
</section>
