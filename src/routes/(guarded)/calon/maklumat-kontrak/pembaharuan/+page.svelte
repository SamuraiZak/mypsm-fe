<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import type { IContractRenewal } from '$lib/interfaces/contract-staffs/IContractRenewal.js';

    export let data;
    let selectedStatus = status[0].value; // Default selected filter

    // mock data
    const renewalStaffs = data.props.candidateLists.filter(
        (candidate) => candidate.idSementara === '00001',
    );

    // any type for testing since no interface is created for it yet
    let tempRenewalStaff: IContractRenewal;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Kakitangan Akan Tamat Kontrak"
        description="Hal-hal berkaitan kakitangan kontrak LKIM"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] w-full justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterCard>
        <FilterTextInput label="Nama Calon"></FilterTextInput>
        <FilterTextInput label="ID Calon"></FilterTextInput>
        <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
        <FilterDateSelector handleDateChange label="Tarikh Mohon"
        ></FilterDateSelector>
        <FilterDateSelector handleDateChange label="Tarikh Mula Kontrak"
        ></FilterDateSelector>
        <FilterSelectInput
            label="Status"
            options={status}
            selectedVal={selectedStatus}
        ></FilterSelectInput>
    </FilterCard>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader
            title="Senarai Kakitangan untuk Pembaharuan atau Penamatan Kontrak"
        ></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                const url =
                    './pembaharuan/kemaskini-permohonan-' +
                    tempRenewalStaff.idSementara +
                    '-' +
                    tempRenewalStaff.noKadPengenalan;
                goto(url);
            }}
            tableItems={renewalStaffs}
            bind:passData={tempRenewalStaff}
        ></DynamicTable>
        <br />
    </div>
</section>
