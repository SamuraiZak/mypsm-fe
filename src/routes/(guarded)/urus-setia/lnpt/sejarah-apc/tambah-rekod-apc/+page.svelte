<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgCalc from '$lib/assets/svg/SvgCalc.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { yearsOfService } from '$lib/config/lnptYearsOfService.js';
    import { years } from '$lib/mocks/dateSelection/years';
    import { greds } from '$lib/mocks/gred/gred.js';
    import { positions } from '$lib/mocks/positions/positions.js';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';

    export let data;
    let selectedRow: IntLnptAverage;
    let selectedGred = '-';
    let selectedPosition = '-';
    let selectedYearsOfService = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod Sejarah Anugerah Perkhidmatan Cemerlang (APC)"
        description="Hal-hal pengurusan sejarah APC bagi kakitangan LKIM."
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('../sejarah-apc');
            }}
        >
            <SvgArrowLeft />
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
                label="Tahun Berkhidmat"
                dropdownType="label-top"
                bind:index={selectedYearsOfService}
                options={yearsOfService}
            ></DropdownSelect>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader
                title="Senarai Kakitangan Untuk Dikemaskini (Maklumat APC)"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.LnptApcRecord}
                bind:passData={selectedRow}
                withActions
                actionOptions={['edit']}
                editActions={() => {
                    const url =
                        './tambah-rekod-apc/butiran-' +
                        selectedRow.employeeNumber +
                        '-' +
                        selectedRow.identityDocumentNumber;

                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
