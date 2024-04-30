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
    let applicationListTable: TableSettingDTO = {
        param: data.props.applicationListRequest,
        meta: data.props.applicationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.applicationListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['leaveId', 'employeeNumber', 'leaveCode'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'durationDays',
                malay: 'Jumlah Hari',
            },
        ],
        url: 'leave/application_list',
        id: 'leaveApplicationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.props.currentRoleCode == UserRoleConstant.kakitangan.code,
        },
    };

    function addApplication() {
        let url = '/cuti/permohonan_cuti/baru';

        goto(url);
    }

    function viewDetails() {
        let currentType: LookupDTO =
            LeaveTypeConstant.list.find(
                (item) => item.code == selectedData.leaveCode,
            ) ?? LeaveTypeConstant.unrecordedLeave;

        let url =
            '/cuti/permohonan_cuti/' +
            currentType.description +
            '/' +
            selectedData.leaveId;

        goto(url);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Permohonan Cuti"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Permohonan Cuti"
                bind:tableData={applicationListTable}
                bind:passData={selectedData}
                addActions={() => {
                    addApplication();
                }}
                detailActions={() => {
                    viewDetails();
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={applicationListTable.param.filter.year}
                    ></FilterNumberField>

                    {#if data.props.currentRoleCode !== UserRoleConstant.kakitangan.code}
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={applicationListTable.param.filter
                                .employeeName}
                        ></FilterTextField>
                    {/if}
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
