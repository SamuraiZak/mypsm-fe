<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import { gcr2023 } from '$lib/mocks/ketua-seksyen/cuti/gcr-2023';

    let passData: Record<string, any> = {};
    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pengumpulan Gantian Cuti Rehat"
        description="Maklumat berkaitan pengumpulan Gantian Cuti Rehat (GCR)"
    >
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <FilterContainer>
        <StaffSelector />
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
    <SectionHeader title="Senarai Permohonan Pengumpulan Gantian Cuti Rehat (GCR)"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={gcr2023}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                if (passData.status === 'Baru')
                    goto(
                        '/ketua-seksyen/cuti/gantian-cuti-rehat/butiran',
                    );
                else if (passData.status === 'LULUS - Ketua Seksyen')
                    goto(
                        '/ketua-seksyen/cuti/gantian-cuti-rehat/butiran',
                    );
                else if (passData.status === 'Selesai')
                    goto(
                        '/ketua-seksyen/cuti/gantian-cuti-rehat/butiran',
                    );
            }}
            bind:passData
        ></DynamicTable>
    </div>
</section>
