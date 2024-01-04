<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';

    // TODO: Get list of pinjaman records

    interface currData {
        noPekerja?: string;
        namaKakitangan?: string;
        noKadPengenalan?: string;
        jenisPinjaman?: string;
        tarikhMohon?: string;
        jumlah?: string;
        status?: string;
        tindakan?: string;
    }

    let rekodPinjaman = [
        {
            noPekerja: 'K34221B',
            namaKakitangan: 'Wee Ting',
            noKadPengenalan: '887799665555',
            jenisPinjaman: 'Komputer',
            tarikhMohon: '3/7/2022',
            jumlah: '6,999.00',
            status: 'SAH - Urus Setia Pentadbiran',
            tindakan: '-',
        },
        {
            noPekerja: 'K34224B',
            namaKakitangan: 'Jon Bovi',
            noKadPengenalan: '887799665555',
            jenisPinjaman: 'Kenderaan',
            tarikhMohon: '12/7/2022',
            jumlah: '86,999.00',
            status: 'SAH - Urus Setia Pentadbiran',
            tindakan: '-',
        },
        {
            noPekerja: 'K34223B',
            namaKakitangan: 'Michael L. Backson',
            noKadPengenalan: '887799665555',
            jenisPinjaman: 'Komputer',
            tarikhMohon: '10/8/2022',
            jumlah: '4,999.00',
            status: 'SAH - Urus Setia Pentadbiran',
            tindakan: '-',
        },
        {
            noPekerja: 'K34221B',
            namaKakitangan: 'Ali Bin Abu',
            noKadPengenalan: '887799665555',
            jenisPinjaman: 'Kenderaan',
            tarikhMohon: '13/5/2022',
            jumlah: '46,999.00',
            status: 'SAH - Urus Setia Pentadbiran',
            tindakan: '-',
        },
    ];

    let currentData: currData = {};

    let jenisPinjaman = [
        { value: 'all', name: 'Semua' },
        { value: 'komputer', name: 'Komputer' },
        { value: 'kenderaan', name: 'Kenderaan' },
    ];
    let statusPinjaman = [
        { value: 'all', name: 'Semua' },
        { value: 'sah', name: 'Sah' },
        { value: 'dalamProses', name: 'Dalam Proses' },
        { value: 'tidakSah', name: 'Tidak Sah' },
    ];

    let selectedJenis = jenisPinjaman[0].value; // Default selected filter for jenis pinjaman
    let selectedStatus = statusPinjaman[0].value; // Default selected filter for status pinjaman

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Pinjaman"
        description="Hal-hal berkaitan menguruskan pinjaman kakitangan LKIM"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTabContent>
        <CustomCard borderClass="border-system-primary">
            <CustomCardHeader title="Semua Tetapan Pencarian Rekod">
                <TextIconButton label="Cari" primary onClick={() => {}}>
                    <SvgManifyingGlass></SvgManifyingGlass>
                </TextIconButton>
            </CustomCardHeader>
            <CustomCardBody>
                <div class="flex w-full flex-wrap gap-2.5">
                    <FilterTextInput label="No. Pekerja"></FilterTextInput>
                    <FilterTextInput label="Nama Kakitangan"></FilterTextInput>
                    <FilterSelectInput
                        label="Jenis Pinjaman"
                        options={jenisPinjaman}
                        selectedVal={selectedJenis}
                    ></FilterSelectInput>
                    <FilterSelectInput
                        label="Status"
                        options={statusPinjaman}
                        selectedVal={selectedStatus}
                    ></FilterSelectInput>
                    <FilterDateSelector handleDateChange label="Tarikh Mohon"
                    ></FilterDateSelector>
                </div>
            </CustomCardBody>
        </CustomCard>
        <SectionHeader
            title="Senarai Rekod Pinjaman"
            subTitle={'Jumlah Rekod: ' + rekodPinjaman.length}
        />
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <DynamicTable
                withActions
                actionOptions={['detail']}
                bind:passData={currentData}
                detailActions={() => {
                    if (currentData.jenisPinjaman === 'Komputer') {
                        goto('/ketua-seksyen/pinjaman/butiran/komputer');
                    } else if (currentData.jenisPinjaman) {
                        goto('/ketua-seksyen/pinjaman/butiran/kenderaan');
                    }
                }}
                tableItems={rekodPinjaman}
                columnKeys={[
                    'noPekerja',
                    'namaKakitangan',
                    'noKadPengenalan',
                    'jenisPinjaman',
                    'tarikhMohon',
                    'jumlah',
                    'status',
                    'tindakan',
                ]}
            ></DynamicTable>
        </div>
    </CustomTabContent>
</section>
