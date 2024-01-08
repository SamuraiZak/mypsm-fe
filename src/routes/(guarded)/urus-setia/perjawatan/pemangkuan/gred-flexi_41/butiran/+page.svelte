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
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import DataTable from '$lib/components/data-table/DataTable.svelte';
    import DtTableHead from '$lib/components/data-table/DtTableHead.svelte';
    import DtTableHeadCell from '$lib/components/data-table/DtTableHeadCell.svelte';
    import DtTableRow from '$lib/components/data-table/DtTableRow.svelte';
    import DtTableBody from '$lib/components/data-table/DtTableBody.svelte';
    import DtTableDataCell from '$lib/components/data-table/DtTableDataCell.svelte';
    import IconButton from '$lib/components/buttons/IconButton.svelte';
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
    import TextField from '$lib/components/input/TextField.svelte';
    import { greds } from '$lib/mocks/gred/gred.js';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgDoubleTick from '$lib/assets/svg/SvgDoubleTick.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import {
        fileSelectionList,
        selectedRecordId,
    } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';

    export let disabled: boolean = true;

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

    let currentData: any = {};

    let placeholderData: any = {};

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

    //Zod Schema for Form Validation
    let errorData: any;
    //Stepper 2 Form Validation
    const stepper2Schema = z.object({
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
    });
    const stepper2Form = async (event: Event) => {
        const secretaryName = document.getElementById(
            'secretaryName',
        ) as HTMLSelectElement;
        const directorName = document.getElementById(
            'directorName',
        ) as HTMLSelectElement;
        const keputusanPemilihanDropdown = document.getElementById(
            'keputusanPemilihanDropdown',
        ) as HTMLSelectElement;

        const stepper2FormData = {
            secretaryName: String(secretaryName.value),
            directorName: String(directorName.value),
            keputusanPemilihanDropdown: String(
                keputusanPemilihanDropdown.value,
            ),
        };
        try {
            const result = stepper2Schema.parse(stepper2FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper2FormData = { ...stepper2FormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper2FormData),
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

    //Stepper 3 Form Validation
    const stepper3Schema = z.object({
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
    const stepper3Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper3FormData = {
            meetingName: String(formData.get('meetingName')),
            meetingDate: String(formData.get('meetingDate')),
            gred: String(formData.get('gred')),
            position: String(formData.get('position')),
            interviewDate: String(formData.get('interviewDate')),
            interviewTime: String(formData.get('interviewTime')),
            state: String(formData.get('state')),
            interviewVenue: String(formData.get('interviewVenue')),
        };
        try {
            const result = stepper3Schema.parse(stepper3FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper3FormData = {
                    ...stepper3FormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper3FormData),
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

    // Stepper 4 Validation
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
            message: 'Tarikh hendaklah tidak kurang dari tarikh semasa.',
        });
    const stepper4Schema = z.object({
        interviewDate: dateScheme,
        interviewVenue: z
            .string({ required_error: 'Pusat temuduga tidak boleh kosong.' })
            .min(10, {
                message: 'Nama pusat temuduga hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama pusat temuduga yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),
        panelName: z
            .string({ required_error: 'Nama panel tidak boleh kosong.' })
            .min(10, {
                message: 'Nama panel hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama panel yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),
    });
    const stepper4Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const stepper4FormData = {
            interviewDate: String(formData.get('interviewDate')),
            interviewVenue: String(formData.get('interviewVenue')),
            panelName: String(formData.get('panelName')),
        };
        try {
            const result = stepper4Schema.parse(stepper4FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper4FormData = {
                    ...stepper4FormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper4FormData),
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

    // Stepper 5 Validation
    const stepper5Schema = z.object({
        meetingResultDropdown: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih keputusan mesyuarat.'
                        : defaultError,
            }),
        }),
    });
    const stepper5Form = async (event: Event) => {
        const meetingResultDropdown = document.getElementById(
            'meetingResultDropdown',
        ) as HTMLSelectElement;
        const stepper5Data = {
            meetingResultDropdown: String(meetingResultDropdown.value),
        };
        try {
            const result = stepper5Schema.parse(stepper5Data);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper5FormData = {
                    ...stepper5Data,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper5FormData),
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

    //Stepper 6 Validation
    const stepper6Schema = z.object({
        newPlacement: z
            .string({ required_error: 'Penempatan baru tidak boleh kosong.' })
            .min(10, {
                message: 'Nama penempatan baru hendaklah melebihi 10 karakter.',
            })
            .max(100, {
                message:
                    'Nama penempatan baru yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),
        newDirector: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih pengarah baru yang berkaitan.'
                        : defaultError,
            }),
        }),
        reportingDate: dateScheme,
    });
    const stepper6Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const newDirector = document.getElementById(
            'newDirector',
        ) as HTMLSelectElement;
        const stepper6FormData = {
            newPlacement: String(formData.get('newPlacement')),
            newDirector: String(newDirector.value),
            reportingDate: String(formData.get('reportingDate')),
        };
        try {
            const result = stepper6Schema.parse(stepper6FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper6FormData = {
                    ...stepper6FormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper6FormData),
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

    //Stepper 7 Validation
    const stepper7Schema = z.object({
        postponementReason: z
            .string({
                required_error: 'Alasan penangguhan tidak boleh kosong.',
            })
            .min(30, {
                message: 'Alasan penangguhan hendaklah melebihi 30 karakter.',
            })
            .max(124, {
                message:
                    'Alasan penangguhan yang dimasukkan telah melebihi had yang dibenarkan.',
            })
            .trim(),
        approverName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama pelulus yang berkaitan.'
                        : defaultError,
            }),
        }),
        initialPlacementDate: dateScheme,
        requestedDate: dateScheme,
    });
    const stepper7Form = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const approverName = document.getElementById(
            'approverName',
        ) as HTMLSelectElement;
        const stepper7FormData = {
            postponementReason: String(formData.get('postponementReason')),
            approverName: String(approverName.value),
            initialPlacementDate: String(formData.get('initialPlacementDate')),
            requestedDate: String(formData.get('requestedDate')),
        };
        try {
            const result = stepper7Schema.parse(stepper7FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper7FormData = {
                    ...stepper7FormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper7FormData),
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

    //Stepper 9 Validation
    const stepper9Schema = z.object({
        supporterName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama penyokong yang berkaitan.'
                        : defaultError,
            }),
        }),
        approvalName: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila pilih nama pelulus yang berkaitan.'
                        : defaultError,
            }),
        }),
    });
    const stepper9Form = async (event: Event) => {
        const supporterName = document.getElementById(
            'supporterName',
        ) as HTMLSelectElement;
        const approvalName = document.getElementById(
            'approvalName',
        ) as HTMLSelectElement;

        const stepper9FormData = {
            supporterName: String(supporterName.value),
            approvalName: String(approvalName.value),
        };
        try {
            const result = stepper9Schema.parse(stepper9FormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedStepper9FormData = {
                    ...stepper9FormData,
                    id,
                };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedStepper9FormData),
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
        title="Pemangkuan Gred 41"
        description="Sila pilih kakitangan yang terlibat dalam proses pemangkuan ini"
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
        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan"
            >
                <!-- TODO: put buttons in this area if necessary -->
                <TextIconButton
                    label="Kembali"
                    onClick={() => {
                        goPrevious();
                    }}
                >
                    <SvgArrowLeft />
                </TextIconButton>
                <TextIconButton
                    label="Seterusnya"
                    primary
                    onClick={() => goNext()}
                >
                    <SvgArrowRight></SvgArrowRight>
                </TextIconButton>
            </StepperContentHeader>

            <!-- Maklumat Peraku Keputusan Mesyuarat -->
            <StepperContentBody>
                <SectionHeader title=" Maklumat Peraku Keputusan Mesyuarat"
                ></SectionHeader>

                <div class="flex w-full flex-col gap-2.5">
                    <form
                        id="stepper2Validation"
                        on:submit|preventDefault={stepper2Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <DropdownSelect
                            hasError={errorData?.secretaryName}
                            id="secretaryName"
                            label="Nama Urus Setia Integriti"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:index={selectedMeetingType}
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
                            label="Nama Pengarah Bahagian/Negeri"
                            dropdownType="label-left-full"
                            options={positions}
                            bind:index={selectedSalaryMonth}
                        />
                        {#if errorData?.directorName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.directorName[0]}</span
                            >
                        {/if}
                    </form>
                </div>

                <!-- Search Kakitangan Yang Dipilih -->
                <CustomTabContent title="Senarai Kakitangan Yang Dipilih">
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

                    <!-- Table Kemaskini Keputusan Mesyuarat Pemilihan Kakitangan -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DataTable title="Hasil Carian">
                            <DtTableHead>
                                <DtTableHeadCell title="Bil"></DtTableHeadCell>
                                <DtTableHeadCell title="No.Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Pekerja"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="No. Kad Pengenalan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Program"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Skim"></DtTableHeadCell>
                                <DtTableHeadCell title="Gred"></DtTableHeadCell>
                                <DtTableHeadCell title="Nama Jawatan"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Penempatan Sekarang"
                                ></DtTableHeadCell>
                                <DtTableHeadCell title="Keputusan Pemilihan "
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
                                        <DtTableDataCell value={item.program}
                                        ></DtTableDataCell>
                                        <DtTableDataCell value={item.skim}
                                        ></DtTableDataCell>
                                        <DtTableDataCell value={item.gred}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.namaJawatan}
                                        ></DtTableDataCell>
                                        <DtTableDataCell
                                            value={item.penempatanSekarang}
                                        ></DtTableDataCell>
                                        <DtTableDataCell>
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
                                        </DtTableDataCell>
                                        <DtTableDataCell>
                                            <IconButton
                                                onClick={() => {
                                                    console.log(
                                                        'action function for each cell',
                                                    );
                                                }}
                                                ><SvgEdit></SvgEdit></IconButton
                                            >
                                        </DtTableDataCell>
                                    </DtTableRow>
                                {/each}
                            </DtTableBody>
                        </DataTable>
                    </div>
                </CustomTabContent></StepperContentBody
            >
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Maklumat Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Maklumat Temuduga">
                    <TextIconButton
                        label="Kembali"
                        onClick={() => {
                            goPrevious();
                        }}
                    >
                        <SvgArrowLeft />
                    </TextIconButton>
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

                <!-- Butiran Maklumat Temuduga -->
                <StepperContentBody>
                    <SectionHeader title=" Butiran Maklumat Temuduga"
                    ></SectionHeader>

                    <div class="flex w-full flex-col gap-2">
                        <form
                            id="stepper3Validation"
                            on:submit|preventDefault={stepper3Form}
                            class="flex w-full flex-col gap-2"
                        >
                            <TextField
                                hasError={errorData?.meetingName}
                                name="meetingName"
                                type="text"
                                label={'Nama Nesyuarat'}
                                value={'Mazlan Shah'}
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
                                type="text"
                                label={'Tarikh Mesyuarat'}
                                value={'Sah'}
                            ></TextField>
                            {#if errorData?.meetingDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.meetingDate[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={errorData?.position}
                                name="position"
                                type="text"
                                label={'Jawatan'}
                                value={'Izzati Ismail'}
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
                                type="text"
                                label={'Tarikh Temuduga'}
                                value={'Sah'}
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
                                type="text"
                                label={'Masa Temuduga'}
                                value={'Sah'}
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
                                type="text"
                                label={'Negeri'}
                                value={'Sah'}
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
                                type="text"
                                label={'Pusat Temuduga'}
                                value={'Sah'}
                            ></TextField>
                            {#if errorData?.interviewVenue}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.interviewVenue[0]}</span
                                >
                            {/if}
                        </form>
                    </div>

                    <!-- Upload Dokumen- Dokumen yang Berkaitan -->
                    <div
                        class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
                    >
                        <SectionHeader title="Dokumen - Dokumen yang Berkaitan"
                            ><div hidden={$fileSelectionList.length == 0}>
                                <FileInputField id="fileInput" {handleOnChange}
                                ></FileInputField>
                            </div></SectionHeader
                        >
                        <div
                            class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
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
                                    Seret dan Lepas fail anda ke dalam ruangan
                                    ini atau pilih dari fail dari peranti anda
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
                                    <FileInputField
                                        id="fileInput"
                                        {handleOnChange}
                                    ></FileInputField>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Search Kemaskini Maklumat Temuduga -->
                    <SectionHeader
                        title="Kemaskini Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                    ></SectionHeader>

                    <CustomCard borderClass="border-system-primary ">
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

                    <!-- Right Arrow button -->

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            subTitle="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
                        >
                            <TextIconButton primary label="">
                                <SvgArrowRight></SvgArrowRight>
                            </TextIconButton>
                        </SectionHeader>
                    </div>

                    <!-- Table Kemaskini Maklumat Temuduga -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Hasil Carian"
                            subTitle="Tekan tombol untuk semua kakitangan berkaitan"
                        ></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            hasCheckbox
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Mesyuarat Pemilihan Calon"
                >
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

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Peraku Keputusan Mesyuarat "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Urus Setia Integriti'}
                            value={'Mazlan Shah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Perakuan'}
                            value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Pengarah Bahagian/Negeri'}
                            value={'Izzati Ismail'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Perakuan'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Table Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat -->

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader
                            title="Senarai Calon Yang Terpilih Mengikut Keputusan Mesyuarat"
                        ></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuarat',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Temuduga -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Keputusan Temuduga">
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

                <!-- Search senarai Kakitangan Yang Dipilih -->
                <StepperContentBody>
                    <SectionHeader title=" Kemaskini Maklumat Temuduga"
                    ></SectionHeader>
                    <CustomTabContent>
                        <CustomCard
                            borderClass="border-system-primary items-center"
                        >
                            <CustomCardBody>
                                <div class="flex w-full flex-wrap gap-2.5">
                                    <FilterTextInput label="Gred"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Jawatan"
                                    ></FilterTextInput>
                                    <FilterTextInput label="Nama"
                                    ></FilterTextInput>
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

                        <!-- Table Kemaskini Maklumat Temuduga -->
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start"
                        >
                            <SectionHeader title="Hasil Carian"></SectionHeader>
                            <DynamicTable
                                tableItems={mockPerjawatanPemangkuan}
                                onSelect={() => {
                                    console.log('pop selected here');
                                }}
                                editable
                                onEditClick={() =>
                                    (editingCandidateList = true)}
                                columnKeys={[
                                    'nomborPekerja',
                                    'namaPekerja',
                                    'noKadPengenalan',
                                    'program',
                                    'skim',
                                    'gredSemasa',
                                    'namaJawatan',
                                    'penempatanSekarang',
                                    'maklumatTemuduga',
                                ]}
                            ></DynamicTable>
                        </div>
                    </CustomTabContent>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Maklumat Temuduga">
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper4Validation"
                    ></TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon"></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField {disabled} id="" label={'No. K/P'} value={''}
                        ></TextField>
                    </div>

                    <!-- Keputusan Temuduga -->
                    <SectionHeader title=" Keputusan Temuduga "></SectionHeader>
                    <form
                        id="stepper4Validation"
                        on:submit|preventDefault={stepper4Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <DateSelector
                            hasError={errorData?.interviewDate}
                            name="interviewDate"
                            {handleDateChange}
                            label={'Tarikh Temuduga'}
                        />
                        {#if errorData?.interviewDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.interviewDate[0]}</span
                            >
                        {/if}
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                hasError={errorData?.interviewVenue}
                                name="interviewVenue"
                                label={'Pusat Temuduga'}
                                value={'-'}
                                type="text"
                            ></TextField>
                            {#if errorData?.interviewVenue}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.interviewVenue[0]}</span
                                >
                            {/if}
                            <TextField
                                hasError={errorData?.panelName}
                                name="panelName"
                                label={'Nama Panel'}
                                value={'-'}
                            ></TextField>
                            {#if errorData?.panelName}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.panelName[0]}</span
                                >
                            {/if}
                        </div>
                    </form>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Kenaikan Pangkat -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"
                >
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

                <!-- Search senarai Calon Yang Terpilih -->
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>
                    <CustomCard borderClass="border-system-primary ">
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
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Mesyuarat kenaikan Pangkat -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'program',
                                'skim',
                                'gredSemasa',
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
                >
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper5Validation"
                    ></TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'No.K/P'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Keputusan Mesyuarat -->
                    <SectionHeader title=" Keputusan Mesyuarat"></SectionHeader>

                    <div class="flex w-full flex-col gap-2.5">
                        <form
                            id="stepper5Validation"
                            on:submit|preventDefault={stepper5Form}
                            class="flex w-full flex-col gap-2"
                        >
                            <DropdownSelect
                                id="meetingResultDropdown"
                                label=" Keputusan"
                                dropdownType="label-left-full"
                                options={[
                                    { value: 'true', name: 'Berjaya' },
                                    { value: 'false', name: 'Tidak Berjaya' },
                                ]}
                                bind:index={selectedMeetingType}
                            />
                            {#if errorData?.meetingResultDropdown}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.meetingResultDropdown[0]}</span
                                >
                            {/if}
                        </form>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Kemaskini Keputusan Mesyuarat Penempatan Kakitangan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"
                >
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
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <!-- Search senarai Calon Yang Terpilih -->
                    <CustomCard borderClass="border-system-primary ">
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
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Mesyuarat Penempatan Kakitangan -->

                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'keputusanMesyuaratKenaikanPangkat',
                                'statusPermohonan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Maklumat Keputusan Mesyuarat Kenaikan Pangkat"
                >
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper6Validation"
                    ></TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'001'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'Sah'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'No.K/P'}
                            value={'Sah'}
                        ></TextField>
                    </div>

                    <!-- Keputusan Mesyuarat -->

                    <SectionHeader title=" Keputusan Mesyuarat"></SectionHeader>
                    <form
                        id="stepper6Validation"
                        on:submit|preventDefault={stepper6Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <div class="flex w-full flex-col gap-2.5">
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
                            <DropdownSelect
                                hasError={errorData?.newDirector}
                                id="newDirector"
                                label=" Pengarah Baru"
                                dropdownType="label-left-full"
                                options={keputusanPemilihan}
                                bind:index={selectedMeetingType}
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
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Permohonan Penangguhan / Pindaan Penempatan Dari Kakitangan"
                >
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
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <!-- Search Senarai Calon Yang Terpilih  -->

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
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Keputusan Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
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
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper7Validation"
                    ></TextIconButton>
                </StepperContentHeader>

                <!-- Maklum Balas Kakitangan -->
                <StepperContentBody>
                    <SectionHeader title=" Maklum Balas Kakitangan "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Kakitangan memerlukan Panangguhan'}
                            value={'-'}
                        ></TextField>

                        <!-- Download file for surat Permohonan Penangguhan/Pindaan Penempatan-->
                        <div
                            class="justidy-between flex w-full flex-row items-center"
                        >
                            <div
                                class="flex w-[220px] min-w-[220px] flex-row gap-2.5"
                            >
                                <label
                                    for=""
                                    class="text-system-tertiary text-sm font-medium"
                                >
                                    Surat Permohonan Penangguhan/Pindaan
                                    Penempatan</label
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
                                Permohonan Penangguhan/Pindaan sila terus ke
                                langkah berikut:
                            </p>
                            <p
                                class="bg-bgr-primary text-sm font-medium text-system-primary hover:underline"
                            >
                                Kemaskini Keputusan Pemangkuan
                            </p>
                        </div>
                        <SectionHeader
                            color="text-system-primary"
                            subTitle="Sekiranya kakitangan memilih untuk tidak membuat Permohonan Penangguhan/Pindaan Penempatan sila isi butiran penangguhan berikut mengikut surat penangguhan yang disediakan oleh kakitangan"
                        ></SectionHeader>

                        <!-- Butiran Penangguhan -->

                        <SectionHeader title=" Butiran Penangguhan "
                        ></SectionHeader>

                        <form
                            id="stepper7Validation"
                            on:submit|preventDefault={stepper7Form}
                            class="flex w-full flex-col gap-2"
                        >
                            <div class="flex w-full flex-col gap-2.5">
                                <DateSelector
                                    hasError={errorData?.initialPlacementDate}
                                    name="initialPlacementDate"
                                    {handleDateChange}
                                    label={'Tarikh Asal Penempatan'}
                                />
                                {#if errorData?.initialPlacementDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.initialPlacementDate[0]}</span
                                    >
                                {/if}
                                <DateSelector
                                    hasError={errorData?.requestedDate}
                                    name="requestedDate"
                                    {handleDateChange}
                                    label={'Tarikh Pertukaran yag Dipohon'}
                                />
                                {#if errorData?.requestedDate}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.requestedDate[0]}</span
                                    >
                                {/if}
                                <LongTextField
                                    hasError={errorData?.postponementReason}
                                    name="postponementReason"
                                    label={'Alasan Penanguhan'}
                                    value={'Sila nyatakan alasan permohonan'}
                                ></LongTextField>
                                {#if errorData?.postponementReason}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData
                                            ?.postponementReason[0]}</span
                                    >
                                {/if}
                            </div>

                            <SectionHeader title=" Butiran Pelulus"
                            ></SectionHeader>

                            <div class="flex w-full flex-col gap-2.5">
                                <DropdownSelect
                                    hasError={errorData?.approverName}
                                    id="approverName"
                                    label="Nama Pelulus"
                                    dropdownType="label-left-full"
                                    options={keputusanPemilihan}
                                    bind:index={selectedMeetingType}
                                />
                                {#if errorData?.approverName}
                                    <span
                                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                                        >{errorData?.approverName[0]}</span
                                    >
                                {/if}
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
        <!-- =========================================================== -->

        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            >
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

            <!-- Search Senarai Calon yang Terpilih -->
            <StepperContentBody>
                <SectionHeader title=" Senarai Calon Yang Terpilih"
                ></SectionHeader>

                <CustomCard borderClass="border-system-primary ">
                    <CustomCardBody>
                        <div class="flex w-full flex-wrap items-center gap-2.5">
                            <FilterTextInput label="No. Pekerja"
                            ></FilterTextInput>
                            <FilterTextInput label="Nama"></FilterTextInput>
                            <FilterTextInput label="No. K/P"></FilterTextInput>

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
                    <SectionHeader title="Hasil Carian"></SectionHeader>

                    <!-- Table Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
                    <DynamicTable
                        tableItems={mockPerjawatanPemangkuan}
                        editable
                        onSelect={() => {
                            // popSelected(currentData);
                        }}
                        columnKeys={[
                            'nomborPekerja',
                            'namaPekerja',
                            'noKadPengenalan',
                            'gredSemasa',
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
            {#if !editingCandidateList}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
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

                <!-- Search Senarai Calon yang Terpilih -->
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <CustomCard borderClass="border-system-primary ">
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
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Kemaskini Keputusan Pemangkuan -->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'permohonanPenangguhanPindaanPenempatan',
                                'keputusanPermohonanPenangguhanPindaanPenempatan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader title="Kemaskini Keputusan Pemangkuan">
                    <TextIconButton
                        label="Batal"
                        onClick={() => {
                            console.log(currentData.layakTemuduga);
                            console.log(placeholderData.layakTemuduga);
                            console.log(selectedCandidatesList);
                            editingCandidateList = false;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        primary
                        label="Simpan"
                        form="stepper9Validation"
                    ></TextIconButton>
                </StepperContentHeader>

                <!-- Maklumat Calon -->
                <StepperContentBody>
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'No.K/P'} value={'-'}
                        ></TextField>
                    </div>

                    <!-- Butiran Pemangkuan -->

                    <SectionHeader title=" Butiran Pemangkuan "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Jawatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Gred Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Penempatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Pengarah Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Tarikh Lapor Diri'}
                            value={'-'}
                        ></TextField>
                    </div>

                    <SectionHeader title=" Pengesahan Keputusan"
                    ></SectionHeader>

                    <form
                        id="stepper9Validation"
                        on:submit|preventDefault={stepper9Form}
                        class="flex w-full flex-col gap-2"
                    >
                        <DropdownSelect
                            hasError={errorData?.supporterName}
                            id="supporterName"
                            label="Nama Penyokong"
                            dropdownType="label-left-full"
                            options={keputusanPemilihan}
                            bind:index={selectedMeetingType}
                        />
                        {#if errorData?.supporterName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.supporterName[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            hasError={errorData?.approvalName}
                            id="approvalName"
                            label="Nama Pelulus"
                            dropdownType="label-left-full"
                            options={keputusanPemilihan}
                        />
                        {#if errorData?.approvalName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.approvalName[0]}</span
                            >
                        {/if}
                    </form>
                </StepperContentBody>
            {/if}
        </StepperContent>

        <!-- =========================================================== -->
        <!-- Semak Pengesahan Keputusan Pemangkuan -->
        <!-- =========================================================== -->

        <StepperContent>
            {#if !editingCandidateList}
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pemangkuan"
                >
                    <TextIconButton
                        primary
                        label="Selesai"
                        onClick={() => {
                            alert('save function');
                        }}
                    >
                        <SvgCircleF2 />
                    </TextIconButton>
                </StepperContentHeader>

                <!-- Search Pengesahan Keputusan Pemangkuan -->
                <StepperContentBody>
                    <SectionHeader title=" Senarai Calon Yang Terpilih"
                    ></SectionHeader>

                    <CustomCard borderClass="border-system-primary ">
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
                                    label="cari"
                                    primary
                                    onClick={() => {}}
                                >
                                    <SvgManifyingGlass></SvgManifyingGlass>
                                </TextIconButton>
                            </div>
                        </CustomCardBody>
                    </CustomCard>

                    <!-- Table Pengesahan Keputusan Pemangkuan-->
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Hasil Carian"></SectionHeader>
                        <DynamicTable
                            tableItems={mockPerjawatanPemangkuan}
                            editable
                            onEditClick={() => (editingCandidateList = true)}
                            columnKeys={[
                                'nomborPekerja',
                                'namaPekerja',
                                'noKadPengenalan',
                                'gredSemasa',
                                'namaJawatan',
                                'penempatanSekarang',
                                'pengesahanKeputusanPemangkuan',
                            ]}
                        ></DynamicTable>
                    </div>
                </StepperContentBody>
            {:else}
                <StepperContentHeader
                    title="Kemaskini Maklumat Permohonan Penangguhan/Pindaan Penempatan"
                >
                    <TextIconButton
                        label="Tutup"
                        onClick={() => {
                            editingCandidateList = false;
                        }}
                    >
                        <SvgXMark></SvgXMark>
                    </TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <!-- Maklumat Calon -->
                    <SectionHeader title=" Maklumat Calon "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'No. Pekerja'}
                            value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'Nama'} value={'-'}
                        ></TextField>
                        <TextField {disabled} id="" label={'No.K/P'} value={'-'}
                        ></TextField>
                    </div>

                    <!-- Butiran Pemangkuan -->
                    <SectionHeader title=" Butiran Pemangkuan "></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Jawatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Gred Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Penempatan Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Pengarah Baru'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Tarikh Lapor Diri'}
                            value={'-'}
                        ></TextField>
                    </div>

                    <!-- Pengesahan Keputusan -->
                    <SectionHeader title=" Pengesahan Keputusan "
                    ></SectionHeader>
                    <div class="flex w-full flex-col gap-2.5">
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Penyokong'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Keputusan'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Nama Pelulus'}
                            value={'-'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id=""
                            label={'Keputusan'}
                            value={'-'}
                        ></TextField>
                    </div>
                </StepperContentBody>
            {/if}
        </StepperContent>
    </Stepper>
</section>

<Toaster />
