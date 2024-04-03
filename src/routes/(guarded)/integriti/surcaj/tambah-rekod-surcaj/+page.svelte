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

    import type { PageData } from '../tambah-rekod-surcaj/$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    let rowData: any;

    let addSurcajtable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.addSurcajViewTable ?? [],
    };
   
</script>

<section class="flex w-full flex-col items-start justify-start">
    <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
        <FilterCard></FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            
            <CustomTable
                enableDetail
                bind:passData={rowData}
                bind:tableData={addSurcajtable}
                detailActions= {()=>goto ("/integriti/surcaj/tambah-rekod-surcaj/butiran-" + rowData.id)}
            ></CustomTable>

        </div>
    </CustomTabContent>
</section>



