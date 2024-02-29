<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';

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
    // pelulus
    let pelulus = UserRoleConstant.pelulus.code;
    // penyokong
    let penyokong = UserRoleConstant.penyokong.code;
    // pengarah Bahagian
    let pengarahBahagian = UserRoleConstant.pengarahBahagian.code;

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
    let table3: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList3 ?? [],
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
    <ContentHeader title="Pertukaran"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>   
    <CustomTab>
        
        <CustomTabContent title="Permohonan Sendiri">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title=""
                    onUpdate={_search}
                    enableDetail
                    detailActions={() =>
                        goto(
                            '/perjawatan/pertukaran/butiran-permohonan_sendiri',
                        )}
                    bind:tableData={table}
                ></CustomTable>
            </div>
        </CustomTabContent>

        <CustomTabContent title="Arahan Pengarah Bahagian/Negeri">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable title="" enableDetail  detailActions={() =>
                    goto(
                        '/perjawatan/pertukaran/butiran-arahan_pengarah',
                    )} bind:tableData={table2}
                ></CustomTable>
            </div>
            
        </CustomTabContent>
        {#if currentRoleCode !== pengarahBahagian}
            <CustomTabContent title="Arahan Pihak Pengurusan">
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <TextIconButton
                        type="primary"
                        icon="add"
                        label="Permohonan Baru"
                        onClick={() => {
                            goto('');
                        }}
                    />
                    
                    <CustomTable
                        title=""
                        enableDetail
                        detailActions={() =>
                            goto(
                                '/perjawatan/pertukaran/butiran-arahan_pengurusan',
                            )}
                        bind:tableData={table3}
                    ></CustomTable>
                </div>
            </CustomTabContent>
        {/if}
    </CustomTab>
</section>
