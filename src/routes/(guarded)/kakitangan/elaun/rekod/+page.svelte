<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { categories } from '$lib/mocks/elaun/categories';
    import { mockEmployeeAllowanceList } from '$lib/mocks/elaun/mockEmployeeAllowanceList';
    import { status } from '$lib/mocks/status/status';
    import { currencyFormatter } from '$lib/service/services';

    let selectedCategory: string = 'all';
    let currEmpAllowanceRec = mockEmployeeAllowanceList.filter(
        (e) => e.employeeNumber === '00001',
    );
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Elaun Kakitangan"
        description="Senarai elaun yang telah diambil oleh kakitangan"
    >
        <FormButton
            type="new-application"
            onClick={() => {
                goto('permohonan');
            }}
        />
    </ContentHeader>
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-2.5"
    >
        <FilterCard>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="Nama Kakitangan"></FilterTextInput>
            <FilterTextInput label="Jumlah (RM)" value={0}></FilterTextInput>
            <FilterSelectInput
                label="Status"
                options={status}
                selectedVal={selectedCategory}
            ></FilterSelectInput>
            <FilterDateSelector handleDateChange label="Tarikh Mohon"
            ></FilterDateSelector>
        </FilterCard>
    </div>

    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
    >
        <SectionHeader title="Senarai Elaun Kakitangan"></SectionHeader>
        <DynamicTable
            tableItems={currEmpAllowanceRec}
            columnKeys={[
                'employeeNumber',
                'fullName',
                'identityDocumentNumber',
                'category',
                'applicationDate',
                'amount',
                'status',
            ]}
            withActions
            actionOptions={['detail']}
            detailActions={() => {}}
        ></DynamicTable>
    </div>
</section>
