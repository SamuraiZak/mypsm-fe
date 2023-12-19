<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { greds } from '$lib/mocks/gred/gred';
    import { positions } from '$lib/mocks/positions/positions';
    import { status } from '$lib/mocks/status/status';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { goto } from '$app/navigation';

    export let data;
    let tempData: PtbAndKwap;
    let selectedStatus = status[0].value; // Default selected filter
    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedPos: string = positions[0].value; // Default selected filter
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
        description="Hal-hal berkaitan urusan PTB dan KWAP"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <FilterContainer>
            <StaffSelector selectorName="ptb-lists" />
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
                tableItems={data.props.lists}
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
</section>
