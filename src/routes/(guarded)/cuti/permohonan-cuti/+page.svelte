<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { ProgramDropdownConstant } from '$lib/constants/dropdown/program.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateLeaveHistoryTable } from './+page';

    export let data: PageData;

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
        _updateLeaveHistoryTable(leaveHistoryTable.param).then((value) => {
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
    <ContentHeader title="Permohonan Cuti">
        <TextIconButton
            label="Permohonan Baru"
            icon="add"
            onClick={() => {
                goto('/cuti/permohonan-cuti/baru');
            }}
        ></TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->

        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <div
                class="flex h-fit min-h-fit w-full flex-row gap-2 rounded bg-blue-100 p-2"
            >
                <div
                    class="flex h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 flex-col items-center justify-start"
                >
                    <span
                        class="flex h-5 w-full flex-col items-center justify-center text-center align-middle text-ios-systemColors-systemBlue-light"
                    >
                        <SvgInfoSolid></SvgInfoSolid>
                    </span>
                </div>
                <div
                    class="flex h-fit min-h-5 w-full flex-col items-start justify-start gap-2"
                >
                    <span
                        class="flex h-fit min-h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-semibold text-ios-systemColors-systemBlue-light"
                    >
                        Sila pilih permohonan cuti dari senarai berikut untuk
                        melihat butiran
                    </span>
                </div>
            </div>
            <FilterCard onSearch={_leaveHistorysearch}>
                {#if data.props.currentRoleCode !== UserRoleConstant.kakitangan.code}
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={leaveHistoryTable.param.filter.name}
                    ></FilterTextField>
                {/if}
                <FilterSelectField
                    label="Tahun"
                    options={data.props.yearDropdownList}
                    bind:inputValue={leaveHistoryTable.param.filter.year}
                ></FilterSelectField>
                <FilterSelectField
                    label="Status"
                    options={data.props.leaveStatusDropdownList}
                    bind:inputValue={leaveHistoryTable.param.filter.status}
                ></FilterSelectField>
            </FilterCard>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    tableId="leaveHistoryTable"
                    title="Senarai Permohonan Cuti"
                    bind:tableData={leaveHistoryTable}
                    onUpdate={_leaveHistorysearch}
                    enableDetail
                ></CustomTable>
            </div>
        </div>
    </div>
</section>
