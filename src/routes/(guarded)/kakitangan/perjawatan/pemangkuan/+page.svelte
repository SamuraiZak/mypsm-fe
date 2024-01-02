<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    // TODO: Get list of pemangkuan records

    let sejarahPemangkuan = [
        {
            recordId: 1,
            kodJawatanMemangku: 'E32',
            gelaranJawatanMemangku: 'Pegawai Pentadbiran',
            tarikhKuatkuasa: '2/3/2023',
            tarikhCukupTempohPemangkuan: '2/3/2025',
            status: 'Aktif',
        },
        {
            recordId: 2,
            kodJawatanMemangku: 'E31',
            gelaranJawatanMemangku: 'Penolong Pegawai Pentadbiran',
            tarikhKuatkuasa: '2/3/2021',
            tarikhCukupTempohPemangkuan: '2/3/2022',
            status: 'Tidak Aktif',
        },
    ];

    let pemangkuanRecords = [
        {
            idPemangkuan: 'PMGK-1234',
            tarikhTawaran: '01/08/2023',
            gred: 'N32',
            jawatan: 'Setiausaha Pejabat',
            keputusanPemangkuan: 'Belum Dikemaskini',
        },
        {
            idPemangkuan: 'PMGK-1234',
            tarikhTawaran: '01/08/2023',
            gred: 'N32',
            jawatan: 'Setiausaha Pejabat',
            keputusanPemangkuan: 'Belum Dikemaskini',
        },
    ]

    let currentData: any = {};

    let editMode = false;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <!-- <ContentHeader
        title="Pemangkuan"
        description="Hal-hal berkaitan urusan pemangkuan"
    ></ContentHeader> -->
    <ContentHeader
        title="Pemangkuan"
        description="Sila semak senarai tawaran yang diberikan dan lihat butiran untuk tindakan seterusnya"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <!-- <CustomTab> -->
        <!-- Sejarah Pemangkuan -->
        <CustomTabContent title="Sejarah Pemangkuan">
            <!-- <SectionHeader
                subTitle="Senarai rekod pemangkuan yang berkenaan dengan anda"
            ></SectionHeader> -->
            <SectionHeader title="Senarai Tawaran Pemangkuan"/>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    withActions
                    actionOptions={['edit']}
                    bind:passData={currentData}
                    editActions={() => {
                        // editMode = true;
                        goto('/kakitangan/perjawatan/pemangkuan/butiran')
                    }}
                    tableItems={pemangkuanRecords}
                    columnKeys={[
                        'idPemangkuan',
                        'tarikhTawaran',
                        'gred',
                        'jawatan',
                        'keputusanPemangkuan',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>
</section>
