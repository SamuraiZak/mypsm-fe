<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { categories } from '$lib/mocks/elaun/categories';
    import { mockAllEmployeeAllowances } from '$lib/mocks/elaun/mockAllEmployeeAllowances';
    import { status } from '$lib/mocks/status/status';
    import { selectedRecordId } from '$lib/stores/globalState';

    let selectedAllowance: any = 'Semua';
    let selectedStatus: any = 'all';

    let currentData: IntAllEmployeeAllowances;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Elaun - Elaun Perkhidmatan"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
    ></ContentHeader>
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
                label="Jenis Elaun"
                selectedVal={selectedAllowance}
                options={categories}
            ></FilterSelectInput>
            <FilterDateSelector label="Tarikh Mohon" handleDateChange
            ></FilterDateSelector>
            <FilterSelectInput
                label="Status"
                selectedVal={selectedStatus}
                options={status}
            ></FilterSelectInput>
        </FilterContainer>
    </div>
    <SectionHeader title="Senarai Rekod Permohonan"
        ><FormButton type="not-support"></FormButton><FormButton type="support"
        ></FormButton></SectionHeader
    >
    <DynamicTable
        hasCheckbox
        bind:passData={currentData}
        tableItems={mockAllEmployeeAllowances}
        columnKeys={[
            'employeeNumber',
            'employeeName',
            'identityDocumentNumber',
            'allowanceType',
            'applicationDate',
            'approvedDate',
            'status',
            'remarks',
        ]}
        withActions
        actionOptions={['detail']}
        detailActions={() => {
            selectedRecordId.set(currentData.id);
            goto('butiran-permohonan');
        }}
    ></DynamicTable>
</section>
