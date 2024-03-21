<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    export let data: PageData;

    let rowData: any;
    let kuartersTable: TableDTO = {
        param: data.param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.dataList ?? [],
        hiddenData: ['id'],
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Menduduki Kuarters">

    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard>
            <FilterTextField label="No. Pemohon" inputValue={''} />
            <FilterTextField label="Nama Pemohon" inputValue={''} />
            <FilterTextField label="Jenis Pemohon" inputValue={''} />
            <FilterTextField label="Status" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Rekod Permohonan"
            bind:tableData={kuartersTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() => goto('./permohonan-keluar-kuarters/butiran/' + rowData.id)}
        />
    </div>
</section>
