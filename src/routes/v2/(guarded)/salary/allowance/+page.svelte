<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { monthNumberLookup } from '$lib/constants/core/dropdown.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { SalaryAllowanceList } from '$lib/dto/mypsm/gaji/gaji-elaun/salary-allowance-list.dto';
    import type { PageData } from './$types';
    export let data: PageData;

    let rowData: SalaryAllowanceList;
    let salaryAllowanceTable: TableSettingDTO = {
        param: data.param,
        meta: data.salaryAllowanceListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.salaryAllowanceList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
        dictionary: [],
        url: 'salary/allowance/list',
        id: 'finalPayslipTable',
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
    <ContentHeader title="Gaji dan Elaun" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <div class="h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={salaryAllowanceTable}
                bind:passData={rowData}
                detailActions={() =>
                    goto(
                        '/v2/salary/allowance/' +
                            rowData.employeeId +
                            '-' +
                            salaryAllowanceTable.param.filter.month +
                            '-' +
                            salaryAllowanceTable.param.filter.year,
                    )}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={salaryAllowanceTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Bulan"
                        options={monthNumberLookup}
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .month}
                    />
                    <FilterTextField
                        label="Tahun"
                        bind:inputValue={salaryAllowanceTable.param.filter.year}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
