<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let currentRoleCode: string | null;
    currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    // role code for pelulus and penyokong
    let supporterRoleCode: string = "a1f3840c-67b6-4bbb-afdb-6023bc45177d";
    let approverRoleCode: string = "99791982-c4da-4cf8-a2bc-304775445552";

    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
    };
    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.response?.dataList ?? [];
            table.meta = value.response?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Pemangkuan" />
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
<CustomTab>
    {#if currentRoleCode !== approverRoleCode}
    <!-- Gred 1-54 -->
    <CustomTabContent title="Gred 1-54">
        <ContentHeader
            borderClass="border-none"
            title="Senarai rekod pemangkuan bagi Gred 1-54"
        />
        <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <CustomTable
                onUpdate={_search}
                enableDetail
                bind:tableData={table}
            ></CustomTable>
        </div>
    </CustomTabContent>

    <!-- Gred Flexi 41 -->
    <CustomTabContent title="Gred Flexi 41">
        <ContentHeader
            borderClass="border-none"
            title="Senarai rekod pemangkuan bagi Gred Flexi 41"
        ></ContentHeader>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <!-- Table Here -->
            <CustomTable
                onUpdate={_search}
                enableDetail
                bind:tableData={table}
            ></CustomTable>
        </div>
    </CustomTabContent>

    <!-- pengarah bahagian/negeri should not view this particular tab -->
    <!-- Gred Utama -->
    {#if currentRoleCode === supporterRoleCode }
    <CustomTabContent title="Gred Utama">
        <ContentHeader
            borderClass="border-none"
            title="Senarai rekod pemangkuan bagi Gred Utama"
        ></ContentHeader>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <!-- Table Here -->
            <CustomTable
                onUpdate={_search}
                enableDetail
                bind:tableData={table}
            ></CustomTable>
        </div>
    </CustomTabContent>
    {/if}

    <!-- For Approver's View -->
    {:else}
    <CustomTabContent title="Permohonan Penangguhan/Pindaan Penempatan">
        <ContentHeader
            borderClass="border-none"
            title="Senarai rekod permohonan penangguhan/pindaan penempatan yang menunggu keputusan anda"
        />
        <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <CustomTable
                onUpdate={_search}
                enableDetail
                bind:tableData={table}
            ></CustomTable>
        </div>
    </CustomTabContent>

    <CustomTabContent title="Pengesahan Keputusan Pemangkuan">
        <ContentHeader
            borderClass="border-none"
            title="Senarai rekod pemangkuan yang menunggu keputusan anda"
        ></ContentHeader>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
            <!-- Table Here -->
            <CustomTable
                onUpdate={_search}
                enableDetail
                bind:tableData={table}
            ></CustomTable>
        </div>
    </CustomTabContent>
    {/if}
</CustomTab>
</section>
