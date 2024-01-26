<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Modal } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { maklumatKeluargaTable } from '$lib/mocks/profil/maklumat-keluarga';
    import { maklumatTanggunganLain } from '$lib/mocks/profil/maklumat-tanggungan-lain';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
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
        _activityListSchema,
        _addAcademicInfoSchema,
        _addActivityModalSchema,
        _addExperienceModalSchema,
        _addFamilyModalSchema,
        _addNextOfKinInfoSchema,
        _addNonFamilyModalSchema,
        _dependencyListSchema,
        _experienceListSchema,
        _familyListSchema,
        _nextOfKinListSchema,
        _personalInfoForm,
        _submitAcademicInfoForm,
        _submitActivityInfoForm,
        _submitDependencyInfoForm,
        _submitExperienceInfoForm,
        _submitFamilyInfoForm,
        _submitNextOfKinInfoForm,
        _submitPersonalInfoForm,
    } from './+page';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import toast, { Toaster } from 'svelte-french-toast';
    import {
        getErrorToast,
        getSuccessToast,
    } from '$lib/services/core/toast/toast-service';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import type { AcademicList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-academic-details-response.model';
    import type { DropdownOptionsInterface } from '$lib/interfaces/common/dropdown-option';
    import type { PageData } from './$types';
    export let data: PageData;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    let tempExperienceRecord: any[] = [];
    let tempAcademicRecord: AcademicList[] = [];
    let tempActivityRecord: any[] = [];
    let tempFamilyRecord: any[] = [];
    let tempNonFamilyRecord: any[] = [];
    let tempNextOfKinRecord: any[] = [];

    const countryList: DropdownOptionsInterface[] = data.countryLookup;
    const educationLevelList: DropdownOptionsInterface[] = data.educationLookup;
    const institutionList: DropdownOptionsInterface[] = data.institutionLookup;
    const majorMinorList: DropdownOptionsInterface[] = data.majorMinorLookup;
    const sponsorshipList: DropdownOptionsInterface[] = data.sponsorshipLookup;

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
    });

    export let disabled: boolean = false;

    // Stepper Classes

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

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

    export const { form, errors, enhance } = superForm(data.personalInfoForm, {
        SPA: true,
        validators: _personalInfoForm,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',

        onSubmit() {
            _submitPersonalInfoForm($form);
        },
    });

    const {
        form: experienceInfoForm,
        errors: experienceInfoErrors,
        enhance: experienceInfoEnhance,
    } = superForm(data.experienceInfoForm, {
        dataType: 'json',
        SPA: true,
        validators: _experienceListSchema,
        onSubmit() {
            window.alert('test');
            // _submitExperienceInfoForm(tempExperienceRecord);
        },
    });

    const triggerSubmitAcademicTempData = () => {
        _submitAcademicInfoForm(tempAcademicRecord);
    };

    const triggerSubmitExperienceTempData = () => {
        _submitExperienceInfoForm(tempExperienceRecord);
    };

    const triggerSubmitActivityTempData = () => {
        _submitActivityInfoForm(tempActivityRecord);
    };
    const triggerSubmitFamilyTempData = () => {
        _submitFamilyInfoForm(tempFamilyRecord);
    };
    const triggerSubmitDependencyTempData = () => {
        _submitDependencyInfoForm(tempNonFamilyRecord);
    };
    const triggerSubmitNextOfKinTempData = () => {
        _submitNextOfKinInfoForm(tempNextOfKinRecord);
    };

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

<ContentHeader title="Maklumat Lantikan Baru {$form.name}" description=""
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
                    hasError={!!$errors.titleId}
                    id="titleId"
                    name="titleId"
                    label="Gelaran"
                    bind:value={$form.titleId}
                ></TextField>
                {#if $errors.titleId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.titleId}</span
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
                    hasError={!!$errors.birthStateId}
                    dropdownType="label-left-full"
                    id="birthStateId"
                    name="birthStateId"
                    label="Tempat Lahir"
                    bind:value={$form.birthStateId}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.birthStateId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthStateId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.birthCountryId}
                    dropdownType="label-left-full"
                    id="birthCountryId"
                    name="birthCountryId"
                    label="Negara Dilahirkan"
                    bind:value={$form.birthCountryId}
                    options={[
                        { value: '1', name: 'Sarawak' },
                        { value: '2', name: 'Sabah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.birthCountryId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthCountryId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.nationalityId}
                    dropdownType="label-left-full"
                    id="nationalityId"
                    name="nationalityId"
                    label="Warganegara"
                    bind:value={$form.nationalityId}
                    options={[
                        { value: '1', name: 'Warganegara' },
                        { value: '2', name: 'Bukan Warganegara' },
                    ]}
                ></DropdownSelect>
                {#if $errors.nationalityId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.nationalityId}</span
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
                    hasError={!!$errors.ethnicId}
                    dropdownType="label-left-full"
                    id="ethnicId"
                    name="ethnicId"
                    label="Etnik"
                    bind:value={$form.ethnicId}
                    options={[
                        { value: '1', name: 'Melayu' },
                        { value: '2', name: 'Cina' },
                    ]}
                ></DropdownSelect>
                {#if $errors.ethnicId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.ethnicId}</span
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
                    hasError={!!$errors.genderId}
                    dropdownType="label-left-full"
                    id="genderId"
                    name="genderId"
                    label="Jantina"
                    bind:value={$form.genderId}
                    options={[
                        { value: 'male', name: 'Lelaki' },
                        { value: 'female', name: 'Perempuan' },
                    ]}
                ></DropdownSelect>
                {#if $errors.genderId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.genderId}</span
                    >
                {/if}

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.maritalId}
                    dropdownType="label-left-full"
                    id="maritalId"
                    label="maritalId"
                    bind:value={$form.maritalId}
                    options={[
                        { value: '1', name: 'Bujang' },
                        { value: '2', name: 'Berkahwin' },
                    ]}
                ></DropdownSelect>
                {#if $errors.maritalId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.maritalId}</span
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

                <!-- <LongTextField
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
                {/if} -->

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.assetDeclarationStatusId}
                    dropdownType="label-left-full"
                    id="assetDeclarationStatusId"
                    name="assetDeclarationStatusId"
                    label="Status Pengikstiharan Harta"
                    bind:value={$form.assetDeclarationStatusId}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
                {#if $errors.assetDeclarationStatusId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.assetDeclarationStatusId}</span
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
                            hasError={!!$errors.relationshipId}
                            dropdownType="label-left-full"
                            id="relationshipId"
                            label="Hubungan"
                            bind:value={$form.relationshipId}
                            options={[
                                { value: 'true', name: 'Suami' },
                                { value: 'false', name: 'Isteri' },
                            ]}
                        ></DropdownSelect>
                        {#if $errors.relationshipId}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$errors.relationshipId}</span
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => triggerSubmitAcademicTempData()}
            >
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
                                    {i + 1}. Maklumat Akademik - {academic.name}
                                </p>
                            </div>
                            <ul
                                class="list-inside list-disc rounded-[3px] border p-2.5 text-sm text-system-primary"
                            >
                                <li>
                                    <span class="italic text-black">
                                        Jenis Pendidikan:
                                    </span>
                                    {academic.majorMinorId}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Negara:
                                    </span>
                                    {academic.countryId}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Institusi/Sekolah:
                                    </span>
                                    {academic.institutionId}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Taraf Pendidikan:
                                    </span>
                                    {academic.educationLevelId}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Penajaan:
                                    </span>
                                    {academic.sponsorshipId}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Nama Kelulusan/Sijil:
                                    </span>
                                    {academic.name}
                                </li>
                                <li>
                                    <span class="italic text-black">
                                        Tarikh Kelulusan/Sijil:
                                    </span>
                                    {academic.completionDate}
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
                            </ul>
                        {/each}
                    </div>
                {/if}
                {#each data.academicDetails.academicList as academic, i}
                    <div class="space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5 mt-2.5 text-sm text-system-primary">
                            <p>Maklumat Akademik #{i + 1}</p>
                        </div>
                        <DropdownSelect
                            disabled
                            name="majorMinorId"
                            dropdownType="label-left-full"
                            label={'Jenis Jurusan'}
                            options={majorMinorList}
                            bind:value={academic.majorMinorId}
                        ></DropdownSelect>
                        <DropdownSelect
                            disabled
                            name="countryId"
                            dropdownType="label-left-full"
                            label={'Negara'}
                            options={countryList}
                            bind:value={academic.countryId}
                        ></DropdownSelect>
                        <DropdownSelect
                            disabled
                            name="institutionId"
                            dropdownType="label-left-full"
                            label={'Institusi'}
                            options={institutionList}
                            bind:value={academic.institutionId}
                        ></DropdownSelect>
                        <DropdownSelect
                            disabled
                            name="educationLevelId"
                            dropdownType="label-left-full"
                            label={'Taraf Pembelajaran'}
                            options={educationLevelList}
                            bind:value={academic.educationLevelId}
                        ></DropdownSelect>
                        <DropdownSelect
                            disabled
                            name="sponsorshipId"
                            dropdownType="label-left-full"
                            label={'Penajaan'}
                            options={sponsorshipList}
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
                    </div>
                {/each}
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
                onClick={() => triggerSubmitExperienceTempData()}
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
                {#if data.experienceDetails.experienceList.length > 0}
                    <form
                        id="newHireExperienceForm"
                        method="POST"
                        use:experienceInfoEnhance
                        class="flex w-full flex-col gap-2 rounded-[3px] border p-2.5"
                    >
                        {#each $experienceInfoForm.experienceList as record, i}
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
                    </form>
                {/if}
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
                onClick={() => triggerSubmitActivityTempData()}
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
                    triggerSubmitFamilyTempData();
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
                <DynamicTable tableItems={data.familyDetails.dependenciesList}
                ></DynamicTable>
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
                    triggerSubmitDependencyTempData();
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
                <DynamicTable
                    tableItems={data.dependencyDetails.dependenciesList}
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
            ><TextIconButton
                primary
                label="Simpan"
                onClick={() => triggerSubmitNextOfKinTempData()}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
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
                            </ul>
                        {/each}
                    </div>
                {/if}
                <DynamicTable
                    hasCheckbox
                    tableItems={data.nextOfKinDetails.nextOfKinList}
                ></DynamicTable>
            </div>
            <!-- {#each $experienceInfoForm.experienceList as record, i}
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
                {/each} -->
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
        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.majorMinorId}
            {disabled}
            name="majorMinorId"
            dropdownType="label-left-full"
            label={'Jenis Jurusan'}
            options={majorMinorList}
            bind:value={$addAcademicInfoModal.majorMinorId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.majorMinorId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.majorMinorId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.countryId}
            {disabled}
            name="countryId"
            dropdownType="label-left-full"
            label={'Negara'}
            options={countryList}
            bind:value={$addAcademicInfoModal.countryId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.countryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.countryId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.institutionId}
            {disabled}
            name="institutionId"
            dropdownType="label-left-full"
            label={'Institusi'}
            options={institutionList}
            bind:value={$addAcademicInfoModal.institutionId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.institutionId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.institutionId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.educationLevelId}
            {disabled}
            name="educationLevelId"
            dropdownType="label-left-full"
            label={'Taraf Pembelajaran'}
            options={educationLevelList}
            bind:value={$addAcademicInfoModal.educationLevelId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.sponsorshipId}
            {disabled}
            name="sponsorshipId"
            dropdownType="label-left-full"
            label={'Penajaan'}
            options={sponsorshipList}
            bind:value={$addAcademicInfoModal.sponsorshipId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.sponsorshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.sponsorshipId}</span
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
        <DateSelector
            hasError={!!$addAcademicInfoErrors.completionDate}
            {disabled}
            name="completionDate"
            label={'Tarikh Kelulusan'}
            bind:selectedDate={$addAcademicInfoModal.completionDate}
        ></DateSelector>
        {#if $addAcademicInfoErrors.completionDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.completionDate}</span
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
            label={'Catatan'}
            bind:value={$addAcademicInfoModal.field}
        ></TextField>
        {#if $addAcademicInfoErrors.field}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.field}</span
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
            hasError={!!$addFamilyErrors.addAlternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addFamilyModal.addAlternativeName}
        ></TextField>
        {#if $addFamilyErrors.addAlternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addAlternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addIdentityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addFamilyModal.addIdentityDocumentColor}
        ></TextField>
        {#if $addFamilyErrors.addIdentityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addIdentityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addIdentityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addFamilyModal.addIdentityDocumentNumber}
        ></TextField>
        {#if $addFamilyErrors.addIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addIdentityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addFamilyErrors.addAddress}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addFamilyModal.addAddress}
        ></LongTextField>
        {#if $addFamilyErrors.addAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addPostcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addFamilyModal.addPostcode}
        ></TextField>
        {#if $addFamilyErrors.addPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addPostcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addFamilyErrors.addBirthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addFamilyModal.addBirthDate}
        ></DateSelector>
        {#if $addFamilyErrors.addBirthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addBirthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addBirthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addFamilyModal.addBirthCountryId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addBirthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addBirthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addBirthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addFamilyModal.addBirthStateId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addBirthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addBirthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addRelationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addFamilyModal.addRelationshipId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addRelationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addRelationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addEducationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addFamilyModal.addEducationLevelId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addEducationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addEducationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addRaceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addFamilyModal.addRaceId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addRaceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addRaceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addNationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addFamilyModal.addNationalityId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addNationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addNationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addMaritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addFamilyModal.addMaritalId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addMaritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addMaritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.addGenderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addFamilyModal.addGenderId}
        ></DropdownSelect>
        {#if $addFamilyErrors.addGenderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addGenderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addWorkAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addFamilyModal.addWorkAddress}
        ></TextField>
        {#if $addFamilyErrors.addWorkAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addWorkAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addWorkPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addFamilyModal.addWorkPostcode}
        ></TextField>
        {#if $addFamilyErrors.addWorkPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addWorkPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.addPhoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addFamilyModal.addPhoneNumber}
        ></TextField>
        {#if $addFamilyErrors.addPhoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addPhoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addFamilyErrors.addMarriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addFamilyModal.addMarriageDate}
        ></DateSelector>
        {#if $addFamilyErrors.addMarriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addMarriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addFamilyModal.addInSchool}
            />
        </div>
        {#if $addFamilyErrors.addInSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.addInSchool}</span
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
            name="addName"
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
            hasError={!!$addNonFamilyErrors.addNonFamilyAlternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyAlternativeName}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyAlternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyAlternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyIdentityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyIdentityDocumentColor}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyIdentityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyIdentityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyIdentityDocumentNumber}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyIdentityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyAddress}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNonFamilyModal.addNonFamilyAddress}
        ></LongTextField>
        {#if $addNonFamilyErrors.addNonFamilyAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyPostcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyPostcode}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyPostcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyBirthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addNonFamilyModal.addNonFamilyBirthDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.addNonFamilyBirthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyBirthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyBirthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addNonFamilyModal.addNonFamilyBirthCountryId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyBirthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyBirthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyBirthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addNonFamilyModal.addNonFamilyBirthStateId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyBirthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyBirthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyRelationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addNonFamilyModal.addNonFamilyRelationshipId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyRelationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyRelationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyEducationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addNonFamilyModal.addNonFamilyEducationLevelId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyEducationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyEducationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyRaceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addNonFamilyModal.addNonFamilyRaceId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyRaceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyRaceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyNationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addNonFamilyModal.addNonFamilyNationalityId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyNationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyNationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyMaritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addNonFamilyModal.addNonFamilyMaritalId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyMaritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyMaritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyGenderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addNonFamilyModal.addNonFamilyGenderId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.addNonFamilyGenderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyGenderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyWorkAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyWorkAddress}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyWorkAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyWorkAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyWorkPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyWorkPostcode}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyWorkPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyWorkPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyPhoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNonFamilyModal.addNonFamilyPhoneNumber}
        ></TextField>
        {#if $addNonFamilyErrors.addNonFamilyPhoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyPhoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNonFamilyErrors.addNonFamilyMarriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addNonFamilyModal.addNonFamilyMarriageDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.addNonFamilyMarriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyMarriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNonFamilyModal.addNonFamilyInSchool}
            />
        </div>
        {#if $addNonFamilyErrors.addNonFamilyInSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.addNonFamilyInSchool}</span
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
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinName}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinName}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinName}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinAlternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinAlternativeName}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinAlternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinAlternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinIdentityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinIdentityDocumentColor}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinIdentityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinIdentityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinIdentityDocumentNumber}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinIdentityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinAddress}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNextOfKinModal.addNextOfKinAddress}
        ></LongTextField>
        {#if $addNextOfKinErrors.addNextOfKinAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinPostcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinPostcode}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinPostcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinBirthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addNextOfKinModal.addNextOfKinBirthDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.addNextOfKinBirthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinBirthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinBirthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addNextOfKinModal.addNextOfKinBirthCountryId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinBirthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinBirthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinBirthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addNextOfKinModal.addNextOfKinBirthStateId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinBirthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinBirthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinRelationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addNextOfKinModal.addNextOfKinRelationshipId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinRelationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinRelationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinEducationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addNextOfKinModal.addNextOfKinEducationLevelId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinEducationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinEducationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinRaceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addNextOfKinModal.addNextOfKinRaceId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinRaceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinRaceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinNationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addNextOfKinModal.addNextOfKinNationalityId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinNationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinNationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinMaritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addNextOfKinModal.addNextOfKinMaritalId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinMaritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinMaritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinGenderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addNextOfKinModal.addNextOfKinGenderId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.addNextOfKinGenderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinGenderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinWorkAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinWorkAddress}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinWorkAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinWorkAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinWorkPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinWorkPostcode}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinWorkPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinWorkPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinPhoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNextOfKinModal.addNextOfKinPhoneNumber}
        ></TextField>
        {#if $addNextOfKinErrors.addNextOfKinPhoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinPhoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNextOfKinErrors.addNextOfKinMarriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addNextOfKinModal.addNextOfKinMarriageDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.addNextOfKinMarriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinMarriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNextOfKinModal.addNextOfKinInSchool}
            />
        </div>
        {#if $addNextOfKinErrors.addNextOfKinInSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.addNextOfKinInSchool}</span
            >
        {/if}

        <TextIconButton primary label={'Simpan'} form="addNextOfKinInfoModal" />
    </form>
</Modal>
