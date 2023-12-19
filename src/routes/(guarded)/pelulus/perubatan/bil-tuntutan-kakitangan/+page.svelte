<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { tuntutanKakitangan } from '$lib/mocks/pelulus/perubatan/tuntutan-kakitangan';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Bil Tuntutan Kakitangan"
        description="Hal-hal berkaitan dengan pengurusan bil tuntutan kakitangan"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="No. Pekerja" type="text" />
                <ShortTextField label="Nama Kakitangan" type="text" />
                <ShortTextField label="No. Kad Pengenalan" type="text" />
            </div>
        </div>
    </FilterContainer>
    <section class="h-full w-full">
        <SectionHeader title="Senarai Rekod"></SectionHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable
                tableItems={tuntutanKakitangan}
                withActions
                actionOptions={['detail']}
                detailActions={() => {
                    goto(
                        '/pelulus/perubatan/bil-tuntutan-kakitangan/rekod-tuntutan-kakitangan',
                    );
                }}
            ></DynamicTable>
        </div>
    </section>
</section>
