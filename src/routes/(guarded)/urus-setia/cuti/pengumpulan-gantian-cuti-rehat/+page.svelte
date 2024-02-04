<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { goto } from '$app/navigation';
    import { pengumpulanGcr } from '$lib/mocks/urus-setia/cuti/pengumpulan-gcr/pengumpulan-gcr';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';

    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pengumpulan Gantian Cuti Rehat (GCR)"
        description="Senarai rekod permohonan pengumpulan Gantian Cuti Rehat (GCR)"
    >
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
>

    <FilterContainer>
        <FilterTextInput label="Nama Pekerja"></FilterTextInput>
            <FilterTextInput label="No. Pekerja"></FilterTextInput>
            <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
        <ShortTextField label="Jumlah Hari GCR" type="text" />
        <ShortTextField label="Award Wang Tunai (RM)" type="text" />
        <DropdownSelect
            id="tahun-dropdown"
            label="Tahun"
            dropdownType="label-left"
            bind:index={selectedTahun}
            options={tahun}
        ></DropdownSelect>
    </FilterContainer>
    <SectionHeader title="Senarai Permohonan Gantian Cuti Rehat (GCR) Tahun 2023"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={pengumpulanGcr}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/cuti/pengumpulan-gantian-cuti-rehat/butiran-pengumpulan-gcr',
                        );
                    }}
        ></DynamicTable>
    </div>
</section>
