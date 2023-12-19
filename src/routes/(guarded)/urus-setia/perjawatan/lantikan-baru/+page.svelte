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

    export let data;
    let selectedStatus = status[0].value; // Default selected filter

    // mock data
    const newStaffUrl = data.props.candidateLists;
    const lantikanBaru = data.props.newHireLists;

    let tempUrl: Candidate;
    let tempStaff: NewHire;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    >
        <FormButton
            type="new"
            addLabel="Tambah Lantikan Baru"
            onClick={() => {
                goto('lantikan-baru/permohonan-baru');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <!-- Table filter placeholder -->
    <FilterCard>
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
    </FilterCard>

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
            tableItems={newStaffUrl}
            bind:passData={tempUrl}
        ></DynamicTable>
        <br />
        <SectionHeader title="Senarai Rekod Selesai Diisi"></SectionHeader>
        <DynamicTable
            tableItems={lantikanBaru}
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
</section>
