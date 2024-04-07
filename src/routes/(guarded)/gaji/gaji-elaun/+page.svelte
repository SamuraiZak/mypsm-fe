<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { kgtMonthLookup } from '$lib/constants/core/dropdown.constant';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { SalaryAllowanceList } from '$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-list.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let rowData: SalaryAllowanceList;
    let salaryAllowanceTable: TableDTO = {
        param: data.param,
        meta: data.salaryAllowanceListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.salaryAllowanceList ?? [],
        hiddenData: ['employeeId'],
    };
    async function _search() {
        _updateTable(salaryAllowanceTable.param).then((value) => {
            salaryAllowanceTable.data =
                value.props.response.data?.dataList ?? [];
            salaryAllowanceTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            salaryAllowanceTable.param.pageSize = value.props.param.pageSize;
            salaryAllowanceTable.param.pageNum = value.props.param.pageNum;
            salaryAllowanceTable.hiddenData = ['employeeId'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Gaji dan Elaun" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={_search}>
            <FilterSelectField label="Bulan" options={kgtMonthLookup} bind:inputValue={salaryAllowanceTable.param.filter.month} />
            <FilterTextField
                label="Tahun"
                bind:inputValue={salaryAllowanceTable.param.filter.year}
            />
        </FilterCard>

        <CustomTable
            title="Senarai Kakitangan"
            bind:tableData={salaryAllowanceTable}
            bind:passData={rowData}
            onUpdate={_search}
            enableDetail
            detailActions={() => goto('/gaji/gaji-elaun/' + rowData.employeeId + '-' + salaryAllowanceTable.param.filter.month + '-' + salaryAllowanceTable.param.filter.year)}
        />
    </div>
</section>
