<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { LayoutData } from './$types';

    import {
        _updateApproverViewTable,
        _updateCandidateViewTable,
        _updateSubmittedListTable,
        _updateSupporterViewTable,
        _updateTable,
    } from './+layout';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    export let data: LayoutData;
    let rowData: any;
    let param: CommonListRequestDTO = data.param;
    let submittedTableParam: CommonListRequestDTO = data.submittedTableParam;
    let allNewHireTableParam: CommonListRequestDTO = data.allNewHireTableParam;

    // Table list - new application view for secretary role
    let newCandidateTable: TableDTO = {
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.newCandidateList ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchNewCandidate() {
        _updateTable(newCandidateTable.param).then((value) => {
            newCandidateTable.data = value.response.data?.dataList ?? [];
            newCandidateTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            newCandidateTable.param.pageSize = newCandidateTable.meta.pageSize;
            newCandidateTable.param.pageNum = newCandidateTable.meta.pageNum;
        });
    }

    // Table list - submitted view for secretary role
    let submittedListTable: TableDTO = {
        param: submittedTableParam,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.submittedFormList ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchSubmittedList() {
        _updateSubmittedListTable(submittedListTable.param).then((value) => {
            submittedListTable.data = value.response.data?.dataList ?? [];
            submittedListTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            submittedListTable.param.pageSize =
                submittedListTable.meta.pageSize;
            submittedListTable.param.pageNum = submittedListTable.meta.pageNum;
        });
    }

    // Table list - for candidate role
    let candidateViewTable: TableDTO = {
        param: allNewHireTableParam,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.candidateViewTable ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchCandidateView() {
        _updateCandidateViewTable(candidateViewTable.param).then((value) => {
            candidateViewTable.data = value.response.data?.dataList ?? [];
            candidateViewTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            candidateViewTable.param.pageSize =
                candidateViewTable.meta.pageSize;
            candidateViewTable.param.pageNum = candidateViewTable.meta.pageNum;
        });
    }

    // Table list - for supporter role
    let supporterViewTable: TableDTO = {
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.supporterViewList ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchSupporterView() {
        _updateSupporterViewTable(supporterViewTable.param).then((value) => {
            supporterViewTable.data = value.response.data?.dataList ?? [];
            supporterViewTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            supporterViewTable.param.pageSize =
                supporterViewTable.meta.pageSize;
            supporterViewTable.param.pageNum = supporterViewTable.meta.pageNum;
        });
    }

    // Table list - for approver role
    let approverViewTable: TableDTO = {
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.approverViewList ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchApproverView() {
        _updateApproverViewTable(approverViewTable.param).then((value) => {
            approverViewTable.data = value.response.data?.dataList ?? [];
            approverViewTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            approverViewTable.param.pageSize = approverViewTable.meta.pageSize;
            approverViewTable.param.pageNum = approverViewTable.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Lantikan Baru Kakitangan Tetap"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.currentRoleCode == UserRoleConstant.calon.code}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title="Senarai Lantikan Baru"
                    onUpdate={_searchCandidateView}
                    enableDetail
                    bind:tableData={candidateViewTable}
                    bind:passData={rowData}
                    detailActions={() => {
                        const route = `./lantikan-baru/kemaskini-permohonan/${rowData.candidateId}`;

                        goto(route);
                    }}
                ></CustomTable>
            </div>
        </div>
    {:else if data.isEmploymentSecretaryRole}
        <CustomTab>
            <CustomTabContent title="Senarai Rekod Selesai Diisi">
                <!-- Table filter placeholder -->
                <FilterCard onSearch={_searchSubmittedList}>
                    <FilterTextField
                        label="ID Sementara"
                        bind:inputValue={submittedListTable.param.filter
                            .temporaryId}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={submittedListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={submittedListTable.param.filter
                            .identityCard}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={submittedListTable.param.filter.status}
                    ></FilterSelectField>
                </FilterCard>
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            title="Senarai Lantikan Baru"
                            onUpdate={_searchSubmittedList}
                            enableDetail
                            bind:tableData={submittedListTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./lantikan-baru/kemaskini-permohonan/${rowData.candidateId}`;

                                goto(route);
                            }}
                        ></CustomTable>
                    </div>
                </div>
            </CustomTabContent>
            <CustomTabContent
                title="Senarai Rekod Penambahan Calon Lantikan Baru"
            >
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <ContentHeader
                        title="Tekan butang disebelah untuk menambah rekod lantikan baru"
                        borderClass="border-none"
                    >
                        <TextIconButton
                            label="Tambah Lantikan Baru"
                            type="primary"
                            onClick={() =>
                                goto('./lantikan-baru/permohonan-baru')}
                        ></TextIconButton>
                    </ContentHeader>
                    <!-- Table filter placeholder -->
                    <FilterCard onSearch={_searchNewCandidate}>
                        <FilterTextField
                            label="ID Sementara"
                            bind:inputValue={newCandidateTable.param.filter
                                .temporaryId}
                        ></FilterTextField>
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={newCandidateTable.param.filter
                                .name}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={newCandidateTable.param.filter
                                .identityCard}
                        ></FilterTextField>
                        <FilterSelectField
                            label="Status"
                            options={data.selectionOptions.statusLookup}
                            bind:inputValue={newCandidateTable.param.filter
                                .status}
                        ></FilterSelectField>
                    </FilterCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            title="Senarai Calon Yang Belum Melengkapkan Maklumat"
                            onUpdate={_searchNewCandidate}
                            bind:tableData={newCandidateTable}
                        ></CustomTable>
                    </div>
                </div>
            </CustomTabContent>
        </CustomTab>
    {:else if data.isSupporterRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <!-- Table filter placeholder -->
            <FilterCard onSearch={_searchSupporterView}>
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
                        .identityCard}
                ></FilterTextField>
                <FilterSelectField
                    label="Status"
                    options={data.selectionOptions.statusLookup}
                    bind:inputValue={supporterViewTable.param.filter.status}
                ></FilterSelectField>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title="Senarai Lantikan Baru"
                    onUpdate={_searchSupporterView}
                    enableDetail
                    bind:tableData={supporterViewTable}
                    bind:passData={rowData}
                    detailActions={() => {
                        const route = `./lantikan-baru/kemaskini-permohonan/${rowData.candidateId}`;

                        goto(route);
                    }}
                ></CustomTable>
            </div>
        </div>
    {:else if data.isApproverRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <!-- Table filter placeholder -->
            <FilterCard onSearch={_searchApproverView}>
                <FilterTextField
                    label="ID Sementara"
                    bind:inputValue={approverViewTable.param.filter.temporaryId}
                ></FilterTextField>
                <FilterTextField
                    label="Nama"
                    bind:inputValue={approverViewTable.param.filter.name}
                ></FilterTextField>
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={approverViewTable.param.filter
                        .identityCard}
                ></FilterTextField>
                <FilterSelectField
                    label="Status"
                    options={data.selectionOptions.statusLookup}
                    bind:inputValue={approverViewTable.param.filter.status}
                ></FilterSelectField>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title="Senarai Lantikan Baru"
                    onUpdate={_searchApproverView}
                    enableDetail
                    bind:tableData={approverViewTable}
                    bind:passData={rowData}
                    detailActions={() => {
                        const route = `./lantikan-baru/kemaskini-permohonan/${rowData.candidateId}`;

                        goto(route);
                    }}
                ></CustomTable>
            </div>
        </div>
    {/if}
</section>

<!-- <Toaster /> -->
