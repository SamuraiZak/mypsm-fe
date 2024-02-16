<script lang="ts">
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import { PuppeteerService } from '$lib/helpers/core/puppeteer-pdf-generator.helper';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    const title: string = 'Jadual Contoh';

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
    const exportToPDF = async () => {
        let a = await PuppeteerService.generatePDF<object[]>(title, table.data);
    };
</script>

<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <button
        type="button"
        class="m-10 rounded-full bg-black px-4 text-sm text-white"
        on:click={exportToPDF}>Export to PDF</button
    >
    <CustomTable onUpdate={_search} bind:tableData={table}></CustomTable>
</div>
