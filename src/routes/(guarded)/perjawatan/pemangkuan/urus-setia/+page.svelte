<script lang="ts">
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto.js';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import { _updateTable } from './+page';
    import { goto } from '$app/navigation';
    export let data;
    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: './urus-setia/baru-1_54',
        },
        {
            value: 'Gred Flexi 41',
            name: 'Gred Flexi 41',
            href: './urus-setia/baru-flexi_41',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: './urus-setia/baru',
        },
    ];
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
    <ContentHeader title="Pemangkuan">
        <TextIconButton
            options={gradeOptions}
            icon="add"
            type="primary"
            label="Pemangkuan Baru"
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
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

        <!-- Gred Utama -->
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
    </CustomTab>
</section>
