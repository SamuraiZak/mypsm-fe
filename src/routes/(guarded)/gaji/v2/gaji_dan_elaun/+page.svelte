<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import OnlyTable from '$lib/components/table/OnlyTable.svelte';
    import {
        monthNumberLookup,
        statuDropdownOption,
    } from '$lib/constants/core/dropdown.constant';
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
        dictionary: [
            {
                english: 'icNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'allowances',
                malay: 'Elaun',
            },
        ],
        url: 'salary/allowance/list',
        id: 'finalPayslipTable',
        option: {
            checkbox: true,
            detail: true,
            edit: true,
            select: true,
            filter: true,
        },
        controls: {
            add: true,
            pdf: true,
            excel: true,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Gaji dan Elaun" />
</section>
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <div class="h-fit w-full">
            <DataTable
                title="Senarai Kakitangan Dengan Perubahan Gaji"
                bind:tableData={salaryAllowanceTable}
                bind:passData={rowData}
                detailActions={() =>
                    goto(
                        '/gaji/gaji-elaun/' +
                            rowData.employeeId +
                            '-' +
                            salaryAllowanceTable.param.filter.month +
                            '-' +
                            salaryAllowanceTable.param.filter.year,
                    )}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={salaryAllowanceTable.param.filter.name}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .icNumber}
                    />
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .employeeNumber}
                    />
                    <FilterTextField
                        label="Tahun"
                        bind:inputValue={salaryAllowanceTable.param.filter.year}
                    />
                    <FilterSelectField
                        label="Bulan"
                        options={monthNumberLookup}
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .month}
                    />
                    <FilterSelectField
                        label="Status"
                        options={statuDropdownOption}
                        bind:inputValue={salaryAllowanceTable.param.filter
                            .status}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
