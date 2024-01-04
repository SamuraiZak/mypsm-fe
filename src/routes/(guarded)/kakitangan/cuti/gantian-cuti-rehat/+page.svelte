<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { goto } from '$app/navigation';
    import { gcr } from '$lib/mocks/kakitangan/cuti/gcr/gcr';
    import { awalGcr } from '$lib/mocks/kakitangan/cuti/gcr/awal-gcr';
    import { jenisPengeluaran } from '$lib/mocks/kakitangan/cuti/gcr/jenis-pengeluaran';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';

    let selectedJenisPengeluaran = jenisPengeluaran[0].value;
    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Gantian Cuti Rehat"
        description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pengumpulan GCR">
            <FilterContainer>
                <ShortTextField label="Jumlah Hari GCR" type="text" />
                <ShortTextField label="Award Wang Tunai (RM)" type="text" />
                <DropdownSelect
                    id="tahun-dropdown"
                    label="Tahun*"
                    dropdownType="label-left"
                    bind:index={selectedTahun}
                    options={tahun}
                ></DropdownSelect>
            </FilterContainer>
            <SectionHeader
                title="Senarai Permohonan Pengumpulan Gantian Cuti Rehat (GCR) Tahun"
                ><TextIconButton
                    primary
                    label="Permohonan Baru"
                    onClick={() => {
                        goto('/kakitangan/cuti/gantian-cuti-rehat/gcr');
                    }}><SvgPlus /></TextIconButton
                ></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={gcr}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto('');
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pengeluaran Awal GCR">
            <FilterContainer>
                <DropdownSelect
                    id="jenis-pengeluaran-dropdown"
                    label="Jenis Pengeluaran*"
                    dropdownType="label-left"
                    bind:index={selectedJenisPengeluaran}
                    options={jenisPengeluaran}
                ></DropdownSelect>
            </FilterContainer>
            <SectionHeader
                title="Senarai Permohonan Pengumpulan Gantian Cuti Rehat (GCR) Tahun"
                ><TextIconButton
                    primary
                    label="Permohonan Baru"
                    onClick={() => {
                        goto('/kakitangan/cuti/gantian-cuti-rehat/awal-gcr');
                    }}><SvgPlus /></TextIconButton
                ></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={awalGcr}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto('');
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
