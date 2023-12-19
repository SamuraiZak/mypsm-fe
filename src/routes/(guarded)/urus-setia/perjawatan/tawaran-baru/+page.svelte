<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import { mesyuarat } from '$lib/mocks/perjawatan/tawaran-baru/mesyuarat-list';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';

    let selectedStatus = status[0].value; // Default selected filter
    let selectedMeeting = meetings[0].value; // Default selected filter
    let tempData: any;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tawaran Baru Dalam Perkhidmatan"
        description="Hal-hal berkaitan Tawaran Baru Dalam Perkhidmatan (Rasionalisasi/Tukar Lantik/Jumud/Lain-lain)"
    >
        <FormButton
            type="new"
            addLabel="Tambah Permohonan Baru"
            onClick={() => {
                goto('tawaran-baru/permohonan-baru');
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
        <FilterTextInput label="Kumpulan Mesyuarat"></FilterTextInput>
        <FilterDateSelector handleDateChange label="Tarikh Mesyuarat"
        ></FilterDateSelector>
        <FilterSelectInput
            id="meeting-type-dropdown"
            label="Nama dan Bil Mesyuarat"
            options={meetings}
            selectedVal={selectedMeeting}
        ></FilterSelectInput>
        <FilterSelectInput
            id="status-dropdown"
            label="Status"
            options={status}
            selectedVal={selectedStatus}
        ></FilterSelectInput>
    </FilterCard>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-center justify-start">
        <SectionHeader title="Senarai Mesyuarat"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['edit']}
            editActions={() => {
                const url = './tawaran-baru/kemaskini-keputusan-permohonan';
                goto(url);
            }}
            tableItems={mesyuarat}
            bind:passData={tempData}
        ></DynamicTable>
    </div>
</section>
