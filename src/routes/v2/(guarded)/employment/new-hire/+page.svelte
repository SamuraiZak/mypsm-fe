<script lang="ts">
    import { error } from '@sveltejs/kit';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { LayoutData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _updateApproverViewTable,
        _updateCandidateViewTable,
        _updateSubmittedListTable,
        _updateSupporterViewTable,
        _updateTable,
    } from './+layout';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { getErrorToast } from '$lib/helpers/core/toast.helper';
    import type { CandidateIDRequestBody } from '$lib/dto/core/common/candidate-id-request.view-dto';

    export let data: LayoutData;
    let rowData: any;

    // Table list - new application view for secretary role
    let notCompletedTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.newCandidateResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.newCandidateResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [],
        url: 'employment/new_hire/list',
        id: 'notCompletedTable',
        option: {
            checkbox: false,
            detail: false,
            edit: true,
            select: false,
            filter: true,
        },
        controls: {
            add: data.roles.isEmploymentSecretaryRole,
        },
    };

    // Table list - submitted view for secretary role
    let submittedListTable: TableSettingDTO = {
        param: data.submittedTableParam,
        meta: data.responses.submittedFormResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.submittedFormResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [],
        url: 'employment/new_hire/list',
        id: 'submittedListTable',
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

    // Table list - for supporter role
    let supporterViewTable: TableSettingDTO = {
        param: data.allNewHireTableParam,
        meta: data.responses.supporterViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.supporterViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [],
        url: 'employment/new_hire/get_supporter_approval/list',
        id: 'supporterViewTable',
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

    // Table list - for approver role
    let approverViewTable: TableSettingDTO = {
        param: data.allNewHireTableParam,
        meta: data.responses.approverViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.approverViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId'],
        dictionary: [],
        url: 'employment/new_hire/get_approver_approval/list',
        id: 'approverViewTable',
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

    // Table list - New Hire Candidate
    let newCandidateListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.candidateViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.candidateViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'meetingNo',
                malay: 'Nombor Mesyuarat',
            },
        ],
        url: '',
        id: 'newCandidateListTable',
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

    const checkIfFail = async (id: number) => {
        const candidateIdRequestBody: CandidateIDRequestBody = {
            id: Number(id),
        };

        const newHireFullDetailResponse: CommonResponseDTO =
            await EmploymentServices.getNewHireFullDetail(
                candidateIdRequestBody,
            );

        if (newHireFullDetailResponse.status === 'error') {
            getErrorToast(
                'Harap Maklum. Tiada maklumat dijumpai pada masa ini. Sila laporkan kepada admin sistem.',
            );
            error(500, {
                message: newHireFullDetailResponse.message as string,
            });
        }

        const route = `./new-hire/new-hire-detail/${rowData.applicationId}-${rowData.status}`;
        goto(route);
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Lantikan Baharu Kakitangan Tetap"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.roles.currentRoleCode == UserRoleConstant.calon.code}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <DataTable
                title="Senarai Baharu Pelantikan Baharu"
                bind:tableData={newCandidateListTable}
                bind:passData={rowData}
                detailActions={() => {
                    checkIfFail(rowData.applicationId);
                }}
            >
                <FilterWrapper slot="filter">
                    <!-- <FilterTextField
                        label="Nama Mesyuarat"
                        bind:inputValue={newCandidateListTable.param.filter
                            .meetingName}
                    ></FilterTextField> -->
                    <!-- <FilterDateField
                            label="Tarikh Mesyuarat"
                            bind:inputValue={newCandidateListTable.param
                                .filter.meetingDate}
                        ></FilterDateField> -->
                    <!-- <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={newCandidateListTable.param.filter
                            .status}
                    ></FilterSelectField> -->
                </FilterWrapper>
            </DataTable>
        </div>
    {:else if data.roles.isEmploymentSecretaryRole}
        <CustomTab>
            <CustomTabContent title="Senarai Rekod Selesai Diisi">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <DataTable
                        title="Senarai Lantikan Baharu"
                        bind:tableData={submittedListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            checkIfFail(rowData.applicationId);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="ID Sementara"
                                bind:inputValue={submittedListTable.param.filter
                                    .temporaryId}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama"
                                bind:inputValue={submittedListTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={submittedListTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={submittedListTable.param.filter
                                    .status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </CustomTabContent>
            <CustomTabContent
                title="Senarai Rekod Penambahan Calon Lantikan Baharu"
            >
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <DataTable
                        title="Senarai Calon Yang Belum Melengkapkan e-Borang Lantikan Baharu"
                        bind:tableData={notCompletedTable}
                        bind:passData={rowData}
                        editActions={() => {
                            goto(
                                `./new-hire/add-new-hire/new-hire-${rowData.applicationId}`,
                            );
                        }}
                        addActions={() => goto('./new-hire/add-new-hire')}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="ID Sementara"
                                bind:inputValue={notCompletedTable.param.filter
                                    .temporaryId}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama"
                                bind:inputValue={notCompletedTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={notCompletedTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={notCompletedTable.param.filter
                                    .status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </CustomTabContent>
        </CustomTab>
    {:else}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <DataTable
                title="Senarai Lantikan Baharu"
                bind:tableData={supporterViewTable}
                bind:passData={rowData}
                detailActions={() => {
                    checkIfFail(rowData.applicationId);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="ID Sementara"
                        bind:inputValue={supporterViewTable.param.filter
                            .temporaryId}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={supporterViewTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={supporterViewTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={supporterViewTable.param.filter.status}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
        <!-- {:else if data.roles.isApproverRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <DataTable
                title="Senarai Lantikan Baharu"
                bind:tableData={approverViewTable}
                bind:passData={rowData}
                detailActions={async () => {
                    checkIfFail(rowData.applicationId);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="ID Sementara"
                        bind:inputValue={approverViewTable.param.filter
                            .temporaryId}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={approverViewTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={approverViewTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={approverViewTable.param.filter.status}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div> -->
    {/if}
</section>

<Toaster />
