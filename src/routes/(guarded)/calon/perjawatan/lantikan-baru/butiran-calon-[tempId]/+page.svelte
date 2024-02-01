<script lang="ts">
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { Modal } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { Tooltip } from 'flowbite-svelte';
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
    import StepperOtherRolesResult from '$lib/components/stepper-conditional-rules/StepperOtherRolesResult.svelte';
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
        _submitAcademicInfoForm,
        _submitActivityInfoForm,
        _submitDependencyInfoForm,
        _submitDocumentInfoForm,
        _submitExperienceInfoForm,
        _submitFamilyInfoForm,
        _submitNextOfKinInfoForm,
        _submitPersonalInfoForm,
    } from './+page';
    import {
        dateProxy,
        superForm,
        superValidate,
    } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import { getErrorToast } from '$lib/services/core/toast/toast-service';
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
    import StepperUneditable from '$lib/components/stepper-conditional-rules/StepperUneditable.svelte';
    import StepperNextStep from '$lib/components/stepper-conditional-rules/StepperNextStep.svelte';
    import {
        approveOptions,
        certifyOptions,
        commonOptions,
        supportOptions,
    } from '$lib/constants/mypsm/radio-option-constants';
    import { writable } from 'svelte/store';
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
    const isSuccessPersonalFormResponse = writable<boolean>();
    const isReadonlyPersonalFormStepper = writable<boolean>();
    const isSuccessAcademicFormResponse = writable<boolean>();
    const isReadonlyAcademicFormStepper = writable<boolean>();

    $: {
        isSuccessPersonalFormResponse.set(
            !!(
                data.personalDetailResponse.status >= 200 &&
                data.personalDetailResponse.status <= 201
            ),
        );
        isReadonlyPersonalFormStepper.set(
            data.personalDetailResponse?.data?.isReadonly,
        );

        isSuccessAcademicFormResponse.set(
            !!(
                data.academicInfoResponse.status >= 200 &&
                data.academicInfoResponse.status <= 201
            ),
        );
        isReadonlyAcademicFormStepper.set(
            data.academicInfoResponse?.data?.isReadonly,
        );
    }

    const isSuccessExperienceFormResponse: boolean =
        data.experienceInfoResponse.status >= 200 &&
        data.experienceInfoResponse.status <= 201;
    const isReadonlyExperienceFormStepper: boolean =
        data.experienceInfoResponse?.data?.isReadonly;

    const isSuccessActivityFormResponse: boolean =
        data.activityInfoResponse.status >= 200 &&
        data.activityInfoResponse.status <= 201;
    const isReadonlyActivityFormStepper: boolean =
        data.activityInfoResponse?.data?.isReadonly;

    const isSuccessFamilyFormResponse: boolean =
        data.familyInfoResponse.status >= 200 &&
        data.familyInfoResponse.status <= 201;
    const isReadonlyFamilyFormStepper: boolean =
        data.familyInfoResponse?.data?.isReadonly;

    const isSuccessDependencyFormResponse: boolean =
        data.dependencyInfoResponse.status >= 200 &&
        data.dependencyInfoResponse.status <= 201;
    const isReadonlyDependencyFormStepper: boolean =
        data.dependencyInfoResponse?.data?.isReadonly;

    const isSuccessNextOfKinFormResponse: boolean =
        data.nextOfKinInfoResponse.status >= 200 &&
        data.nextOfKinInfoResponse.status <= 201;
    const isReadonlyNextOfKinFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.isReadonly;

    const isSuccessDocumentFormResponse: boolean =
        data.documentInfoResponse.status >= 200 &&
        data.documentInfoResponse.status <= 201;
    const isReadonlyDocumentFormStepper: boolean =
        data.documentInfoResponse?.data?.isReadonly;

    const isSuccessServiceFormResponse: boolean =
        data.serviceResponse.status >= 200 &&
        data.serviceResponse.status <= 201;
    const isReadonlyServiceFormStepper: boolean =
        data.serviceResponse?.data?.isReadonly;

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
    });

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    // $: $form.employeePosition = data.positionLookup.find((position)=>
    // position. === $form.employeeNumber)?.;

    export const { form, errors, enhance, reset, restore } = superForm(
        data.personalInfoForm,
        {
            SPA: true,
            invalidateAll: true,
            resetForm: false,
            validators: _personalInfoForm,
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
            onSubmit() {
                _submitPersonalInfoForm($form);
            },
        },
    );
    const proxyBirthDate = dateProxy(form, 'birthDate', { format: 'date' });
    const proxyPropertyDeclarationDate = dateProxy(
        form,
        'propertyDeclarationDate',
        { format: 'date' },
    );

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
        const tempData = tempNextOfKinFromFamily.map((tempData) => ({
            birthCountryId: Number(tempData.birthCountryId),
            birthStateId: Number(tempData.birthStateId),
            relationshipId: Number(tempData.relationshipId),
            educationLevelId: Number(tempData.educationLevelId),
            raceId: Number(tempData.raceId),
            nationalityId: Number(tempData.nationalityId),
            maritalId: Number(tempData.maritalId),
            genderId: Number(tempData.genderId),
            name: tempData.name,
            alternativeName: tempData.alternativeName,
            identityDocumentColor: tempData.identityDocumentColor,
            identityDocumentNumber: tempData.identityDocumentNumber,
            address: tempData.address,
            postcode: tempData.postcode,
            birthDate: new Date(tempData.birthDate),
            workAddress: tempData.workAddress,
            workPostcode: tempData.workPostcode,
            phoneNumber: tempData.phoneNumber,
            marriageDate: new Date(tempData.marriageDate),
            inSchool: tempData.inSchool,
        }));

        tempNextOfKinRecord = [
            ...tempNextOfKinRecord,
            ...tempData,
        ] as NextOfKinList[];
        _submitNextOfKinInfoForm(tempNextOfKinRecord);
    };

    const triggerSubmitDocumentData = () => {
        _submitDocumentInfoForm();
    };

    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        invalidateAll: true,
        resetForm: true,
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

    const proxyAcademicCompletionDate = dateProxy(
        addAcademicInfoModal,
        'completionDate',
        { format: 'date' },
    );

    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        invalidateAll: true,
        resetForm: false,
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
        invalidateAll: true,
        resetForm: false,
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
        invalidateAll: true,
        resetForm: false,
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
        id: 'addNonFamilyForm',
        SPA: true,
        invalidateAll: true,
        resetForm: false,
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
        id: 'addNextOfKinForm',
        SPA: true,
        invalidateAll: true,
        resetForm: false,
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
            {#if !$isReadonlyPersonalFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperMaklumatPeribadi"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {:else}
                <StepperNextStep />
            {/if}
        </StepperContentHeader>
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
                    disabled={$isReadonlyPersonalFormStepper}
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
                    disabled={$isReadonlyPersonalFormStepper}
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
                    disabled={$isReadonlyPersonalFormStepper}
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
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.titleId}
                    dropdownType="label-left-full"
                    id="titleId"
                    name="titleId"
                    label="Gelaran"
                    bind:value={$form.titleId}
                    options={data.titleLookup}
                ></DropdownSelect>
                {#if $errors.titleId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.titleId}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.identityDocumentColor}
                    dropdownType="label-left-full"
                    id="identityDocumentColor"
                    name="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    options={data.identityCardColorLookup}
                    bind:value={$form.identityDocumentColor}
                ></DropdownSelect>
                {#if $errors.identityDocumentColor}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.identityDocumentColor}</span
                    >
                {/if}

                <DateSelector
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.birthDate}
                    name="birthDate"
                    handleDateChange
                    label="Tarikh Lahir"
                    bind:selectedDate={$proxyBirthDate}
                ></DateSelector>
                {#if $errors?.birthDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors?.birthDate}</span
                    >
                {/if}
                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.birthStateId}
                    dropdownType="label-left-full"
                    id="birthStateId"
                    name="birthStateId"
                    label="Tempat Lahir"
                    bind:value={$form.birthStateId}
                    options={data.stateLookup}
                ></DropdownSelect>
                {#if $errors.birthStateId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthStateId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.birthCountryId}
                    dropdownType="label-left-full"
                    id="birthCountryId"
                    name="birthCountryId"
                    label="Negara Dilahirkan"
                    bind:value={$form.birthCountryId}
                    options={data.countryLookup}
                ></DropdownSelect>
                {#if $errors.birthCountryId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.birthCountryId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.nationalityId}
                    dropdownType="label-left-full"
                    id="nationalityId"
                    name="nationalityId"
                    label="Warganegara"
                    bind:value={$form.nationalityId}
                    options={data.nationalityLookup}
                ></DropdownSelect>
                {#if $errors.nationalityId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.nationalityId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.raceId}
                    dropdownType="label-left-full"
                    id="raceId"
                    name="raceId"
                    label="Bangsa"
                    bind:value={$form.raceId}
                    options={data.raceLookup}
                ></DropdownSelect>
                {#if $errors.raceId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.raceId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.ethnicId}
                    dropdownType="label-left-full"
                    id="ethnicId"
                    name="ethnicId"
                    label="Etnik"
                    bind:value={$form.ethnicId}
                    options={data.ethnicityLookup}
                ></DropdownSelect>
                {#if $errors.ethnicId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.ethnicId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.religionId}
                    dropdownType="label-left-full"
                    id="religionId"
                    name="religionId"
                    label="Agama"
                    bind:value={$form.religionId}
                    options={data.religionLookup}
                ></DropdownSelect>
                {#if $errors.religionId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.religionId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.genderId}
                    dropdownType="label-left-full"
                    id="genderId"
                    name="genderId"
                    label="Jantina"
                    bind:value={$form.genderId}
                    options={data.genderLookup}
                ></DropdownSelect>
                {#if $errors.genderId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.genderId}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.maritalId}
                    dropdownType="label-left-full"
                    id="maritalId"
                    label="Status Perkahwinan"
                    bind:value={$form.maritalId}
                    options={data.maritalLookup}
                ></DropdownSelect>
                {#if $errors.maritalId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.maritalId}</span
                    >
                {/if}

                <TextField
                    disabled={$isReadonlyPersonalFormStepper}
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
                    disabled={$isReadonlyPersonalFormStepper}
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
                <DropdownSelect
                    hasError={!!$errors.homeCountryId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="homeCountryId"
                    name="homeCountryId"
                    label="Negara"
                    options={data.countryLookup}
                    bind:value={$form.homeCountryId}
                />
                {#if $errors.homeCountryId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeCountryId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$errors.homeStateId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="homeStateId"
                    name="homeStateId"
                    label="Negeri"
                    options={data.stateLookup}
                    bind:value={$form.homeStateId}
                />
                {#if $errors.homeStateId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeStateId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$errors.homeCityId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="homeStateId"
                    name="homeCityId"
                    label="Bandar"
                    options={data.cityLookup}
                    bind:value={$form.homeCityId}
                />
                {#if $errors.homeCityId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homeCityId}</span
                    >
                {/if}
                <TextField
                    hasError={!!$errors.homePostcode}
                    disabled={$isReadonlyPersonalFormStepper}
                    name="homePostcode"
                    label="Poskod Rumah"
                    bind:value={$form.homePostcode}
                />
                {#if $errors.homePostcode}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.homePostcode}</span
                    >
                {/if}

                <LongTextField
                    hasError={!!$errors.mailAddress}
                    disabled={$isReadonlyPersonalFormStepper}
                    name="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:value={$form.mailAddress}
                />
                {#if $errors.mailAddress}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailAddress}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$errors.mailCountryId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="mailCountryId"
                    name="mailCountryId"
                    label="Negara Surat Menyurat"
                    options={data.countryLookup}
                    bind:value={$form.mailCountryId}
                />
                {#if $errors.mailCountryId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailCountryId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$errors.mailStateId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="mailStateId"
                    name="mailStateId"
                    label="Negeri Surat Menyurat"
                    options={data.stateLookup}
                    bind:value={$form.mailStateId}
                />
                {#if $errors.mailStateId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailStateId}</span
                    >
                {/if}
                <DropdownSelect
                    hasError={!!$errors.mailCityId}
                    disabled={$isReadonlyPersonalFormStepper}
                    dropdownType="label-left-full"
                    id="mailStateId"
                    name="mailCityId"
                    label="Bandar Surat Menyurat"
                    options={data.cityLookup}
                    bind:value={$form.mailCityId}
                />
                {#if $errors.mailCityId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailCityId}</span
                    >
                {/if}
                <TextField
                    hasError={!!$errors.mailPostcode}
                    disabled={$isReadonlyPersonalFormStepper}
                    name="mailPostcode"
                    label="Poskod Surat Menyurat"
                    bind:value={$form.mailPostcode}
                />
                {#if $errors.mailPostcode}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.mailPostcode}</span
                    >
                {/if}

                <DropdownSelect
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.assetDeclarationStatusId}
                    dropdownType="label-left-full"
                    name="assetDeclarationStatusId"
                    label="Status Pengikstiharan Harta"
                    options={data.assetDeclarationLookup}
                    bind:value={$form.assetDeclarationStatusId}
                ></DropdownSelect>
                {#if $errors.assetDeclarationStatusId}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.assetDeclarationStatusId}</span
                    >
                {/if}

                <DateSelector
                    disabled={$isReadonlyPersonalFormStepper}
                    hasError={!!$errors.propertyDeclarationDate}
                    name="propertyDeclarationDate"
                    handleDateChange
                    label="Tarikh Pengikstiharan Harta"
                    bind:selectedDate={$proxyPropertyDeclarationDate}
                ></DateSelector>
                {#if $errors.propertyDeclarationDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.propertyDeclarationDate}</span
                    >
                {/if}

                <RadioSingle
                    name="isExPoliceOrSoldier"
                    disabled={$isReadonlyPersonalFormStepper}
                    options={commonOptions}
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
                        options={commonOptions}
                        disabled={$isReadonlyPersonalFormStepper}
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isInternalRelationship}
                    ></RadioSingle>
                    <!-- {#if $form.isInternalRelationship} -->
                    <DropdownSelect
                        disabled={$isReadonlyPersonalFormStepper}
                        hasError={!!$errors.employeeNumber}
                        dropdownType="label-left-full"
                        id="employeeNumber"
                        label="No. Pekerja LKIM"
                        bind:value={$form.employeeNumber}
                        options={data.employeeListLookup}
                    ></DropdownSelect>
                    {#if $errors.employeeNumber}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.employeeNumber[0]}</span
                        >
                    {/if}

                    <TextField
                        disabled={$isReadonlyPersonalFormStepper}
                        hasError={!!$errors.employeeName}
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

                    <TextField
                        disabled={$isReadonlyPersonalFormStepper}
                        hasError={!!$errors.employeePosition}
                        name="employeePosition"
                        label={'Jawatan Kakitangan LKIM'}
                        type="text"
                        bind:value={$form.employeePosition}
                    ></TextField>

                    {#if $errors.employeePosition}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.employeePosition}</span
                        >
                    {/if}

                    <DropdownSelect
                        disabled={$isReadonlyPersonalFormStepper}
                        hasError={!!$errors.relationshipId}
                        dropdownType="label-left-full"
                        id="relationshipId"
                        label="Hubungan"
                        bind:value={$form.relationshipId}
                        options={data.relationshipLookup}
                    ></DropdownSelect>
                    {#if $errors.relationshipId}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.relationshipId}</span
                        >
                    {/if}
                    <!-- {/if} -->
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
        >
            {#if !$isReadonlyAcademicFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => triggerSubmitAcademicTempData()}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {:else}
                <StepperNextStep />
            {/if}
        </StepperContentHeader>

        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#if isSuccessAcademicFormResponse}
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
                    {#each data.academicInfoResponse.data.academicList as academic, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
                            <div
                                class="mb-5 mt-2.5 text-sm text-system-primary"
                            >
                                <p>Maklumat Akademik #{i + 1}</p>
                            </div>
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
                        </div>
                    {/each}
                    {#if !$isReadonlyAcademicFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                primary
                                label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                                onClick={() => (openAcademicInfoModal = true)}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                    {:else if data.academicInfoResponse.data.academicList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            {#if !isReadonlyExperienceFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => triggerSubmitExperienceTempData()}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                {#if isSuccessExperienceFormResponse}
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
                    {#each data.experienceInfoResponse.data.experienceList as record, i}
                        <div class="space-y-2.5 rounded-[3px] border p-2.5">
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
                        </div>
                    {/each}
                    {#if !isReadonlyExperienceFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
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
                    {:else if data.experienceInfoResponse.data.experienceList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
            {#if !isReadonlyActivityFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => triggerSubmitActivityTempData()}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessActivityFormResponse}
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
                    <DynamicTable
                        tableItems={data.activityInfoResponse.data.activityList}
                    ></DynamicTable>
                    {#if !isReadonlyActivityFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                primary
                                label="Tambah Kegiatan/Keahlian"
                                onClick={() => {
                                    openMembershipInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                    {:else if data.activityInfoResponse.data.activityList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            {#if !isReadonlyFamilyFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => {
                        triggerSubmitFamilyTempData();
                    }}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessFamilyFormResponse}
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
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                    {#if !isReadonlyFamilyFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                primary
                                label="Tambah Maklumat Keluarga"
                                onClick={() => {
                                    openFamilyInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                    {:else if data.familyInfoResponse.data.dependenciesList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Suami/Isteri dan Anak"
        >
            {#if !isReadonlyDependencyFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => {
                        triggerSubmitDependencyTempData();
                    }}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isSuccessDependencyFormResponse}
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
                                        {i + 1}. Maklumat Selain Suami/Isteri
                                        dan Anak - {nonFamily.name}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    <DynamicTable
                        tableItems={data.dependencyInfoResponse.data
                            .dependenciesList}
                    ></DynamicTable>
                    {#if !isReadonlyDependencyFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                primary
                                label="Tambah Tanggungan Selain Isteri dan Anak"
                                onClick={() => {
                                    openNonFamilyInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                    {:else if data.dependencyInfoResponse.data.dependenciesList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            {#if !isReadonlyNextOfKinFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => triggerSubmitNextOfKinTempData()}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2 overflow-y-auto">
                {#if !isReadonlyNextOfKinFormStepper}
                    <SectionHeader title="Pilih Waris Daripada Ahli Keluarga"
                    ></SectionHeader>
                    <DynamicTable
                        tableItems={data.familyInfoResponse.data
                            .dependenciesList}
                        hasCheckbox
                        bind:checkedItems={tempNextOfKinFromFamily}
                    ></DynamicTable>
                {/if}
            </div>
            <div class="flex w-full flex-col gap-2 overflow-y-auto">
                {#if isSuccessNextOfKinFormResponse}
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

                    <DynamicTable
                        tableItems={data.nextOfKinInfoResponse.data
                            .nextOfKinList}
                    ></DynamicTable>
                    {#if !isReadonlyNextOfKinFormStepper}
                        <div
                            class="w-full rounded-[3px] border-b border-t p-2.5"
                        >
                            <TextIconButton
                                primary
                                label="Tambah Waris"
                                onClick={() => {
                                    openNextOfKinInfoModal = true;
                                }}
                            >
                                <SvgPlus></SvgPlus>
                            </TextIconButton>
                        </div>
                    {:else if data.nextOfKinInfoResponse.data.nextOfKinList.length < 1}
                        <StepperUneditable />
                    {/if}
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan">
            {#if !isReadonlyDocumentFormStepper}
                <TextIconButton
                    primary
                    label="Simpan"
                    onClick={() => {
                        triggerSubmitDocumentData();
                    }}
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            {/if}
        </StepperContentHeader>
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
                {#if !isReadonlyDocumentFormStepper}
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
                        <span
                            class="font-sans text-sm italic text-system-danger"
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
                {:else}
                    <StepperUneditable />
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    {#if !isReadonlyDocumentFormStepper}
        <StepperContent>
            <StepperContentHeader title="Kemaskini Lantikan Baru"
            ></StepperContentHeader>
            <StepperContentBody>
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <div class="flex w-full flex-col gap-2.5">
                    <!-- <input hidden bind:value={data.serviceResponse.data.candidateId} /> -->
                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="gradeId"
                        label="Gred Semasa"
                        bind:value={data.serviceResponse.data.gradeId}
                        options={data.gradeLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="maxGradeId"
                        label="Gred Maksimum"
                        bind:value={data.serviceResponse.data.maxGradeId}
                        options={data.gradeLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="positionId"
                        label="Jawatan"
                        bind:value={data.serviceResponse.data.positionId}
                        options={data.positionLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="placementId"
                        label="Penempatan"
                        bind:value={data.serviceResponse.data.placementId}
                        options={data.placementLookup}
                    ></DropdownSelect>
                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="serviceTypeId"
                        label="Taraf Perkhidmatan"
                        bind:value={data.serviceResponse.data.serviceTypeId}
                        options={data.educationLookup}
                    ></DropdownSelect>

                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="serviceGroupId"
                        label="Kumpulan Perkhidmatan"
                        bind:value={data.serviceResponse.data.serviceGroupId}
                        options={data.serviceGroupLookup}
                    ></DropdownSelect>

                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="unitId"
                        label="Unit Perkhidmatan"
                        bind:value={data.serviceResponse.data.unitId}
                        options={data.unitLookup}
                    ></DropdownSelect>

                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="employmentStatusId"
                        label="Status Perkhidmatan"
                        bind:value={data.serviceResponse.data
                            .employmentStatusId}
                        options={data.serviceTypeLookup}
                    ></DropdownSelect>

                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="effectiveDate"
                        label={'Tarikh Kuatkuasa Lantikan Semasa'}
                        bind:selectedDate={data.serviceResponse.data
                            .effectiveDate}
                    ></DateSelector>

                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="retirementBenefit"
                        label="Faedah Persaraan"
                        bind:value={data.serviceResponse.data.retirementBenefit}
                        options={data.retirementBenefitLookup}
                    ></DropdownSelect>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="epfNumber"
                        label={'No. KWSP'}
                        bind:value={data.serviceResponse.data.epfNumber}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="socsoNumber"
                        label={'No. SOCSO'}
                        bind:value={data.serviceResponse.data.socsoNumber}
                    ></TextField>
                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="incomeNumber"
                        label={'No. Cukai'}
                        bind:value={data.serviceResponse.data.incomeNumber}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="bankName"
                        label={'Bank'}
                        bind:value={data.serviceResponse.data.bankName}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="bankAccount"
                        label={'No. Akaun'}
                        bind:value={data.serviceResponse.data.bankAccount}
                    ></TextField>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        bind:value={data.serviceResponse.data
                            .eligibleLeaveCount}
                    ></TextField>

                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="civilServiceStartDate"
                        label={'Mula Dilantik Perkhidmatan Kerajaan'}
                        bind:selectedDate={data.serviceResponse.data
                            .civilServiceStartDate}
                    ></DateSelector>
                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="firstServiceDate"
                        label={'Mula Dilantik Perkhidmatan LKIM'}
                        bind:selectedDate={data.serviceResponse.data
                            .firstServiceDate}
                    ></DateSelector>
                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="serviceDate"
                        label={'Mula Dilantik Perkhidmatan Sekarang'}
                        bind:selectedDate={data.serviceResponse.data
                            .serviceDate}
                    ></DateSelector>
                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="firstConfirmServiceDate"
                        label={'Disahkan Dalam Jawatan Pertama LKIM'}
                        bind:selectedDate={data.serviceResponse.data
                            .firstConfirmServiceDate}
                    ></DateSelector>
                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="confirmDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        bind:selectedDate={data.serviceResponse.data
                            .confirmDate}
                    ></DateSelector>

                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="firstEffectiveDate"
                        label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                        bind:selectedDate={data.serviceResponse.data
                            .firstEffectiveDate}
                    ></DateSelector>
                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="newRecruitEffectiveDate"
                        label={'Tarikh Lantikan Baru'}
                        bind:selectedDate={data.serviceResponse.data
                            .newRecruitEffectiveDate}
                    ></DateSelector>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="pensionNumber"
                        label={'Nombor Pencen'}
                        bind:value={data.serviceResponse.data.pensionNumber}
                    ></TextField>

                    <DropdownSelect
                        disabled={isReadonlyServiceFormStepper}
                        dropdownType="label-left-full"
                        id="revisionMonth"
                        label="Bulan KGT"
                        bind:value={data.serviceResponse.data.revisionMonth}
                        options={data.monthStringLookup}
                    ></DropdownSelect>

                    <TextField
                        disabled={isReadonlyServiceFormStepper}
                        name="kgt"
                        type="number"
                        label={'KGT'}
                        bind:value={data.serviceResponse.data.kgt}
                    ></TextField>

                    <DateSelector
                        disabled={isReadonlyServiceFormStepper}
                        name="retirementDate"
                        label={'Tarikh Bersara'}
                        bind:selectedDate={data.serviceResponse.data
                            .retirementDate}
                    ></DateSelector>

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <TextField
                                disabled={isReadonlyServiceFormStepper}
                                name="maximumSalary"
                                label={'Tangga Gaji'}
                                bind:value={data.serviceResponse.data
                                    .maximumSalary}
                            ></TextField>

                            <TextField
                                disabled={isReadonlyServiceFormStepper}
                                name="baseSalary"
                                label={'Gaji Pokok'}
                                bind:value={data.serviceResponse.data
                                    .baseSalary}
                            ></TextField>
                        </div>
                        <div class="space-y-2.5">
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-itka"
                                disabled={isReadonlyServiceFormStepper}
                                name="itka"
                                label={'ITKA'}
                                bind:value={data.serviceResponse.data.itka}
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-itp"
                                disabled={isReadonlyServiceFormStepper}
                                name="itp"
                                label={'ITP'}
                                bind:value={data.serviceResponse.data.itp}
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-epw"
                                disabled={isReadonlyServiceFormStepper}
                                name="epw"
                                label={'EPW'}
                                bind:value={data.serviceResponse.data.epw}
                            ></TextField>
                            <TextField
                                hasTooltip={true}
                                toolTipID="type-cola"
                                disabled={isReadonlyServiceFormStepper}
                                name="cola"
                                label={'COLA'}
                                bind:value={data.serviceResponse.data.cola}
                            ></TextField>
                            <!-- <Tooltip
                        type="dark"
                        triggeredBy="[id^='type-']"
                        on:show={assignContent}>"{tooltipContent}"</Tooltip
                    > -->
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan daripada Peranan - Peranan Lain"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary">Penyokong</b>
                        </div>
                        <TextField
                            disabled
                            type="text"
                            name="supporterName"
                            label="Nama"
                            bind:value={data.supporterResultResponse.data.name}
                        ></TextField>
                        {#if data.supporterResultResponse.data.isApproved}
                            <LongTextField
                                disabled
                                name="supporterRemark"
                                label="Tindakan/Ulasan"
                                bind:value={data.supporterResultResponse.data
                                    .remark}
                            ></LongTextField>
                            <RadioSingle
                                disabled
                                name="supporterIsApproved"
                                options={supportOptions}
                                legend={'Keputusan'}
                                bind:userSelected={data.supporterResultResponse
                                    .data.isApproved}
                            ></RadioSingle>
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary">Pelulus</b>
                        </div>
                        <TextField
                            disabled
                            type="text"
                            name="approverName"
                            label="Nama"
                            bind:value={data.approverResultResponse.data.name}
                        ></TextField>
                        {#if data.approverResultResponse.data.isApproved}
                            <LongTextField
                                disabled
                                name="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:value={data.approverResultResponse.data
                                    .remark}
                            ></LongTextField>
                            <RadioSingle
                                disabled
                                name="approverIsApproved"
                                options={approveOptions}
                                legend={'Keputusan'}
                                bind:userSelected={data.approverResultResponse
                                    .data.isApproved}
                            ></RadioSingle>
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >Urus Setia Perjawatan</b
                            >
                        </div>
                        <TextField
                            disabled
                            type="text"
                            name="service-secretary-name"
                            label="Nama"
                            bind:value={data.secretaryApprovalResponse.data
                                .name}
                        ></TextField>
                        {#if !!data.secretaryApprovalResponse.data.isApproved}
                            <LongTextField
                                disabled
                                name="service-secretary-remark"
                                label="Tindakan/Ulasan"
                                bind:value={data.secretaryApprovalResponse.data
                                    .remark}
                            ></LongTextField>
                            <RadioSingle
                                disabled
                                name="supporterIsApproved"
                                options={certifyOptions}
                                legend={'Keputusan'}
                                bind:userSelected={data
                                    .secretaryApprovalResponse.data.isApproved}
                            ></RadioSingle>
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    {/if}
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
            hasError={!!$addAcademicInfoErrors.majorId}
            name="majorId"
            dropdownType="label-left-full"
            label={'Jenis Jurusan'}
            options={data.majorMinorLookup}
            bind:value={$addAcademicInfoModal.majorId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.majorId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.majorId}</span
            >
        {/if}
        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.minorId}
            name="minorId"
            dropdownType="label-left-full"
            label={'Jenis Khusus'}
            options={data.majorMinorLookup}
            bind:value={$addAcademicInfoModal.minorId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.minorId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.minorId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.countryId}
            name="countryId"
            dropdownType="label-left-full"
            label={'Negara'}
            options={data.countryLookup}
            bind:value={$addAcademicInfoModal.countryId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.countryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.countryId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.institutionId}
            name="institutionId"
            dropdownType="label-left-full"
            label={'Institusi'}
            options={data.institutionLookup}
            bind:value={$addAcademicInfoModal.institutionId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.institutionId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.institutionId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.educationLevelId}
            name="educationLevelId"
            dropdownType="label-left-full"
            label={'Taraf Pembelajaran'}
            options={data.educationLookup}
            bind:value={$addAcademicInfoModal.educationLevelId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addAcademicInfoErrors.sponsorshipId}
            name="sponsorshipId"
            dropdownType="label-left-full"
            label={'Penajaan'}
            options={data.sponsorshipLookup}
            bind:value={$addAcademicInfoModal.sponsorshipId}
        ></DropdownSelect>
        {#if $addAcademicInfoErrors.sponsorshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.sponsorshipId}</span
            >
        {/if}

        <TextField
            hasError={!!$addAcademicInfoErrors.name}
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
            name="completionDate"
            label={'Tarikh Kelulusan'}
            bind:selectedDate={$proxyAcademicCompletionDate}
        ></DateSelector>
        {#if $addAcademicInfoErrors.completionDate}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addAcademicInfoErrors.completionDate}</span
            >
        {/if}
        <TextField
            hasError={!!$addAcademicInfoErrors.finalGrade}
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
            hasError={!!$addExperienceModalErrors.positionCode}
            name="addPositionCode"
            label={'Kod Jawatan'}
            type="text"
            bind:value={$addExperienceModalForm.positionCode}
        ></TextField>

        <DateSelector
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
        <DropdownSelect
            hasError={!!$addFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addFamilyModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
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
            hasError={!!$addFamilyErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addFamilyModal.birthCountryId}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addFamilyModal.birthStateId}
        ></DropdownSelect>
        {#if $addFamilyErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addFamilyModal.relationshipId}
        ></DropdownSelect>
        {#if $addFamilyErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addFamilyModal.educationLevelId}
        ></DropdownSelect>
        {#if $addFamilyErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addFamilyModal.raceId}
        ></DropdownSelect>
        {#if $addFamilyErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addFamilyModal.nationalityId}
        ></DropdownSelect>
        {#if $addFamilyErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addFamilyModal.maritalId}
        ></DropdownSelect>
        {#if $addFamilyErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addFamilyErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addFamilyModal.genderId}
        ></DropdownSelect>
        {#if $addFamilyErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addFamilyErrors.genderId}</span
            >
        {/if}

        <TextField
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
            hasError={!!$addFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
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
        <DropdownSelect
            hasError={!!$addNonFamilyErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addNonFamilyModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
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
            hasError={!!$addNonFamilyErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addNonFamilyModal.birthCountryId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addNonFamilyModal.birthStateId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addNonFamilyModal.relationshipId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addNonFamilyModal.educationLevelId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addNonFamilyModal.raceId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addNonFamilyModal.nationalityId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addNonFamilyModal.maritalId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNonFamilyErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addNonFamilyModal.genderId}
        ></DropdownSelect>
        {#if $addNonFamilyErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNonFamilyErrors.genderId}</span
            >
        {/if}

        <TextField
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
            hasError={!!$addNonFamilyErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
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
        <DropdownSelect
            hasError={!!$addNextOfKinErrors.identityDocumentColor}
            name="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            dropdownType="label-left-full"
            options={data.identityCardColorLookup}
            bind:value={$addNextOfKinModal.identityDocumentColor}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.identityDocumentColor}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.identityDocumentColor}</span
            >
        {/if}
        <TextField
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
            hasError={!!$addNextOfKinErrors.birthCountryId}
            name="addBirthCountryId"
            label={'Negara Kelahiran'}
            dropdownType="label-left-full"
            options={data.countryLookup}
            bind:value={$addNextOfKinModal.birthCountryId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthCountryId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthCountryId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.birthStateId}
            name="addBirthStateId"
            label={'Negeri Kelahiran'}
            dropdownType="label-left-full"
            options={data.stateLookup}
            bind:value={$addNextOfKinModal.birthStateId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.birthStateId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.birthStateId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.relationshipId}
            name="addRelationshipId"
            label={'Hubungan'}
            dropdownType="label-left-full"
            options={data.relationshipLookup}
            bind:value={$addNextOfKinModal.relationshipId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.relationshipId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.relationshipId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.educationLevelId}
            name="addEducationLevelId"
            label={'Taraf Pendidikan'}
            dropdownType="label-left-full"
            options={data.educationLookup}
            bind:value={$addNextOfKinModal.educationLevelId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.educationLevelId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.educationLevelId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.raceId}
            name="addRaceId"
            label={'Bangsa'}
            dropdownType="label-left-full"
            options={data.raceLookup}
            bind:value={$addNextOfKinModal.raceId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.raceId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.raceId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.nationalityId}
            name="addNationalityId"
            label={'Kewarganegaraan'}
            dropdownType="label-left-full"
            options={data.nationalityLookup}
            bind:value={$addNextOfKinModal.nationalityId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.nationalityId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.nationalityId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.maritalId}
            name="addMaritalId"
            label={'Status Perkhahwinan'}
            dropdownType="label-left-full"
            options={data.maritalLookup}
            bind:value={$addNextOfKinModal.maritalId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.maritalId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.maritalId}</span
            >
        {/if}

        <DropdownSelect
            hasError={!!$addNextOfKinErrors.genderId}
            name="addGenderId"
            label={'Jantina'}
            dropdownType="label-left-full"
            options={data.genderLookup}
            bind:value={$addNextOfKinModal.genderId}
        ></DropdownSelect>
        {#if $addNextOfKinErrors.genderId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addNextOfKinErrors.genderId}</span
            >
        {/if}

        <TextField
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
            hasError={!!$addNextOfKinErrors.marriageDate}
            name="addMarriageDate"
            label={'Tarikh Kahwin'}
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
