<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { MedicalClinicPanelClaimList } from '$lib/dto/mypsm/perubatan/medical-claim-list.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData: MedicalClinicPanelClaimList;

    let klinikPanelTable: TableDTO = {
        param: data.param,
        meta: data.clinicPanelMedicalClaimListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.clinicPanelMedicalClaimList ?? [],
        hiddenData: ['clinicId'],
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Bil Tuntutan Klinik Panel">
        
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="Kod Klinik" inputValue={''} />
            <FilterTextField label="Nama Klinik" inputValue={''} />
            <FilterTextField label="Bulan" inputValue={''} />
            <FilterTextField label="Negeri" inputValue={''} />
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Rekod Bil Tuntutan Klinik Panel"
                bind:tableData={klinikPanelTable}
                bind:passData={rowData}
                enableDetail
                detailActions={() =>
                    goto('./bil-tuntutan-klinik/butiran/' + rowData.clinicId + '-' + rowData.month)}
            />
        </div>
    </div>
</section>
