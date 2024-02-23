<script lang="ts">
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
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import {
        _submitAcademicForm,
        _submitActivityForm,
        _submitDependencyForm,
        _submitExperienceForm,
        _submitFamilyForm,
        _submitNextOfKinForm,
        _submitPersonalForm,
        _submitSecretaryApprovalForm,
        _submitSecretarySetApproverForm,
        _submitServiceForm,
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
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { Checkbox, Modal, Tooltip } from 'flowbite-svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    export let data: PageData;

    const personalDetails: CandidatePersonalDTO =
        data.personalDetailResponse.data?.details;

    let isSuccessPersonalFormResponse: boolean =
        data.personalDetailResponse.status === 'success';
    let isReadonlyPersonalFormStepper: boolean =
        data.personalDetailResponse?.data?.details.isReadonly;

    let isSuccessAcademicFormResponse: boolean =
        data.academicInfoResponse.status === 'success';
    let isReadonlyAcademicFormStepper: boolean =
        data.academicInfoResponse?.data?.details.isReadonly;

    let isSuccessExperienceFormResponse: boolean =
        data.experienceInfoResponse.status === 'success';
    let isReadonlyExperienceFormStepper: boolean =
        data.experienceInfoResponse?.data?.details.isReadonly;

    let isSuccessActivityFormResponse: boolean =
        data.activityInfoResponse.status === 'success';
    let isReadonlyActivityFormStepper: boolean =
        data.activityInfoResponse?.data?.details.isReadonly;

    let isSuccessFamilyFormResponse: boolean =
        data.familyInfoResponse.status === 'success';
    let isReadonlyFamilyFormStepper: boolean =
        data.familyInfoResponse?.data?.details.isReadonly;

    let isSuccessDependencyFormResponse: boolean =
        data.dependencyInfoResponse.status === 'success';
    let isReadonlyDependencyFormStepper: boolean =
        data.dependencyInfoResponse?.data?.details.isReadonly;

    let isSuccessNextOfKinFormResponse: boolean =
        data.nextOfKinInfoResponse.status === 'success';
    let isReadonlyNextOfKinFormStepper: boolean =
        data.nextOfKinInfoResponse?.data?.details.isReadonly;

    let isSuccessDocumentFormResponse: boolean =
        data.documentInfoResponse.status === 'success';
    let isReadonlyDocumentFormStepper: boolean =
        data.documentInfoResponse?.data?.details.isReadonly;

    let isSuccessServiceFormResponse: boolean =
        data.serviceResponse.status === 'success';
    let isReadonlyServiceFormStepper: boolean =
        data.serviceResponse?.data?.details.isReadonly;

    let isSuccessSetApproversResponse: boolean =
        data.secretaryGetApproversResponse.status === 'success';
    let isReadonlySetApproversFormStepper: boolean =
        data.secretaryGetApproversResponse?.data?.details.isReadonly;

    export let openExperienceInfoModal: boolean = false;
    export let openMembershipInfoModal: boolean = false;
    export let openFamilyInfoModal: boolean = false;
    export let openNextOfKinInfoModal: boolean = false;
    export let openNonFamilyInfoModal: boolean = false;
    export let openAcademicInfoModal: boolean = false;

    // Stepper Classes
    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

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
        async onSubmit() {
            _submitAcademicForm($form);
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
        validators: _dependencyListSchema,
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
        validators: _familyListSchema,
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
        validators: _nextOfKinListSchema,
        async onSubmit() {
            _submitNextOfKinForm($addNextOfKinModal);
            // openFamilyInfoModal = false;
        },
    });

    const proxyBirthDate = dateProxy(form, 'birthDate', {
        format: 'date',
    });
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
    const proxyConfirmServiceDate = dateProxy(
        serviceInfoForm,
        'confirmServiceDate',
        { format: 'date' },
    );
    const proxyFirstEffectiveDate = dateProxy(
        serviceInfoForm,
        'firstEffectiveDate',
        { format: 'date' },
    );
    const proxyPastAttachmentDate = dateProxy(
        serviceInfoForm,
        'pastAttachmentDate',
        { format: 'date' },
    );
    const proxyActingDate = dateProxy(serviceInfoForm, 'actingDate', {
        format: 'date',
    });
    const proxyInterimDate = dateProxy(serviceInfoForm, 'interimDate', {
        format: 'date',
    });
    const proxyLastSalaryRaiseDate = dateProxy(
        serviceInfoForm,
        'lastSalaryRaiseDate',
        { format: 'date' },
    );
    const proxyLastPromotionDate = dateProxy(
        serviceInfoForm,
        'lastPromotionDate',
        { format: 'date' },
    );
    const proxyRetirementDate = dateProxy(serviceInfoForm, 'retirementDate', {
        format: 'date',
    });
    const proxySalaryEffectiveDate = dateProxy(
        serviceInfoForm,
        'salaryEffectiveDate',
        { format: 'date' },
    );

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
</script>

<ContentHeader title="Maklumat Lantikan Baru"
    ><TextIconButton
        type="cancel"
        onClick={() => {
            // goto('../lantikan-baru');
        }}
    /></ContentHeader
>
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
            {/if}
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <form
                id="FormStepperMaklumatPeribadi"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <p class={stepperFormTitleClass}>Maklumat Peribadi</p>
                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:val={$form.employeeNumber}
                ></CustomTextField>

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

                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={$form.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="statusPekerjaan"
                    label="Emel Pekerja"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    errors={$errors.identityDocumentColor}
                    id="identityDocumentColor"
                    label="Warna Kad Pengenalan"
                    bind:val={$form.identityDocumentColor}
                    options={data.identityCardColorLookup}
                ></CustomSelectField>

                <!-- <DateSelector
                    disabled
                    errors={$errors.birthDate}
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={$proxyBirthDate}
                ></DateSelector> -->
                <CustomSelectField
                    disabled
                    errors={$errors.birthStateId}
                    id="birthStateId"
                    label="Tempat Lahir"
                    bind:val={$form.birthStateId}
                    options={data.stateLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.birthCountryId}
                    id="birthCountryId"
                    label="Tempat Lahir"
                    bind:val={$form.birthCountryId}
                    options={data.countryLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.nationalityId}
                    id="nationalityId"
                    label="Warganegara"
                    bind:val={$form.nationalityId}
                    options={data.nationalityLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.raceId}
                    id="raceId"
                    label="Bangsa"
                    bind:val={$form.raceId}
                    options={data.raceLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.ethnicId}
                    id="ethnicId"
                    label="Etnik"
                    bind:val={$form.ethnicId}
                    options={data.ethnicityLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.religionId}
                    id="religionId"
                    label="Agama"
                    bind:val={$form.religionId}
                    options={data.religionLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.genderId}
                    id="genderId"
                    label="Jantina"
                    bind:val={$form.genderId}
                    options={data.genderLookupString}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    errors={$errors.maritalId}
                    id="maritalId"
                    label="Status"
                    bind:val={$form.maritalId}
                    options={data.maritalLookupString}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    errors={$errors.email}
                    id="email"
                    label={'Emel'}
                    type="text"
                    bind:val={$form.email}
                ></CustomTextField>

                <!-- <LongTextField
                    errors={$errors.homeAddress}
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={$form.homeAddress}
                />

                <LongTextField
                    errors={$errors.mailAddress}
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat (jika berlainan dari alamat rumah)"
                    bind:val={$form.mailAddress}
                /> -->

                <!-- <CustomTextField
                    disabled
                    id="houseLoanType"
                    label={'Perumahan'}
                    type="text"
                    bind:val={$form.houseLoanType}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="houseLoan"
                    label={'Pinjaman Perumahan'}
                    type="text"
                    bind:val={$form.houseLoan}
                ></CustomTextField> -->

                <!-- <RadioSingle
                    id="isExPolice"
                    disabled
                    options={approveOptions}
                    legend={'Bekas Polis / Tentera'}
                    bind:userSelected={$form.isExPolice}
                ></RadioSingle> -->

                <div class="flex w-full flex-col gap-2">
                    <p class={stepperFormTitleClass}>
                        Maklumat Pertalian Dengan Kakitangan LKIM
                    </p>

                    <!-- <RadioSingle
                        id="isRelatedToLKIM"
                        {options}
                        disabled
                        legend={'Perhubungan Dengan Kakitangan LKIM'}
                        bind:userSelected={$form.isRelatedToLKIM}
                    ></RadioSingle> -->

                    {#if $form.isInternalRelationship}
                        <CustomTextField
                            disabled
                            errors={$errors.employeeNumber}
                            id="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            type="text"
                            bind:val={$form.employeeNumber}
                        ></CustomTextField>

                        <CustomSelectField
                            disabled
                            errors={$errors.name}
                            id="name"
                            label="Jawatan Kakitangan LKIM"
                            bind:val={$form.name}
                            options={data.positionLookupString}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled
                            errors={$errors.employeePosition}
                            id="relationDetailPosition"
                            label="Jawatan Kakitangan LKIM"
                            bind:val={$form.employeePosition}
                            options={data.positionLookupString}
                        ></CustomSelectField>

                        <CustomSelectField
                            disabled
                            errors={$errors.relationshipId}
                            id="relationDetailRelationship"
                            label="Hubungan"
                            bind:val={$form.relationshipId}
                            options={data.relationshipLookupString}
                        ></CustomSelectField>
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
            <div class="text-sm font-medium italic text-system-primary">
                Bahagian "read-only". Tidak boleh ditukar.
            </div>
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperMaklumatPerkhidmatan"
                    class="flex w-full flex-col gap-2"
                    use:serviceInfoEnhance
                    method="POST"
                >
                    <p class={stepperFormTitleClass}>Maklumat Perkhidmatan</p>
                    <!-- 
                    <CustomTextField
                        disabled
                        id="currentGrade"
                        label="Gred Semasa"
                        bind:val={$serviceInfoForm.currentGrade}
                    ></CustomTextField> -->
                    <!-- 
                    <CustomTextField
                        disabled
                        id="currentPosition"
                        label="Jawatan"
                        bind:val={$serviceInfoForm.currentPosition}
                    ></CustomTextField> -->

                    <CustomTextField
                        disabled
                        id="placementId"
                        label="Penempatan"
                        bind:val={$serviceInfoForm.placementId}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="serviceTypeId"
                        label="Taraf Perkhidmatan"
                        bind:val={$serviceInfoForm.serviceTypeId}
                    ></CustomTextField>

                    <!-- <DateSelector
                        disabled
                        id="effectiveDate"
                        label="Tarikh Kuatkuasa Lantikan Semasa"
                        bind:val={$proxyEffectiveDate}
                    ></DateSelector> -->

                    <!-- <CustomSelectField
                        disabled
                        id="retirementBenefit"
                        label={'Faedah Persaraan'}
                        options={data.retirementBenefitLookupString}
                        bind:val={$serviceInfoForm.retirementBenefit}
                    ></CustomSelectField> -->

                    <CustomTextField
                        disabled
                        id="retirementBenefit"
                        label={'Faedah Persaraan'}
                        type="text"
                        bind:val={$serviceInfoForm.retirementBenefit}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="epfNumber"
                        label={'No. KWSP'}
                        type="text"
                        bind:val={$serviceInfoForm.epfNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="socsoNumber"
                        label={'No. SOCSO'}
                        type="text"
                        bind:val={$serviceInfoForm.socsoNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="incomeNumber"
                        label={'No. Cukai (LHDN)'}
                        type="text"
                        bind:val={$serviceInfoForm.incomeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="bankName"
                        label={'Bank'}
                        type="text"
                        bind:val={$serviceInfoForm.bankName}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="bankAccount"
                        label={'No.Akaun'}
                        type="text"
                        bind:val={$serviceInfoForm.bankAccount}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="programId"
                        label={'Program'}
                        type="text"
                        bind:val={$serviceInfoForm.programId}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        id="eligibleLeaveCount"
                        label={'Kelayakan Cuti'}
                        type="number"
                        bind:val={$serviceInfoForm.eligibleLeaveCount}
                    ></CustomTextField>

                    <!-- <DateSelector
                        disabled
                        id="mulaDilantikPerkhidmatanKerajaan"
                        label="Mula Dilantik Perkhidmatan Kerajaan"
                        bind:val={$proxyCivilServiceStartDate}
                    ></DateSelector>
                    <DateSelector
                        disabled
                        id="firstEffectiveDate"
                        label="Mula Dilantik Perkhidmatan LKIM"
                        bind:val={$proxyFirstEffectiveDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        id="confirmServiceDate"
                        label="Disahkan Dalam Jawatan Semasa LKIM"
                        bind:val={$proxyConfirmServiceDate}
                    ></DateSelector> -->
                    <!--<AccordianField
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
                    </AccordianField> -->

                    <!-- <DateSelector
                        disabled
                        id="pastAttachmentDate"
                        label="Tarikh Kelulusan Percantuman Perkhidmatan Lepas"
                        bind:val={$proxyPastAttachmentDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        id="actingDate"
                        label="Pemangkuan Sekarang"
                        bind:val={$proxyActingDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        id="interimDate"
                        label="Tanggung Kerja Sekarang"
                        bind:val={$proxyInterimDate}
                    ></DateSelector>

                    <CustomTextField
                        disabled
                        id="pensionScheme"
                        label={'Skim Pencen'}
                        type="text"
                        bind:val={$serviceInfoForm.pensionScheme}
                    ></CustomTextField>

                    <DateSelector
                        disabled
                        id="lastSalaryRaiseDate"
                        label="Kenaikan Gaji Akhir"
                        bind:val={$proxyLastSalaryRaiseDate}
                    ></DateSelector>

                    <DateSelector
                        disabled
                        id="lastPromotionDate"
                        label="Kenaikan Pangkat Akhir"
                        bind:val={$proxyLastPromotionDate}
                    ></DateSelector>

                    <CustomSelectField
                        disabled
                        id="salaryMovementMonth"
                        label="Bulan KGT"
                        bind:val={$serviceInfoForm.salaryMovementMonth}
                        options={data.monthStringLookup}
                    ></CustomSelectField>

                    <DateSelector
                        disabled
                        id="retirementDate"
                        label="Tarikh Bersara"
                        bind:val={$proxyRetirementDate}
                    ></DateSelector> -->

                    <p class={stepperFormTitleClass}>
                        Maklumat Gaji dan Elaun - Elaun
                    </p>
                    <div class="grid grid-cols-2 gap-10">
                        <div class="space-y-2.5">
                            <!-- <DateSelector
                                disabled
                                id="salaryEffectiveDate"
                                label="Tarikh Berkuatkuasa"
                                bind:val={$proxySalaryEffectiveDate}
                            ></DateSelector> -->
                            <CustomTextField
                                disabled
                                id="tanggaGaji"
                                label={'Tangga Gaji'}
                                type="text"
                                bind:val={$serviceInfoForm.maximumSalary}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="baseSalary"
                                label={'Gaji Pokok'}
                                type="text"
                                bind:val={$serviceInfoForm.baseSalary}
                            ></CustomTextField>
                        </div>

                        <div class="space-y-2.5">
                            <CustomTextField
                                disabled
                                id="itka"
                                label={'itka'}
                                type="text"
                                bind:val={$serviceInfoForm.itka}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="itp"
                                label={'itp'}
                                type="text"
                                bind:val={$serviceInfoForm.itp}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="epw"
                                label={'epw'}
                                type="text"
                                bind:val={$serviceInfoForm.epw}
                            ></CustomTextField>

                            <CustomTextField
                                disabled
                                id="cola"
                                label={'cola'}
                                type="text"
                                bind:val={$serviceInfoForm.cola}
                            ></CustomTextField>
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
        >
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperAkademik"
                />
            {/if} -->
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperAkademik"
                    class="flex w-full flex-col gap-2"
                    use:maklumatAkademikEnhance
                    method="POST"
                >
                    {#if $maklumatAkademikForm.dataList.length < 1}
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada data dijumpai. Sila tambah.
                        </div>
                    {:else}
                        {#each $maklumatAkademikForm.dataList as _, i}
                            <div class="space-y-2.5 rounded-[3px] border p-2.5">
                                <div
                                    class="mb-5 mt-2.5 text-sm text-system-primary"
                                >
                                    <p>Maklumat Akademik #{i + 1}</p>
                                </div>

                                <CustomTextField
                                    disabled
                                    id="major"
                                    label={'Jurusan'}
                                    type="text"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .major}
                                ></CustomTextField>

                                <!-- {#if $maklumatAkademikErrors?.dataList[i]?.major}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatAkademikErrors?.dataList[i]
                                    ?.major}</span
                            >
                        {/if} -->
                                <CustomTextField
                                    disabled
                                    id="minor"
                                    label={'Bidang'}
                                    type="text"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .minor}
                                ></CustomTextField>

                                <CustomSelectField
                                    disabled
                                    id="country"
                                    options={data.countryLookupString}
                                    label={'Negara'}
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .country}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="institution"
                                    options={data.institutionLookupString}
                                    label={'Institusi'}
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .institution}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="educationLevel"
                                    options={data.educationLookupString}
                                    label={'Taraf Pendidikan'}
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .educationLevel}
                                ></CustomSelectField>

                                <CustomSelectField
                                    disabled
                                    id="sponsorship"
                                    options={data.sponsorshipLookupString}
                                    label={'Penajaan'}
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .sponsorship}
                                ></CustomSelectField>

                                <CustomTextField
                                    disabled
                                    label={'Nama Sijil/Pencapaian'}
                                    type="text"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .name}
                                ></CustomTextField>

                                <DateSelector
                                    disabled
                                    id="completionDate"
                                    label="Tarikh Tamat Pembelajaran"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .completionDate}
                                ></DateSelector>

                                <CustomTextField
                                    disabled
                                    id="finalGrade"
                                    label={'Ijazah/ CGPA/ Gred'}
                                    type="text"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .finalGrade}
                                ></CustomTextField>

                                <CustomTextField
                                    disabled
                                    id="remark"
                                    label={'Catatan'}
                                    type="text"
                                    bind:val={$maklumatAkademikForm.dataList[i]
                                        .remark}
                                ></CustomTextField>
                            </div>
                        {/each}
                    {/if}
                </form>
                {#if !disabled}
                    <div class="w-full rounded-[3px] border-b border-t p-2.5">
                        <TextIconButton
                            primary
                            label="Tambah Akademik/Kelayakan/Latihan yang Lalu"
                            onClick={() => (openAcademicInfoModal = true)}
                        >
                            <SvgPlus></SvgPlus>
                        </TextIconButton>
                    </div>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!---------------Maklumat Pengalaman--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Pengalaman">
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperPengalaman"
                />
            {/if} -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2.5">
                <form
                    id="FormStepperPengalaman"
                    class="flex w-full flex-col gap-2"
                    use:maklumatPengalamanEnhance
                    method="POST"
                >
                    {#if $maklumatPengalamanForm.dataList.length < 1}
                        <div
                            class="text-center text-sm italic text-system-primary"
                        >
                            Tiada data dijumpai. Sila tambah.
                        </div>
                    {:else}
                        {#each $maklumatPengalamanForm.dataList as _, i}
                            <div class="space-y-2.5 rounded-[3px] border p-2.5">
                                <p class={stepperFormTitleClass}>
                                    Maklumat Pengalaman #{i + 1}
                                </p>

                                <CustomTextField
                                    disabled
                                    id="company"
                                    label={'Nama Majikan'}
                                    type="text"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].company}
                                ></CustomTextField>
                                <!-- {#if $maklumatPengalamanErrors.company}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.company}</span
                            >
                        {/if} -->

                                <CustomTextField
                                    disabled
                                    id="address"
                                    label={'Alamat Majikan'}
                                    type="text"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].address}
                                ></CustomTextField>
                                <!-- {#if $maklumatPengalamanErrors.address}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.address}</span
                            >
                        {/if} -->

                                <CustomTextField
                                    disabled
                                    id="position"
                                    label={'Jawatan'}
                                    type="text"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].position}
                                ></CustomTextField>
                                <!-- {#if $maklumatPengalamanErrors.position}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.position}</span
                            >
                        {/if} -->

                                <CustomTextField
                                    disabled
                                    id="positionCode"
                                    label={'Kod Jawatan (jika ada)'}
                                    type="text"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].positionCode}
                                ></CustomTextField>
                                <!-- {#if $maklumatPengalamanErrors.positionCode}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.positionCode}</span
                            >
                        {/if} -->
                                <DateSelector
                                    disabled
                                    id="startDate"
                                    label="Tarikh Mula Bekerja"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].startDate}
                                ></DateSelector>

                                <DateSelector
                                    disabled
                                    id="endDate"
                                    label="Tarikh Tamat Bekerja"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].endDate}
                                ></DateSelector>

                                <!-- {#if $maklumatPengalamanErrors.duration}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.duration}</span
                            >
                        {/if} -->

                                <CustomTextField
                                    disabled
                                    id="salary"
                                    label={'Gaji'}
                                    type="number"
                                    bind:val={$maklumatPengalamanForm.dataList[
                                        i
                                    ].salary}
                                ></CustomTextField>
                                <!-- {#if $maklumatPengalamanErrors.salary}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$maklumatPengalamanErrors.salary}</span
                            >
                        {/if} -->
                            </div>
                        {/each}
                    {/if}
                </form>
                {#if !disabled}
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
                {/if}
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
                <DynamicTable
                    tableItems={data.activityInfoResponse.data?.dataList}
                ></DynamicTable>
            </div>
            {#if !disabled}
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
            {/if}</StepperContentBody
        >
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Keluarga--------------------->
    <!------------------------------------------------------->
    <StepperContent>
        <StepperContentHeader title="Maklumat Keluarga">
            <!-- <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton> -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalFamilyList}
                ></DynamicTable>
            </div>
            {#if !disabled}
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
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Tanggungan Selain Isteri dan Anak"
        >
            <!-- <TextIconButton
                primary
                label="Simpan"
                onClick={() => {
                    getSuccessToast();
                }}
            >
                <SvgCheck></SvgCheck>
            </TextIconButton> -->
        </StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalDependencyList}
                ></DynamicTable>
            </div>
            {#if !disabled}
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
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------->
    <!-----------------Maklumat Waris--------------------->
    <!------------------------------------------------------->

    <StepperContent>
        <StepperContentHeader title="Maklumat Waris">
            <!-- {#if !disabled}
                <TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperWaris"
                />
            {/if} -->
        </StepperContentHeader>

        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DynamicTable tableItems={data.personalNextOfKinList}
                ></DynamicTable>
            </div>
            {#if !disabled}
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
            {/if}</StepperContentBody
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
    <StepperContent>
        <StepperContentHeader title="Kemaskini Lantikan Baru">
            {#if !isReadonlyServiceFormStepper}
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
                    options={data.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.maxGradeId}
                    id="maxGradeId"
                    label="Gred Maksimum"
                    bind:val={$serviceInfoForm.maxGradeId}
                    options={data.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.positionId}
                    id="positionId"
                    label="Jawatan"
                    bind:val={$serviceInfoForm.positionId}
                    options={data.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.placementId}
                    id="placementId"
                    label="Penempatan"
                    bind:val={$serviceInfoForm.placementId}
                    options={data.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.serviceTypeId}
                    id="serviceTypeId"
                    label="Taraf Perkhidmatan"
                    bind:val={$serviceInfoForm.serviceTypeId}
                    options={data.educationLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.serviceGroupId}
                    id="serviceGroupId"
                    label="Kumpulan Perkhidmatan"
                    bind:val={$serviceInfoForm.serviceGroupId}
                    options={data.serviceGroupLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.unitId}
                    id="unitId"
                    label="Unit Perkhidmatan"
                    bind:val={$serviceInfoForm.unitId}
                    options={data.unitLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={isReadonlyServiceFormStepper}
                    errors={$serviceInfoErrors.employmentStatusId}
                    id="employmentStatusId"
                    label="Status Perkhidmatan"
                    bind:val={$serviceInfoForm.employmentStatusId}
                    options={data.serviceTypeLookup}
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
                    options={data.retirementBenefitLookup}
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
                    options={data.monthStringLookup}
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
            {#if !data.secretaryApprovalResponse.data?.details.isApproved}
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

                <!-- <LongTextField
                    disabled={data.secretaryApprovalResponse.data?.details
                        .isApproved}
                    errors={$secretaryApprovalInfoErrors.remark}
                    id="remark"
                    label="Tindakan/Ulasan"
                    bind:val={$secretaryApprovalInfoForm.remark}
                ></LongTextField>
                <RadioSingle
                    disabled={data.secretaryApprovalResponse.data?.details
                        .isApproved}
                    id="isApproved"
                    options={certifyOptions}
                    legend={'Keputusan'}
                    bind:userSelected={$secretaryApprovalInfoForm.isApproved}
                ></RadioSingle> -->
            </form>
            <hr />
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tetapkan Penyokong dan Pelulus (Jika Sah)">
            {#if !isReadonlySetApproversFormStepper}
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
                <!-- <CustomSelectField
                    disabled={isReadonlySetApproversFormStepper}
                    errors={$secretarySetApproverErrors.supporterId}
                    id="supporterId"
                    label="Nama Penyokong"
                    options={[
                        {
                            value: 1,
                            name: 'Mohd Iqbal',
                        },
                    ]}
                    bind:val={$secretarySetApproverForm.supporterId}
                /> -->
                <!-- <CustomSelectField
                    disabled={isReadonlySetApproversFormStepper}
                    errors={$secretarySetApproverErrors.approverId}
                    id="approverId"
                    label="Nama Pelulus"
                    options={[
                        {
                            value: 2,
                            name: 'Mohd Kairom',
                        },
                    ]}
                    bind:val={$secretarySetApproverForm.approverId}
                /> -->
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan daripada Peranan - Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Penyokong</b>
                    </div>
                    <CustomTextField
                        disabled
                        type="text"
                        id="supporterName"
                        label="Nama"
                        val={data.supporterResultResponse.data?.details.name}
                    ></CustomTextField>
                    {#if data.supporterResultResponse.data?.details.isApproved}
                        <!-- <LongTextField
                            disabled
                            id="supporterRemark"
                            label="Tindakan/Ulasan"
                            bind:val={data.supporterResultResponse.data
                                .remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            id="supporterIsApproved"
                            options={supportOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.supporterResultResponse.data
                                .isApproved}
                        ></RadioSingle> -->
                        <!-- {:else}
                        <StepperOtherRolesResult /> -->
                    {/if}
                </div>
                <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                    <div class="mb-5">
                        <b class="text-sm text-system-primary">Pelulus</b>
                    </div>
                    <CustomTextField
                        disabled
                        type="text"
                        id="approverName"
                        label="Nama"
                        val={data.approverResultResponse.data?.details.name}
                    ></CustomTextField>
                    {#if data.approverResultResponse.data?.details.isApproved}
                        <!-- <LongTextField
                            disabled
                            id="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:val={data.approverResultResponse.data
                                ?.details.remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            id="approverIsApproved"
                            options={approveOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.approverResultResponse.data
                                .isApproved}
                        ></RadioSingle> -->
                        <!-- {:else}
                        <StepperOtherRolesResult /> -->
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
                        id="serviceSecretaryName"
                        label="Nama"
                        val={data.secretaryApprovalResponse.data?.details.name}
                    ></CustomTextField>
                    {#if !!data.secretaryApprovalResponse.data?.details.isApproved}
                        <!-- <LongTextField
                            disabled
                            id="service-secretary-remark"
                            label="Tindakan/Ulasan"
                            bind:val={data.secretaryApprovalResponse.data
                                .remark}
                        ></LongTextField>
                        <RadioSingle
                            disabled
                            id="supporterIsApproved"
                            options={certifyOptions}
                            legend={'Keputusan'}
                            bind:userSelected={data.secretaryApprovalResponse
                                .data.isApproved}
                        ></RadioSingle> -->
                        <!-- {:else}
                        <StepperOtherRolesResult /> -->
                    {/if}
                </div>
            </div>
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
        <CustomSelectField
            errors={$addAcademicInfoErrors.majorMinor}
            id="majorMinor"
            label={'Jenis Jurusan'}
            options={data.majorMinorLookupString}
            bind:val={$addAcademicInfoModal.majorMinor}
        ></CustomSelectField>

        <!-- <CustomSelectField
            errors={$addAcademicInfoErrors.country}
            id="country"
            label={'Negara'}
            options={data.countryLookupString}
            bind:val={$addAcademicInfoModal.country}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.institution}
            id="institution"
            label={'Institusi'}
            options={data.institutionLookupString}
            bind:val={$addAcademicInfoModal.institution}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.educationLevel}
            id="educationLevel"
            label={'Taraf Pembelajaran'}
            options={data.educationLookupString}
            bind:val={$addAcademicInfoModal.educationLevel}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addAcademicInfoErrors.sponsorship}
            id="sponsorship"
            label={'Penajaan'}
            options={data.sponsorshipLookupString}
            bind:val={$addAcademicInfoModal.sponsorship}
        ></CustomSelectField> -->

        <CustomTextField
            errors={$addAcademicInfoErrors.name}
            id="name"
            label={'Nama Pencapaian/Sijil'}
            bind:val={$addAcademicInfoModal.name}
        ></CustomTextField>
        <!-- <DateSelector
            errors={$addAcademicInfoErrors.completionDate}
            id="completionDate"
            label={'Tarikh Kelulusan'}
            bind:val={$proxyAcademicCompletionDate}
        ></DateSelector> -->
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
        <CustomTextField
            errors={$addActivityModalErrors.name}
            id="addName"
            label={'Nama Kegiatan'}
            type="text"
            bind:val={$addActivityModal.name}
        ></CustomTextField>

        <DateSelector
            errors={$addActivityModalErrors.joinDate}
            id="addJoinDate"
            label={'Tarikh Keahlian'}
            bind:val={$proxyAddActivityJoinDate}
        ></DateSelector>

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
            options={data.identityCardColorLookup}
            bind:val={$addFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addFamilyErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <LongTextField
            errors={$addFamilyErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addFamilyModal.address}
        ></LongTextField>

        <CustomTextField
            errors={$addFamilyErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addFamilyModal.postcode}
        ></CustomTextField>

        <DateSelector
            errors={$addFamilyErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddFamilyBirthDate}
        ></DateSelector>

        <CustomSelectField
            errors={$addFamilyErrors.birthCountry}
            id="addBirthCountryId"
            label={'Negara Kelahiran'}
            options={data.countryLookupString}
            bind:val={$addFamilyModal.birthCountry}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.birthState}
            id="addBirthStateId"
            label={'Negeri Kelahiran'}
            options={data.stateLookupString}
            bind:val={$addFamilyModal.birthState}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.relationship}
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.relationshipLookupString}
            bind:val={$addFamilyModal.relationship}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.educationLevel}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.educationLookupString}
            bind:val={$addFamilyModal.educationLevel}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.race}
            id="addRaceId"
            label={'Bangsa'}
            options={data.raceLookupString}
            bind:val={$addFamilyModal.race}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.nationality}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.nationalityLookupString}
            bind:val={$addFamilyModal.nationality}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.marital}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.maritalLookupString}
            bind:val={$addFamilyModal.marital}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addFamilyErrors.gender}
            id="addGenderId"
            label={'Jantina'}
            options={data.genderLookupString}
            bind:val={$addFamilyModal.gender}
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

        <DateSelector
            errors={$addFamilyErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddFamilyMarriageDate}
        ></DateSelector>

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
            options={data.identityCardColorLookup}
            bind:val={$addNonFamilyModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNonFamilyErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNonFamilyModal.identityDocumentNumber}
        ></CustomTextField>

        <LongTextField
            errors={$addNonFamilyErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addNonFamilyModal.address}
        ></LongTextField>

        <CustomTextField
            errors={$addNonFamilyErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNonFamilyModal.postcode}
        ></CustomTextField>

        <DateSelector
            errors={$addNonFamilyErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddDependencyBirthDate}
        ></DateSelector>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthCountry}
            id="addBirthCountryId"
            label={'Negara Kelahiran'}
            options={data.countryLookupString}
            bind:val={$addNonFamilyModal.birthCountry}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.birthState}
            id="addBirthStateId"
            label={'Negeri Kelahiran'}
            options={data.stateLookupString}
            bind:val={$addNonFamilyModal.birthState}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.relationship}
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.relationshipLookupString}
            bind:val={$addNonFamilyModal.relationship}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.educationLevel}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.educationLookupString}
            bind:val={$addNonFamilyModal.educationLevel}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.race}
            id="addRaceId"
            label={'Bangsa'}
            options={data.raceLookupString}
            bind:val={$addNonFamilyModal.race}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.nationality}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.nationalityLookupString}
            bind:val={$addNonFamilyModal.nationality}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.marital}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.maritalLookupString}
            bind:val={$addNonFamilyModal.marital}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNonFamilyErrors.gender}
            id="addGenderId"
            label={'Jantina'}
            options={data.genderLookupString}
            bind:val={$addNonFamilyModal.gender}
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

        <DateSelector
            errors={$addNonFamilyErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddDependencyMarriageDate}
        ></DateSelector>

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
            options={data.identityCardColorLookup}
            bind:val={$addNextOfKinModal.identityDocumentColor}
        ></CustomSelectField>
        <CustomTextField
            errors={$addNextOfKinErrors.identityDocumentNumber}
            id="addIdentityDocumentNumber"
            type="number"
            label={'Nombor Kad Pengenalan'}
            bind:val={$addNextOfKinModal.identityDocumentNumber}
        ></CustomTextField>

        <LongTextField
            errors={$addNextOfKinErrors.address}
            id="addAddress"
            label={'Alamat'}
            bind:val={$addNextOfKinModal.address}
        ></LongTextField>

        <CustomTextField
            errors={$addNextOfKinErrors.postcode}
            id="addPostcode"
            label={'Poskod'}
            type="text"
            bind:val={$addNextOfKinModal.postcode}
        ></CustomTextField>

        <DateSelector
            errors={$addNextOfKinErrors.birthDate}
            id="addBirthDate"
            label={'Tarikh Lahir'}
            bind:val={$proxyAddNextOfKinBirthDate}
        ></DateSelector>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthCountry}
            id="addBirthCountryId"
            label={'Negara Kelahiran'}
            options={data.countryLookupString}
            bind:val={$addNextOfKinModal.birthCountry}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.birthState}
            id="addBirthStateId"
            label={'Negeri Kelahiran'}
            options={data.stateLookupString}
            bind:val={$addNextOfKinModal.birthState}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.relationship}
            id="addRelationshipId"
            label={'Hubungan'}
            options={data.relationshipLookupString}
            bind:val={$addNextOfKinModal.relationship}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.educationLevel}
            id="addEducationLevelId"
            label={'Taraf Pendidikan'}
            options={data.educationLookupString}
            bind:val={$addNextOfKinModal.educationLevel}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.race}
            id="addRaceId"
            label={'Bangsa'}
            options={data.raceLookupString}
            bind:val={$addNextOfKinModal.race}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.nationality}
            id="addNationalityId"
            label={'Kewarganegaraan'}
            options={data.nationalityLookupString}
            bind:val={$addNextOfKinModal.nationality}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.marital}
            id="addMaritalId"
            label={'Status Perkhahwinan'}
            options={data.maritalLookupString}
            bind:val={$addNextOfKinModal.marital}
        ></CustomSelectField>

        <CustomSelectField
            errors={$addNextOfKinErrors.gender}
            id="addGenderId"
            label={'Jantina'}
            options={data.genderLookupString}
            bind:val={$addNextOfKinModal.gender}
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

        <DateSelector
            errors={$addNextOfKinErrors.marriageDate}
            id="addMarriageDate"
            label={'Tarikh Kahwin'}
            bind:val={$proxyAddNextOfKinMarriageDate}
        ></DateSelector>

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
