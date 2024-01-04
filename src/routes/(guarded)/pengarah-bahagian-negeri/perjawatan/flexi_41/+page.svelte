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
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import { Checkbox, Radio, Tooltip } from 'flowbite-svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import { permohonanKlinikPanel } from '$lib/mocks/penyokong/perubatan/permohonan-klinik-panel';
    import { positions } from '$lib/mocks/positions/positions';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
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
    import { greds } from '$lib/mocks/gred/gred.js';
    import Form from '$lib/components/form/Form.svelte';
    import SvgArrowDown from '$lib/assets/svg/SvgArrowDown.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';



    const salaryMonths = [
        { value: '1', name: 'Januari' },
        { value: '2', name: 'April' },
        { value: '3', name: 'Julai' },
        { value: '4', name: 'Oktober' },
    ];

    let selectedMeetingType: string = meetings[0].value;
    let selectedSalaryMonth: string = '1';
    let selectedGred: string = greds[0].value;

    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

    const perakukanOptions: RadioOption[] = [
        {
            value: 'perakukan',
            label: 'Perakukan',
        },
        {
            value: 'tidakPerakukan',
            label: 'Tidak Perakukan',
        },
    ];

    onMount(() => {
        target = document.getElementById('fileInput');
    });

    // Function to handle the file changes
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
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
            gredPemangkuan: 'A41',
            jawatanSemasa: 'Penolong Pegawai Perkhidmatan',
            program: '-',
            skim: '-',
            penempatanSekarang: '-',

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
            gredPemangkuan: '-',
            jawatanSemasa: 'Penolong Pegawai Tadbir',
            program: '-',
            skim: '-',
            penempatanSekarang: '-',
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
            gredPemangkuan: 'D43',
            jawatanSemasa: 'Penolong Pegawai Teknologi Maklumat',
            program: '-',
            skim: '-',
            penempatanSekarang: '-',
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

    //Date Selector for Tarikh Lapor Diri
    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

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
        title="Pemangkuan Gred 41"
        description="Sila pilih kakitangan yang terlibat dalam process pemangkuan ini"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/halaman-utama');
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
        <!-- Senarai Kakitangan Yang Terpilih -->
        <!-- =========================================================== -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Search Kakitangan Yang Dipilih -->
            <StepperContentBody>
                <SectionHeader title=" Senarai Kakitangan Yang Dipilih">
                    <TextIconButton label="cetak" primary onClick={() => {}}>
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>

                <CustomTabContent>
                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="Gred"></FilterTextInput>
                                <FilterTextInput label="Jawatan"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>

                                <TextIconButton
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol tolak untuk kelarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                        ></SectionHeader>

                        <!-- Table Senarai Kakitangan Yang Dipilih -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            withRowSelection
                            onSelect={() => {
                                console.log('pop selected here');
                            }}
                            editable
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'gred',
                                'gredSemasa',
                                'penempatanSemasa',
                            ]}
                        ></DynamicTable>
                    </div>
                </CustomTabContent>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Penyokongan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Mesyuarat Pemilihan Calon">
                <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                    <TextIconButton primary label="Simpan" onClick={() => {}}>
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title=" Keputusan daripada Pengarah Bahagian atau Negeri"
                ></SectionHeader>

                <div class="flex w-full flex-col gap-2">
                    <p
                        class="mt-2 h-fit w-full bg-bgr-primary text-sm italic text-system-accent"
                    >
                        ● Keptusan akan dihantar ke email klinik dan Urus Setia berkaitan.
                    </p>

                    <div class="flex w-full flex-col gap-2">
                        <div
                            class="flex h-fit w-full flex-col items-center justify-start gap-2 border-b border-bdr-primary pb-5"
                        >
                            <LongTextField
                                id="tindakanUlasan"
                                label={'Tindakan/ Ulasan'}
                                value={'Butiran lengkap..'}
                            ></LongTextField>

                            <!--radio Perakuan/Tidak Perakukan-->

                            <RadioSingle options={perakukanOptions} />
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
