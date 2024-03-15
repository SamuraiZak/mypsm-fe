<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { dateProxy, superValidate } from 'sveltekit-superforms/client';

    import type { PageData } from './$types';

    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { Checkbox, Modal } from 'flowbite-svelte';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import type { RadioDTO } from '$lib/dto/core/radio/radio.dto';
    import {
        _academicInfoSchema,
        _academicListResponseSchema,
        _activityInfoSchema,
        _activityListResponseSchema,
        _dependencyListResponseSchema,
        _diseaseInfoCollectionSchema,
        _experienceInfoSchema,
        _experienceListResponseSchema,
        _familyListResponseSchema,
        _generalAssessmentListResponseSchema,
        _medicalAssessmentListResponseSchema,
        _nextOfKinListResponseSchema,
        _personalInfoResponseSchema,
        _relationsSchema,
        _serviceDetailSchema,
        _serviceInfoResponseSchema,
    } from '$lib/schemas/mypsm/profile/profile-schemas';
    import SuperDebug, { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _personalInfoSubmit,
        _serviceInfoSubmit,
        _submitAcademicForm,
        _submitAcademicInfoForm,
        _submitActivityForm,
        _submitActivityInfoForm,
        _submitDependencyForm,
        _submitDependencyInfoForm,
        _submitEditAcademicForm,
        _submitEditActivityForm,
        _submitEditExperienceForm,
        _submitEditFamilyForm,
        _submitEditNextOfKinForm,
        _submitExperienceForm,
        _submitExperienceInfoForm,
        _submitFamilyForm,
        _submitFamilyInfoForm,
        _submitGeneralMedicalForm,
        _submitMedicalHistoryForm,
        _submitNextOfKinForm,
        _submitNextOfKinInfoForm,
    } from './+page';
    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import { error } from '@sveltejs/kit';
    import type { Academic } from '$lib/dto/mypsm/profile/academic-detail.dto';
    import type { Experience } from '$lib/dto/mypsm/profile/experience-detail.dto';
    import type { Activity } from '$lib/dto/mypsm/profile/activity-detail.dto';
    import type {
        Dependency,
        Family,
        NextOfKin,
    } from '$lib/dto/mypsm/profile/relation-detail.dto';
    import toast, { Toaster } from 'svelte-french-toast';
    import { commonOptions } from '$lib/constants/core/radio-option-constants';
    import type { generalMedical } from '$lib/dto/mypsm/profile/general-assessment.dto';

    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;
    export let openExperienceInfoModal: boolean = false;
    export let data: PageData;
    let param: CommonListRequestDTO = data.salaryListParam;

    const handleOnInput = (e: Event) => {
        // $documentForm.document =
        //     ((e.currentTarget as HTMLInputElement)?.files?.item(0) as File) ??
        //     null;
    };

    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    let ResultOptions: RadioDTO[] = [
        {
            value: true,
            name: 'YA',
        },
        {
            value: false,
            name: 'TIDAK',
        },
    ];

    console.log(data.personalDetail);

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
        _submitDependencyInfoForm(tempDependency);
    };
    const triggerSubmitNextOfKinTempData = () => {
        const tempData = tempNextOfKin.map((tempData) => ({
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
            birthDate: tempData.birthDate,
            workAddress: tempData.workAddress,
            workPostcode: tempData.workPostcode,
            phoneNumber: tempData.phoneNumber,
            marriageDate: tempData.marriageDate,
            inSchool: tempData.inSchool,
        }));
        tempNextOfKin = [...tempNextOfKin, ...tempData] as NextOfKin[];
        _submitNextOfKinInfoForm(tempNextOfKin);
    };

    let isReadonlyExamFormStepper: boolean = true;

    let isReadonlyPersonalFormStepper: boolean = true;
    let isReadonlyServiceFormStepper: boolean = true;
    let isReadonlyAcademicFormStepper: boolean = true;

    let isCreateAcademic: boolean = false;
    let isEditableAcademic: boolean = false;

    let isCreateExperience: boolean = false;
    let isEditableExperience: boolean = false;

    let isCreateActivity: boolean = false;
    let isEditableActivity: boolean = false;

    let isCreateFamily: boolean = false;
    let isEditableFamily: boolean = false;

    let isCreateDependency: boolean = false;
    let isEditableDependency: boolean = false;

    let isCreateNextOfKin: boolean = false;
    let isEditableNextOfKin: boolean = false;

    let isReadonlyActivityFormStepper: boolean = true;
    let isReadonlyFamilyFormStepper: boolean = true;
    let isReadonlyDependencyFormStepper: boolean = true;
    let isReadonlyNextOfKinFormStepper: boolean = true;
    let isReadonlyDocumentFormStepper: boolean = true;

    const {
        form: personalInfoForm,
        errors: personalInfoError,
        enhance: personalInfoEnhance,
        isTainted: personalDetailTainted,
    } = superForm(data.personalDetail, {
        SPA: true,
        id: 'personalDetail',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_personalInfoResponseSchema),
        onUpdate(event) {},
        async onSubmit() {
            if (!personalDetailTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _personalInfoSubmit($personalInfoForm);
            if (result.response.status === 'success')
                isReadonlyPersonalFormStepper = true;
        },
        taintedMessage: false,
    });

    const {
        form: serviceInfoForm,
        errors: serviceInfoError,
        enhance: serviceInfoEnhance,
        isTainted: serviceInfoTainted,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        id: 'serviceDetail',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_serviceInfoResponseSchema),
        onUpdate(event) {},
        async onSubmit() {
            if (!serviceInfoTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _serviceInfoSubmit($serviceInfoForm);
            if (result.response.status === 'success')
                isReadonlyServiceFormStepper = true;
        },
    });

    const {
        form: academicInfoForm,
        errors: academicInfoError,
        enhance: academicInfoEnhance,
        tainted: academicTaintedField,
        isTainted: academicInfoTainted,
    } = superForm(
        data.academicInfoForm,

        {
            SPA: true,
            dataType: 'json',
            id: 'academicDetail',
            invalidateAll: true,
            resetForm: true,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
            taintedMessage: 'Perubahan belum disimpan',
            onUpdate() {
                isEditableAcademic = false;
            },
            async onSubmit() {
                if (!academicInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }

                const resultEdit =
                    await _submitEditAcademicForm($academicInfoForm);
                if (resultEdit.response.status === 'success')
                    isEditableAcademic = false;
            },
        },
    );
    let isReadonlyExperienceFormStepper: boolean = true;
    const {
        form: experienceInfoForm,
        errors: experienceInfoError,
        enhance: experienceInfoEnhance,
        isTainted: experienceInfoTainted,
    } = superForm(
        data.experienceInfoForm,
        // isReadonlyExperienceFormStepper
        {
            SPA: true,
            dataType: 'json',
            id: 'experienceDetail',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_experienceListResponseSchema),
            onUpdate() {
                isEditableExperience = false;
            },
            async onSubmit() {
                if (!experienceInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }
                const editResultExperience =
                    await _submitEditExperienceForm($experienceInfoForm);
                if (editResultExperience.response.status === 'success')
                    isEditableExperience = false;
            },
        },
    );

    const {
        form: activityInfoForm,
        errors: activityInfoError,
        enhance: activityInfoEnhance,
        isTainted: activityInfoTainted,
        tainted: activityTaintedField,
    } = superForm(
        data.activityInfoForm,

        {
            SPA: true,
            id: 'activityDetail',
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_activityListResponseSchema),
            taintedMessage: 'Perubahan belum disimpan',
            onUpdate() {
                isEditableActivity = false;
            },
            async onSubmit() {
                if (!activityInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }
                const result = await _submitEditActivityForm($activityInfoForm);
                if (result.response.status === 'success')
                    isEditableActivity = false;
            },
        },
    );

    const {
        form: familyInfoForm,
        errors: familyInfoError,
        enhance: familyInfoEnhance,
        isTainted: familyInfoTainted,
    } = superForm(
        data.familyInfoForm,

        {
            SPA: true,
            id: 'familyDetail',
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_familyListResponseSchema),
            onUpdate() {
                isEditableFamily = false;
            },
            async onSubmit() {
                if (!familyInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }
                const editResultFamily =
                    await _submitEditFamilyForm($familyInfoForm);
                if (editResultFamily.response.status === 'success')
                    isReadonlyFamilyFormStepper = true;
            },
        },
    );

    const {
        form: dependencyInfoForm,
        errors: dependencyInfoError,
        enhance: dependencyInfoEnhance,
        isTainted: dependencyInfoTainted,
    } = superForm(
        data.relationInfoForm,

        {
            SPA: true,
            dataType: 'json',
            id: 'dependencyDetail',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_dependencyListResponseSchema),
            onUpdate() {

                isEditableDependency = false;
            },
            async onSubmit() {
                if (!dependencyInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }
                const result = await _submitDependencyForm($dependencyInfoForm);
                if (result.response.status === 'success')
                    isReadonlyDependencyFormStepper = true;
            },
        },
    );

    const {
        form: nextOfKinInfoForm,
        errors: nextOfKinInfoError,
        enhance: nextOfKinInfoEnhance,
        isTainted: nextOFKInInfoTainted,
    } = superForm(
        data.nextOFKInInfoForm,

        {
            SPA: true,
            dataType: 'json',
            id: 'nextOfKinDetail',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_nextOfKinListResponseSchema),
            onUpdate() {
                isEditableNextOfKin = false;
            },
            async onSubmit() {
                if (!nextOFKInInfoTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }

                const editResulNextOfKin = await _submitEditNextOfKinForm($nextOfKinInfoForm);
                if (editResulNextOfKin.response.status === 'success')
                isReadonlyNextOfKinFormStepper = true;
            },
        },
    );

    let editMode: boolean = true;

    let tempAcademicRecord: Academic[] = [];

    // modal
    const {
        form: addAcademicInfoModal,
        errors: addAcademicInfoErrors,
        enhance: addAcademicInfoEnhance,
    } = superForm(data.addAcademicModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_academicInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_academicInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempAcademicRecord = [
                ...tempAcademicRecord,
                result.data as Academic,
            ];
            openAcademicInfoModal = false;
        },
    });

    const submitCreateAcademic = () => {
        _submitAcademicInfoForm(tempAcademicRecord);
    };

    let tempExperienceRecord: Experience[] = [];
    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_experienceInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_experienceInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempExperienceRecord = [
                ...tempExperienceRecord,
                result.data as Experience,
            ];
            openExperienceInfoModal = false;
        },
    });

    const submitCreateExperience = () => {
        _submitExperienceInfoForm(tempExperienceRecord);
    };

    let tempActivityRecord: Activity[] = [];
    const {
        form: addActivityModal,
        errors: addActivityModalErrors,
        enhance: addActivityModalEnhance,
    } = superForm(data.addActivityModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_activityInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_activityInfoSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempActivityRecord = [
                ...tempActivityRecord,
                result.data as Activity,
            ];
            openMembershipInfoModal = false;
        },
    });
    const submitCreateActivity = () => {
        _submitActivityInfoForm(tempActivityRecord);
    };

    let tempFamilyRecord: Family[] = [];
    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempFamilyRecord = [...tempFamilyRecord, result.data as Family];
            openFamilyInfoModal = false;
        },
    });

    const submitCreateFamily = () => {
        _submitFamilyInfoForm(tempFamilyRecord);
    };

    let tempDependency: Dependency[] = [];
    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        id: 'profileDependencyForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempDependency = [...tempDependency, result.data as Dependency];
            openNonFamilyInfoModal = false;
        },
    });

    const submitCreateDependency = () => {
        _submitDependencyInfoForm(tempDependency);
    };

    let tempNextOfKin: NextOfKin[] = [];
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        id: 'profileNextOfKinForm',
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_relationsSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_relationsSchema),
            );

            console.log('Result: ', result);

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempNextOfKin = [...tempNextOfKin, result.data as NextOfKin];
            openNextOfKinInfoModal = false;
        },
    });

    const submitCreateNextOfKin = () => {
        _submitNextOfKinInfoForm(tempNextOfKin);
    };

    let isReadonlyHistoryMedicalFormStepper: boolean = true;

    const {
        form: medicalHistoryForm,
        errors: medicalHistoryErrors,
        enhance: medicalHistoryEnhance,
        isTainted: medicalHistoryTainted,
    } = superForm(data.diseaseCollectionForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_diseaseInfoCollectionSchema),
        async onSubmit(formData) {
            if (!medicalHistoryTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _submitMedicalHistoryForm($medicalHistoryForm);
            if (result.response.status === 'success')
                isReadonlyHistoryMedicalFormStepper = true;
        },
    });

    let isGeneralMedicalFormStepper: boolean = true;

    const {
        form: generalMedicalForm,
        errors: generalMedicalErrors,
        enhance: generalMedicalEnhance,
        isTainted: generalMedicalTainted,
    } = superForm(data.medicalGeneralForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_generalAssessmentListResponseSchema),
        async onSubmit(formData) {
            if (!generalMedicalTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _submitGeneralMedicalForm($generalMedicalForm);
            if (result.response.status === 'success')
                isGeneralMedicalFormStepper = true;
        },
    });

    let salaryTable: TableDTO = {
        param: data.salaryListParam,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.salaryViewTable ?? [],
    };

    console.log(data.diseaseList);
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="MaklumatPeribadi">
            <Stepper>
                <!------------------------------------------------------>
                <!---------------Maklumat Peribadi---------------------->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader title="Maklumat Peribadi">
                        {#if isReadonlyPersonalFormStepper}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() =>
                                    (isReadonlyPersonalFormStepper = false)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={() =>
                                    (isReadonlyPersonalFormStepper = false)}
                                form="personalFormStepper"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() =>
                                    (isReadonlyPersonalFormStepper = true)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody
                        ><!-- Maklumat Peribadi -->
                        <form
                            id="personalFormStepper"
                            method="POST"
                            use:personalInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <div
                                class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
                            >
                                <p class={stepperFormTitleClass}>
                                    Maklumat Peribadi
                                </p>

                                <!-- <CustomTextField
                                  disabled={isReadonlyPersonalFormStepper
                                    id="employeeNumber"
                                    label={'No. Pekerja'}
                                    type="text"
                                    errors={$personalInfoError.employeeNo}
                                    bind:val={editMode ? data.personalDetails.employeeNo : $personalInfoForm.employeeNumber}
                                ></CustomTextField> -->
                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.identityCardNumber}
                                    id="identityCardNumber"
                                    label={'No. Kad Pengenalan'}
                                    type="text"
                                    bind:val={$personalInfoForm.identityCardNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.name}
                                    id="name"
                                    label={'Nama Penuh'}
                                    type="text"
                                    bind:val={$personalInfoForm.name}
                                ></CustomTextField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.titleId}
                                    id="titleId"
                                    label="Gelaran"
                                    bind:val={$personalInfoForm.titleId}
                                    options={data.selectionOptions.titleLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.alternativeName}
                                    id="alternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    bind:val={$personalInfoForm.alternativeName}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.email}
                                    id="email"
                                    label="Emel Pekerja"
                                    bind:val={$personalInfoForm.email}
                                ></CustomTextField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.identityDocumentColor}
                                    id="identityDocumentColor"
                                    label="Jenis Kad Pengenalan"
                                    bind:val={$personalInfoForm.identityDocumentColor}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.birthDate}
                                    type="date"
                                    id="birthDate"
                                    label="Tarikh Lahir"
                                    bind:val={$personalInfoForm.birthDate}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.birthStateId}
                                    id="birthStateId"
                                    label="Tempat Lahir"
                                    bind:val={$personalInfoForm.birthStateId}
                                    options={data.selectionOptions.stateLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.birthCountryId}
                                    id="birthCountryId"
                                    label="Tempat Lahir"
                                    bind:val={$personalInfoForm.birthCountryId}
                                    options={data.selectionOptions
                                        .countryLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.nationalityId}
                                    id="nationalityId"
                                    label="Warganegara"
                                    bind:val={$personalInfoForm.nationalityId}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.raceId}
                                    id="raceId"
                                    label="Bangsa"
                                    bind:val={$personalInfoForm.raceId}
                                    options={data.selectionOptions.raceLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.ethnicId}
                                    id="ethnicId"
                                    label="Etnik"
                                    bind:val={$personalInfoForm.ethnicId}
                                    options={data.selectionOptions
                                        .ethnicityLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.religionId}
                                    id="religionId"
                                    label="Agama"
                                    bind:val={$personalInfoForm.religionId}
                                    options={data.selectionOptions
                                        .religionLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.genderId}
                                    id="genderId"
                                    label="Jantina"
                                    bind:val={$personalInfoForm.genderId}
                                    options={data.selectionOptions.genderLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.maritalId}
                                    id="maritalId"
                                    label="Status Perkahwinan"
                                    bind:val={$personalInfoForm.maritalId}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                ></CustomSelectField>

                                <!-- <CustomTextField
                                 disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.identityCardNumber}
                                id="email"
                                label={'Emel'}
                                type="text"
                                val=""
                            ></CustomTextField> -->

                                <CustomTextField
                                    errors={$personalInfoError.homeAddress}
                                    disabled={isReadonlyPersonalFormStepper}
                                    id="homeAddress"
                                    label="Alamat Rumah"
                                    bind:val={$personalInfoForm.homeAddress}
                                />

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.homeCountryId}
                                    id="homeCountryId"
                                    label="Negara Kediaman"
                                    bind:val={$personalInfoForm.homeCountryId}
                                    options={data.selectionOptions
                                        .countryLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.homeStateId}
                                    id="homeStateId"
                                    label="Negeri Kediaman"
                                    bind:val={$personalInfoForm.homeStateId}
                                    options={data.selectionOptions.stateLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.homeCityId}
                                    id="homeCityId"
                                    label="Daerah Kediaman"
                                    bind:val={$personalInfoForm.homeCityId}
                                    options={data.selectionOptions.cityLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    errors={$personalInfoError.homePostcode}
                                    disabled={isReadonlyPersonalFormStepper}
                                    id="homePostcode"
                                    label="Poskod Rumah"
                                    bind:val={$personalInfoForm.homePostcode}
                                />

                                <CustomTextField
                                    errors={$personalInfoError.mailAddress}
                                    disabled={isReadonlyPersonalFormStepper}
                                    id="mailAddress"
                                    label="Alamat Surat Menyurat"
                                    bind:val={$personalInfoForm.mailAddress}
                                />

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.mailCountryId}
                                    id="mailCountryId"
                                    label="Negara Surat Menyurat"
                                    bind:val={$personalInfoForm.mailCountryId}
                                    options={data.selectionOptions
                                        .countryLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.mailStateId}
                                    id="mailStateId"
                                    label="Negeri Surat Menyurat"
                                    bind:val={$personalInfoForm.mailStateId}
                                    options={data.selectionOptions.stateLookup}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.mailCityId}
                                    id="mailCityId"
                                    label="Daerah Surat Menyurat"
                                    bind:val={$personalInfoForm.mailCityId}
                                    options={data.selectionOptions.cityLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    errors={$personalInfoError.mailPostcode}
                                    disabled={isReadonlyPersonalFormStepper}
                                    id="mailPostcode"
                                    label="Poskod Surat Menyurat"
                                    bind:val={$personalInfoForm.mailPostcode}
                                />
                                <!-- <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.houseLoanType}
                                    id="houseLoanType"
                                    label="Jenis Pinjaman Rumah"
                                    bind:val={$personalInfoForm.houseLoanType}
                                ></CustomSelectField>
                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.houseloan}
                                    id="houseloan"
                                    label="Pinjaman Rumah"
                                    bind:val={$personalInfoForm.houseloan}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.assetDeclarationStatusId}
                                    id="assetDeclarationStatusId"
                                    label="Status Pengikstiharan Harta"
                                    bind:val={$personalInfoForm.assetDeclarationStatusId}
                                    options={data.selectionOptions
                                        .assetDeclarationLookup}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.propertyDeclarationDate}
                                    id="propertyDeclarationDate"
                                    type="date"
                                    label="Tarikh Pengikstiharan Harta"
                                    bind:val={$personalInfoForm.propertyDeclarationDate}
                                /> -->

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.isExPoliceOrSoldier}
                                    id="isExPoliceOrSoldier"
                                    label="Bekas Polis / Tentera"
                                    bind:val={$personalInfoForm.isExPoliceOrSoldier}
                                    options={data.selectionOptions
                                        .generalLookup}
                                ></CustomSelectField>

                                <p class={stepperFormTitleClass}>
                                    Maklumat Pertalian Dengan Kakitangan LKIM
                                </p>

                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.isInternalRelationship}
                                    id="isInternalRelationship"
                                    label="Perhubungan Dengan Kakitangan LKIM"
                                    bind:val={$personalInfoForm.isInternalRelationship}
                                    options={data.selectionOptions
                                        .generalLookup}
                                ></CustomSelectField>

                                <!-- <CustomSelectField
                                     disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.identityCardNumber}
                                    id="employeeNumber"
                                    label={'No. Pekerja LKIM'}
                                    bind:val={$personalInfoForm.employeeNumber}
                                    options={data.selectionOptions
                                        .employeeLookup}
                                ></CustomSelectField> -->

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.relationDetail
                                        ?.employeeNumber}
                                    id="employeeNumber"
                                    label="ID Kakitangan LKIM"
                                    bind:val={$personalInfoForm.relationDetail
                                        .employeeNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.relationDetail
                                        ?.employeeName}
                                    id="employeeName"
                                    label="Nama Kakitangan LKIM"
                                    bind:val={$personalInfoForm.relationDetail
                                        .employeeName}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.relationDetail
                                        ?.employeePosition}
                                    id="employeePosition"
                                    label="Jawatan Kakitangan LKIM"
                                    bind:val={$personalInfoForm.relationDetail
                                        .employeePosition}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={isReadonlyPersonalFormStepper}
                                    errors={$personalInfoError.relationDetail
                                        ?.relationshipId}
                                    id="relationshipId"
                                    label="Hubungan"
                                    bind:val={$personalInfoForm.relationDetail
                                        .relationshipId}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                ></CustomSelectField>
                            </div>
                            <!-- </form> -->
                        </form></StepperContentBody
                    >
                </StepperContent>

                <!------------------------------------------------------>
                <!--------------- Maklumat Perkhidmatan ---------------->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader title="Maklumat Perkhidmatan">
                        {#if isReadonlyServiceFormStepper}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() =>
                                    (isReadonlyServiceFormStepper = false)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={() =>
                                    (isReadonlyServiceFormStepper = false)}
                                form="serviceFormStepper"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() =>
                                    (isReadonlyServiceFormStepper = true)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            id="serviceFormStepper"
                            method="POST"
                            use:serviceInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <b class="text-sm text-system-primary"
                                >Maklumat Perkhidmatan</b
                            >
                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.gradeId}
                                id="gradeId"
                                label={'Gred Semasa'}
                                options={data.selectionOptions.gradeLookup}
                                bind:val={$serviceInfoForm.gradeId}
                            ></CustomSelectField>
                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.positionId}
                                id="positionId"
                                label={'Jawatan'}
                                options={data.selectionOptions.positionLookup}
                                bind:val={$serviceInfoForm.positionId}
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.placementId}
                                id="placementId"
                                label={'Penempatan'}
                                options={data.selectionOptions.placementLookup}
                                bind:val={$serviceInfoForm.placementId}
                            ></CustomSelectField>

                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.serviceTypeId}
                                id="serviceTypeId"
                                label={'Taraf Perkhidmatan'}
                                options={data.selectionOptions
                                    .serviceTypeLookup}
                                bind:val={$serviceInfoForm.serviceTypeId}
                            ></CustomSelectField>

                            <!-- <RadioButton
                            
                            options={faedahPersaraanOptions}
                            label={'Faedah Persaraan'}
                            bind:userSelected={isFaedahKWSP}
                        ></RadioButton>  -->
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.effectiveDate}
                                id="effectiveDate"
                                label={'Tarikh Berkuatkuasa'}
                                type="text"
                                bind:val={$serviceInfoForm.effectiveDate}
                            ></CustomTextField>

                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.retirementBenefit}
                                id="retirementBenefit"
                                label="Faedah Persaraan"
                                options={data.selectionOptions
                                    .retirementBenefitLookup}
                                bind:val={$serviceInfoForm.retirementBenefit}
                            />

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.EPFNumber}
                                id="EPFNumber"
                                label={'No. KWSP'}
                                type="text"
                                bind:val={$serviceInfoForm.EPFNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.SOCSO}
                                id="SOCSO"
                                label={'No. SOCSO'}
                                type="text"
                                bind:val={$serviceInfoForm.SOCSO}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.taxIncome}
                                id="taxIncome"
                                label={'No. Cukai (LHDN)'}
                                type="text"
                                bind:val={$serviceInfoForm.taxIncome}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.bankName}
                                id="bankName"
                                label={'Bank'}
                                type="text"
                                bind:val={$serviceInfoForm.bankName}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.accountNumber}
                                id="accountNumber"
                                label={'No. Akaun'}
                                type="text"
                                bind:val={$serviceInfoForm.accountNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.accountNumber}
                                id="program"
                                label={'Program'}
                                type="text"
                                bind:val={$serviceInfoForm.program}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.eligibleLeaveCount}
                                id="eligibleLeaveCount"
                                label={'Kelayakan Cuti'}
                                type="text"
                                bind:val={$serviceInfoForm.eligibleLeaveCount}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.civilServiceStartDate}
                                id="civilServiceStartDate"
                                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                                type="date"
                                bind:val={$serviceInfoForm.civilServiceStartDate}
                            ></CustomTextField>

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.confirmServiceDate}
                                id="confirmServiceDate"
                                label={'Tarikh Disahkan Jawatan'}
                                type="date"
                                bind:val={$serviceInfoForm.confirmServiceDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.newRecruitEffectiveDate}
                                id="newRecruitEffectiveDate"
                                label={'Mula Dilantik Perkhidmatan LKIM'}
                                type="date"
                                bind:val={$serviceInfoForm.newRecruitEffectiveDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.firstServiceDate}
                                id="firstServiceDate"
                                label={'Mula Dilantik Perkhidmatan Sekarang'}
                                type="date"
                                bind:val={$serviceInfoForm.firstServiceDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.firstEffectiveDate}
                                id="firstEffectiveDate"
                                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                                type="date"
                                bind:val={$serviceInfoForm.firstEffectiveDate}
                            ></CustomTextField>
                            <!-- <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.confirmDate}
                                id="confirmDate"
                                label={'Disahkan Dalam Jawatan Semasa LKIM'}
                                type="date"
                                bind:val={$serviceInfoForm.confirmDate}
                            ></CustomTextField> -->

                            <!-- <AccordianField
                            disabled={editable}
                            label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                            header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                        > 
    
                            <{#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

                            <!-- <label
                                for=""
                                class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                                    ? 'text-txt-tertiary'
                                    : 'text-txt-primary'}
                                                        hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                                >{'i + 1'}. {'val'}</label
                            > -->
                            <!-- {/each} -->
                            <!-- </AccordianField>
                                 -->
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.pastAttachmentDate}
                                id="pastAttachmentDate"
                                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                                type="date"
                                bind:val={$serviceInfoForm.pastAttachmentDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.actingDate}
                                id="actingDate"
                                label={'Pemangkuan Sekarang'}
                                type="text"
                                bind:val={$serviceInfoForm.actingDate}
                                placeholder=""
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.interimDate}
                                id="interimDate"
                                label={'Tanggung Kerja Sekarang'}
                                type="text"
                                bind:val={$serviceInfoForm.interimDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.pensionScheme}
                                id="pensionScheme"
                                label={'Skim Pencen'}
                                type="text"
                                bind:val={$serviceInfoForm.pensionScheme}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.lastSalaryRaiseDate}
                                id="lastSalaryRaiseDate"
                                label={'Kenaikan Gaji Akhir'}
                                type="text"
                                bind:val={$serviceInfoForm.lastSalaryRaiseDate}
                            ></CustomTextField>

                            <CustomSelectField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.salaryMovementMonth}
                                id="salaryMovementMonth"
                                label={'Bulan KGT'}
                                options={[
                                    {
                                        value: 'undefined',
                                        name: 'Tiada Maklumat',
                                    },
                                    {
                                        value: 1,
                                        name: 'January',
                                    },
                                    {
                                        value: 4,
                                        name: 'April',
                                    },
                                    {
                                        value: 7,
                                        name: 'Julai',
                                    },
                                    {
                                        value: 10,
                                        name: 'Oktober',
                                    },
                                ]}
                                bind:val={$serviceInfoForm.salaryMovementMonth}
                            ></CustomSelectField>

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.lastPromotionDate}
                                id="lastPromotionDate"
                                label={'Kenaikan Pangkat Akhir'}
                                type="text"
                                bind:val={$serviceInfoForm.lastPromotionDate}
                            ></CustomTextField>

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.retirementDate}
                                id="retirementDate"
                                label={'Tarikh Bersara'}
                                type="text"
                                bind:val={$serviceInfoForm.retirementDate}
                            ></CustomTextField>

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoError.salaryEffectiveDate}
                                id="salaryEffectiveDate"
                                label={'Tarikh Kuatkuasa Gaji'}
                                type="text"
                                bind:val={$serviceInfoForm.salaryEffectiveDate}
                            ></CustomTextField>
                            <b class="text-sm text-system-primary"
                                >Maklumat Gaji dan Elaun - Elaun</b
                            >
                            <div class="grid grid-cols-2 gap-10">
                                <div class="space-y-2.5">
                                    <!-- <CustomTextField
                                        id="tarikhBerkuatkuasa"
                                        label={'Tarikh Berkuatkuasa'}
                                        type="text"
                                         bind:val={$serviceInfoForm.gradeId}
                                        placeholder=""
                                    ></CustomTextField> -->
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.maximumSalary}
                                        id="maximumSalary"
                                        label={'Tangga Gaji'}
                                        type="text"
                                        bind:val={$serviceInfoForm.maximumSalary}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.baseSalary}
                                        id="baseSalary"
                                        label={'Gaji Pokok'}
                                        type="text"
                                        bind:val={$serviceInfoForm.baseSalary}
                                    ></CustomTextField>
                                </div>
                                <!-- hasTooltip={true}
                                    toolTipID="type-itka" -->
                                <div class="space-y-2.5">
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.ITKA}
                                        id="ITKA"
                                        label={'ITKA'}
                                        type="text"
                                        bind:val={$serviceInfoForm.ITKA}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.ITP}
                                        id="ITP"
                                        label={'ITP'}
                                        type="text"
                                        bind:val={$serviceInfoForm.ITP}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.EPW}
                                        id="EPW"
                                        label={'EPW'}
                                        type="text"
                                        bind:val={$serviceInfoForm.EPW}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={isReadonlyServiceFormStepper}
                                        errors={$serviceInfoError.COLA}
                                        id="COLA"
                                        label={'COLA'}
                                        type="text"
                                        bind:val={$serviceInfoForm.COLA}
                                    ></CustomTextField>
                                    <!-- Tooltip body -->
                                    <!-- <Tooltip
                                        type="dark"
                                        triggeredBy="[id^='type-']"
                                        on:show={assignContent}
                                        >"{tooltipContent}"</Tooltip
                                    > -->
                                </div>
                            </div>
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------>
                <!---Maklumat Akademik / Kelayakan / Latihan yang Lalu-->
                <!------------------------------------------------------>

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Akademik / Kelayakan / Latihan yang Lalu"
                    >
                        {#if !isCreateAcademic}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Akademik"
                                onClick={() => (isCreateAcademic = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateAcademic}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Batal"
                                onClick={() => (isCreateAcademic = false)}
                            />
                        {/if}
                        {#if !isEditableAcademic}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableAcademic = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Kemaskini"
                                form="academicFormStepper"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Batal"
                                onClick={() => (isEditableAcademic = false)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if isCreateAcademic}
                            {#if tempAcademicRecord.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempAcademicRecord as academic, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat Pengalaman - {academic.name}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Maklumat"
                                    onClick={() => {
                                        openAcademicInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}
                        <form
                            id="academicFormStepper"
                            method="POST"
                            use:academicInfoEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            {#if $academicInfoForm.academics.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                                <CustomTab id="academics">
                                    {#each $academicInfoForm.academics as key, i}
                                        <CustomTabContent
                                            title={`Akademik #${key.educationId}`}
                                        >
                                            <input
                                                type="text"
                                                hidden
                                                bind:value={$academicInfoForm
                                                    .academics[i].educationId}
                                            />
                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="majorId"
                                                label={'Jurusan'}
                                                options={data.selectionOptions
                                                    .majorMinorLookup}
                                                bind:val={$academicInfoForm
                                                    .academics[i].majorId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="minorId"
                                                label={'Bidang'}
                                                bind:val={$academicInfoForm
                                                    .academics[i].minorId}
                                                options={data.selectionOptions
                                                    .majorMinorLookup}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="countryId"
                                                label={'Negara'}
                                                bind:val={$academicInfoForm
                                                    .academics[i].countryId}
                                                options={data.selectionOptions
                                                    .countryLookup}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="institutionId"
                                                label={'Institusi'}
                                                bind:val={$academicInfoForm
                                                    .academics[i].institutionId}
                                                options={data.selectionOptions
                                                    .institutionLookup}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="educationLevelId"
                                                label={'Taraf Pendidikan'}
                                                bind:val={$academicInfoForm
                                                    .academics[i]
                                                    .educationLevelId}
                                                options={data.selectionOptions
                                                    .educationLookup}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                disabled={!isEditableAcademic}
                                                id="sponsorshipId"
                                                label={'Penajaan'}
                                                bind:val={$academicInfoForm
                                                    .academics[i].sponsorshipId}
                                                options={data.selectionOptions
                                                    .sponsorshipLookup}
                                            ></CustomSelectField>

                                            <CustomTextField
                                                disabled={!isEditableAcademic}
                                                id="name"
                                                label={'Nama Sijil/Pencapaian'}
                                                type="text"
                                                bind:val={$academicInfoForm
                                                    .academics[i].name}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableAcademic}
                                                id="completionDate"
                                                label="Tarikh Tamat Pembelajaran"
                                                type="date"
                                                bind:val={$academicInfoForm
                                                    .academics[i]
                                                    .completionDate}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableAcademic}
                                                id="finalGrade"
                                                label={'Ijazah/ CGPA/ Gred'}
                                                type="text"
                                                bind:val={$academicInfoForm
                                                    .academics[i].finalGrade}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableAcademic}
                                                id="field"
                                                label={'Bidang'}
                                                type="text"
                                                bind:val={$academicInfoForm
                                                    .academics[i].field}
                                            ></CustomTextField>
                                        </CustomTabContent>
                                    {/each}
                                </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!---------------Maklumat Pengalaman--------------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Pengalaman">
                        {#if !isCreateExperience}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Pengalaman"
                                onClick={() => (isCreateExperience = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateExperience}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isCreateExperience = false)}
                            />
                        {/if}
                        {#if !isEditableExperience}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableExperience = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="experienceInfoForm"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isEditableExperience = false)}
                            />
                        {/if}
                    </StepperContentHeader>

                    <StepperContentBody>
                        {#if isCreateExperience}
                            {#if tempExperienceRecord.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempExperienceRecord as experience, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat Pengalaman - {experience.company}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Pengalaman"
                                    onClick={() => {
                                        openExperienceInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}

                        <form
                            id="experienceInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:experienceInfoEnhance
                            method="POST"
                        >
                            {#if $experienceInfoForm.experiences.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                                <CustomTab id="experiences">
                                    {#each $experienceInfoForm.experiences as _, i}
                                        <CustomTabContent
                                            title={`Pengalaman #${i + 1}`}
                                        >
                                            <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="company"
                                                label={'Nama Majikan'}
                                                type="text"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].company}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="address"
                                                label={'Alamat Majikan'}
                                                type="text"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].address}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="position"
                                                label={'Jawatan'}
                                                type="text"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].position}
                                            ></CustomTextField>

                                            <!-- <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="positionCode"
                                                label={'Kod Jawatan (jika ada)'}
                                                type="text"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i]
                                                    .positionCode}
                                            ></CustomTextField> -->
                                            <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="description"
                                                label={'Keterangan'}
                                                type="text"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].description}
                                            ></CustomTextField>
                                            <CustomTextField
                                                type="date"
                                                disabled={!isEditableExperience}
                                                id="startDate"
                                                label="Tarikh Mula Bekerja"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].startDate}
                                            ></CustomTextField>

                                            <CustomTextField
                                                type="date"
                                                disabled={!isEditableExperience}
                                                id="endDate"
                                                label="Tarikh Tamat Bekerja"
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].endDate}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableExperience}
                                                id="grade"
                                                label={'Gred'}
                                                bind:val={$experienceInfoForm
                                                    .experiences[i].grade}
                                            ></CustomTextField>
                                        </CustomTabContent>
                                    {/each}
                                </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!--------------Maklumat Kegiatan / Keahlian------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
                        {#if !isCreateActivity}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Keahlian"
                                onClick={() => (isCreateActivity = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateActivity}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isCreateActivity = false)}
                            />
                        {/if}
                        {#if !isEditableActivity}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableActivity = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="activityInfoForm"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isEditableActivity = false)}
                            />
                        {/if}
                    </StepperContentHeader>

                    <StepperContentBody>
                        {#if isCreateActivity}
                            {#if tempActivityRecord.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempActivityRecord as activity, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat
                                                Kegiatan/Keahlian - {activity.name}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}

                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Kegiatan/Keahlian"
                                    onClick={() => {
                                        openMembershipInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}
                        <form
                            id="activityInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:activityInfoEnhance
                            method="POST"
                        >
                            {#if $activityInfoForm.activities.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                                <CustomTab id="activities">
                                    {#each $activityInfoForm.activities as _, i}
                                        <CustomTabContent
                                            title={`Aktiviti #${i + 1}`}
                                        >
                                            <CustomTextField
                                                disabled={!isEditableActivity}
                                                id="name"
                                                label={'Nama Kegiatan'}
                                                type="text"
                                                bind:val={$activityInfoForm
                                                    .activities[i].name}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableActivity}
                                                type="date"
                                                id="joinDate"
                                                label={'Tarikh Keahlian'}
                                                bind:val={$activityInfoForm
                                                    .activities[i].joinDate}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableActivity}
                                                id="position"
                                                label={'Jawatan'}
                                                type="text"
                                                bind:val={$activityInfoForm
                                                    .activities[i].position}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableActivity}
                                                id="description"
                                                label={'Catatan'}
                                                type="text"
                                                bind:val={$activityInfoForm
                                                    .activities[i].description}
                                            ></CustomTextField>
                                        </CustomTabContent>
                                    {/each}
                                </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!-----------------Maklumat Keluarga--------------------->
                <!------------------------------------------------------->
                <StepperContent>
                    <StepperContentHeader title="Maklumat Keluarga">
                        {#if !isCreateFamily}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Keluarga"
                                onClick={() => (isCreateFamily = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateFamily}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isCreateFamily = false)}
                            />
                        {/if}
                        {#if !isEditableFamily}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableFamily = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="familyInfoForm"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isEditableFamily = false)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if isCreateFamily}
                            {#if tempFamilyRecord.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempFamilyRecord as family, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat Keluarga - {family.name}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                            <!-- {/if} -->
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Maklumat Keluarga"
                                    onClick={() => {
                                        openFamilyInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}

                        <form
                            id="familyInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:familyInfoEnhance
                            method="POST"
                        >
                            {#if $familyInfoForm.families.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                                <CustomTab id="families">
                                    {#each Object.entries($familyInfoForm.families) as [key, _], i}
                                        <CustomTabContent
                                            title={i +
                                                1 +
                                                '. ' +
                                                $familyInfoForm.families[i]
                                                    .name}
                                        >
                                            <CustomTextField
                                                id="name"
                                                label={'Nama'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].name}
                                            ></CustomTextField>

                                            <CustomTextField
                                                id="alternativeName"
                                                label={'Nama Lain'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i]
                                                    .alternativeName}
                                            ></CustomTextField>
                                            <CustomSelectField
                                                id="identityDocumentColor"
                                                label={'Jenis Kad Pengenalan'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .identityCardColorLookup}
                                                val=""
                                            ></CustomSelectField>
                                            <CustomTextField
                                                id="identityDocumentNumber"
                                                type="number"
                                                label={'Nombor Kad Pengenalan'}
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i]
                                                    .identityDocumentColor}
                                            ></CustomTextField>

                                            <CustomTextField
                                                id="address"
                                                label={'Alamat'}
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i]
                                                    .identityDocumentNumber}
                                            ></CustomTextField>

                                            <CustomTextField
                                                id="postcode"
                                                label={'Poskod'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].postcode}
                                            ></CustomTextField>

                                            <CustomTextField
                                                disabled={!isEditableFamily}
                                                type="date"
                                                id="birthDate"
                                                label={'Tarikh Lahir'}
                                                bind:val={$familyInfoForm
                                                    .families[i].birthDate}
                                            ></CustomTextField>

                                            <CustomSelectField
                                                id="birthCountryId"
                                                label={'Negara Kelahiran'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .countryLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].birthCountryId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="birthStateId"
                                                label={'Negeri Kelahiran'}
                                                options={data.selectionOptions
                                                    .stateLookup}
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].birthStateId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="relationshipId"
                                                label={'Hubungan'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .relationshipLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].relationshipId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="educationLevelId"
                                                label={'Taraf Pendidikan'}
                                                options={data.selectionOptions
                                                    .educationLookup}
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i]
                                                    .educationLevelId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="raceId"
                                                label={'Bangsa'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .raceLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].raceId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="nationalityId"
                                                label={'Kewarganegaraan'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .nationalityLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].nationalityId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="maritalId"
                                                label={'Status Perkhahwinan'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .maritalLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].maritalId}
                                            ></CustomSelectField>

                                            <CustomSelectField
                                                id="genderId"
                                                label={'Jantina'}
                                                options={data.selectionOptions
                                                    .genderLookup}
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].genderId}
                                            ></CustomSelectField>

                                            <CustomTextField
                                                id="workAddress"
                                                label={'Alamat Majikan'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].workAddress}
                                            ></CustomTextField>

                                            <CustomTextField
                                                id="workPostcode"
                                                label={'Poskod Majikan'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].workPostcode}
                                            ></CustomTextField>

                                            <CustomTextField
                                                id="phoneNumber"
                                                label={'Nombor Mobil'}
                                                type="text"
                                                disabled={!isEditableFamily}
                                                bind:val={$familyInfoForm
                                                    .families[i].phoneNumber}
                                            ></CustomTextField>

                                            <CustomTextField
                                                type="date"
                                                disabled={!isEditableFamily}
                                                id="marriageDate"
                                                label={'Tarikh Kahwin'}
                                                bind:val={$familyInfoForm
                                                    .families[i].marriageDate}
                                            ></CustomTextField>

                                            <CustomSelectField
                                                id="inSchool"
                                                label={'Bersekolah'}
                                                disabled={!isEditableFamily}
                                                options={data.selectionOptions
                                                    .generalLookup}
                                                bind:val={$familyInfoForm
                                                    .families[i].inSchool}
                                            ></CustomSelectField>
                                        </CustomTabContent>
                                    {/each}
                                </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!------ Maklumat Tanggungan Selain Isteri dan Anak ----->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Tanggungan Selain Isteri dan Anak"
                    >
                        {#if !isCreateDependency}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Maklumat"
                                onClick={() => (isCreateDependency = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateDependency}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isCreateDependency = false)}
                            />
                        {/if}
                        {#if !isEditableDependency}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableDependency = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="dependencyInfoForm"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isEditableDependency = false)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if isCreateDependency}
                            {#if tempDependency.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempDependency as nonFamily, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat Selain
                                                Suami/Isteri dan Anak - {nonFamily.name}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                            <!-- {/if} -->
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Tanggungan Selain Isteri dan Anak"
                                    onClick={() => {
                                        openNonFamilyInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}
                        <form
                            id="dependencyInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:dependencyInfoEnhance
                            method="POST"
                        >
                            {#if $dependencyInfoForm.dependents.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                            <CustomTab id="dependents">
                                {#each Object.entries($dependencyInfoForm.dependents) as [key, _], i}
                                    <CustomTabContent
                                        title={i +
                                            1 +
                                            '. ' +
                                            $dependencyInfoForm.dependents[i]
                                                .name}
                                    >
                                        <CustomTextField
                                            id="name"
                                            label={'Nama'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].name}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="alternativeName"
                                            label={'Nama Lain'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].alternativeName}
                                        ></CustomTextField>
                                        <CustomSelectField
                                            id="identityDocumentColor"
                                            label={'Jenis Kad Pengenalan'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .identityCardColorLookup}
                                            val=""
                                        ></CustomSelectField>
                                        <CustomTextField
                                            id="identityDocumentNumber"
                                            type="number"
                                            label={'Nombor Kad Pengenalan'}
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i]
                                                .identityDocumentColor}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="address"
                                            label={'Alamat'}
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i]
                                                .identityDocumentNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="postcode"
                                            label={'Poskod'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].postcode}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={!isEditableDependency}
                                            type="date"
                                            id="birthDate"
                                            label={'Tarikh Lahir'}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].birthDate}
                                        ></CustomTextField>

                                        <CustomSelectField
                                            id="birthCountryId"
                                            label={'Negara Kelahiran'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .countryLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].birthCountryId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="birthStateId"
                                            label={'Negeri Kelahiran'}
                                            options={data.selectionOptions
                                                .stateLookup}
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].birthStateId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="relationshipId"
                                            label={'Hubungan'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .relationshipLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].relationshipId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="educationLevelId"
                                            label={'Taraf Pendidikan'}
                                            options={data.selectionOptions
                                                .educationLookup}
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].educationLevelId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="raceId"
                                            label={'Bangsa'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .raceLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].raceId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="nationalityId"
                                            label={'Kewarganegaraan'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .nationalityLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].nationalityId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="maritalId"
                                            label={'Status Perkhahwinan'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .maritalLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].maritalId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="genderId"
                                            label={'Jantina'}
                                            options={data.selectionOptions
                                                .genderLookup}
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].genderId}
                                        ></CustomSelectField>

                                        <CustomTextField
                                            id="workAddress"
                                            label={'Alamat Majikan'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].workAddress}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="workPostcode"
                                            label={'Poskod Majikan'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].workPostcode}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="phoneNumber"
                                            label={'Nombor Mobil'}
                                            type="text"
                                            disabled={!isEditableDependency}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].phoneNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            type="date"
                                            id="marriageDate"
                                            disabled={!isEditableDependency}
                                            label={'Tarikh Kahwin'}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].marriageDate}
                                        ></CustomTextField>

                                        <CustomSelectField
                                            id="inSchool"
                                            label={'Bersekolah'}
                                            disabled={!isEditableDependency}
                                            options={data.selectionOptions
                                                .generalLookup}
                                            bind:val={$dependencyInfoForm
                                                .dependents[i].inSchool}
                                        ></CustomSelectField>
                                    </CustomTabContent>
                                {/each}
                            </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <!------------------------------------------------------->
                <!-----------------Maklumat Waris--------------------->
                <!------------------------------------------------------->

                <StepperContent>
                    <StepperContentHeader title="Maklumat Waris">
                        {#if !isCreateNextOfKin}
                            <TextIconButton
                                type="neutral"
                                label="Tambah Maklumat"
                                onClick={() => (isCreateNextOfKin = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={submitCreateNextOfKin}
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isCreateNextOfKin = false)}
                            />
                        {/if}
                        {#if !isEditableNextOfKin}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() => (isEditableNextOfKin = true)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="nextOfKinInfoForm"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() => (isEditableNextOfKin = false)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if isCreateNextOfKin}
                            {#if tempNextOfKin.length > 0}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-accent p-2.5"
                                >
                                    <div class="mb-2.5 text-sm font-medium">
                                        <p>Preview Rekod Untuk Disimpan</p>
                                    </div>
                                    {#each tempNextOfKin as nextOfKin, i}
                                        <div
                                            class="text-sm text-system-primary"
                                        >
                                            <p>
                                                {i + 1}. Maklumat Waris - {nextOfKin.name}
                                            </p>
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                            <!-- {/if} -->
                            <div
                                class="w-full rounded-[3px] border-b border-t p-2.5"
                            >
                                <TextIconButton
                                    type="primary"
                                    label="Tambah Waris"
                                    onClick={() => {
                                        openNextOfKinInfoModal = true;
                                    }}
                                >
                                    <SvgPlus></SvgPlus>
                                </TextIconButton>
                            </div>
                        {/if}
                        <form
                            id="nextOfKinInfoForm"
                            class="flex w-full flex-col gap-2"
                            use:nextOfKinInfoEnhance
                            method="POST"
                        >
                            {#if $nextOfKinInfoForm.nextOfKins.length < 1}
                                <div
                                    class="text-center text-sm italic text-system-primary"
                                >
                                    Tiada maklumat.
                                </div>
                            {:else}
                            <CustomTab id="nextOfKins">
                                {#each Object.entries($nextOfKinInfoForm.nextOfKins) as [key, _], i}
                                    <CustomTabContent
                                    title={i +
                                        1 +
                                        '. ' +
                                        $familyInfoForm.families[i]
                                            .name}>
                                        <CustomTextField
                                            id="name"
                                            label={'Nama'}
                                            type="text"
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].name}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="alternativeName"
                                            label={'Nama Lain'}
                                            type="text"
                                            disabled
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].alternativeName}
                                        ></CustomTextField>
                                        <CustomSelectField
                                            id="identityDocumentColor"
                                            label={'Jenis Kad Pengenalan'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .identityCardColorLookup}
                                            val=""
                                        ></CustomSelectField>
                                        <CustomTextField
                                            id="identityDocumentNumber"
                                            type="number"
                                            label={'Nombor Kad Pengenalan'}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i]
                                                .identityDocumentColor}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="address"
                                            label={'Alamat'}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i]
                                                .identityDocumentNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="postcode"
                                            label={'Poskod'}
                                            type="text"
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].postcode}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={!isEditableNextOfKin}
                                            type="date"
                                            id="birthDate"
                                            label={'Tarikh Lahir'}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].birthDate}
                                        ></CustomTextField>

                                        <CustomSelectField
                                            id="birthCountryId"
                                            label={'Negara Kelahiran'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .countryLookup}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].birthCountryId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="birthStateId"
                                            label={'Negeri Kelahiran'}
                                            options={data.selectionOptions
                                                .stateLookup}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].birthStateId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="relationshipId"
                                            label={'Hubungan'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .relationshipLookup}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].relationshipId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="educationLevelId"
                                            label={'Taraf Pendidikan'}
                                            options={data.selectionOptions
                                                .educationLookup}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].educationLevelId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="raceId"
                                            label={'Bangsa'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .raceLookup}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].raceId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="nationalityId"
                                            label={'Kewarganegaraan'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .nationalityLookup}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].nationalityId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="maritalId"
                                            label={'Status Perkhahwinan'}
                                            disabled={!isEditableNextOfKin}
                                            options={data.selectionOptions
                                                .maritalLookup}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].maritalId}
                                        ></CustomSelectField>

                                        <CustomSelectField
                                            id="genderId"
                                            label={'Jantina'}
                                            options={data.selectionOptions
                                                .genderLookup}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].genderId}
                                        ></CustomSelectField>

                                        <CustomTextField
                                            id="workAddress"
                                            label={'Alamat Majikan'}
                                            type="text"
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].workAddress}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="workPostcode"
                                            label={'Poskod Majikan'}
                                            type="text"
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].workPostcode}
                                        ></CustomTextField>

                                        <CustomTextField
                                            id="phoneNumber"
                                            label={'Nombor Mobil'}
                                            type="text"
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].phoneNumber}
                                        ></CustomTextField>

                                        <CustomTextField
                                            disabled={!isEditableNextOfKin}
                                            type="date"
                                            id="marriageDate"
                                            label={'Tarikh Kahwin'}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].marriageDate}
                                        ></CustomTextField>

                                        <CustomSelectField
                                            id="inSchool"
                                            label={'Bersekolah'}
                                            disabled={!isEditableNextOfKin}
                                            bind:val={$nextOfKinInfoForm
                                                .nextOfKins[i].inSchool}
                                        ></CustomSelectField>
                                    </CustomTabContent>
                                {/each}
                            </CustomTab>
                            {/if}
                        </form>
                    </StepperContentBody>
                </StepperContent>

                <StepperContent>
                    <StepperContentHeader
                        title="Dokumen - Dokumen Sokongan yang Berkaitan"
                    >
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="documentUploadForm"
                        />
                    </StepperContentHeader>
                    <StepperContentBody
                        ><div class="flex w-full flex-col gap-2">
                            <p class="text-sm">
                                Sila muat turun, isi dengan lengkap dokumen
                                berikut, kemudian muat naik dokumen pada ruangan
                                yang disediakan.
                            </p>

                            <ul
                                class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                            >
                                <li>
                                    <button class="underline">
                                        Borang Lantikan Baru</button
                                    >
                                </li>
                            </ul>

                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >Sila muat naik dokumen barkaitan.</span
                            >

                            <!-- <form
                                    id="documentUploadForm"
                                    method="POST"
                                    use:documentFormEnhance
                                    enctype="multipart/form-data"
                                > -->
                            <ContentHeader
                                title="Dokumen Sokongan"
                                borderClass="border-none"
                            >
                                <div>
                                    <FileInputField
                                        id="document"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            </ContentHeader>
                            <div
                                class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                            >
                                <div class="flex flex-wrap gap-3">
                                    <!-- {#each $documentForm.document as item, index} -->
                                    <!-- {#if $documentForm.document instanceof File}
                                                <FileInputFieldChildren
                                                    childrenType="grid"
                                                    handleDelete={() => handleDelete()}
                                                    fileName={$documentForm.document?.name}
                                                />
                                            {/if} -->
                                    <!-- {/each} -->
                                </div>
                                <div
                                    class="flex flex-col items-center justify-center gap-2.5"
                                >
                                    <!-- <p
                                                class=" text-sm text-txt-tertiary"
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            >
                                                Pilih fail dari peranti anda.
                                            </p> -->
                                    <p>Pilih fail dari peranti anda.</p>
                                    <!-- <div
                                                class="text-txt-tertiary"
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            > -->
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
                                <!-- <div
                                                hidden={$documentForm.document instanceof
                                                    File}
                                            >
                                                <FileInputField id="document"
                                                ></FileInputField>
                                            </div> -->
                            </div>
                        </div>
                        <!-- </form> -->

                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <ContentHeader
                                title="Dokumen - Dokumen Sokongan yang Berkaitan"
                            ></ContentHeader>
                            <p
                                class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                            >
                                Fail-fail yang dimuat naik:
                            </p>

                            <!-- {#each currentEmployeeUploadedDocuments as item, i} -->
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <label
                                    for=""
                                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    >1.</label
                                >
                                <!-- <DownloadAttachment
                                            triggerDownload={() =>
                                                handleDownload(
                                                    data.documentInfoResponse.data?.details
                                                        .attachment,
                                                )}
                                            fileName={data.documentInfoResponse.data
                                                ?.details.attachment}
                                        ></DownloadAttachment> -->
                            </div>
                            <!-- {/each} -->
                        </div>

                        <!-- </div> -->
                    </StepperContentBody>
                </StepperContent>
            </Stepper>
        </CustomTabContent>

        <CustomTabContent title="GajiElaun">
            <CustomTable enableDetail bind:tableData={salaryTable}
            ></CustomTable>
        </CustomTabContent>

        <CustomTabContent title="RekodKesihatan">
            <Stepper>
                <StepperContent>
                    <StepperContentHeader title="Sejarah Penyakit">
                        {#if isReadonlyHistoryMedicalFormStepper}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() =>
                                    (isReadonlyHistoryMedicalFormStepper = false)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={() =>
                                    (isReadonlyHistoryMedicalFormStepper = false)}
                                form="FormStepperSejarahPenyakit"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() =>
                                    (isReadonlyHistoryMedicalFormStepper = true)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <!------------------------------------------->
                    <!----------- Sejarah Penyakit -------------->
                    <!------------------------------------------->
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            <form
                                id="FormStepperSejarahPenyakit"
                                class="flex w-full flex-col gap-2"
                                use:medicalHistoryEnhance
                                method="POST"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    {#each data.diseaseCollectionForm.data.medicalHistory as formDisease, index}
                                        <div class="flex flex-row">
                                            <!-- <label
                                                for="diseases"
                                                class="w-full min-w-[220px] text-sm"
                                                >{$medicalHistoryForm
                                                    .medicalHistory[i]
                                                    .diseases}</label
                                            > -->
                                            <label
                                                for="diseases"
                                                class="w-full min-w-[220px] text-sm"
                                                >{formDisease.disease}</label
                                            >

                                            <CustomRadioBoolean
                                                disabled={isReadonlyHistoryMedicalFormStepper}
                                                options={commonOptions}
                                                id="isPesonal"
                                                bind:val={formDisease.isPersonal}
                                                label=""
                                            ></CustomRadioBoolean>
                                            <CustomRadioBoolean
                                                label=""
                                                disabled={isReadonlyHistoryMedicalFormStepper}
                                                options={commonOptions}
                                                id="isPesonal"
                                                bind:val={formDisease.isFamily}
                                            ></CustomRadioBoolean>

                                            <CustomTextField
                                                disabled={isReadonlyHistoryMedicalFormStepper}
                                                id="remark"
                                                label=""
                                                type="text"
                                                bind:val={formDisease.remark}
                                            ></CustomTextField>
                                        </div>
                                    {/each}
                                    <!-- {#each $medicalHistoryForm.medicalHistory as _, i}
                                        <div class="flex flex-row"> -->
                                    <!-- <label
                                                for="diseases"
                                                class="w-full min-w-[220px] text-sm"
                                                >{$medicalHistoryForm
                                                    .medicalHistory[i]
                                                    .diseases}</label
                                            > -->
                                    <!-- <label
                                                for="diseases"
                                                class="w-full min-w-[220px] text-sm"
                                                >{data.diseaseList.disease[i]}</label
                                            >
                                            <input
                                                hidden
                                                bind:value={$medicalHistoryForm
                                                    .medicalHistory[i].id}
                                            />
                                            <CustomRadioBoolean
                                                disabled
                                                options={commonOptions}
                                                id="isPesonal"
                                                bind:val={$medicalHistoryForm
                                                    .medicalHistory[i]
                                                    .isPersonal}
                                            ></CustomRadioBoolean>
                                            <CustomRadioBoolean
                                                disabled
                                                options={commonOptions}
                                                id="isFamily"
                                                bind:val={$medicalHistoryForm
                                                    .medicalHistory[i].isFamily}
                                            ></CustomRadioBoolean>
                                            <CustomTextField
                                                disabled
                                                id="remark"
                                                label=""
                                                type="text"
                                                bind:val={$medicalHistoryForm
                                                    .medicalHistory[i].remark}
                                            ></CustomTextField>
                                        </div>
                                    {/each} -->
                                    <!-- <table
                                    class="text-left text-sm {stepperFormTitleClass}"
                                >
                                        

                                    <tr>
                                        <th></th>
                                        <th>SENDIRI</th>
                                        <th>KELUARGA</th>
                                        <th>ULASAN</th>
                                    </tr>
                                    <tr>
                                        <td>Penyakit sejak lahir atau baka</td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriPenyakitSejakLahir"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaPenyakitSejakLahir"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="penyakitSejakLahir"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Alahan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAlahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAlahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="alahan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sakit jiwa</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSakitJiwa"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSakitJiwa"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sakitJiwa"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr><tr>
                                        <td
                                            >Epilepsi, sawan, angin ahmar,
                                            penyakit saraf</td
                                        >
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriEpilepsi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaEpilepsi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="epilepsi"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr><tr>
                                        <td>Darah tinggi</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriDarahTinggi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaDarahTinggi"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="darahTinggi"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kencing manis</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKencingManis"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKencingManis"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="kencingManis"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Jantung atatu salur darah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriJantung"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaJantung"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="jantungAtatuSalurDarah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Asma</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAsma"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAsma"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="asma"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sakit buah pinggang</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSakitBuahPinggang"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSakitBuahPinggang"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sakitBuahPinggang"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Barah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriBarah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaBarah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="barah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Batuk kering</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriBatukKering"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaBatukKering"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="batukKering"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ketagihan dadah</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKetagihanDadah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKetagihanDadah"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="ketagihanDadah"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AIDS, HIV</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriAIDS"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaAIDS"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="AIDS"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Hepatitis B</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriHepatitisB"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaHepatitisB"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="hepatitisB"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sejarah pembedahan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSejarahPembedahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSejarahPembedahan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sejarahPembedahan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Kecacatan anggota, pancaindera</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriKecacatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaKecacatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="kecacatan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Merokok</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriMerokok"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaMerokok"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="merokok"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Penyakit serius lain</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriPenyakitSeriusLain"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaPenyakitSeriusLain"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="penyakitSeriusLain"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sedang menerima rawatan</td>
                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="sendiriSedangMenerimaRawatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>

                                        <td>
                                            <CustomRadioBoolean
                                                disabled
                                                id="keluargaSedangMenerimaRawatan"
                                                val=""
                                                label=""
                                            ></CustomRadioBoolean>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                disabled
                                                id="sedangMenerimaRawatan"
                                                label=""
                                                type="text"
                                                val=""
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table> -->
                                </div>
                            </form>
                        </div></StepperContentBody
                    >
                </StepperContent>

                <!------------------------------------------->
                <!---------- Pemeriksaan Doktor ------------->
                <!------------------------------------------->
                <StepperContent>
                    <StepperContentHeader title="Pemeriksaan Doktor">
                        {#if isGeneralMedicalFormStepper}
                            <TextIconButton
                                type="neutral"
                                label="Kemaskini"
                                onClick={() =>
                                    (isGeneralMedicalFormStepper = false)}
                            />
                        {:else}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                onClick={() =>
                                    (isGeneralMedicalFormStepper = false)}
                                form="FormStepperPemeriksaanDoktor"
                            />
                            <TextIconButton
                                type="neutral"
                                label="Kembali"
                                onClick={() =>
                                    (isGeneralMedicalFormStepper = true)}
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <form
                            id="FormStepperPemeriksaanDoktor"
                            class="flex w-full flex-col gap-2"
                            use:generalMedicalEnhance
                            method="POST"
                        >
                            <div
                                class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5"
                            >
                                <p class="text-sm font-bold">Pemeriksaan Am</p>
                                <CustomTextField
                                    errors={$generalMedicalErrors.height}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="height"
                                    label="Tinggi (cm)"
                                    type="text"
                                    bind:val={$generalMedicalForm.height}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.weight}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="weight"
                                    label="berat (kg)"
                                    type="text"
                                    bind:val={$generalMedicalForm.weight}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.BMI}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="BMI"
                                    label="BMI"
                                    type="text"
                                    bind:val={$generalMedicalForm.BMI}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.BPM}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="BPM"
                                    label="Denyutan Nadi (setiap minit )"
                                    type="text"
                                    bind:val={$generalMedicalForm.BPM}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.BP}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="BP"
                                    label="BP (mmHg)"
                                    type="text"
                                    bind:val={$generalMedicalForm.BP}
                                ></CustomTextField>

                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.paleSkin}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="paleSkin"
                                    label="Kulit pucat"
                                    bind:val={$generalMedicalForm.paleSkin}
                                ></CustomRadioBoolean>

                                <CustomRadioBoolean
                                    disabled={isGeneralMedicalFormStepper}
                                    errors={$generalMedicalErrors.cyanosis}
                                    id="cyanosis"
                                    label="Sianosis"
                                    bind:val={$generalMedicalForm.cyanosis}
                                ></CustomRadioBoolean>
                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.edema}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="edema"
                                    label="Edama"
                                    bind:val={$generalMedicalForm.edema}
                                ></CustomRadioBoolean>

                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.jaundice}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="jaundice"
                                    label="Penyakit kuning"
                                    bind:val={$generalMedicalForm.jaundice}
                                ></CustomRadioBoolean>

                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.lymphGlands}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="lymphGlands"
                                    label="Kelenjar limfa"
                                    bind:val={$generalMedicalForm.lymphGlands}
                                ></CustomRadioBoolean>

                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.skinDisease}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="skinDisease"
                                    label="Penyakit kulit"
                                    bind:val={$generalMedicalForm.skinDisease}
                                ></CustomRadioBoolean>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <p class="text-sm font-bold">Mata</p>
                                <table class="text-left text-sm">
                                    <tr>
                                        <td
                                            class="w-[220px] min-w-[220px] max-w-[220px]"
                                            >Penglihatan Tanpa Bantuan</td
                                        >
                                        <td
                                            class="w-[200px] min-w-[160px] max-w-[220px]"
                                        >
                                            <CustomTextField
                                                errors={$generalMedicalErrors.unaidedVisionLeft}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="unaidedVisionLeft"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.unaidedVisionLeft}
                                            ></CustomTextField>
                                        </td>

                                        <td>
                                            <CustomTextField
                                                errors={$generalMedicalErrors.unaidedVisionRight}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="unaidedVisionRight"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.unaidedVisionRight}
                                            ></CustomTextField>
                                        </td>
                                        <!-- ================================== -->
                                        <!-- <td> -->
                                        <!-- <CustomTextField
                                   disabled={isGeneralMedicalFormStepper}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan3
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan3}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan3[0]}</span
                                    >
                                {/if} -->
                                        <!-- </td> -->
                                        <!-- </tr>
                                    <tr> -->
                                        <!-- <td>Penglihatan Tanpa Bantuan</td>
                            <td>
                                <CustomTextField
                                   disabled={isGeneralMedicalFormStepper}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan4
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan4"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan4}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan4}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan4[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <CustomTextField
                                   disabled={isGeneralMedicalFormStepper}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan5
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan5"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan5}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan5}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan5[0]}</span
                                    >
                                {/if}
                            </td>
                            <td>
                                <CustomTextField
                                   disabled={isGeneralMedicalFormStepper}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanTanpaBantuan6
                                        ? true
                                        : false}
                                    id="penglihatanTanpaBantuan6"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanTanpaBantuan6}
                                ></CustomTextField>
                                {#if $pemeriksaanDoktorErrors.penglihatanTanpaBantuan6}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanTanpaBantuan6[0]}</span
                                    >
                                {/if}
                            </td>-->
                                    </tr>
                                    <tr>
                                        <!-- ========================================== -->
                                        <td>Penglihatan Dengan Bantuan</td>
                                        <td>
                                            <CustomTextField
                                                errors={$generalMedicalErrors.aidedVisionLeft}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="aidedVisionLeft"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.aidedVisionLeft}
                                            ></CustomTextField>
                                        </td>
                                        <td>
                                            <CustomTextField
                                                errors={$generalMedicalErrors.aidedVisionRight}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="aidedVisionRight"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.aidedVisionRight}
                                            ></CustomTextField>
                                        </td>
                                        <!-- ============================================= -->
                                        <!-- <td>
                                <CustomTextField
                                   disabled={isGeneralMedicalFormStepper}
                                    hasError={$pemeriksaanDoktorErrors.penglihatanDenganBantuan3
                                        ? true
                                        : false}
                                    id="penglihatanDenganBantuan3"
                                    label=""
                                    type="text"
                                    bind:value={$pemeriksaanDoktorForm.penglihatanDenganBantuan3}
                                ></CustomTextField>

                                {#if $pemeriksaanDoktorErrors.penglihatanDenganBantuan3}
                                    <span
                                        class="ml-[0px] font-sans text-sm italic text-system-danger"
                                        >{$pemeriksaanDoktorErrors
                                            .penglihatanDenganBantuan3[0]}</span
                                    >
                                {/if}
                            </td> -->
                                        <!-- ===================================================== -->
                                    </tr>

                                    <tr>
                                        <td>Penglihatan Warna</td>
                                        <!-- <td> -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.colourVision}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="colourVision"
                                                label=""
                                                bind:val={$generalMedicalForm.colourVision}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.colourVision}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="colourVision"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.colourVision}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Funduskopi</td>
                                        <!-- <td> -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.colourVision}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="colourVision"
                                                label=""
                                                bind:val={$generalMedicalForm.colourVision}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.fundoscopic}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="fundoscopic"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.fundoscopic}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <table class="text-left text-sm">
                                    <tr>
                                        <td
                                            class="w-[220px] min-w-[220px] max-w-[220px]"
                                            ><p class="text-sm font-bold">
                                                Telinga
                                            </p></td
                                        >
                                        <!-- <td
                                            class="w-[160px] min-w-[160px] max-w-[160px]"
                                        > -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.ear}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="ear"
                                                label=""
                                                bind:val={$generalMedicalForm.ear}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.ear}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="ear"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.ear}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p class="text-sm font-bold">
                                                Rongga gigi dan mulut
                                            </p>
                                        </td>
                                        <!-- <td>
                                            <CustomRadioBoolean
                                                errors={$generalMedicalErrors.dental}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="dental"
                                                label=""
                                                bind:val={$generalMedicalForm.dental}
                                            ></CustomRadioBoolean>
                                        </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.dental}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="dental"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.dental}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            ><p class="text-sm font-bold">
                                                Leher
                                            </p></td
                                        >
                                        <!-- <td>
                                            <CustomRadioBoolean
                                                errors={$generalMedicalErrors.neck}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="neck"
                                                label=""
                                                bind:val={$generalMedicalForm.neck}
                                            ></CustomRadioBoolean>
                                        </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.neck}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="neck"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.neck}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            ><p class="text-sm font-bold">
                                                Kardiovaskular
                                            </p></td
                                        >
                                        <!-- <td> -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.cardiovascular}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="cardiovascular"
                                                label=""
                                                bind:val={$generalMedicalForm.cardiovascular}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.cardiovascular}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="cardiovascular"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.cardiovascular}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <p class="text-sm font-bold">
                                    Sistem pernafasan
                                </p>
                                <table class="text-left text-sm">
                                    <tr>
                                        <td
                                            class="w-[220px] min-w-[220px] max-w-[220px]"
                                            >Pemeriksaan</td
                                        >
                                        <!-- <td
                                            class="w-[160px] min-w-[160px] max-w-[160px]"
                                        > -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.breathingExam}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="breathingExam"
                                                label=""
                                                bind:val={$generalMedicalForm.breathingExam}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.breathingExam}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="breathingExam"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.breathingExam}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>X-ray</td>
                                        <!-- <td> -->
                                        <!-- <CustomRadioBoolean
                                                errors={$generalMedicalErrors.xray}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="xray"
                                                label=""
                                                bind:val={$generalMedicalForm.xray}
                                            ></CustomRadioBoolean> -->
                                        <!-- </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.xray}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="xray"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.xray}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table>

                                <CustomTextField
                                    errors={$generalMedicalErrors.xrayTaken}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="xrayTaken"
                                    label="Tarikh pengambilan x-ray"
                                    type="date"
                                    bind:val={$generalMedicalForm.xrayTaken}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.xrayLocation}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="xrayLocation"
                                    label="Lokasi pengambilan x-ray"
                                    type="text"
                                    bind:val={$generalMedicalForm.xrayLocation}
                                ></CustomTextField>

                                <CustomTextField
                                    errors={$generalMedicalErrors.xrayReference}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="xrayReference"
                                    label="Nombor Rujukan x-ray"
                                    type="text"
                                    bind:val={$generalMedicalForm.xrayReference}
                                ></CustomTextField>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <table class="text-left text-sm">
                                    <tr>
                                        <td
                                            class="w-[220px] min-w-[220px] max-w-[220px]"
                                            ><p class="text-sm font-bold">
                                                Abdomen dan hernia
                                            </p></td
                                        >
                                        <!-- <td
                                            class="w-[160px] min-w-[160px] max-w-[160px]"
                                        >
                                            <CustomRadioBoolean
                                                errors={$generalMedicalErrors.abdomenHernia}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="abdomenHernia"
                                                label=""
                                                bind:val={$generalMedicalForm.abdomenHernia}
                                            ></CustomRadioBoolean>
                                        </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.abdomenHernia}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="abdomenHernia"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.abdomenHernia}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            ><p class="text-sm font-bold">
                                                Sistem saraf dan keadaan mental
                                            </p></td
                                        >
                                        <!-- <td>
                                            <CustomRadioBoolean
                                                errors={$generalMedicalErrors.mentalState}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="mentalState"
                                                label=""
                                                bind:val={$generalMedicalForm.mentalState}
                                            ></CustomRadioBoolean>
                                        </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.mentalState}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="mentalState"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.mentalState}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td
                                            ><p class="text-sm font-bold">
                                                Sistem muskuloskeletal
                                            </p></td
                                        >
                                        <!-- <td
                                            ><CustomRadioBoolean
                                                errors={$generalMedicalErrors.musculoskeletal}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="musculoskeletal"
                                                label=""
                                                bind:val={$generalMedicalForm.musculoskeletal}
                                            ></CustomRadioBoolean>
                                        </td> -->

                                        <td colspan="2">
                                            <CustomTextField
                                                errors={$generalMedicalErrors.musculoskeletal}
                                                disabled={isGeneralMedicalFormStepper}
                                                id="musculoskeletal"
                                                label=""
                                                type="text"
                                                bind:val={$generalMedicalForm.musculoskeletal}
                                            ></CustomTextField>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                            >
                                <p class="text-sm font-bold">Kencing</p>
                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.sugar}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="sugar"
                                    label="Gula"
                                    bind:val={$generalMedicalForm.sugar}
                                ></CustomRadioBoolean>

                                <CustomRadioBoolean
                                    errors={$generalMedicalErrors.albumin}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="albumin"
                                    label="Albumin"
                                    bind:val={$generalMedicalForm.albumin}
                                ></CustomRadioBoolean>

                                <CustomTextField
                                    errors={$generalMedicalErrors.microscopic}
                                    disabled={isGeneralMedicalFormStepper}
                                    id="microscopic"
                                    label="Mikroskopi"
                                    type="text"
                                    bind:val={$generalMedicalForm.microscopic}
                                ></CustomTextField>
                            </div>
                        </form>
                        <div class="flex w-full flex-col gap-2.5">
                            <!--  <div class="flex w-full flex-col gap-2">
                                    <p class={stepperFormTitleClass}>
                                        Fail-fail yang dimuat naik:
                                    </p> -->
                            <!-- {#each currentEmployeeUploadedDocuments as item, i} -->
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <!-- <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >{i + 1}.</label
                            > -->
                                <!-- <DownloadAttachment fileName={item.documentPath}
                            ></DownloadAttachment> -->
                            </div>
                            <!-- {/each} -->
                        </div>
                        <!-- </div> -->
                    </StepperContentBody>
                </StepperContent>
            </Stepper>
        </CustomTabContent>
    </CustomTab>
</section>

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
        <CustomSelectField
            errors={$addAcademicInfoErrors.majorId}
            id="majorId"
            label={'Jenis Jurusan'}
            bind:val={$addAcademicInfoModal.majorId}
            options={data.selectionOptions.majorMinorLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.minorId}
            id="minorId"
            label={'Jenis Bidang'}
            bind:val={$addAcademicInfoModal.minorId}
            options={data.selectionOptions.majorMinorLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.countryId}
            id="countryId"
            label={'Negara'}
            bind:val={$addAcademicInfoModal.countryId}
            options={data.selectionOptions.countryLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.institutionId}
            id="institutionId"
            label={'Institusi'}
            bind:val={$addAcademicInfoModal.institutionId}
            options={data.selectionOptions.institutionLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pembelajaran'}
            val=""
            options={data.selectionOptions.educationLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.sponsorshipId}
            id="sponsorshipId"
            label={'Penajaan'}
            bind:val={$addAcademicInfoModal.sponsorshipId}
            options={data.selectionOptions.sponsorshipLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addAcademicInfoErrors.name}
            id="name"
            label={'Nama Pencapaian/Sijil'}
            bind:val={$addAcademicInfoModal.name}
        ></CustomTextField>
        <CustomTextField
            errors={$addAcademicInfoErrors.completionDate}
            id="completionDate"
            label="Tarikh Kelulusan"
            type="date"
            bind:val={$addAcademicInfoModal.completionDate}
        ></CustomTextField>
        <CustomTextField
            errors={$addAcademicInfoErrors.finalGrade}
            id="finalGrade"
            label={'Pencapaian Akhir (Gred)'}
            bind:val={$addAcademicInfoModal.finalGrade}
        ></CustomTextField>
        <CustomTextField
            errors={$addAcademicInfoErrors.field}
            id="field"
            label={'Bidang'}
            bind:val={$addAcademicInfoModal.field}
        ></CustomTextField>
        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addAcademicModalForm"
        />
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
        <CustomTextField
            errors={$addExperienceModalErrors.company}
            id="company"
            label={'Nama Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.company}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.address}
            id="address"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.address}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.position}
            id="position"
            label={'Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.position}
        ></CustomTextField>

        <!-- <CustomTextField
            errors={$addExperienceModalErrors.positionCode}
            id="positionCode"
            label={'Kod Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.positionCode}
        ></CustomTextField> -->

        <CustomTextField
            errors={$addExperienceModalErrors.description}
            id="description"
            label={'Keterangan'}
            type="text"
            bind:val={$addExperienceModalForm.description}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.startDate}
            type="date"
            id="startDate"
            label={'Tarikh Mula Bekerja'}
            bind:val={$addExperienceModalForm.startDate}
        ></CustomTextField>
        <CustomTextField
            errors={$addExperienceModalErrors.endDate}
            type="date"
            id="endDate"
            label={'Tarikh Tamat Bekerja'}
            bind:val={$addExperienceModalForm.endDate}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.grade}
            id="grade"
            label={'Gred'}
            type="text"
            bind:val={$addExperienceModalForm.grade}
        ></CustomTextField>
        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addExperienceInfoModal"
        />
        <!-- </form> -->
    </form></Modal
>

<!-- Membership Info Modal -->
<Modal title={'Tambah Kegiatan/Keahlian'} bind:open={openMembershipInfoModal}>
    <form
        id="addMembershipInfoModal"
        class="flex w-full flex-col gap-2"
        use:addActivityModalEnhance
        method="POST"
    >
        <CustomTextField
            errors={$addActivityModalErrors.name}
            id="name"
            label={'Nama Kegiatan'}
            type="text"
            bind:val={$addActivityModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.joinDate}
            id="joinDate"
            type="date"
            label={'Tarikh Keahlian'}
            bind:val={$addActivityModal.joinDate}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.position}
            id="position"
            label={'Jawatan'}
            type="text"
            bind:val={$addActivityModal.position}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.description}
            id="description"
            label={'Catatan'}
            type="text"
            bind:val={$addActivityModal.description}
        ></CustomTextField>

        <TextIconButton
            type="primary"
            label={'Tambah'}
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
        <CustomTextField
            errors={$addFamilyErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.alternativeName}
            id="alternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addFamilyModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addFamilyErrors.identityDocumentColor}
            id="identityDocumentColor"
            label={'Jenis Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addFamilyErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addFamilyModal.address}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addFamilyModal.postcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.birthDate}
            type="date"
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addFamilyModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addFamilyErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            bind:val={$addFamilyModal.birthCountryId}
            options={data.selectionOptions.countryLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            bind:val={$addFamilyModal.birthStateId}
            options={data.selectionOptions.stateLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            bind:val={$addFamilyModal.relationshipId}
            options={data.selectionOptions.relationshipLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            bind:val={$addFamilyModal.educationLevelId}
            options={data.selectionOptions.educationLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            bind:val={$addFamilyModal.raceId}
            options={data.selectionOptions.raceLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            bind:val={$addFamilyModal.nationalityId}
            options={data.selectionOptions.nationalityLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.genderId}
            id="genderId"
            label={'Jantina'}
            bind:val={$addFamilyModal.genderId}
            options={data.selectionOptions.genderLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addFamilyErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addFamilyModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addFamilyErrors.maritalId}
            id="maritalId"
            label={'Status Perkhahwinan'}
            bind:val={$addFamilyModal.maritalId}
            options={data.selectionOptions.maritalLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addFamilyErrors.marriageDate}
            type="date"
            id="marriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$addFamilyModal.marriageDate}
        ></CustomTextField>

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[70px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox id="inSchool" bind:checked={$addFamilyModal.inSchool} />
        </div>
        <br />

        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addFamilyInfoModal"
        />
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
        <CustomTextField
            errors={$addNonFamilyErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addNonFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.alternativeName}
            id="alternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addNonFamilyModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addNonFamilyErrors.identityDocumentColor}
            id="identityDocumentColor"
            label={'Jenis Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addNonFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNonFamilyErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNonFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addNonFamilyModal.address}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNonFamilyModal.postcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.birthDate}
            type="date"
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addNonFamilyModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            bind:val={$addNonFamilyModal.birthCountryId}
            options={data.selectionOptions.countryLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            bind:val={$addNonFamilyModal.birthStateId}
            options={data.selectionOptions.stateLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            bind:val={$addNonFamilyModal.relationshipId}
            options={data.selectionOptions.relationshipLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            bind:val={$addNonFamilyModal.educationLevelId}
            options={data.selectionOptions.educationLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            bind:val={$addNonFamilyModal.raceId}
            options={data.selectionOptions.raceLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            bind:val={$addNonFamilyModal.nationalityId}
            options={data.selectionOptions.nationalityLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.genderId}
            id="genderId"
            label={'Jantina'}
            bind:val={$addNonFamilyModal.genderId}
            options={data.selectionOptions.genderLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addNonFamilyErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addNonFamilyModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNonFamilyErrors.maritalId}
            id="maritalId"
            label={'Status Perkhahwinan'}
            val=""
            options={data.selectionOptions.maritalLookup}
        ></CustomSelectField>

        <CustomTextField
            type="date"
            id="marriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$addNonFamilyModal.marriageDate}
        ></CustomTextField>

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[70px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="inSchool"
                bind:checked={$addNonFamilyModal.inSchool}
            />
        </div>
        <br />

        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addNonFamilyInfoModal"
        />
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
        <CustomTextField
            errors={$addNextOfKinErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addNextOfKinModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.alternativeName}
            id="alternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addNextOfKinModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addNextOfKinErrors.identityDocumentColor}
            id="identityDocumentColor"
            label={'Jenis Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addNextOfKinModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNextOfKinErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNextOfKinModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addNextOfKinModal.address}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNextOfKinModal.postcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.birthDate}
            type="date"
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addNextOfKinModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            bind:val={$addNextOfKinModal.birthCountryId}
            options={data.selectionOptions.countryLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            bind:val={$addNextOfKinModal.birthStateId}
            options={data.selectionOptions.stateLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            bind:val={$addNextOfKinModal.relationshipId}
            options={data.selectionOptions.relationshipLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            bind:val={$addNextOfKinModal.educationLevelId}
            options={data.selectionOptions.educationLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            bind:val={$addNextOfKinModal.raceId}
            options={data.selectionOptions.raceLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            bind:val={$addNextOfKinModal.nationalityId}
            options={data.selectionOptions.nationalityLookup}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.genderId}
            id="genderId"
            label={'Jantina'}
            bind:val={$addNextOfKinModal.genderId}
            options={data.selectionOptions.genderLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addNextOfKinErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addNextOfKinModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNextOfKinErrors.maritalId}
            id="maritalId"
            label={'Status Perkhahwinan'}
            bind:val={$addNextOfKinModal.maritalId}
            options={data.selectionOptions.maritalLookup}
        ></CustomSelectField>

        <CustomTextField
            errors={$addNextOfKinErrors.marriageDate}
            type="date"
            id="marriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$addNextOfKinModal.marriageDate}
        ></CustomTextField>

        <!-- <div class="flex flex-row">
            <label for="addInSchool" class="w-[70px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="inSchool"
                bind:checked={$addNextOfKinModal.inSchool}
            />
        </div> -->

        <CustomSelectField
                                            id="inSchool"
                                            label={'Bersekolah'}
                                            errors={$addNextOfKinErrors.inSchool}
                                            bind:val={$addNextOfKinModal.inSchool}
                                            options={data.selectionOptions.generalLookup}
                                        ></CustomSelectField>

        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addNextOfKinInfoModal"
        />
    </form>
</Modal>
<Toaster />
