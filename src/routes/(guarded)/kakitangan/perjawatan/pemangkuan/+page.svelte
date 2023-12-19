<script lang="ts">
    import OptionButton from '$lib/components/buttons/OptionButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockActingBatch } from '$lib/mocks/database/mockActingBatch';

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

    let currentData: any = {};

    let editMode = false;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan"
        description="Hal-hal berkaitan urusan pemangkuan"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <!-- Sejarah Pemangkuan -->
        <CustomTabContent title="Sejarah Pemangkuan">
            <SectionHeader
                subTitle="Senarai rekod pemangkuan yang berkenaan dengan anda"
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
                    tableItems={sejarahPemangkuan}
                    columnKeys={[
                        'kodJawatanMemangku',
                        'gelaranJawatanMemangku',
                        'tarikhKuatkuasa',
                        'tarikhCukupTempohPemangkuan',
                        'status',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Gred Flexi 41 -->
        <CustomTabContent title="Tawaran Pemangkuan Baru">
            <SectionHeader
                subTitle="Semak dan kemaskini maklumat anda untuk melanjutkan proses pemangkuan yang tersebut"
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
                    tableItems={sejarahPemangkuan}
                    columnKeys={[
                        'kodJawatanMemangku',
                        'gelaranJawatanMemangku',
                        'tarikhKuatkuasa',
                        'tarikhCukupTempohPemangkuan',
                        'status',
                    ]}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
