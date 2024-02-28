<script lang="ts">
    import { EmploymentServices } from '$lib/services/implementation/mypsm/perjawatan/employment.service';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { CandidatePersonalDTO } from '$lib/dto/mypsm/employment/new-hire/new-hire-candidate-personal-details.dto';
    import {
        _activityInfoSchema,
        _dependencyListSchema,
        _familyListSchema,
        _nextOfKinListSchema,
        _experienceInfoSchema,
        _setApproversSchema,
        _approvalResultSchema,
        _relationsSchema,
        _academicListSchema,
        _experienceListSchema,
        _activityListSchema,
        _documentsSchema,
        _uploadDocumentsSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import {
        _submitAcademicForm,
        _submitActivityForm,
        _submitApproverApprovalForm,
        _submitDependencyForm,
        _submitDocumentsForm,
        _submitExperienceForm,
        _submitFamilyForm,
        _submitNextOfKinForm,
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
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { Checkbox, Modal, Tooltip } from 'flowbite-svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    export let data: PageData;

    const personalDetails: CandidatePersonalDTO =
        data.personalDetailResponse.data?.details;
    let isReadonlyPersonalFormStepper: boolean =
        data.personalDetailResponse?.data?.details?.isReadonly;
    let isReadonlyAcademicFormStepper: boolean =
        data.academicInfoResponse?.data?.details?.isReadonly;
    let isReadonlyExperienceFormStepper: boolean =
        data.experienceInfoResponse?.data?.details?.isReadonly;
    let isReadonlyActivityFormStepper: boolean =
        data.activityInfoResponse?.data?.details?.isReadonly;
    let isReadonlyFamilyFormStepper: boolean =
        data.familyInfoResponse?.data?.details?.isReadonly;
    let isReadonlyDependencyFormStepper: boolean =
        data.dependencyInfoResponse?.data?.details?.isReadonly;
    let isReadonlyNextOfKinFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.details?.isReadonly;
    let isReadonlyDocumentFormStepper: boolean =
        data.documentInfoResponse?.data?.details?.isReadonly;
    let isReadonlyServiceFormStepper: boolean =
        data.serviceResponse?.data?.details?.isReadonly;
    let isReadonlySecretaryApprovalResult: boolean =
        !!data.secretaryApprovalResponse?.data?.details?.status;
    let isReadonlySetApproversFormStepper: boolean =
        data.secretaryGetApproversResponse?.data?.details?.isReadonly;
    let isReadonlySupporterApprovalResult: boolean =
        !!data.supporterResultResponse?.data?.details?.status;
    let isReadonlyApproverApprovalResult: boolean =
        !!data.approverResultResponse?.data?.details?.status;

    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;

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

    // let disabled = false;

    // =========================================================================
    // function to assign the content  of the tooltip
    // =========================================================================
    let tooltipContent: string = '';
    const itkaTooltip: string = 'ITKA bermaksud ...';
    const itpTooltip: string = 'ITP bermaksud ...';
    const epwTooltip: string = 'EPW bermaksud ...';
    const colaTooltip: string = 'COLA bermaksud ...';

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

    // Superforms
    const { form, errors, enhance } = superForm(data.personalInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        validators: false,
        multipleSubmits: 'prevent',
        onSubmit(formData) {
            _submitPersonalForm(formData.formData);
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
        validators: _serviceInfoSchema,
        onSubmit() {
            _submitServiceForm($serviceInfoForm);
        },
    });

    const {
        form: secretaryApprovalInfoForm,
        errors: secretaryApprovalInfoErrors,
        enhance: secretaryApprovalInfoEnhance,
    } = superForm(data.secretaryApprovalInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validators: _approvalResultSchema,
        onSubmit() {
            _submitSecretaryApprovalForm($secretaryApprovalInfoForm);
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
        validators: _approvalResultSchema,
        onSubmit() {
            _submitSupporterApprovalForm($supporterApprovalForm);
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
        validators: _approvalResultSchema,
        onSubmit() {
            _submitApproverApprovalForm($approverApprovalForm);
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
        validators: _setApproversSchema,
        onSubmit() {
            _submitSecretarySetApproverForm($secretarySetApproverForm);
        },
    });

    const {
        form: academicInfoForm,
        errors: academicInfoErrors,
        enhance: academicInfoEnhance,
    } = superForm(data.academicInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _academicListSchema,
        // async onSubmit() {
        //     _submitAcademicForm($form);
        // },
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
        validators: _experienceListSchema,
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
        validators: _activityListSchema,
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
        validators: _familyListSchema,
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
        validators: _dependencyListSchema,
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
        validators: _nextOfKinListSchema,
    });

    const {
        form: documentForm,
        errors: documentFormErrors,
        enhance: documentFormEnhance,
    } = superForm(data.newHireDocumentForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _uploadDocumentsSchema,
        onSubmit(formData) {
            console.log(formData.formData.getAll('document'));
            _submitDocumentsForm(formData.formData);
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
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _academicInfoSchema,
        async onSubmit(formData) {
            // Log the FormData content
            console.log('formData');
            for (const pair of formData.formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            console.log('$form', $addAcademicInfoModal);
            // _submitAcademicForm($addAcademicInfoModal);
            // openAcademicInfoModal = false;
        },
    });

    const {
        form: addExperienceModalForm,
        errors: addExperienceModalErrors,
        enhance: addExperienceModalEnhance,
    } = superForm(data.addExperienceModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _experienceInfoSchema,
        async onSubmit() {
            _submitExperienceForm($addExperienceModalForm);
            // openExperienceInfoModal = false;
        },
    });

    const {
        form: addActivityModal,
        errors: addActivityModalErrors,
        enhance: addActivityModalEnhance,
    } = superForm(data.addActivityModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _activityInfoSchema,
        async onSubmit() {
            _submitActivityForm($addActivityModal);
            // openMembershipInfoModal = false;
        },
    });

    const {
        form: addNonFamilyModal,
        errors: addNonFamilyErrors,
        enhance: addNonFamilyEnhance,
    } = superForm(data.addNonFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _relationsSchema,
        async onSubmit() {
            _submitDependencyForm($addNonFamilyModal);
            // openNonFamilyInfoModal = false;
        },
    });

    const {
        form: addFamilyModal,
        errors: addFamilyErrors,
        enhance: addFamilyEnhance,
    } = superForm(data.addFamilyModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _relationsSchema,
        async onSubmit() {
            _submitFamilyForm($addFamilyModal);
            // openFamilyInfoModal = false;
        },
    });
    const {
        form: addNextOfKinModal,
        errors: addNextOfKinErrors,
        enhance: addNextOfKinEnhance,
    } = superForm(data.addNextOfKinModal, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: true,
        multipleSubmits: 'prevent',
        validators: _relationsSchema,
        async onSubmit() {
            _submitNextOfKinForm($addNextOfKinModal);
            // openFamilyInfoModal = false;
        },
    });

    const proxyBirthDate = dateProxy(form, 'birthDate', {
        format: 'date-local',
    });
    $: console.log('urus', isStatusNew);
    const proxypropertyDeclarationDate = dateProxy(
        form,
        'propertyDeclarationDate',
        {
            format: 'date',
        },
    );
    const proxyAcademicCompletionDate = dateProxy(
        addAcademicInfoModal,
        'completionDate',
        {
            format: 'date',
        },
    );

    const proxyEffectiveDate = dateProxy(serviceInfoForm, 'effectiveDate', {
        format: 'date',
    });
    const proxyCivilServiceStartDate = dateProxy(
        serviceInfoForm,
        'civilServiceStartDate',
        { format: 'date' },
    );
    const proxynewRecruitEffectiveDate = dateProxy(
        serviceInfoForm,
        'newRecruitEffectiveDate',
        { format: 'date' },
    );
    const proxyFirstEffectiveDate = dateProxy(
        serviceInfoForm,
        'firstEffectiveDate',
        { format: 'date' },
    );
    const proxyServiceDate = dateProxy(serviceInfoForm, 'serviceDate', {
        format: 'date',
    });

    const proxyFirstServiceDate = dateProxy(
        serviceInfoForm,
        'firstServiceDate',
        { format: 'date' },
    );
    const proxyFirstConfirmServiceDate = dateProxy(
        serviceInfoForm,
        'firstConfirmServiceDate',
        { format: 'date' },
    );
    const proxyConfirmDate = dateProxy(serviceInfoForm, 'confirmDate', {
        format: 'date',
    });
    const proxyRetirementDate = dateProxy(serviceInfoForm, 'retirementDate', {
        format: 'date',
    });
    // const proxyActingDate = dateProxy(serviceInfoForm, 'actingDate', {
    //     format: 'date',
    // });
    // const proxyInterimDate = dateProxy(serviceInfoForm, 'interimDate', {
    //     format: 'date',
    // });
    // const proxyLastSalaryRaiseDate = dateProxy(
    //     serviceInfoForm,
    //     'lastSalaryRaiseDate',
    //     { format: 'date' },
    // );
    // const proxyLastPromotionDate = dateProxy(
    //     serviceInfoForm,
    //     'lastPromotionDate',
    //     { format: 'date' },
    // );
    // const proxySalaryEffectiveDate = dateProxy(
    //     serviceInfoForm,
    //     'salaryEffectiveDate',
    //     { format: 'date' },
    // );

    const proxyAddAcademiStartDate = dateProxy(
        addExperienceModalForm,
        'startDate',
        {
            format: 'date',
        },
    );
    const proxyAddAcademiEndDate = dateProxy(
        addExperienceModalForm,
        'endDate',
        {
            format: 'date',
        },
    );
    const proxyAddActivityJoinDate = dateProxy(addActivityModal, 'joinDate', {
        format: 'date',
    });
    const proxyAddFamilyBirthDate = dateProxy(addFamilyModal, 'birthDate', {
        format: 'date',
    });
    const proxyAddFamilyMarriageDate = dateProxy(
        addFamilyModal,
        'marriageDate',
        {
            format: 'date',
        },
    );
    const proxyAddDependencyBirthDate = dateProxy(
        addNonFamilyModal,
        'birthDate',
        {
            format: 'date',
        },
    );
    const proxyAddDependencyMarriageDate = dateProxy(
        addNonFamilyModal,
        'marriageDate',
        {
            format: 'date',
        },
    );
    const proxyAddNextOfKinBirthDate = dateProxy(
        addNextOfKinModal,
        'birthDate',
        {
            format: 'date',
        },
    );
    const proxyAddNextOfKinMarriageDate = dateProxy(
        addNextOfKinModal,
        'marriageDate',
        {
            format: 'date',
        },
    );

    const handleOnInput = (e: Event) => {
        $documentForm.document = Array.from(
            (e.currentTarget as HTMLInputElement).files ?? [],
        );
    };

    const handleDownload = async () => {
        const response = await EmploymentServices.downloadAttachment(
            data.documentInfoResponse.data?.details.attachment,
        );
    };
</script>

<ContentHeader title="Maklumat Lantikan Baru"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../../lantikan-baru');
        }}
    /></ContentHeader
>
<Stepper>
    <!------------------------------------------------------>
    <!---------------Maklumat Peribadi---------------------->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            {#if !isReadonlyPersonalFormStepper && data.isCandidateRole}
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
                    disabled
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:val={$form.identityDocumentNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    errors={$errors.name}
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    bind:val={$form.name}
                ></CustomTextField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.titleId}
                    id="titleId"
                    label={'Gelaran Nama'}
                    bind:val={$form.titleId}
                    options={data.selectionOptions.titleLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={isReadonlyPersonalFormStepper}
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={$form.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled={isReadonlyPersonalFormStepper}
                    id="statusPekerjaan"
                    label="Emel Pekerja"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.identityDocumentColor}
                    id="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    bind:val={$form.identityDocumentColor}
                    options={data.selectionOptions.identityCardColorLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.birthDate}
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={$form.birthDate}
                ></CustomTextField>
                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.birthStateId}
                    id="birthStateId"
                    label="Tempat Lahir"
                    bind:val={$form.birthStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.birthCountryId}
                    id="birthCountryId"
                    label="Tempat Lahir"
                    bind:val={$form.birthCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.nationalityId}
                    id="nationalityId"
                    label="Warganegara"
                    bind:val={$form.nationalityId}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.raceId}
                    id="raceId"
                    label="Bangsa"
                    bind:val={$form.raceId}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.ethnicId}
                    id="ethnicId"
                    label="Etnik"
                    bind:val={$form.ethnicId}
                    options={data.selectionOptions.ethnicityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.religionId}
                    id="religionId"
                    label="Agama"
                    bind:val={$form.religionId}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.genderId}
                    id="genderId"
                    label="Jantina"
                    bind:val={$form.genderId}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.maritalId}
                    id="maritalId"
                    label="Status Perkahwinan"
                    bind:val={$form.maritalId}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.email}
                    id="email"
                    label={'Emel'}
                    type="text"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomTextField
                    errors={$errors.homeAddress}
                    disabled={isReadonlyPersonalFormStepper}
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={$form.homeAddress}
                />

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.homeCountryId}
                    id="homeCountryId"
                    label="Negara Kediaman"
                    bind:val={$form.homeCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.homeStateId}
                    id="homeStateId"
                    label="Negeri Kediaman"
                    bind:val={$form.homeStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.homeCityId}
                    id="homeCityId"
                    label="Daerah Kediaman"
                    bind:val={$form.homeCityId}
                    options={data.selectionOptions.cityLookup}
                ></CustomSelectField>

                <CustomTextField
                    errors={$errors.homePostcode}
                    disabled={isReadonlyPersonalFormStepper}
                    id="homePostcode"
                    label="Poskod Rumah"
                    bind:val={$form.homePostcode}
                />

                <CustomTextField
                    errors={$errors.mailAddress}
                    disabled={isReadonlyPersonalFormStepper}
                    id="mailAddress"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:val={$form.mailAddress}
                />

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.mailCountryId}
                    id="mailCountryId"
                    label="Negara Surat Menyurat"
                    bind:val={$form.mailCountryId}
                    options={data.selectionOptions.countryLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.mailStateId}
                    id="mailStateId"
                    label="Negeri Surat Menyurat"
                    bind:val={$form.mailStateId}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.mailCityId}
                    id="mailCityId"
                    label="Daerah Surat Menyurat"
                    bind:val={$form.mailCityId}
                    options={data.selectionOptions.cityLookup}
                ></CustomSelectField>

                <CustomTextField
                    errors={$errors.mailPostcode}
                    disabled={isReadonlyPersonalFormStepper}
                    id="mailPostcode"
                    label="Poskod Surat Menyurat"
                    bind:val={$form.mailPostcode}
                />

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
                    errors={$errors.assetDeclarationStatusId}
                    id="assetDeclarationStatusId"
                    label="Status Pengikstiharan Harta"
                    bind:val={$form.assetDeclarationStatusId}
                    options={data.selectionOptions.assetDeclarationLookup}
                ></CustomSelectField>

                {#if $form.assetDeclarationStatusId !== 0}
                    <CustomTextField
                        errors={$errors.propertyDeclarationDate}
                        disabled={isReadonlyPersonalFormStepper}
                        id="propertyDeclarationDate"
                        type="date"
                        label="Tarikh Pengikstiharan Harta"
                        bind:val={$form.propertyDeclarationDate}
                    />
                {/if}

                <CustomSelectField
                    disabled={isReadonlyPersonalFormStepper}
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
                        disabled={isReadonlyPersonalFormStepper}
                        errors={$errors.isInternalRelationship}
                        id="isInternalRelationship"
                        label="Perhubungan Dengan Kakitangan LKIM"
                        bind:val={$form.isInternalRelationship}
                        options={data.selectionOptions.generalLookup}
                    ></CustomSelectField>

                    {#if $form.isInternalRelationship}
                        <CustomTextField
                            disabled={isReadonlyPersonalFormStepper}
                            errors={$errors.employeeNumber}
                            id="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:val={$form.employeeNumber}
                        ></CustomTextField>

                        <CustomSelectField
                            disabled={isReadonlyPersonalFormStepper}
                            errors={$errors.employeeName}
                            id="employeeName"
                            label="Jawatan Kakitangan LKIM"
                            bind:val={$form.employeeName}
                            options={data.selectionOptions.employeeLookup}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled={isReadonlyPersonalFormStepper}
                            errors={$errors.employeePosition}
                            id="relationDetailPosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:val={$form.employeePosition}
                            options={data.selectionOptions.positionLookup}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled={isReadonlyPersonalFormStepper}
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
            {#if !isReadonlyAcademicFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="FormStepperAkademik"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !isReadonlyAcademicFormStepper && data.isCandidateRole}
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
            <form
                id="academicInfoForm"
                class="flex w-full flex-col gap-2"
                use:academicInfoEnhance
                method="POST"
            >
                {#if $academicInfoForm.academicList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $academicInfoForm.academicList as _, i}
                            <CustomTabContent title={'Akademik #' + i + 1}>
                                <CustomSelectField
                                    disabled
                                    id="majorId"
                                    label={'Jurusan'}
                                    options={data.selectionOptions
                                        .majorMinorLookup}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .majorId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="minorId"
                                    label={'Bidang'}
                                    options={data.selectionOptions
                                        .majorMinorLookup}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .minorId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="countryId"
                                    options={data.selectionOptions
                                        .countryLookup}
                                    label={'Negara'}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .countryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="institutionId"
                                    options={data.selectionOptions
                                        .institutionLookup}
                                    label={'Institusi'}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .institutionId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="educationLevelId"
                                    options={data.selectionOptions
                                        .educationLookup}
                                    label={'Taraf Pendidikan'}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="sponsorshipId"
                                    options={data.selectionOptions
                                        .sponsorshipLookup}
                                    label={'Penajaan'}
                                    bind:val={$academicInfoForm.academicList[i]
                                        .sponsorshipId}
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled
                                    id="certName"
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    bind:val={$academicInfoForm.academicList[i]
                                        .name}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    type="date"
                                    bind:val={$academicInfoForm.academicList[i]
                                        .completionDate}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    bind:val={$academicInfoForm.academicList[i]
                                        .finalGrade}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="field"
                                    label={'Catatan'}
                                    type="text"
                                    bind:val={$academicInfoForm.academicList[i]
                                        .field}
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
            {#if !isReadonlyExperienceFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="FormStepperPengalaman"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !isReadonlyExperienceFormStepper && data.isCandidateRole}
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
            <form
                id="experienceInfoForm"
                class="flex w-full flex-col gap-2"
                use:experienceInfoEnhance
                method="POST"
            >
                {#if $experienceInfoForm.experienceList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $experienceInfoForm.experienceList as _, i}
                            <CustomTabContent title={'Pengalaman #' + i + 1}>
                                <CustomTextField
                                    disabled
                                    id="company"
                                    label={'Nama Majikan'}
                                    type="text"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].company}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="address"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].address}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="position"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].position}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="positionCode"
                                    label={'Kod Jawatan (jika ada)'}
                                    type="text"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].positionCode}
                                ></CustomTextField>
                                <!-- <DateSelector
                                    disabled
                                    id="startDate"
                                    label="Tarikh Mula Bekerja"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].startDate}
                                ></DateSelector>

                                <DateSelector
                                    disabled
                                    id="endDate"
                                    label="Tarikh Tamat Bekerja"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].endDate}
                                ></DateSelector> -->

                                <CustomTextField
                                    disabled
                                    id="salary"
                                    label={'Gaji'}
                                    type="number"
                                    bind:val={$experienceInfoForm
                                        .experienceList[i].salary}
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
            {#if !isReadonlyActivityFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="activityInfoForm"
                />
            {/if}</StepperContentHeader
        >
        <StepperContentBody>
            {#if !isReadonlyActivityFormStepper && data.isCandidateRole}
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
            <form
                id="activityInfoForm"
                class="flex w-full flex-col gap-2"
                use:activityInfoEnhance
                method="POST"
            >
                {#if $activityInfoForm.activityList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $activityInfoForm.activityList as _, i}
                            <CustomTabContent title={'Aktiviti #' + i + 1}>
                                <CustomTextField
                                    disabled={isReadonlyActivityFormStepper}
                                    id="addName"
                                    label={'Nama Kegiatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activityList[i]
                                        .name}
                                ></CustomTextField>

                                <!-- <DateSelector
                            id="addJoinDate"
                            label={'Tarikh Keahlian'}
                            bind:val={$proxyAddActivityJoinDate}
                        ></DateSelector> -->

                                <CustomTextField
                                    disabled={isReadonlyActivityFormStepper}
                                    id="addPosition"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activityList[i]
                                        .position}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled={isReadonlyActivityFormStepper}
                                    id="addDescription"
                                    label={'Catatan'}
                                    type="text"
                                    bind:val={$activityInfoForm.activityList[i]
                                        .description}
                                ></CustomTextField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </form></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            {#if !isReadonlyExperienceFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="familyInfoForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !isReadonlyFamilyFormStepper && data.isCandidateRole}
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
            <form
                id="familyInfoForm"
                class="flex w-full flex-col gap-2"
                use:familyInfoEnhance
                method="POST"
            >
                {#if $familyInfoForm.dependenciesList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $familyInfoForm.dependenciesList as _, i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $familyInfoForm.dependenciesList[i].name}
                            >
                                <CustomTextField
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].name}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].alternativeName}
                                ></CustomTextField>
                                <!-- <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Warna Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].identityDocumentColor}
                                ></CustomSelectField> -->
                                <CustomTextField
                                    id="addIdentityDocumentNumber"
                                    type="number"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].identityDocumentNumber}
                                ></CustomTextField>

                                <!-- <LongTextField
                id="addAddress"
                label={'Alamat'}
                disabled={isReadonlyFamilyFormStepper}
                bind:val={$familyInfoForm.dependenciesList[i].address}
            ></LongTextField> -->

                                <CustomTextField
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].postcode}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addBirthDate"
                label={'Tarikh Lahir'}
                bind:val={$proxyAddFamilyBirthDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkhahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addPhoneNumber"
                                    label={'Nombor Mobil'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].phoneNumber}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addMarriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$proxyAddFamilyMarriageDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$familyInfoForm.dependenciesList[
                                        i
                                    ].inSchool}
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
            title="Maklumat Tanggungan Selain Isteri dan Anak"
        >
            {#if !isReadonlyDependencyFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="dependencyInfoForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !isReadonlyDependencyFormStepper && data.isCandidateRole}
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
            <form
                id="dependencyInfoForm"
                class="flex w-full flex-col gap-2"
                use:dependencyInfoEnhance
                method="POST"
            >
                {#if $dependencyInfoForm.dependenciesList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $dependencyInfoForm.dependenciesList as _, i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $dependencyInfoForm.dependenciesList[i]
                                        .name}
                            >
                                <CustomTextField
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].name}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].alternativeName}
                                ></CustomTextField>
                                <!-- <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Warna Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm.dependenciesList[
                                        i
                                    ].identityDocumentColor}
                                ></CustomSelectField> -->
                                <CustomTextField
                                    id="addIdentityDocumentNumber"
                                    type="number"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i]
                                        .identityDocumentNumber}
                                ></CustomTextField>

                                <!-- <LongTextField
                id="addAddress"
                label={'Alamat'}
                disabled={isReadonlyFamilyFormStepper}
                bind:val={$dependencyInfoForm.dependenciesList[i].address}
            ></LongTextField> -->

                                <CustomTextField
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].postcode}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addBirthDate"
                label={'Tarikh Lahir'}
                bind:val={$proxyAddFamilyBirthDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkhahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addPhoneNumber"
                                    label={'Nombor Mobil'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].phoneNumber}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addMarriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$proxyAddFamilyMarriageDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$dependencyInfoForm
                                        .dependenciesList[i].inSchool}
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
            {#if !isReadonlyNextOfKinFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="nextOfKinInfoForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if !isReadonlyNextOfKinFormStepper && data.isCandidateRole}
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
            <form
                id="nextOfKinInfoForm"
                class="flex w-full flex-col gap-2"
                use:nextOfKinInfoEnhance
                method="POST"
            >
                {#if $nextOfKinInfoForm.nextOfKinsList.length < 1}
                    <div class="text-center text-sm italic text-system-primary">
                        Tiada maklumat.
                    </div>
                {:else}
                    <CustomTab>
                        {#each $nextOfKinInfoForm.nextOfKinsList as _, i}
                            <CustomTabContent
                                title={i +
                                    1 +
                                    '. ' +
                                    $nextOfKinInfoForm.nextOfKinsList[i].name}
                            >
                                <CustomTextField
                                    id="addName"
                                    label={'Nama'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].name}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addAlternativeName"
                                    label={'Nama Lain'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].alternativeName}
                                ></CustomTextField>
                                <!-- <CustomSelectField
                                    id="addIdentityDocumentColor"
                                    label={'Warna Kad Pengenalan'}
                                    options={data.selectionOptions
                                        .identityCardColorLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].identityDocumentColor}
                                ></CustomSelectField> -->
                                <CustomTextField
                                    id="addIdentityDocumentNumber"
                                    type="number"
                                    label={'Nombor Kad Pengenalan'}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].identityDocumentNumber}
                                ></CustomTextField>

                                <!-- <LongTextField
                id="addAddress"
                label={'Alamat'}
                disabled={isReadonlyFamilyFormStepper}
                bind:val={$nextOfKinInfoForm.nextOfKinsList[i].address}
            ></LongTextField> -->

                                <CustomTextField
                                    id="addPostcode"
                                    label={'Poskod'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].postcode}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addBirthDate"
                label={'Tarikh Lahir'}
                bind:val={$proxyAddFamilyBirthDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="addBirthCountryId"
                                    label={'Negara Kelahiran'}
                                    options={data.selectionOptions
                                        .countryLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].birthCountryId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addBirthStateId"
                                    label={'Negeri Kelahiran'}
                                    options={data.selectionOptions.stateLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].birthStateId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRelationshipId"
                                    label={'Hubungan'}
                                    options={data.selectionOptions
                                        .relationshipLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].relationshipId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addEducationLevelId"
                                    label={'Taraf Pendidikan'}
                                    options={data.selectionOptions
                                        .educationLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].educationLevelId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addRaceId"
                                    label={'Bangsa'}
                                    options={data.selectionOptions.raceLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].raceId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addNationalityId"
                                    label={'Kewarganegaraan'}
                                    options={data.selectionOptions
                                        .nationalityLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].nationalityId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addMaritalId"
                                    label={'Status Perkhahwinan'}
                                    options={data.selectionOptions
                                        .maritalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].maritalId}
                                ></CustomSelectField>

                                <CustomSelectField
                                    id="addGenderId"
                                    label={'Jantina'}
                                    options={data.selectionOptions.genderLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].genderId}
                                ></CustomSelectField>

                                <CustomTextField
                                    id="addWorkAddress"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].workAddress}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addWorkPostcode"
                                    label={'Poskod Majikan'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].workPostcode}
                                ></CustomTextField>

                                <CustomTextField
                                    id="addPhoneNumber"
                                    label={'Nombor Mobil'}
                                    type="text"
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].phoneNumber}
                                ></CustomTextField>

                                <!-- <DateSelector
                id="addMarriageDate"
                label={'Tarikh Kahwin'}
                bind:val={$proxyAddFamilyMarriageDate}
            ></DateSelector> -->

                                <CustomSelectField
                                    id="inSchool"
                                    label={'Bersekolah'}
                                    options={data.selectionOptions
                                        .generalLookup}
                                    disabled={isReadonlyFamilyFormStepper}
                                    bind:val={$nextOfKinInfoForm.nextOfKinsList[
                                        i
                                    ].inSchool}
                                ></CustomSelectField>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan">
            {#if !isReadonlyDocumentFormStepper && data.isCandidateRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="documentUploadForm"
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                {#if isReadonlyDocumentFormStepper && data.isCandidateRole}
                    <p class="text-sm">
                        Sila muat turun, isi dengan lengkap dokumen berikut,
                        kemudian muat naik dokumen pada ruangan yang disediakan.
                    </p>

                    <ul
                        class="cursor-pointer space-y-1 text-sm italic text-system-primary underline"
                    >
                        <li>
                            <a
                                href={data.documentInfoResponse.data?.details
                                    .template}
                                target="_blank"
                            >
                                Borang Lantikan Baru</a
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
                        <input
                            type="file"
                            name="document"
                            accept=".pdf"
                            on:input={(e) =>
                                ($documentForm.document = Array.from(
                                    e.currentTarget.files ?? [],
                                ))}
                        />

                        <ContentHeader
                            title="Dokumen Sokongan"
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
                            class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                        >
                            <div class="flex flex-wrap gap-3">
                                {#each $documentForm.document as item, index}
                                    <FileInputFieldChildren
                                        childrenType="grid"
                                        fileName={item.name}
                                    />
                                {/each}
                            </div>
                            <div
                                class="flex flex-col items-center justify-center gap-2.5"
                            >
                                <p
                                    class=" text-sm text-txt-tertiary"
                                    hidden={$documentForm.document.length > 0}
                                >
                                    Pilih fail dari peranti anda.
                                </p>
                                <div
                                    class="text-txt-tertiary"
                                    hidden={$documentForm.document.length > 0}
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
                                <div hidden={$documentForm.document.length > 0}>
                                    <FileInputField id="document"
                                    ></FileInputField>
                                </div>
                            </div>
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

                        <!-- {#each currentEmployeeUploadedDocuments as item, i} -->
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >1.</label
                            >
                            <DownloadAttachment
                                triggerDownload={handleDownload}
                                fileName={data.documentInfoResponse.data
                                    ?.details.attachment}
                            ></DownloadAttachment>
                        </div>
                        <!-- {/each} -->
                    </div>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>
    {#if !isStatusNew || data.isSupporterRole || data.isApproverRole}
        <StepperContent>
            <StepperContentHeader title="Kemaskini Lantikan Baru">
                {#if !isReadonlyServiceFormStepper && data.isEmploymentSecretaryRole}
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
                <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                <form
                    id="newHireEmploymentServiceForm"
                    method="POST"
                    use:serviceInfoEnhance
                    class="flex w-full flex-col gap-2.5"
                >
                    <!-- <input hidden bind:value={$serviceInfoForm.candidateId} /> -->
                    <!-- <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.gradeId}
                    id="gradeId"
                    label="Gred Semasa"
                    bind:val={$serviceInfoForm.gradeId}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.maxGradeId}
                    id="maxGradeId"
                    label="Gred Maksimum"
                    bind:val={$serviceInfoForm.maxGradeId}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.positionId}
                    id="positionId"
                    label="Jawatan"
                    bind:val={$serviceInfoForm.positionId}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.placementId}
                    id="placementId"
                    label="Penempatan"
                    bind:val={$serviceInfoForm.placementId}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.serviceTypeId}
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:val={$serviceInfoForm.serviceTypeId}
                    options={data.selectionOptions.educationLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.serviceGroupId}
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:val={$serviceInfoForm.serviceGroupId}
                    options={data.selectionOptions.serviceGroupLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.unitId}
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:val={$serviceInfoForm.unitId}
                    options={data.selectionOptions.unitLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.employmentStatusId}
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:val={$serviceInfoForm.employmentStatusId}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.effectiveDate}
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    bind:val={$serviceInfoForm.effectiveDate}
                ></DateSelector>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.retirementBenefit}
                    id="retirementBenefit"
                    label="Faedah Persaraan"
                    bind:val={$serviceInfoForm.retirementBenefit}
                    options={data.selectionOptions.retirementBenefitLookup}
                ></CustomSelectField>
                {#if $serviceInfoErrors.retirementBenefit}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$serviceInfoErrors.retirementBenefit}</span
                    >
                {/if} -->

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.epfNumber}
                        id="epfNumber"
                        label={'No. KWSP'}
                        bind:val={$serviceInfoForm.epfNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.socsoNumber}
                        id="socsoNumber"
                        label={'No. SOCSO'}
                        bind:val={$serviceInfoForm.socsoNumber}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.incomeNumber}
                        id="incomeNumber"
                        label={'No. Cukai'}
                        bind:val={$serviceInfoForm.incomeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.bankName}
                        id="bankName"
                        label={'Bank'}
                        bind:val={$serviceInfoForm.bankName}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.bankAccount}
                        id="bankAccount"
                        label={'No. Akaun'}
                        bind:val={$serviceInfoForm.bankAccount}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.eligibleLeaveCount}
                        id="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        bind:val={$serviceInfoForm.eligibleLeaveCount}
                    ></CustomTextField>

                    <!-- <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.civilServiceStartDate}
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    bind:val={$serviceInfoForm.civilServiceStartDate}
                ></DateSelector>
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.firstServiceDate}
                    id="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    bind:val={$serviceInfoForm.firstServiceDate}
                ></DateSelector>
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.serviceDate}
                    id="serviceDate"
                    label={'Mula Dilantik Perkhidmatan Sekarang'}
                    bind:val={$serviceInfoForm.serviceDate}
                ></DateSelector>
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.firstConfirmServiceDate}
                    id="firstConfirmServiceDate"
                    label={'Disahkan Dalam Jawatan Pertama LKIM'}
                    bind:val={$serviceInfoForm.firstConfirmServiceDate}
                ></DateSelector>
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.confirmDate}
                    id="confirmDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    bind:val={$serviceInfoForm.confirmDate}
                ></DateSelector>

                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.firstEffectiveDate}
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    bind:val={$serviceInfoForm.firstEffectiveDate}
                ></DateSelector>
                <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.newRecruitEffectiveDate}
                    id="newRecruitEffectiveDate"
                    label={'Tarikh Lantikan Baru'}
                    bind:val={$serviceInfoForm.newRecruitEffectiveDate}
                ></DateSelector> -->

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.pensionNumber}
                        id="pensionNumber"
                        label={'Nombor Pencen'}
                        bind:val={$serviceInfoForm.pensionNumber}
                    ></CustomTextField>

                    <!-- <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.revisionMonth}
                    id="revisionMonth"
                    label="Bulan KGT"
                    bind:val={$serviceInfoForm.revisionMonth}
                    options={data.selectionOptions.monthStringLookup}
                ></CustomSelectField> -->

                    <CustomTextField
                        disabled={isReadonlyServiceFormStepper}
                        errors={$serviceInfoErrors.kgt}
                        id="kgt"
                        type="number"
                        label={'KGT'}
                        bind:val={$serviceInfoForm.kgt}
                    ></CustomTextField>

                    <!-- <DateSelector
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.retirementDate}
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    bind:val={$serviceInfoForm.retirementDate}
                ></DateSelector> -->

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <!-- <CustomTextField
                            errors={$serviceInfoErrors.salaryDateOfEffect}
                            idame="salaryDateOfEffect"
                            label={'Tarikh Berkuatkuasa'}
                            bind:val={'12/12/2021'}
                        ></TextFld>
                        {#if $serviceInfoErrors.salaryDateOfEffect}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$serviceInfoErrors.salaryDateOfEffect}</span
                            >
                        {/if} -->
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.maximumSalary}
                                id="maximumSalary"
                                type="number"
                                label={'Tangga Gaji'}
                                bind:val={$serviceInfoForm.maximumSalary}
                            ></CustomTextField>

                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.baseSalary}
                                id="baseSalary"
                                label={'Gaji Pokok'}
                                bind:val={$serviceInfoForm.baseSalary}
                            ></CustomTextField>
                        </div>
                        <div class="space-y-2.5">
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.itka}
                                id="itka"
                                label={'ITKA'}
                                bind:val={$serviceInfoForm.itka}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.itp}
                                id="itp"
                                label={'ITP'}
                                bind:val={$serviceInfoForm.itp}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.epw}
                                id="epw"
                                label={'EPW'}
                                bind:val={$serviceInfoForm.epw}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={isReadonlyServiceFormStepper}
                                errors={$serviceInfoErrors.cola}
                                id="la"
                                label={'COLA'}
                                bind:val={$serviceInfoForm.cola}
                            ></CustomTextField>
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
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Lantikan Baru (Urus Setia Perjawatan)"
            >
                {#if isReadonlySecretaryApprovalResult && data.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="newEmploymentSecretaryResultForm"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
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

                    <input hidden bind:value={$secretaryApprovalInfoForm.id} />

                    <CustomTextField
                        disabled={!!isReadonlySecretaryApprovalResult}
                        errors={$secretaryApprovalInfoErrors.remark}
                        id="remark"
                        label="Tindakan/Ulasan"
                        bind:val={$secretaryApprovalInfoForm.remark}
                    ></CustomTextField>
                    <!-- <CustomRadioField
                    disabled={!!data.secretaryApprovalResponse.data?.details
                        .status}
                    id="status"
                    type="text"
                    label={'Keputusan'}
                    bind:val={$secretaryApprovalInfoForm.status}
                ></CustomRadioField> -->
                </form>
                <hr />
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Tetapan Penyokong dan Pelulus (Jika Sah)"
            >
                {#if !isReadonlySetApproversFormStepper && data.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="newEmploymentAssignApproverSupporterForm"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="newEmploymentAssignApproverSupporterForm"
                    method="POST"
                    use:secretarySetApproverEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <input
                        hidden
                        bind:value={$secretarySetApproverForm.candidateId}
                    />
                    <CustomSelectField
                        disabled={isReadonlySetApproversFormStepper}
                        errors={$secretarySetApproverErrors.supporterId}
                        id="supporterId"
                        label="Nama Penyokong"
                        options={data.selectionOptions.employeeLookup}
                        bind:val={$secretarySetApproverForm.supporterId}
                    />
                    <CustomSelectField
                        disabled={isReadonlySetApproversFormStepper}
                        errors={$secretarySetApproverErrors.approverId}
                        id="approverId"
                        label="Nama Pelulus"
                        options={data.selectionOptions.employeeLookup}
                        bind:val={$secretarySetApproverForm.approverId}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan daripada Peranan - Peranan Lain"
            >
                {#if !isReadonlySupporterApprovalResult && data.isSupporterRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="supporterAprovalForm"
                    >
                        <SvgCheck></SvgCheck>
                    </TextIconButton>
                {/if}</StepperContentHeader
            >
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    {#if data.isSupporterRole && !isReadonlySupporterApprovalResult}
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
                                disabled={isReadonlySupporterApprovalResult}
                                errors={$supporterApprovalErrors.remark}
                                id="supporterRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$supporterApprovalForm.remark}
                            ></CustomTextField>
                            <!-- <RadioSingle
                    disabled={data.supporterResultResponse.data.isApproved}
                    id="supporterIsApproved"
                    options={supportOptions}
                    legend={'Keputusan'}
                    bind:val={$supporterApprovalForm.isApproved}
                ></RadioSingle> -->
                        </form>
                    {:else if data.isApproverRole && !isReadonlyApproverApprovalResult}
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
                                disabled={isReadonlySupporterApprovalResult}
                                errors={$approverApprovalErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$approverApprovalForm.remark}
                            ></CustomTextField>
                            <!-- <RadioSingle
                disabled={data.approverResultResponse.data.isApproved}
                id="approverIsApproved"
                options={supportOptions}
                legend={'Keputusan'}
                bind:val={$approverApprovalForm.isApproved}
            ></RadioSingle> -->
                        </form>
                    {/if}

                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary">Pelulus</b>
                        </div>
                        <CustomTextField
                            disabled
                            type="text"
                            id="approver-name"
                            label="Nama"
                            val={data.approverResultResponse.data?.details.name}
                        ></CustomTextField>
                        {#if isReadonlyApproverApprovalResult}
                            <CustomTextField
                                disabled
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                val={data.approverResultResponse.data?.details
                                    .remark}
                            ></CustomTextField>
                            <!-- <CustomRadioField
                                    disabled
                                    id="approverStatus"
                                    options={approveOptions}
                                    legend={'Keputusan'}
                                    val={data.approverResultResponse.data?.details.
                                        status}
                                ></CustomRadioField> -->
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary">Penyokong</b>
                        </div>
                        <CustomTextField
                            disabled
                            type="text"
                            id="supporter-name"
                            label="Nama"
                            val={data.supporterResultResponse.data?.details
                                .name}
                        ></CustomTextField>
                        {#if isReadonlyApproverApprovalResult}
                            <CustomTextField
                                disabled
                                id="supporterRemark"
                                label="Tindakan/Ulasan"
                                val={data.supporterResultResponse.data?.details
                                    .remark}
                            ></CustomTextField>
                            <!-- <CustomRadioField
                                            disabled
                                            id="supporterStatus"
                                            options={approveOptions}
                                            legend={'Keputusan'}
                                            val={data.supporterResultResponse.data?.details.
                                                status}
                                        ></CustomRadioField> -->
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
                        <CustomTextField
                            disabled
                            type="text"
                            id="emplyomentSecretaryName"
                            label="Nama"
                            val={data.secretaryApprovalResponse.data?.details
                                .name}
                        ></CustomTextField>
                        {#if isReadonlySecretaryApprovalResult}
                            <CustomTextField
                                disabled
                                id="service-secretary-remark"
                                label="Tindakan/Ulasan"
                                val={data.secretaryApprovalResponse.data
                                    ?.details.remark}
                            ></CustomTextField>
                            <!-- <CustomRadioField
                            disabled
                            id="supporterIsApproved"
                            options={certifyOptions}
                            legend={'Keputusan'}
                            bind:val={data.secretaryApprovalResponse
                                .data.isApproved}
                        ></CustomRadioField> -->
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if data.secretaryApprovalResponse.data?.details.status === true}
            <StepperContent>
                <StepperContentHeader title="Maklumat Nombor Pekerja" />
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5">
                        <CustomTextField
                            disabled
                            id="employeeNumber"
                            label="Nombor Pekerja (Dijana secara automatik oleh sistem setelah lulus."
                            val={data.mypsmIDResponse.data?.details
                                .employeeNumber}
                        ></CustomTextField>
                    </div>
                </StepperContentBody>
            </StepperContent>
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
            label={'Catatan'}
            bind:val={$addAcademicInfoModal.field}
        ></CustomTextField>
        <TextIconButton
            type="primary"
            label={'Simpan'}
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
            id="addCompany"
            label={'Nama Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.company}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.address}
            id="addAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addExperienceModalForm.address}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.position}
            id="addPosition"
            label={'Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.position}
        ></CustomTextField>

        <CustomTextField
            errors={$addExperienceModalErrors.positionCode}
            id="addPositionCode"
            label={'Kod Jawatan'}
            type="text"
            bind:val={$addExperienceModalForm.positionCode}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addExperienceModalErrors.startDate}
            id="addStartDate"
            label={'Dari (tahun)'}
            bind:val={$proxyAddAcademiStartDate}
        ></DateSelector>
        <DateSelector
            errors={$addExperienceModalErrors.endDate}
            id="addEndDate"
            label={'Hingga (tahun)'}
            bind:val={$proxyAddAcademiEndDate}
        ></DateSelector> -->

        <CustomTextField
            errors={$addExperienceModalErrors.salary}
            id="addSalary"
            label={'Gaji'}
            type="text"
            bind:val={$addExperienceModalForm.salary}
        ></CustomTextField>
        <TextIconButton
            type="primary"
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
        <CustomTextField
            errors={$addActivityModalErrors.name}
            id="addName"
            label={'Nama Kegiatan'}
            type="text"
            bind:val={$addActivityModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.joinDate}
            id="addJoinDate"
            type="date"
            label={'Tarikh Keahlian'}
            bind:val={$proxyAddActivityJoinDate}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.position}
            id="addPosition"
            label={'Jawatan'}
            type="text"
            bind:val={$addActivityModal.position}
        ></CustomTextField>

        <CustomTextField
            errors={$addActivityModalErrors.description}
            id="addDescription"
            label={'Catatan'}
            type="text"
            bind:val={$addActivityModal.description}
        ></CustomTextField>

        <TextIconButton
            type="primary"
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
        <CustomTextField
            errors={$addFamilyErrors.name}
            id="addName"
            label={'Nama'}
            type="text"
            bind:val={$addFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.alternativeName}
            id="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addFamilyModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addFamilyErrors.identityDocumentColor}
            id="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addFamilyErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <!-- <LongTextField
            errors={$addFamilyErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addFamilyModal.address}
        ></LongTextField> -->

        <CustomTextField
            errors={$addFamilyErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addFamilyModal.postcode}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addFamilyErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddFamilyBirthDate}
        ></DateSelector> -->

        <CustomSelectField
            errors={$addFamilyErrors.birthCountryId}
            id="addBirthCountryId"
            label={'Negara Kelahiran'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addFamilyModal.birthCountryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.birthStateId}
            id="addBirthStateId"
            label={'Negeri Kelahiran'}
            options={data.selectionOptions.stateLookup}
            bind:val={$addFamilyModal.birthStateId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.relationshipId}
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup}
            bind:val={$addFamilyModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.educationLevelId}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addFamilyModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.raceId}
            id="addRaceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addFamilyModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.nationalityId}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addFamilyModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.maritalId}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addFamilyModal.maritalId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.genderId}
            id="addGenderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addFamilyModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            errors={$addFamilyErrors.workAddress}
            id="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.workPostcode}
            id="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addFamilyErrors.phoneNumber}
            id="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addFamilyModal.phoneNumber}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addFamilyErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddFamilyMarriageDate}
        ></DateSelector> -->

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="addInSchool"
                bind:checked={$addFamilyModal.inSchool}
            />
        </div>
        <br />

        <TextIconButton
            type="primary"
            label={'Simpan'}
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
            id="addName"
            label={'Nama'}
            type="text"
            bind:val={$addNonFamilyModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.alternativeName}
            id="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addNonFamilyModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addNonFamilyErrors.identityDocumentColor}
            id="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addNonFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNonFamilyErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNonFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <!-- <LongTextField
            errors={$addNonFamilyErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addNonFamilyModal.address}
        ></LongTextField> -->

        <CustomTextField
            errors={$addNonFamilyErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNonFamilyModal.postcode}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addNonFamilyErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddDependencyBirthDate}
        ></DateSelector> -->

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
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup}
            bind:val={$addNonFamilyModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.educationLevelId}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addNonFamilyModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.raceId}
            id="addRaceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addNonFamilyModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.nationalityId}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addNonFamilyModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.maritalId}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addNonFamilyModal.maritalId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.genderId}
            id="addGenderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addNonFamilyModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            errors={$addNonFamilyErrors.workAddress}
            id="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.workPostcode}
            id="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNonFamilyModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.phoneNumber}
            id="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addNonFamilyModal.phoneNumber}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addNonFamilyErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddDependencyMarriageDate}
        ></DateSelector> -->

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="addInSchool"
                bind:checked={$addNonFamilyModal.inSchool}
            />
        </div>
        <br />

        <TextIconButton
            type="primary"
            label={'Simpan'}
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
            id="addName"
            label={'Nama'}
            type="text"
            bind:val={$addNextOfKinModal.name}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.alternativeName}
            id="addAlternativeName"
            label={'Nama Lain'}
            type="text"
            bind:val={$addNextOfKinModal.alternativeName}
        ></CustomTextField>
        <CustomSelectField
            errors={$addNextOfKinErrors.identityDocumentColor}
            id="addIdentityDocumentColor"
            label={'Warna Kad Pengenalan'}
            options={data.selectionOptions.identityCardColorLookup}
            bind:val={$addNextOfKinModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNextOfKinErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNextOfKinModal.identityDocumentNumber}
        ></CustomTextField>

        <!-- <LongTextField
            errors={$addNextOfKinErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addNextOfKinModal.address}
        ></LongTextField> -->

        <CustomTextField
            errors={$addNextOfKinErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNextOfKinModal.postcode}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addNextOfKinErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddNextOfKinBirthDate}
        ></DateSelector> -->

        <CustomSelectField
            errors={$addNextOfKinErrors.birthCountryId}
            id="addBirthCountryId"
            label={'Negara Kelahiran'}
            options={data.selectionOptions.countryLookup}
            bind:val={$addNextOfKinModal.birthCountryId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthStateId}
            id="addBirthStateId"
            label={'Negeri Kelahiran'}
            options={data.selectionOptions.stateLookup}
            bind:val={$addNextOfKinModal.birthStateId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.relationshipId}
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.selectionOptions.relationshipLookup}
            bind:val={$addNextOfKinModal.relationshipId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.educationLevelId}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.selectionOptions.educationLookup}
            bind:val={$addNextOfKinModal.educationLevelId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.raceId}
            id="addRaceId"
            label={'Bangsa'}
            options={data.selectionOptions.raceLookup}
            bind:val={$addNextOfKinModal.raceId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.nationalityId}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.selectionOptions.nationalityLookup}
            bind:val={$addNextOfKinModal.nationalityId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.maritalId}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.selectionOptions.maritalLookup}
            bind:val={$addNextOfKinModal.maritalId}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.genderId}
            id="addGenderId"
            label={'Jantina'}
            options={data.selectionOptions.genderLookup}
            bind:val={$addNextOfKinModal.genderId}
        ></CustomSelectField>

        <CustomTextField
            errors={$addNextOfKinErrors.workAddress}
            id="addWorkAddress"
            label={'Alamat Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workAddress}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.workPostcode}
            id="addWorkPostcode"
            label={'Poskod Majikan'}
            type="text"
            bind:val={$addNextOfKinModal.workPostcode}
        ></CustomTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.phoneNumber}
            id="addPhoneNumber"
            label={'Nombor Mobil'}
            type="text"
            bind:val={$addNextOfKinModal.phoneNumber}
        ></CustomTextField>

        <!-- <DateSelector
            errors={$addNextOfKinErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddNextOfKinMarriageDate}
        ></DateSelector> -->

        <div class="flex flex-row">
            <label for="addInSchool" class="w-[220px] text-sm text-black"
                >Bersekolah</label
            >
            <Checkbox
                id="addInSchool"
                bind:checked={$addNextOfKinModal.inSchool}
            />
        </div>

        <TextIconButton
            type="primary"
            label={'Simpan'}
            form="addNextOfKinInfoModal"
        />
    </form>
</Modal>
