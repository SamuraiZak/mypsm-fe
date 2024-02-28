<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';

    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    // urusetia
    let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;
    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;
    // penyokong
    let pelulus = UserRoleConstant.pelulus.code;
    // penyokong
    let penyokong = UserRoleConstant.penyokong.code;

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
    let table2: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList2 ?? [],
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
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if currentRoleCode === urusetia}
        <CustomTab>
            <CustomTabContent
                title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        onUpdate={_search}
                        enableDetail
                        detailActions={() =>
                            goto('/perjawatan/PTB-dan-KWAP/butiran')}
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <CustomTabContent title="Senarai Kakitangan TIADA No. Pencen">
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable enableDetail bind:tableData={table2}
                    ></CustomTable>
                </div>
            </CustomTabContent>
        </CustomTab>
    {:else if currentRoleCode === kakitangan || currentRoleCode === penyokong}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <ContentHeader title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    onUpdate={_search}
                    enableDetail
                    detailActions={() =>
                        goto('/perjawatan/PTB-dan-KWAP/butiran')}
                    bind:tableData={table}
                ></CustomTable>
            </div>
        </div>
    {:else if currentRoleCode === pelulus}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <ContentHeader title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
            ></ContentHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    onUpdate={_search}
                    enableDetail
                    detailActions={() =>
                        goto('/perjawatan/PTB-dan-KWAP/butiran')}
                    bind:tableData={table}
                ></CustomTable>
            </div>
        </div>
    {/if}
</section>
