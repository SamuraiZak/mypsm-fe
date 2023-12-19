<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { permohonanKlinikPanel } from '$lib/mocks/penyokong/perubatan/permohonan-klinik-panel';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Klinik Panel"
        description="Senarai permohonan panel klinik memerlukan sokongan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="Kod Klinik" type="text" />
                <ShortTextField label="Nama Klinik" type="text" />
                <ShortTextField label="Tarikh Dimohon" type="date" />
                <ShortTextField label="Tarikh Dilantik" type="date" />
            </div>
        </div>
    </FilterContainer>
    <SectionHeader title="Senarai Rekod Permohonan"></SectionHeader>
    <section class="h-full w-full">
        <DynamicTable
            tableItems={permohonanKlinikPanel}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                goto(
                    '/penyokong/perubatan/permohonan-panel-klinik/permohonan-penambahan-klinik-panel',
                );
            }}
        ></DynamicTable>
    </section>
</section>
