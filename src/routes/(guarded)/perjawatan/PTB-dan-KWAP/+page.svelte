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
    import { _updateTable, _updateTableNo } from './+page';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let paramNo: CommonListRequestDTO = data.paramNo;
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

    let rowData: any;

    let PTBtable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbViewTable ?? [],
    };

    let PTBtableNo: TableDTO = {
        param: paramNo,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbNoViewTable ?? [],
    };

    async function _search() {
        _updateTable(PTBtable.param).then((value) => {
            PTBtable.data = value.props.response.data?.dataList ?? [];
            PTBtable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            PTBtable.param.pageSize = PTBtable.meta.pageSize;
            PTBtable.param.pageNum = PTBtable.meta.pageNum;
        });
    }
    async function _searchNo() {
        _updateTableNo(PTBtableNo.param).then((value) => {
            PTBtableNo.data = value.props.response.data?.dataList ?? [];
            PTBtableNo.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            PTBtableNo.param.pageSize = PTBtableNo.meta.pageSize;
            PTBtableNo.param.pageNum = PTBtableNo.meta.pageNum;
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
    >
    <TextIconButton
    label="Tambah Rekod"
    onClick={() => {
        goto('/perjawatan/PTB-dan-KWAP/butiran/'+ rowData.id);
    }}
>
    <SvgPlus />
</TextIconButton></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    
        <CustomTab>
            
            <CustomTabContent
                title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
            >
            
            
            <FilterCard></FilterCard>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
             
                    <CustomTable
                        onUpdate={_search}
                        enableDetail
                        bind:passData={rowData}
                    detailActions={() => {
                        goto( `./PTB-dan-KWAP/urus-setia/butiran-` +
                                    rowData.employeeId);
                    }}
               
                        bind:tableData={PTBtable}
                    ></CustomTable>
                </div>
            </CustomTabContent>

            <CustomTabContent title="Senarai Kakitangan TIADA No. Pencen">
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                <CustomTable
                onUpdate={_searchNo}
                enableDetail
                bind:passData={rowData}
            detailActions={() => {
                goto( `./PTB-dan-KWAP/urus-setia/butiran`);
            }}
       
                bind:tableData={PTBtableNo}
            ></CustomTable>
                </div>
            </CustomTabContent>
        </CustomTab>
   
    
</section>
