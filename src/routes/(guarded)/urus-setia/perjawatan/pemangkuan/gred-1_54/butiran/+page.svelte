<script lang="ts">
    import { disableScrollHandling, goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgExcel from '$lib/assets/svg/SvgExcel.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import SvgPDF2 from '$lib/assets/svg/SvgPDF2.svelte';
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
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
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
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
    // import { createCompareFn } from '$lib/service/services';
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

    // Kemaskini Keputusan Mesyuarat Pemilihan Calon Stepper Form
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
        // dateSelector: dateScheme,
    });

    const submitForm = async (event: Event) => {
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

    // Kemaskini Maklumat Temuduga Stepper Form
    const updateInterviewDetails = z.object({
        meetingName: z
            .string({ required_error: 'Nama mesyuarat tidak boleh kosong.' })
            .min(10, {
                message: 'Nama mesyuarat hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama mesyuarat yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),

        meetingDate: z
            .string({ required_error: 'Tarikh mesyuarat tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh mesyuarat hendaklah mengikut format hh/bb/tttt.',
            })
            .max(10, {
                message:
                    'Format tarikh mesyuarat yang dimasukkan adalah tidak betul. Gunakan format hh/bb/tttt',
            })
            .trim(),

        gred: z
            .string({ required_error: 'Gred tidak boleh kosong.' })
            .min(4, {
                message: 'Masukkan gred yang betul.',
            })
            .max(10, {
                message: 'Gred yang dimasukkan adalah tidak betul.',
            })
            .trim(),

        position: z
            .string({ required_error: 'Jawatan tidak boleh kosong.' })
            .min(8, {
                message: 'Jawatan hendaklah melebihi 8 karakter.',
            })
            .max(20, {
                message: 'Jawatan hendaklah tidak melebihi 20 karakter.',
            })
            .trim(),

        interviewDate: z
            .string({ required_error: 'Tarikh temuduga tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh temuduga hendaklah mengikut format hh/bb/tttt.',
            })
            .max(10, {
                message:
                    'Format tarikh temuduga yang dimasukkan adalah tidak betul. Gunakan format hh/bb/tttt',
            })
            .trim(),

        interviewTime: z
            .string({ required_error: 'Masa temuduga tidak boleh kosong.' })
            .min(11, {
                message:
                    'Gunakan format masa [10am - 11am atau 10.30am - 11.30am].',
            })
            .max(18, {
                message: 'Format masa yang dimasukkan adalah tidak dibenarkan.',
            })
            .trim(),

        state: z
            .string({ required_error: 'Negeri tidak boleh kosong.' })
            .min(4, {
                message: 'Nama negeri hendaklah melebihi 4 karakter.',
            })
            .max(30, {
                message: 'Nama negeri melebihi format yang dibenarkan.',
            })
            .trim(),

        interviewVenue: z
            .string({ required_error: 'Pusat temuduga tidak boleh kosong.' })
            .min(4, {
                message: 'Nama pusat temuduga hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message:
                    'Nama pusat temuduga hendaklah tidak melebihi 124 karakter.',
            })
            .trim(),
    });
    const submitUpdateInterviewDetailsForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const updateInterviewFormData = {
            meetingName: String(formData.get('meetingName')),
            meetingDate: String(formData.get('meetingDate')),
            gred: String(formData.get('gred')),
            position: String(formData.get('position')),
            interviewDate: String(formData.get('interviewDate')),
            interviewTime: String(formData.get('interviewTime')),
            state: String(formData.get('state')),
            interviewVenue: String(formData.get('interviewVenue')),
            // dateSelector: String(formData.get('dateSelector')),
        };
        try {
            const result = updateInterviewDetails.parse(
                updateInterviewFormData,
            );
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedMeetingFormData = {
                    ...updateInterviewFormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedMeetingFormData),
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

    // Kemaskini Keputusan Temuduga Stepper Form
    const updateInterviewResult = z.object({
        totalInterviewScore: z
            .string({ required_error: 'Pusat temuduga tidak boleh kosong.' })
            .min(1, {
                message:
                    'Markah keputusan temuduga tidak boleh dibenarkan kosong.',
            })
            .max(4, {
                message:
                    'Markah yang dimasukkan adalah melebihi markah yang dibenarkan.',
            })
            .trim(),
    });
    const submitInterviewResultForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const interviewResultData = {
            totalInterviewScore: String(formData.get('totalInterviewScore')),
        };
        try {
            const result = updateInterviewResult.parse(interviewResultData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedInterviewFormData = {
                    ...interviewResultData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedInterviewFormData),
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

    const updatePromotionResult = z.object({
        meetingName: z
            .string({ required_error: 'Nama mesyuarat tidak boleh kosong.' })
            .min(10, {
                message: 'Nama mesyuarat hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama mesyuarat yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),

        meetingDate: z
            .string({ required_error: 'Tarikh mesyuarat tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh mesyuarat hendaklah mengikut format hh/bb/tttt. Contoh: 12/5/2023.',
            })
            .max(10, {
                message:
                    'Format tarikh mesyuarat yang dimasukkan adalah tidak betul. Contoh: 12/5/2023.',
            })
            .trim(),

        meetingResult: z
            .string({
                required_error: 'Keputusan mesyuarat tidak boleh kosong.',
            })
            .min(7, {
                message:
                    'Masukkan keputusan mesyuarat yang betul (Berjaya/Tidak Berjaya).',
            })
            .max(13, {
                message:
                    'Keputusan yang dimasukkan adalah tidak betul. Masukkan keputusan mesyuarat yang betul (Berjaya/Tidak Berjaya).',
            })
            .trim(),

        actingPosition: z
            .string({
                required_error: 'Jawatan pemangkuan tidak boleh kosong.',
            })
            .min(8, {
                message: 'Jawatan pemangkuan hendaklah melebihi 8 karakter.',
            })
            .max(20, {
                message:
                    'Jawatan pemangkuan hendaklah tidak melebihi 20 karakter.',
            })
            .trim(),

        actingGred: z
            .string({ required_error: 'Gred pemangkuan tidak boleh kosong.' })
            .min(3, {
                message:
                    'Gred pemangkuan hendaklah dalam format yang betul. Contoh: N32',
            })
            .max(4, {
                message:
                    'Format gred pemangkuan yang dimasukkan adalah tidak betul. Contoh: N32',
            })
            .trim(),
    });

    const submitPromotionResultForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const promotionResultData = {
            meetingName: String(formData.get('meetingName')),
            meetingDate: String(formData.get('meetingDate')),
            meetingResult: String(formData.get('meetingResult')),
            actingPosition: String(formData.get('actingPosition')),
            actingGred: String(formData.get('actingGred')),
        };
        try {
            const result = updatePromotionResult.parse(promotionResultData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedPromotionFormData = {
                    ...promotionResultData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedPromotionFormData),
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
    const promotionResult = z.object({
        meetingResultDropdown: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan mesyuarat.'
                        : defaultError,
            }),
        }),
    });

    const promotionResultForm = async (event: Event) => {
        const meetingResultDropdown = document.getElementById(
            'meetingResultDropdown',
        ) as HTMLSelectElement;
        const promotionResultData = {
            meetingResultDropdown: String(meetingResultDropdown.value),
        };
        try {
            const result = promotionResult.parse(promotionResultData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedPromotionFormData = {
                    ...promotionResultData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedPromotionFormData),
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

    // Kemaskini Keputusan Mesyuarat Penempatan Kakitangan
    const staffPlacement = z.object({
        meetingName: z
            .string({ required_error: 'Nama mesyuarat tidak boleh kosong.' })
            .min(10, {
                message: 'Nama mesyuarat hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama mesyuarat yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),

        meetingDate: z
            .string({ required_error: 'Tarikh mesyuarat tidak boleh kosong.' })
            .min(8, {
                message:
                    'Tarikh mesyuarat hendaklah mengikut format hh/bb/tttt. Contoh: 12/5/2023.',
            })
            .max(10, {
                message:
                    'Format tarikh mesyuarat yang dimasukkan adalah tidak betul. Contoh: 12/5/2023.',
            })
            .trim(),
        keputusanMesyuaratDropdown: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan pemilihan yang berkaitan.'
                        : defaultError,
            }),
        }),
    });
    const staffPlacementForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const keputusanMesyuaratDropdown = document.getElementById(
            'keputusanMesyuaratDropdown',
        ) as HTMLSelectElement;
        const placementFormData = {
            meetingName: String(formData.get('meetingName')),
            meetingDate: String(formData.get('meetingDate')),
            keputusanMesyuaratDropdown: String(
                keputusanMesyuaratDropdown.value,
            ),
        };
        try {
            const result = staffPlacement.parse(placementFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedPromotionFormData = {
                    ...placementFormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedPromotionFormData),
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

    const dateScheme = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiarkan kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message:
                'Tarikh lapor diri yang dipohon hendaklah tidak kurang dari tarikh semasa.',
        });

    const meetingPlacementResult = z.object({
        newPlacement: z
            .string({ required_error: 'Nama mesyuarat tidak boleh kosong.' })
            .min(10, {
                message: 'Nama mesyuarat hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama mesyuarat yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),
        newDirector: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan pemilihan yang berkaitan.'
                        : defaultError,
            }),
        }),
        reportingDate: dateScheme,
    });
    const placementMeetingResultForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const newDirector = document.getElementById(
            'newDirector',
        ) as HTMLSelectElement;
        const placementResult = {
            newPlacement: String(formData.get('newPlacement')),
            newDirector: String(newDirector.value),
            reportingDate: String(formData.get('reportingDate')),
        };
        try {
            const result = meetingPlacementResult.parse(placementResult);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedPromotionFormData = {
                    ...placementResult,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedPromotionFormData),
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

    //Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan
    const staffPlacementAmendmentForm = z.object({
        placementAmendmentResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan penangguhan/pindaan yang berkaitan.'
                        : defaultError,
            }),
        }),
        placementAmendmentApproval: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih kelulusan pindaan penempatan yang berkaitan.'
                        : defaultError,
            }),
        }),
        approvedNewReportingDate: dateScheme,
    });

    const staffPlacementAmendment = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const placementAmendmentResult = document.getElementById(
            'placementAmendmentResult',
        ) as HTMLSelectElement;
        const placementAmendmentApproval = document.getElementById(
            'placementAmendmentApproval',
        ) as HTMLSelectElement;

        const placementResult = {
            placementAmendmentResult: String(placementAmendmentResult.value),
            placementAmendmentApproval: String(
                placementAmendmentApproval.value,
            ),
            approvedNewReportingDate: String(
                formData.get('approvedNewReportingDate'),
            ),
        };
        try {
            const result = staffPlacementAmendmentForm.parse(placementResult);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedPromotionFormData = {
                    ...placementResult,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedPromotionFormData),
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

    //Kemaskini Keputusan Pemangkuan
    const updateActing = z.object({
        actingResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan pemangkuan yang berkaitan.'
                        : defaultError,
            }),
        }),
        actingPosition: z
            .string({
                required_error: 'Jawatan pemangkuan tidak boleh kosong.',
            })
            .min(4, {
                message: 'Jawatan pemangkuan hendaklah melebihi 4 karakter.',
            })
            .max(30, {
                message: 'Jawatan pemangkuan tidak boleh melebihi 30 karakter.',
            })
            .trim(),
        actingGred: z
            .string({ required_error: 'Gred pemangkuan tidak boleh kosong.' })
            .min(3, {
                message: 'Sila isi maklumat gred pemangkuan yang betul. Contoh: DV41',
            })
            .max(4, {
                message: 'Maklumat gred pemangkuan yang diisi adalah tidak dibenarkan. Contoh gred: DV41',
            })
            .trim(),
        newPlacement: z
            .string({ required_error: 'Nama penempatan baru tidak boleh kosong.' })
            .min(4, {
                message: 'Penempatan baru hendaklah melebihi 4 karakter.',
            })
            .max(124, {
                message: 'Nama penempatan baru terlalu panjang.',
            })
            .trim(),
        reportingDate: z
            .string({ required_error: 'Tarikh lapor diri tidak boleh kosong.' })
            .min(8, {
                message:
                    'Sila isi tarikh lapor diri yang betul dengan menggunakan format hh/bb/tttt. Contoh: 1/8/2023.',
            })
            .max(10, {
                message:
                    'Sila isi tarikh lapor diri yang betul. Gunakan format hh/bb/tttt. Contoh: 1/8/2023',
            })
            .trim(),
        supporterName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama penyokong yang berkaitan.'
                        : defaultError,
            }),
        }),
        approverName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama pelulus yang berkaitan.'
                        : defaultError,
            }),
        }),
    });

    const updateActingResult = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const actingResult = document.getElementById(
            'actingResult',
        ) as HTMLSelectElement;
        const supporterName = document.getElementById(
            'supporterName',
        ) as HTMLSelectElement;
        const approverName = document.getElementById(
            'approverName',
        ) as HTMLSelectElement;

        const actingResultForm = {
            actingResult: String(actingResult.value),
            actingPosition: String(formData.get('actingPosition')),
            actingGred: String(formData.get('actingGred')),
            newPlacement: String(formData.get('newPlacement')),
            reportingDate: String(formData.get('reportingDate')),
            supporterName: String(supporterName.value),
            approverName: String(approverName.value),
        };
        try {
            const result = updateActing.parse(actingResultForm);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedActingFormData = {
                    ...actingResultForm,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedActingFormData),
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
                    onClick={() => {
                        goNext();
                    }}
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
                    id="updateMeetingValidation"
                    on:submit|preventDefault={submitUpdateInterviewDetailsForm}
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        hasError={errorData?.meetingName}
                        name="meetingName"
                        type="text"
                        label="Nama Mesyuarat"
                        value="Mesyuarat Tersebut"
                    ></TextField>
                    {#if errorData?.meetingName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingName[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.meetingDate}
                        name="meetingDate"
                        label={'Tarikh Mesyuarat'}
                        value={'01/08/2023'}
                    ></TextField>
                    {#if errorData?.meetingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.meetingDate[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.gred}
                        name="gred"
                        label={'Gred'}
                        value={'DV41'}
                    ></TextField>
                    {#if errorData?.gred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gred[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.position}
                        name="position"
                        label={'Jawatan'}
                        value={'Setiausaha Pejabat'}
                    ></TextField>
                    {#if errorData?.position}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.position[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.interviewDate}
                        name="interviewDate"
                        label={'Tarikh Temuduga'}
                        value={'07/09/2023'}
                    ></TextField>
                    {#if errorData?.interviewDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interviewDate[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.interviewTime}
                        name="interviewTime"
                        label={'Masa Temuduga'}
                        value={'10am - 11am'}
                    ></TextField>
                    {#if errorData?.interviewTime}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interviewTime[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.state}
                        name="state"
                        label={'Negeri'}
                        value={'Sabah'}
                    ></TextField>
                    {#if errorData?.state}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.state[0]}</span
                        >
                    {/if}

                    <TextField
                        hasError={errorData?.interviewVenue}
                        name="interviewVenue"
                        label={'Pusat Temuduga'}
                        value={'LKIM SARAWAK - KUCHING'}
                    ></TextField>
                    {#if errorData?.interviewVenue}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.interviewVenue[0]}</span
                        >
                    {/if}
                </form>

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
                        form="updateInterviewResult"
                    ></TextIconButton>
                </StepperContentHeader>

                <StepperContentBody>
                    <SectionHeader title="Maklumat Markah Keseluruhan"
                    ></SectionHeader>

                    <form
                        id="updateInterviewResult"
                        on:submit|preventDefault={submitInterviewResultForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.totalInterviewScore}
                            name="totalInterviewScore"
                            type="text"
                            label={'Markah Keseluruhan'}
                            value={'79%'}
                        ></TextField>
                        {#if errorData?.totalInterviewScore}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.totalInterviewScore[0]}</span
                            >
                        {/if}
                    </form>

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
                    <form
                        id="updatePromotionResult"
                        on:submit|preventDefault={submitPromotionResultForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.meetingName}
                            type="text"
                            name="meetingName"
                            label={'Nama Mesyuarat'}
                            value={'Mesyuarat Tersebut'}
                        ></TextField>
                        {#if errorData?.meetingName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.meetingName[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.meetingDate}
                            type="text"
                            name="meetingDate"
                            label={'Tarikh Mesyuarat'}
                            value={'01/08/2023'}
                        ></TextField>
                        {#if errorData?.meetingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.meetingDate[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.meetingResult}
                            type="text"
                            name="meetingResult"
                            label={'Keputusan Mesyuarat'}
                            value={'Berjaya/Tidak Berjaya'}
                        ></TextField>
                        {#if errorData?.meetingResult}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.meetingResult[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.actingPosition}
                            type="text"
                            name="actingPosition"
                            label={'Jawatan Pemangkuan'}
                            value={'Setiausaha Pejabat'}
                        ></TextField>
                        {#if errorData?.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingPosition[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.actingGred}
                            type="text"
                            name="actingGred"
                            label={'Gred Pemangkuan'}
                            value={'N32'}
                        ></TextField>
                        {#if errorData?.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingGred[0]}</span
                            >
                        {/if}
                    </form>
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
                        form="updatePromotionResult"
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
                        <form
                            id="updatePromotionResult"
                            on:submit|preventDefault={promotionResultForm}
                            class="flex w-full flex-col gap-2"
                        >
                            <DropdownSelect
                                id="meetingResultDropdown"
                                label="Keputusan"
                                dropdownType="label-left-full"
                                options={[
                                    { value: 'true', name: 'Berjaya' },
                                    { value: 'false', name: 'Tidak Berjaya' },
                                ]}
                            />
                            {#if errorData?.meetingResultDropdown}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.meetingResultDropdown[0]}</span
                                >
                            {/if}
                        </form>
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
                    <form
                        id="placementResultForm"
                        on:submit|preventDefault={staffPlacementForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.meetingName}
                            name="meetingName"
                            label={'Nama Mesyuarat'}
                            value={'Mesyuarat Tersebut'}
                        ></TextField>
                        {#if errorData?.meetingName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.meetingName[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.meetingDate}
                            name="meetingDate"
                            label={'Tarikh Mesyuarat'}
                            value={'01/08/2023'}
                        ></TextField>
                        {#if errorData?.meetingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.meetingDate[0]}</span
                            >
                        {/if}
                    </form>
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
                                                hasError={errorData?.keputusanMesyuaratDropdown}
                                                id="keputusanMesyuaratDropdown"
                                                label=""
                                                dropdownType="label-left"
                                                options={keputusanPemilihan}
                                            />
                                            {#if errorData?.keputusanMesyuaratDropdown}
                                                <span
                                                    class="font-sans text-sm italic text-system-danger"
                                                    >{errorData
                                                        ?.keputusanMesyuaratDropdown[0]}</span
                                                >
                                            {/if}
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
                        form="placementMeetingResult"
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
                    <form
                        id="placementMeetingResult"
                        on:submit|preventDefault={placementMeetingResultForm}
                        class="flex w-full flex-col gap-2"
                    >
                        <TextField
                            hasError={errorData?.newPlacement}
                            name="newPlacement"
                            label={'Penempatan Baru'}
                            value={'-'}
                            type="text"
                        ></TextField>
                        {#if errorData?.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.newPlacement[0]}</span
                            >
                        {/if}
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={errorData?.newDirector}
                                id="newDirector"
                                label="Pengarah Baru"
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />
                            {#if errorData?.newDirector}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.newDirector[0]}</span
                                >
                            {/if}
                        </div>
                        <DateSelector
                            hasError={errorData?.reportingDate}
                            name="reportingDate"
                            {handleDateChange}
                            label={'Tarikh Lapor Diri'}
                        />
                        {#if errorData?.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.reportingDate[0]}</span
                            >
                        {/if}
                    </form>
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
                        form="placementAmendmentForm"
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

                    <form
                        id="placementAmendmentForm"
                        on:submit|preventDefault={staffPlacementAmendment}
                        class="flex w-full flex-col gap-2"
                    >
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={errorData?.placementAmendmentResult}
                                id="placementAmendmentResult"
                                label="Keputusan"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />{#if errorData?.placementAmendmentResult}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData
                                        ?.placementAmendmentResult[0]}</span
                                >
                            {/if}
                        </div>

                        <DateSelector
                            hasError={errorData?.approvedNewReportingDate}
                            name="approvedNewReportingDate"
                            {handleDateChange}
                            labelBlack={false}
                            label={'Kelulusan Tarikh Lapor Diri Baru'}
                        />
                        {#if errorData?.approvedNewReportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approvedNewReportingDate[0]}</span
                            >
                        {/if}

                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={errorData?.placementAmendmentApproval}
                                id="placementAmendmentApproval"
                                label="Kelulusan Pindaan Penempatan Dipohon"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />
                            {#if errorData?.placementAmendmentApproval}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData
                                        ?.placementAmendmentApproval[0]}</span
                                >
                            {/if}
                        </div>
                    </form>
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
                        form="updateActingResultForm"
                    ></TextIconButton></StepperContentHeader
                >

                <StepperContentBody>
                    <SectionHeader title="Maklumat Calon"></SectionHeader>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="no-pekerja"
                        label={'No. Pekerja'}
                        value={'001023'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="nama-pekerja"
                        label={'Nama'}
                        value={'Ismail bin Ramdan'}
                    ></TextField>
                    <TextField
                        disabled
                        labelBlack={false}
                        name="no-kp"
                        label={'No. K/P'}
                        value={'890701-13-5667'}
                    ></TextField>

                    <form
                        id="updateActingResultForm"
                        on:submit|preventDefault={updateActingResult}
                        class="flex w-full flex-col gap-2"
                    >
                        <SectionHeader title="Butiran Pemangkuan"
                        ></SectionHeader>
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
                                hasError={errorData?.actingResult}
                                id="actingResult"
                                label="Keputusan Pemangkuan"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />
                            {#if errorData?.actingResult}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.actingResult[0]}</span
                                >
                            {/if}
                        </div>

                        <TextField
                            hasError={errorData?.actingPosition}
                            labelBlack={false}
                            name="actingPosition"
                            label={'Jawatan Pemangkuan'}
                            value={'Setiausaha Pejabat'}
                        ></TextField>
                        {#if errorData?.actingPosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingPosition[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.actingGred}
                            labelBlack={false}
                            name="actingGred"
                            label={'Gred Pemangkuan'}
                            value={'N32'}
                        ></TextField>
                        {#if errorData?.actingGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.actingGred[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.newPlacement}
                            labelBlack={false}
                            name="newPlacement"
                            label={'Penempatan Baru'}
                            value={'Bahagian Pengurusan'}
                        ></TextField>
                        {#if errorData?.newPlacement}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.newPlacement[0]}</span
                            >
                        {/if}

                        <TextField
                            hasError={errorData?.reportingDate}
                            labelBlack={false}
                            name="reportingDate"
                            label={'Tarikh Lapor Diri'}
                            value={'19/10/2023'}
                        ></TextField>
                        {#if errorData?.reportingDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.reportingDate[0]}</span
                            >
                        {/if}
                        <SectionHeader title="Pengesah Keputusan"
                        ></SectionHeader>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={errorData?.supporterName}
                                id="supporterName"
                                label="Nama Penyokong"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />
                            {#if errorData?.supporterName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.supporterName[0]}</span
                                >
                            {/if}
                        </div>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <DropdownSelect
                                hasError={errorData?.approverName}
                                id="approverName"
                                label="Nama Pelulus"
                                labelBlack={false}
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                            />
                            {#if errorData?.approverName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.approverName[0]}</span
                                >
                            {/if}
                        </div>
                    </form>
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
