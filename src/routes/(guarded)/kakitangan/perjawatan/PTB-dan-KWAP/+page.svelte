<script lang="ts">
    import { greds } from '$lib/mocks/gred/gred';
    import { positions } from '$lib/mocks/positions/positions';
    import { status } from '$lib/mocks/status/status';

    import SectionHeader from '$lib/components/header/SectionHeader.svelte';

    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    let tempData: PensionDetail;
    let selectedStatus = status[0].value; // Default selected filter
    let selectedGred: string = greds[0].value; // Default selected filter
    let selectedPos: string = positions[0].value; // Default selected filter
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';

    export let data;
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import type { PensionDetail } from '$lib/view-models/mypsm/perjawatan/pension/pension-list-details-response.view-model';
    // const url =
    //     './PTB-dan-KWAP/butiran-permohonan-' +
    //     data.props.lists[0].noPekerja +
    //     '-' +
    //     data.props.lists[0].noKadPengenalan;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
        description="Hal-hal berkaitan urusan PTB dan KWAP"
        ><FormButton
            type="new"
            addLabel="Buat Permohonan"
            onClick={() => {
                goto('./PTB-dan-KWAP/permohonan-baru');
            }}
        /></ContentHeader
    >
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
        <FilterCard>
            <FilterDateSelector handleDateChange label="Tarikh Mohon"
            ></FilterDateSelector>
            <FilterSelectInput
                id="greds-dropdown"
                label="Gred Semasa"
                options={greds}
                selectedVal={selectedGred}
            ></FilterSelectInput>
            <FilterSelectInput
                id="position-dropdown"
                label="Jawatan Semasa"
                options={positions}
                selectedVal={selectedPos}
            ></FilterSelectInput>
            <FilterSelectInput
                id="status-dropdown"
                label="Status"
                options={status}
                selectedVal={selectedStatus}
            ></FilterSelectInput>
        </FilterCard>
        <SectionHeader title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
        ></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    const url =
                        './PTB-dan-KWAP/butiran-permohonan-' +
                        tempData.employeeNo 
                    goto(url)
                }}
                tableItems={data.record}
                bind:passData={tempData}
            ></DynamicTable>
        </div>
    </div>
</section>
