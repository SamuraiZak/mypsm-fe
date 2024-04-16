<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { ClinicPanelClaimHistory } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-history.dto';
    import { goto } from '$app/navigation';
    import { _updateTable } from './+page';
    export let data: PageData;

    let rowData = {} as ClinicPanelClaimHistory;
    let claimHistoryTable: TableDTO = {
        param: data.param,
        meta: data.claimHistoryListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.claimHistoryList ?? [],

        hiddenData: ['claimId', 'employeeId']
    }

    async function _searchTable() {
        _updateTable(claimHistoryTable.param).then((value) => {
            claimHistoryTable.data = value.props.response.data?.dataList ?? [];
            claimHistoryTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            claimHistoryTable.param.pageSize = value.props.param.pageSize;
            claimHistoryTable.param.pageNum = value.props.param.pageNum;
            claimHistoryTable.hiddenData = ['claimId', 'employeeId'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sejarah Tuntutan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <!-- <FilterCard onSearch={_searchTable}>
            <FilterTextField label="Nama Pekerja" inputValue={claimHistoryTable.param.filter.employeeName} />
            <FilterTextField label="Nama Pesakit" inputValue={claimHistoryTable.param.filter.ICNumber} />
            <FilterTextField label="Kad Pengenalan" inputValue={claimHistoryTable.param.filter.LKIMOffice} />
        </FilterCard> -->

        <CustomTable
            title="Senarai Rekod"
            onUpdate={_searchTable}
            bind:tableData={claimHistoryTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() => goto('/klinik-panel/sejarah-tuntutan/butiran/'+rowData.employeeId+'-'+rowData.claimId)}
        />
    </div>
</section>
