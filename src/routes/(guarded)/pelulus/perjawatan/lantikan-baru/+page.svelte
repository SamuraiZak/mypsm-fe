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
            status: 'SOKONG - Penyokong',
        },
    ];

    let tempStaff: any;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterContainer>
        <!-- Input field for hiring date -->
        <StaffSelector />
        <ShortTextField label="Tarikh Lantikan" type="date" />
        <ShortTextField label="Tarikh Mohon" type="date" />
        <!-- Select dropdown for status -->
        <DropdownSelect
            id="status-dropdown"
            label="Status"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        />
    </FilterContainer>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader title="Senarai Permohonan"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['edit']}
            editActions={() => {
                const url = './lantikan-baru/kemaskini-permohonan';
                goto(url);
            }}
            tableItems={lantikanBaru}
            bind:passData={tempStaff}
        ></DynamicTable>
    </div>
</section>
