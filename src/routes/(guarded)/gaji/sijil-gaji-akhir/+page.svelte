<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import type { commonIdRequestDTO } from '$lib/dto/core/common/id-request.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { FinalPayslipList } from '$lib/dto/mypsm/gaji/gaji-akhir/final-payslip-list.dto';
    import type { Finalpayslip } from '$lib/dto/mypsm/gaji/gaji-akhir/finalpayslip.dto';
    import { SalaryServices } from '$lib/services/implementation/mypsm/gaji/salary.service';
    import type { PageData } from './$types';
    import { Alert, Modal } from 'flowbite-svelte';
    export let data: PageData;

    let rowData = {} as FinalPayslipList;
    let isOpen: boolean = false;
    let currentId: commonIdRequestDTO = {
        id: 0,
    };
    let employeeFinalpayslip = {} as Finalpayslip;

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
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'allowances',
                malay: 'Elaun',
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

    async function getPayslip() {
        const employeeFinalpayslipResponse: CommonResponseDTO =
            await SalaryServices.getFinalpayslip(currentId);
        employeeFinalpayslip = employeeFinalpayslipResponse.data
            ?.details as Finalpayslip;

        const anchor = document.createElement('a');
        anchor.href = employeeFinalpayslip.document;
        anchor.target = '_blank';
        anchor.download = 'Slip Gaji Akhir - ' + rowData.name;
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
        <div class="h-fit w-full">
            <DataTable
                title="Rekod Sijil Gaji Akhir"
                bind:tableData={finalPayslipTable}
                bind:passData={rowData}
                detailActions={() => (isOpen = true)}
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
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>

<Modal
    title={rowData?.name}
    size="sm"
    outsideclose
    dismissable={false}
    bind:open={isOpen}
>
    <Alert color="blue">
        <p>
            <span class="font-medium">Arahan: </span>
            Muat turun Sijil Gaji Akhir kakitangan.
        </p>
    </Alert>
    <div class="flex w-full gap-3 justify-center">
        <TextIconButton
            label="Muat Turun"
            onClick={async () => {
                currentId.id = rowData.id;
                await getPayslip();
            }}
        />
        <TextIconButton
            label="Kembali"
            type="neutral"
            onClick={() => {
                isOpen = false;
            }}
        />
    </div>
</Modal>
