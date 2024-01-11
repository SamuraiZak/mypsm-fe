<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    // TODO: Get list of pemangkuan records

    let senaraiRekodPermohonan = [
        {
            idPemangkuan: 'PMGK-1234',
            tarikhPermohonan: '01/08/2023',
            namaPemohon: 'Mohd Irfan bin Abu',
            gredYangDitawarkan: 'N32',
            jawatanYangDitawarkan: 'Setiausaha Pejabat',
            statusPermohonan: 'Menunggu Keputusan Pelulus',
        },
    ];

    let pengesahanKeputusan = [
        {
            idPemangkuan: 'PMGK-1234',
            namaCalon: 'Mohd Irfan bin Abu',
            gredYangDitawarkan: 'N32',
            jawatanYangDitawarkan: 'Setiausaha Pejabat',
            keputusanMesyuarat: 'Lulus',
            statusPengesahanKeputusanMesyuarat: 'Menunggu Keputusan Pelulus',
        },
    ];

    let currentData: any = {};

    let editMode = false;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan"
        description="Item-item berkaitan pemangkuan yang menunggu tindakan anda"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <!-- Permohonan Penangguhan/Pindaan Penempatan -->
        <CustomTabContent title="Permohonan Penangguhan/Pindaan Penempatan">
            <SectionHeader
                title="Senarai Rekod Permohonan Penangguhan/Pindaan Penempatan Pemangkuan Yang Menunggu Keputusan Anda"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['edit']}
                    bind:passData={currentData}
                    editActions={() => {
                        editMode = true;
                    }}
                    tableItems={senaraiRekodPermohonan}
                    columnKeys={[
                        'idPemangkuan',
                        'tarikhPermohonan',
                        'namaPemohon',
                        'gredYangDitawarkan',
                        'jawatanYangDitawarkan',
                        'statusPermohonan',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Pengesahan Keputusan Pemangkuan -->
        <CustomTabContent title="Pengesahan Keputusan Pemangkuan">
            <SectionHeader
                title="Senarai Rekod Pemangkuan Yang Menunggu Keputusan Anda"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['edit']}
                    bind:passData={currentData}
                    editActions={() => {
                        editMode = true;
                    }}
                    tableItems={pengesahanKeputusan}
                    columnKeys={[
                        'idPemangkuan',
                        'namaCalon',
                        'gredYangDitawarkan',
                        'jawatanYangDitawarkan',
                        'keputusanMesyuarat',
                        'statusPengesahanKeputusanMesyuarat',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
