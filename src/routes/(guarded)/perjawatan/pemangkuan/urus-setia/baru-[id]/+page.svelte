<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
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
        data: data.actingTypes == '1_54' ? data.dataList : data.dataList2 ?? [],
        selectedData: [],
    };

    // let table2: TableDTO = {
    //     param: param,
    //     meta: {
    //         pageSize: 5,
    //         pageNum: 1,
    //         totalData: 4,
    //         totalPage: 1,
    //     },
    //     data: data.recordsflexi.dataList2 ?? [],
    //     selectedData: [],
    // };

    let selectedStaffTable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: table.selectedData ?? [],
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
    $: selectedStaffTable.data = table.selectedData ?? [];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pemangkuan Baru Gred {data.actingTypes.replace(/f/g, "F").replace(/_/g, "-")}">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Batal"
            onClick={() => {
                goto('./');
            }}
        />
        <TextIconButton
            icon="next"
            label="Seterusnya"
            type="primary"
            onClick={() => {
                if(selectedStaffTable.data.length < 1){
                    alert('Senarai calon pemangkuan tidak boleh kosong.')
                }
                else{
                    goto('/perjawatan/pemangkuan');
                }
            }}
        />
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <!-- Senarai Semua Kakitangan -->
        <CustomTabContent title="Senarai Semua Kakitangan">
            <ContentHeader title="Tindakan: Tekan tombol tambah untuk masukkan kakitangan ke senarai calon yang dipilih untuk dipangku." borderClass="border-none"/>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                
                <!-- Table here -->
                <CustomTable
                    onUpdate={_search}
                    bind:tableData={table}
                    enableAdd={true}
                ></CustomTable>
            </div>
        </CustomTabContent>

        <!-- Senarai Kakitangan Yang Dipilih -->
        <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
            <ContentHeader title="Senarai calon yang dipilih untuk dipangku." borderClass="border-none"/>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <!-- Table here -->
                <CustomTable bind:tableData={selectedStaffTable}></CustomTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
