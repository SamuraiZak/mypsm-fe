<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import OptionButton from '$lib/components/buttons/OptionButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { loanOptions } from '$lib/mocks/pinjaman-kuarters/loanOptions';
    import { mockRekodKuarters } from '$lib/mocks/pinjaman-kuarters/mockRekodKuarters';
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import { status } from '$lib/mocks/status/status';
    import { selectedRecordId } from '$lib/stores/globalState';

    let selectedCategory: string = 'all';
    let currEmpQuartersRecord = mockRekodKuarters.filter(
        (e) => e.employeeNumber === '00001',
    );
    let currentData: IntRekodKuarters;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Kuarters"
        description="Senarai rekod kuarters kakitangan sepanjang perkhidmatan"
    >
        <FormButton
            type="new-application"
            onClick={() => {
                goto('kuarters/masuk/baru');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
    >
        <FilterContainer>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="Nama Kakitangan"></FilterTextInput>
            <FilterSelectInput
                label="Status"
                options={status}
                selectedVal={selectedCategory}
            ></FilterSelectInput>
            <FilterDateSelector handleDateChange label="Tarikh Mohon"
            ></FilterDateSelector>
        </FilterContainer>
    </div>

    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
    >
        <SectionHeader title="Senarai Permohonan"></SectionHeader>
        <DynamicTable
            bind:passData={currentData}
            tableItems={currEmpQuartersRecord}
            columnKeys={[
                'employeeNumber',
                'employeeName',
                'identityDocumentNumber',
                'category',
                'applicationDate',
                'approvedDate',
                'status',
                'typeOfRequest',
                'isOccupied',
            ]}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                selectedRecordId.set(currentData.id);
                if (currentData.typeOfRequest == 'Masuk') {
                    goto('kuarters/masuk/butiran');
                } else {
                    goto('kuarters/keluar/butiran');
                }
            }}
        ></DynamicTable>
    </div>
</section>
