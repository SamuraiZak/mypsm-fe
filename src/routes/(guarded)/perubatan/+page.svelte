<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import { _updateAllocationTable, _updateClaimTable } from './+page';
    import type { MedicalClaimAllocationList } from '$lib/dto/mypsm/perubatan/medical-claim-allocation-list.dto';

    export let data: PageData;
    let rowData: MedicalClaimAllocationList;
    let medicalClaimTable: TableDTO = {
        param: data.param,
        meta: data.medicalClaimListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.medicalClaimList ?? [],
        hiddenData: ['medicalClaimId'],
    };
    async function _searchClaimTable() {
        _updateClaimTable(medicalClaimTable.param).then((value) => {
            medicalClaimTable.data = value.props.response.data?.dataList ?? [];
            medicalClaimTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            medicalClaimTable.param.pageSize = value.props.param.pageSize;
            medicalClaimTable.param.pageNum = value.props.param.pageNum;
            medicalClaimTable.hiddenData = ['medicalClaimId'];
        });
    }

    let medicalClaimAllocationTable: TableDTO = {
        param: data.param,
        meta: data.allocationListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.allocationList ?? [],
        hiddenData: ['id'],
    };
    async function _searchAllocationTable() {
        _updateAllocationTable(medicalClaimAllocationTable.param).then(
            (value) => {
                medicalClaimAllocationTable.data =
                    value.props.response.data?.dataList ?? [];
                medicalClaimAllocationTable.meta = value.props.response.data
                    ?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };
                medicalClaimAllocationTable.param.pageSize =
                    value.props.param.pageSize;
                medicalClaimAllocationTable.param.pageNum =
                    value.props.param.pageNum;
                medicalClaimAllocationTable.hiddenData = ['id'];
            },
        );
    }
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
                <!-- <FilterCard>
                    <FilterTextField label="Nama" inputValue={''} />
                </FilterCard> -->
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
                <CustomTable
                    tableId="claimTable"
                    title="Senarai Rekod Tuntutan"
                    onUpdate={_searchClaimTable}
                    bind:tableData={medicalClaimTable}
                />
            </div>
        </CustomTabContent>

        <CustomTabContent title="Perkhidmatan">
            <div class="flex w-full flex-col justify-start gap-5 p-5">
                <CustomTable
                    tableId="claimAllocationTable"
                    title="Senarai Baki Peruntukan Perubatan"
                    bind:tableData={medicalClaimAllocationTable}
                    bind:passData={rowData}
                    onUpdate={_searchAllocationTable}
                    enableDetail
                    detailActions={() =>
                        goto(
                            '/perubatan/bil-tuntutan-kakitangan/pembayaran/' +
                                rowData.id,
                        )}
                />
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
