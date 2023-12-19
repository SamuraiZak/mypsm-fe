<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { goto } from '$app/navigation';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { pengeluaranGcrAwal } from '$lib/mocks/pengarah-bahagian-negeri/cuti/pengeluaran-gantian-cuti-rehat-awal/pengeluaran-gcr-awal';

    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengeluaran Gantian Cuti Rehat (GCR) Awal"
        description="Senarai rekod permohonan pengeluaran Gantian Cuti Rehat (GCR) awal"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
>
    <FilterContainer>
        <StaffSelector />
        <ShortTextField label="Jumlah Hari GCR" type="text" />
        <DropdownSelect
            id="tahun-dropdown"
            label="Tahun"
            dropdownType="label-left"
            bind:index={selectedTahun}
            options={tahun}
        ></DropdownSelect>
    </FilterContainer>
    <ContentHeader
        title="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
        description=""
        ><TextIconButton label="Tidak Lulus" onClick={() => {}}>
            <SvgMinusCircle />
        </TextIconButton>
        <TextIconButton primary label="Lulus" onClick={() => {}}>
            <SvgCheck />
        </TextIconButton></ContentHeader
    >
    <SectionHeader title="Senarai Permohonan Pengeluaran GCR awal"
    ></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            hasCheckbox
            tableItems={pengeluaranGcrAwal}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                goto(
                    '/pengarah-bahagian-negeri/cuti/pengeluaran-gantian-cuti-rehat-awal/butiran-gcr-awal',
                );
            }}
        ></DynamicTable>
    </div>
</section>
