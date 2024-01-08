<script lang="ts">
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatKegiatanTable } from '$lib/mocks/profil/maklumat-kegiatan-keahlian';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockLookupStates } from '$lib/mocks/database/mockLookupStates';
    import { mockLookupServiceTypes } from '$lib/mocks/database/mockLookupServiceTypes';
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockLookupEmploymentStatus } from '$lib/mocks/database/mockLookupEmploymentStatus';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockEmployeeEducations } from '$lib/mocks/database/mockEmployeeEducations';
    import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
    import { mockEmployeeNextOfKins } from '$lib/mocks/database/mockEmployeeNextOfKins';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import Form from '$lib/components/form/Form.svelte';

    export let employeeNumber: string = '00001';
    export let disabled: boolean = true;

    let isEditing: boolean = false;
    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;
    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
    })!;
    let currentEmployeeBirthState = mockLookupStates.find((state) => {
        return state.id === currentEmployee.birthStateId;
    })!;
    let currentEmployeeServiceType = mockLookupServiceTypes.find(
        (serviceType) => {
            return (
                serviceType.id ===
                mockCurrentService.find((service) => {
                    return service.employeeId === currentEmployee.id;
                })!.serviceTypeId
            );
        },
    )!;
    let currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeGrade = mockLookupGrades.find((grade) => {
        return grade.id === currentEmployeeService.gradeId;
    })!;
    let currentEmployeePosition = mockLookupPositions.find((position) => {
        return position.id === currentEmployeeService.positionId;
    })!;
    let currentEmployeeStatus = mockLookupEmploymentStatus.find((status) => {
        return status.id === currentEmployeeService.employmentStatusId;
    })!;
    let currentEmployeePositionHistory = mockEmploymentPositionHistories.filter(
        (positionHistory) => {
            return (
                positionHistory.currentServiceId ===
                currentEmployeeService.serviceTypeId
            );
        },
    )!;
    let currentEmployeePensions = mockEmploymentPensions.find((pension) => {
        return pension.currentServiceId === currentEmployeeService.id;
    })!;
    let currentEmployeeEducations = mockEmployeeEducations.filter(
        (eudcation) => {
            return eudcation.employeeId === currentEmployee.id;
        },
    )!;
    let currentEmployeeExperience = mockEmployeeExperience.filter(
        (experience) => {
            return experience.employeeId === currentEmployee.id;
        },
    )!;
    let currentEmployeeNextOfKins = mockEmployeeNextOfKins.find((nextOfKin) => {
        return nextOfKin.employeeId === currentEmployee.id;
    })!;

    let currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee.id;
        },
    )!;

    function getEmployeeLeave(currentEmployeeNumber: string) {
        if (currentEmployeeNumber === '00001') {
            return '30';
        }
        if (currentEmployeeNumber === '00002') {
            return '27';
        }
        if (currentEmployeeNumber === '00003') {
            return '25';
        }
    }
    function dateConvertor(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function getDurationYear(startDate: string, endDate: string) {
        let start = new Date(dateConvertor(startDate));
        let end = new Date(dateConvertor(endDate));
        let duration = end.getTime() - start.getTime();
        let year = duration / (1000 * 3600 * 24 * 365);
        return Math.ceil(year);
    }
    function isBlueOrRedIC(isMalaysian: boolean) {
        return isMalaysian ? 'Biru' : 'Merah';
    }

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;

    //==========================================================
    //================== stepper 1 =============================
    //==========================================================

    // date common schema stepper 1
    const dateStepper1 = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .max(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const stepper1 = z.object({
        radioButtonExample: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

        statusPekerjaan: z.enum(['1', '2', '3', '4'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        warnaKadPengenalan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        warganegara: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        tempatLahir: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        bangsa: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        agama: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        status: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        jantina: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        jawatanPasangan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        hubungan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        noPerkeja: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noKadPengenalan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        namaPenuh: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        namaLain: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        emel: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        perumahan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        pinjKenderaan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        pinjPerumahan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noPekerjaPasangan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        namaPasangan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        tarikhLahir: dateStepper1,

        longTextExample: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        alamatRumah: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        alamatSuratMenyurat: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    //==========================================================
    //================== stepper 2 =============================
    //==========================================================

    const dateStepper2 = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const dateStepper2max = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .max(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const stepper2 = z.object({
        faedahPersaraanPerkhidmatan: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

        gredSemasa: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        jawatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        penempatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        tarafPerkhidmatan: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        bulanKGT: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Pilihan perlu dipilih.'
                        : defaultError,
            }),
        }),

        noKWSP: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noSOCSO: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noCukai: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        bank: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noAkaun: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        pemangkuanSekarang: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tanggungkerjaSekarang: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        skimPencen: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kenaikanGajiAkhir: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kenaikanPangkatAkhir: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tarikhberkuatKuasa: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        tanggaGaji: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        gajiPokok: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        itka: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        itp: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        epw: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        cola: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        kelayakanCuti: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        program: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        mulaDilantikPerkhidmatanKerajaan: dateStepper2max,
        mulaDilantikPerkhidmatanLKIM: dateStepper2max,
        disahkanDalamJawatanSemasaLKIM: dateStepper2max,
        tarikhKelulusanPercantumanPerkhidmatanLepas: dateStepper2max,
        tarikhBersara: dateStepper2,
        tarikhKuatkuasaLantikanSemasa: dateStepper2max,
    });

    //==========================================================
    //================== stepper 3 =============================
    //==========================================================

    const stepper3 = z.object({
        sekolah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tahunHabis: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        gredSekolah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        bidang: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });
    //==========================================================
    //================== stepper 4 =============================
    //==========================================================

    const stepper4 = z.object({
        namaMajikan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        alamatMajikan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        jawatanPengalaman: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        kodJawatan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        tempohPerkhidmatan: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        gajiPengalaman: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    //==========================================================
    //================== stepper 8 =============================
    //==========================================================

    const dateStepper8 = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .max(new Date(), {
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });

    const stepper8 = z.object({
        warnaKP: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
        hubunganWaris: z.enum(['1', '2'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),

        namaWaris: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        noKP: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        // hubungan: z
        //     .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        //     .min(4, {
        //         message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        //     })
        //     .max(124, {
        //         message: 'Medan ini tidak boleh melebihi 124 karakter.',
        //     })
        //     .trim(),
        // warnaKP: z
        //     .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
        //     .min(4, {
        //         message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        //     })
        //     .max(124, {
        //         message: 'Medan ini tidak boleh melebihi 124 karakter.',
        //     })
        //     .trim(),
        telefonRumah: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        telefonPeribadi: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        pekerjaanWaris: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        namaMajikanWaris: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
        alamatMajikanWaris: z
            .string({ required_error: 'Medan ini latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        tarikhLahirWaris: dateStepper8,
        tarikhKahwin: dateStepper8,
    });

    // =================================================================================
    // submit form function=============================================================
    // =================================================================================

    //------------------------------------------------------
    //---------------------steper 1-------------------------
    //------------------------------------------------------
    const submitFormSepper1 = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);

        const statusPekerjaan = document.getElementById(
            'statusPekerjaan',
        ) as HTMLSelectElement;

        const warnaKadPengenalan = document.getElementById(
            'warnaKadPengenalan',
        ) as HTMLSelectElement;

        const warganegara = document.getElementById(
            'warganegara',
        ) as HTMLSelectElement;
        const tempatLahir = document.getElementById(
            'tempatLahir',
        ) as HTMLSelectElement;
        const bangsa = document.getElementById('bangsa') as HTMLSelectElement;
        const agama = document.getElementById('agama') as HTMLSelectElement;
        const status = document.getElementById('status') as HTMLSelectElement;

        const jantina = document.getElementById('jantina') as HTMLSelectElement;
        const jawatanPasangan = document.getElementById(
            'jawatanPasangan',
        ) as HTMLSelectElement;
        const hubungan = document.getElementById(
            'hubungan',
        ) as HTMLSelectElement;

        const exampleFormData = {
            noPerkeja: String(formData.get('noPerkeja')),
            longTextExample: String(formData.get('longTextExample')),
            radioButtonExample: String(formData.get('radioButtonExample')),
            statusPekerjaan: String(statusPekerjaan.value),
            noKadPengenalan: String(formData.get('noKadPengenalan')),
            namaPenuh: String(formData.get('namaPenuh')),
            namaLain: String(formData.get('namaLain')),
            warnaKadPengenalan: String(warnaKadPengenalan.value),
            tarikhLahir: String(formData.get('tarikhLahir')),
            tempatLahir: String(tempatLahir.value),
            warganegara: String(warganegara.value),
            bangsa: String(bangsa.value),
            agama: String(agama.value),
            jantina: String(jantina.value),
            status: String(status.value),
            emel: String(formData.get('emel')),
            alamatRumah: String(formData.get('alamatRumah')),
            alamatSuratMenyurat: String(formData.get('alamatSuratMenyurat')),
            perumahan: String(formData.get('perumahan')),
            pinjPerumahan: String(formData.get('pinjPerumahan')),
            pinjKenderaan: String(formData.get('pinjKenderaan')),
            noPekerjaPasangan: String(formData.get('noPekerjaPasangan')),
            namaPasangan: String(formData.get('namaPasangan')),
            jawatanPasangan: String(jawatanPasangan.value),
            hubungan: String(hubungan.value),
        };

        try {
            const result = stepper1.parse(exampleFormData);
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

    //------------------------------------------------------>
    //---------------------steper 2------------------------->
    //------------------------------------------------------>

    const submitFormStepper2 = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const gredSemasa = document.getElementById(
            'gredSemasa',
        ) as HTMLSelectElement;
        const jawatan = document.getElementById('jawatan') as HTMLSelectElement;
        const penempatan = document.getElementById(
            'penempatan',
        ) as HTMLSelectElement;
        const tarafPerkhidmatan = document.getElementById(
            'tarafPerkhidmatan',
        ) as HTMLSelectElement;
        const bulanKGT = document.getElementById(
            'bulanKGT',
        ) as HTMLSelectElement;

        const exampleFormData = {
            gredSemasa: String(gredSemasa.value),
            jawatan: String(jawatan.value),
            penempatan: String(penempatan.value),
            tarafPerkhidmatan: String(tarafPerkhidmatan.value),
            noKWSP: String(formData.get('noKWSP')),
            noSOCSO: String(formData.get('noSOCSO')),
            noCukai: String(formData.get('noCukai')),
            bank: String(formData.get('bank')),
            noAkaun: String(formData.get('noAkuan')),
            program: String(formData.get('program')),
            pemangkuanSekarang: String(formData.get('pemangkuanSekarang')),
            tanggungkerjaSekarang: String(
                formData.get('tanggungkerjaSekarang'),
            ),
            skimPencen: String(formData.get('skimPencen')),
            kenaikanGajiAkhir: String(formData.get('kenaikanGajiAkhir')),
            kenaikanPangkatAkhir: String(formData.get('kenaikanPangkatAkhir')),
            bulanKGT: String(bulanKGT.value),
            tarikhberkuatKuasa: String(formData.get('tarikhberkuatKuasa')),
            tanggaGaji: String(formData.get('tanggaGaji')),
            gajiPokok: String(formData.get('gajiPokok')),
            kelayakanCuti: String(formData.get('kelayakanCuti')),
            itka: String(formData.get('itka')),
            itp: String(formData.get('itp')),
            epw: String(formData.get('epw')),
            cola: String(formData.get('cola')),
            mulaDilantikPerkhidmatanKerajaan: String(
                formData.get('mulaDilantikPerkhidmatanKerajaan'),
            ),
            mulaDilantikPerkhidmatanLKIM: String(
                formData.get('mulaDilantikPerkhidmatanLKIM'),
            ),
            disahkanDalamJawatanSemasaLKIM: String(
                formData.get('disahkanDalamJawatanSemasaLKIM'),
            ),
            tarikhKelulusanPercantumanPerkhidmatanLepas: String(
                formData.get('tarikhKelulusanPercantumanPerkhidmatanLepas'),
            ),
            tarikhBersara: String(formData.get('tarikhBersara')),
            tarikhKuatkuasaLantikanSemasa: String(
                formData.get('tarikhKuatkuasaLantikanSemasa'),
            ),
            faedahPersaraanPerkhidmatan: String(
                formData.get('faedahPersaraanPerkhidmatan'),
            ),
        };

        try {
            const result = stepper2.parse(exampleFormData);
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

    //------------------------------------------------------>
    //---------------------steper 3------------------------->
    //------------------------------------------------------>

    const submitFormStepper3 = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const exampleFormData = {
            sekolah: String(formData.get('sekolah')),
            tahunHabis: String(formData.get('tahunHabis')),
            gredSekolah: String(formData.get('gredSekolah')),
            bidang: String(formData.get('bidang')),
        };

        try {
            const result = stepper3.parse(exampleFormData);
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
    //------------------------------------------------------>
    //---------------------stepper 4------------------------->
    //------------------------------------------------------>

    const submitFormStepper4 = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const exampleFormData = {
            namaMajikan: String(formData.get('namaMajikan')),
            alamatMajikan: String(formData.get('alamatMajikan')),
            jawatanPengalaman: String(formData.get('jawatanPengalaman')),
            kodJawatan: String(formData.get('kodJawatan')),
            tempohPerkhidmatan: String(formData.get('tempohPerkhidmatan')),
            gajiPengalaman: String(formData.get('gajiPengalaman')),
        };

        try {
            const result = stepper4.parse(exampleFormData);
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

    //------------------------------------------------------>
    //---------------------steper 8------------------------->
    //------------------------------------------------------>

    const submitFormStepper8 = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;
        const hubunganWaris = document.getElementById(
            'hubunganWaris',
        ) as HTMLSelectElement;
        const warnaKP = document.getElementById('warnaKP') as HTMLSelectElement;

        const exampleFormData = {
            namaWaris: String(formData.get('namaWaris')),
            noKP: String(formData.get('noKP')),
            hubunganWaris: String(hubunganWaris.value),
            warnaKP: String(warnaKP.value),
            telefonRumah: String(formData.get('telefonRumah')),
            telefonPeribadi: String(formData.get('telefonPeribadi')),
            pekerjaanWaris: String(formData.get('pekerjaanWaris')),
            namaMajikanWaris: String(formData.get('pekerjaanWaris')),
            alamatMajikanWaris: String(formData.get('alamatMajikanWaris')),
            tarikhLahirWaris: String(formData.get('tarikhLahirWaris')),
            tarikhKahwin: String(formData.get('tarikhKahwin')),
        };

        try {
            const result = stepper8.parse(exampleFormData);
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

    // Stepper Classes //

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let steppers: string[] = [
        'Maklumat Peribadi',

        'Maklumat Perkhidmatan',

        'Maklumat Akademik / Kelayakan / Latihan yang Lalu',

        'Maklumat Pengalaman',

        'Maklumat Kegiatan / Keahlian',

        'Maklumat Keluarga',

        'Maklumat Tanggungan Selain Isteri dan Anak',

        'Maklumat Waris',

        'Dokumen - Dokumen Sokongan yang Berkaitan',
    ];
    let isExPoliceSoldier = currentEmployee.isExPoliceOrSoldier
        ? 'true'
        : 'false';

    let isInRelationshipWithLKIMStaff =
        currentEmployeeSpouse.isLKIMStaff == 'Ya' ? 'true' : 'false';
    let isKWSP = currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    // Radio Functions

    let radioChosen: string = '';
    const faedahPersaraanOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'KWSP',
        },
        {
            value: 'false',
            label: 'Pencen',
        },
    ];
    const options: RadioOption[] = [
        {
            value: 'true',
            label: 'Ya',
        },
        {
            value: 'false',
            label: 'Tidak',
        },
    ];
    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
    }
    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
    }
    function currencyFormatter(amount: number) {
        const formatter = new Intl.NumberFormat('ms-MY', {
            style: 'currency',
            currency: 'MYR',
        });
        return formatter.format(Number(amount)).toString();
    }
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';
    // function to assign the content  of the tooltip
    function assignContent(ev: CustomEvent<HTMLDivElement>) {
        {
            let eventName = (ev.target as HTMLDivElement).id.split('-')[1];

            switch (eventName) {
                case 'itka':
                    tooltipContent = itkaTooltip;
                    break;
                case 'itp':
                    tooltipContent = itpTooltip;
                    break;
                case 'epw':
                    tooltipContent = epwTooltip;
                    break;
                case 'cola':
                    tooltipContent = colaTooltip;
                    break;
                default:
                    tooltipContent = 'no tooltip available';
            }
        }
    }
</script>

<Stepper>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormSepper1" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="FormSepper1"
                on:submit|preventDefault={submitFormSepper1}
                class="flex w-full flex-col gap-2"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    hasError={errorData?.noPekerja}
                    name="noPerkeja"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={currentEmployee.employeeNumber}
                ></TextField>

                {#if errorData?.noPerkeja}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.noPerkeja[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.statusPekerjaan}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    label="Status Pekerjaan"
                    bind:index={currentEmployeeStatus.name}
                    options={[
                        { value: '1', name: 'Aktif' },
                        { value: '2', name: 'Tidak Aktif' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.statusPekerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.statusPekerjaan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.noKadPengenalan}
                    name="noKadPengenalan"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={currentEmployee.identityDocumentNumber}
                ></TextField>

                {#if errorData?.noKadPengenalan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.noKadPengenalan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.namaPenuh}
                    name="namaPenuh"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={currentEmployee.name}
                ></TextField>

                {#if errorData?.namaPenuh}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.namaPenuh[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.namaLain}
                    name="namaLain"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={currentEmployee.alternativeName}
                ></TextField>

                {#if errorData?.namaLain}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.namaLain[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.warnaKadPengenalan}
                    dropdownType="label-left-full"
                    id="warnaKadPengenalan"
                    label="Warna Kad Pengenalan"
                    bind:index={currentEmployee.isMalaysian}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.statusPewarnaKadPengenalankerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.warnaKadPengenalan[0]}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={errorData?.tarikhLahir}
                    name="tarikhLahir"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={currentEmployee.birthDate}
                ></DateSelector>
                {#if errorData?.tarikhLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.tarikhLahir[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.tempatLahir}
                    dropdownType="label-left-full"
                    id="tempatLahir"
                    label="Tempat Lahir"
                    bind:index={currentEmployeeBirthState.name}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.tempatLahir}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.tempatLahir[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.warganegara}
                    dropdownType="label-left-full"
                    id="warganegara"
                    label="Warganegara"
                    bind:index={currentEmployee.isMalaysian}
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.warganegara}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.warganegara[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.bangsa}
                    dropdownType="label-left-full"
                    id="bangsa"
                    label="Tempat Lahir"
                    bind:index={currentEmployeeRace.name}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.bangsa}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.bangsa[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.agama}
                    dropdownType="label-left-full"
                    id="agama"
                    label="Agama"
                    bind:index={currentEmployeeReligion.name}
                    options={[
                        { value: '1', name: 'Islam' },
                        { value: '2', name: 'Kristen' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.agama}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.agama[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.jantina}
                    dropdownType="label-left-full"
                    id="jantina"
                    label="Jantina"
                    bind:index={currentEmployee.gender}
                    options={[
                        { value: '1', name: 'Lelaki' },
                        { value: '2', name: 'Perempuan' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.jantina}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.jantina[0]}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={errorData?.status}
                    dropdownType="label-left-full"
                    id="status"
                    label="Status"
                    bind:index={currentEmployee.marital}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
                ></DropdownSelect>
                {#if errorData?.status}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.status[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.emel}
                    name="emel"
                    label={'Emel'}
                    type="text"
                    bind:value={currentEmployee.email}
                ></TextField>

                {#if errorData?.emel}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.noPerkeja[0]}</span
                    >
                {/if}

                <LongTextField
                    hasError={errorData?.alamatRumah}
                    {disabled}
                    name="alamatRumah"
                    label="Alamat Rumah"
                    bind:value={currentEmployee.homeAddress}
                />
                {#if errorData?.alamatRumah}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.alamatRumah[0]}</span
                    >
                {/if}

                <LongTextField
                    hasError={errorData?.alamatSuratMenyurat}
                    {disabled}
                    name="alamatSuratMenyurat"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={currentEmployee.mailAddress}
                />
                {#if errorData?.alamatSuratMenyurat}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.alamatSuratMenyurat[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.perumahan}
                    name="perumahan"
                    label={'Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                {#if errorData?.perumahan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.perumahan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.pinjPerumahan}
                    name="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                {#if errorData?.pinjPerumahan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.pinjPerumahan[0]}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={errorData?.pinjKenderaan}
                    name="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    type="text"
                    value="-"
                ></TextField>

                {#if errorData?.pinjKenderaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.pinjKenderaan[0]}</span
                    >
                {/if}

                <RadioSingle
                    {disabled}
                    {options}
                    name="radioButtonExample"
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={isExPoliceSoldier}
                ></RadioSingle>
                {#if errorData?.radioButtonExample}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.radioButtonExample[0]}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={isInRelationshipWithLKIMStaff}
                    ></RadioSingle>
                    {#if isInRelationshipWithLKIMStaff === 'true'}

                        <TextField
                            {disabled}
                            hasError={errorData?.noPekerjaPasangan}
                            name="noPekerjaPasangan"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            value={currentEmployeeSpouseEmployeeInfo?.employeeNumber}
                        ></TextField>

                        {#if errorData?.noPekerjaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.noPekerjaPasangan[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={errorData?.namaPasangan}
                            name="namaPasangan"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            value={currentEmployeeSpouse.name}
                        ></TextField>

                        {#if errorData?.namaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.namaPasangan[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={errorData?.jawatanPasangan}
                            dropdownType="label-left-full"
                            id="jawatanPasangan"
                            label="Jawatan Kakitangan LKIM"
                            bind:index={currentEmployeeSpouse.position}
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.jawatanPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.jawatanPasangan[0]}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={errorData?.hubungan}
                            dropdownType="label-left-full"
                            id="hubungan"
                            label="Hubungan"
                            bind:index={currentEmployeeSpouse.relationship}
                            options={[
                                { value: '1', name: 'Suami' },
                                { value: '2', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if errorData?.hubungan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.hubungan[0]}</span
                            >
                        {/if}

                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>

    <!----------------------------------------------------->
    <!--------------- Maklumat Perkhidmatan --------------->
    <!----------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper2" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper2"
                    on:submit|preventDefault={submitFormStepper2}
                    class="flex w-full flex-col gap-2"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.gredSemasa}
                        dropdownType="label-left-full"
                        id="gredSemasa"
                        label="Gred Semasa"
                        bind:index={currentEmployeeGrade.code}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.gredSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.gredSemasa[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.jawatan}
                        dropdownType="label-left-full"
                        id="jawatan"
                        label="Gred Semasa"
                        bind:index={currentEmployeePosition.name}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.jawatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.jawatan[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.penempatan}
                        dropdownType="label-left-full"
                        id="penempatan"
                        label="Penempatan"
                        bind:index={currentEmployeeService.placement}
                        options={[
                            { value: '1', name: 'Kuala Lumpur' },
                            { value: '2', name: 'Sarawak' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.penempatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.penempatan[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.tarafPerkhidmatan}
                        dropdownType="label-left-full"
                        id="tarafPerkhidmatan"
                        label="Taraf Perkhidmatan"
                        bind:index={currentEmployeeServiceType.name}
                        options={[
                            { value: '1', name: 'TETAP' },
                            { value: '2', name: 'SEMENTARA' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.tarafPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarafPerkhidmatan[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKuatkuasaLantikanSemasa}
                        name="tarikhKuatkuasaLantikanSemasa"
                        handleDateChange
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKuatkuasaLantikanSemasa}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhKuatkuasaLantikanSemasa[0]}</span
                        >
                    {/if}

                    <RadioSingle
                        {disabled}
                        options={faedahPersaraanOptions}
                        name="faedahPersaraanPerkhidmatan"
                        legend={'Faedah Persaraan'}
                        bind:userSelected={radioChosen}
                    ></RadioSingle>
                    {#if errorData?.faedahPersaraanPerkhidmatan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.faedahPersaraanPerkhidmatan[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.noKWSP}
                        name="noKWSP"
                        label={'No. KWSP'}
                        type="text"
                        value={'1234-6578-9012'}
                    ></TextField>

                    {#if errorData?.noKWSP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noKWSP[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.noSOCSO}
                        name="noSOCSO"
                        label={'No. SOCSO'}
                        type="text"
                        value={'1234-6578-9012'}
                    ></TextField>

                    {#if errorData?.noSOCSO}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noSOCSO[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.noCukai}
                        name="noCukai"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        value={'1234-6578-9012'}
                    ></TextField>

                    {#if errorData?.noCukai}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noCukai[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.bank}
                        name="bank"
                        label={'Bank'}
                        type="text"
                        value={'Maybank'}
                    ></TextField>

                    {#if errorData?.bank}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.bank[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.noAkaun}
                        name="noAkaun"
                        label={'No.Akaun'}
                        type="text"
                        value={'1234-5678-9012'}
                    ></TextField>

                    {#if errorData?.noAkaun}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noAkaun[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.program}
                        name="program"
                        label={'Program'}
                        type="text"
                        value={'-'}
                    ></TextField>

                    {#if errorData?.program}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.program[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.kelayakanCuti}
                        name="kelayakanCuti"
                        label={'Kelayakan Cuti'}
                        type="text"
                        value={getEmployeeLeave(currentEmployee.employeeNumber)}
                    ></TextField>

                    {#if errorData?.kelayakanCuti}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kelayakanCuti[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.mulaDilantikPerkhidmatanKerajaan}
                        name="mulaDilantikPerkhidmatanKerajaan"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.mulaDilantikPerkhidmatanKerajaan}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.mulaDilantikPerkhidmatanKerajaan[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={errorData?.mulaDilantikPerkhidmatanLKIM}
                        name="mulaDilantikPerkhidmatanLKIM"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={currentEmployeeService.currentServiceDate}
                    ></DateSelector>
                    {#if errorData?.mulaDilantikPerkhidmatanLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.mulaDilantikPerkhidmatanLKIM[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.disahkanDalamJawatanSemasaLKIM}
                        name="disahkanDalamJawatanSemasaLKIM"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={currentEmployeeService.currentServiceDate}
                    ></DateSelector>
                    {#if errorData?.disahkanDalamJawatanSemasaLKIM}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.disahkanDalamJawatanSemasaLKIM[0]}</span
                        >
                    {/if}

                    <AccordianField
                        disabled={!disabled}
                        label="Sejarah Lantikan Jawatan LKIM"
                        header="Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan"
                    >
                        {#each currentEmployeePositionHistory as item, i}
                            <label
                                for=""
                                class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                    ? 'text-txt-tertiary'
                                    : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                >{i + 1}. {mockLookupGrades.find(
                                    (grade) => grade.id === item.gradeId,
                                )?.code}, {mockLookupPositions.find(
                                    (position) =>
                                        position.gradeId === item.gradeId,
                                )?.name}, {item.startDate}, {item.startDate}
                            </label>
                        {/each}
                    </AccordianField>

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKelulusanPercantumanPerkhidmatanLepas}
                        name="tarikhKelulusanPercantumanPerkhidmatanLepas"
                        handleDateChange
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:selectedDate={currentEmployeeService.firstServiceDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKelulusanPercantumanPerkhidmatanLepas}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData
                                ?.tarikhKelulusanPercantumanPerkhidmatanLepas[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.pemangkuanSekarang}
                        name="pemangkuanSekarang"
                        label={'Pemangkuan Sekarang'}
                        type="text"
                        value="-"
                    ></TextField>

                    {#if errorData?.pemangkuanSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.pemangkuanSekarang[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.tanggungkerjaSekarang}
                        name="tanggungkerjaSekarang"
                        label={'Tanggung Kerja Sekarang'}
                        type="text"
                        value="-"
                    ></TextField>

                    {#if errorData?.tanggungkerjaSekarang}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tanggungkerjaSekarang[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.skimPencen}
                        name="skimPencen"
                        label={'Skim Pencen'}
                        type="text"
                        value="-"
                    ></TextField>

                    {#if errorData?.skimPencen}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.skimPencen[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.kenaikanGajiAkhir}
                        name="kenaikanGajiAkhir"
                        label={'Kenaikan Gaji Akhir'}
                        type="text"
                        value="-"
                    ></TextField>

                    {#if errorData?.kenaikanGajiAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kenaikanGajiAkhir[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.kenaikanPangkatAkhir}
                        name="kenaikanPangkatAkhir"
                        label={'Kenaikan Pangkat Akhir'}
                        type="text"
                        value="-"
                    ></TextField>

                    {#if errorData?.kenaikanPangkatAkhir}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.kenaikanPangkatAkhir[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.bulanKGT}
                        dropdownType="label-left-full"
                        id="bulanKGT"
                        label="Bulan KGT"
                        value=""
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'Februari' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.bulanKGT}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.bulanKGT[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhBersara}
                        name="tarikhBersara"
                        handleDateChange
                        label="Tarikh Bersara"
                        bind:selectedDate={currentEmployeePensions.retiredDate}
                    ></DateSelector>
                    {#if errorData?.tarikhBersara}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhBersara[0]}</span
                        >
                    {/if}

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasError={errorData?.tarikhBerkuatkuasa}
                                name="tarikhBerkuatkuasa"
                                label={'Tarikh Berkuatkuasa'}
                                type="text"
                                value="12/12/2021"
                            ></TextField>

                            {#if errorData?.tarikhBerkuatkuasa}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tarikhBerkuatkuasa[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={errorData?.tanggaGaji}
                                name="tanggaGaji"
                                label={'Tangga Gaji'}
                                type="text"
                                value="12/12/2021"
                            ></TextField>

                            {#if errorData?.tanggaGaji}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tanggaGaji[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.gajipokok}
                                name="gajipokok"
                                label={'Gaji Pokok'}
                                type="text"
                                value="12/12/2021"
                            ></TextField>

                            {#if errorData?.gajipokok}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.gajipokok[0]}</span
                                >
                            {/if}
                        </div>

                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itka"
                                hasError={errorData?.itka}
                                name="itka"
                                label={'ITKA'}
                                type="text"
                                value={currencyFormatter(123.45)}
                            ></TextField>

                            {#if errorData?.itka}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.itka[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itp"
                                hasError={errorData?.itp}
                                name="itp"
                                label={'ITP'}
                                type="text"
                                value={currencyFormatter(123.45)}
                            ></TextField>

                            {#if errorData?.itp}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.itp[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-epw"
                                hasError={errorData?.epw}
                                name="epw"
                                label={'EPW'}
                                type="text"
                                value={currencyFormatter(123.45)}
                            ></TextField>

                            {#if errorData?.epw}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.epw[0]}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-cola"
                                hasError={errorData?.cola}
                                name="cola"
                                label={'COLA'}
                                type="text"
                                value={currencyFormatter(123.45)}
                            ></TextField>

                            {#if errorData?.cola}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.cola[0]}</span
                                >
                            {/if}

                            <!-- Tooltip body -->
                            <Tooltip
                                type="dark"
                                triggeredBy="[id^='type-']"
                                on:show={assignContent}
                                >"{tooltipContent}"</Tooltip
                            >
                        </div>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------>
    <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            >{#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper3" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper3"
                    on:submit|preventDefault={submitFormStepper3}
                    class="flex w-full flex-col gap-2"
                >
                    {#each currentEmployeeEducations as edu, i}
                        <p class={stepperFormTitleClass}>
                            {edu.type}
                        </p>

                        <TextField
                            {disabled}
                            hasError={errorData?.sekolah}
                            name="sekolah"
                            label={'Sekolah'}
                            type="text"
                            bind:value={edu.instituteName}
                        ></TextField>

                        {#if errorData?.sekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.sekolah[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={errorData?.tahunHabis}
                            name="tahunHabis"
                            label={'Tahun'}
                            type="text"
                            bind:value={edu.completionYear}
                        ></TextField>

                        {#if errorData?.tahunHabis}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.tahunHabis[0]}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={errorData?.gredSekolah}
                            name="gredSekolah"
                            label={edu.type == 'Ijazah' ? 'CGPA' : 'Gred'}
                            type="text"
                            bind:value={edu.finalGrade}
                        ></TextField>

                        {#if errorData?.gredSekolah}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.noPerkeja[0]}</span
                            >
                        {/if}

                        {#if edu.type == 'Ijazah'}
                            <TextField
                                {disabled}
                                hasError={errorData?.bidang}
                                name="bidang"
                                label={'Bidang'}
                                type="text"
                                bind:value={edu.course}
                            ></TextField>

                            {#if errorData?.bidang}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.bidang[0]}</span
                                >
                            {/if}

                            <AccordianField
                                disabled={!disabled}
                                label="Catatan"
                                header="Catatan"
                            >
                                {#each edu.remark as val, i}
                                    <label
                                        for=""
                                        class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {disabled
                                            ? 'text-txt-tertiary'
                                            : 'text-txt-primary'}
                                            hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                        >{i + 1}. {val}</label
                                    >
                                {/each}
                            </AccordianField>
                        {/if}
                    {/each}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper4" />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper4"
                    on:submit|preventDefault={submitFormStepper4}
                    class="flex w-full flex-col gap-2"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>

                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={errorData?.namaMajikan}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={item.company}
                            ></TextField>
                            {#if errorData?.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.alamatMajikan}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                    (state) => state.id === item.stateId,
                                )?.name}, {item.country}"
                            ></TextField>
                            {#if errorData?.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.jawatanPengalaman}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={item.position}
                            ></TextField>
                            {#if errorData?.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.jawatanPengalaman[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.kodJawatan}
                                name="kodJawatan"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={item.grade}
                            ></TextField>
                            {#if errorData?.kodJawatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.kodJawatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.tempohPerkhidmatan}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                value={getDurationYear(
                                    item.startDate,
                                    item.endDate,
                                ).toString()}
                            ></TextField>
                            {#if errorData?.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.gajiPengalaman}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={item.salary}
                            ></TextField>
                            {#if errorData?.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.gajiPengalaman[0]}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={errorData?.namaMajikan}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={item.company}
                            ></TextField>
                            {#if errorData?.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.namaMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.alamatMajikan}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                value="{item.address}, {item.postcode}, {item.city}, {mockLookupStates.find(
                                    (state) => state.id === item.stateId,
                                )?.name}, {item.country}"
                            ></TextField>
                            {#if errorData?.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.alamatMajikan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.jawatanPengalaman}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={item.position}
                            ></TextField>
                            {#if errorData?.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.jawatanPengalaman[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.kodJawatan}
                                name="kodJawatan"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={item.grade}
                            ></TextField>
                            {#if errorData?.kodJawatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.kodJawatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.tempohPerkhidmatan}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                value={getDurationYear(
                                    item.startDate,
                                    item.endDate,
                                ).toString()}
                            ></TextField>
                            {#if errorData?.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.tempohPerkhidmatan[0]}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={errorData?.gajiPengalaman}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={item.salary}
                            ></TextField>
                            {#if errorData?.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{errorData?.gajiPengalaman[0]}</span
                                >
                            {/if}
                        {/if}
                    {/each}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!--------------Maklumat Kegiatan / Keahlian------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tanggungan Selain Isteri dan Anak"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            {#if !disabled}
                <TextIconButton primary label="Simpan" form="FormStepper8" />
            {/if}
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepper8"
                    on:submit|preventDefault={submitFormStepper8}
                    class="flex w-full flex-col gap-2"
                >
                    <TextField
                        {disabled}
                        hasError={errorData?.namaWaris}
                        name="namaWaris"
                        label={'Nama Waris'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.name}
                    ></TextField>
                    {#if errorData?.namaWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.namaWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.noKP}
                        name="noKP"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.identityDocumentNumber}
                    ></TextField>
                    {#if errorData?.noKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.noKP[0]}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhLahirWaris}
                        name="tarikhLahirWaris"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={currentEmployeeNextOfKins.birthDate}
                    ></DateSelector>
                    {#if errorData?.tarikhLahirWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhLahirWaris[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.hubunganWaris}
                        dropdownType="label-left-full"
                        id="hubunganWaris"
                        label="Hubungan"
                        bind:index={currentEmployeeNextOfKins.relationship}
                        options={[
                            { value: '1', name: 'Suami' },
                            { value: '2', name: 'Isteri' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.hubunganWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.hubunganWaris[0]}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={errorData?.tarikhKahwin}
                        name="tarikhKahwin"
                        handleDateChange
                        label="Tarikh Kahwin (Jika Berkenaan) "
                        bind:selectedDate={currentEmployeeNextOfKins.marriageDate}
                    ></DateSelector>
                    {#if errorData?.tarikhKahwin}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.tarikhKahwin[0]}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={errorData?.warnaKP}
                        dropdownType="label-left-full"
                        id="warnaKP"
                        label="Warna Kad Pengenalan"
                        bind:index={currentEmployeeNextOfKins.isMalaysian}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    {#if errorData?.warnaKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.warnaKP[0]}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={errorData?.telefonRumah}
                        name="telefonRumah"
                        label={'Telefon (R)'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.homeNumber}
                    ></TextField>
                    {#if errorData?.telefonRumah}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.telefonRumah[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.telefonPeribadi}
                        name="telefonPeribadi"
                        label={'Telefon (P)'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.mobileNumber}
                    ></TextField>
                    {#if errorData?.telefonPeribadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.telefonPeribadi[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.pekerjaanWaris}
                        name="pekerjaanWaris"
                        label={'Pekerjaan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.position}
                    ></TextField>
                    {#if errorData?.pekerjaanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.pekerjaanWaris[0]}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={errorData?.namaMajikanWaris}
                        name="namaMajikanWaris"
                        label={'Nama Majikan'}
                        type="text"
                        bind:value={currentEmployeeNextOfKins.company}
                    ></TextField>
                    {#if errorData?.namaMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.namaMajikanWaris[0]}</span
                        >
                    {/if}

                    <LongTextField
                        hasError={errorData?.alamatMajikanWaris}
                        {disabled}
                        name="alamatMajikanWaris"
                        label="Alamat Majikan"
                        bind:value={currentEmployeeNextOfKins.companyAddress}
                    />
                    {#if errorData?.alamatMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.alamatMajikanWaris[0]}</span
                        >
                    {/if}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
                {#each currentEmployeeUploadedDocuments as item, i}
                    <div
                        class="flex w-full flex-row items-center justify-between"
                    >
                        <label
                            for=""
                            class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                            >{i + 1}.</label
                        >
                        <DownloadAttachment fileName={item.documentPath}
                        ></DownloadAttachment>
                    </div>
                {/each}
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
<Toaster />
