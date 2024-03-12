<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData:any;

    let renewContractTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: data.dataList.length,
            pageNum: 1,
            totalData: data.dataList.length,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        hiddenData: ['id']
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pembaharuan Kontrak" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="ID Kakitangan Kontrak" inputValue={''}
            />
            <FilterTextField label="Nama" inputValue={''}/>
            <FilterTextField label="No. Kad Pengenalan" inputValue={''}
            />
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Rekod Kakitangan Kontrak Untuk Pembaharuan Kontrak"
                bind:tableData={renewContractTable}
                bind:passData={rowData}
                enableDetail
                detailActions={() => goto('./pembaharuan/butiran/'+rowData.id)}
            />
        </div>
    </div>
</section>
