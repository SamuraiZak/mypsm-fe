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
    import { mockRekodPinjaman } from '$lib/mocks/pinjaman-kuarters/mockRekodPinjaman';
    import { status } from '$lib/mocks/status/status';
    import { selectedRecordId } from '$lib/stores/globalState';

    let selectedCategory: string = 'all';
    let currEmpLoanRecords = mockRekodPinjaman.filter(
        (e) => e.employeeNumber === '00001',
    );
    let currentData: IntRekodPinjaman;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pinjaman"
        description="Senarai rekod pinjaman kakitangan sepanjang perkhidmatan"
    >
        <OptionButton primary label="Tambah Pinjaman Baru" options={loanOptions}
        ></OptionButton>
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
            tableItems={currEmpLoanRecords}
            columnKeys={[
                'employeeNumber',
                'employeeName',
                'identityDocumentNumber',
                'category',
                'applicationDate',
                'typeOfLoan',
                'status',
                'remarks',
            ]}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                selectedRecordId.set(currentData.id);
                if (currentData.typeOfLoan == 'Kenderaan') {
                    goto('pinjaman/butiran/kenderaan');
                } else {
                    goto('pinjaman/butiran/ktp');
                }
            }}
        ></DynamicTable>
    </div>
</section>
