<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import { status } from '$lib/mocks/status/status';
    import { goto } from '$app/navigation';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';

    const mesyuarat = [
        {
            mesyuarat: '#2321',
            jumlahKakitangan: 2,
            tarikhMesyuarat: '4/8/2023',
            namaDanBilMesyuarat: '1/02',
            status: 'SOKONG - Penyokong',
        },
        {
            mesyuarat: '#2033',
            jumlahKakitangan: 7,
            tarikhMesyuarat: '2/8/2023',
            namaDanBilMesyuarat: '1/02',
            status: 'SOKONG - Penyokong',
        },
    ];

    let selectedStatus = status[0].value; // Default selected filter
    let selectedMeeting = meetings[0].value; // Default selected filter
    let tempData: any;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Tawaran Baru Dalam Perkhidmatan"
        description="Hal-hal berkaitan Tawaran Baru Dalam Perkhidmatan (Rasionalisasi/Tukar Lantik/Jumud/Lain-lain)"
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
        <ShortTextField label="Kumpulan Mesyuarat" type="text" />
        <ShortTextField label="Tarikh Mesyuarat" type="date" />
        <!-- Select dropdown for meeting types -->
        <DropdownSelect
            id="meeting-type-dropdown"
            label="Nama dan Bil Mesyuarat"
            dropdownType="label-left"
            bind:index={selectedMeeting}
            options={meetings}
        />
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
