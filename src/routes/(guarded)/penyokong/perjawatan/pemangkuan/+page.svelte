<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';

    let currentData: any = {};

    let senaraiPermohonan = [
        {
            noPekerja: '0282378L',
            namaPekerja: 'Ali Bin Ahmad',
            noKadPengenalan: '001122113344',
            program: '-',
            skim: '-',
            gred: '-',
            penempatanSekarang: '-',
            pengisytiharanHarta: '-',
            namaJawatan: '-',
            akuanPinjamanPendidikan: '-',
            status: 'LULUS - Urus Setia Urus Setia',
        },
        {
            noPekerja: '0282381L',
            namaPekerja: 'Zakaria Bin Osman',
            noKadPengenalan: '001122113344',
            program: '-',
            skim: '-',
            gred: '-',
            penempatanSekarang: '-',
            pengisytiharanHarta: '-',
            namaJawatan: '-',
            akuanPinjamanPendidikan: '-',
            status: 'LULUS - Urus Setia Urus Setia',
        },
    ];

    let gred = [
        { value: 'all', name: 'Semua' },
        { value: '1_54', name: '1 - 54' },
        { value: 'flexi41', name: 'Flexi 41' },
        { value: 'utama', name: 'Utama' },
    ];

    let selectedStatus = gred[0].value; // Default selected filter
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Pemangkuan"
        description="Senarai permohonan berkaitan pemangkuan"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <!-- Gred 1-54 -->
        <CustomTabContent title="Gred 1-54">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian Rekod">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="No. Pekerja*"></FilterTextInput>
                        <FilterTextInput label="Nama*"></FilterTextInput>
                        <FilterTextInput label="No. Kad Pengenalan*"
                        ></FilterTextInput>
                        <FilterSelectInput
                            label="Gred"
                            options={gred}
                            selectedVal={selectedStatus}
                        ></FilterSelectInput>
                        <FilterDateSelector
                            handleDateChange
                            label="Tarikh Mohon"
                        ></FilterDateSelector>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <SectionHeader
                title="Senarai Permohonan untuk DISOKONG"
                subTitle={'Jumlah Rekod: ' + senaraiPermohonan.length}
            />
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['detail']}
                    bind:passData={currentData}
                    detailActions={() => {
                        goto('/penyokong/perjawatan/pemangkuan/gred-1_54');
                    }}
                    tableItems={senaraiPermohonan}
                    columnKeys={[
                        'noPekerja',
                        'namaPekerja',
                        'noKadPengenalan',
                        'program',
                        'skim',
                        'gred',
                        'status',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Gred Flexi 41 -->
        <CustomTabContent title="Gred Flexi 41">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian Rekod">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="No. Pekerja*"></FilterTextInput>
                        <FilterTextInput label="Nama*"></FilterTextInput>
                        <FilterTextInput label="No. Kad Pengenalan*"
                        ></FilterTextInput>
                        <FilterSelectInput
                            label="Gred"
                            options={gred}
                            selectedVal={selectedStatus}
                        ></FilterSelectInput>
                        <FilterDateSelector
                            handleDateChange
                            label="Tarikh Mohon"
                        ></FilterDateSelector>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <SectionHeader
                title="Senarai Permohonan untuk DISOKONG"
                subTitle={'Jumlah Rekod: ' + senaraiPermohonan.length}
            />
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['detail']}
                    bind:passData={currentData}
                    detailActions={() => {
                        goto('/penyokong/perjawatan/pemangkuan/gred-flexi_41');
                    }}
                    tableItems={senaraiPermohonan}
                    columnKeys={[
                        'noPekerja',
                        'namaPekerja',
                        'noKadPengenalan',
                        'program',
                        'skim',
                        'gred',
                        'status',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Gred Utama -->
        <CustomTabContent title="Gred Utama">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian Rekod">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="No. Pekerja*"></FilterTextInput>
                        <FilterTextInput label="Nama*"></FilterTextInput>
                        <FilterTextInput label="No. Kad Pengenalan*"
                        ></FilterTextInput>
                        <FilterSelectInput
                            label="Gred"
                            options={gred}
                            selectedVal={selectedStatus}
                        ></FilterSelectInput>
                        <FilterDateSelector
                            handleDateChange
                            label="Tarikh Mohon"
                        ></FilterDateSelector>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <SectionHeader
                title="Senarai Permohonan untuk DISOKONG"
                subTitle={'Jumlah Rekod: ' + senaraiPermohonan.length}
            />
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['detail']}
                    bind:passData={currentData}
                    detailActions={() => {
                        goto('/penyokong/perjawatan/pemangkuan/gred-utama');
                    }}
                    tableItems={senaraiPermohonan}
                    columnKeys={[
                        'noPekerja',
                        'namaPekerja',
                        'noKadPengenalan',
                        'program',
                        'skim',
                        'gred',
                        'penempatanSekarang',
                        'pengisytiharanHarta',
                        'namaJawatan',
                        'akuanPinjamanPendidikan',
                        'status',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
