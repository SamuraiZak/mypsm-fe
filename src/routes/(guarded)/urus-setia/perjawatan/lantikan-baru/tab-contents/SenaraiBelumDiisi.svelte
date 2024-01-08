<script lang="ts">
    import { goto } from '$app/navigation';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import { status } from '$lib/mocks/status/status';
    export let listData: any;
    let tempUrl: Candidate;
    let selectedStatus = status[0].value; // Default selected filter
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
    <SectionHeader title="Senarai Rekod Pautan Belum Diisi"></SectionHeader>
    <DynamicTable
        withActions
        actionOptions={['detail']}
        detailActions={() => {
            const url = './lantikan-baru/permohonan-baru';
            goto(url);
        }}
        tableItems={listData}
        bind:passData={tempUrl}
    ></DynamicTable>
</div>
