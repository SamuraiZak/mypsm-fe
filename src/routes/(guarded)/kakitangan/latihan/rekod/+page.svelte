<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { yearsOfService } from '$lib/config/lnptYearsOfService.js';
    import { greds } from '$lib/mocks/gred/gred.js';
    import { positions } from '$lib/mocks/positions/positions.js';
    export let data;
    let selectedRow: IntExamAppl;

    let selectedGred = '-';
    let selectedPosition = '-';
    let selectedYearsOfService = '-';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
        ><TextIconButton
            primary
            label="Tambah Peperiksaan"
            onClick={() => {
                goto('./rekod/mohon-peperiksaan');
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
            <SectionHeader title="Senarai Peperiksaan yang dimohon"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.records.examTakenByCurrentEmp}
                bind:passData={selectedRow}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './rekod/butiran-peperiksaan-' +
                        selectedRow.id +
                        '-' +
                        selectedRow.candidateIdentityNumber;
                    goto(url);
                }}
            ></DynamicTable>
        </div>
    </div>
</section>
