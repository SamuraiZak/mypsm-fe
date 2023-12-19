<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { mockActingIndividual } from '$lib/mocks/database/mockActingIndividual';
    import { currentActingBatchId } from '$lib/stores/pemangkuan/pemangkuanStores';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    let actingCandidates = [
        {
            noPekerja: '00003',
            namaKakitangan: 'Jon Bovi',
            noKp: '910203-13-6544',
            gred: 'E30',
            jawatan: 'Penolong Pegawai Ehwal Ekonomi',
            gredUntukDipangku: 'E32',
            jawatanUntukDipangku: 'Pegawai Ehwal Ekonomi',
        },
    ];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred Flexi 41 - Butiran"
        description="Sila kemaskini butiran bagi setiap calon pemangkuan yang berikut"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <SectionHeader title="Senarai Calon Pemangkuan">
            <TextIconButton label="Cetak" primary>
                <SvgPrinter></SvgPrinter>
            </TextIconButton>
        </SectionHeader>

        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DynamicTable tableItems={actingCandidates} editable></DynamicTable>
        </div>
    </div>
</section>
