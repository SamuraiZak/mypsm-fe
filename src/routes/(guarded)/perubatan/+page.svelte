<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type {
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type { MedicalClaimAllocationList } from '$lib/dto/mypsm/perubatan/medical-claim-allocation-list.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: PageData;
    let rowData: MedicalClaimAllocationList;
    let medicalClaimTable: TableSettingDTO = {
        param: data.param,
        meta: data.medicalClaimListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.medicalClaimList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['medicalClaimId'],
        dictionary: [],
        url: 'medical/employee_claim/list',
        id: 'medicalClaimTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
    let medicalClaimAllocationTable: TableSettingDTO = {
        param: data.param,
        meta: data.allocationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.allocationList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [],
        url: 'medical/payment/list',
        id: 'medicalClaimAllocationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Perubatan" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Tuntutan Perubatan">
            <div class="flex w-full flex-col justify-start gap-5 p-5">
                <div class="flex w-full items-end justify-end">
                    <TextIconButton
                        label="Tuntutan Baru"
                        icon="add"
                        onClick={() => {
                            goto(
                                '/perubatan/baru/' +
                                    data.currentEmployeeDetail.employeeId,
                            );
                        }}
                    />
                </div>
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Rekod Tuntutan"
                        bind:tableData={medicalClaimTable}
                    >
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>

        <CustomTabContent title="Perkhidmatan">
            <div class="flex w-full flex-col justify-start gap-5 p-5">
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Baki Peruntukan Perubatan"
                        bind:tableData={medicalClaimAllocationTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                '/perubatan/bil-tuntutan-kakitangan/pembayaran/' +
                                    rowData.id,
                            );
                        }}
                    ></DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
