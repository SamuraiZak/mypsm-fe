<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { ClinicPanelClaimHistory } from '$lib/dto/mypsm/perubatan/clinic-panel-claim-history.dto';
    import { goto } from '$app/navigation';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    export let data: PageData;

    let rowData = {} as ClinicPanelClaimHistory;
    let claimHistoryTable: TableSettingDTO = {
        param: data.param,
        meta: data.claimHistoryListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.claimHistoryList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['claimId', 'employeeId'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama',
            },
        ],
        url:'medical/clinic_panel/history/list',
        id: 'employeeListTable',
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
    <ContentHeader title="Sejarah Tuntutan"></ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <!-- <CustomTable
            title="Senarai Rekod"
            onUpdate={_searchTable}
            bind:tableData={claimHistoryTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() => goto('/klinik-panel/sejarah-tuntutan/butiran/'+rowData.employeeId+'-'+rowData.claimId)}
        /> -->
        <div class="h h-fit w-full">
            <DataTable
                title="Rekod Sejarah Tuntutan"
                bind:tableData={claimHistoryTable}
                bind:passData={rowData}
                detailActions={() => {
                    goto('/klinik-panel/sejarah-tuntutan/butiran/'+rowData.employeeId+'-'+rowData.claimId);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={claimHistoryTable.param.filter.name}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={claimHistoryTable.param.filter.identityDocumentNumber}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
