<script lang="ts">
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    export let listData: any;
    let selectedStatus = status[0].value; // Default selected filter
    let tempStaff: NewHire;
</script>

<!-- Table filter placeholder -->
<FilterContainer>
    <FilterTextInput label="Nama Calon"></FilterTextInput>
    <FilterTextInput label="ID Calon"></FilterTextInput>
    <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
    <FilterDateSelector handleDateChange label="Tarikh Mohon"
    ></FilterDateSelector>
    <FilterDateSelector handleDateChange label="Tarikh Lantikan"
    ></FilterDateSelector>
    <FilterSelectInput
        label="Status"
        options={status}
        selectedVal={selectedStatus}
    ></FilterSelectInput>
</FilterContainer>

<!-- Sample table for testing purposes -->
<div class="flex w-full flex-col items-start justify-center">
    <SectionHeader title="Senarai Rekod Selesai Diisi"></SectionHeader>
    <DynamicTable
        tableItems={listData}
        bind:passData={tempStaff}
        withActions
        actionOptions={['edit']}
        editActions={() => {
            const url =
                './lantikan-baru/kemaskini-permohonan-' +
                tempStaff.idSementara +
                '-' +
                tempStaff.noKadPengenalan;
            goto(url);
        }}
    ></DynamicTable>
</div>
