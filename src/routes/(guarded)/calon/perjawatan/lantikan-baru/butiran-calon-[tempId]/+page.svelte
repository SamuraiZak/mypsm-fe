<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Modal } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatKegiatanTable } from '$lib/mocks/profil/maklumat-kegiatan-keahlian';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { mockCurrentService } from '$lib/mocks/database/mockCurrentService';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import { mockLookupRaces } from '$lib/mocks/database/mockLookupRaces';
    import { mockLookupReligions } from '$lib/mocks/database/mockLookupReligions';
    import { mockEmployeePartners } from '$lib/mocks/database/mockEmployeePartners';
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
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import {
        _academicInfoSchema,
        _addAcademicInfoSchema,
        _addActivityModalSchema,
        _addExperienceModalSchema,
        _addFamilyModalSchema,
        _addNextOfKinInfoSchema,
        _addNonFamilyModalSchema,
        _experienceInfoSchema,
        _nextOfKinInfoSchema,
        _personalInfoForm,
        _submitAcademicInfoForm,
        _submitAddExperienceModal,
        _submitAddMoreAcademicForm,
        _submitExperienceInfoForm,
        _submitNextOfKinForm,
        _submitPersonalInfoForm,
    } from './+page';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';
    import AccordianField from '$lib/components/input/AccordianField.svelte';
    import { getErrorToast, getSuccessToast } from '$lib/toast/toast-service';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    let employeeLists: SelectOptionType<any>[] = [];

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

    let selectedFiles: File[] = [];
    let target: any;
    let texthidden = false;

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

    onMount(async () => {
        target = document.getElementById('fileInput');
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
    });

    export let employeeNumber: string = '00001';
    // export let activeStepper = 0;
    // export let isEditing: boolean = false;
    export let disabled: boolean = false;

    let currentEmployee = mockEmployees.find((employee) => {
        return employee.employeeNumber === employeeNumber;
    })!;
    let currentEmployeeRace = mockLookupRaces.find((race) => {
        return race.id === currentEmployee.raceId;
    })!;
    let currentEmployeeReligion = mockLookupReligions.find((religion) => {
        return religion.id === currentEmployee.religionId;
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

    const selectOptions: SelectOptionType<any>[] = [
        {
            value: true,
            name: 'Ya',
        },
        {
            value: false,
            name: 'Tidak',
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
    export let data: PageData;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    let tempExperienceRecord: any[] = [];
    let tempAcademicRecord: any[] = [];
    let tempActivityRecord: any[] = [];
    let tempFamilyRecord: any[] = [];
    let tempNonFamilyRecord: any[] = [];
    let tempNextOfKinRecord: any[] = [];

    export const { form, errors, enhance } = superForm(data.personalInfoForm, {
        SPA: true,
        validators: _personalInfoForm,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',

        onSubmit() {
            _submitPersonalInfoForm($form);
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
        form: nextOfKinForm,
        errors: nextOfKinErrors,
        enhance: nextOfKinEnhance,
    } = superForm(data.nextOfKinInfoForm, {
        SPA: true,
        validators: _nextOfKinInfoSchema,
        onSubmit() {
            _submitNextOfKinForm($nextOfKinForm);
        },
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
        <StepperContentHeader title="Maklumat Peribadi">
            <TextIconButton
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
                use:enhance
                method="POST"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <TextField
                    disabled
                    name="candidateNumber"
                    label={'No. Calon'}
                    type="text"
                    bind:value={$form.candidateNumber}
                ></TextField>
                <!-- <TextField
                    {disabled}
                    hasError={!!$errors.staffNumber}
                    name="staffNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:value={$form.staffNumber}
                ></TextField>

                {#if $errors.staffNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.staffNumber}</span
                    >
                {/if} -->

                <!-- <DropdownSelect
                    {disabled}
                    hasError={!!$errors.statusPekerjaan}
                    dropdownType="label-left-full"
                    id="statusPekerjaan"
                    name="statusPekerjaan"
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
                {/if} -->

                <TextField
                    {disabled}
                    hasError={$errors.identityDocumentNumber
                        ? true
                        : false
                          ? true
                          : false}
                    name="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:value={$form.identityDocumentNumber}
                ></TextField>

                {#if $errors.identityDocumentNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityDocumentNumber}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={!!$errors.name}
                    name="name"
                    label={'Nama Penuh'}
                    type="text"
                    bind:value={$form.name}
                ></TextField>

                {#if $errors.name}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.name}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    hasError={$errors.alternativeName
                        ? true
                        : false
                          ? true
                          : false}
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
                    hasError={!!$errors.identityDocumentColor}
                    dropdownType="label-left-full"
                    id="identityDocumentColor"
                    name="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    bind:value={$form.identityDocumentColor}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.identityDocumentColor}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityDocumentColor}</span
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
                    hasError={!!$errors.birthPlace}
                    dropdownType="label-left-full"
                    id="birthPlace"
                    name="birthPlace"
                    label="Tempat Lahir"
                    bind:value={$form.birthPlace}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.birthPlace}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthPlace}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.isMalaysia}
                    dropdownType="label-left-full"
                    id="isMalaysia"
                    name="isMalaysia"
                    label="Warganegara"
                    bind:value={$form.isMalaysia}
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if $errors.isMalaysia}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isMalaysia}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.raceId}
                    dropdownType="label-left-full"
                    id="raceId"
                    name="raceId"
                    label="Bangsa"
                    bind:value={$form.raceId}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if $errors.raceId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.raceId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.religionId}
                    dropdownType="label-left-full"
                    id="religionId"
                    name="religionId"
                    label="Agama"
                    bind:value={$form.religionId}
                    options={[
                        { value: '1', name: 'Islam' },
                        { value: '2', name: 'Kristen' },
                    ]}
                ></DropdownSelect>
                {#if $errors.religionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.religionId}</span
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
                    options={[
                        { value: 'male', name: 'Lelaki' },
                        { value: 'female', name: 'Perempuan' },
                    ]}
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
                    label="marital"
                    bind:value={$form.marital}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
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

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.propertyDeclarationStatus}
                    dropdownType="label-left-full"
                    id="propertyDeclarationStatus"
                    name="propertyDeclarationStatus"
                    label="Status Pengikstiharan Harta"
                    bind:value={$form.propertyDeclarationStatus}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.propertyDeclarationStatus}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.propertyDeclarationStatus}</span
                    >
                {/if}

                <DateSelector
                    {disabled}
                    hasError={!!$errors.propertyDeclarationDate}
                    name="propertyDeclarationDate"
                    handleDateChange
                    label="Tarikh Pengikstiharan Harta"
                    bind:selectedDate={$form.propertyDeclarationDate}
                ></DateSelector>
                {#if $errors.propertyDeclarationDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.propertyDeclarationDate}</span
                    >
                {/if}

                <TextField
                    {disabled}
                    name="perumahan"
                    label={'Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                <TextField
                    {disabled}
                    name="pinjPerumahan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    value="-"
                ></TextField>

                <TextField
                    {disabled}
                    name="pinjKenderaan"
                    label={'Pinjaman Kenderaan'}
                    type="text"
                    value="-"
                ></TextField>

                <RadioSingle
                    name="isExPoliceOrSoldier"
                    disabled={!editable}
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.isExPoliceOrSoldier}
                ></RadioSingle>
                {#if $errors.isExPoliceOrSoldier}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.isExPoliceOrSoldier}</span
                    >
                {/if}

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <RadioSingle
                        name="isInternalRelationship"
                        {options}
                        {disabled}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isInternalRelationship}
                    ></RadioSingle>
                    {#if $form.isInternalRelationship}
                        <TextField
                            {disabled}
                            hasError={!!$errors.employeeNumber}
                            name="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:value={$form.employeeNumber}
                        ></TextField>

                        {#if $errors.employeeNumber}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeeNumber}</span
                            >
                        {/if}

                        <TextField
                            {disabled}
                            hasError={$errors.employeeName
                                ? true
                                : false
                                  ? true
                                  : false}
                            name="employeeName"
                            label={'Nama Kakitangan LKIM'}
                            type="text"
                            bind:value={$form.employeeName}
                        ></TextField>

                        {#if $errors.employeeName}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeeName}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.employeePosition}
                            dropdownType="label-left-full"
                            id="employeePosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:value={$form.employeePosition}
                            options={[
                                { value: '1', name: 'Pegawai IT' },
                                { value: '2', name: 'Akauntan' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.employeePosition}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.employeePosition}</span
                            >
                        {/if}

                        <DropdownSelect
                            {disabled}
                            hasError={!!$errors.relationship}
                            dropdownType="label-left-full"
                            id="relationship"
                            label="Hubungan"
                            bind:value={$form.relationship}
                            options={[
                                { value: 'true', name: 'Suami' },
                                { value: 'false', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.relationship}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.relationship}</span
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
                            <ul
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
                            </ul>
                        {/each}
                    </div>
                {/if}
                <form
                    id="academicInfoForm"
                    method="POST"
                    use:academicInfoEnhance
                    class="flex w-full flex-col gap-2.5"
                >
                    {#each data.academicDetails.AcademicList as academic, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <div
                                class="mb-5 mt-2.5 text-sm text-system-primary"
                            >
                                <p>Maklumat Akademik #{i + 1}</p>
                            </div>
                            <TextField
                                disabled
                                name="name"
                                label={'Nama Kelulusan/Sijil'}
                                type="text"
                                bind:value={academic.name}
                            ></TextField>

                            <!-- <TextField
                                disabled
                                hasError={!!$academicInfoErrors.academicList
                                    .type}
                                name="type"
                                label={'Jenis Kelulusan'}
                                type="text"
                                bind:value={academic.type}
                            ></TextField>

                            <TextField
                                disabled
                                hasError={$academicInfoErrors.academicList[i]
                                    .completionYear}
                                name="completionYear"
                                label={'Tahun Kelulusan'}
                                type="text"
                                bind:value={academic.completionYear}
                            ></TextField> -->

                            <TextField
                                disabled
                                name="finalGrade"
                                label={'Gred'}
                                type="text"
                                bind:value={academic.finalGrade}
                            ></TextField>

                            <TextField
                                disabled
                                name="field"
                                label={'Bidang'}
                                type="text"
                                bind:value={academic.field}
                            ></TextField>

                            <LongTextField
                                disabled
                                name="remark"
                                label={'Catatan'}
                                bind:value={academic.remark}
                            ></LongTextField>
                        </div>
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
                    id="formStepperPengalaman"
                    class="flex w-full flex-col gap-2 rounded-[3px] border p-2.5"
                    use:experienceInfoEnhance
                    method="POST"
                >
                    {#if data.experienceDetails.experienceList.length > 0}
                        {#each data.experienceDetails.experienceList as record, i}
                            <p class={stepperFormTitleClass}>
                                Maklumat Pengalaman #{i + 1}
                            </p>
                            <TextField
                                disabled
                                name="company"
                                label={'Nama Majikan'}
                                type="text"
                                bind:value={record.company}
                            ></TextField>

                            <TextField
                                disabled
                                name="address"
                                label={'Alamat Majikan'}
                                type="text"
                                bind:value={record.address}
                            ></TextField>

                            <TextField
                                disabled
                                name="position"
                                label={'Jawatan'}
                                type="text"
                                bind:value={record.position}
                            ></TextField>

                            <TextField
                                disabled
                                name="positionCode"
                                label={'Kod Jawatan (jika ada)'}
                                type="text"
                                bind:value={record.positionCode}
                            ></TextField>

                            <TextField
                                disabled
                                name="startDate"
                                label={'Dari (tahun)'}
                                type="text"
                                bind:value={record.startDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="endDate"
                                label={'Hingga (tahun)'}
                                type="text"
                                bind:value={record.endDate}
                            ></TextField>

                            <TextField
                                disabled
                                name="salary"
                                label={'Gaji'}
                                type="text"
                                bind:value={record.salary}
                            ></TextField>
                        {/each}
                    {/if}
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
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian"
            ><TextIconButton
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
                            <ul
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
                            </ul>
                        {/each}
                    </div>
                {/if}
                <DynamicTable tableItems={data.activityDetails.activityList}
                ></DynamicTable>
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
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga"
            ><TextIconButton
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
                            <ul
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
                            </ul>
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
            title="Maklumat Tanggungan Selain Suami/Isteri dan Anak"
            ><TextIconButton
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
                            <ul
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
                            </ul>
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
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris"
            ><TextIconButton primary label="Simpan" form="nextOfKinForm">
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
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
                        <ul
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
                        </ul>
                    {/each}
                </div>
            {/if}
            <form
                id="nextOfKinForm"
                class="flex w-full flex-col gap-2 rounded-[3px] border p-2.5"
                use:nextOfKinEnhance
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
                    value={$nextOfKinForm.name}
                ></TextField>
                <TextField
                    disabled
                    id="identityDocumentNumber"
                    name="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    value={$nextOfKinForm.identityDocumentNumber}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    disabled
                    name="birthDate"
                    label="Tarikh Lahir"
                    selectedDate={$nextOfKinForm.birthDate}
                ></DateSelector>
                <TextField
                    disabled
                    id="relationship"
                    name="relationship"
                    label={'Hubungan Dengan Waris'}
                    value={$nextOfKinForm.relationship}
                ></TextField>
                <DateSelector
                    {handleDateChange}
                    disabled
                    name="marriageDate"
                    label={'Tarikh Kahwin (Jika berkenaan)'}
                    selectedDate={$nextOfKinForm.marriageDate}
                ></DateSelector>
                <TextField
                    disabled
                    id="identityDocumentType"
                    name="identityDocumentType"
                    label={'Warna Kad Pengenalan'}
                    value={$nextOfKinForm.identityDocumentType}
                ></TextField>
                <TextField
                    disabled
                    id="homeNumber"
                    name="homeNumber"
                    label={'Telefon (R)'}
                    value={$nextOfKinForm.homeNumber}
                ></TextField>
                <TextField
                    disabled
                    id="mobileNumber"
                    name="mobileNumber"
                    label={'Telefon (P)'}
                    value={$nextOfKinForm.mobileNumber}
                ></TextField>
                <TextField
                    disabled
                    id="position"
                    name="position"
                    label={'Pekerjaan'}
                    value={$nextOfKinForm.position}
                ></TextField>
                <TextField
                    disabled
                    id="company"
                    name="company"
                    label={'Nama Majikan'}
                    value={$nextOfKinForm.company}
                ></TextField>
                <LongTextField
                    disabled
                    id="companyAddress"
                    name="companyAddress"
                    label={'Alamat Majikan'}
                    value={$nextOfKinForm.companyAddress}
                ></LongTextField>
            </form>
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    if ($fileSelectionList.length === 0)
                        toast.error(
                            'Sila pastikan dokumen telah dimuat naik.',
                            {
                                style: 'background: #333; color: #fff;',
                            },
                        );
                    else getSuccessToast();
                    setTimeout(() => goto('../lantikan-baru'), 1500);
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
                <!-- <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </span>
                </div> -->
                <SectionHeader title="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                {#if $fileSelectionList.length === 0}
                    <span class="font-sans text-sm italic text-system-danger"
                        >Sila muat naik dokumen barkaitan.</span
                    >
                {/if}
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

                <!-- <p class={stepperFormTitleClass}>Fail-fail yang dimuat naik:</p>
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
                {/each} -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>

<Toaster />

<!-- Academic Info Modal -->
<Modal
    title={'Tambah Maklumat Akademik / Kelayakan / Latihan yang Lalu'}
    bind:open={openAcademicInfoModal}
>
    <form
        id="addAcademicModalForm"
        method="POST"
        use:addAcademicInfoEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <TextField
            hasError={!!$addAcademicInfoErrors.type}
            {disabled}
            name="type"
            label={'Taraf'}
            bind:value={$addAcademicInfoModal.type}
        ></TextField>
        {#if $addAcademicInfoErrors.type}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.type}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.name}
            {disabled}
            name="name"
            label={'Nama Pencapaian/Sijil'}
            bind:value={$addAcademicInfoModal.name}
        ></TextField>
        {#if $addAcademicInfoErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.name}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.completionYear}
            {disabled}
            name="Tahun Kelulusan"
            label={'Institusi'}
            bind:value={$addAcademicInfoModal.completionYear}
        ></TextField>
        {#if $addAcademicInfoErrors.completionYear}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.completionYear}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.finalGrade}
            {disabled}
            name="finalGrade"
            label={'Pencapaian Akhir (Gred)'}
            bind:value={$addAcademicInfoModal.finalGrade}
        ></TextField>
        {#if $addAcademicInfoErrors.finalGrade}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.finalGrade}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.field}
            {disabled}
            name="field"
            label={'Bidang'}
            bind:value={$addAcademicInfoModal.field}
        ></TextField>
        {#if $addAcademicInfoErrors.field}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.field}</span
            >
        {/if}
        <LongTextField
            hasError={!!$addAcademicInfoErrors.remark}
            {disabled}
            name="remark"
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.remark}
        ></LongTextField>
        {#if $addAcademicInfoErrors.remark}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.remark}</span
            >
        {/if}
        <TextIconButton primary label={'Simpan'} form="addAcademicModalForm" />
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
            hasError={!!$addActivityModalErrors.addName}
            name="addName"
            label={'Nama Kegiatan'}
            type="text"
            bind:value={$addActivityModal.addName}
        ></TextField>
        {#if $addActivityModalErrors.addName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.addName}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addActivityModalErrors.addJoinDate}
            name="addJoinDate"
            label={'Tarikh Keahlian'}
            bind:selectedDate={$addActivityModal.addJoinDate}
        ></DateSelector>
        {#if $addActivityModalErrors.addJoinDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.addJoinDate}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addActivityModalErrors.addPosition}
            name="addPosition"
            label={'Jawatan'}
            type="text"
            bind:value={$addActivityModal.addPosition}
        ></TextField>
        {#if $addActivityModalErrors.addPosition}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.addPosition}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addActivityModalErrors.addDescription}
            name="addDescription"
            label={'Catatan'}
            type="text"
            bind:value={$addActivityModal.addDescription}
        ></TextField>
        {#if $addActivityModalErrors.addDescription}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addActivityModalErrors.addDescription}</span
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
