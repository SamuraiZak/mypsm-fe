<script lang="ts">
    import { disableScrollHandling, goto } from '$app/navigation';
    import SvgArrowDown from '$lib/assets/svg/SvgArrowDown.svelte';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import SvgClipBoard from '$lib/assets/svg/SvgClipBoard.svelte';
    import SvgDocument from '$lib/assets/svg/SvgDocument.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgEllipsisCircle from '$lib/assets/svg/SvgEllipsisCircle.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgPDF2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperButton from '$lib/components/stepper/StepperButton.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type {
        CalonPemangkuan,
        DtoCalonPemangkuan,
        IntActingApplication,
        MesyuaratPemilihanCalonPemangkuan,
    } from '$lib/interfaces/database/actingApplication';
    import { mockPerjawatanPemangkuan } from '$lib/mocks/database/mockPerjawatanPemangkuan';
    import { pelulusPersaraan } from '$lib/mocks/pelulus/pelulus-persaraan';
    import { positions } from '$lib/mocks/positions/positions';
    import { createCompareFn } from '$lib/service/services';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

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
            penempatanBaru: '-',
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
            penempatanBaru: '-',
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
            penempatanBaru: '-',
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

    let keputusanPemilihan = [
        {
            value: 'true',
            name: 'Berjaya',
        },
        {
            value: 'false',
            name: 'Tidak Berjaya',
        },
    ];

    //Date Selector for Tarikh Lapor Diri - Kemaskini Keputusan Mesyuarat Penempatan Kakitangan
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

    //upload files for Kemaskini Maklumat Temuduga
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

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
    }

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;
    // date common schema
    // const dateScheme = z.coerce
    //     .date({
    //         errorMap: (issue, { defaultError }) => ({
    //             message:
    //                 issue.code === 'invalid_date'
    //                     ? 'Tarikh tidak boleh dibiarkan kosong.'
    //                     : defaultError,
    //         }),
    //     })
    //     .min(new Date(), {
    //         message:
    //             'Tarikh lapor diri yang dipohon hendaklah tidak kurang dari tarikh semasa.',
    //     });

    const exampleFormSchema = z.object({
        secretaryName: z.enum(['0', '1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama Urus Setia Integriti yang berkaitan.'
                        : defaultError,
            }),
        }),
        directorName: z.enum(['0', '1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama Pengarah Bahagian/Negeri yang berkaitan.'
                        : defaultError,
            }),
        }),
        keputusanPemilihanDropdown: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan pemilihan yang berkaitan.'
                        : defaultError,
            }),
        }),
        meetingName: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Sila isi nama mesyuarat yang lengkap.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        // dateSelector: dateScheme,
    });

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const secretaryName = document.getElementById(
            'secretaryName',
        ) as HTMLSelectElement;
        const directorName = document.getElementById(
            'directorName',
        ) as HTMLSelectElement;
        const keputusanPemilihanDropdown = document.getElementById(
            'keputusanPemilihanDropdown',
        ) as HTMLSelectElement;

        const exampleFormData = {
            secretaryName: String(secretaryName.value),
            directorName: String(directorName.value),
            keputusanPemilihanDropdown: String(
                keputusanPemilihanDropdown.value,
            ),
            meetingName: String(formData.get('meetingName')),
            // dateSelector: String(formData.get('dateSelector')),
        };
        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
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
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goto('/urus-setia/perjawatan/pemangkuan/1_54/baru');
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Kakitangan Yang Dipilih"
                    ><TextIconButton
                        primary
                        label="Cetak"
                        onClick={() => {
                            alert('printing..');
                        }}
                    >
                        <SvgPrinter></SvgPrinter>
                    </TextIconButton>
                </SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    title="Hasil Carian"
                    subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
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
                            'skim',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Maklumat Peraku Keputusan Mesyuarat"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="formValidation"
                        on:submit|preventDefault={submitForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <DropdownSelect
                            hasError={errorData?.secretaryName}
                            id="secretaryName"
                            label="Nama Urus Setia Integriti"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                        {#if errorData?.secretaryName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.secretaryName[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            hasError={errorData?.directorName}
                            id="directorName"
                            label="Nama Pengarah Bahagian / Negeri"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                        {#if errorData?.directorName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.directorName[0]}</span
                            >
                        {/if}
                    </form>
                </div>
                <SectionHeader
                    title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
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
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton primary label="Tidak Lulus">
                            <SvgBlock></SvgBlock>
                        </TextIconButton>
                        <TextIconButton primary label="Lulus">
                            <SvgDoubleTick></SvgDoubleTick>
                        </TextIconButton>
                        <TextIconButton primary label="">
                            <SvgArrowRight></SvgArrowRight>
                        </TextIconButton>
                    </SectionHeader>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-t"
                >
                    <SectionHeader
                        title="Hasil Carian"
                        subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                    ></SectionHeader>
                </div>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- selectedCandidatesList -->
                    <DataTable title="">
                        <DtTableHead>
                            <DtTableHeadCell title="Bil. "></DtTableHeadCell>
                            <DtTableHeadCell title="No. Pekerja"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Nama Pekerja"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="No. Kad Pengenalan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Program"></DtTableHeadCell>
                            <DtTableHeadCell title="Skim"></DtTableHeadCell>
                            <DtTableHeadCell title="Gred"></DtTableHeadCell>
                            <DtTableHeadCell title="Nama Jawatan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Penempatan Sekarang"
                            ></DtTableHeadCell>
                            <DtTableHeadCell title="Keputusan Pemilihan"
                            ></DtTableHeadCell>
                            <DtTableHeadCell></DtTableHeadCell>
                        </DtTableHead>
                        <DtTableBody>
                            {#each mockPerjawatanPemangkuan as item, i (i)}
                                <DtTableRow>
                                    <DtTableDataCell value={i + 1}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.nomborPekerja}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.namaPekerja}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.noKadPengenalan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.program}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.skim}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.gred}
                                    ></DtTableDataCell>
                                    <DtTableDataCell value={item.namaJawatan}
                                    ></DtTableDataCell>
                                    <DtTableDataCell
                                        value={item.penempatanSekarang}
                                    ></DtTableDataCell>
                                    <DtTableDataCell>
                                        <div class="flex flex-col">
                                            <DropdownSelect
                                                hasError={errorData?.keputusanPemilihanDropdown}
                                                id="keputusanPemilihanDropdown"
                                                label=""
                                                dropdownType="label-left"
                                                options={keputusanPemilihan}
                                            />
                                            {#if errorData?.keputusanPemilihanDropdown}
                                                <span
                                                    class="font-sans text-sm italic text-system-danger"
                                                    >{errorData
                                                        ?.keputusanPemilihanDropdown[0]}</span
                                                >
                                            {/if}
                                        </div>
                                    </DtTableDataCell>
                                    <DtTableDataCell>
                                        <IconButton
                                            onClick={() => {
                                                console.log(
                                                    'action function for each cell',
                                                );
                                            }}><SvgEdit></SvgEdit></IconButton
                                        >
                                    </DtTableDataCell>
                                </DtTableRow>
                            {/each}
                        </DtTableBody>
                    </DataTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    form="formValidation"
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="Butiran Tawaran dan Temuduga"
                ></SectionHeader>
                <form
                    id="formValidation"
                    on:submit|preventDefault={submitForm}
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        hasError={errorData?.meetingName}
                        id="meetingName"
                        label={'Nama Mesyuarat'}
                        value={'Masyarakat Tersebut'}
                    ></TextField>
                    {#if errorData?.meetingName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingName[0]}</span
                        >
                    {/if}
                </form>

                <TextField
                    id="meetingDate"
                    label={'Tarikh Mesyuarat'}
                    value={'01/08/2023'}
                ></TextField>
                <TextField id="gred" label={'Gred'} value={'DV41'}></TextField>
                <TextField
                    id="position"
                    label={'Jawatan'}
                    value={'Setiausaha Pejabat'}
                ></TextField>
                <TextField
                    id="interviewDate"
                    label={'Tarikh Temuduga'}
                    value={'07/09/2023'}
                ></TextField>
                <TextField
                    id="interviewTime"
                    label={'Masa Temuduga'}
                    value={'10am - 11am'}
                ></TextField>
                <TextField id="state" label={'Negeri'} value={'Sabah'}
                ></TextField>
                <TextField
                    id="interviewVenue"
                    label={'Pusat Temuduga'}
                    value={'LKIM SARAWAK - KUCHING'}
                ></TextField>

                <!-- Document Upload -->
                <div
                    class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5 pt-5"
                >
                    <SectionHeader
                        color="system-primary"
                        title="Dokumen-Dokumen yang Berkaitan"
                        ><div hidden={$fileSelectionList.length == 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div></SectionHeader
                    >
                    <div
                        class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                    >
                        <div class="flex flex-wrap gap-3">
                            {#each $fileSelectionList as item, index}
                                <FileInputFieldChildren
                                    childrenType="grid"
                                    handleDelete={() => handleDelete(index)}
                                    fileName={item.name}
                                />
                            {/each}
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2.5"
                        >
                            <p
                                class=" text-sm text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            >
                                Seret dan lepas fail anda ke dalam ruangan ini
                                atau pilih fail dari peranti anda
                            </p>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div
                                class="text-txt-tertiary"
                                hidden={$fileSelectionList.length > 0}
                            >
                                <svg
                                    width={40}
                                    height={40}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                            </div>
                            <div hidden={$fileSelectionList.length > 0}>
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div>
                        </div>
                    </div>
                </div>

                <SectionHeader
                    title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="Gred"></FilterTextInput>
                            <FilterTextInput label="Jawatan"></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader
                    subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                >
                    <TextIconButton primary label="">
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-t"
                >
                    <SectionHeader
                        title="Hasil Carian"
                        subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                    ></SectionHeader>
                </div>

                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Selected Kakitangan -->
                    <DynamicTable
                        hasCheckbox
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'program',
                            'skim',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                            'keputusanPemilihan',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader title="Kemaskini Keputusan Temuduga">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Kemaskini Maklumat Temuduga"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Kakitangan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'maklumatTemuduga',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Maklumat Keputusan Temuduga">
                    <TextIconButton
                        label="Batal"
                        onClick={() => (editMode = false)}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() =>
                            alert('save maklumat keputusan temuduga')}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Markah Keseluruhan"
                    ></SectionHeader>
                    <TextField
                        id="markah-keseluruhan"
                        label={'Markah Keseluruhan'}
                        value={'79%'}
                    ></TextField>

                    <SectionHeader title="Senarai Calon Temuduga"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight />
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol tolak untuk keluarkan nama kakitangan daripada senarai kakitangan yang terpilih"
                        >
                            <TextIconButton label="" primary
                                ><SvgPDF2></SvgPDF2>
                            </TextIconButton>
                            <TextIconButton label="" primary
                                ><SvgExcel></SvgExcel>
                            </TextIconButton>
                        </SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Kakitangan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'tapisanTatatertib',
                                'pengisytiharanHarta',
                                'keputusanUrusSetiaIntegriti',
                                'keputusanPengarahNegeri',
                                'markahKeseluruhan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Kenaikan Pangkat -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        id="nama-mesyuarat"
                        label={'Nama Mesyuarat'}
                        value={'Mesyuarat Tersebut'}
                    ></TextField>
                    <TextField
                        id="tarikh-mesyuarat"
                        label={'Tarikh Mesyuarat'}
                        value={'01/08/2023'}
                    ></TextField>
                    <TextField
                        id="keputusan-mesyuarat"
                        label={'Keputusan Mesyuarat'}
                        value={'Berjaya/Tidak Berjaya'}
                    ></TextField>
                    <TextField
                        id="jawatan-pemangkuan"
                        label={'Jawatan Pemangkuan'}
                        value={'Setiausaha Pejabat'}
                    ></TextField>
                    <TextField
                        id="gred-pemangkuan"
                        label={'Gred Pemangkuan'}
                        value={'N32'}
                    ></TextField>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton primary label="">
                            <SvgArrowRight></SvgArrowRight>
                        </TextIconButton>
                    </SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                        <DynamicTable
                            hasCheckbox
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                    ><TextIconButton
                        label="Batal"
                        onClick={() => {
                            editingCandidateList = true;
                            editMode = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() =>
                            alert(
                                'save the keputusan mesyuarat kenaikan pangkat',
                            )}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="keputusan-mesyuarat"
                            label="Keputusan"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>

                    <!-- function for button###-->
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Penempatan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        id="Nama Mesyuarat"
                        label={'Nama Mesyuarat'}
                        value={'Mesyuarat Tersebut'}
                    ></TextField>
                    <TextField
                        id="tarikh-mesyuarat"
                        label={'Tarikh Mesyuarat'}
                        value={'01/08/2023'}
                    ></TextField>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
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
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader
                        subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                    >
                        <TextIconButton primary label="">
                            <SvgArrowRight></SvgArrowRight>
                        </TextIconButton>
                    </SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start border-t"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Keputusan Mesyuarat Penempatan Kakitangan -->
                        <DataTable title="">
                            <DtTableHead>
                                <DtTableHeadCell title="Bil. "
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Kad Pengenalan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Gred"></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Jawatan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Penempatan Sekarang"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Keputusan Mesyuarat Kenaikan Pangkat"
                                ></DtTableHeadCell>
                                <DtTableHeadCell
                                    title="Keputusan Mesyuarat Penempatan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell></DtTableHeadCell>
                            </DtTableHead>
                            <DtTableBody>
                                {#each mockPerjawatanPemangkuan as item, i (i)}
                                    <DtTableRow>
                                        <DtTableDataCell value={i + 1}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.nomborPekerja}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.namaPekerja}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.noKadPengenalan}
                                        ></DtTableDataCell>
                                        <DtTableDataCell value={item.gred}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.namaJawatan}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.penempatanSekarang}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.keputusanMesyuaratKenaikanPangkat}
                                        ></DtTableDataCell>
                                        <DtTableDataCell>
                                            <DropdownSelect
                                                id="mesyuaratPenempatan"
                                                label=""
                                                dropdownType="label-left"
                                                options={positions}
                                            />
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <IconButton
                                                onClick={() => {
                                                    editMode = true;
                                                }}
                                                ><SvgEdit></SvgEdit></IconButton
                                            >
                                        </DtTableDataCell>
                                    </DtTableRow>
                                {/each}
                            </DtTableBody>
                        </DataTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>

                    <SectionHeader title="Keputusan Mesyuarat"></SectionHeader>
                    <TextField
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'-'}
                    ></TextField>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="pengarah-baru"
                            label="Pengarah Baru"
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <DateSelector
                        {handleDateChange}
                        label={'Tarikh Lapor Diri'}
                    />
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Permohonan Penangguhan / Pindaan Penempatan Dari Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>
                                <TextIconButton
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Permohonan Penangguhan/Pindaan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                                'permohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Kemaskini Maklumat Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklum Balas Kakitangan"
                    ></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="maklum-balas-kakitangan"
                        label={'Kakitangan memerlukan Penangguhan/Pindaan Penempatan?'}
                        value={'Ya'}
                    ></TextField>
                    <div
                        class="flex w-full flex-row items-center justify-between"
                    >
                        <div
                            class="flex w-[220px] min-w-[220px] flex-row gap-2"
                        >
                            <label
                                for=""
                                class="text-sm font-medium text-txt-tertiary"
                                >Dokumen-Dokumen Berkaitan</label
                            >
                        </div>

                        <div class="flex w-full flex-row gap-2.5">
                            <DownloadAttachment
                                fileName={'surat_penangguhan_irfan'}
                            ></DownloadAttachment>
                        </div>
                    </div>

                    <div
                        class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center"
                    >
                        <p class="text-sm font-medium text-txt-tertiary">
                            Sekiranya kakitangan memilih untuk tidak membuat
                            Permohonan Penangguhan/Pindaan Penempatan sila terus
                            ke langkah berikut:
                        </p>
                        <p
                            class="bg-bgr-primary text-sm font-medium text-system-primary hover:underline"
                        >
                            Kemaskini Keputusan Pemangkuan
                        </p>
                    </div>
                    <SectionHeader
                        subTitle="Sekiranya kakitangan memilih untuk membuat Permohonan Penangguhan/Pindaan Penempatan sila isi butiran penangguhan berikut mengikut surat penangguhan yang disediakan oleh Kakitangan."
                    ></SectionHeader>
                    <SectionHeader
                        title="Butiran Penangguhan/Pindaan Penempatan"
                    ></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="tarikh-asal-lapor-diri"
                        label={'Tarikh Asal Lapor Diri'}
                        value={'2/10/2023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="penempatan-asal"
                        label={'Penempatan Asal'}
                        value={'Bahagian Pengurusan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="tarikh-lapor-diri-baru-dipohon"
                        label={'Tarikh Lapor Diri Baru Dipohon'}
                        value={'2/11/2023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="pindaan-penempatan-dipohon"
                        label={'Pindaan Penempatan Dipohon'}
                        value={'Bahagian Teknologi'}
                    ></TextField>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="keputusan"
                            label="Keputusan"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <DateSelector
                        {handleDateChange}
                        labelBlack={false}
                        label={'Kelulusan Tarikh Lapor Diri Baru'}
                    />
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="kelulusan-pindaan-penempatan-dipohon"
                            label="Kelulusan Pindaan Penempatan Dipohon"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Permohonan Penangguhan / Pindaan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            >
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft></SvgArrowLeft>
                </TextIconButton>
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => {
                        goNext();
                    }}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <StepperContentBody>
                <SectionHeader title="Senarai Calon Yang Terpilih"
                ></SectionHeader>
                <CustomCard borderClass="border-system-primary">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="No. Pekerja"
                            ></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>
                            <TextIconButton
                                label="Cari"
                                primary
                                onClick={() => {}}
                            >
                                <SvgManifyingGlass></SvgManifyingGlass>
                            </TextIconButton>
                        </div>
                    </CustomCardBody>
                </CustomCard>
                <SectionHeader title="Hasil Carian"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'gred',
                            'namaJawatan',
                            'penempatanSekarang',
                            'permohonanPenangguhanPindaanPenempatan',
                            'keputusanPermohonanPenangguhanPindaanPenempatan',
                        ]}
                    ></DynamicTable>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <TextIconButton
                        primary
                        label="Seterusnya"
                        onClick={() => {
                            goNext();
                        }}
                    >
                        <SvgArrowRight></SvgArrowRight>
                    </TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>
                                <TextIconButton
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Selected Keputusan Mesyuarat Kenaikan Pangkat -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gred',
                                'namaJawatan',
                                'penempatanSekarang',
                                'permohonanPenangguhanPindaanPenempatan',
                                'keputusanPermohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan"
                    ><TextIconButton
                        onClick={() => (editMode = false)}
                        label="Batal"
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save the keputusan mesyuarat')}
                    ></TextIconButton></StepperContentHeader
                >

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <div class="flex w-full flex-row items-center">
                        <p
                            class="text-sm font-medium italic text-system-primary"
                        >
                            Sekiranya tidak lulus, jawatan dan gred akan
                            dikembalikan ke butiran asal.
                        </p>
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="keputusan-pemangkuan"
                            label="Keputusan Pemangkuan"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <TextField
                        labelBlack={false}
                        id="jawatan-pemangkuan"
                        label={'Jawatan Pemangkuan'}
                        value={'Setiausaha Pejabat'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        id="gred-pemangkuan"
                        label={'Gred Pemangkuan'}
                        value={'N32'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'Bahagian Pengurusan'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        id="tarikh-lapor-diri"
                        label={'Tarikh Lapor Diri'}
                        value={'19/10/2023'}
                    ></TextField>
                    <SectionHeader title="Pengesah Keputusan"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="nama-penyokong"
                            label="Nama Penyokong"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DropdownSelect
                            id="nama-pelulus"
                            label="Nama Pelulus"
                            labelBlack={false}
                            dropdownType="label-left-full"
                            options={positions}
                        />
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Semak Pengesahan Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editMode}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pemangkuan"
                >
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft></SvgArrowLeft>
                    </TextIconButton>
                    <!-- <FormButton type="save"></FormButton> -->
                    <TextIconButton
                        primary
                        label="Simpan"
                        onClick={() => alert('save pemangkuan function')}
                        ><SvgCircleF2></SvgCircleF2></TextIconButton
                    >
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Senarai Calon Yang Terpilih"
                    ></SectionHeader>
                    <CustomCard borderClass="border-system-primary">
                        <CustomCardBody>
                            <div
                                class="flex w-full flex-wrap items-center gap-2.5"
                            >
                                <FilterTextInput label="No. Pekerja"
                                ></FilterTextInput>
                                <FilterTextInput label="Nama"></FilterTextInput>
                                <FilterTextInput label="No. K/P"
                                ></FilterTextInput>
                                <TextIconButton
                                    label="Cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>
                    <SectionHeader title="Hasil Carian"></SectionHeader>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <!-- Pengesahan Keputusan Pemangkuan -->
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editMode = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'gredPemangkuan',
                                'namaJawatan',
                                'penempatanSekarang',
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Keputusan Pemangkuan"
                    ><TextIconButton
                        label="Tutup"
                        onClick={() => (editMode = false)}
                        ><SvgXMark></SvgXMark>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>
                    <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="jawatan-baru"
                        label={'Nama Jawatan Baru'}
                        value={'JURUTERA'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="gred-baru"
                        label={'Gred Baru'}
                        value={'E24'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="penempatan-baru"
                        label={'Penempatan Baru'}
                        value={'LKIM SARAWAK - KUCHING'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="pengarah-baru"
                        label={'Pengarah Baru'}
                        value={'Ismail Sabri'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="tarikh-lapor-diri"
                        label={'Tarikh Lapor Diri'}
                        value={'19/10/2023'}
                    ></TextField>
                    <SectionHeader title="Pengesahan Keputusan"></SectionHeader>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-penyokong"
                        label={'Nama Penyokong'}
                        value={'Iskandar Yahya'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="keputusan"
                        label={'Keputusan'}
                        value={'Disokong'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="nama-pelulus"
                        label={'Nama Pelulus'}
                        value={'Zac Irfan'}
                    ></TextField>
                    <TextField
                        labelBlack={false}
                        disabled
                        id="keputusan"
                        label={'Keputusan'}
                        value={'Lulus'}
                    ></TextField>
                </StepperContentBody>
            {/if}
        </StepperContent>
    </Stepper>
</section>

<Toaster />
