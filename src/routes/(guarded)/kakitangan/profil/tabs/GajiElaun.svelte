<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from '../$types';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { _updateSalaryAllowanceTable } from '../+page';

    export let data: PageData;
    console.log([data.personalDetailResponse]);

    let param: CommonListRequestDTO = data.param;

    let table: TableDTO = {
        param: param,
        meta: data.personalSalaryAllowanceResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.personalSalaryAllowanceList ?? [],
    };

    async function _search() {
        _updateSalaryAllowanceTable(table.param).then((value) => {
            table.data = value.props.response.data?.dataList ?? [];
            table.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
</script>

<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <SectionHeader title="Senarai gaji & Elaun Mengikut Bulan"></SectionHeader>
    <CustomTable onUpdate={_search} bind:tableData={table}></CustomTable>
</div>
