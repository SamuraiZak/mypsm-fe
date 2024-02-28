<script lang="ts">
    // import { CustomTextField } from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    // import { Toaster } from 'svelte-french-toast';
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

    export let data: LayoutData;
    let rowData: any;
    let param: CommonListRequestDTO = data.param;

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
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.submittedFormList ?? [],
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
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.candidateViewTable ?? [],
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
    {#if data.isCandidateRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <ContentHeader
                title="Senarai Lantikan Baru"
                borderClass="border-none"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
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
                <FilterContainer>filter to be in here..</FilterContainer>
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <ContentHeader title="Senarai Lantikan Baru"
                    ></ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            onUpdate={_searchSubmittedList}
                            enableDetail
                            bind:tableData={submittedListTable}
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
                        title="Senarai Calon Yang Belum Melengkapkan Maklumat"
                        borderClass="border-none"
                    >
                        <TextIconButton
                            label="Tambah Lantikan Baru"
                            type="primary"
                            onClick={() =>
                                goto('./lantikan-baru/permohonan-baru')}
                        ></TextIconButton>
                    </ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
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
            <ContentHeader
                title="Senarai Lantikan Baru"
                borderClass="border-none"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
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
            <ContentHeader
                title="Senarai Lantikan Baru"
                borderClass="border-none"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
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
