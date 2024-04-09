<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { FinalPayslipList } from '$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto';
    import type { Finalpayslip } from '$lib/dto/mypsm/gaji/gaji-akhir/finalpayslip.dto';
    import { SalaryServices } from '$lib/services/implementation/mypsm/gaji/salary.service';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let rowData = {} as FinalPayslipList;
    let currentId: commonIdRequestDTO = {
        id: 0,
    };
    let employeeFinalpayslip = {} as Finalpayslip;

    let finalPayslipTable: TableDTO = {
        param: data.param,
        meta: data.finalPayslipListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
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
    async function getPayslip() {
        const employeeFinalpayslipResponse: CommonResponseDTO =
            await SalaryServices.getFinalpayslip(currentId);
        employeeFinalpayslip = employeeFinalpayslipResponse.data
            ?.details as Finalpayslip;

        const anchor = document.createElement('a');
        anchor.href = employeeFinalpayslip.document;
        anchor.target = '_blank';
        anchor.download = "Slip Gaji Akhir - "+rowData.name;
        anchor.click();
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Sijil Gaji Akhir" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={_search}>
            <FilterTextField label="Nama" bind:inputValue={finalPayslipTable.param.filter.name} />
            <FilterTextField label="No. Pekerja" bind:inputValue={finalPayslipTable.param.filter.employeeNumber} />
            <FilterTextField label="No. Kad Pengenalan" bind:inputValue={finalPayslipTable.param.filter.identityCardNumber} />
        </FilterCard>

        <CustomTable
            title="Rekod Sijil Gaji Akhir"
            bind:tableData={finalPayslipTable}
            bind:passData={rowData}
            onUpdate={_search}
            enableDetail
            detailActions={async () => {
                currentId.id = rowData.id;
                await getPayslip();
            }}
        />
    </div>
</section>
