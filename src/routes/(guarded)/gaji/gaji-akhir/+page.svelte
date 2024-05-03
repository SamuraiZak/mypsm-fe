<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type {
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { FinalPayslipList } from '$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto';
    import type { PageData } from './$types';
    export let data: PageData;

    let rowData = {} as FinalPayslipList;
    let finalPayslipTable: TableSettingDTO = {
        param: data.param,
        meta: data.finalPayslipListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.finalPayslipList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'icNumber',
                malay: 'No. Kad Pengenalan'
            },
            {
                english: 'allowances',
                malay: 'Elaun'
            },
        ],
        url: 'salary/final_payslip/list',
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
    <ContentHeader title="Gaji Akhir" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <div class="h-fit w-full">
            <DataTable
                title="Rekod Gaji Akhir"
                bind:tableData={finalPayslipTable}
                bind:passData={rowData}
                detailActions={() => goto('./gaji-akhir/' + rowData.id)}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={finalPayslipTable.param.filter
                            .employeeNumber}
                    />
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={finalPayslipTable.param.filter.name}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={finalPayslipTable.param.filter
                            .identityCardNumber}
                    />
                    <FilterTextField
                        label="Status"
                        bind:inputValue={finalPayslipTable.param.filter.status}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>
