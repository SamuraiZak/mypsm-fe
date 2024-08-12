<script lang="ts">
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Badge, Checkbox } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SvgArrowDownTray from '$lib/assets/svg/SvgArrowDownTray.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { writable } from 'svelte/store';
    import {
        _proceedingAppealSchema,
        _proceedingApproverSchema,
        _proceedingSentencingMeetingSchema,
        _proceedingSuspensionCriminalCancelSchema,
        _proceedingSuspensionCriminalDetailSchema,
        _proceedingSuspensionViewSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import {
        approveOptions,
        certifyOptions,
        commonOptions,
        confirmOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _confirmationApprovalSchema,
        _confirmationMeetingResultSchema,
        _setApproversSchema,
    } from '$lib/schemas/mypsm/employment/confirmation-in-service/schema';
    import {
        _addConfirmationAuditDirector,
        _addConfirmationEmploymentSecretary,
        _addConfirmationIntegrityDirector,
        _addConfirmationMeetingResult,
        _addConfirmationStateDirector,
        _addSecretarySetApproverForm,
    } from './+page';
    import { _addInterimApprovalSchema } from '$lib/schemas/mypsm/employment/tanggung-kerja/interim-schemas';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
    export let data: PageData;

    let isContractContinuation: boolean = false;
    let confirmationEmploymentSecretaryIsApproved = writable<boolean>(false);
    let confirmationDivisionDirectorIsApproved = writable<boolean>(false);
    let confirmationIntegrityDirectorIsApproved = writable<boolean>(false);
    let confirmationAuditDirectorIsApproved = writable<boolean>(false);
    let confirmationMeetingResultIsApproved = writable<boolean>(false);

    let isTypeConfirmationExceedsThreeYears = writable<boolean>(false);
    let submitChecklist: boolean = false;
    let employmentSecretaryDetailIsDraft = writable<boolean>(false);
    let confirmationSetApproverIsDraft = writable<boolean>(false);
    let isReadOnlyEmploymentSecretaryConfirmationInServiceApproval =
        writable<boolean>(false);
    let divisionDirectorDetailIsDraft = writable<boolean>(false);
    let isReadOnlyDivisionDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let integrityDirectorDetailIsDraft = writable<boolean>(false);
    let isReadOnlyIntegrityDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let auditDirectorDetailIsDraft = writable<boolean>(false);
    let isReadOnlyAuditDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let confirmationMeetingDetailIsDraft = writable<boolean>(false);
    let isReadOnlyConfirmationInServiceMeetingResult = writable<boolean>(false);
    let confirmationProbationContinuedIsDraft = writable<boolean>(true);

    let isExceedsThreeYearsAndIsDraft: boolean = false;

    $: {
        if (data.view.confirmationInServiceView.dataType === 'Lebih 3 tahun') {
            isTypeConfirmationExceedsThreeYears.set(true);
        } else {
            isTypeConfirmationExceedsThreeYears.set(false);
        }

        // if (
        //     data.view.confirmationInServiceView.probationContinuation
        //         .isDraft === true
        // ) {
        //     confirmationProbationContinuedIsDraft.set(true);
        // } else {
        //     confirmationProbationContinuedIsDraft.set(false);
        // }

        if (data.view.confirmationInServiceView.secretary.isDraft === true) {
            employmentSecretaryDetailIsDraft.set(true);
        } else {
            employmentSecretaryDetailIsDraft.set(false);
        }

        if (data.view.confirmationInServiceView.approver.isDraft === true) {
            confirmationSetApproverIsDraft.set(true);
        } else {
            confirmationSetApproverIsDraft.set(false);
        }

        if (
            data.view.confirmationInServiceView.secretary.status !== null &&
            data.view.confirmationInServiceView.secretary.remark !== null
        ) {
            isReadOnlyEmploymentSecretaryConfirmationInServiceApproval.set(
                true,
            );

            data.view.confirmationInServiceView.secretary.status
                ? confirmationEmploymentSecretaryIsApproved.set(true)
                : confirmationEmploymentSecretaryIsApproved.set(false);
        } else {
            isReadOnlyEmploymentSecretaryConfirmationInServiceApproval.set(
                false,
            );
        }

        if (data.view.confirmationInServiceView.division.isDraft === true) {
            divisionDirectorDetailIsDraft.set(true);
        } else {
            divisionDirectorDetailIsDraft.set(false);
        }

        if (
            data.view.confirmationInServiceView.division.status !== null &&
            data.view.confirmationInServiceView.division.remark !== null
        ) {
            isReadOnlyDivisionDirectorConfirmationInServiceApproval.set(true);
            data.view.confirmationInServiceView.division.status
                ? confirmationDivisionDirectorIsApproved.set(true)
                : confirmationDivisionDirectorIsApproved.set(false);
        } else {
            isReadOnlyDivisionDirectorConfirmationInServiceApproval.set(false);
        }

        if (data.view.confirmationInServiceView.integrity.isDraft === true) {
            integrityDirectorDetailIsDraft.set(true);
        } else {
            integrityDirectorDetailIsDraft.set(false);
        }

        if (
            data.view.confirmationInServiceView.integrity.status !== null &&
            data.view.confirmationInServiceView.integrity.remark !== null
        ) {
            isReadOnlyIntegrityDirectorConfirmationInServiceApproval.set(true);
            data.view.confirmationInServiceView.integrity.status
                ? confirmationIntegrityDirectorIsApproved.set(true)
                : confirmationIntegrityDirectorIsApproved.set(false);
        } else {
            isReadOnlyIntegrityDirectorConfirmationInServiceApproval.set(false);
        }

        if (data.view.confirmationInServiceView.audit.isDraft === true) {
            auditDirectorDetailIsDraft.set(true);
        } else {
            auditDirectorDetailIsDraft.set(false);
        }

        if (
            data.view.confirmationInServiceView.audit.status !== null ||
            data.view.confirmationInServiceView.audit.remark !== null
        ) {
            isReadOnlyAuditDirectorConfirmationInServiceApproval.set(true);
            data.view.confirmationInServiceView.audit.status
                ? confirmationAuditDirectorIsApproved.set(true)
                : confirmationAuditDirectorIsApproved.set(false);
        } else {
            isReadOnlyAuditDirectorConfirmationInServiceApproval.set(false);
        }

        if (data.view.confirmationInServiceView.meeting.isDraft === true) {
            confirmationMeetingDetailIsDraft.set(true);
        } else {
            confirmationMeetingDetailIsDraft.set(false);
        }

        if (
            data.view.confirmationInServiceView.meeting.meetingResult !==
                null ||
            data.view.confirmationInServiceView.meeting.meetingRemark !== null
        ) {
            isReadOnlyConfirmationInServiceMeetingResult.set(true);

            data.view.confirmationInServiceView.meeting.meetingResult
                ? confirmationMeetingResultIsApproved.set(true)
                : confirmationMeetingResultIsApproved.set(false);
        } else {
            isReadOnlyConfirmationInServiceMeetingResult.set(false);
        }

        if ($isTypeConfirmationExceedsThreeYears === true) {
            if ($confirmationProbationContinuedIsDraft === true) {
                isExceedsThreeYearsAndIsDraft = true;
            }
        } else {
            isExceedsThreeYearsAndIsDraft = false;
        }
    }

    // Superforms
    const { form } = superForm(data.forms.personalInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: serviceDetailForm } = superForm(data.forms.serviceInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: examsDetaiForm } = superForm(data.forms.examsInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const { form: checklistForm, enhance: checklistEnhance } = superForm(
        data.forms.checklistForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            taintedMessage: false,
            resetForm: false,
            id: 'checklistForm',
            validators: false,
        },
    );
    if ($checklistForm.checker !== undefined) {
        submitChecklist = true;
    }

    const { form: diciplinaryDetailForm } = superForm(
        data.forms.diciplinaryInfoForm,
        {
            SPA: true,
            dataType: 'json',
            validators: false,
        },
    );

    const {
        form: employmentSecretaryDetailForm,
        errors: employmentSecretaryDetailFormErrors,
        enhance: employmentSecretaryDetailFormEnhance,
    } = superForm(data.forms.employmentSecretaryInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationApprovalSchema),
        taintedMessage: false,
        onSubmit() {
            _addConfirmationEmploymentSecretary(
                Number(data.params.applicationId),
                $employmentSecretaryDetailForm,
            );
        },
    });

    const {
        form: secretarySetApproverForm,
        errors: secretarySetApproverErrors,
        enhance: secretarySetApproverEnhance,
    } = superForm(data.forms.secretarySetApproverForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        validators: zod(_setApproversSchema),
        onSubmit() {
            _addSecretarySetApproverForm(
                Number(data.params.applicationId),
                $secretarySetApproverForm,
            );
        },
    });

    const {
        form: divisionDirectorDetaiForm,
        errors: divisionDirectorDetaiFormErrors,
        enhance: divisionDirectorDetaiFormEnhance,
    } = superForm(data.forms.divisionDirectorInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationApprovalSchema),
        taintedMessage: false,
        onSubmit() {
            _addConfirmationStateDirector(
                Number(data.params.applicationId),
                $divisionDirectorDetaiForm,
            );
        },
    });

    const {
        form: integrityDirectorDetailForm,
        errors: integrityDirectorDetailFormErrors,
        enhance: integrityDirectorDetailFormEnhance,
    } = superForm(data.forms.integrityDirectorApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationApprovalSchema),
        taintedMessage: false,
        onSubmit() {
            _addConfirmationIntegrityDirector(
                Number(data.params.applicationId),
                $integrityDirectorDetailForm,
            );
        },
    });

    const {
        form: auditDirectorDetailForm,
        errors: auditDirectorDetailFormErrors,
        enhance: auditDirectorDetailFormEnhance,
    } = superForm(data.forms.auditDirectorInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationApprovalSchema),
        taintedMessage: false,
        onSubmit() {
            _addConfirmationAuditDirector(
                Number(data.params.applicationId),
                $auditDirectorDetailForm,
            );
        },
    });

    const {
        form: confirmationMeetingDetailForm,
        errors: confirmationMeetingDetailFormErrors,
        enhance: confirmationMeetingDetailFormEnhance,
    } = superForm(data.forms.confirmationMeetingForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationMeetingResultSchema),
        taintedMessage: false,
        onSubmit() {
            _addConfirmationMeetingResult(
                Number(data.params.applicationId),
                $confirmationMeetingDetailForm,
            );
        },
    });

    let diciplinaryListTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: $diciplinaryDetailForm.diciplinaries ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [],
        url: '',
        id: 'diciplinaryListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<ContentHeader
    title="Maklumat Pengesahan dalam Perkhidmatan {$isTypeConfirmationExceedsThreeYears
        ? 'Melebihi Tempoh 3 Tahun'
        : 'Rasionalisasi'}"
>
    <StatusPill status={data.params.status} slot="status" />

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../confirmation');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
            <div class="flex w-full flex-col gap-2">
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.identityDocumentNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.birthDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="birthStateId"
                    label="Tempat Lahir"
                    placeholder="-"
                    options={data.lookups.stateLookup}
                    bind:val={$form.birthStateId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="birthCountryId"
                    label="Negara Dilahir"
                    placeholder="-"
                    options={data.lookups.countryLookup}
                    bind:val={$form.birthCountryId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="nationalityId"
                    label="Warganegara"
                    placeholder="-"
                    options={data.lookups.countryLookup}
                    bind:val={$form.nationalityId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="raceId"
                    label="Bangsa"
                    placeholder="-"
                    options={data.lookups.raceLookup}
                    bind:val={$form.raceId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="ethnicId"
                    label="Etnik"
                    placeholder="-"
                    options={data.lookups.ethnicityLookup}
                    bind:val={$form.ethnicId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="religionId"
                    label="Agama"
                    placeholder="-"
                    options={data.lookups.religionLookup}
                    bind:val={$form.religionId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="genderId"
                    label="Jantina"
                    options={data.lookups.genderLookup}
                    placeholder="-"
                    bind:val={$form.genderId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="maritalId"
                    label="Status Perkahwinan"
                    placeholder="-"
                    options={data.lookups.maritalLookup}
                    bind:val={$form.maritalId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$form.isExPoliceOrSoldier}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isInternalRelationship"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    placeholder="-"
                    bind:val={$form.isInternalRelationship}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                {#if $form.isInternalRelationship}
                    <CustomTextField
                        disabled
                        isRequired={false}
                        id="employeeNumber"
                        label="No. Pekerja LKIM"
                        bind:val={$form.employeeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        isRequired={false}
                        id="name"
                        label={'Nama Kakitangan LKIM'}
                        bind:val={$form.employeeName}
                    ></CustomTextField>

                    <CustomTextField
                        disabled
                        isRequired={false}
                        id="relationDetailPosition"
                        label="Jawatan Kakitangan LKIM"
                        bind:val={$form.employeePosition}
                    ></CustomTextField>

                    <CustomSelectField
                        disabled
                        isRequired={false}
                        id="relationDetailRelationship"
                        label="Hubungan"
                        options={data.lookups.relationshipLookup}
                        bind:val={$form.relationshipId}
                    ></CustomSelectField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan" />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="gradeId"
                    label="Gred Semasa"
                    placeholder="-"
                    options={data.lookups.gradeLookup}
                    bind:val={$serviceDetailForm.gradeId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="positionId"
                    label="Jawatan Semasa"
                    placeholder="-"
                    options={data.lookups.positionLookup}
                    bind:val={$serviceDetailForm.positionId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="placementId"
                    label="Penempatan"
                    placeholder="-"
                    options={data.lookups.placementLookup}
                    bind:val={$serviceDetailForm.placementId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="serviceTypeId"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    options={data.lookups.serviceTypeLookup}
                    bind:val={$serviceDetailForm.serviceTypeId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="unitId"
                    label="Bahagian"
                    placeholder="-"
                    options={data.lookups.unitLookup}
                    bind:val={$serviceDetailForm.unitId}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="newRecruitEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Baru'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.newRecruitEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="serviceDate"
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.serviceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstServiceDate}
                ></CustomTextField>

                <!-- <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="confirmDate"
                    label={'Mula Disahkan Perkhidmatan Semasa'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.confirmDate}
                ></CustomTextField> -->

                <!-- <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstConfirmServiceDate"
                    label={'Mula Disahkan Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstConfirmServiceDate}
                ></CustomTextField> -->

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.retirementDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="maximumSalary"
                    type="number"
                    label={'Tangga Gaji'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.maximumSalary}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="bankName"
                    type="text"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="bankAccount"
                    type="number"
                    label={'Akaun Bank'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.bankAccount}
                ></CustomTextField>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Semakan Peperiksaan Perkhidmatan / Kursus Induksi Yang Diduduki"
        />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <form
                    class="flex w-full flex-col items-start justify-start gap-4 p-3 pb-10"
                    method="POST"
                    use:checklistEnhance
                    id="checklistForm"
                >
                    <table
                        class="table max-h-full w-full table-auto border-collapse"
                    >
                        <thead class="sticky top-0 z-[1]">
                            <tr
                                class="h-7 min-h-7 border bg-ios-systemColors-quaternarySystemFill-light"
                            >
                                {#each data.lookups.examTableColumn as col, i}
                                    <th
                                        class="h-full {i == 0
                                            ? 'w-[70%]'
                                            : 'w-[15%]'} border px-2.5"
                                    >
                                        <div
                                            class="flex h-full flex-row items-center justify-center"
                                        >
                                            <span
                                                class="select-none text-center align-middle text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                                            >
                                                {col.name}
                                            </span>
                                        </div>
                                    </th>
                                {/each}
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="p-none gap-none h-10 border">
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center bg-ios-backgroundColors-systemBackground-light px-2 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span>Program Transformasi Minda</span>
                                    </div>
                                </td>
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <Checkbox
                                            class="text-ios-labelColors-secondaryLabel-light"
                                            disabled={true}
                                            bind:checked={$checklistForm.confirmationExamOneStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr class="p-none gap-none h-10 border">
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span>Peperiksaan JPA</span>
                                        <span class="text-[10px] italic"
                                            >Bahagian A / B</span
                                        >
                                    </div>
                                </td>
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <Checkbox
                                            class="text-ios-labelColors-secondaryLabel-light"
                                            disabled={true}
                                            bind:checked={$checklistForm.confirmationExamTwoStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr class="p-none gap-none h-10 border">
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 flex-col items-start bg-ios-backgroundColors-systemBackground-light px-2 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span>Peperiksaan Jabatan</span>
                                        <span class="text-[10px] italic"
                                            >Bahagian II/III/IV</span
                                        >
                                    </div>
                                </td>
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <Checkbox
                                            class="text-ios-labelColors-secondaryLabel-light"
                                            disabled={true}
                                            bind:checked={$checklistForm.confirmationExamThreeStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr class="p-none gap-none h-10 border">
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center bg-ios-backgroundColors-systemBackground-light px-2 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span>ISAC</span>
                                    </div>
                                </td>
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <Checkbox
                                            class="text-ios-labelColors-secondaryLabel-light"
                                            disabled={true}
                                            bind:checked={$checklistForm.confirmationExamFourStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr class="p-none gap-none h-10 border">
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center bg-ios-backgroundColors-systemBackground-light px-2 text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <span>ISAC (PTSU)</span>
                                    </div>
                                </td>
                                <td
                                    class="h-fit w-fit border border-ios-labelColors-separator-light"
                                >
                                    <div
                                        class="flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                    >
                                        <Checkbox
                                            class="text-ios-labelColors-secondaryLabel-light"
                                            disabled={true}
                                            bind:checked={$checklistForm.confirmationExamFiveStatus}
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <!-- <DataTable
                    title="Sejarah Peperiksaan(Perkhidmatan/Kursus Induksi) Yang Pernah Diduduki"
                    bind:tableData={examsListTable}
                /> -->
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Tapisan Tatatertib" />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <DataTable
                    title="Sejarah Tindakan Tatatertib yang Dikenakan"
                    bind:tableData={diciplinaryListTable}
                />
            </div>
        </StepperContentBody>
    </StepperContent>
    {#if !$isTypeConfirmationExceedsThreeYears || isExceedsThreeYearsAndIsDraft}
        <StepperContent>
            <StepperContentHeader
                title="Tetapan Pengarah Bahagian/Negeri Untuk Perakuan"
            >
                {#if (!data.view.confirmationInServiceView.approver.isReadonly || $confirmationSetApproverIsDraft) && data.roles.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="confirmationAssignApproverForm"
                        onClick={() => {
                            $secretarySetApproverForm.isDraft = true;
                        }}
                    />
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="confirmationAssignApproverForm"
                        onClick={() => {
                            $secretarySetApproverForm.isDraft = false;
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if (!data.view.confirmationInServiceView.approver.isReadonly || $confirmationSetApproverIsDraft) && !data.roles.isEmploymentSecretaryRole}
                    <StepperOtherRolesResult />
                {:else}
                    <form
                        id="confirmationAssignApproverForm"
                        method="POST"
                        use:secretarySetApproverEnhance
                        class="flex w-full flex-col gap-2"
                    >
                        <CustomSelectField
                            disabled={data.view.confirmationInServiceView
                                .approver.isReadonly &&
                                !$confirmationSetApproverIsDraft}
                            errors={$secretarySetApproverErrors.supporterId}
                            id="supporterId"
                            label="Nama Pengarah Bahagian/Negeri"
                            options={data.lookups.employeeLookup}
                            bind:val={$secretarySetApproverForm.supporterId}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Pengesahan Dalam Perhidmatan Daripada Peranan - Peranan Bertanggungjawab"
            >
                {#if (!data.view.confirmationInServiceView.secretary.isReadonly || $employmentSecretaryDetailIsDraft) && data.roles.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="employmentSecretaryDetailForm"
                        onClick={() => {
                            $employmentSecretaryDetailForm.isDraft = true;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="employmentSecretaryDetailForm"
                        onClick={() => {
                            $employmentSecretaryDetailForm.isDraft = false;
                        }}
                    ></TextIconButton>
                {:else if (!data.view.confirmationInServiceView.division.isReadonly || $divisionDirectorDetailIsDraft) && (data.roles.isStateDirectorRole || data.roles.isUnitDirectorRole) && !$isTypeConfirmationExceedsThreeYears}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="divisionDirectorDetaiForm"
                        onClick={() => {
                            $divisionDirectorDetaiForm.isDraft = true;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="divisionDirectorDetaiForm"
                        onClick={() => {
                            $divisionDirectorDetaiForm.isDraft = false;
                        }}
                    ></TextIconButton>
                {:else if (!data.view.confirmationInServiceView.integrity.isReadonly || $integrityDirectorDetailIsDraft) && data.roles.isIntegrityDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="integrityDirectorDetailForm"
                        onClick={() => {
                            $integrityDirectorDetailForm.isDraft = true;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="integrityDirectorDetailForm"
                        onClick={() => {
                            $integrityDirectorDetailForm.isDraft = false;
                        }}
                    ></TextIconButton>
                {:else if (!data.view.confirmationInServiceView.audit.isReadonly || $auditDirectorDetailIsDraft) && data.roles.isAuditDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="auditDirectorDetailForm"
                        onClick={() => {
                            $auditDirectorDetailForm.isDraft = true;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="auditDirectorDetailForm"
                        onClick={() => {
                            $auditDirectorDetailForm.isDraft = false;
                        }}
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    {#if (!data.view.confirmationInServiceView.secretary.isReadonly || $employmentSecretaryDetailIsDraft) && data.roles.isEmploymentSecretaryRole}
                        <form
                            id="employmentSecretaryDetailForm"
                            method="POST"
                            use:employmentSecretaryDetailFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Urus Setia Perjawatan</b
                                >
                            </div>
                            <CustomTextField
                                disabled={data.view.confirmationInServiceView
                                    .secretary.isReadonly &&
                                    !$employmentSecretaryDetailIsDraft}
                                errors={$employmentSecretaryDetailFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$employmentSecretaryDetailForm.remark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={data.view.confirmationInServiceView
                                    .secretary.isReadonly &&
                                    !$employmentSecretaryDetailIsDraft}
                                errors={$employmentSecretaryDetailFormErrors.status}
                                id="approverIsApproved"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$employmentSecretaryDetailForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {:else if (!data.view.confirmationInServiceView.division.isReadonly || $divisionDirectorDetailIsDraft) && (data.roles.isStateDirectorRole || data.roles.isUnitDirectorRole) && !$isTypeConfirmationExceedsThreeYears}
                        <form
                            id="divisionDirectorDetaiForm"
                            method="POST"
                            use:divisionDirectorDetaiFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Bahagian/Negeri</b
                                >
                            </div>
                            <CustomTextField
                                disabled={data.view.confirmationInServiceView
                                    .division.isReadonly &&
                                    !$divisionDirectorDetailIsDraft}
                                errors={$divisionDirectorDetaiFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$divisionDirectorDetaiForm.remark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={data.view.confirmationInServiceView
                                    .division.isReadonly &&
                                    !$divisionDirectorDetailIsDraft}
                                errors={$divisionDirectorDetaiFormErrors.status}
                                id="approverIsApproved"
                                options={confirmOptions}
                                label={'Keputusan'}
                                bind:val={$divisionDirectorDetaiForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {:else if (!data.view.confirmationInServiceView.integrity.isReadonly || $integrityDirectorDetailIsDraft) && data.roles.isIntegrityDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                        <form
                            id="integrityDirectorDetailForm"
                            method="POST"
                            use:integrityDirectorDetailFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            <CustomTextField
                                disabled={data.view.confirmationInServiceView
                                    .integrity.isReadonly &&
                                    !$integrityDirectorDetailIsDraft}
                                errors={$integrityDirectorDetailFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$integrityDirectorDetailForm.remark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={data.view.confirmationInServiceView
                                    .integrity.isReadonly &&
                                    !$integrityDirectorDetailIsDraft}
                                errors={$integrityDirectorDetailFormErrors.status}
                                id="approverIsApproved"
                                options={confirmOptions}
                                label={'Keputusan'}
                                bind:val={$integrityDirectorDetailForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {:else if (!data.view.confirmationInServiceView.audit.isReadonly || $auditDirectorDetailIsDraft) && data.roles.isAuditDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                        <form
                            id="auditDirectorDetailForm"
                            method="POST"
                            use:auditDirectorDetailFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Audit</b
                                >
                            </div>
                            <CustomTextField
                                disabled={data.view.confirmationInServiceView
                                    .audit.isReadonly &&
                                    !$auditDirectorDetailIsDraft}
                                errors={$auditDirectorDetailFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$auditDirectorDetailForm.remark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={data.view.confirmationInServiceView
                                    .audit.isReadonly &&
                                    !$auditDirectorDetailIsDraft}
                                errors={$auditDirectorDetailFormErrors.status}
                                id="approverIsApproved"
                                options={confirmOptions}
                                label={'Keputusan'}
                                bind:val={$auditDirectorDetailForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {/if}

                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-black"
                                >Rekod Keputusan peranan (-peranan) berkaitan</b
                            >
                        </div>
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >1. Urus Setia Perjawatan</b
                            >
                        </div>
                        {#if $isReadOnlyEmploymentSecretaryConfirmationInServiceApproval}
                            <CustomTextField
                                disabled
                                id="integrityDirectorRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$employmentSecretaryDetailForm.remark}
                            ></CustomTextField>
                            <CustomSelectField
                                disabled
                                id="integrityDirectorStatus"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$employmentSecretaryDetailForm.status}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="approvalDate"
                                label="Tarikh Kelulusan"
                                type="date"
                                placeholder="-"
                                bind:val={$employmentSecretaryDetailForm.approvalDate}
                            ></CustomTextField>
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                        {#if !$isTypeConfirmationExceedsThreeYears}
                            <hr />
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >2. Pengarah Bahagian/Negeri</b
                                >
                            </div>
                            {#if $isReadOnlyDivisionDirectorConfirmationInServiceApproval}
                                <CustomTextField
                                    disabled
                                    id="integrityDirectorRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$divisionDirectorDetaiForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="integrityDirectorStatus"
                                    options={confirmOptions}
                                    label={'Keputusan'}
                                    bind:val={$divisionDirectorDetaiForm.status}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    isRequired={false}
                                    id="approvalDate"
                                    label="Tarikh Kelulusan"
                                    type="date"
                                    placeholder="-"
                                    bind:val={$divisionDirectorDetaiForm.approvalDate}
                                ></CustomTextField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                            <hr />
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >3. Pengarah Integriti & Pengarah Audit</b
                                >
                            </div>
                            <div class="mb-5">
                                <b
                                    class="text-sm font-medium italic text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            {#if $isReadOnlyIntegrityDirectorConfirmationInServiceApproval}
                                <CustomTextField
                                    disabled
                                    id="integrityDirectorRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$integrityDirectorDetailForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="integrityDirectorStatus"
                                    options={confirmOptions}
                                    label={'Keputusan'}
                                    bind:val={$integrityDirectorDetailForm.status}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    isRequired={false}
                                    id="approvalDate"
                                    label="Tarikh Kelulusan"
                                    type="date"
                                    placeholder="-"
                                    bind:val={$integrityDirectorDetailForm.approvalDate}
                                ></CustomTextField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                            <div class="mb-5">
                                <b
                                    class="text-sm font-medium italic text-system-primary"
                                    >Pengarah Audit</b
                                >
                            </div>
                            {#if $isReadOnlyAuditDirectorConfirmationInServiceApproval}
                                <CustomTextField
                                    disabled
                                    id="integrityDirectorRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$auditDirectorDetailForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="integrityDirectorStatus"
                                    options={confirmOptions}
                                    label={'Keputusan'}
                                    bind:val={$auditDirectorDetailForm.status}
                                ></CustomSelectField>
                                <CustomTextField
                                    disabled
                                    isRequired={false}
                                    id="approvalDate"
                                    label="Tarikh Kelulusan"
                                    type="date"
                                    placeholder="-"
                                    bind:val={$auditDirectorDetailForm.approvalDate}
                                ></CustomTextField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if ($auditDirectorDetailIsDraft && $integrityDirectorDetailIsDraft) || ($isReadOnlyAuditDirectorConfirmationInServiceApproval && $confirmationAuditDirectorIsApproved) || ($isTypeConfirmationExceedsThreeYears && $confirmationEmploymentSecretaryIsApproved)}
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    {#if (!data.view.confirmationInServiceView.meeting.isReadonly || $confirmationMeetingDetailIsDraft) && data.roles.isEmploymentSecretaryRole}
                        <TextIconButton
                            type="neutral"
                            label="Simpan"
                            form="confirmationMeetingDetailForm"
                            onClick={() => {
                                $confirmationMeetingDetailForm.isDraft = false;
                            }}
                        ></TextIconButton>
                        <TextIconButton
                            type="primary"
                            label="Hantar"
                            form="confirmationMeetingDetailForm"
                            onClick={() => {
                                $confirmationMeetingDetailForm.isDraft = false;
                            }}
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if (!$isReadOnlyConfirmationInServiceMeetingResult || $confirmationMeetingDetailIsDraft) && !data.roles.isEmploymentSecretaryRole}
                        <StepperOtherRolesResult />
                    {:else}
                        <form
                            id="confirmationMeetingDetailForm"
                            method="POST"
                            use:confirmationMeetingDetailFormEnhance
                            class="flex w-full flex-col items-center gap-2"
                        >
                            <CustomTextField
                                disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                    !$confirmationMeetingDetailIsDraft}
                                errors={$confirmationMeetingDetailFormErrors.meetingName}
                                id="meetingName"
                                label="Nama Mesyuarat"
                                placeholder="-"
                                bind:val={$confirmationMeetingDetailForm.meetingName}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                    !$confirmationMeetingDetailIsDraft}
                                errors={$confirmationMeetingDetailFormErrors.meetingDate}
                                id="meetingDate"
                                label="Tarikh Mesyuarat"
                                type="date"
                                placeholder="-"
                                bind:val={$confirmationMeetingDetailForm.meetingDate}
                            ></CustomTextField>
                            <CustomTextField
                                disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                    !$confirmationMeetingDetailIsDraft}
                                errors={$confirmationMeetingDetailFormErrors.meetingRemark}
                                id="meetingRemark"
                                label="Catatan Mesyuarat"
                                placeholder="-"
                                type="text"
                                bind:val={$confirmationMeetingDetailForm.meetingRemark}
                            ></CustomTextField>
                            <CustomRadioBoolean
                                disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                    !$confirmationMeetingDetailIsDraft}
                                errors={$confirmationMeetingDetailFormErrors.meetingResult}
                                id="meetingResult"
                                label="Keputusan Mesyuarat"
                                options={approveOptions}
                                bind:val={$confirmationMeetingDetailForm.meetingResult}
                            ></CustomRadioBoolean>
                            {#if $isReadOnlyConfirmationInServiceMeetingResult && !$confirmationMeetingDetailIsDraft}
                                <CustomTextField
                                    disabled={true}
                                    errors={$confirmationMeetingDetailFormErrors.confirmedPositionDate}
                                    id="confirmedPositionDate"
                                    label="Tarikh Pengesahan"
                                    placeholder="-"
                                    type="date"
                                    bind:val={$confirmationMeetingDetailForm.confirmedPositionDate}
                                ></CustomTextField>
                            {/if}
                            {#if $isTypeConfirmationExceedsThreeYears}
                                {#if !$confirmationMeetingDetailForm.meetingResult}
                                    <CustomSelectField
                                        disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                            !$confirmationMeetingDetailIsDraft}
                                        isRequired={false}
                                        id="gradeId"
                                        label="Keputusan"
                                        placeholder="-"
                                        options={commonOptions}
                                        bind:val={$confirmationMeetingDetailForm.isContractContinued}
                                    ></CustomSelectField>

                                    {#if $confirmationMeetingDetailForm.isContractContinued}
                                        <CustomTextField
                                            type="date"
                                            errors={$confirmationMeetingDetailFormErrors.effectiveDate}
                                            disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                                !$confirmationMeetingDetailIsDraft}
                                            id="effectiveDate"
                                            label={'Tarikh Mula Lanjutan'}
                                            placeholder="-"
                                            bind:val={$confirmationMeetingDetailForm.effectiveDate}
                                        ></CustomTextField>
                                        <CustomTextField
                                            type="number"
                                            errors={$confirmationMeetingDetailFormErrors.contractMonths}
                                            disabled={$isReadOnlyConfirmationInServiceMeetingResult &&
                                                !$confirmationMeetingDetailIsDraft}
                                            id="effectiveDate"
                                            label={'Tempoh Lanjutan (Bulan)'}
                                            placeholder="-"
                                            bind:val={$confirmationMeetingDetailForm.contractMonths}
                                        ></CustomTextField>
                                    {/if}
                                {/if}
                            {/if}
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>
            {#if data.view.confirmationInServiceView.meeting.isReadonly && !$confirmationMeetingDetailIsDraft}
                <StepperContent>
                    <StepperContentHeader title="Surat Pengesahan" />
                    <StepperContentBody>
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p class="text-sm">
                                Sila muat turun surat pengesahan di bawah ini.
                            </p>
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <a
                                    href={data.view.confirmationInServiceView
                                        .document.attachment}
                                    download="Surat Pengesahan Dalam Perkhidmatan {$form.name.toUpperCase()} ({$form.identityDocumentNumber})"
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >Surat Pengesahan Dalam Perkhidmatan {$form.name.toUpperCase()}
                                    ({data.view.confirmationInServiceView
                                        .document.attachmentName})
                                    <SvgArrowDownTray />
                                </a>
                            </div>
                        </div>
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    {/if}
</Stepper>

<Toaster />
