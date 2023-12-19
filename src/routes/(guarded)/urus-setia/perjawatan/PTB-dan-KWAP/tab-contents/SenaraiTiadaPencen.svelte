<script lang="ts">
    import { greds } from '$lib/mocks/gred/gred';
    import { positions } from '$lib/mocks/positions/positions';
    import { status } from '$lib/mocks/status/status';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';

    export let tableData: PtbAndKwap[];
    let tempData: PtbAndKwap;
    let selectedStatusTiadaPencen: string = status[0].value; // Default selected filter
    let selectedGredTiadaPencen: string = greds[0].value; // Default selected filter
    let selectedPosTiadaPencen: string = positions[0].value; // Default selected filter
</script>

<div
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <StaffSelector selectorName="ptb-pension" />
        <ShortTextField label="Tarikh Mohon" type="date" />
        <!-- Select dropdowns -->
        <DropdownSelect
            id="status-dropdown"
            label="Gred Semasa"
            dropdownType="label-left"
            bind:index={selectedGredTiadaPencen}
            options={greds}
        />
        <DropdownSelect
            id="position-dropdown"
            label="Jawatan Semasa"
            dropdownType="label-left"
            bind:index={selectedPosTiadaPencen}
            options={positions}
        />
        <DropdownSelect
            id="status-dropdown"
            label="Status"
            dropdownType="label-left"
            bind:index={selectedStatusTiadaPencen}
            options={status}
        />
    </FilterContainer>
    <SectionHeader title="Senarai Kakitangan TIADA No. Pencen"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url =
                    './PTB-dan-KWAP/butiran-permohonan-' +
                    tempData.noPekerja +
                    '-' +
                    tempData.noKadPengenalan;
                goto(url);
            }}
            columnKeys={[
                'noPekerja',
                'namaPekerja',
                'noKadPengenalan',
                'kategori',
                'tarikhMohon',
                'tindakanUlasan',
            ]}
            tableItems={tableData}
            bind:passData={tempData}
        ></DynamicTable>
    </div>
</div>
