<script lang="ts">
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
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
    import { mockLookupGrades } from '$lib/mocks/database/mockLoopkupGrades';
    import { mockLookupPositions } from '$lib/mocks/database/mockLookupPositions';
    import { mockEmploymentPositionHistories } from '$lib/mocks/database/employmentPositionHistories';
    import { mockEmploymentPensions } from '$lib/mocks/database/mockEmploymentPensions';
    import { mockEmployeeEducations } from '$lib/mocks/database/mockEmployeeEducations';
    import { mockEmployeeExperience } from '$lib/mocks/database/mockEmployeeExperience';
    import { mockEmployeeDocumentLists } from '$lib/mocks/database/mockEmployeeDocumentLists';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Modal } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from '../$types';
    import { writable } from 'svelte/store';
    import { Checkbox } from 'flowbite-svelte';
    import {
        getErrorToast,
        getSuccessToast,
    } from '$lib/services/core/toast/toast-service';
    import {
        _submitAddMoreAcademicForm,
        _addAcademicInfoSchema,
        _addExperienceModalSchema,
        _addActivityModalSchema,
        _addFamilyModalSchema,
        _addNonFamilyModalSchema,
        _addNextOfKinInfoSchema,
        _stepperMaklumatPeribadi,
        _submitFormStepperMaklumatPeribadi,
        _stepperMaklumatPerkhidmatan,
        _submitFormStepperMaklumatPerkhidmatan,
        _stepperMaklumatAkademik,
        _submitFormStepperMaklumatAkademik,
        _stepperMaklumatPengalaman,
        _submitFormStepperMaklumatPengalaman,
        _stepperMaklumatWaris,
        _submitFormStepperMaklumatWaris,
        _submitAddExperienceModal,
    } from '../+page';
    import StepperNextStep from '$lib/components/stepper-conditional-rules/StepperNextStep.svelte';

    export let disabled: boolean = true;
    export let data: PageData;
    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    let tempExperienceRecord: any[] = [];
    let tempActivityRecord: any[] = [];
    let tempFamilyRecord: any[] = [];
    let tempNextOfKinRecord: any[] = [];
    let tempNonFamilyRecord: any[] = [];
    const isSuccessPersonalFormResponse = writable<boolean>();
    const isReadonlyPersonalFormStepper = writable<boolean>();
    const isSuccessAcademicFormResponse = writable<boolean>();
    const isReadonlyAcademicFormStepper = writable<boolean>();
    const isSuccessExperienceFormResponse = writable<boolean>();
    const isReadonlyExperienceFormStepper = writable<boolean>();
    const isSuccessActivityFormResponse = writable<boolean>();
    const isReadonlyActivityFormStepper = writable<boolean>();
    const isSuccessFamilyFormResponse = writable<boolean>();
    const isReadonlyFamilyFormStepper = writable<boolean>();
    const isSuccessDependencyFormResponse = writable<boolean>();
    const isReadonlyDependencyFormStepper = writable<boolean>();
    const isSuccessNextOfKinFormResponse = writable<boolean>();
    const isReadonlyNextOfKinFormStepper = writable<boolean>();
    const isSuccessDocumentFormResponse = writable<boolean>();
    const isReadonlyDocumentFormStepper = writable<boolean>();
    const isSuccessServiceFormResponse = writable<boolean>();
    const isReadonlyServiceFormStepper = writable<boolean>();

    export let openAcademicInfoModal: boolean = false;

    $: {
        // isSuccessPersonalFormResponse.set(
        //     !!(
        //         data.personalDetailResponse.status >= 200 &&
        //         data.personalDetailResponse.status <= 201
        //     ),
        // );
        // isReadonlyPersonalFormStepper.set(
        //     data.personalDetailResponse?.data?.isReadonly,
        // );

        // isSuccessAcademicFormResponse.set(
        //     !!(
        //         data.academicInfoResponse.status >= 200 &&
        //         data.academicInfoResponse.status <= 201
        //     ),
        // );
        // isReadonlyAcademicFormStepper.set(
        //     data.academicInfoResponse?.data?.isReadonly,
        // );

        // isSuccessExperienceFormResponse.set(
        //     !!(
        //         data.experienceInfoResponse.status >= 200 &&
        //         data.experienceInfoResponse.status <= 201
        //     ),
        // );
        // isReadonlyExperienceFormStepper.set(
        //     data.experienceInfoResponse?.data?.isReadonly,
        // );
        // isSuccessActivityFormResponse.set(
        //     !!(
        //         data.activityInfoResponse.status >= 200 &&
        //         data.activityInfoResponse.status <= 201
        //     ),
        // );
        // isReadonlyActivityFormStepper.set(
        //     data.activityInfoResponse?.data?.isReadonly,
        // );

        // isSuccessFamilyFormResponse.set(
        //     !!(
        //         data.familyInfoResponse.status >= 200 &&
        //         data.familyInfoResponse.status <= 201
        //     ),
        // );
        // isReadonlyFamilyFormStepper.set(
        //     data.familyInfoResponse?.data?.isReadonly,
        // );

        // isSuccessDependencyFormResponse.set(
        //     data.dependencyInfoResponse.status >= 200 &&
        //         data.dependencyInfoResponse.status <= 201,
        // );
        // isReadonlyDependencyFormStepper.set(
        //     data.dependencyInfoResponse?.data?.isReadonly,
        // );

        // isSuccessNextOfKinFormResponse.set(
        //     data.nextOfKinInfoResponse.status >= 200 &&
        //         data.nextOfKinInfoResponse.status <= 201,
        // );
        // isReadonlyNextOfKinFormStepper.set(
        //     data.nextOfKinInfoResponse?.data?.isReadonly,
        // );

        // isSuccessDocumentFormResponse.set(
        //     data.documentInfoResponse.status >= 200 &&
        //         data.documentInfoResponse.status <= 201,
        // );
        // isReadonlyDocumentFormStepper.set(
        //     data.documentInfoResponse?.data?.isReadonly,
        // );

        // isSuccessServiceFormResponse.set(
        //     data.serviceResponse.status >= 200 &&
        //         data.serviceResponse.status <= 201,
        // );
        // isReadonlyServiceFormStepper.set(
        //     data.serviceResponse?.data?.isReadonly,
        // );
    }

    const {
        form,
        errors,
        enhance,
        options: stepperMaklumatPeribadiOption,
    } = superForm(data.stepperMaklumatPeribadi, {
        SPA: true,
        onSubmit() {
            console.log('check for stepepr maklumat peribadi');
            _submitFormStepperMaklumatPeribadi($form);
        },
        taintedMessage: false,
        validators: false,
    });

    const {
        form: maklumatPerkhidmatanForm,
        errors: maklumatPerkhidmatanErrors,
        enhance: maklumatPerkhidmatanEnhance,
        options: maklumatPerkhidmatanOption,
    } = superForm(data.stepperMaklumatPerkhidmatan, {
        SPA: true,
        validators: false,
        onSubmit() {
            _submitFormStepperMaklumatPerkhidmatan($maklumatPerkhidmatanForm);
        },
        taintedMessage: false,
    });
    const {
        form: maklumatAkademikForm,
        errors: maklumatAkademikErrors,
        enhance: maklumatAkademikEnhance,
    } = superForm(data.stepperMaklumatAkademik, {
        SPA: true,
        validators: _stepperMaklumatAkademik,
        onSubmit() {
            _submitFormStepperMaklumatAkademik($maklumatAkademikForm);
        },
        taintedMessage: false,
    });
    const {
        form: maklumatPengalamanForm,
        errors: maklumatPengalamanErrors,
        enhance: maklumatPengalamanEnhance,
    } = superForm(data.stepperMaklumatPengalaman, {
        SPA: true,
        validators: _stepperMaklumatPengalaman,
        onSubmit() {
            _submitFormStepperMaklumatPengalaman($maklumatPengalamanForm);
        },

        taintedMessage: false,
    });
    const {
        form: maklumatWarisForm,
        errors: maklumatWarisErrors,
        enhance: maklumatWarisEnhance,
    } = superForm(data.stepperMaklumatWaris, {
        SPA: true,
        validators: _stepperMaklumatWaris,
        onSubmit() {
            _submitFormStepperMaklumatWaris($maklumatWarisForm);
        },
        taintedMessage: false,
    });
    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        validators: _addAcademicInfoSchema,
        async onSubmit() {
            await superValidate(
                $addAcademicInfoModal,
                _addAcademicInfoSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempAcademicRecord = [...tempAcademicRecord, response.data];
                    openAcademicInfoModal = false;
                }
            });
        },
    });

    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        validators: _addExperienceModalSchema,
        async onSubmit() {
            await superValidate(
                $addExperienceModalForm,
                _addExperienceModalSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempExperienceRecord = [
                        ...tempExperienceRecord,
                        response.data,
                    ];
                    openExperienceInfoModal = false;
                }
            });
        },
    });

    const {
        form: addActivityModal,
        errors: addActivityModalErrors,
        enhance: addActivityModalEnhance,
    } = superForm(data.addActivityModal, {
        SPA: true,
        validators: _addActivityModalSchema,
        async onSubmit() {
            await superValidate(
                $addActivityModal,
                _addActivityModalSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempActivityRecord = [...tempActivityRecord, response.data];
                    openMembershipInfoModal = false;
                }
            });
        },
    });

    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        SPA: true,
        validators: _addNonFamilyModalSchema,
        async onSubmit() {
            await superValidate(
                $addNonFamilyModal,
                _addNonFamilyModalSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempNonFamilyRecord = [
                        ...tempNonFamilyRecord,
                        response.data,
                    ];
                    openNonFamilyInfoModal = false;
                }
            });
        },
    });

    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        validators: _addFamilyModalSchema,
        async onSubmit() {
            await superValidate($addFamilyModal, _addFamilyModalSchema).then(
                (response) => {
                    if (!response.valid) {
                        getErrorToast();
                    } else {
                        tempFamilyRecord = [...tempFamilyRecord, response.data];
                        openFamilyInfoModal = false;
                    }
                },
            );
        },
    });
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        SPA: true,
        validators: _addNextOfKinInfoSchema,
        async onSubmit() {
            await superValidate(
                $addNextOfKinModal,
                _addNextOfKinInfoSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempNextOfKinRecord = [
                        ...tempNextOfKinRecord,
                        response.data,
                    ];
                    openNextOfKinInfoModal = false;
                }
            });
        },
    });

    if (disabled) {
        stepperMaklumatPeribadiOption.validators = _stepperMaklumatPeribadi;
        stepperMaklumatPeribadiOption.taintedMessage =
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini-1?';
        maklumatPerkhidmatanOption.taintedMessage =
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini-1?';
        maklumatPerkhidmatanOption.validators = _stepperMaklumatPerkhidmatan;
    }

    export let employeeNumber: string = '00001';

    let editable: boolean = true;

    const approveOptions: RadioOption[] = [
        {
            value: true,
            label: 'LULUS',
        },
        {
            value: false,
            label: 'TIDAK LULUS',
        },
    ];

    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;

    let currentEmployeeSpouse = mockEmployeePartners.find((spouse) => {
        return spouse.employeeId === currentEmployee.id;
    })!;
    let currentEmployeeSpouseEmployeeInfo = mockEmployees.find((employee) => {
        return employee.name === currentEmployeeSpouse.name;
    });
    let currentEmployeeService = mockCurrentService.find((service) => {
        return service.employeeId === currentEmployee.id;
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

    let currentEmployeeUploadedDocuments = mockEmployeeDocumentLists.filter(
        (document) => {
            return document.employeeId === currentEmployee.id;
        },
    )!;

    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================
    let errorData: any;
    let tempAcademicRecord: any[] = [];

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
    //true
    let isInRelationshipWithLKIMStaff =
        currentEmployeeSpouse.isLKIMStaff == 'Ya' ? 'true' : 'false';
    let isKWSP = currentEmployeePensions.type == 'KWSP' ? 'true' : 'false';

    // Radio Functions

    let radioChosen: string = '';
    const faedahPersaraanOptions: RadioOption[] = [
        {
            value: true,
            label: 'KWSP',
        },
        {
            value: false,
            label: 'Pencen',
        },
    ];
    const options: RadioOption[] = [
        {
            value: true,
            label: 'Ya',
        },
        {
            value: false,
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

    $: if (!$form.isRelatedToLKIM) {
        $form.noPekerjaPasangan = undefined;
        $form.namaPasangan = undefined;
        $form.jawatanPasangan = undefined;
        $form.hubungan = undefined;
    }
</script>

<Stepper>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPeribadi"
                />
            {:else}
                <StepperNextStep />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="FormStepperMaklumatPeribadi"
                class="flex w-full flex-col gap-2"
                use:enhance
                method="POST"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    {disabled}
                    hasError={!!$errors.employeeNumber}
                    name="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={$form.employeeNumber}
                ></TextField>

                {#if $errors.employeeNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.employeeNumber}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.statusPekerjaan}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    label="Status Pekerjaan"
                    bind:value={$form.statusPekerjaan}
                    options={[
                        { value: '1', name: 'Aktif' },
                        { value: '2', name: 'Tidak Aktif' },
                    ]}
                ></DropdownSelect>
                {#if $errors.statusPekerjaan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.statusPekerjaan}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.identityCardNumber}
                    name="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.identityCardNumber}
                ></TextField>

                {#if $errors.identityCardNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityCardNumber}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.fullName}
                    name="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.fullName}
                ></TextField>

                {#if $errors.fullName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.fullName}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.alternativeName}
                    name="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:value={$form.alternativeName}
                ></TextField>

                {#if $errors.alternativeName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.alternativeName}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.icColour}
                    dropdownType="label-left-full"
                    id="icColour"
                    name="icColour"
                    label="Warna Kad Pengenalan"
                    bind:value={$form.icColour}
                    options={data.identityCardColorLookup}
                ></DropdownSelect>
                {#if $errors.icColour}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.icColour}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={!!$errors.birthDate}
                    name="birthDate"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={$form.birthDate}
                ></DateSelector>
                {#if $errors?.birthDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.birthDate}</span
                    >
                {/if}
                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.birthplace}
                    dropdownType="label-left-full"
                    id="birthplace"
                    name="birthplace"
                    label="Tempat Lahir"
                    bind:value={$form.birthplace}
                    options={data.stateLookup}
                ></DropdownSelect>
                {#if $errors.birthplace}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthplace}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.nationality}
                    dropdownType="label-left-full"
                    id="nationality"
                    name="nationality"
                    label="Warganegara"
                    bind:value={$form.nationality}
                    options={data.nationalityLookup}
                ></DropdownSelect>
                {#if $errors.nationality}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.nationality}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.race}
                    dropdownType="label-left-full"
                    id="race"
                    name="race"
                    label="Bangsa"
                    bind:value={$form.race}
                    options={data.raceLookup}
                ></DropdownSelect>
                {#if $errors.race}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.race}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.ethnic}
                    dropdownType="label-left-full"
                    id="ethnic"
                    label="Etnik"
                    bind:value={$form.ethnic}
                    options={data.ethnicityLookup}
                ></DropdownSelect>
                {#if $errors.ethnic}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.ethnic}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.religion}
                    dropdownType="label-left-full"
                    id="religion"
                    label="Agama"
                    bind:value={$form.religion}
                    options={data.religionLookup}
                ></DropdownSelect>
                {#if $errors.religion}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.religion}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.gender}
                    dropdownType="label-left-full"
                    id="gender"
                    name="gender"
                    label="Jantina"
                    bind:value={$form.gender}
                    options={data.genderLookup}
                ></DropdownSelect>
                {#if $errors.gender}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.gender}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.marital}
                    dropdownType="label-left-full"
                    id="marital"
                    label="Status"
                    bind:value={$form.marital}
                    options={data.maritalLookup}
                ></DropdownSelect>
                {#if $errors.marital}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.marital}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.email}
                    name="email"
                    label={'Emel'}
                    type="text"
                    bind:value={$form.email}
                ></TextField>

                {#if $errors?.email}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.email}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.homeAddress}
                    {disabled}
                    name="homeAddress"
                    label="Alamat Rumah"
                    bind:value={$form.homeAddress}
                />
                {#if $errors.homeAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeAddress}</span
                    >
                {/if}



                <LongTextField
                    hasError={!!$errors.mailAddress}
                    {disabled}
                    name="mailAddress"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:value={$form.mailAddress}
                />
                {#if $errors.mailAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailAddress}</span
                    >
                {/if}

                <TextField
                    hasError={!!$errors.houseLoanType}
                    {disabled}
                    name="houseLoanType"
                    label={'Perumahan'}
                    type="text"
                    bind:value={$form.houseLoanType}
                ></TextField>
                {#if $errors.houseLoanType}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.houseLoanType}</span
                    >
                {/if}
                <TextField
                    hasError={!!$errors.houseLoan}
                    {disabled}
                    name="houseLoan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    bind:value={$form.houseLoan}
                ></TextField>
                {#if $errors.houseLoan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.houseLoan}</span
                    >
                {/if}

                <RadioSingle
                    name="isExPolice"
                    disabled={!editable}
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.isExPolice}
                ></RadioSingle>
                {#if $errors.isExPolice}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isExPolice}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isRelatedToLKIM"
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isRelatedToLKIM}
                    ></RadioSingle>

                    {#if $form.isRelatedToLKIM}
                        <TextField
                            {disabled}
                            hasError={!!$errors.noPekerjaPasangan}
                            name="noPekerjaPasangan"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$form.noPekerjaPasangan}
                        ></TextField>

                        {#if $errors.noPekerjaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.noPekerjaPasangan}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={!!$errors.namaPasangan}
                            name="namaPasangan"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={$form.namaPasangan}
                        ></TextField>

                        {#if $errors.namaPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.namaPasangan}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.jawatanPasangan}
                            dropdownType="label-left-full"
                            id="jawatanPasangan"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.jawatanPasangan}
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.jawatanPasangan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.jawatanPasangan}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.hubungan}
                            dropdownType="label-left-full"
                            id="hubungan"
                            label="Hubungan"
                            bind:value={$form.hubungan}
                            options={data.relationshipLookup}
                        ></DropdownSelect>
                        {#if $errors.hubungan}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.hubungan}</span
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
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPerkhidmatan"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperMaklumatPerkhidmatan"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPerkhidmatanEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>

                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.currentGrade}
                        dropdownType="label-left-full"
                        id="currentGrade"
                        label="Gred Semasa"
                        bind:value={$maklumatPerkhidmatanForm.currentGrade}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.currentGrade}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.currentGrade}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.currentPosition}
                        dropdownType="label-left-full"
                        id="currentPosition"
                        label="Jawatan"
                        bind:value={$maklumatPerkhidmatanForm.currentPosition}
                        options={[
                            { value: '1', name: '41' },
                            { value: '2', name: '54' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.currentPosition}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.currentPosition}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.placement}
                        dropdownType="label-left-full"
                        id="placement"
                        label="Penempatan"
                        bind:value={$maklumatPerkhidmatanForm.placement}
                        options={[
                            { value: '1', name: 'Kuala Lumpur' },
                            { value: '2', name: 'Sarawak' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.placement}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.placement}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.serviceType}
                        dropdownType="label-left-full"
                        id="tarafPerkhidmatan"
                        label="Taraf Perkhidmatan"
                        bind:value={$maklumatPerkhidmatanForm.serviceType}
                        options={[
                            { value: '1', name: 'TETAP' },
                            { value: '2', name: 'SEMENTARA' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.serviceType}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.serviceType}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.effectiveDate}
                        name="effectiveDate"
                        handleDateChange
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:selectedDate={$maklumatPerkhidmatanForm.effectiveDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.effectiveDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.effectiveDate}</span
                        >
                    {/if}

                    <RadioSingle
                        {disabled}
                        options={faedahPersaraanOptions}
                        name="retirementBenefit"
                        legend={'Faedah Persaraan'}
                        bind:userSelected={$maklumatPerkhidmatanForm.retirementBenefit}
                    ></RadioSingle>
                    {#if $maklumatPerkhidmatanErrors.retirementBenefit}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.retirementBenefit}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.EPFNumber}
                        name="EPFNumber"
                        label={'No. KWSP'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.EPFNumber}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.EPFNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.EPFNumber}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.SOCSO}
                        name="SOCSO"
                        label={'No. SOCSO'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.SOCSO}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.SOCSO}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.SOCSO}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.taxIncome}
                        name="taxIncome"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.taxIncome}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.taxIncome}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.taxIncome}</span
                        >
                    {/if}
                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.bankName}
                        name="bankName"
                        label={'Bank'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.bankName}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.bankName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.bankName}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.accountNumber}
                        name="accountNumber"
                        label={'No.Akaun'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.accountNumber}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.accountNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.accountNumber}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        name="program"
                        label={'Program'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.program}
                        ></TextField>
                        {#if $maklumatPerkhidmatanErrors.program}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.program}</span
                        >
                    {/if}


                    <TextField
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.eligibleLeaveCount}
                        name="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.eligibleLeaveCount}
                    ></TextField>

                    {#if $maklumatPerkhidmatanErrors.eligibleLeaveCount}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.eligibleLeaveCount}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.civilServiceStartDate}
                        name="mulaDilantikPerkhidmatanKerajaan"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:selectedDate={$maklumatPerkhidmatanForm.civilServiceStartDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.civilServiceStartDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.civilServiceStartDate}</span
                        >
                    {/if}
                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.firstEffectiveDate}
                        name="firstEffectiveDate"
                        handleDateChange
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:selectedDate={$maklumatPerkhidmatanForm.firstEffectiveDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.firstEffectiveDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.firstEffectiveDate}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.confirmServiceDate}
                        name="confirmServiceDate"
                        handleDateChange
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:selectedDate={$maklumatPerkhidmatanForm.confirmServiceDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.confirmServiceDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.confirmServiceDate}</span
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
                        hasError={!!$maklumatPerkhidmatanErrors.pastAttachmentDate}
                        name="pastAttachmentDate"
                        handleDateChange
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:selectedDate={$maklumatPerkhidmatanForm.pastAttachmentDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.pastAttachmentDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.pastAttachmentDate}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.actingDate}
                        name="actingDate"
                        handleDateChange
                        label="Pemangkuan Sekarang"
                        bind:selectedDate={$maklumatPerkhidmatanForm.actingDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.actingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.actingDate}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.interimDate}
                        name="interimDate"
                        handleDateChange
                        label="Tanggung Kerja Sekarang"
                        bind:selectedDate={$maklumatPerkhidmatanForm.interimDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.interimDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.interimDate}</span
                        >
                    {/if}

                    <TextField
                        {disabled}
                        name="pensionScheme"
                        label={'Skim Pencen'}
                        type="text"
                        bind:value={$maklumatPerkhidmatanForm.pensionScheme}
                        ></TextField>
                        {#if $maklumatPerkhidmatanErrors.pensionScheme}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPerkhidmatanErrors.pensionScheme}</span
                            >
                        {/if}
                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.lastSalaryRaiseDate}
                        name="lastSalaryRaiseDate"
                        handleDateChange
                        label="Kenaikan Gaji Akhir"
                        bind:selectedDate={$maklumatPerkhidmatanForm.lastSalaryRaiseDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.lastSalaryRaiseDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.lastSalaryRaiseDate}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.lastPromotionDate}
                        name="lastPromotionDate"
                        handleDateChange
                        label="Kenaikan Pangkat Akhir"
                        bind:selectedDate={$maklumatPerkhidmatanForm.lastPromotionDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.lastPromotionDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.lastPromotionDate}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.salaryMovementMonth}
                        dropdownType="label-left-full"
                        id="salaryMovementMonth"
                        label="Bulan KGT"
                        bind:value={$maklumatPerkhidmatanForm.salaryMovementMonth}
                        options={[
                            { value: '1', name: 'Januari' },
                            { value: '2', name: 'Februari' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatPerkhidmatanErrors.salaryMovementMonth}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.salaryMovementMonth}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatPerkhidmatanErrors.retirementDate}
                        name="retirementDate"
                        handleDateChange
                        label="Tarikh Bersara"
                        bind:selectedDate={$maklumatPerkhidmatanForm.retirementDate}
                    ></DateSelector>
                    {#if $maklumatPerkhidmatanErrors.retirementDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatPerkhidmatanErrors.retirementDate}</span
                        >
                    {/if}

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasError={!!$maklumatPerkhidmatanErrors.salaryEffectiveDate}
                                name="salaryEffectiveDate"
                                label={'Tarikh Berkuatkuasa'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.salaryEffectiveDate}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.salaryEffectiveDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.salaryEffectiveDate}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={!!$maklumatPerkhidmatanErrors.maximumSalary}
                                name="tanggaGaji"
                                label={'Tangga Gaji'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.maximumSalary}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.maximumSalary}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.maximumSalary}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={!!$maklumatPerkhidmatanErrors.baseSalary}
                                name="baseSalary"
                                label={'Gaji Pokok'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.baseSalary}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.baseSalary}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.baseSalary}</span
                                >
                            {/if}
                        </div>

                        <div class="space-y-2.5">
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itka"
                                hasError={!!$maklumatPerkhidmatanErrors.ITKA}
                                name="ITKA"
                                label={'ITKA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.ITKA}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.ITKA}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.ITKA}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-itp"
                                hasError={!!$maklumatPerkhidmatanErrors.ITP}
                                name="ITP"
                                label={'ITP'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.ITP}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.ITP}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.ITP}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-epw"
                                hasError={!!$maklumatPerkhidmatanErrors.EPW}
                                name="EPW"
                                label={'EPW'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.EPW}
                            ></TextField>

                            {#if $maklumatPerkhidmatanErrors.EPW}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.EPW}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasTooltip={true}
                                toolTipID="type-cola"
                                hasError={!!$maklumatPerkhidmatanErrors.COLA}
                                name="COLA"
                                label={'COLA'}
                                type="text"
                                bind:value={$maklumatPerkhidmatanForm.COLA}
                            ></TextField>
                            {#if $maklumatPerkhidmatanErrors.COLA}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPerkhidmatanErrors.COLA}</span
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
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperAkademik"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#if tempAcademicRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempAcademicRecord as academic, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Akademik - {academic.type}
                                </p>
                            </div>
                            <!-- <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Jenis Akademik:
                                    </span>
                                    {academic.type}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Nama Kelulusan/Sijil:
                                    </span>
                                    {academic.name}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Tahun Kelulusan/Sijil:
                                    </span>
                                    {academic.completionYear}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Gred:
                                    </span>
                                    {academic.finalGrade}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Bidang:
                                    </span>
                                    {academic.field}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Catatan:
                                    </span>
                                    {academic.remark}
                                </li>
                            </ul> -->
                            <DropdownSelect
                                disabled
                                name="majorId"
                                dropdownType="label-left-full"
                                label={'Jenis Jurusan'}
                                options={data.majorMinorLookup}
                                bind:value={academic.majorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="minorId"
                                dropdownType="label-left-full"
                                label={'Jenis Khusus'}
                                options={data.majorMinorLookup}
                                bind:value={academic.minorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="countryId"
                                dropdownType="label-left-full"
                                label={'Negara'}
                                options={data.countryLookup}
                                bind:value={academic.countryId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="institutionId"
                                dropdownType="label-left-full"
                                label={'Institusi'}
                                options={data.institutionLookup}
                                bind:value={academic.institutionId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="educationLevelId"
                                dropdownType="label-left-full"
                                label={'Taraf Pembelajaran'}
                                options={data.educationLookup}
                                bind:value={academic.educationLevelId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="sponsorshipId"
                                dropdownType="label-left-full"
                                label={'Penajaan'}
                                options={data.sponsorshipLookup}
                                bind:value={academic.sponsorshipId}
                            ></DropdownSelect>

                            <TextField
                                disabled
                                name="name"
                                label={'Nama Kelulusan/Sijil'}
                                type="text"
                                bind:value={academic.name}
                            ></TextField>

                            <TextField
                                disabled
                                name="completionDate"
                                label={'Tahun Kelulusan'}
                                type="text"
                                bind:value={academic.completionDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="finalGrade"
                                label={'Gred Akhir'}
                                type="text"
                                bind:value={academic.finalGrade}
                            ></TextField>

                            <TextField
                                disabled
                                name="field"
                                label={'Catatan'}
                                type="text"
                                bind:value={academic.field}
                            ></TextField>
                        {/each}
                    </div>
                {/if}
                <form
                    id="FormStepperAkademik"
                    class="flex w-full flex-col gap-2"
                    use:maklumatAkademikEnhance
                    method="POST"
                >
                    {#each mockEmployeeEducations as item, i (i)}
                        <div class="mb-5 mt-2.5 text-sm text-system-primary">
                            <p>Maklumat Akademik #{i + 1}</p>
                        </div>
                        <p class={stepperFormTitleClass}>UPSR / Darjah 6</p>

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.primarySchool
                                ? true
                                : false}
                            name="primarySchool"
                            label={'Sekolah'}
                            type="text"
                            bind:value={$maklumatAkademikForm.primarySchool}
                        ></TextField>

                        {#if $maklumatAkademikErrors.primarySchool}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.primarySchool}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.primaryYearFinished
                                ? true
                                : false}
                            name="primaryYearFinished"
                            label={'Tahun'}
                            type="text"
                            bind:value={$maklumatAkademikForm.primaryYearFinished}
                        ></TextField>

                        {#if $maklumatAkademikErrors.primaryYearFinished}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.primaryYearFinished}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.primaryGred
                                ? true
                                : false}
                            name="primaryGred"
                            label={'Gred'}
                            type="text"
                            bind:value={$maklumatAkademikForm.primaryGred}
                        ></TextField>

                        {#if $maklumatAkademikErrors.primaryGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.primaryGred}</span
                            >
                        {/if}
                        <p class={stepperFormTitleClass}>SPM/ MCE</p>

                        <TextField
                            {disabled}
                            hasError={!!$maklumatAkademikErrors.highSchool}
                            name="highSchool"
                            label={'Sekolah'}
                            type="text"
                            bind:value={$maklumatAkademikForm.highSchool}
                        ></TextField>

                        {#if $maklumatAkademikErrors.highSchool}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.highSchool}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.highSchoolYearFinished
                                ? true
                                : false}
                            name="highSchoolYearFinished"
                            label={'Tahun'}
                            type="text"
                            bind:value={$maklumatAkademikForm.highSchoolYearFinished}
                        ></TextField>

                        {#if $maklumatAkademikErrors.highSchoolYearFinished}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.highSchoolYearFinished}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.highSchoolGred
                                ? true
                                : false}
                            name="highSchoolGred"
                            label={'Ijazah/ CGPA/ Gred'}
                            type="text"
                            bind:value={$maklumatAkademikForm.highSchoolGred}
                        ></TextField>

                        {#if $maklumatAkademikErrors.highSchoolGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.highSchoolGred}</span
                            >
                        {/if}
                        <p class={stepperFormTitleClass}>
                            Institut Pengajian Tinggi
                        </p>

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.higherLevelEdu
                                ? true
                                : false}
                            name="higherLevelEdu"
                            label={'IPT'}
                            type="text"
                            bind:value={$maklumatAkademikForm.higherLevelEdu}
                        ></TextField>

                        {#if $maklumatAkademikErrors.higherLevelEdu}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.higherLevelEdu}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.higherLevelEduYearFinished
                                ? true
                                : false}
                            name="higherLevelEduYearFinished"
                            label={'Tahun'}
                            type="text"
                            bind:value={$maklumatAkademikForm.higherLevelEduYearFinished}
                        ></TextField>

                        {#if $maklumatAkademikErrors.higherLevelEduYearFinished}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.higherLevelEduYearFinished}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.higherLevelEduGred
                                ? true
                                : false}
                            name="higherLevelEduGred"
                            label={'CGPA/ Gred'}
                            type="text"
                            bind:value={$maklumatAkademikForm.higherLevelEduGred}
                        ></TextField>

                        {#if $maklumatAkademikErrors.higherLevelEduGred}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.higherLevelEduGred}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$maklumatAkademikErrors.higherLevelEduCourse
                                ? true
                                : false}
                            name="higherLevelEduCourse"
                            label={'Bidang'}
                            type="text"
                            bind:value={$maklumatAkademikForm.higherLevelEduCourse}
                        ></TextField>

                        {#if $maklumatAkademikErrors.higherLevelEduCourse}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors.higherLevelEduCourse}</span
                            >
                        {/if}
                    {/each}
                </form>
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                        onClick={() => (openAcademicInfoModal = true)}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperPengalaman"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#if tempExperienceRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempExperienceRecord as experience, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Pengalaman - {experience.addCompany}
                                </p>
                            </div>
                            <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Nama Majikan:
                                    </span>
                                    {experience.addCompany}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Alamat Majikan:
                                    </span>
                                    {experience.addAddress}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Jawatan:
                                    </span>
                                    {experience.addPosition}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Kod Jawatan (jika ada):
                                    </span>
                                    {experience.addPositionCode}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Dari (tahun):
                                    </span>
                                    {experience.addStartDate}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Hingga (tahun):
                                    </span>
                                    {experience.addEndDate}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Gaji:
                                    </span>
                                    {experience.addSalary}
                                </li>
                            </ul>
                        {/each}
                    </div>
                {/if}
                <form
                    id="FormStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPengalamanEnhance
                    method="POST"
                >
                    {#each currentEmployeeExperience as item, i}
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>

                        {#if item.company !== '-'}
                            <TextField
                                {disabled}
                                hasError={!!$maklumatPengalamanErrors.company}
                                name="company"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.company}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.company}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.company}</span
                                >
                            {/if}


                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.address
                                    ? true
                                    : false}
                                name="address"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.address}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.address}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.address}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.position
                                    ? true
                                    : false}
                                name="position"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.position}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.position}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.position}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                name="positionCode"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.positionCode}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.positionCode}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.positionCode}</span
                                >
                            {/if}
                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.duration
                                    ? true
                                    : false}
                                name="duration"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.duration}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.duration}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.duration}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.salary
                                    ? true
                                    : false}
                                name="salary"
                                label={'Gaji'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.salary}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.salary}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.salary}</span
                                >
                            {/if}
                        {:else}
                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.company
                                    ? true
                                    : false}
                                name="company"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.company}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.company}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.company}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.address
                                    ? true
                                    : false}
                                name="address"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.address}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.address}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.address}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.position
                                    ? true
                                    : false}
                                name="position"
                                label={'Jawatan'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.position}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.position}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.position}</span
                                >
                            {/if}

                            <TextField
                            {disabled}
                            name="positionCode"
                            label={'Kod Jawatan (jika ada)'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.positionCode}
                        ></TextField>
                        {#if $maklumatPengalamanErrors.positionCode}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.positionCode}</span
                            >
                        {/if}
                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.duration
                                    ? true
                                    : false}
                                name="duration"
                                label={'Tempoh Perkhidmatan (tahun)'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.duration}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.duration}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.duration}</span
                                >
                            {/if}

                            <TextField
                                {disabled}
                                hasError={$maklumatPengalamanErrors.salary
                                    ? true
                                    : false}
                                name="salary"
                                label={'Gaji'}
                                type="text"
                                bind:value={$maklumatPengalamanForm.salary}
                            ></TextField>
                            {#if $maklumatPengalamanErrors.salary}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$maklumatPengalamanErrors.salary}</span
                                >
                            {/if}
                        {/if}
                    {/each}

                    {#each currentEmployeeExperience as item, i}
                    <!-- {#each data.experienceInfoResponse.data.experienceList as record, i} -->
                    <div class="space-y-2.5 rounded-[3px] border p-2.5">
                        <p class={stepperFormTitleClass}>
                            Maklumat Pengalaman #{i + 1}
                        </p>
                        <TextField
                            disabled
                            name="company"
                            label={'Nama Majikan'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.company}
                        ></TextField>

                        <TextField
                            disabled
                            name="address"
                            label={'Alamat Majikan'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.address}
                        ></TextField>

                        <TextField
                            disabled
                            name="position"
                            label={'Jawatan'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.position}
                        ></TextField>

                        <TextField
                            disabled
                            name="positionCode"
                            label={'Kod Jawatan (jika ada)'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.positionCode}
                        ></TextField>

                        <TextField
                            disabled
                            name="startDate"
                            label={'Dari (tahun)'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.startDate}
                        ></TextField>

                        <TextField
                            disabled
                            name="endDate"
                            label={'Hingga (tahun)'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.endDate}
                        ></TextField>

                        <TextField
                            disabled
                            name="salary"
                            label={'Gaji'}
                            type="text"
                            bind:value={$maklumatPengalamanForm.salary}
                        ></TextField>
                    </div>
                {/each}
                </form>
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        primary
                        label="Tambah Pengalaman"
                        onClick={() => {
                            openExperienceInfoModal = true;
                        }}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
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
                {#if tempActivityRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempActivityRecord as activity, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Kegiatan/Keahlian - {activity.addName}
                                </p>
                            </div>
                            <!-- <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Nama Majikan:
                                    </span>
                                    {activity.addName}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Alamat Majikan:
                                    </span>
                                    {activity.addJoinDate}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Jawatan:
                                    </span>
                                    {activity.addPosition}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Kod Jawatan (jika ada):
                                    </span>
                                    {activity.addDescription}
                                </li>
                            </ul> -->
                        {/each}
                    </div>
                {/if}
                <DynamicTable tableItems={maklumatKegiatanTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Kegiatan/Keahlian"
                    onClick={() => {
                        openMembershipInfoModal = true;
                    }}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if tempFamilyRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempFamilyRecord as family, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Keluarga - {family.addName}
                                </p>
                            </div>
                            <!-- <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Nama:
                                    </span>
                                    {family.addName}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        No. Kad Pengenalan:
                                    </span>
                                    {family.addIdentityDocumentNumber}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Jantina:
                                    </span>
                                    {family.addGender}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Hubungan:
                                    </span>
                                    {family.addRelationship}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Pekerjaan (Jika Ada):
                                    </span>
                                    {family.addOccupation ?? ''}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Bersekolah:
                                    </span>
                                    {family.addIsInSchool ? 'Ya' : 'Tidak'}
                                </li>
                            </ul> -->
                        {/each}
                    </div>
                {/if}
                <DynamicTable tableItems={maklumatKeluargaTable}></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Maklumat Keluarga"
                    onClick={() => {
                        openFamilyInfoModal = true;
                    }}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Isteri dan Anak"
        >
            <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if tempNonFamilyRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempNonFamilyRecord as nonFamily, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Selain Suami/Isteri dan
                                    Anak - {nonFamily.addNonFamilyName}
                                </p>
                            </div>
                            <!-- <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Nama:
                                    </span>
                                    {nonFamily.addNonFamilyName}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        No. Kad Pengenalan:
                                    </span>
                                    {nonFamily.addNonFamilyIdentityDocumentNumber}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Jantina:
                                    </span>
                                    {nonFamily.addNonFamilyGender}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Hubungan:
                                    </span>
                                    {nonFamily.addNonFamilyRelationship}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Pekerjaan (Jika Ada):
                                    </span>
                                    {nonFamily.addNonFamilyOccupation ?? ''}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Bersekolah:
                                    </span>
                                    {nonFamily.addNonFamilyIsInSchool
                                        ? 'Ya'
                                        : 'Tidak'}
                                </li>
                            </ul> -->
                        {/each}
                    </div>
                {/if}
                <DynamicTable tableItems={maklumatTanggunganLain}
                ></DynamicTable>
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Tanggungan Selain Isteri dan Anak"
                    onClick={() => {
                        openNonFamilyInfoModal = true;
                    }}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperWaris"
                />
            {/if}
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperWaris"
                    class="flex w-full flex-col gap-2"
                    use:maklumatWarisEnhance
                    method="POST"
                >
                    <TextField
                        {disabled}
                        hasError={!!$maklumatWarisErrors.name}
                        name="name"
                        label={'Nama Waris'}
                        type="text"
                        bind:value={$maklumatWarisForm.name}
                    ></TextField>
                    {#if $maklumatWarisErrors.name}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.name}</span
                        >
                    {/if}
                    <TextField
                    {disabled}
                    hasError={!!$maklumatWarisErrors.alternativeName}
                    name="alternativeName"
                    label={'Nama Lain Waris'}
                    type="text"
                    bind:value={$maklumatWarisForm.alternativeName}
                ></TextField>
                {#if $maklumatWarisErrors.alternativeName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$maklumatWarisErrors.alternativeName}</span
                    >
                {/if}
                    <TextField
                        {disabled}
                        hasError={!!$maklumatWarisErrors.identityDocumentNumber}
                        name="identityDocumentNumber"
                        label={'No. Kad Pengenalan'}
                        type="text"
                        bind:value={$maklumatWarisForm.identityDocumentNumber}
                    ></TextField>
                    {#if $maklumatWarisErrors.identityDocumentNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.identityDocumentNumber}</span
                        >
                    {/if}
                    <TextField
                    {disabled}
                    hasError={!!$maklumatWarisErrors.birthCountry}
                    name="birthCountry"
                    label={'Tempat Lahir'}
                    type="text"
                    bind:value={$maklumatWarisForm.birthCountry}
                ></TextField>
                {#if $maklumatWarisErrors.birthCountry}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$maklumatWarisErrors.birthCountry}</span
                    >
                {/if}
                <TextField
                {disabled}
                hasError={!!$maklumatWarisErrors.birthState}
                name="birthState"
                label={'Negeri Kelahiran'}
                type="text"
                bind:value={$maklumatWarisForm.birthState}
            ></TextField>
            {#if $maklumatWarisErrors.birthState}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$maklumatWarisErrors.birthState}</span
                >
            {/if}
            <TextField
            {disabled}
            hasError={!!$maklumatWarisErrors.educationLevel}
            name="educationLevel"
            label={'Taraf Pendidikan'}
            type="text"
            bind:value={$maklumatWarisForm.educationLevel}
        ></TextField>
        {#if $maklumatWarisErrors.educationLevel}
            <span
                class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$maklumatWarisErrors.educationLevel}</span
            >
        {/if}
        <TextField
        {disabled}
        hasError={!!$maklumatWarisErrors.race}
        name="race"
        label={'Bangsa'}
        type="text"
        bind:value={$maklumatWarisForm.race}
    ></TextField>
    {#if $maklumatWarisErrors.race}
        <span
            class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$maklumatWarisErrors.race}</span
        >
    {/if}
                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatWarisErrors.birthDate}
                        name="birthDate"
                        handleDateChange
                        label="Tarikh Lahir"
                        bind:selectedDate={$maklumatWarisForm.birthDate}
                    ></DateSelector>
                    {#if $maklumatWarisErrors?.birthDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors?.birthDate}</span
                        >
                    {/if}

                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatWarisErrors.relationship}
                        dropdownType="label-left-full"
                        id="relationship"
                        label="Hubungan"
                        bind:value={$maklumatWarisForm.relationship}
                        options={[
                            { value: '1', name: 'Suami' },
                            { value: '2', name: 'Isteri' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatWarisErrors.relationship}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.relationship}</span
                        >
                    {/if}

                    <DateSelector
                        {disabled}
                        hasError={!!$maklumatWarisErrors.marriageDate}
                        name="marriageDate"
                        handleDateChange
                        label="Tarikh Kahwin (Jika Berkenaan) "
                        bind:selectedDate={$maklumatWarisForm.marriageDate}
                    ></DateSelector>
                    {#if $maklumatWarisErrors?.marriageDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors?.marriageDate}</span
                        >
                    {/if}
                    <DropdownSelect
                        {disabled}
                        hasError={!!$maklumatWarisErrors.identityDocumentColor}
                        dropdownType="label-left-full"
                        id="identityDocumentColor"
                        label="Warna Kad Pengenalan"
                        bind:value={$maklumatWarisForm.identityDocumentColor}
                        options={[
                            { value: 'true', name: 'Biru' },
                            { value: 'false', name: 'Merah' },
                        ]}
                    ></DropdownSelect>
                    {#if $maklumatWarisErrors.identityDocumentColor}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.identityDocumentColor}</span
                        >

                    {/if}

                    <TextField
                        {disabled}
                        hasError={!!$maklumatWarisErrors.phoneNumber}
                        name="phoneNumber"
                        label={'Telefon (P)'}
                        type="text"
                        bind:value={$maklumatWarisForm.phoneNumber}
                    ></TextField>
                    {#if $maklumatWarisErrors.phoneNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.phoneNumber}</span
                        >
                    {/if}
                    <!-- <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.telefonPeribadi
                            ? true
                            : false}
                        name="telefonPeribadi"
                        label={'Telefon (P)'}
                        type="text"
                        bind:value={$maklumatWarisForm.telefonPeribadi}
                    ></TextField>
                    {#if $maklumatWarisErrors.telefonPeribadi}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.telefonPeribadi}</span
                        >
                    {/if} -->
                    <!-- <TextField
                        {disabled}
                        hasError={$maklumatWarisErrors.pekerjaanWaris
                            ? true
                            : false}
                        name="pekerjaanWaris"
                        label={'Pekerjaan'}
                        type="text"
                        bind:value={$maklumatWarisForm.pekerjaanWaris}
                    ></TextField>
                    {#if $maklumatWarisErrors.pekerjaanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.pekerjaanWaris}</span
                        >
                    {/if} -->
                    <TextField
                        {disabled}
                        hasError={!!$maklumatWarisErrors.workAddress}
                        name="workAddress"
                        label={'Alamat Majikan'}
                        type="text"
                        bind:value={$maklumatWarisForm.workAddress}
                    ></TextField>
                    {#if $maklumatWarisErrors.workAddress}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.workAddress}</span
                        >
                    {/if}
                    <TextField
                    {disabled}
                    hasError={!!$maklumatWarisErrors.workPostcode}
                    name="workPostcode"
                    label={'Poskod Majikan'}
                    type="text"
                    bind:value={$maklumatWarisForm.workPostcode}
                ></TextField>
                {#if $maklumatWarisErrors.workPostcode}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$maklumatWarisErrors.workPostcode}</span
                    >
                {/if}

                    <!-- <LongTextField
                        hasError={$maklumatWarisErrors.alamatMajikanWaris
                            ? true
                            : false}
                        {disabled}
                        name="alamatMajikanWaris"
                        label="Alamat Majikan"
                        bind:value={$maklumatWarisForm.alamatMajikanWaris}
                    />
                    {#if $maklumatWarisErrors.alamatMajikanWaris}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$maklumatWarisErrors.alamatMajikanWaris}</span
                        >
                    {/if} -->

                <!-- <RadioSingle
                name="inSchool"
                disabled={!editable}
                options={approveOptions}
                legend={'Bersekolah'}
                bind:userSelected={$maklumatWarisForm.inSchool}
            ></RadioSingle>
            {#if $errors.inSchool}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.inSchool}</span
                >
            {/if} -->
                </form>
                {#if tempNextOfKinRecord.length > 0}
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                    >
                        <div class="mb-2.5 text-sm font-medium">
                            <p>Preview Rekod Untuk Disimpan</p>
                        </div>
                        {#each tempNextOfKinRecord as nextOfKin, i}
                            <div class="text-sm text-system-primary">
                                <p>
                                    {i + 1}. Maklumat Waris - {nextOfKin.addNextOfKinName}
                                </p>
                            </div>
                            <!-- <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Nama Waris:
                                    </span>
                                    {nextOfKin.addNextOfKinName}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        No. Kad Pengenalan:
                                    </span>
                                    {nextOfKin.addNextOfKinIdentityDocumentNumber}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Tarikh Lahir:
                                    </span>
                                    {nextOfKin.addNextOfKinBirthDate}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Hubungan Dengan Waris:
                                    </span>
                                    {nextOfKin.addNextOfKinRelationship}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Tarikh Kahwin (Jika berkenaan):
                                    </span>
                                    {nextOfKin.addNextOfKinMarriageDate}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Warna Kad Pengenalan:
                                    </span>
                                    {nextOfKin.addNextOfKinIdentityDocumentType}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Telefon (R):
                                    </span>
                                    {nextOfKin.addNextOfKinHomeNumber ?? ''}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Telefon (P):
                                    </span>
                                    {nextOfKin.addNextOfKinMobileNumber}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Pekerjaan:
                                    </span>
                                    {nextOfKin.addNextOfKinPosition}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Nama Majikan:
                                    </span>
                                    {nextOfKin.addNextOfKinCompany ?? ''}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Alamat Majikan:
                                    </span>
                                    {nextOfKin.addNextOfKinCompanyAddress ?? ''}
                                </li>
                            </ul> -->
                        {/each}
                    </div>
                {/if}
                <!-- <form
                    id="nextOfKinForm"
                    class="flex w-full flex-col gap-2 rounded-[3px] border p-2.5"
                    use:maklumatWarisEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>
                        Maklumat Waris #{1}
                    </p>
                    <TextField
                        disabled
                        id="name"
                        name="name"
                        label={'Nama Waris'}
                        value={$maklumatWarisForm.namaWaris}
                    ></TextField>
                    <TextField
                        disabled
                        id="identityDocumentNumber"
                        name="identityDocumentNumber"
                        label={'No. Kad Pengenalan'}
                        value={$maklumatWarisForm.noKP}
                    ></TextField>
                    <DateSelector
                        {handleDateChange}
                        disabled
                        name="birthDate"
                        label="Tarikh Lahir"
                        selectedDate={$maklumatWarisForm.tarikhLahirWaris}
                    ></DateSelector>
                    <TextField
                        disabled
                        id="relationship"
                        name="relationship"
                        label={'Hubungan Dengan Waris'}
                        value={$maklumatWarisForm.hubunganWaris}
                    ></TextField>
                    <DateSelector
                        {handleDateChange}
                        disabled
                        name="marriageDate"
                        label={'Tarikh Kahwin (Jika berkenaan)'}
                        selectedDate={$maklumatWarisForm.tarikhKahwin}
                    ></DateSelector>
                    <TextField
                        disabled
                        id="identityDocumentType"
                        name="identityDocumentType"
                        label={'Warna Kad Pengenalan'}
                        value={$maklumatWarisForm.warnaKP}
                    ></TextField>
                    <TextField
                        disabled
                        id="homeNumber"
                        name="homeNumber"
                        label={'Telefon (R)'}
                        value={$maklumatWarisForm.telefonPeribadi}
                    ></TextField>
                    <TextField
                        disabled
                        id="mobileNumber"
                        name="mobileNumber"
                        label={'Telefon (P)'}
                        value={$maklumatWarisForm.telefonPeribadi}
                    ></TextField>
                    <TextField
                        disabled
                        id="position"
                        name="position"
                        label={'Pekerjaan'}
                        value={$maklumatWarisForm.pekerjaanWaris}
                    ></TextField>
                    <TextField
                        disabled
                        id="company"
                        name="company"
                        label={'Nama Majikan'}
                        value={$maklumatWarisForm.namaMajikanWaris}
                    ></TextField>
                    <LongTextField
                        disabled
                        id="companyAddress"
                        name="companyAddress"
                        label={'Alamat Majikan'}
                        value={$maklumatWarisForm.alamatMajikanWaris}
                    ></LongTextField>
                </form> -->
            </div>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Waris"
                    onClick={() => {
                        openNextOfKinInfoModal = true;
                    }}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
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

<!-- Academic Info Modal -->
<Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <form
        id="addAcademicInfoModal"
        method="POST"
        use:addAcademicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <TextField
            hasError={!!$addAcademicInfoErrors.title}
            {disabled}
            name="title"
            label={'Tajuk'}
            bind:value={$addAcademicInfoModal.title}
        ></TextField>
        {#if $addAcademicInfoErrors.title}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.title}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.institution}
            {disabled}
            name="institution"
            label={'Institusi'}
            bind:value={$addAcademicInfoModal.institution}
        ></TextField>
        {#if $addAcademicInfoErrors.institution}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.institution}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.year}
            {disabled}
            name="year"
            label={'Tahun'}
            bind:value={$addAcademicInfoModal.year}
        ></TextField>
        {#if $addAcademicInfoErrors.year}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.year}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.achievement}
            {disabled}
            name="achievement"
            label={'Pencapaian'}
            bind:value={$addAcademicInfoModal.achievement}
        ></TextField>
        {#if $addAcademicInfoErrors.achievement}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.achievement}</span
            >
        {/if}
        <LongTextField
            hasError={!!$addAcademicInfoErrors.remarks}
            {disabled}
            name="remarks"
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.remarks}
        ></LongTextField>
        {#if $addAcademicInfoErrors.remarks}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.remarks}</span
            >
        {/if}
        <TextIconButton primary label={'Simpan'} form="addAcademicInfoModal" />
    </form>
</Modal>

<!-- Experience Info Modal -->
<Modal title={'Tambah Maklumat Pengalaman'} bind:open={openExperienceInfoModal}>
    <form
        id="addExperienceInfoModal"
        method="POST"
        use:addExperienceModalEnhance
        class="flex w-full flex-col gap-2"
    >
        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.addCompany}
            name="addCompany"
            label={'Nama Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.addCompany}
        ></TextField>
        {#if $addExperienceModalErrors.addCompany}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addCompany}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.addAddress}
            name="addAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.addAddress}
        ></TextField>
        {#if $addExperienceModalErrors.addAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.addPosition}
            name="addPosition"
            label={'Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.addPosition}
        ></TextField>
        {#if $addExperienceModalErrors.addPosition}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addPosition}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.addPositionCode}
            name="addPositionCode"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$addExperienceModalForm.addPositionCode}
        ></TextField>

        <DateSelector
            {disabled}
            hasError={!!$addExperienceModalErrors.addStartDate}
            name="addStartDate"
            label={'Dari (tahun)'}
            bind:selectedDate={$addExperienceModalForm.addStartDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.addStartDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addStartDate}</span
            >
        {/if}
        <DateSelector
            {disabled}
            hasError={!!$addExperienceModalErrors.addEndDate}
            name="addEndDate"
            label={'Hingga (tahun)'}
            bind:selectedDate={$addExperienceModalForm.addEndDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.addEndDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addEndDate}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.addSalary}
            name="addSalary"
            label={'Gaji'}
            type="text"
            bind:value={$addExperienceModalForm.addSalary}
        ></TextField>
        {#if $addExperienceModalErrors.addSalary}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.addSalary}</span
            >
        {/if}
        <TextIconButton
            primary
            label={'Simpan'}
            form="addExperienceInfoModal"
        />
    </form>
</Modal>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <form
        id="addMembershipInfoModal"
        class="flex w-full flex-col gap-2"
        use:addActivityModalEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={!!$addActivityModalErrors.name}
            name="name"
            label={'Nama Kegiatan'}
            type="text"
            bind:value={$addActivityModal.name}
        ></TextField>
        {#if $addActivityModalErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.name}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addActivityModalErrors.joinDate}
            name="joinDate"
            label={'Tarikh Keahlian'}
            bind:selectedDate={$addActivityModal.joinDate}
        ></DateSelector>
        {#if $addActivityModalErrors.joinDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.joinDate}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addActivityModalErrors.position}
            name="position"
            label={'Jawatan'}
            type="text"
            bind:value={$addActivityModal.position}
        ></TextField>
        {#if $addActivityModalErrors.position}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.position}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addActivityModalErrors.description}
            name="description"
            label={'Catatan'}
            type="text"
            bind:value={$addActivityModal.description}
        ></TextField>
        {#if $addActivityModalErrors.description}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.description}</span
            >
        {/if}

        <TextIconButton
            primary
            label={'Simpan'}
            form="addMembershipInfoModal"
        />
    </form>
</Modal>
<!-- Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openFamilyInfoModal}
>
    <form
        id="addFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addFamilyEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addName}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addFamilyModal.addName}
        ></TextField>
        {#if $addFamilyErrors.addName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addName}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addIdentityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'No. Kad Pengenalan'}
            type="text"
            bind:value={$addFamilyModal.addIdentityDocumentNumber}
        ></TextField>
        {#if $addFamilyErrors.addIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addIdentityDocumentNumber}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addGender}
            name="addGender"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={[
                { value: 'male', name: 'Lelaki' },
                { value: 'female', name: 'Perempuan' },
            ]}
            bind:value={$addFamilyModal.addGender}
        ></DropdownSelect>
        {#if $addFamilyErrors.addGender}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addGender}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addRelationship}
            name="addRelationship"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={[
                { value: 'husband', name: 'Suami' },
                { value: 'wife', name: 'Isteri' },
            ]}
            bind:value={$addFamilyModal.addRelationship}
        ></DropdownSelect>
        {#if $addFamilyErrors.addRelationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addRelationship}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addOccupation}
            name="addOccupation"
            label={'Pekerjaan (Jika Ada)'}
            type="text"
            bind:value={$addFamilyModal.addOccupation}
        ></TextField>
        {#if $addFamilyErrors.addOccupation}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addOccupation}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addIsInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addIsInSchool"
                bind:checked={$addFamilyModal.addIsInSchool}
            />
        </div>
        {#if $addFamilyErrors.addIsInSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addIsInSchool}</span
            >
        {/if}
        <br />

        <TextIconButton primary label={'Simpan'} form="addFamilyInfoModal" />
    </form>
</Modal>

<!-- Non Family Info Modal -->
<Modal
    title={'Tambah Maklumat Suami/Isteri & Anak'}
    bind:open={openNonFamilyInfoModal}
>
    <form
        id="addNonFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addNonFamilyEnhance
        method="POST"
    >
        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyName}
            name="addNonFamilyName"
            label={'Nama'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyName}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyName}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'No. Kad Pengenalan'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyIdentityDocumentNumber}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyGender}
            name="addGender"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={[
                { value: 'male', name: 'Lelaki' },
                { value: 'female', name: 'Perempuan' },
            ]}
            bind:value={$addNonFamilyModal.addNonFamilyGender}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyGender}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyGender}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyRelationship}
            name="addRelationship"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={[
                { value: 'husband', name: 'Suami' },
                { value: 'wife', name: 'Isteri' },
            ]}
            bind:value={$addNonFamilyModal.addNonFamilyRelationship}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyRelationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyRelationship}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyOccupation}
            name="addOccupation"
            label={'Pekerjaan (Jika Ada)'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyOccupation}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyOccupation}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyOccupation}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addIsInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addIsInSchool"
                bind:checked={$addNonFamilyModal.addNonFamilyIsInSchool}
            />
        </div>
        {#if $addNonFamilyErrors.addNonFamilyIsInSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyIsInSchool}</span
            >
        {/if}
        <br />

        <TextIconButton primary label={'Simpan'} form="addNonFamilyInfoModal" />
    </form>
</Modal>

<!-- Next Of Kin Info Modal -->
<Modal title={'Tambah Maklumat Waris'} bind:open={openNextOfKinInfoModal}>
    <form
        id="addNextOfKinInfoModal"
        use:addNextOfKinEnhance
        method="POST"
        class="flex w-full flex-col gap-2"
    >
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinName}
            {disabled}
            id="name"
            name="name"
            label={'Nama Waris'}
            bind:value={$addNextOfKinModal.addNextOfKinName}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinName}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}
            {disabled}
            id="identityDocumentNumber"
            name="identityDocumentNumber"
            label={'No. Kad Pengenalan'}
            bind:value={$addNextOfKinModal.addNextOfKinIdentityDocumentNumber}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}</span
            >
        {/if}
        <DateSelector
            hasError={!!$addNextOfKinErrors.addNextOfKinBirthDate}
            {handleDateChange}
            {disabled}
            name="birthDate"
            label="Tarikh Lahir"
            bind:selectedDate={$addNextOfKinModal.addNextOfKinBirthDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.addNextOfKinBirthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinBirthDate}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinRelationship}
            {disabled}
            id="relationship"
            name="relationship"
            label={'Hubungan Dengan Waris'}
            bind:value={$addNextOfKinModal.addNextOfKinRelationship}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinRelationship}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinRelationship}</span
            >
        {/if}
        <DateSelector
            hasError={!!$addNextOfKinErrors.addNextOfKinMarriageDate}
            {handleDateChange}
            {disabled}
            name="marriageDate"
            label={'Tarikh Kahwin (Jika berkenaan)'}
            bind:selectedDate={$addNextOfKinModal.addNextOfKinMarriageDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.addNextOfKinMarriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinMarriageDate}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinIdentityDocumentType}
            {disabled}
            id="identityDocumentType"
            name="identityDocumentType"
            label={'Warna Kad Pengenalan'}
            bind:value={$addNextOfKinModal.addNextOfKinIdentityDocumentType}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinIdentityDocumentType}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinIdentityDocumentType}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinHomeNumber}
            {disabled}
            id="homeNumber"
            name="homeNumber"
            label={'Telefon (R)'}
            bind:value={$addNextOfKinModal.addNextOfKinHomeNumber}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinHomeNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinHomeNumber}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinMobileNumber}
            {disabled}
            id="mobileNumber"
            name="mobileNumber"
            label={'Telefon (P)'}
            bind:value={$addNextOfKinModal.addNextOfKinMobileNumber}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinMobileNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinMobileNumber}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinPosition}
            {disabled}
            id="position"
            name="position"
            label={'Pekerjaan'}
            bind:value={$addNextOfKinModal.addNextOfKinPosition}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinPosition}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinPosition}</span
            >
        {/if}
        <TextField
            hasError={!!$addNextOfKinErrors.addNextOfKinCompany}
            {disabled}
            id="company"
            name="company"
            label={'Nama Majikan'}
            bind:value={$addNextOfKinModal.addNextOfKinCompany}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinCompany}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinCompany}</span
            >
        {/if}
        <LongTextField
            hasError={!!$addNextOfKinErrors.addNextOfKinCompanyAddress}
            {disabled}
            id="companyAddress"
            name="companyAddress"
            label={'Alamat Majikan'}
            bind:value={$addNextOfKinModal.addNextOfKinCompanyAddress}
        ></LongTextField>
        {#if $addNextOfKinErrors.addNextOfKinCompanyAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinCompanyAddress}</span
            >
        {/if}

        <TextIconButton primary label={'Simpan'} form="addNextOfKinInfoModal" />
    </form>
</Modal>
