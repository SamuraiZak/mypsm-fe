<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    let selectedStatus = status[0].value; // Default selected filter

    // mock data
    const lantikanBaru = [
        {
            namaKakitangan: 'Mohd  Irfan bin Abu',
            idSementara: '01288',
            noKadPengenalan: '889955-11-2244',
            kategori: 'Tetap',
            TarikhMohon: '23-08-2023',
            TarikLantikan: '',
            TarikhBersara: '',
            emel: 'wee.ting@hrmis.com',
            status: 'Baru',
        },
    ];

    let tempStaff: any;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    >
        <!-- <FormButton
            type="new"
            addLabel="Lengkapkan Butiran Permohonan"
            onClick={() => {
                goto('./lantikan-baru/butiran-calon');
            }}
        /> -->
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterCard>
        <FilterDateSelector handleDateChange label="Tarikh Mohon"
        ></FilterDateSelector>
        <FilterDateSelector handleDateChange label="Tarikh Lantikan"
        ></FilterDateSelector>

        <FilterSelectInput
            id="status-dropdown"
            label="Status"
            options={status}
            selectedVal={selectedStatus}
        ></FilterSelectInput>
    </FilterCard>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader title="Senarai Permohonan"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['edit']}
            editActions={() => {
                const url =
                    './lantikan-baru/butiran-calon-' + tempStaff.temporaryId;
                goto(url);
            }}
            tableItems={data.getThisStaffRecord}
            bind:passData={tempStaff}
        ></DynamicTable>
    </div>
</section>
