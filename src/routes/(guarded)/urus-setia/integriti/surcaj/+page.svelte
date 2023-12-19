<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { years } from '$lib/mocks/dateSelection/years.js';
    import { greds } from '$lib/mocks/gred/gred.js';
    import { positions } from '$lib/mocks/positions/positions.js';
    export let data;
    let selectedRow: IntSurcaj;

    let selectedGred = '-';
    let selectedPosition = '-';
    let selectedYear = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Surcaj" description="Hal-hal berkaitan Surcaj"
        ><TextIconButton
            primary
            label="Tambah Rekod"
            onClick={() => {
                goto('./surcaj/tambah-rekod-surcaj');
            }}
        >
            <SvgPlus />
        </TextIconButton></ContentHeader
    >
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
                id="years-of-Service-dropdown"
                label="Tahun"
                dropdownType="label-top"
                bind:index={selectedYear}
                options={years}
            ></DropdownSelect>
            <FilterTextInput label="Jumlah Surcaj" value={''} />
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader title="Senarai Rekod Surcaj"></SectionHeader>
            <DynamicTable
                tableItems={data.records.surcajRecord}
                bind:passData={selectedRow}
                columnKeys={[
                    'employeeNumber',
                    'officerName',
                    'identityDocumentNumber',
                    'surcajMeetingDate',
                    'dateOfEffect',
                    'surchargeResult',
                    'surchargeAmout',
                    'paymentPeriod',
                    'status',
                ]}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './surcaj/butiran-surcaj-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.identityDocumentNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
