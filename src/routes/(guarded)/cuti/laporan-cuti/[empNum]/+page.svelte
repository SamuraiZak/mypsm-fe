<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    let leaveEntitlementTableParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 50,
        orderBy: null,
        orderType: null,
        filter: data.props.leaveEntitlementRequestParam,
    };

    let leaveEntitlementTable: TableDTO = {
        param: data.props.leaveEntitlementRequestBody,
        meta: {
            pageSize: leaveEntitlementTableParam.pageSize ?? 50,
            pageNum: leaveEntitlementTableParam.pageNum ?? 1,
            totalData: 50,
            totalPage: 1,
        },
        data: data.props.leaveEntitlement,
    };

    let leaveHistoryTableParam: CommonListRequestDTO = {
        pageNum: 1,
        pageSize: 50,
        orderBy: null,
        orderType: null,
        filter: data.props.leaveHistoryRequestParam,
    };

    let leaveHistoryTable: TableDTO = {
        param: data.props.leaveHistoryRequestBody,
        meta: data.props.leaveHistoryResponse.data?.meta ?? {
            pageSize: leaveHistoryTableParam.pageSize ?? 50,
            pageNum: leaveHistoryTableParam.pageNum ?? 1,
            totalData: 50,
            totalPage: 1,
        },
        data: data.props.leaveHistory,
        hiddenData: ['employeeId'],
    };

    async function _leaveHistorysearch() {
        _updateTable(leaveHistoryTable.param).then((value) => {
            leaveHistoryTable.data = value.props.response.data?.dataList ?? [];
            leaveHistoryTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            leaveHistoryTable.param.pageSize = leaveHistoryTable.meta.pageSize;
            leaveHistoryTable.param.pageNum = leaveHistoryTable.meta.pageNum;
        });
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Cuti">
        {#if data.props.currentRoleCode === UserRoleConstant.urusSetiaCuti.code}
            <TextIconButton
                label="Kembali"
                icon="previous"
                onClick={() => {
                    goto('/cuti/laporan-cuti');
                }}
            ></TextIconButton>
        {/if}
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex h-fit w-full flex-col p-2.5">
        <div class="flex h-fit w-full flex-col rounded bg-blue-100 p-2.5">
            <div
                class="flex h-7 w-full flex-row items-center justify-start gap-2"
            >
                <span class="w-40 min-w-40 text-base font-medium"
                    >Nama Kakitangan:</span
                >
                <span class="w-full text-base font-normal"
                    >{TextAppearanceHelper.toProper(
                        data.props.employeeDetail.name,
                    )}</span
                >
            </div>
            <div
                class="flex h-7 w-full flex-row items-center justify-start gap-2"
            >
                <span class="w-40 min-w-40 text-base font-medium"
                    >No. Pekerja:</span
                >
                <span class="w-full text-base font-normal"
                    >{TextAppearanceHelper.toProper(
                        data.props.employeeDetail.employeeNumber,
                    )}</span
                >
            </div>
            <div
                class="flex h-7 w-full flex-row items-center justify-start gap-2"
            >
                <span class="w-40 min-w-40 text-base font-medium"
                    >No. Kad Pengenalan:</span
                >
                <span class="w-full text-base font-normal"
                    >{TextAppearanceHelper.toProper(
                        data.props.employeeDetail.identityCard,
                    )}</span
                >
            </div>
        </div>
    </div>
    <CustomTab>
        <CustomTabContent title="Senarai Peruntukan Cuti">
            <div
                class=" flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                >
                    <div class="h-fit max-h-full w-full pb-2">
                        <CustomTable
                            tableId="leaveEntitlementTable"
                            title="Senarai Peruntukan Cuti"
                            bind:tableData={leaveEntitlementTable}
                            onUpdate={() => {}}
                            hiddenFooter
                        ></CustomTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Senarai Sejarah Permohonan Cuti">
            <div
                class=" flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
                >
                    <div class="h-fit max-h-full w-full pb-2">
                        <CustomTable
                            tableId="leaveHistoryTable"
                            title="Senarai Sejarah Permohonan Cuti"
                            bind:tableData={leaveHistoryTable}
                            onUpdate={_leaveHistorysearch}
                            enableDetail
                        ></CustomTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
