<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { years } from '$lib/mocks/dateSelection/years.js';
    import { greds } from '$lib/mocks/gred/gred.js';
    import { positions } from '$lib/mocks/positions/positions.js';
    import { status } from '$lib/mocks/status/status.js';
    let selectedRow: IntProsiding;
    export let data;
    let selectedGred = '-';
    let selectedPosition = '-';
    let selectedYear = '-';
    let selectedStatus = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Prosiding - Rayuan"
        description="Hal-hal berkaitan prosiding rayuan yang telah dikemukan"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <FilterCard>
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
                id="years-of-Service-dropdown"
                label="Tahun"
                dropdownType="label-top"
                bind:index={selectedYear}
                options={years}
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
            <SectionHeader title="Senarai Rekod Prosiding - Rayuan"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.prosidingRecord}
                bind:passData={selectedRow}
                columnKeys={[
                    'employeeNumber',
                    'officerName',
                    'identityDocumentNumber',
                    'disciplinaryProceedingType',
                    'chargesMeetingDate',
                    'proceedingMeetingDate',
                    'declarationLetterReceived',
                    'status',
                    'isAppealed',
                ]}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './rayuan/butiran-rayuan-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.identityDocumentNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
