<script lang="ts">
    // Importing external components and libraries
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Badge, Tooltip } from 'flowbite-svelte';
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
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import {
        _personalInfoForm,
        _submitPersonalInfoForm,
        _academicInfoSchema,
        _addAcademicInfoSchema,
        _submitAcademicInfoForm,
        _experienceInfoSchema,
        _submitExperienceInfoForm,
        _kinInfoSchema,
        _submitKinInfoForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';
    import {
        getErrorToast,
        getSuccessToast,
    } from '$lib/services/core/toast/toast-service';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { z, ZodError } from 'zod';
    import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';

    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        const staffs: IntEmployees[] = await getEmployees();

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });
    let sameAddress: boolean = false;

    let employeeNumber: string = '00001';
    let disabled: boolean = false;

    let editable: boolean = true;

    const statusDeclaration: DropdownOptionsInterface[] = [
        {
            value: 1,
            name: 'Ada',
        },
        {
            value: 2,
            name: 'Tiada Ada',
        },
    ];

    const approveOptions: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
            label: 'Tidak',
        },
    ];

    $: if (sameAddress) {
        $personalInfoForm.mailAddress = $personalInfoForm.homeAddress;
        $personalInfoForm.mailCountryId = $personalInfoForm.homeCountryId;
        $personalInfoForm.mailStateId = $personalInfoForm.homeStateId;
        $personalInfoForm.mailCityId = $personalInfoForm.homeCityId;
        $personalInfoForm.mailPostcode = $personalInfoForm.homePostcode;
    }

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

    // Stepper Classes

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

    // Radio Functions

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
    }
    function dateFormatter(date: string) {
        const [year, month, day] = date.split('/');
        return day + '-' + month + '-' + year;
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
    export let data: PageData;
    let tempAcademicRecord: any[] = [];
    let tempExperienceRecord: any[] = [];

    const uploadedFileSchema = z.object({
        uploadedFiles: z.any().array().nonempty({
            message: 'Sila muat naik dokumen - dokumen berkaitan.',
        }),
    });
    // Function to handle the file changes
    let selectedFiles: File[] = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });
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

    let errorData: any;
    //File uploaded validation
    const submitFilesForm = async () => {
        let uploadedFiles = selectedFiles;
        const uploadedFileData = {
            uploadedFiles: uploadedFiles,
        };

        try {
            const result = uploadedFileSchema.parse(uploadedFileData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                console.log(result);
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error('Sila pastikan dokumen telah dimuat naik.', {
                    style: 'background: #333; color: #fff;',
                });
            }
        }
    };

    export const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
    } = superForm(data.personalInfoForm, {
        SPA: true,
        id: 'FormStepperMaklumatPeribadi',
        validators: _personalInfoForm,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',

        onSubmit() {
            // console.log('HERE: ', $personalInfoForm);
            _submitPersonalInfoForm($personalInfoForm);
        },
    });
    const {
        form: academicInfoForm,
        errors: academicInfoErrors,
        enhance: academicInfoEnhance,
    } = superForm(data.academicInfoForm, {
        SPA: true,
        validators: _academicInfoSchema,
        onSubmit() {
            _submitAcademicInfoForm($academicInfoForm);
        },
    });

    const {
        form: experienceInfoForm,
        errors: experienceInfoErrors,
        enhance: experienceInfoEnhance,
    } = superForm(data.experienceInfoForm, {
        SPA: true,
        validators: _experienceInfoSchema,
        onSubmit() {
            _submitExperienceInfoForm($experienceInfoForm);
        },
    });
    const {
        form: kinInfoForm,
        errors: kinInfoErrors,
        enhance: kinInfoEnhance,
        formId: kinInfoId,
    } = superForm(data.kinInfoForm, {
        SPA: true,
        id: 'formStepperWaris',
        validators: _kinInfoSchema,
        onSubmit() {
            _submitKinInfoForm($kinInfoForm);
        },
    });
</script>

<ContentHeader
    title="Maklumat Lantikan Baru {currentEmployee.name}"
    description=""
    ><FormButton
        type="close"
        onClick={() => {
            goto('../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"
            ><TextIconButton
                primary
                label="Simpan"
                form="FormStepperMaklumatPeribadi"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- Maklumat Peribadi -->
            <form
                id="FormStepperMaklumatPeribadi"
                class="flex w-full flex-col gap-2"
                use:personalInfoEnhance
                method="POST"
            >
                <div class="flex w-full flex-col gap-2.5">
                    <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                    <TextField
                        {disabled}
                        hasError={!!$personalInfoError.name}
                        name="name"
                        label={'Nama Penuh'}
                        type="text"
                        bind:value={$personalInfoForm.name}
                    ></TextField>
                    {#if $personalInfoError.name}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.name}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$personalInfoError.alternativeName}
                        name="alternativeName"
                        label={'Nama Lain'}
                        type="text"
                        bind:value={$personalInfoForm.alternativeName}
                    ></TextField>
                    {#if $personalInfoError.alternativeName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.alternativeName}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={!!$personalInfoError.identityDocumentNumber}
                        name="identityDocumentNumber"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={$personalInfoForm.identityDocumentNumber}
                    />
                    {#if $personalInfoError.identityDocumentNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.identityDocumentNumber}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.identityDocumentColor}
                        dropdownType="label-left-full"
                        id="identityDocumentColor"
                        name="identityDocumentColor"
                        label="Warna Kad Pengenalan"
                        bind:value={$personalInfoForm.identityDocumentColor}
                        options={[
                            { value: 'Biru', name: 'Biru' },
                            { value: 'Merah', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    {#if $personalInfoError.identityDocumentColor}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.identityDocumentColor}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.titleId}
                        dropdownType="label-left-full"
                        name="titleId"
                        label="Panggilan"
                        bind:value={$personalInfoForm.titleId}
                        options={data.titleLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.titleId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.titleId}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.nationalityId}
                        dropdownType="label-left-full"
                        name="nationalityId"
                        label="Warganegara"
                        bind:value={$personalInfoForm.nationalityId}
                        options={[
                            { value: 1, name: 'Warganegara' },
                            { value: 2, name: 'Bukan Warganegara' },
                        ]}
                    ></DropdownSelect>
                    {#if $personalInfoError.nationalityId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.nationalityId}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$personalInfoError.birthDate}
                        name="birthDate"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={$personalInfoForm.birthDate}
                    ></DateSelector>
                    {#if $personalInfoError?.birthDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.birthDate}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.birthCountryId}
                        dropdownType="label-left-full"
                        name="birthCountryId"
                        label="Negara Kelahiran"
                        bind:value={$personalInfoForm.birthCountryId}
                        options={data.countryLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.birthCountryId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.birthCountryId}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.birthStateId}
                        dropdownType="label-left-full"
                        name="birthStateId"
                        label="Negeri Kelahiran"
                        bind:value={$personalInfoForm.birthStateId}
                        options={data.stateLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.birthStateId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.birthStateId}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.ethnicId}
                        dropdownType="label-left-full"
                        name="ethnicId"
                        label="Etnik"
                        bind:value={$personalInfoForm.ethnicId}
                        options={data.ethnicityLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.ethnicId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.ethnicId}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.religionId}
                        dropdownType="label-left-full"
                        name="religionId"
                        label="Agama"
                        bind:value={$personalInfoForm.religionId}
                        options={data.religionLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.religionId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.religionId}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.raceId}
                        dropdownType="label-left-full"
                        name="raceId"
                        label="Bangsa"
                        bind:value={$personalInfoForm.raceId}
                        options={data.raceLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.raceId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.raceId}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.ethnicId}
                        dropdownType="label-left-full"
                        name="ethnicId"
                        label="Jantina"
                        bind:value={$personalInfoForm.ethnicId}
                        options={data.ethnicityLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.ethnicId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.ethnicId}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.maritalId}
                        dropdownType="label-left-full"
                        label="Status"
                        bind:value={$personalInfoForm.maritalId}
                        options={data.maritalLookup}
                    ></DropdownSelect>
                    {#if $personalInfoError.maritalId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.maritalId}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$personalInfoError.email}
                        name="email"
                        label={'Emel'}
                        type="text"
                        bind:value={$personalInfoForm.email}
                    ></TextField>
                    {#if $personalInfoError?.email}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.email}</span
                        >
                    {/if}

                    <LongTextField
                        hasError={!!$personalInfoError.homeAddress}
                        {disabled}
                        name="homeAddress"
                        label="Alamat Rumah"
                        bind:value={$personalInfoForm.homeAddress}
                    />
                    {#if $personalInfoError.homeAddress}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.homeAddress}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.homeCountryId}
                        dropdownType="label-left-full"
                        name="homeCountryId"
                        label={'Negara Alamat'}
                        options={data.countryLookup}
                        bind:value={$personalInfoForm.homeCountryId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.homeCountryId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.homeCountryId}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.homeStateId}
                        dropdownType="label-left-full"
                        name="homeStateId"
                        label={'Negeri Alamat'}
                        options={data.stateLookup}
                        bind:value={$personalInfoForm.homeStateId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.homeStateId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.homeStateId}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.homeCityId}
                        dropdownType="label-left-full"
                        name="homeCityId"
                        label={'Bandar Alamat'}
                        options={data.cityLookup}
                        bind:value={$personalInfoForm.homeCityId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.homeCityId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.homeCityId}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={!!$personalInfoError.homePostcode}
                        name="homePostcode"
                        label={'Poskod'}
                        bind:value={$personalInfoForm.homePostcode}
                    ></TextField>
                    {#if $personalInfoError?.homePostcode}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.homePostcode}</span
                        >
                    {/if}

                    <Checkbox class="text-sm" bind:checked={sameAddress}
                        >Sama dengan alamat rumah.</Checkbox
                    >
                    <LongTextField
                        hasError={!!$personalInfoError.mailAddress}
                        disabled={sameAddress}
                        name="mailAddress"
                        label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                        bind:value={$personalInfoForm.mailAddress}
                    />
                    {#if $personalInfoError.mailAddress}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.mailAddress}</span
                        >
                    {/if}
                    <DropdownSelect
                        disabled={sameAddress}
                        hasError={!!$personalInfoError.mailCountryId}
                        dropdownType="label-left-full"
                        name="mailCountryId"
                        label={'Negara Alamat Surat Menyurat'}
                        options={data.countryLookup}
                        bind:value={$personalInfoForm.mailCountryId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.mailCountryId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.mailCountryId}</span
                        >
                    {/if}
                    <DropdownSelect
                        disabled={sameAddress}
                        hasError={!!$personalInfoError.mailStateId}
                        dropdownType="label-left-full"
                        name="mailStateId"
                        label={'Negeri Alamat Surat Menyurat'}
                        options={data.stateLookup}
                        bind:value={$personalInfoForm.mailStateId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.mailStateId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.mailStateId}</span
                        >
                    {/if}
                    <DropdownSelect
                        disabled={sameAddress}
                        hasError={!!$personalInfoError.mailCityId}
                        dropdownType="label-left-full"
                        name="mailCityId"
                        label={'Bandar Alamat Surat Menyurat'}
                        options={data.cityLookup}
                        bind:value={$personalInfoForm.mailCityId}
                    ></DropdownSelect>
                    {#if $personalInfoError?.mailCityId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.mailCityId}</span
                        >
                    {/if}
                    <TextField
                        disabled={sameAddress}
                        hasError={!!$personalInfoError.mailPostcode}
                        name="mailPostcode"
                        label={'Poskod Surat Menyurat'}
                        bind:value={$personalInfoForm.mailPostcode}
                    ></TextField>
                    {#if $personalInfoError?.mailPostcode}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.mailPostcode}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$personalInfoError.assetDeclarationStatusId}
                        dropdownType="label-left-full"
                        name="assetDeclarationStatusId"
                        label="Pengisytiharan Harta"
                        bind:value={$personalInfoForm.assetDeclarationStatusId}
                        options={statusDeclaration}
                    ></DropdownSelect>
                    {#if $personalInfoError.assetDeclarationStatusId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.assetDeclarationStatusId}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={!!$personalInfoError.propertyDeclarationDate}
                        name="propertyDeclarationDate"
                        handleDateChange
                        label="Tarikh Pengisytiharan Harta"
                        bind:selectedDate={$personalInfoForm.propertyDeclarationDate}
                    ></DateSelector>
                    {#if $personalInfoError?.propertyDeclarationDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError?.propertyDeclarationDate}</span
                        >
                    {/if}
                    <RadioSingle
                        name="isExPoliceOrSoldier"
                        disabled={!editable}
                        options={approveOptions}
                        legend={'Bekas Polis / Tentera'}
                        bind:userSelected={$personalInfoForm.isExPoliceOrSoldier}
                    />
                    {#if $personalInfoError.isExPoliceOrSoldier}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$personalInfoError.isExPoliceOrSoldier}</span
                        >
                    {/if}
                </div>

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <!-- kakitanganLKIM? -->

                    <RadioSingle
                        name="isInternalRelationship"
                        options={approveOptions}
                        {disabled}
                        legend={'Mempunyai Pertalian Dengan Kakitangan LKIM'}
                        bind:userSelected={$personalInfoForm.isInternalRelationship}
                    ></RadioSingle>
                    {#if $personalInfoForm.isInternalRelationship === true}
                        <TextField
                            {disabled}
                            hasError={!!$personalInfoError.employeeNumber}
                            name="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$personalInfoForm.employeeNumber}
                        ></TextField>
                        {#if $personalInfoError.employeeNumber}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$personalInfoError.employeeNumber}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$personalInfoError.relationshipId}
                            name="relationshipId"
                            dropdownType="label-left-full"
                            label={'Hubungan dengan Kakitangan LKIM'}
                            options={data.relationshipLookup}
                            bind:value={$personalInfoForm.relationshipId}
                        ></DropdownSelect>
                        {#if $personalInfoError.relationshipId}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$personalInfoError.relationshipId}</span
                            >
                        {/if}
                    {/if}
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
            ><TextIconButton primary label="Simpan" form="academicInfoForm">
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="academicInfoForm"
                    method="POST"
                    use:academicInfoEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <p class={stepperFormTitleClass}>UPSR / Darjah 6</p>

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primarySchool
                            ? true
                            : false}
                        name="primarySchool"
                        label={'Sekolah'}
                        type="text"
                        bind:value={$academicInfoForm.primarySchool}
                    ></TextField>

                    {#if $academicInfoErrors.primarySchool}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primarySchool}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primaryYearFinished
                            ? true
                            : false}
                        name="primaryYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.primaryYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.primaryYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primaryYearFinished}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.primaryGred
                            ? true
                            : false}
                        name="primaryGred"
                        label={'Gred'}
                        type="text"
                        bind:value={$academicInfoForm.primaryGred}
                    ></TextField>

                    {#if $academicInfoErrors.primaryGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.primaryGred}</span
                        >
                    {/if}
                    <p class={stepperFormTitleClass}>SPM/ MCE</p>

                    <TextField
                        {disabled}
                        hasError={!!$academicInfoErrors.highSchool}
                        name="highSchool"
                        label={'Sekolah'}
                        type="text"
                        bind:value={$academicInfoForm.highSchool}
                    ></TextField>

                    {#if $academicInfoErrors.highSchool}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchool}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.highSchoolYearFinished
                            ? true
                            : false}
                        name="highSchoolYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.highSchoolYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.highSchoolYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchoolYearFinished}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.highSchoolGred
                            ? true
                            : false}
                        name="highSchoolGred"
                        label={'Ijazah/ CGPA/ Gred'}
                        type="text"
                        bind:value={$academicInfoForm.highSchoolGred}
                    ></TextField>

                    {#if $academicInfoErrors.highSchoolGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.highSchoolGred}</span
                        >
                    {/if}
                    <p class={stepperFormTitleClass}>
                        Institut Pengajian Tinggi
                    </p>

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEdu
                            ? true
                            : false}
                        name="higherLevelEdu"
                        label={'IPT'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEdu}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEdu}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEdu}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduYearFinished
                            ? true
                            : false}
                        name="higherLevelEduYearFinished"
                        label={'Tahun'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduYearFinished}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduYearFinished}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduYearFinished}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduGred
                            ? true
                            : false}
                        name="higherLevelEduGred"
                        label={'CGPA/ Gred'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduGred}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduGred}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduGred}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={$academicInfoErrors.higherLevelEduCourse
                            ? true
                            : false}
                        name="higherLevelEduCourse"
                        label={'Bidang'}
                        type="text"
                        bind:value={$academicInfoForm.higherLevelEduCourse}
                    ></TextField>

                    {#if $academicInfoErrors.higherLevelEduCourse}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$academicInfoErrors.higherLevelEduCourse}</span
                        >
                    {/if}

                    <!-- <AccordianField
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
                    </AccordianField> -->
                </form>
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                        onClick={() => {}}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
                <!-- <div
                    class="w-full rounded-[3px] border border-system-primary p-2.5"
                >
                    {#each educationList as education, index (education.institution)}
                        <div class="education-form">
                            <input
                                type="text"
                                bind:value={education.institution}
                                placeholder="Institution"
                            />
                            <input
                                type="text"
                                bind:value={education.degree}
                                placeholder="Degree"
                            />
                            {#if index === educationList.length - 1}
                                <button on:click={addEducation}
                                    >Add More Education Information</button
                                >
                            {/if}
                            {console.log(educationList.length)}
                        </div>
                    {/each}
                </div> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman"
            ><TextIconButton
                primary
                label="Simpan"
                form="formStepperPengalaman"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="formStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:experienceInfoEnhance
                    method="POST"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>
                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.namaMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.namaMajikan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.alamatMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.alamatMajikan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$experienceInfoForm.jawatanPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.jawatanPengalaman}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                id="kodJawatan"
                                label={'Kod Jawatan (Jika ada)'}
                                value={item.grade}
                            ></TextField>
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$experienceInfoForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $experienceInfoErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.tempohPerkhidmatan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$experienceInfoForm.gajiPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.gajiPengalaman}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.namaMajikan
                                    ? true
                                    : false}
                                name="namaMajikan"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.namaMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.namaMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.namaMajikan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.alamatMajikan
                                    ? true
                                    : false}
                                name="alamatMajikan"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$experienceInfoForm.alamatMajikan}
                            ></TextField>
                            {#if $experienceInfoErrors.alamatMajikan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.alamatMajikan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.jawatanPengalaman
                                    ? true
                                    : false}
                                name="jawatanPengalaman"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$experienceInfoForm.jawatanPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.jawatanPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.jawatanPengalaman}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                id="kodJawatan"
                                label={'Kod Jawatan (Jika ada)'}
                                value="-"
                            ></TextField>
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.tempohPerkhidmatan
                                    ? true
                                    : false}
                                name="tempohPerkhidmatan"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$experienceInfoForm.tempohPerkhidmatan}
                            ></TextField>
                            {#if $experienceInfoErrors.tempohPerkhidmatan}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.tempohPerkhidmatan}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$experienceInfoErrors.gajiPengalaman
                                    ? true
                                    : false}
                                name="gajiPengalaman"
                                label={'Gaji'}
                                type="text"
                                bind:value={$experienceInfoForm.gajiPengalaman}
                            ></TextField>
                            {#if $experienceInfoErrors.gajiPengalaman}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$experienceInfoErrors.gajiPengalaman}</span
                                >
                            {/if}
                        {/if}
                    {/each}
                    <div class="w-full rounded-[3px] border-b border-t p-2.5">
                        <TextIconButton
                            primary
                            label="Tambah Pengalaman"
                            onClick={() => {}}
                        >
                            <SvgPlus></SvgPlus>
                        </TextIconButton>
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Kegiatan/Keahlian"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Keluarga"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Tanggungan Selain Isteri dan Anak"
            ><TextIconButton primary label="Simpan" onClick={() => {}}>
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Tanggungan Selain Isteri dan Anak"
                    onClick={() => {}}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"
            ><TextIconButton primary label="Simpan" form="formStepperWaris">
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="formStepperWaris"
                    class="flex w-full flex-col gap-2"
                    use:kinInfoEnhance
                    method="POST"
                >
                    <TextField
                        {disabled}
                        hasError={$kinInfoErrors.namaWaris ? true : false}
                        name="namaWaris"
                        label={'Nama Waris'}
                        bind:value={$kinInfoForm.namaWaris}
                    ></TextField>
                    {#if $kinInfoErrors.namaWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.namaWaris}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$kinInfoErrors.noKP ? true : false}
                        name="noKP"
                        label={'No. Kad Pengenalan'}
                        bind:value={$kinInfoForm.noKP}
                    ></TextField>
                    {#if $kinInfoErrors.noKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.noKP}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={!!$kinInfoErrors.kinBirthDate}
                        name="kinBirthDate"
                        {handleDateChange}
                        label="Tarikh Lahir"
                        bind:selectedDate={$kinInfoForm.kinBirthDate}
                    ></DateSelector>
                    {#if $kinInfoErrors.kinBirthDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.kinBirthDate}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$kinInfoErrors.hubunganWaris ? true : false}
                        name="hubunganWaris"
                        label={'Hubungan Dengan Waris'}
                        bind:value={$kinInfoForm.hubunganWaris}
                    ></TextField>
                    {#if $kinInfoErrors.hubunganWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.hubunganWaris}</span
                        >
                    {/if}
                    <DateSelector
                        {handleDateChange}
                        {disabled}
                        hasError={!!$kinInfoErrors.marriageDate}
                        name="marriageDate"
                        label={'Tarikh Kahwin (Jika berkenaan)'}
                        bind:selectedDate={$kinInfoForm.marriageDate}
                    ></DateSelector>
                    {#if $kinInfoErrors.marriageDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.marriageDate}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$kinInfoErrors.warnaKP ? true : false}
                        name="warnaKP"
                        label={'Warna Kad Pengenalan'}
                        bind:value={$kinInfoForm.warnaKP}
                    ></TextField>
                    {#if $kinInfoErrors.warnaKP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.warnaKP}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={$kinInfoErrors.telephoneH ? true : false}
                        name="telephoneH"
                        label={'Telefon (R)'}
                        bind:value={$kinInfoForm.telephoneH}
                    ></TextField>
                    {#if $kinInfoErrors.telephoneH}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.telephoneH}</span
                        >
                    {/if}
                    <TextField
                        hasError={$kinInfoErrors.telephoneP ? true : false}
                        {disabled}
                        name="telephoneP"
                        label={'Telefon (P)'}
                        bind:value={$kinInfoForm.telephoneP}
                    ></TextField>
                    {#if $kinInfoErrors.telephoneP}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.telephoneP}</span
                        >
                    {/if}
                    <TextField
                        hasError={$kinInfoErrors.pekerjaanWaris ? true : false}
                        {disabled}
                        id="pekerjaanWaris"
                        label={'Pekerjaan'}
                        bind:value={$kinInfoForm.pekerjaanWaris}
                    ></TextField>
                    {#if $kinInfoErrors.pekerjaanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.pekerjaanWaris}</span
                        >
                    {/if}
                    <TextField
                        hasError={$kinInfoErrors.namaMajikanWaris
                            ? true
                            : false}
                        {disabled}
                        id="namaMajikanWaris"
                        label={'Nama Majikan'}
                        bind:value={$kinInfoForm.namaMajikanWaris}
                    ></TextField>
                    {#if $kinInfoErrors.namaMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.namaMajikanWaris}</span
                        >
                    {/if}
                    <LongTextField
                        hasError={$kinInfoErrors.alamatMajikanWaris
                            ? true
                            : false}
                        {disabled}
                        id="alamatMajikanWaris"
                        label={'Alamat Majikan'}
                        bind:value={$kinInfoForm.alamatMajikanWaris}
                    ></LongTextField>
                    {#if $kinInfoErrors.alamatMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$kinInfoErrors.alamatMajikanWaris}</span
                        >
                    {/if}
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    submitFilesForm();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm">
                    Sila muat turun, isi dengan lengkap dokumen berikut,
                    kemudian muat naik dokumen pada ruangan yang disediakan.
                </p>

                <ul
                    class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                >
                    <li>Surat Setuju Terima Tawaran</li>
                    <li>Surat Sumpah Bukan Penagih Dadah</li>
                    <li>Akuan Berkanun</li>
                    <li>Surat Aku Janji</li>
                    <li>Borang Perubatan</li>
                    <li>
                        Perkuan Untuk Ditandatangani Oleh Penjawat Awam
                        Berkenaan Dengan Akta Rahsia Rasmi, 1972
                    </li>
                </ul>
                <!-- Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda -->
                <div class="flex w-full flex-col"></div>
                <SectionHeader
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div class="w-full">
                    {#if errorData?.uploadedFiles}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{errorData?.uploadedFiles[0]}</span
                        >
                    {/if}
                </div>
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
                            Pilih fail dari peranti anda.
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

<!-- content header starts here -->
<!-- <section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Semak Maklumat Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Baru. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
    </ContentHeader>
</section> -->
