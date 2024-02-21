<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';

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
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
    };

    let tableNewHire: TableDTO = {
        param: param,
        meta: {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataListNewHire ?? [],
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
    <ContentHeader title="Rekod Lantikan Baru Kakitangan Tetap"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Senarai Rekod Selesai Diisi">
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
                        bind:tableData={table}
                    ></CustomTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Senarai Rekod Penambahan Calon Lantikan Baru">
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
                        onClick={() => goto('./lantikan-baru/permohonan-baru')}
                    ></TextIconButton>
                </ContentHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        onUpdate={_search}
                        bind:tableData={tableNewHire}
                    ></CustomTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
