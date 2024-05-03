<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    // set variable to select the data row
    let selectedData: any;

    // set the table
    let leaveListTable: TableSettingDTO = {
        param: data.props.leaveListRequest,
        meta: data.props.leaveListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.leaveListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['hrmisLeaveId', 'employeeNo'],
        dictionary: [
            {
                english: 'leaveRequestDate',
                malay: 'Tarikh Permohonan',
            },
            {
                english: 'approverName',
                malay: 'Nama Pelulus',
            },
        ],
        url: 'leave/hrmis/leave',
        id: 'leaveListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter:
                data.props.currentRoleCode !== UserRoleConstant.kakitangan.code,
        },
        controls: {
            add: false,
        },
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Cuti Rehat, Kecemasan dan Sakit (HRMIS)"
        ></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Permohonan Cuti Dari HRMIS"
                bind:tableData={leaveListTable}
                bind:passData={selectedData}
            >
                <FilterWrapper slot="filter">
                    {#if data.props.currentRoleCode !== UserRoleConstant.kakitangan.code}
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={leaveListTable.param.filter
                                .staffName}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={leaveListTable.param.filter
                                .identityCard}
                        ></FilterTextField>
                    {/if}
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
