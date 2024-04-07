<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicPanelTreatmentBillList } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-bill-list.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
    let rowData: ClinicPanelTreatmentBillList;
    let treatmentBillTable: TableDTO = {
        param: data.param,
        meta: data.treatmentBillResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.treatmentBills ?? [],
        hiddenData: ['patientId', 'claimId', 'employeeId'],
    };

    async function _searchTable() {
        _updateTable(treatmentBillTable.param).then((value) => {
            treatmentBillTable.data = value.props.response.data?.dataList ?? [];
            treatmentBillTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            treatmentBillTable.param.pageSize = value.props.param.pageSize;
            treatmentBillTable.param.pageNum = value.props.param.pageNum;
            treatmentBillTable.hiddenData = ['patientId', 'claimId', 'employeeId'];
        });
    }
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
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="Nama Pekerja" inputValue={''} />
            <FilterTextField label="Nama Pesakit" inputValue={''} />
            <FilterTextField label="No. Kad Pengenalan" inputValue={''} />
            <FilterTextField label="Status" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Senarai Bil Rawatan"
            bind:tableData={treatmentBillTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() =>
                goto('./maklumat-bil-rawatan/butiran/'+rowData.employeeId+'-'+rowData.claimId)
            }
            onUpdate={_searchTable}
        />
    </div>
</section>
