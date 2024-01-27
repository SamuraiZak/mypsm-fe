<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Modal } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { Tooltip } from 'flowbite-svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { onMount } from 'svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import {
        _academicInfoSchema,
        _activityInfoSchema,
        _activityListSchema,
        _dependencyInfoSchema,
        _dependencyListSchema,
        _experienceInfoSchema,
        _experienceListSchema,
        _familyInfoSchema,
        _familyListSchema,
        _nextOfKinInfoSchema,
        _nextOfKinListSchema,
        _personalInfoForm,
        _serviceInfoSchema,
        _submitAcademicInfoForm,
        _submitActivityInfoForm,
        _submitDependencyInfoForm,
        _submitExperienceInfoForm,
        _submitFamilyInfoForm,
        _submitNextOfKinInfoForm,
        _submitPersonalInfoForm,
        _submitServiceInfoForm,
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
    import type { PageData } from './$types';
    import type { ExperienceList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-experience-details-respone.model';
    import type { ActivityList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-activity-response.view-model';
    import type { FamilyList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-family-details-response.model';
    import type { DependenciesList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-dependencies-details-response.model';
    import type { NextOfKinList } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-candidate-next-of-kin-details-response.model';
    export let data: PageData;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    let tempExperienceRecord: ExperienceList[] = [];
    let tempAcademicRecord: AcademicList[] = [];
    let tempActivityRecord: ActivityList[] = [];
    let tempFamilyRecord: FamilyList[] = [];
    let tempNonFamilyRecord: DependenciesList[] = [];
    let tempNextOfKinRecord: NextOfKinList[] = [];
    let tempNextOfKinFromFamily: NextOfKinList[] = [];

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
        form: serviceInfoForm,
        errors: serviceInfoErrors,
        enhance: serviceInfoEnhance,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        validators: _serviceInfoSchema,
        onSubmit() {
            _submitServiceInfoForm($serviceInfoForm);
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
        validators: _academicInfoSchema,
        async onSubmit() {
            await superValidate(
                $addAcademicInfoModal,
                _academicInfoSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempAcademicRecord = [
                        ...tempAcademicRecord,
                        response.data as AcademicList,
                    ];
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
        validators: _experienceInfoSchema,
        async onSubmit() {
            await superValidate(
                $addExperienceModalForm,
                _experienceInfoSchema,
            ).then((response) => {
                if (!response.valid) {
                    getErrorToast();
                } else {
                    tempExperienceRecord = [
                        ...tempExperienceRecord,
                        response.data as ExperienceList,
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
        validators: _activityInfoSchema,
        async onSubmit() {
            await superValidate($addActivityModal, _activityInfoSchema).then(
                (response) => {
                    if (!response.valid) {
                        getErrorToast();
                    } else {
                        tempActivityRecord = [
                            ...tempActivityRecord,
                            response.data,
                        ];
                        openMembershipInfoModal = false;
                    }
                },
            );
        },
    });

    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        validators: _familyInfoSchema,
        async onSubmit() {
            await superValidate($addFamilyModal, _familyInfoSchema).then(
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
        validators: _dependencyInfoSchema,
        async onSubmit() {
            await superValidate($addNonFamilyModal, _dependencyInfoSchema).then(
                (response) => {
                    if (!response.valid) {
                        getErrorToast();
                    } else {
                        tempNonFamilyRecord = [
                            ...tempNonFamilyRecord,
                            response.data,
                        ];
                        openNonFamilyInfoModal = false;
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
        validators: _nextOfKinInfoSchema,
        async onSubmit() {
            await superValidate($addNextOfKinModal, _nextOfKinInfoSchema).then(
                (response) => {
                    if (!response.valid) {
                        getErrorToast();
                    } else {
                        tempNextOfKinRecord = [
                            ...tempNextOfKinRecord,
                            response.data,
                        ];
                        openNextOfKinInfoModal = false;
                    }
                },
            );
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
                    hasError={!!$errors.alternativeName
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
                    hasError={!!$errors.identityDocumentNumber
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

                <DropdownSelect
                    {disabled}
                    hasError={!!$errors.titleId}
                    dropdownType="label-left-full"
                    id="titleId"
                    name="titleId"
                    label="Gelaran"
                    bind:value={$form.titleId}
                    options={[
                        { value: 'true', name: 'Biru' },
                        { value: 'false', name: 'Merah' },
                    ]}
                ></DropdownSelect>
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
                            hasError={!!$errors.employeeName
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
                        {/each}
                    </div>
                {/if}
                {#if data.academicInfoResponse.status === 200}
                    {#each data.academicInfoResponse.data.academicList as academic, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <div
                                class="mb-5 mt-2.5 text-sm text-system-primary"
                            >
                                <p>Maklumat Akademik #{i + 1}</p>
                            </div>
                            <DropdownSelect
                                disabled
                                name="majorMinorId"
                                dropdownType="label-left-full"
                                label={'Jenis Jurusan'}
                                options={data.majorMinorSelectOptions}
                                bind:value={academic.majorMinorId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="countryId"
                                dropdownType="label-left-full"
                                label={'Negara'}
                                options={data.countrySelectOptions}
                                bind:value={academic.countryId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="institutionId"
                                dropdownType="label-left-full"
                                label={'Institusi'}
                                options={data.institutionSelectOptions}
                                bind:value={academic.institutionId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="educationLevelId"
                                dropdownType="label-left-full"
                                label={'Taraf Pembelajaran'}
                                options={data.educationSelectOptions}
                                bind:value={academic.educationLevelId}
                            ></DropdownSelect>
                            <DropdownSelect
                                disabled
                                name="sponsorshipId"
                                dropdownType="label-left-full"
                                label={'Penajaan'}
                                options={data.sponsorshipSelectOptions}
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
                {/if}
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
                                    {i + 1}. Maklumat Pengalaman - {experience.company}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if data.experienceInfoResponse.status === 200}
                    {#each data.experienceInfoResponse.data.experienceList as record, i}
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
                                    {i + 1}. Maklumat Kegiatan/Keahlian - {activity.name}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if data.activityInfoResponse.status === 200}
                    <DynamicTable
                        tableItems={data.activityInfoResponse.data.activityList}
                    ></DynamicTable>
                {/if}
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
                                    {i + 1}. Maklumat Keluarga - {family.name}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}
                {#if data.familyInfoResponse.status === 200}
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {/if}
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
                                    Anak - {nonFamily.name}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if data.dependencyInfoResponse.status === 200}
                    <DynamicTable
                        tableItems={data.dependencyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                {/if}
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
                                    {i + 1}. Maklumat Waris - {nextOfKin.name}
                                </p>
                            </div>
                        {/each}
                    </div>
                {/if}

                {#if data.familyInfoResponse.status === 200}
                    <SectionHeader title="Pilih Waris Daripada Ahli Keluarga"
                    ></SectionHeader>
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                        withActions
                        hasCheckbox
                        bind:checkedItems={tempNextOfKinFromFamily}
                    ></DynamicTable>
                {/if}

                {#if data.nextOfKinInfoResponse.status === 200}
                    <DynamicTable
                        hasCheckbox
                        tableItems={data.nextOfKinInfoResponse.data.nextOfKinList}
                    ></DynamicTable>
                {/if}
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
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru"
            ><TextIconButton
                primary
                label="Simpan"
                form="newHireEmploymentServiceForm"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
            <form
                id="newHireEmploymentServiceForm"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <!-- <input hidden bind:value={$serviceInfoForm.candidateId} /> -->
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.gradeId}
                    dropdownType="label-left-full"
                    id="gradeId"
                    label="Gred Semasa"
                    bind:value={$serviceInfoForm.gradeId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.gradeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.gradeId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.positionId}
                    dropdownType="label-left-full"
                    id="positionId"
                    label="Jawatan"
                    bind:value={$serviceInfoForm.positionId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.positionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.positionId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.placementId}
                    dropdownType="label-left-full"
                    id="placementId"
                    label="Penempatan"
                    bind:value={$serviceInfoForm.placementId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.placementId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.placementId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$serviceInfoErrors.serviceTypeId}
                    dropdownType="label-left-full"
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceTypeId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceTypeId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceTypeId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.serviceGroupId}
                    dropdownType="label-left-full"
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:value={$serviceInfoForm.serviceGroupId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.serviceGroupId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceGroupId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.unitId}
                    dropdownType="label-left-full"
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:value={$serviceInfoForm.unitId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.unitId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.unitId}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.employmentStatusId}
                    dropdownType="label-left-full"
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:value={$serviceInfoForm.employmentStatusId}
                    options={data.countrySelectOptions}
                ></DropdownSelect>
                {#if $serviceInfoErrors.employmentStatusId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.employmentStatusId}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.effectiveDate}
                    name="effectiveDate"
                    disabled={false}
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    bind:selectedDate={$serviceInfoForm.effectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.effectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.effectiveDate}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.retirementBenefit}
                    dropdownType="label-left-full"
                    id="retirementBenefit"
                    label="Faedah Persaraan"
                    bind:value={$serviceInfoForm.retirementBenefit}
                    options={[{ value: 'kwsp', name: 'KWSP' }]}
                ></DropdownSelect>
                {#if $serviceInfoErrors.retirementBenefit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementBenefit}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.epfNumber}
                    name="epfNumber"
                    label={'No. KWSP'}
                    bind:value={$serviceInfoForm.epfNumber}
                ></TextField>
                {#if $serviceInfoErrors.epfNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.epfNumber}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.socsoNumber}
                    name="socsoNumber"
                    label={'No. SOCSO'}
                    bind:value={$serviceInfoForm.socsoNumber}
                ></TextField>
                {#if $serviceInfoErrors.socsoNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.socsoNumber}</span
                    >
                {/if}
                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.incomeNumber}
                    name="incomeNumber"
                    label={'No. Cukai'}
                    bind:value={$serviceInfoForm.incomeNumber}
                ></TextField>
                {#if $serviceInfoErrors.incomeNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.incomeNumber}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.bankName}
                    name="bankName"
                    label={'Bank'}
                    bind:value={$serviceInfoForm.bankName}
                ></TextField>
                {#if $serviceInfoErrors.bankName}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankName}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.bankAccount}
                    name="bankAccount"
                    label={'No. Akaun'}
                    bind:value={$serviceInfoForm.bankAccount}
                ></TextField>
                {#if $serviceInfoErrors.bankAccount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.bankAccount}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.eligibleLeaveCount}
                    name="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    bind:value={$serviceInfoForm.eligibleLeaveCount}
                ></TextField>
                {#if $serviceInfoErrors.eligibleLeaveCount}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.eligibleLeaveCount}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.civilServiceStartDate}
                    name="civilServiceStartDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    bind:selectedDate={$serviceInfoForm.civilServiceStartDate}
                ></DateSelector>
                {#if $serviceInfoErrors.civilServiceStartDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.civilServiceStartDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.firstServiceDate}
                    name="firstServiceDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstServiceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.serviceDate}
                    name="serviceDate"
                    disabled={false}
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    bind:selectedDate={$serviceInfoForm.serviceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.serviceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.serviceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.firstConfirmServiceDate}
                    name="firstConfirmServiceDate"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    bind:selectedDate={$serviceInfoForm.firstConfirmServiceDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstConfirmServiceDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstConfirmServiceDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.confirmDate}
                    name="confirmDate"
                    disabled={false}
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    bind:selectedDate={$serviceInfoForm.confirmDate}
                ></DateSelector>
                {#if $serviceInfoErrors.confirmDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.confirmDate}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.firstEffectiveDate}
                    name="firstEffectiveDate"
                    disabled={false}
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    bind:selectedDate={$serviceInfoForm.firstEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.firstEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.firstEffectiveDate}</span
                    >
                {/if}
                <DateSelector
                    hasError={!!$serviceInfoErrors.newRecruitEffectiveDate}
                    name="newRecruitEffectiveDate"
                    disabled={false}
                    label={'Tarikh Lantikan Baru'}
                    bind:selectedDate={$serviceInfoForm.newRecruitEffectiveDate}
                ></DateSelector>
                {#if $serviceInfoErrors.newRecruitEffectiveDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.newRecruitEffectiveDate}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.pensionNumber}
                    name="pensionNumber"
                    label={'Nombor Pencen'}
                    bind:value={$serviceInfoForm.pensionNumber}
                ></TextField>
                {#if $serviceInfoErrors.pensionNumber}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.pensionNumber}</span
                    >
                {/if}

                <DropdownSelect
                    hasError={!!$serviceInfoErrors.revisionMonth}
                    dropdownType="label-left-full"
                    id="revisionMonth"
                    label="Bulan KGT"
                    bind:value={$serviceInfoForm.revisionMonth}
                    options={[{ value: 'Januari', name: 'Januari' }]}
                ></DropdownSelect>

                {#if $serviceInfoErrors.revisionMonth}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.revisionMonth}</span
                    >
                {/if}

                <TextField
                    disabled={false}
                    hasError={!!$serviceInfoErrors.kgt}
                    name="kgt"
                    type="number"
                    label={'KGT'}
                    bind:value={$serviceInfoForm.kgt}
                ></TextField>
                {#if $serviceInfoErrors.kgt}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.kgt}</span
                    >
                {/if}

                <DateSelector
                    hasError={!!$serviceInfoErrors.retirementDate}
                    name="retirementDate"
                    disabled={false}
                    label={'Tarikh Bersara'}
                    bind:selectedDate={$serviceInfoForm.retirementDate}
                ></DateSelector>
                {#if $serviceInfoErrors.retirementDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementDate}</span
                    >
                {/if}

                <p class={stepperFormTitleClass}>
                    Maklumat Gaji dan Elaun - Elaun
                </p>
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <!-- <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.salaryDateOfEffect}
                            name="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            bind:value={'12/12/2021'}
                        ></TextField>
                        {#if $serviceInfoErrors.salaryDateOfEffect}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.salaryDateOfEffect}</span
                            >
                        {/if} -->
                        <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.maximumSalary}
                            name="maximumSalary"
                            label={'Tangga Gaji'}
                            bind:value={$serviceInfoForm.maximumSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.maximumSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.maximumSalary}</span
                            >
                        {/if}

                        <TextField
                            disabled={false}
                            hasError={!!$serviceInfoErrors.baseSalary}
                            name="baseSalary"
                            label={'Gaji Pokok'}
                            bind:value={$serviceInfoForm.baseSalary}
                        ></TextField>
                        {#if $serviceInfoErrors.baseSalary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.baseSalary}</span
                            >
                        {/if}
                    </div>
                    <div class="space-y-2.5">
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itka"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.itka}
                            name="itka"
                            label={'ITKA'}
                            bind:value={$serviceInfoForm.itka}
                        ></TextField>
                        {#if $serviceInfoErrors.itka}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itka}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-itp"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.itp}
                            name="itp"
                            label={'ITP'}
                            bind:value={$serviceInfoForm.itp}
                        ></TextField>
                        {#if $serviceInfoErrors.itp}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.itp}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-epw"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.epw}
                            name="epw"
                            label={'EPW'}
                            bind:value={$serviceInfoForm.epw}
                        ></TextField>
                        {#if $serviceInfoErrors.epw}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.epw}</span
                            >
                        {/if}
                        <TextField
                            hasTooltip={true}
                            toolTipID="type-cola"
                            disabled={false}
                            hasError={!!$serviceInfoErrors.cola}
                            name="cola"
                            label={'COLA'}
                            bind:value={$serviceInfoForm.cola}
                        ></TextField>
                        {#if $serviceInfoErrors.cola}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.cola}</span
                            >
                        {/if}
                        <!-- Tooltip body -->
                        <!-- <Tooltip
                            type="dark"
                            triggeredBy="[id^='type-']"
                            on:show={assignContent}>"{tooltipContent}"</Tooltip
                        > -->
                    </div>
                </div>
            </form>
        </StepperContentBody>
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
            options={data.majorMinorSelectOptions}
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
            options={data.countrySelectOptions}
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
            options={data.institutionSelectOptions}
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
            options={data.educationSelectOptions}
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
            options={data.sponsorshipSelectOptions}
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
            hasError={!!$addExperienceModalErrors.company}
            name="addCompany"
            label={'Nama Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.company}
        ></TextField>
        {#if $addExperienceModalErrors.company}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.company}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.address}
            name="addAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addExperienceModalForm.address}
        ></TextField>
        {#if $addExperienceModalErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.address}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.position}
            name="addPosition"
            label={'Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.position}
        ></TextField>
        {#if $addExperienceModalErrors.position}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.position}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.positionCode}
            name="addPositionCode"
            label={'Kod Jawatan (jika ada)'}
            type="text"
            bind:value={$addExperienceModalForm.positionCode}
        ></TextField>

        <DateSelector
            {disabled}
            hasError={!!$addExperienceModalErrors.startDate}
            name="addStartDate"
            label={'Dari (tahun)'}
            bind:selectedDate={$addExperienceModalForm.startDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.startDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.startDate}</span
            >
        {/if}
        <DateSelector
            {disabled}
            hasError={!!$addExperienceModalErrors.endDate}
            name="addEndDate"
            label={'Hingga (tahun)'}
            bind:selectedDate={$addExperienceModalForm.endDate}
        ></DateSelector>
        {#if $addExperienceModalErrors.endDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.endDate}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addExperienceModalErrors.salary}
            name="addSalary"
            label={'Gaji'}
            type="text"
            bind:value={$addExperienceModalForm.salary}
        ></TextField>
        {#if $addExperienceModalErrors.salary}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addExperienceModalErrors.salary}</span
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
            name="addName"
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
            name="addJoinDate"
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
            name="addPosition"
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
            name="addDescription"
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
            hasError={!!$addFamilyErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addFamilyModal.name}
        ></TextField>
        {#if $addFamilyErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.name}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addFamilyModal.alternativeName}
        ></TextField>
        {#if $addFamilyErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.alternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addFamilyModal.identityDocumentColor}
        ></TextField>
        {#if $addFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addFamilyModal.identityDocumentNumber}
        ></TextField>
        {#if $addFamilyErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addFamilyErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addFamilyModal.address}
        ></LongTextField>
        {#if $addFamilyErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.address}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addFamilyModal.postcode}
        ></TextField>
        {#if $addFamilyErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.postcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addFamilyErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addFamilyModal.birthDate}
        ></DateSelector>
        {#if $addFamilyErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countrySelectOptions}
            bind:value={$addFamilyModal.birthCountryId}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateSelectOptions}
            bind:value={$addFamilyModal.birthStateId}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipSelectOptions}
            bind:value={$addFamilyModal.relationshipId}
        ></DropdownSelect>
        {#if $addFamilyErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationSelectOptions}
            bind:value={$addFamilyModal.educationLevelId}
        ></DropdownSelect>
        {#if $addFamilyErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceSelectOptions}
            bind:value={$addFamilyModal.raceId}
        ></DropdownSelect>
        {#if $addFamilyErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalitySelectOptions}
            bind:value={$addFamilyModal.nationalityId}
        ></DropdownSelect>
        {#if $addFamilyErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalSelectOptions}
            bind:value={$addFamilyModal.maritalId}
        ></DropdownSelect>
        {#if $addFamilyErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addFamilyErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderSelectOptions}
            bind:value={$addFamilyModal.genderId}
        ></DropdownSelect>
        {#if $addFamilyErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.genderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addFamilyModal.workAddress}
        ></TextField>
        {#if $addFamilyErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.workAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addFamilyModal.workPostcode}
        ></TextField>
        {#if $addFamilyErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.workPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addFamilyErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addFamilyModal.phoneNumber}
        ></TextField>
        {#if $addFamilyErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addFamilyModal.marriageDate}
        ></DateSelector>
        {#if $addFamilyErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addFamilyModal.inSchool}
            />
        </div>
        {#if $addFamilyErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.inSchool}</span
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
            hasError={!!$addNonFamilyErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addNonFamilyModal.name}
        ></TextField>
        {#if $addNonFamilyErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.name}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNonFamilyModal.alternativeName}
        ></TextField>
        {#if $addNonFamilyErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.alternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addNonFamilyModal.identityDocumentColor}
        ></TextField>
        {#if $addNonFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addNonFamilyModal.identityDocumentNumber}
        ></TextField>
        {#if $addNonFamilyErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addNonFamilyErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNonFamilyModal.address}
        ></LongTextField>
        {#if $addNonFamilyErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.address}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNonFamilyModal.postcode}
        ></TextField>
        {#if $addNonFamilyErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.postcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNonFamilyErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addNonFamilyModal.birthDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countrySelectOptions}
            bind:value={$addNonFamilyModal.birthCountryId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateSelectOptions}
            bind:value={$addNonFamilyModal.birthStateId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipSelectOptions}
            bind:value={$addNonFamilyModal.relationshipId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationSelectOptions}
            bind:value={$addNonFamilyModal.educationLevelId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceSelectOptions}
            bind:value={$addNonFamilyModal.raceId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalitySelectOptions}
            bind:value={$addNonFamilyModal.nationalityId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalSelectOptions}
            bind:value={$addNonFamilyModal.maritalId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNonFamilyErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderSelectOptions}
            bind:value={$addNonFamilyModal.genderId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.genderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.workAddress}
        ></TextField>
        {#if $addNonFamilyErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.workAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNonFamilyModal.workPostcode}
        ></TextField>
        {#if $addNonFamilyErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.workPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNonFamilyErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNonFamilyModal.phoneNumber}
        ></TextField>
        {#if $addNonFamilyErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNonFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addNonFamilyModal.marriageDate}
        ></DateSelector>
        {#if $addNonFamilyErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNonFamilyModal.inSchool}
            />
        </div>
        {#if $addNonFamilyErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.inSchool}</span
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
            hasError={!!$addNextOfKinErrors.name}
            name="addName"
            label={'Nama'}
            type="text"
            bind:value={$addNextOfKinModal.name}
        ></TextField>
        {#if $addNextOfKinErrors.name}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.name}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.alternativeName}
            name="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:value={$addNextOfKinModal.alternativeName}
        ></TextField>
        {#if $addNextOfKinErrors.alternativeName}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.alternativeName}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            type="text"
            bind:value={$addNextOfKinModal.identityDocumentColor}
        ></TextField>
        {#if $addNextOfKinErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.identityDocumentNumber}
            name="addIdentityDocumentNumber"
            label={'Nombor Kad Pengenalan'}
            type="text"
            bind:value={$addNextOfKinModal.identityDocumentNumber}
        ></TextField>
        {#if $addNextOfKinErrors.identityDocumentNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.identityDocumentNumber}</span
            >
        {/if}

        <LongTextField
            {disabled}
            hasError={!!$addNextOfKinErrors.address}
            name="addAddress"
            label={'Alamat'}
            bind:value={$addNextOfKinModal.address}
        ></LongTextField>
        {#if $addNextOfKinErrors.address}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.address}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.postcode}
            name="addPostcode"
            label={'Poskod'}
            type="text"
            bind:value={$addNextOfKinModal.postcode}
        ></TextField>
        {#if $addNextOfKinErrors.postcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.postcode}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNextOfKinErrors.birthDate}
            name="addBirthDate"
            label={'Tarikh Lahir'}
            bind:selectedDate={$addNextOfKinModal.birthDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.birthDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthDate}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countrySelectOptions}
            bind:value={$addNextOfKinModal.birthCountryId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateSelectOptions}
            bind:value={$addNextOfKinModal.birthStateId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipSelectOptions}
            bind:value={$addNextOfKinModal.relationshipId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationSelectOptions}
            bind:value={$addNextOfKinModal.educationLevelId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceSelectOptions}
            bind:value={$addNextOfKinModal.raceId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalitySelectOptions}
            bind:value={$addNextOfKinModal.nationalityId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalSelectOptions}
            bind:value={$addNextOfKinModal.maritalId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            {disabled}
            hasError={!!$addNextOfKinErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderSelectOptions}
            bind:value={$addNextOfKinModal.genderId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.genderId}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.workAddress}
            name="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.workAddress}
        ></TextField>
        {#if $addNextOfKinErrors.workAddress}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.workAddress}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.workPostcode}
            name="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:value={$addNextOfKinModal.workPostcode}
        ></TextField>
        {#if $addNextOfKinErrors.workPostcode}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.workPostcode}</span
            >
        {/if}

        <TextField
            {disabled}
            hasError={!!$addNextOfKinErrors.phoneNumber}
            name="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:value={$addNextOfKinModal.phoneNumber}
        ></TextField>
        {#if $addNextOfKinErrors.phoneNumber}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.phoneNumber}</span
            >
        {/if}

        <DateSelector
            {disabled}
            hasError={!!$addNextOfKinErrors.marriageDate}
            name="addMarriageDate"
            label={'Pekerjaan (Jika Ada)'}
            bind:selectedDate={$addNextOfKinModal.marriageDate}
        ></DateSelector>
        {#if $addNextOfKinErrors.marriageDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.marriageDate}</span
            >
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                name="addInSchool"
                bind:checked={$addNextOfKinModal.inSchool}
            />
        </div>
        {#if $addNextOfKinErrors.inSchool}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.inSchool}</span
            >
        {/if}

        <TextIconButton primary label={'Simpan'} form="addNextOfKinInfoModal" />
    </form>
</Modal>
