<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { NewHire } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-supporter-table-list-response.model';
    import type { PageData } from './$types';
    export let data: PageData;
    let tempStaff: NewHire;
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
        <!-- <DropdownSelect
            id="status-dropdown"
            label="Status"
            dropdownType="label-left"
            bind:index={selectedStatus}
            options={status}
        /> -->
    </FilterContainer>

    <!-- Sample table for testing purposes -->
    <div class="flex w-full flex-col items-start justify-center">
        <SectionHeader title="Senarai Permohonan"></SectionHeader>
        <DynamicTable
            withActions
            actionOptions={['edit']}
            editActions={() => {
                const url =
                    './lantikan-baru/kemaskini-permohonan-' +
                    tempStaff.candidateId;
                goto(url);
            }}
            tableItems={data.newHireLists}
            bind:passData={tempStaff}
        ></DynamicTable>
    </div>
</section>
