<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { goto } from '$app/navigation';
    import { jenisPengeluaran } from '$lib/mocks/urus-setia/cuti/pengeluaran-gcr-awal/jenis-pengeluaran';
    import { permohonan } from '$lib/mocks/urus-setia/cuti/pengeluaran-gcr-awal/permohonan';
    import { pencenMeninggalDunia } from '$lib/mocks/urus-setia/cuti/pengeluaran-gcr-awal/pencen-meninggal-dunia';

    let selectedTahun = tahun[0].value;
    let selectedJenisPengeluaran = jenisPengeluaran[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengeluaran Gantian Cuti Rehat (GCR)"
        description="Senarai berkaitan Gantian Cuti Rehat (GCR)"
    >
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
>
    <FilterContainer>
        <StaffSelector />
        <DropdownSelect
            id="tahun-dropdown"
            label="Jenis Pengeluaran*"
            dropdownType="label-left"
            bind:index={selectedJenisPengeluaran}
            options={jenisPengeluaran}
        ></DropdownSelect>
        <DropdownSelect
            id="tahun-dropdown"
            label="Tahun*"
            dropdownType="label-left"
            bind:index={selectedTahun}
            options={tahun}
        ></DropdownSelect>
    </FilterContainer>
    <SectionHeader title="Senarai Permohonan Pengeluaran Cuti Gantian Rehat (GCR) Tahun 2023"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={permohonan}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/cuti/pengeluaran-gantian-cuti-rehat-awal/butiran-senarai-permohonan-pengeluaran-gcr',
                        );
                    }}
        ></DynamicTable>
    </div>
    <SectionHeader title="Senarai Kakitangan Akan Pencen Layak Dianugerahkan Award Tunai GCR Tahun 2023"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={pencenMeninggalDunia}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/cuti/pengeluaran-gantian-cuti-rehat-awal/butiran-senarai-kakitangan-akan-pencen',
                        );
                    }}
        ></DynamicTable>
    </div>
    <SectionHeader title="Senarai Kakitangan Meninggal Dunia Layak Dianugerahkan Award Tunai GCR Tahun 2023"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={pencenMeninggalDunia}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/cuti/pengeluaran-gantian-cuti-rehat-awal/butiran-senarai-kakitangan-meninggal-dunia',
                        );
                    }}
        ></DynamicTable>
    </div>
</section>
