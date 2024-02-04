<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { PageData } from './$types';
    export let data: PageData;

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Sejarah Anugerah Pekerja Cemerlang (APC)"
        description="Hal-hal pengurusan sejarah APC bagi kakitangan LKIM"
        ><TextIconButton
            primary
            label="Tambah Rekod"
            onClick={() => {
                goto('./sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgPlus />
        </TextIconButton></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader title="Senarai Sejarah APC Mengikut Tahun"
            ></SectionHeader>
            <DynamicTable
                tableItems={data.props.apcHistory}
            ></DynamicTable>
        </div>
    </div>
</section>
