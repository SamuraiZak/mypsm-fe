<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import type {
        CalonPemangkuan,
        DtoCalonPemangkuan,
        IntActingApplication,
        MesyuaratPemilihanCalonPemangkuan,
    } from '$lib/interfaces/database/actingApplication';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { createCompareFn } from '$lib/service/services';

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex += 1;
    }

    //===================== Page Init Data =====================

    let actingDetails: IntActingApplication = {
        idRekod: 1,
        jenisPemangkuan: 'Gred 1-54',
        tarikhRekod: Date.now.toString(),
        jumlahCalon: 0,
        status: 'Sedang Diproses',
        calonPemangkuan: [],
    };

    let allEmployeeList: DtoCalonPemangkuan[] = [
        {
            idRekod: 1,
            idKakitangan: 1,
            nomborPekerja: '00001',
            namaKakitangan: 'Jon Bovi',
            nomborKP: '910821-13-5671',
            gredSemasa: 'E30',
            jawatanSemasa: 'Penolong Pegawai Perkhidmatan',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',
            kodJawatanMemangku: '',
            gelaranJawatanMemangku: '',
            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            permohonanPenangguhan: '',
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir
            kodJawatanMemangkuAkhir: '',
            gelaranJawatanMemangkuAkhir: '',
            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
        {
            idRekod: 2,
            idKakitangan: 2,
            nomborPekerja: '00002',
            namaKakitangan: 'Teressa Teng',
            nomborKP: '930315-13-6188',
            gredSemasa: 'D41',
            jawatanSemasa: 'Penolong Pegawai Tadbir',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',
            kodJawatanMemangku: '',
            gelaranJawatanMemangku: '',
            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            permohonanPenangguhan: '',
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir
            kodJawatanMemangkuAkhir: '',
            gelaranJawatanMemangkuAkhir: '',
            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
        {
            idRekod: 3,
            idKakitangan: 3,
            nomborPekerja: '00003',
            namaKakitangan: 'Xue Hua Piao',
            nomborKP: '851130-13-7747',
            gredSemasa: 'H12',
            jawatanSemasa: 'Penolong Pegawai Teknologi Maklumat',
            // mesyuarat
            gredUntukDipangku: '',
            jawatanUntukDipangku: '',
            layakTemuduga: '',
            // temuduga
            tarikhTemuduga: '',
            masaTemuduga: '',
            pusatTemuduga: '',
            markahTemuduga: '',
            keputusanTemuduga: '',
            // semakan
            laporanTatatertib: '',
            laporanPrestasi: '',
            laporanSprm: '',
            perakuanKetuaJabatan: '',
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: '',
            kodJawatanMemangku: '',
            gelaranJawatanMemangku: '',
            tarikhKuatkuasaPemangkuan: '',
            tarikhCukupTempohPemangkuan: '',
            // mesyuarat penempatan
            penempatanBaru: '',
            tarikhLaporDiri: '',
            // permohonan penangguhan
            permohonanPenangguhan: '',
            penempatanDipohon: '',
            tarikhLaporDiriDipohon: '',
            keputusanPenangguhanAtauPindaan: '',
            // keputusan akhir
            kodJawatanMemangkuAkhir: '',
            gelaranJawatanMemangkuAkhir: '',
            tarikhKuatKuasaPemangkuanAkhir: '',
            tarikhCukupTempohPemangkuanAkhir: '',
            penempatanBaruAkhir: '',
            tarikhLaporDiriAkhir: '',
        },
    ];

    let selectedCandidatesList: DtoCalonPemangkuan[] = [];

    let tempSelectedCandidatesList: DtoCalonPemangkuan[] = [];

    let currentData: any = {};

    let placeholderData: any = {};

    let editMode: boolean = false;

    //===================== Step 1 =====================

    // Step 1 script starts here
    let editingCandidateList = false;

    function saveSelected() {
        // actingDetails.calonPemangkuan = selectedCandidatesList;
        selectedCandidatesList = tempSelectedCandidatesList;
    }

    function assignValue() {
        placeholderData = {
            idRekod: currentData.idRekod,
            idKakitangan: currentData.idKakitangan,
            nomborPekerja: currentData.nomborPekerja,
            namaKakitangan: currentData.namaKakitangan,
            nomborKP: currentData.nomborKP,
            gredSemasa: currentData.gredSemasa,
            jawatanSemasa: currentData.jawatanSemasa,
            // mesyuarat
            gredUntukDipangku: currentData.gredUntukDipangku,
            jawatanUntukDipangku: currentData.jawatanUntukDipangku,
            layakTemuduga: currentData.layakTemuduga,
            // temuduga
            tarikhTemuduga: currentData.tarikhTemuduga,
            masaTemuduga: currentData.masaTemuduga,
            pusatTemuduga: currentData.pusatTemuduga,
            markahTemuduga: currentData.markahTemuduga,
            keputusanTemuduga: currentData.keputusanTemuduga,
            // semakan
            laporanTatatertib: currentData.laporanTatatertib,
            laporanPrestasi: currentData.laporanPrestasi,
            laporanSprm: currentData.laporanSprm,
            perakuanKetuaJabatan: currentData.perakuanKetuaJabatan,
            // mesyuarat kenaikan pangkat
            keputusanKenaikanPangkat: currentData.keputusanKenaikanPangkat,
            kodJawatanMemangku: currentData.kodJawatanMemangku,
            gelaranJawatanMemangku: currentData.gelaranJawatanMemangku,
            tarikhKuatkuasaPemangkuan: currentData.tarikhKuatkuasaPemangkuan,
            tarikhCukupTempohPemangkuan:
                currentData.tarikhCukupTempohPemangkuan,
            // mesyuarat penempatan
            penempatanBaru: currentData.penempatanBaru,
            tarikhLaporDiri: currentData.tarikhLaporDiri,
            // permohonan penangguhan
            permohonanPenangguhan: currentData.permohonanPenangguhan,
            penempatanDipohon: currentData.penempatanDipohon,
            tarikhLaporDiriDipohon: currentData.tarikhLaporDiriDipohon,
            keputusanPenangguhanAtauPindaan:
                currentData.keputusanPenangguhanAtauPindaan,
            // keputusan akhir
            kodJawatanMemangkuAkhir: currentData.kodJawatanMemangkuAkhir,
            gelaranJawatanMemangkuAkhir:
                currentData.gelaranJawatanMemangkuAkhir,
            tarikhKuatKuasaPemangkuanAkhir:
                currentData.tarikhKuatKuasaPemangkuanAkhir,
            tarikhCukupTempohPemangkuanAkhir:
                currentData.tarikhCukupTempohPemangkuanAkhir,
            penempatanBaruAkhir: currentData.penempatanBaruAkhir,
            tarikhLaporDiriAkhir: currentData.tarikhLaporDiriAkhir,
        };
    }
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred 1-54"
        description="Sila pilih kakitangan yang layak sebagai calon pemangkuan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/urus-setia/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <!-- =========================================================== -->
        <!-- Senarai Calon Pemangkuan -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader
                title="Senarai Kakitangan Untuk Pemangkuan Jawatan"
            >
                {#if editingCandidateList}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            saveSelected();
                            editingCandidateList = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {:else}
                    <TextIconButton
                        label="Tambah"
                        onClick={() => {
                            editingCandidateList = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                    <TextIconButton primary label="Cetak">
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            {#if editingCandidateList}
                <StepperContentBody paddingClass="p-0">
                    <CustomTab>
                        <!-- Senarai semua kakitangan -->

                        <CustomTabContent title="Senarai Semua Kakitangan"
                            ><SectionHeader
                                subTitle="Tekan butang '+' untuk masukkan ke dalam senarai kakitangan yang terpilih"
                            ></SectionHeader>
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <DynamicTable
                                    bind:selectedItems={tempSelectedCandidatesList}
                                    bind:passData={currentData}
                                    tableItems={allEmployeeList}
                                    selectAdd
                                    withRowSelection
                                    onSelect={() => {
                                        // pushSelected(currentData);
                                    }}
                                    columnKeys={[
                                        'nomborPekerja',
                                        'namaKakitangan',
                                        'nomborKP',
                                        'gredSemasa',
                                        'jawatanSemasa',
                                    ]}
                                ></DynamicTable>
                            </div>
                        </CustomTabContent>

                        <!-- Senarai kakitangan yang dipilih -->

                        <CustomTabContent
                            title="Senarai Kakitangan Yang Dipilih"
                        >
                            <SectionHeader
                                subTitle="Tekan butang '-' untuk keluarkan kakitangan daripada senarai yang terpilih"
                            ></SectionHeader>
                            <div
                                class="flex max-h-full w-full flex-col items-start justify-start"
                            >
                                <DynamicTable
                                    bind:selectedItems={tempSelectedCandidatesList}
                                    bind:passData={currentData}
                                    tableItems={tempSelectedCandidatesList}
                                    withRowSelection
                                    onSelect={() => {
                                        // popSelected(currentData);
                                    }}
                                    columnKeys={[
                                        'nomborPekerja',
                                        'namaKakitangan',
                                        'nomborKP',
                                        'gredSemasa',
                                        'jawatanSemasa',
                                    ]}
                                ></DynamicTable>
                            </div>
                        </CustomTabContent>
                    </CustomTab>
                </StepperContentBody>
            {:else}
                <StepperContentBody>
                    <SectionHeader
                        subTitle="Sila cetak senarai kakitangan untuk dibawa ke mesyuarat"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredSemasa',
                                'jawatanSemasa',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Mesyuarat Pemilihan Calon -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat Pemilihan Calon">
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gred Jawatan Semasa"
                                bind:value={placeholderData.gredSemasa}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Jawatan Semasa"
                                bind:value={placeholderData.jawatanSemasa}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Gred Jawatan Untuk Dipangku"
                                bind:value={placeholderData.gredUntukDipangku}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Nama Jawatan Untuk Dipangku"
                                bind:value={placeholderData.jawatanUntukDipangku}
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.layakTemuduga}
                                type="text"
                                id="staff-number"
                                label="Layak Temuduga"
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredSemasa',
                                'jawatanSemasa',
                                'gredUntukDipangku',
                                'jawatanUntukDipangku',
                                'layakTemuduga',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gred Jawatan Untuk Dipangku"
                                bind:value={placeholderData.gredUntukDipangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Jawatan Untuk Dipangku"
                                bind:value={placeholderData.jawatanUntukDipangku}
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.tarikhTemuduga}
                                type="text"
                                id="staff-number"
                                label="Tarikh Temuduga"
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.masaTemuduga}
                                type="text"
                                id="staff-number"
                                label="Masa Temuduga"
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.pusatTemuduga}
                                type="text"
                                id="staff-number"
                                label="Pusat Temuduga"
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredUntukDipangku',
                                'jawatanUntukDipangku',
                                'tarikhTemuduga',
                                'masaTemuduga',
                                'pusatTemuduga',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gred Jawatan Untuk Dipangku"
                                bind:value={placeholderData.gredUntukDipangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Jawatan Untuk Dipangku"
                                bind:value={placeholderData.jawatanUntukDipangku}
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.markahTemuduga}
                                type="text"
                                id="staff-number"
                                label="Markah Temuduga"
                            ></TextField>

                            <TextField
                                bind:value={placeholderData.keputusanTemuduga}
                                type="text"
                                id="staff-number"
                                label="Keputusan Temuduga"
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredUntukDipangku',
                                'jawatanUntukDipangku',
                                'markahTemuduga',
                                'keputusanTemuduga',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Semakan Rekod Perkhidmatan Calon Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Semakan Rekod Perkhidmatan Calon Pemangkuan"
            >
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gred Jawatan Untuk Dipangku"
                                bind:value={placeholderData.gredUntukDipangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Jawatan Untuk Dipangku"
                                bind:value={placeholderData.jawatanUntukDipangku}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Laporan Tatatertib"
                                bind:value={placeholderData.laporanTatatertib}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Laporan Prestasi"
                                bind:value={placeholderData.laporanPrestasi}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Laporan SPRM"
                                bind:value={placeholderData.laporanSprm}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Perakuan Ketua Jabatan"
                                bind:value={placeholderData.perakuanKetuaJabatan}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredUntukDipangku',
                                'jawatanUntukDipangku',
                                'laporanTatatertib',
                                'laporanPrestasi',
                                'laporanSprm',
                                'perakuanKetuaJabatan',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Mesyuarat Kenaikan Pangkat -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat Kenaikan Pangkat">
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Keputusan Kenaikan Pangkat"
                                bind:value={placeholderData.keputusanKenaikanPangkat}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Kod Jawatan Memangku"
                                bind:value={placeholderData.kodJawatanMemangku}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Gelaran Jawatan Memangku"
                                bind:value={placeholderData.gelaranJawatanMemangku}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Tarikh Kuatkuasa Pemangkuan"
                                bind:value={placeholderData.tarikhKuatkuasaPemangkuan}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Tarikh Cukup Tempoh Pemangkuan"
                                bind:value={placeholderData.tarikhCukupTempohPemangkuan}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit', 'detail']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'gredUntukDipangku',
                                'jawatanUntukDipangku',
                                'keputusanKenaikanPangkat',
                                'kodJawatanMemangku',
                                'gelaranJawatanMemangku',
                                'tarikhKuatkuasaPemangkuan',
                                'tarikhCukupTempohPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Mesyuarat Penempatan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Mesyuarat Penempatan Kakitangan"
            >
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Kod Jawatan Memangku"
                                bind:value={placeholderData.kodJawatanMemangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gelaran Jawatan Memangku"
                                bind:value={placeholderData.gelaranJawatanMemangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Kuatkuasa Pemangkuan"
                                bind:value={placeholderData.tarikhKuatkuasaPemangkuan}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru"
                                bind:value={placeholderData.penempatanBaru}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri"
                                bind:value={placeholderData.tarikhLaporDiri}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit', 'detail']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'kodJawatanMemangku',
                                'gelaranJawatanMemangku',
                                'tarikhKuatkuasaPemangkuan',
                                'penempatanBaru',
                                'tarikhLaporDiri',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Permohonan Penangguhan / Pindaan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Permohonan Penangguhan / Pindaan Daripada Calon Pemangkuan"
            >
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Kod Jawatan Memangku"
                                bind:value={placeholderData.kodJawatanMemangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gelaran Jawatan Memangku"
                                bind:value={placeholderData.gelaranJawatanMemangku}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru"
                                bind:value={placeholderData.penempatanBaru}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri"
                                bind:value={placeholderData.tarikhLaporDiri}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Permohonan Penangguhan / Pindaan"
                                bind:value={placeholderData.permohonanPenangguhan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri Yang Dipohon"
                                bind:value={placeholderData.tarikhLaporDiriDipohon}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Penempatan Yang Dipohon"
                                bind:value={placeholderData.penempatanDipohon}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Keputusan Permohonan"
                                bind:value={placeholderData.keputusanPenangguhanAtauPindaan}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit', 'detail']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'kodJawatanMemangku',
                                'gelaranJawatanMemangku',
                                'penempatanBaru',
                                'tarikhLaporDiri',
                                'permohonanPenangguhan',
                                'penempatanDipohon',
                                'tarikhLaporDiriDipohon',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Permohonan Penangguhan / Pindaan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan / Pindaan"
            >
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Kod Jawatan Memangku"
                                bind:value={placeholderData.kodJawatanMemangkuAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gelaran Jawatan Memangku"
                                bind:value={placeholderData.gelaranJawatanMemangkuAkhir}
                            ></TextField>

                            <div class="w-full">
                                <hr
                                    class="my-2.5 flex-grow border-t border-bdr-primary"
                                />
                            </div>

                            <SectionHeader title="Keputusan Mesyuarat"
                            ></SectionHeader>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru Yang Ditawarkan"
                                bind:value={placeholderData.penempatanBaru}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri Yang Ditawarkan"
                                bind:value={placeholderData.tarikhLaporDiri}
                            ></TextField>

                            <div class="w-full">
                                <hr
                                    class="my-2.5 flex-grow border-t border-bdr-primary"
                                />
                            </div>

                            <SectionHeader
                                title="Permohonan Penangguhan / Pindaan"
                            ></SectionHeader>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru Yang Dipohon"
                                bind:value={placeholderData.penempatanDipohon}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri Yang Dipohon"
                                bind:value={placeholderData.tarikhLaporDiriDipohon}
                            ></TextField>

                            <div class="w-full">
                                <hr
                                    class="my-2.5 flex-grow border-t border-bdr-primary"
                                />
                            </div>

                            <SectionHeader
                                title="Keputusan Permohonan Penangguhan / Pindaan"
                            ></SectionHeader>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Keputusan"
                                bind:value={placeholderData.keputusanPenangguhanAtauPindaan}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru Yang Diluluskan"
                                bind:value={placeholderData.penempatanBaruAkhir}
                            ></TextField>

                            <TextField
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri Yang Diluluskan"
                                bind:value={placeholderData.tarikhLaporDiriAkhir}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['edit']}
                            bind:passData={currentData}
                            editActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'permohonanPenangguhan',
                                'penempatanDipohon',
                                'tarikhLaporDiriDipohon',
                                'keputusanPenangguhanAtauPindaan',
                                'kodJawatanMemangkuAkhir',
                                'gelaranJawatanMemangkuAkhir',
                                'penempatanBaruAkhir',
                                'tarikhLaporDiriAkhir',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Pemangkuan (Akhir) -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Pemangkuan (Akhir)">
                {#if editMode}
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editMode = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => {
                            let tempData = selectedCandidatesList.filter(
                                (item) => item != currentData,
                            );

                            tempData.push(placeholderData);

                            selectedCandidatesList = tempData;

                            selectedCandidatesList.sort(
                                createCompareFn('nomborPekerja', 'asc'),
                            );

                            editMode = false;
                        }}
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if editMode}
                    <SectionHeader
                        subTitle="Sila kemaskini butiran yang berkaitan"
                    ></SectionHeader>
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start"
                    >
                        <form
                            class="flex h-fit w-full flex-col items-center justify-start gap-2.5"
                        >
                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. Pekerja"
                                bind:value={placeholderData.nomborPekerja}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Nama Kakitangan"
                                bind:value={placeholderData.namaKakitangan}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="No. K/P"
                                bind:value={placeholderData.nomborKP}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Kod Jawatan Memangku"
                                bind:value={placeholderData.kodJawatanMemangkuAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Gelaran Jawatan Memangku"
                                bind:value={placeholderData.gelaranJawatanMemangkuAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Kuatkuasa Pemangkuan"
                                bind:value={placeholderData.tarikhKuatKuasaPemangkuanAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Cukup Tempoh Pemangkuan"
                                bind:value={placeholderData.tarikhCukupTempohPemangkuanAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Penempatan Baru"
                                bind:value={placeholderData.penempatanBaruAkhir}
                            ></TextField>

                            <TextField
                                disabled
                                type="text"
                                id="staff-number"
                                label="Tarikh Lapor Diri"
                                bind:value={placeholderData.tarikhLaporDiriAkhir}
                            ></TextField>
                        </form>
                    </div>
                {:else}
                    <SectionHeader
                        subTitle="Semak dan kemaskini keputusan mesyuarat bagi calon-calon pemangkuan yang berikut"
                    ></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DynamicTable
                            withActions
                            actionOptions={['detail']}
                            bind:passData={currentData}
                            detailActions={() => {
                                assignValue();
                                editMode = true;
                            }}
                            tableItems={selectedCandidatesList}
                            columnKeys={[
                                'nomborPekerja',
                                'namaKakitangan',
                                'nomborKP',
                                'kodJawatanMemangkuAkhir',
                                'gelaranJawatanMemangkuAkhir',
                                'tarikhKuatKuasaPemangkuanAkhir',
                                'tarikhCukupTempohPemangkuanAkhir',
                                'penempatanBaruAkhir',
                                'tarikhLaporDiriAkhir',
                            ]}
                        ></DynamicTable>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
