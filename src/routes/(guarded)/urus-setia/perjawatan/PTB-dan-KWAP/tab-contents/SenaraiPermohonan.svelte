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
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';

    export let tableData: PtbAndKwap[];
    let tempData: PtbAndKwap;
    let selectedStatus = status[0].value; // Default selected filter
    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedPos: string = positions[0].value; // Default selected filter
</script>

<div
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <FilterTextInput label="Nama Pekerja" />
        <FilterTextInput label="No. Pekerja" />
        <FilterTextInput label="No. Kad Pengenalan" />
        <ShortTextField label="Tarikh Mohon" type="date" />
        <!-- Select dropdowns -->
        <DropdownSelect
            id="status-dropdown"
            label="Gred Semasa"
            dropdownType="label-left"
            bind:index={selectedGred}
            options={greds}
        />
        <DropdownSelect
            id="position-dropdown"
            label="Jawatan Semasa"
            dropdownType="label-left"
            bind:index={selectedPos}
            options={positions}
        />
        <DropdownSelect
            id="status-dropdown"
            label="Status"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        />
    </FilterContainer>
    <SectionHeader title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
    ></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={tableData}
            editable
            bind:passData={tempData}
            onEditClick={() => {
                const url =
                    './PTB-dan-KWAP/butiran-permohonan-' +
                    tempData.noPekerja +
                    '-' +
                    tempData.noKadPengenalan;
                goto(url);
            }}
        ></DynamicTable>
    </div>
</div>
