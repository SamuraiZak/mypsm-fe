<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
    let rowData: ProceedingChargeDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    // Table list - new application view for secretary role
    let proceedingTable: TableDTO = {
        param: param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.list.proceedingList as ProceedingChargeListResponseDTO) ?? [],
        hiddenData: ['id'],
    };

    async function _updateProceedingTable() {
        _updateTable(proceedingTable.param).then((value) => {
            proceedingTable.data = value.response.data?.dataList ?? [];
            proceedingTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            proceedingTable.param.pageSize = proceedingTable.meta.pageSize;
            proceedingTable.param.pageNum = proceedingTable.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tambah Rekod Prosiding"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <ContentHeader title="" borderClass="border-none">
            <TextIconButton
                label="Kembali"
                type="neutral"
                onClick={() => {
                    goto('../prosiding');
                }}
            />
        </ContentHeader>
        <!-- Table filter placeholder -->
        <FilterCard onSearch={_updateProceedingTable}>
            <FilterSelectField
                label="Status"
                options={data.selectionOptions.statusLookup}
                bind:inputValue={proceedingTable.param.filter.status}
            ></FilterSelectField>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Pekerja"
                onUpdate={_updateProceedingTable}
                enableSelect
                bind:tableData={proceedingTable}
                bind:passData={rowData}
                selectActions={() => {
                    const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}`;

                    goto(route);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
