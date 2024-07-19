<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicPanelTreatmentBillList } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-bill-list.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
    let rowData: ClinicPanelTreatmentBillList;
    let treatmentBillTable: TableSettingDTO = {
        param: data.param,
        meta: data.treatmentBillResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.treatmentBills ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['patientId', 'claimId', 'employeeId'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url:'medical/clinic/treatment_bill/get',
        id: 'treatmentBillTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Bil Rawatan">
        <TextIconButton
            label="Tambah Tuntutan"
            icon="add"
            onClick={() => goto('/klinik-panel/maklumat-bil-rawatan/baru')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Bil Rawatan"
                bind:tableData={treatmentBillTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto('./maklumat-bil-rawatan/butiran/'+rowData.employeeId+'-'+rowData.claimId);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={treatmentBillTable.param.filter.employeeName}
                    />
                    <FilterTextField
                        label="Nama Pesakit"
                        bind:inputValue={treatmentBillTable.param.filter.patientName}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
