<script lang="ts">
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateChargeAppealTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';

    export let data: LayoutData;
    let rowData: ProceedingChargeDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    // Table list - Charge Table
    let proceedingChargeAppealTable: TableDTO = {
        param: param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.list.proceedingList as ProceedingChargeListResponseDTO) ?? [],
        hiddenData: ['integrityId', 'employeeId'],
    };

    async function _updateProceedingChargeAppealTable() {
        _updateChargeAppealTable(proceedingChargeAppealTable.param).then((value) => {
            proceedingChargeAppealTable.data = value.response.data?.dataList ?? [];
            proceedingChargeAppealTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            proceedingChargeAppealTable.param.pageSize =
                proceedingChargeAppealTable.meta.pageSize;
            proceedingChargeAppealTable.param.pageNum =
                proceedingChargeAppealTable.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Prosiding Tatatertib - Rayuan"></ContentHeader>
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
        <FilterCard onSearch={_updateProceedingChargeAppealTable}>
            <FilterSelectField
                label="Status"
                options={data.selectionOptions.statusLookup}
                bind:inputValue={proceedingChargeAppealTable.param.filter.status}
            ></FilterSelectField>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Rekod Prosiding - Pertuduhan/Hukuman"
                onUpdate={_updateProceedingChargeAppealTable}
                enableDetail
                bind:tableData={proceedingChargeAppealTable}
                bind:passData={rowData}
                detailActions={() => {
                    const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                    goto(route);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
