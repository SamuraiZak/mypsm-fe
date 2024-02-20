<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let param: CommonListRequestDTO = data.param;
    let table: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        //varies based on role, US & PBN view the same table @ penyokong and pelulus view same table diff data from US & PBN
        data: data.dataList ?? [], //datalist for US & PBN @ datalist2 for penyokong and pelulus
        //data: role === penyokong ? data.datalist : data.datalist2 ?? [],
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
    <ContentHeader title="Kenaikan Pangkat"
        ><TextIconButton
            icon="add"
            type="primary"
            label="Kenaikan Pangkat Baru"
        /></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <!-- Gred 1-54 -->
        <CustomTabContent title="Kenaikan Gred 1-54">
            <ContentHeader
                borderClass="border-none"
                title="Senarai rekod kenaikan pangkat bagi Gred 1-54"
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

        <!-- TBK 1&2 - Kumpulan Sokongan -->
        <CustomTabContent title="Kenaikan Pangkat TBK 1&2 - Kumpulan Sokongan">
            <ContentHeader
                borderClass="border-none"
                title="Senarai rekod kenaikan pangkat bagi TBK 1&2 - Kumpulan Sokongan"
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
        <CustomTabContent title="Kenaikan Pangkat Gred Utama">
            <ContentHeader
                borderClass="border-none"
                title="Senarai rekod kenaikan pangkat bagi Gred Utama"
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
    </CustomTab>
</section>
