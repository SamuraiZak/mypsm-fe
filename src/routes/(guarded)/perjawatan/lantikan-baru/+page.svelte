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
    import type { PageData } from './$types';

    import { _updateTable } from './+page';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    export let data: PageData;
    export let filterByICNumber: string;
    export let filterByTemporaryID: string;
    let param: CommonListRequestDTO = data.param;

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

    async function _search() {
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
            <ContentHeader title="Senarai Lantikan Baru"></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    onUpdate={_search}
                    enableDetail
                    bind:tableData={candidateViewTable}
                ></CustomTable>
            </div>
        </div>
    {:else}
        <CustomTab>
            <CustomTabContent title="Senarai Rekod Selesai Diisi">
                <!-- Table filter placeholder -->
                <FilterContainer>
                    <CustomTextField
                        id="filterByICNumber"
                        label="No. Kad Pengenalan"
                        type="text"
                        bind:val={filterByICNumber}
                    />
                    <CustomTextField
                        id="filterByTemporaryID"
                        label="ID Calon"
                        type="text"
                        bind:val={filterByTemporaryID}
                    />
                </FilterContainer>
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <ContentHeader title="Senarai Lantikan Baru"
                    ></ContentHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            onUpdate={_search}
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
                            onUpdate={_search}
                            bind:tableData={newCandidateTable}
                        ></CustomTable>
                    </div>
                </div>
            </CustomTabContent>
        </CustomTab>
    {/if}
</section>

<!-- <Toaster /> -->
