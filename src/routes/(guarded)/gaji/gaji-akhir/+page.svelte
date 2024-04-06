<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { FinalPayslipList } from '$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let rowData = {} as FinalPayslipList;
    let finalPayslipTable: TableDTO = {
        param: data.param,
        meta: data.finalPayslipListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.finalPayslipList ?? [],
        hiddenData: ['id'],
    };

    async function _search() {
        _updateTable(finalPayslipTable.param).then((value) => {
            finalPayslipTable.data = value.props.response.data?.dataList ?? [];
            finalPayslipTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            finalPayslipTable.param.pageSize = value.props.param.pageSize;
            finalPayslipTable.param.pageNum = value.props.param.pageNum;
            finalPayslipTable.hiddenData = ['id'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Gaji Akhir" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={_search}>
            <FilterTextField
                label="No. Pekerja"
                bind:inputValue={finalPayslipTable.param.filter.employeeNumber}
            />
            <FilterTextField
                label="Nama"
                bind:inputValue={finalPayslipTable.param.filter.name}
            />
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={finalPayslipTable.param.filter.identityCardNumber}
            />
            <!-- <FilterTextField
                label="Jenis Persaraan"
                bind:inputValue={finalPayslipTable.param.filter.retirementType}
            /> -->
            <FilterTextField
                label="Status"
                bind:inputValue={finalPayslipTable.param.filter.status}
            />
        </FilterCard>

        <CustomTable
            title="Rekod Sijil Gaji Akhir"
            bind:tableData={finalPayslipTable}
            bind:passData={rowData}
            onUpdate={_search}
            enableDetail
            detailActions={() => goto('./gaji-akhir/'+rowData.id)}
        />
    </div>
</section>
