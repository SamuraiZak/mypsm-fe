<script lang="ts">
    import { kgtMonthStringLookup } from '$lib/constants/core/dropdown.constant';
    import type { Dependency } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-dependencies-details.dto';
    import type { NextOfKin } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-next-of-kin-details.dto';
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import type { Family } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-family-details.dto';
    import type { Activity } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-activity.dto';
    import type { Academic } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-academic-details.dto';
    import type { Experience } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-experience-details.dto';
    import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import {
        _personalInfoResponseSchema,
        _activityInfoSchema,
        _dependencyListRequestSchema,
        _familyListRequestSchema,
        _nextOfKinListRequestSchema,
        _experienceInfoSchema,
        _setApproversSchema,
        _approvalResultSchema,
        _relationsSchema,
        _academicListRequestSchema,
        _experienceListRequestSchema,
        _activityListRequestSchema,
        _documentsSchema,
        _uploadDocumentsSchema,
        _dependencyListResponseSchema,
        _activityListResponseSchema,
        _experienceListResponseSchema,
        _academicListResponseSchema,
        _serviceInfoResponseSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import {
        _submitAcademicForm,
        _submitAcademicInfoForm,
        _submitActivityForm,
        _submitActivityInfoForm,
        _submitApproverApprovalForm,
        _submitDependencyForm,
        _submitDependencyInfoForm,
        _submitDocumentForm,
        _submitExperienceForm,
        _submitExperienceInfoForm,
        _submitFamilyForm,
        _submitFamilyInfoForm,
        _submitNextOfKinForm,
        _submitNextOfKinInfoForm,
        _submitPersonalForm,
        _submitSecretaryApprovalForm,
        _submitSecretarySetApproverForm,
        _submitServiceForm,
        _submitSupporterApprovalForm,
    } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { Badge } from 'flowbite-svelte';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { Checkbox, Modal, Tooltip } from 'flowbite-svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { getErrorToast } from '$lib/helpers/core/toast.helper.js';
    import { error } from '@sveltejs/kit';
    import { writable } from 'svelte/store';
    import { zod } from 'sveltekit-superforms/adapters';
    import { RetirementBenefitDropdownConstant } from '$lib/constants/dropdown/retirement-benefit.constant';
    import { nricToBirthdate } from '$lib/helpers/core/nricToBirthdate.helper';
    import { setRetirementYear } from '$lib/helpers/mypsm/employment/new-hire/setRetirementDate.helper';
    export let data: PageData;
    let activeIndex: number = 0;

    let newHireSecretaryApprovalIsApproved = writable<boolean>(false);
    let newHireSupporterApprovalIsApproved = writable<boolean>(false);
    let newHireApproverApprovalIsApproved = writable<boolean>(false);

    let isReadonlyPersonalFormStepper = writable<boolean>(false);
    let isReadonlyAcademicFormStepper = writable<boolean>(false);
    let isReadonlyExperienceFormStepper = writable<boolean>(false);
    let isReadonlyActivityFormStepper = writable<boolean>(false);
    let isReadonlyFamilyFormStepper = writable<boolean>(false);
    let isReadonlyDependencyFormStepper = writable<boolean>(false);
    let isReadonlyNextOfKinFormStepper = writable<boolean>(false);
    let isReadonlyDocumentFormStepper = writable<boolean>(false);
    let isReadonlyServiceFormStepper = writable<boolean>(false);
    let isReadonlySecretaryApprovalResult = writable<boolean>(false);
    let isReadonlySetApproversFormStepper = writable<boolean>(false);
    let isReadonlySupporterApprovalResult = writable<boolean>(false);
    let isReadonlyApproverApprovalResult = writable<boolean>(false);
    let isReadonlyEmployeeNumber = writable<boolean>(false);

    $: {
        if (data.newHireFullDetailView.personalDetail.isReadonly) {
            isReadonlyPersonalFormStepper.set(true);
        } else {
            isReadonlyPersonalFormStepper.set(false);
        }

        if (data.newHireFullDetailView.academic.isReadonly) {
            isReadonlyAcademicFormStepper.set(true);
        } else {
            isReadonlyAcademicFormStepper.set(false);
        }

        if (data.newHireFullDetailView.experience.isReadonly) {
            isReadonlyExperienceFormStepper.set(true);
        } else {
            isReadonlyExperienceFormStepper.set(false);
        }

        if (data.newHireFullDetailView.activity.isReadonly) {
            isReadonlyActivityFormStepper.set(true);
        } else {
            isReadonlyActivityFormStepper.set(false);
        }

        if (data.newHireFullDetailView.family.isReadonly) {
            isReadonlyFamilyFormStepper.set(true);
        } else {
            isReadonlyFamilyFormStepper.set(false);
        }

        if (data.newHireFullDetailView.dependent.isReadonly) {
            isReadonlyDependencyFormStepper.set(true);
        } else {
            isReadonlyDependencyFormStepper.set(false);
        }

        if (data.newHireFullDetailView.nextOfKin.isReadonly) {
            isReadonlyNextOfKinFormStepper.set(true);
        } else {
            isReadonlyNextOfKinFormStepper.set(false);
        }

        if (
            data.newHireFullDetailView.document.attachment !== null ||
            data.newHireFullDetailView.document.attachmentName !== null
        ) {
            isReadonlyDocumentFormStepper.set(true);
        } else {
            isReadonlyDocumentFormStepper.set(false);
        }

        if (data.newHireFullDetailView.secretaryUpdate.isReadonly) {
            isReadonlyServiceFormStepper.set(true);
        } else {
            isReadonlyServiceFormStepper.set(false);
        }

        if (
            data.newHireFullDetailView.supporterApprover.supporterId ||
            data.newHireFullDetailView.supporterApprover.approverId
        ) {
            isReadonlySetApproversFormStepper.set(true);
        } else {
            isReadonlySetApproversFormStepper.set(false);
        }

        if (data.newHireFullDetailView.secretaryApproval.status !== null) {
            isReadonlySecretaryApprovalResult.set(true);

            data.newHireFullDetailView.secretaryApproval.status
                ? newHireSecretaryApprovalIsApproved.set(true)
                : newHireSecretaryApprovalIsApproved.set(false);
        } else {
            isReadonlySecretaryApprovalResult.set(false);
        }

        if (data.newHireFullDetailView.supporter.status !== null) {
            isReadonlySupporterApprovalResult.set(true);

            data.newHireFullDetailView.supporter.status
                ? newHireSupporterApprovalIsApproved.set(true)
                : newHireSupporterApprovalIsApproved.set(false);
        } else {
            isReadonlySupporterApprovalResult.set(false);
        }

        if (data.newHireFullDetailView.approver.status !== null) {
            isReadonlyApproverApprovalResult.set(true);

            data.newHireFullDetailView.approver.status
                ? newHireApproverApprovalIsApproved.set(true)
                : newHireApproverApprovalIsApproved.set(false);
        } else {
            isReadonlyApproverApprovalResult.set(false);
        }

        if (data.newHireFullDetailView.employeeNumber !== null) {
            isReadonlyEmployeeNumber.set(true);
        } else {
            isReadonlyEmployeeNumber.set(false);
        }
    }

    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;

    // temporay arrays for list details
    let tempAcademicRecord: Academic[] = [];
    let tempExperienceRecord: Experience[] = [];
    let tempActivityRecord: Activity[] = [];
    let tempFamilyRecord: Family[] = [];
    let tempNonFamilyRecord: Dependency[] = [];
    let tempNextOfKinRecord: NextOfKin[] = [];
    let tempNextOfKinFromFamily: NextOfKin[] = [];

    let isStatusNew: boolean;

    if (data.isCandidateRole) {
        isStatusNew = data.candidateViewTable[0]?.status === 'Baru';
    } else if (data.isEmploymentSecretaryRole) {
        isStatusNew =
            data.newHireStatusResponse.data?.details.status === 'Baru';
    }
    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

    // Superforms
    const { form, errors, enhance } = superForm(data.personalInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_personalInfoResponseSchema),
        onSubmit() {
            _submitPersonalForm($form);
        },
        taintedMessage: false,
    });

    const {
        form: serviceInfoForm,
        errors: serviceInfoErrors,
        enhance: serviceInfoEnhance,
    } = superForm(data.serviceInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_serviceInfoResponseSchema),
        onChange() {
            $serviceInfoForm.retirementDate = setRetirementYear(
                $serviceInfoForm.retirementAge,
                $form.birthDate,
            );
        },
        onSubmit(formData) {
            _submitServiceForm(Number(data.params.id), formData.formData);
        },
    });
    $serviceInfoForm.employmentStatusId = 2;

    const {
        form: secretaryApprovalInfoForm,
        errors: secretaryApprovalInfoErrors,
        enhance: secretaryApprovalInfoEnhance,
    } = superForm(data.secretaryApprovalInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_approvalResultSchema),
        onSubmit() {
            _submitSecretaryApprovalForm(
                Number(data.params.id),
                $secretaryApprovalInfoForm,
            );
        },
    });

    const {
        form: supporterApprovalForm,
        errors: supporterApprovalErrors,
        enhance: supporterApprovalEnhance,
    } = superForm(data.supporterApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_approvalResultSchema),
        onSubmit() {
            _submitSupporterApprovalForm(
                Number(data.params.id),
                $supporterApprovalForm,
            );
        },
    });

    const {
        form: approverApprovalForm,
        errors: approverApprovalErrors,
        enhance: approverApprovalEnhance,
    } = superForm(data.approverApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_approvalResultSchema),
        onSubmit() {
            _submitApproverApprovalForm(
                Number(data.params.id),
                $approverApprovalForm,
            );
        },
    });

    const {
        form: secretarySetApproverForm,
        errors: secretarySetApproverErrors,
        enhance: secretarySetApproverEnhance,
    } = superForm(data.secretarySetApproversForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'auto',
        validators: zod(_setApproversSchema),
        onSubmit(formData) {
            _submitSecretarySetApproverForm(
                Number(data.params.id),
                formData.formData,
            );
        },
    });

    const { form: academicInfoForm } = superForm(data.academicInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const {
        form: experienceInfoForm,
        errors: experienceInfoErrors,
        enhance: experienceInfoEnhance,
    } = superForm(data.experienceInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: zod(_experienceListResponseSchema),
    });

    const {
        form: activityInfoForm,
        errors: activityInfoErrors,
        enhance: activityInfoEnhance,
    } = superForm(data.activityInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: zod(_activityListResponseSchema),
    });

    const {
        form: familyInfoForm,
        errors: familyInfoErrors,
        enhance: familyInfoEnhance,
    } = superForm(data.familyInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: zod(_dependencyListResponseSchema),
    });

    const {
        form: dependencyInfoForm,
        errors: dependencyInfoErrors,
        enhance: dependencyInfoEnhance,
    } = superForm(data.dependencyInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: zod(_dependencyListResponseSchema),
    });

    const {
        form: nextOfKinInfoForm,
        errors: nextOfKinInfoErrors,
        enhance: nextOfKinInfoEnhance,
    } = superForm(data.nextOfKinInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: zod(_dependencyListResponseSchema),
    });

    const {
        form: documentForm,
        errors: documentFormErrors,
        enhance: documentFormEnhance,
    } = superForm(data.newHireDocumentForm, {
        SPA: true,
        invalidateAll: false,
        resetForm: false,
        taintedMessage: false,
        validators: zod(_uploadDocumentsSchema),
        onSubmit() {
            _submitDocumentForm($documentForm.document);
        },
    });

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
        validationMethod: 'auto',
        validators: zod(_academicInfoSchema),
        async onSubmit(formData) {
            const result = await superValidate(
                formData.formData,
                zod(_academicInfoSchema),
            );

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
        validationMethod: 'auto',
        validators: zod(_experienceInfoSchema),
        async onSubmit(formData) {
            for (const pair of formData.formData.entries()) {
                console.log(pair[0], pair[1]);
            }
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
        validationMethod: 'auto',
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
        validationMethod: 'auto',
        validators: zod(_relationsSchema),
        onChange() {
            // family info
            $addFamilyModal.birthDate = nricToBirthdate(
                $addFamilyModal.identityDocumentNumber,
            );
        },
        async onSubmit() {
            const result = await superValidate(
                $addFamilyModal,
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

    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'auto',
        validators: zod(_relationsSchema),
        onChange() {
            // non family info
            $addNonFamilyModal.birthDate = nricToBirthdate(
                $addNonFamilyModal.identityDocumentNumber,
            );
        },
        async onSubmit() {
            const result = await superValidate(
                $addNonFamilyModal,
                zod(_relationsSchema),
            );

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempNonFamilyRecord = [
                ...tempNonFamilyRecord,
                result.data as Dependency,
            ];
            openNonFamilyInfoModal = false;
        },
    });
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: false,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'allow',
        validationMethod: 'auto',
        validators: zod(_relationsSchema),
        onChange() {
            // next kin info
            $addNextOfKinModal.birthDate = nricToBirthdate(
                $addNextOfKinModal.identityDocumentNumber,
            );
        },
        async onSubmit() {
            const result = await superValidate(
                $addNextOfKinModal,
                zod(_relationsSchema),
            );

            if (!result.valid) {
                getErrorToast();
                error(400, 'Validation not passed, please check every fields.');
            }

            tempNextOfKinRecord = [
                ...tempNextOfKinRecord,
                result.data as NextOfKin,
            ];

            openNextOfKinInfoModal = false;
        },
    });

    // Set birthdate automatically based on NRIC
    // personal info
    $form.birthDate = nricToBirthdate($form.identityDocumentNumber);

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
            birthDate: tempData.birthDate,
            workAddress: tempData.workAddress,
            workPostcode: tempData.workPostcode,
            phoneNumber: tempData.phoneNumber,
            marriageDate: tempData.marriageDate,
            inSchool: tempData.inSchool,
        }));

        tempNextOfKinRecord = [
            ...tempNextOfKinRecord,
            ...tempData,
        ] as NextOfKin[];
        _submitNextOfKinInfoForm(tempNextOfKinRecord);
    };

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        $documentForm.document = [additionalFiles[0]];
    };

    const handleDownload = async (url: string) => {
        await EmploymentServices.downloadAttachment(url);
    };

    // Function to handle the file deletion
    const handleDelete = (i: number) => {
        $documentForm.document = $documentForm.document.filter((_, index) => {
            return index !== i;
        });
    };
</script>

<ContentHeader title="Maklumat Lantikan Baru">
    {#if $isReadonlyApproverApprovalResult && $newHireSecretaryApprovalIsApproved}
        <Badge color="green">Proses Lantikan Baru Berjaya</Badge>
    {/if}
    {#if ($isReadonlySecretaryApprovalResult && !$newHireSecretaryApprovalIsApproved) || ($isReadonlySupporterApprovalResult && !$newHireSupporterApprovalIsApproved) || ($isReadonlyApproverApprovalResult && !$newHireApproverApprovalIsApproved)}
        <Badge color="red">Proses Lantikan Baru Tidak Berjaya</Badge>
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper bind:activeIndex>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !$isReadonlyPersonalFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="personalFormStepper"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="personalFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <CustomTextField
                    placeholder="-"
                    disabled
                    isRequired={false}
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:val={$form.identityDocumentNumber}
                ></CustomTextField>

                <CustomTextField
                    placeholder="-"
                    disabled
                    isRequired={false}
                    errors={$errors.name}
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    bind:val={$form.name}
                ></CustomTextField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.titleId}
                    id="titleId"
                    label={'Gelaran Nama'}
                    bind:val={$form.titleId}
                    options={data.selectionOptions.titleLookup}
                ></CustomSelectField>

                <CustomTextField
                    placeholder="-"
                    disabled={$isReadonlyPersonalFormStepper}
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={$form.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    placeholder="-"
                    disabled={$isReadonlyPersonalFormStepper}
                    id="statusPekerjaan"
                    label="Emel Pekerja"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.identityDocumentColor}
                    id="identityDocumentColor"
                    label="Jenis Kad Pengenalan"
                    bind:val={$form.identityDocumentColor}
                    options={data.selectionOptions.identityCardColorLookup}
                ></CustomSelectField>

                <CustomTextField
                    placeholder="-"
                    disabled
                    isRequired={false}
                    errors={$errors.birthDate}
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={$form.birthDate}
                ></CustomTextField>
                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.birthStateId}
                    id="birthStateId"
                    label="Negeri Kelahiran"
                    bind:val={$form.birthStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.birthCountryId}
                    id="birthCountryId"
                    label="Negara Kelahiran"
                    bind:val={$form.birthCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.nationalityId}
                    id="nationalityId"
                    label="Warganegara"
                    bind:val={$form.nationalityId}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.raceId}
                    id="raceId"
                    label="Bangsa"
                    bind:val={$form.raceId}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.ethnicId}
                    id="ethnicId"
                    label="Etnik"
                    bind:val={$form.ethnicId}
                    options={data.selectionOptions.ethnicityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.religionId}
                    id="religionId"
                    label="Agama"
                    bind:val={$form.religionId}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.genderId}
                    id="genderId"
                    label="Jantina"
                    bind:val={$form.genderId}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.maritalId}
                    id="maritalId"
                    label="Status Perkahwinan"
                    bind:val={$form.maritalId}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomTextField
                    placeholder="-"
                    errors={$errors.homeAddress}
                    disabled={$isReadonlyPersonalFormStepper}
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={$form.homeAddress}
                />

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.homeCountryId}
                    id="homeCountryId"
                    label="Negara Kediaman"
                    bind:val={$form.homeCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.homeStateId}
                    id="homeStateId"
                    label="Negeri Kediaman"
                    bind:val={$form.homeStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.homeCityId}
                    id="homeCityId"
                    label="Daerah Kediaman"
                    bind:val={$form.homeCityId}
                    options={data.selectionOptions.cityLookup}
                ></CustomSelectField>

                <CustomTextField
                    placeholder="-"
                    errors={$errors.homePostcode}
                    disabled={$isReadonlyPersonalFormStepper}
                    id="homePostcode"
                    label="Poskod Rumah"
                    bind:val={$form.homePostcode}
                />

                <CustomTextField
                    placeholder="-"
                    errors={$errors.mailAddress}
                    disabled={$isReadonlyPersonalFormStepper}
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:val={$form.mailAddress}
                />

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.mailCountryId}
                    id="mailCountryId"
                    label="Negara Surat Menyurat"
                    bind:val={$form.mailCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.mailStateId}
                    id="mailStateId"
                    label="Negeri Surat Menyurat"
                    bind:val={$form.mailStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.mailCityId}
                    id="mailCityId"
                    label="Daerah Surat Menyurat"
                    bind:val={$form.mailCityId}
                    options={data.selectionOptions.cityLookup}
                ></CustomSelectField>

                <CustomTextField
                    placeholder="-"
                    errors={$errors.mailPostcode}
                    disabled={$isReadonlyPersonalFormStepper}
                    id="mailPostcode"
                    label="Poskod Surat Menyurat"
                    bind:val={$form.mailPostcode}
                />

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.assetDeclarationStatusId}
                    id="assetDeclarationStatusId"
                    label="Status Pengisytiharan Harta"
                    bind:val={$form.assetDeclarationStatusId}
                    options={data.selectionOptions.assetDeclarationLookup}
                ></CustomSelectField>

                {#if $form.assetDeclarationStatusId === 12 || $form.assetDeclarationStatusId === 14 || $form.assetDeclarationStatusId === 15 || $form.assetDeclarationStatusId === 17 || $form.assetDeclarationStatusId === 18 || $form.assetDeclarationStatusId === 22}
                    <CustomTextField
                        placeholder="-"
                        errors={$errors.propertyDeclarationDate}
                        disabled={$isReadonlyPersonalFormStepper}
                        id="propertyDeclarationDate"
                        type="date"
                        label="Tarikh Pengisytiharan Harta"
                        bind:val={$form.propertyDeclarationDate}
                    />
                {/if}

                <CustomSelectField
                    disabled={$isReadonlyPersonalFormStepper}
                    errors={$errors.isExPoliceOrSoldier}
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    bind:val={$form.isExPoliceOrSoldier}
                    options={data.selectionOptions.generalLookup}
                ></CustomSelectField>

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <CustomSelectField
                        disabled={$isReadonlyPersonalFormStepper}
                        errors={$errors.isInternalRelationship}
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        bind:val={$form.isInternalRelationship}
                        options={data.selectionOptions.generalLookup}
                    ></CustomSelectField>

                    {#if $form.isInternalRelationship}
                        <CustomSelectField
                            disabled={$isReadonlyPersonalFormStepper}
                            errors={$errors.employeeNumber}
                            id="employeeNumber"
                            label="Nama Pekerja LKIM"
                            bind:val={$form.employeeNumber}
                            options={data.selectionOptions.employeeIdLookup}
                        ></CustomSelectField>

                        {#if !!data.newHireFullDetailView.personalDetail.employeeNumber}
                            <CustomTextField
                                disabled={$isReadonlyPersonalFormStepper}
                                errors={$errors.employeePosition}
                                id="relationDetailPosition"
                                label="Jawatan Kakitangan LKIM"
                                bind:val={$form.employeePosition}
                            ></CustomTextField>
                        {/if}

                        <CustomSelectField
                            disabled={$isReadonlyPersonalFormStepper}
                            errors={$errors.relationshipId}
                            id="relationDetailRelationship"
                            label="Hubungan"
                            bind:val={$form.relationshipId}
                            options={data.selectionOptions.relationshipLookup}
                        ></CustomSelectField>
                    {/if}
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
            {#if !$isReadonlyAcademicFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => triggerSubmitAcademicTempData()}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !$isReadonlyAcademicFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
                    <TextIconButton
                        type="primary"
                        label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                        onClick={() => (openAcademicInfoModal = true)}
                    >
                        <SvgPlus></SvgPlus>
                    </TextIconButton>
                </div>
            {/if}
            <div class="flex w-full flex-col gap-2">
                {#if $academicInfoForm.academics.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="academics">
                        {#each $academicInfoForm.academics as _, i}
                            <CustomTabContent title={`Akademik #${i + 1}`}>
                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="majorId"
                                    label={'Jurusan'}
                                    options={data.selectionOptions
                                        .majorMinorLookup}
                                    bind:val={$academicInfoForm.academics[i]
                                        .majorId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="minorId"
                                    label={'Bidang'}
                                    options={data.selectionOptions
                                        .majorMinorLookup}
                                    bind:val={$academicInfoForm.academics[i]
                                        .minorId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="countryId"
                                    options={data.selectionOptions
                                        .countryLookup}
                                    label={'Negara'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .countryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="institutionId"
                                    options={data.selectionOptions
                                        .institutionLookup}
                                    label={'Institusi'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .institutionId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="educationLevelId"
                                    options={data.selectionOptions
                                        .educationLookup}
                                    label={'Taraf Pendidikan'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    isRequired={false}
                                    id="sponsorshipId"
                                    options={data.selectionOptions
                                        .sponsorshipLookup}
                                    label={'Penajaan'}
                                    bind:val={$academicInfoForm.academics[i]
                                        .sponsorshipId}
                                ></CustomSelectField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="certName"
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    type="date"
                                    bind:val={$academicInfoForm.academics[i]
                                        .completionDate}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .finalGrade}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="field"
                                    label={'Catatan'}
                                    type="text"
                                    bind:val={$academicInfoForm.academics[i]
                                        .field}
                                ></CustomTextField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            {#if !$isReadonlyExperienceFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => triggerSubmitExperienceTempData()}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !$isReadonlyExperienceFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
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
            <div class="flex w-full flex-col gap-2">
                {#if $experienceInfoForm.experiences.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="experiences">
                        {#each $experienceInfoForm.experiences as _, i}
                            <CustomTabContent title={`Pengalaman #${i + 1}`}>
                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="company"
                                    label={'Nama Majikan'}
                                    type="text"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .company}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="address"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .address}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="position"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .position}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="positionCode"
                                    label={'Kod Jawatan (jika ada)'}
                                    type="text"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .positionCode}
                                ></CustomTextField>
                                <CustomTextField
                                    placeholder="-"
                                    type="date"
                                    disabled
                                    isRequired={false}
                                    id="startDate"
                                    label="Tarikh Mula Bekerja"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .startDate}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    type="date"
                                    disabled
                                    isRequired={false}
                                    id="endDate"
                                    label="Tarikh Tamat Bekerja"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .endDate}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="salary"
                                    label={'Gaji'}
                                    type="number"
                                    bind:val={$experienceInfoForm.experiences[i]
                                        .salary}
                                ></CustomTextField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------->
    <!--------------Maklumat Kegiatan / Keahlian------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Kegiatan / Keahlian">
            {#if !$isReadonlyActivityFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => triggerSubmitActivityTempData()}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}</StepperContentHeader
        >
        <StepperContentBody>
            {#if !$isReadonlyActivityFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
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
            <div class="flex w-full flex-col gap-2">
                {#if $activityInfoForm.activities.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="activities">
                        {#each $activityInfoForm.activities as _, i}
                            <CustomTabContent title={`Aktiviti #${i + 1}`}>
                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="addName"
                                    label={'Nama Kegiatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activities[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    type="date"
                                    id="addJoinDate"
                                    label={'Tarikh Keahlian'}
                                    bind:val={$activityInfoForm.activities[i]
                                        .joinDate}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="addPosition"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activities[i]
                                        .position}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    id="addDescription"
                                    label={'Catatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activities[i]
                                        .description}
                                ></CustomTextField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            {#if !$isReadonlyFamilyFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => {
                        triggerSubmitFamilyTempData();
                    }}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !$isReadonlyFamilyFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
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

            <div class="flex w-full flex-col gap-2">
                {#if $familyInfoForm.dependencies.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="families">
                        {#each Object.entries($familyInfoForm.dependencies) as [key, _], i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $familyInfoForm.dependencies[i].name}
                            >
                                <CustomTextField
                                    placeholder="-"
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .alternativeName}
                                ></CustomTextField>
                                <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Jenis Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .identityDocumentColor}
                                ></CustomSelectField>
                                <CustomTextField
                                    placeholder="-"
                                    id="addIdentityDocumentNumber"
                                    type="text"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .identityDocumentNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAddress"
                                    label={'Alamat'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .address}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .postcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    type="date"
                                    id="addBirthDate"
                                    label={'Tarikh Lahir'}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .birthDate}
                                ></CustomTextField>

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPhoneNumber"
                                    label={'Nombor Telefon'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .phoneNumber}
                                ></CustomTextField>

                                {#if key.includes('marriageDate')}
                                    <CustomTextField
                                        placeholder="-"
                                        type="date"
                                        disabled
                                        isRequired={false}
                                        id="addMarriageDate"
                                        label={'Tarikh Kahwin'}
                                        bind:val={$familyInfoForm.dependencies[
                                            i
                                        ].marriageDate}
                                    ></CustomTextField>
                                {/if}

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$familyInfoForm.dependencies[i]
                                        .inSchool}
                                ></CustomSelectField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Isteri dan Anak"
        >
            {#if !$isReadonlyDependencyFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => {
                        triggerSubmitDependencyTempData();
                    }}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !$isReadonlyDependencyFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
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

            <div class="flex w-full flex-col gap-2">
                {#if $dependencyInfoForm.dependencies.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="dependencies">
                        {#each Object.entries($dependencyInfoForm.dependencies) as [key, _], i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $dependencyInfoForm.dependencies[i].name}
                            >
                                <CustomTextField
                                    placeholder="-"
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].name}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].alternativeName}
                                ></CustomTextField>
                                <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Jenis Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].identityDocumentColor}
                                ></CustomSelectField>
                                <CustomTextField
                                    placeholder="-"
                                    id="addIdentityDocumentNumber"
                                    type="text"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].identityDocumentNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAddress"
                                    label={'Alamat'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].address}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].postcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    type="date"
                                    id="addBirthDate"
                                    label={'Tarikh Lahir'}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].birthDate}
                                ></CustomTextField>

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPhoneNumber"
                                    label={'Nombor Telefon'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].phoneNumber}
                                ></CustomTextField>

                                {#if key.includes('marriageDate')}
                                    <CustomTextField
                                        placeholder="-"
                                        type="date"
                                        disabled
                                        isRequired={false}
                                        id="addMarriageDate"
                                        label={'Tarikh Kahwin'}
                                        bind:val={$dependencyInfoForm
                                            .dependencies[i].marriageDate}
                                    ></CustomTextField>
                                {/if}

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$dependencyInfoForm.dependencies[
                                        i
                                    ].inSchool}
                                ></CustomSelectField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            {#if !$isReadonlyNextOfKinFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => triggerSubmitNextOfKinTempData()}
                />
                <TextIconButton
                    type="neutral"
                    label="Tidak Berkaitan"
                    onClick={() => activeIndex++}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !$isReadonlyNextOfKinFormStepper && data.isCandidateRole}
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
                <div class="w-full rounded-[3px] border-b border-t p-2.5">
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

            <div class="flex w-full flex-col gap-2">
                {#if $nextOfKinInfoForm.dependencies.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab pill={true} id="nextOfKins">
                        {#each Object.entries($nextOfKinInfoForm.dependencies) as [key, _], i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $nextOfKinInfoForm.dependencies[i].name}
                            >
                                <CustomTextField
                                    placeholder="-"
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .alternativeName}
                                ></CustomTextField>
                                <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Jenis Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .identityDocumentColor}
                                ></CustomSelectField>
                                <CustomTextField
                                    placeholder="-"
                                    id="addIdentityDocumentNumber"
                                    type="text"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .identityDocumentNumber}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addAddress"
                                    label={'Alamat'}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .address}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .postcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    type="date"
                                    id="addBirthDate"
                                    label={'Tarikh Lahir'}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .birthDate}
                                ></CustomTextField>

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    id="addPhoneNumber"
                                    label={'Nombor Telefon'}
                                    type="text"
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .phoneNumber}
                                ></CustomTextField>

                                {#if key.includes('marriageDate')}
                                    <CustomTextField
                                        placeholder="-"
                                        type="date"
                                        disabled
                                        isRequired={false}
                                        id="addMarriageDate"
                                        label={'Tarikh Kahwin'}
                                        bind:val={$nextOfKinInfoForm
                                            .dependencies[i].marriageDate}
                                    ></CustomTextField>
                                {/if}

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled
                                    isRequired={false}
                                    bind:val={$nextOfKinInfoForm.dependencies[i]
                                        .inSchool}
                                ></CustomSelectField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan">
            {#if !$isReadonlyDocumentFormStepper && data.isCandidateRole && data.newHireFullDetailView.nextOfKin.dependencies.length > 0}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="documentUploadForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if data.newHireFullDetailView.nextOfKin.dependencies.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else if !$isReadonlyDocumentFormStepper && data.isCandidateRole}
                    <p class="text-sm">
                        Sila muat turun, isi dengan lengkap dokumen berikut,
                        kemudian muat naik dokumen pada ruangan yang disediakan.
                    </p>

                    <ul
                        class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                    >
                        <li>
                            <a
                                href={data.newHireFullDetailView.document
                                    .template}
                                download={data.newHireFullDetailView.document
                                    .templateName}
                                class="cursor-pointer underline"
                                >{data.newHireFullDetailView.document
                                    .templateName}</a
                            >
                        </li>
                    </ul>

                    {#if $documentFormErrors.document}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >Sila muat naik dokumen barkaitan.</span
                        >
                    {/if}
                    <form
                        id="documentUploadForm"
                        method="POST"
                        use:documentFormEnhance
                        enctype="multipart/form-data"
                    >
                        {#if $documentFormErrors.document}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >Sila muat naik dokumen barkaitan dan pastikan
                                tidak melebihi 10MB.</span
                            >
                        {/if}
                        <ContentHeader
                            title="Sila pastikan dokumen berkenaan dimuat naik"
                            borderClass="border-none"
                        >
                            <div hidden={$documentForm.document.length < 1}>
                                <FileInputField
                                    id="document"
                                    handleOnInput={(e) => handleOnInput(e)}
                                ></FileInputField>
                            </div>
                        </ContentHeader>
                        <div
                            class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                        >
                            <div class="flex flex-wrap gap-3">
                                {#each $documentForm.document as _, i}
                                    <FileInputFieldChildren
                                        childrenType="grid"
                                        handleDelete={() => handleDelete(i)}
                                        document={$documentForm.document[i]}
                                    />
                                {/each}
                            </div>
                            {#if $documentForm.document.length < 1}
                                <div
                                    class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                                >
                                    <span>Pilih fail dari peranti anda.</span>
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
                                    <FileInputField
                                        id="document"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            {/if}
                        </div>
                    </form>
                {:else}
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

                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >1.</label
                            >
                            <a
                                href={data.newHireFullDetailView.document
                                    .attachment}
                                download={data.newHireFullDetailView.document
                                    .attachmentName}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{data.newHireFullDetailView.document
                                    .attachmentName}</a
                            >
                        </div>
                    </div>{/if}
            </div></StepperContentBody
        >
    </StepperContent>
    {#if !isStatusNew || data.isSupporterRole || data.isApproverRole}
        <StepperContent>
            <StepperContentHeader title="Kemaskini Lantikan Baru">
                {#if !$isReadonlyServiceFormStepper && data.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="newHireEmploymentServiceForm"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if !$isReadonlyServiceFormStepper && !data.isEmploymentSecretaryRole}
                    <StepperOtherRolesResult />
                {:else}
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                    <form
                        id="newHireEmploymentServiceForm"
                        method="POST"
                        use:serviceInfoEnhance
                        class="flex w-full flex-col gap-2.5"
                    >
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.gradeId}
                            id="gradeId"
                            label="Gred Semasa"
                            bind:val={$serviceInfoForm.gradeId}
                            options={data.selectionOptions.gradeLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.maxGradeId}
                            id="maxGradeId"
                            label="Gred Maksimum"
                            bind:val={$serviceInfoForm.maxGradeId}
                            options={data.selectionOptions.gradeLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.programmeId}
                            id="programmeId"
                            label="Program"
                            bind:val={$serviceInfoForm.programmeId}
                            options={data.selectionOptions.programLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.schemeId}
                            id="schemeId"
                            label="Skim"
                            bind:val={$serviceInfoForm.schemeId}
                            options={data.selectionOptions.schemeLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.positionId}
                            id="positionId"
                            label="Jawatan"
                            bind:val={$serviceInfoForm.positionId}
                            options={data.selectionOptions.positionLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.placementId}
                            id="placementId"
                            label="Penempatan"
                            bind:val={$serviceInfoForm.placementId}
                            options={data.selectionOptions.placementLookup}
                        ></CustomSelectField>
                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.serviceTypeId}
                            id="serviceTypeId"
                            label="Taraf Perkhidmatan"
                            bind:val={$serviceInfoForm.serviceTypeId}
                            options={data.selectionOptions.educationLookup}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.serviceGroupId}
                            id="serviceGroupId"
                            label="Kumpulan Perkhidmatan"
                            bind:val={$serviceInfoForm.serviceGroupId}
                            options={data.selectionOptions.serviceGroupLookup}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.unitId}
                            id="unitId"
                            label="Unit Perkhidmatan"
                            bind:val={$serviceInfoForm.unitId}
                            options={data.selectionOptions.unitLookup}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled
                            errors={$serviceInfoErrors.employmentStatusId}
                            id="employmentStatusId"
                            label="Status Perkhidmatan"
                            bind:val={$serviceInfoForm.employmentStatusId}
                            options={data.selectionOptions.serviceTypeLookup}
                        ></CustomSelectField>

                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.effectiveDate}
                            id="effectiveDate"
                            label={'Tarikh Kuatkuasa Lantikan Semasa'}
                            bind:val={$serviceInfoForm.effectiveDate}
                        ></CustomTextField>

                        <CustomSelectField
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.retirementBenefit}
                            id="retirementBenefit"
                            label="Faedah Persaraan"
                            bind:val={$serviceInfoForm.retirementBenefit}
                            options={RetirementBenefitDropdownConstant.list}
                        ></CustomSelectField>

                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.epfNumber}
                            id="epfNumber"
                            label={'No. KWSP'}
                            bind:val={$serviceInfoForm.epfNumber}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.socsoNumber}
                            id="socsoNumber"
                            label={'No. SOCSO'}
                            bind:val={$serviceInfoForm.socsoNumber}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.incomeNumber}
                            id="incomeNumber"
                            label={'No. Cukai'}
                            bind:val={$serviceInfoForm.incomeNumber}
                        ></CustomTextField>

                        <CustomSelectField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.bankName}
                            id="bankName"
                            label={'Nama Bank'}
                            options={data.selectionOptions.bankLookup}
                            bind:val={$serviceInfoForm.bankName}
                        ></CustomSelectField>

                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.bankAccount}
                            id="bankAccount"
                            label={'No. Akaun'}
                            bind:val={$serviceInfoForm.bankAccount}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.eligibleLeaveCount}
                            id="eligibleLeaveCount"
                            label={'Kelayakan Cuti'}
                            bind:val={$serviceInfoForm.eligibleLeaveCount}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.civilServiceStartDate}
                            id="civilServiceStartDate"
                            label={'Mula Dilantik Perkhidmatan Kerajaan'}
                            bind:val={$serviceInfoForm.civilServiceStartDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.firstServiceDate}
                            id="firstServiceDate"
                            label={'Mula Dilantik Perkhidmatan LKIM'}
                            bind:val={$serviceInfoForm.firstServiceDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.serviceDate}
                            id="serviceDate"
                            label={'Mula Dilantik Perkhidmatan Sekarang'}
                            bind:val={$serviceInfoForm.serviceDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.confirmServiceDate}
                            id="confirmServiceDate"
                            label={'Tarikh Disahkan Perkhidmatan Sekarang'}
                            bind:val={$serviceInfoForm.confirmServiceDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.firstEffectiveServiceDate}
                            id="firstEffectiveServiceDate"
                            label={'Mula Berkuatkuasa Perkhidmatan Pertama'}
                            bind:val={$serviceInfoForm.firstEffectiveServiceDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.firstConfirmServiceDate}
                            id="firstConfirmServiceDate"
                            label={'Disahkan Dalam Jawatan Pertama LKIM'}
                            bind:val={$serviceInfoForm.firstConfirmServiceDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.confirmDate}
                            id="confirmDate"
                            label={'Disahkan Dalam Jawatan Semasa LKIM'}
                            bind:val={$serviceInfoForm.confirmDate}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.firstEffectiveDate}
                            id="firstEffectiveDate"
                            label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                            bind:val={$serviceInfoForm.firstEffectiveDate}
                        ></CustomTextField>
                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.newRecruitEffectiveDate}
                            id="newRecruitEffectiveDate"
                            label={'Tarikh Lantikan Baru'}
                            bind:val={$serviceInfoForm.newRecruitEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            disabled={$isReadonlyServiceFormStepper}
                            isRequired={false}
                            errors={$serviceInfoErrors.pensionNumber}
                            id="pensionNumber"
                            label={'Nombor Pencen'}
                            bind:val={$serviceInfoForm.pensionNumber}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            type="number"
                            disabled={$isReadonlyServiceFormStepper}
                            errors={$serviceInfoErrors.retirementAge}
                            id="retirementAge"
                            label={'Umur Bersara'}
                            bind:val={$serviceInfoForm.retirementAge}
                        ></CustomTextField>

                        <CustomTextField
                            placeholder="-"
                            type="date"
                            disabled
                            errors={$serviceInfoErrors.retirementDate}
                            id="retirementDate"
                            label={'Tarikh Bersara'}
                            bind:val={$serviceInfoForm.retirementDate}
                        ></CustomTextField>

                        <p class={stepperFormTitleClass}>
                            Maklumat Gaji dan Elaun - Elaun
                        </p>
                        <div class="grid grid-cols-2 gap-10">
                            <div class="space-y-2.5">
                                <CustomSelectField
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.revisionMonth}
                                    id="revisionMonth"
                                    label="Bulan Berkuatkuasa (Bulan KGT)"
                                    bind:val={$serviceInfoForm.revisionMonth}
                                    options={kgtMonthStringLookup}
                                ></CustomSelectField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    isRequired={false}
                                    errors={$serviceInfoErrors.kgt}
                                    id="kgt"
                                    type="number"
                                    label={'KGT (RM)'}
                                    bind:val={$serviceInfoForm.kgt}
                                ></CustomTextField>
                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.maximumSalary}
                                    id="maximumSalary"
                                    type="number"
                                    label={'Tangga Gaji (RM)'}
                                    bind:val={$serviceInfoForm.maximumSalary}
                                ></CustomTextField>

                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.baseSalary}
                                    id="baseSalary"
                                    label={'Gaji Pokok (RM)'}
                                    type="number"
                                    bind:val={$serviceInfoForm.baseSalary}
                                ></CustomTextField>
                            </div>
                            <div class="space-y-2.5">
                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.itka}
                                    id="itka"
                                    label={'ITKA (RM)'}
                                    type="number"
                                    bind:val={$serviceInfoForm.itka}
                                ></CustomTextField>
                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.itp}
                                    id="itp"
                                    label={'ITP (RM)'}
                                    type="number"
                                    bind:val={$serviceInfoForm.itp}
                                ></CustomTextField>
                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.epw}
                                    id="epw"
                                    label={'EPW (RM)'}
                                    type="number"
                                    bind:val={$serviceInfoForm.epw}
                                ></CustomTextField>
                                <CustomTextField
                                    placeholder="-"
                                    disabled={$isReadonlyServiceFormStepper}
                                    errors={$serviceInfoErrors.cola}
                                    id="cola"
                                    label={'COLA (RM)'}
                                    type="number"
                                    bind:val={$serviceInfoForm.cola}
                                ></CustomTextField>
                            </div>
                        </div>
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {#if $isReadonlyServiceFormStepper}
            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Lantikan Baru (Urus Setia Perjawatan)"
                >
                    {#if !$isReadonlySecretaryApprovalResult && data.isEmploymentSecretaryRole}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="newEmploymentSecretaryResultForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !$isReadonlySecretaryApprovalResult && !data.isEmploymentSecretaryRole}
                        <StepperOtherRolesResult />
                    {:else}
                        <form
                            id="newEmploymentSecretaryResultForm"
                            method="POST"
                            use:secretaryApprovalInfoEnhance
                            class="flex w-full flex-col gap-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Keputusan Urus Setia Perjawatan</b
                                >
                            </div>

                            <input
                                hidden
                                bind:value={$secretaryApprovalInfoForm.id}
                            />

                            <CustomTextField
                                placeholder="-"
                                disabled={$isReadonlySecretaryApprovalResult}
                                errors={$secretaryApprovalInfoErrors.remark}
                                id="remark"
                                label="Tindakan/Ulasan"
                                bind:val={$secretaryApprovalInfoForm.remark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={$isReadonlySecretaryApprovalResult}
                                errors={$secretaryApprovalInfoErrors.status}
                                id="status"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$secretaryApprovalInfoForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
        {#if $newHireSecretaryApprovalIsApproved}
            <StepperContent>
                <StepperContentHeader
                    title="Tetapan Penyokong dan Pelulus (Jika Sah)"
                >
                    {#if !$isReadonlySetApproversFormStepper && data.isEmploymentSecretaryRole}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="newEmploymentAssignApproverSupporterForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if !$isReadonlySetApproversFormStepper && !data.isEmploymentSecretaryRole}
                        <StepperOtherRolesResult />
                    {:else}
                        <form
                            id="newEmploymentAssignApproverSupporterForm"
                            method="POST"
                            use:secretarySetApproverEnhance
                            class="flex w-full flex-col gap-2"
                        >
                            <CustomSelectField
                                disabled={$isReadonlySetApproversFormStepper}
                                errors={$secretarySetApproverErrors.supporterId}
                                id="supporterId"
                                label="Nama Penyokong"
                                options={data.selectionOptions.employeeLookup}
                                bind:val={$secretarySetApproverForm.supporterId}
                            />
                            <CustomSelectField
                                disabled={$isReadonlySetApproversFormStepper}
                                errors={$secretarySetApproverErrors.approverId}
                                id="approverId"
                                label="Nama Pelulus"
                                options={data.selectionOptions.employeeLookup}
                                bind:val={$secretarySetApproverForm.approverId}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Keputusan daripada Peranan - Peranan Lain"
                >
                    {#if $newHireSecretaryApprovalIsApproved}
                        {#if !$isReadonlySupporterApprovalResult && data.isSupporterRole}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="newEmploymentSupporterApproval"
                            ></TextIconButton>
                        {:else if !$isReadonlyApproverApprovalResult && data.isApproverRole}
                            <TextIconButton
                                type="primary"
                                label="Simpan"
                                form="newEmploymentApprovalApproval"
                            ></TextIconButton>
                        {/if}
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5">
                        {#if $newHireSecretaryApprovalIsApproved}
                            {#if data.isSupporterRole && !$isReadonlySupporterApprovalResult}
                                <form
                                    id="newEmploymentSupporterApproval"
                                    method="POST"
                                    use:supporterApprovalEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Penyokong</b
                                        >
                                    </div>
                                    <CustomTextField
                                        placeholder="-"
                                        disabled={$isReadonlySupporterApprovalResult}
                                        errors={$supporterApprovalErrors.remark}
                                        id="supporterRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$supporterApprovalForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={$isReadonlySupporterApprovalResult}
                                        errors={$supporterApprovalErrors.status}
                                        id="supporterIsApproved"
                                        options={supportOptions}
                                        label={'Keputusan'}
                                        bind:val={$supporterApprovalForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {:else if data.isApproverRole && !$isReadonlyApproverApprovalResult && $newHireSupporterApprovalIsApproved}
                                <form
                                    id="newEmploymentApprovalApproval"
                                    method="POST"
                                    use:approverApprovalEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Pelulus</b
                                        >
                                    </div>
                                    <CustomTextField
                                        placeholder="-"
                                        disabled={$isReadonlyApproverApprovalResult}
                                        errors={$approverApprovalErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$approverApprovalForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={$isReadonlyApproverApprovalResult}
                                        id="approverIsApproved"
                                        options={approveOptions}
                                        label={'Keputusan'}
                                        bind:val={$approverApprovalForm.status}
                                    ></CustomRadioBoolean>
                                </form>
                            {/if}
                        {/if}

                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >1. Penyokong</b
                                >
                            </div>
                            {#if $isReadonlySupporterApprovalResult}
                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    id="supporterRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={data.newHireFullDetailView
                                        .supporter.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="supporterStatus"
                                    options={supportOptions}
                                    label={'Keputusan'}
                                    bind:val={data.newHireFullDetailView
                                        .supporter.status}
                                ></CustomSelectField>
                            {:else if !$newHireSecretaryApprovalIsApproved}
                                <StepperFailStatement />
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                            <hr />
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >2. Pelulus</b
                                >
                            </div>
                            {#if $isReadonlyApproverApprovalResult}
                                <CustomTextField
                                    placeholder="-"
                                    disabled
                                    id="approverRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={data.newHireFullDetailView
                                        .approver.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="approverStatus"
                                    options={approveOptions}
                                    label={'Keputusan'}
                                    bind:val={data.newHireFullDetailView
                                        .approver.status}
                                ></CustomSelectField>
                            {:else if !$newHireSecretaryApprovalIsApproved || !newHireSupporterApprovalIsApproved}
                                <StepperFailStatement />
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
            {#if $isReadonlyEmployeeNumber && $newHireApproverApprovalIsApproved}
                <StepperContent>
                    <StepperContentHeader title="Maklumat Nombor Pekerja" />
                    <StepperContentBody>
                        <div class="flex w-full flex-col gap-2.5">
                            <CustomTextField
                                placeholder="-"
                                disabled
                                isRequired={false}
                                id="employeeNumber"
                                label="Nombor Pekerja (Dijana secara automatik oleh sistem setelah lulus)"
                                bind:val={data.newHireFullDetailView
                                    .employeeNumber.employeeNumber}
                            ></CustomTextField>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
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
        <CustomSelectField
            errors={$addAcademicInfoErrors.majorId}
            id="majorId"
            label={'Jenis Jurusan'}
            options={data.selectionOptions.majorMinorLookup}
            bind:val={$addAcademicInfoModal.majorId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.minorId}
            id="minorId"
            label={'Jenis Bidang'}
            options={data.selectionOptions.majorMinorLookup}
            bind:val={$addAcademicInfoModal.minorId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.countryId}
            id="countryId"
            label={'Negara'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addAcademicInfoModal.countryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.institutionId}
            id="institutionId"
            label={'Institusi'}
            options={data.selectionOptions.institutionLookup}
            bind:val={$addAcademicInfoModal.institutionId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pembelajaran'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addAcademicInfoModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.sponsorshipId}
            id="sponsorshipId"
            label={'Penajaan'}
            options={data.selectionOptions.sponsorshipLookup}
            bind:val={$addAcademicInfoModal.sponsorshipId}
        ></CustomSelectField>

        <CustomTextField
            placeholder="-"
            errors={$addAcademicInfoErrors.name}
            id="name"
            label={'Nama Pencapaian/Sijil'}
            bind:val={$addAcademicInfoModal.name}
        ></CustomTextField>
        <CustomTextField
            placeholder="-"
            errors={$addAcademicInfoErrors.completionDate}
            id="completionDate"
            label="Tarikh Kelulusan"
            type="date"
            bind:val={$addAcademicInfoModal.completionDate}
        ></CustomTextField>
        <CustomTextField
            placeholder="-"
            errors={$addAcademicInfoErrors.finalGrade}
            id="finalGrade"
            label={'Pencapaian Akhir (Gred)'}
            bind:val={$addAcademicInfoModal.finalGrade}
        ></CustomTextField>
        <CustomTextField
            placeholder="-"
            errors={$addAcademicInfoErrors.field}
            id="field"
            label={'Catatan'}
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
            placeholder="-"
            errors={$addExperienceModalErrors.company}
            id="company"
            label={'Nama Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.company}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addExperienceModalErrors.address}
            id="address"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.address}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addExperienceModalErrors.position}
            id="position"
            label={'Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.position}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addExperienceModalErrors.positionCode}
            id="positionCode"
            label={'Kod Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.positionCode}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            type="date"
            errors={$addExperienceModalErrors.startDate}
            id="startDate"
            label={'Tarikh Mula Bekerja'}
            bind:val={$addExperienceModalForm.startDate}
        ></CustomTextField>
        <CustomTextField
            placeholder="-"
            type="date"
            errors={$addExperienceModalErrors.endDate}
            id="endDate"
            label={'Tarikh Tamat Bekerja'}
            bind:val={$addExperienceModalForm.endDate}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addExperienceModalErrors.salary}
            id="salary"
            label={'Gaji'}
            type="text"
            bind:val={$addExperienceModalForm.salary}
        ></CustomTextField>
        <TextIconButton
            type="primary"
            label={'Tambah'}
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
        <CustomTextField
            placeholder="-"
            errors={$addActivityModalErrors.name}
            id="name"
            label={'Nama Kegiatan'}
            type="text"
            bind:val={$addActivityModal.name}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addActivityModalErrors.joinDate}
            id="joinDate"
            type="date"
            label={'Tarikh Keahlian'}
            bind:val={$addActivityModal.joinDate}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addActivityModalErrors.position}
            id="position"
            label={'Jawatan'}
            type="text"
            bind:val={$addActivityModal.position}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
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
            placeholder="-"
            errors={$addFamilyErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
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
            placeholder="-"
            errors={$addFamilyErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addFamilyErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addFamilyModal.address}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addFamilyErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addFamilyModal.postcode}
        ></CustomTextField>

        <CustomTextField
            disabled
            placeholder="-"
            type="date"
            isRequired={false}
            errors={$addFamilyErrors.birthDate}
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addFamilyModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addFamilyErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addFamilyModal.birthCountryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            options={data.selectionOptions.stateLookup}
            bind:val={$addFamilyModal.birthStateId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup.filter((data) => {
                return data.isFamily;
            })}
            bind:val={$addFamilyModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addFamilyModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addFamilyModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addFamilyModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.genderId}
            id="genderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addFamilyModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addFamilyErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addFamilyErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addFamilyErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Telefon'}
            type="text"
            bind:val={$addFamilyModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addFamilyErrors.maritalId}
            id="maritalId"
            label={'Status Perkahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addFamilyModal.maritalId}
        ></CustomSelectField>

        {#if $addFamilyModal.maritalId === 3}
            <CustomTextField
                placeholder="-"
                type="date"
                errors={$addFamilyErrors.marriageDate}
                id="marriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$addFamilyModal.marriageDate}
            ></CustomTextField>
        {/if}

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
    title={'Tambah Maklumat Selain Suami/Isteri & Anak'}
    bind:open={openNonFamilyInfoModal}
>
    <form
        id="addNonFamilyInfoModal"
        class="flex w-full flex-col gap-2"
        use:addNonFamilyEnhance
        method="POST"
    >
        <CustomTextField
            placeholder="-"
            errors={$addNonFamilyErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addNonFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
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
            placeholder="-"
            errors={$addNonFamilyErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNonFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNonFamilyErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addNonFamilyModal.address}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNonFamilyErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNonFamilyModal.postcode}
        ></CustomTextField>

        <CustomTextField
            disabled
            placeholder="-"
            type="date"
            isRequired={false}
            errors={$addNonFamilyErrors.birthDate}
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addNonFamilyModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addNonFamilyModal.birthCountryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            options={data.selectionOptions.stateLookup}
            bind:val={$addNonFamilyModal.birthStateId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup.filter(
                (value) => {
                    return !value.isFamily;
                },
            )}
            bind:val={$addNonFamilyModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addNonFamilyModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addNonFamilyModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addNonFamilyModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.genderId}
            id="genderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addNonFamilyModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addNonFamilyErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addNonFamilyErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNonFamilyErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Telefon'}
            type="text"
            bind:val={$addNonFamilyModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNonFamilyErrors.maritalId}
            id="maritalId"
            label={'Status Perkahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addNonFamilyModal.maritalId}
        ></CustomSelectField>

        {#if $addNonFamilyModal.maritalId === 3}
            <CustomTextField
                placeholder="-"
                type="date"
                errors={$addNonFamilyErrors.marriageDate}
                id="marriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$addNonFamilyModal.marriageDate}
            ></CustomTextField>
        {/if}

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
            placeholder="-"
            errors={$addNextOfKinErrors.name}
            id="name"
            label={'Nama'}
            type="text"
            bind:val={$addNextOfKinModal.name}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
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
            placeholder="-"
            errors={$addNextOfKinErrors.identityDocumentNumber}
            id="identityDocumentNumber"
            type="text"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNextOfKinModal.identityDocumentNumber}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNextOfKinErrors.address}
            id="address"
            label={'Alamat'}
            bind:val={$addNextOfKinModal.address}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNextOfKinErrors.postcode}
            id="postcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNextOfKinModal.postcode}
        ></CustomTextField>

        <CustomTextField
            disabled
            placeholder="-"
            type="date"
            isRequired={false}
            errors={$addNextOfKinErrors.birthDate}
            id="birthDate"
            label={'Tarikh Lahir'}
            bind:val={$addNextOfKinModal.birthDate}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthCountryId}
            id="birthCountryId"
            label={'Negara Kelahiran'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addNextOfKinModal.birthCountryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthStateId}
            id="birthStateId"
            label={'Negeri Kelahiran'}
            options={data.selectionOptions.stateLookup}
            bind:val={$addNextOfKinModal.birthStateId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.relationshipId}
            id="relationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup}
            bind:val={$addNextOfKinModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.educationLevelId}
            id="educationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addNextOfKinModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.raceId}
            id="raceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addNextOfKinModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.nationalityId}
            id="nationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addNextOfKinModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.genderId}
            id="genderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addNextOfKinModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addNextOfKinErrors.workAddress}
            id="workAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            isRequired={false}
            errors={$addNextOfKinErrors.workPostcode}
            id="workPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            placeholder="-"
            errors={$addNextOfKinErrors.phoneNumber}
            id="phoneNumber"
            label={'Nombor Telefon'}
            type="text"
            bind:val={$addNextOfKinModal.phoneNumber}
        ></CustomTextField>

        <CustomSelectField
            errors={$addNextOfKinErrors.maritalId}
            id="maritalId"
            label={'Status Perkahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addNextOfKinModal.maritalId}
        ></CustomSelectField>

        {#if $addNextOfKinModal.maritalId === 3}
            <CustomTextField
                placeholder="-"
                type="date"
                errors={$addNextOfKinErrors.marriageDate}
                id="marriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$addNextOfKinModal.marriageDate}
            ></CustomTextField>
        {/if}

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[70px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="inSchool"
                bind:checked={$addNextOfKinModal.inSchool}
            />
        </div>

        <TextIconButton
            type="primary"
            label={'Tambah'}
            form="addNextOfKinInfoModal"
        />
    </form>
</Modal>
