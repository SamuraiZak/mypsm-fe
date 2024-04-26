<script lang="ts">
    import DataTable from '$lib/components/table/DataTable.svelte';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Badge } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
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
        confirmOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _confirmationApprovalSchema,
        _confirmationMeetingResultSchema,
    } from '$lib/schemas/mypsm/employment/confirmation-in-service/schema';
    import {
        _addConfirmationAuditDirector,
        _addConfirmationEmploymentSecretary,
        _addConfirmationIntegrityDirector,
        _addConfirmationMeetingResult,
        _addConfirmationStateDirector,
    } from './+page';
    export let data: PageData;

    let confirmationEmploymentSecretaryIsApproved = writable<boolean>(false);
    let confirmationDivisionDirectorIsApproved = writable<boolean>(false);
    let confirmationIntegrityDirectorIsApproved = writable<boolean>(false);
    let confirmationAuditDirectorIsApproved = writable<boolean>(false);
    let confirmationMeetingResultIsApproved = writable<boolean>(false);

    let isTypeConfirmationExceedsThreeYears = writable<boolean>(false);
    let isReadOnlyEmploymentSecretaryConfirmationInServiceApproval =
        writable<boolean>(false);
    let isReadOnlyDivisionDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let isReadOnlyIntegrityDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let isReadOnlyAuditDirectorConfirmationInServiceApproval =
        writable<boolean>(false);
    let isReadOnlyConfirmationInServiceMeetingResult = writable<boolean>(false);

    $: {
        if (data.view.confirmationInServiceView.dataType === 'Lebih 3 tahun') {
            isTypeConfirmationExceedsThreeYears.set(true);
        } else {
            isTypeConfirmationExceedsThreeYears.set(false);
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
                Number(data.params.id),
                $employmentSecretaryDetailForm,
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
                Number(data.params.id),
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
                Number(data.params.id),
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
                Number(data.params.id),
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
                Number(data.params.id),
                $confirmationMeetingDetailForm,
            );
        },
    });

    // Table list
    let examsListTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: $examsDetaiForm.examinations ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [],
        url: '',
        id: 'examsListTable',
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
        ? 'Melebihi 3 Tahun'
        : 'Rasionalisasi'}"
>
    {#if $isReadOnlyConfirmationInServiceMeetingResult && $confirmationMeetingResultIsApproved}
        <Badge color="dark">Proses Pengesahan dalam Perkhidmatan Tamat</Badge>
    {/if}
    {#if ($isReadOnlyEmploymentSecretaryConfirmationInServiceApproval && !$confirmationEmploymentSecretaryIsApproved) || ($isReadOnlyDivisionDirectorConfirmationInServiceApproval && !confirmationDivisionDirectorIsApproved) || ($isReadOnlyIntegrityDirectorConfirmationInServiceApproval && !confirmationIntegrityDirectorIsApproved) || ($isReadOnlyAuditDirectorConfirmationInServiceApproval && !confirmationAuditDirectorIsApproved) || ($isReadOnlyConfirmationInServiceMeetingResult && !$confirmationMeetingResultIsApproved)}
        <Badge color="red">Proses Pengesahan dalam Perkhidmatan Tidak Sah</Badge
        >
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../pengesahan-dalam-perkhidmatan');
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
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.identityDocumentNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.birthDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    id="birthStateId"
                    label="Tempat Lahir"
                    placeholder="-"
                    options={data.lookups.stateLookup}
                    bind:val={$form.birthStateId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="birthCountryId"
                    label="Negara Dilahir"
                    placeholder="-"
                    options={data.lookups.countryLookup}
                    bind:val={$form.birthCountryId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="nationalityId"
                    label="Warganegara"
                    placeholder="-"
                    options={data.lookups.countryLookup}
                    bind:val={$form.nationalityId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="raceId"
                    label="Bangsa"
                    placeholder="-"
                    options={data.lookups.raceLookup}
                    bind:val={$form.raceId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="ethnicId"
                    label="Etnik"
                    placeholder="-"
                    options={data.lookups.ethnicityLookup}
                    bind:val={$form.ethnicId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="religionId"
                    label="Agama"
                    placeholder="-"
                    options={data.lookups.religionLookup}
                    bind:val={$form.religionId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="genderId"
                    label="Jantina"
                    options={data.lookups.genderLookup}
                    placeholder="-"
                    bind:val={$form.genderId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="maritalId"
                    label="Status Perkahwinan"
                    placeholder="-"
                    options={data.lookups.maritalLookup}
                    bind:val={$form.maritalId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$form.isExPoliceOrSoldier}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="isInternalRelationship"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    placeholder="-"
                    bind:val={$form.isInternalRelationship}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                {#if $form.isInternalRelationship}
                    <CustomTextField
                        id="employeeNumber"
                        label="No. Pekerja LKIM"
                        bind:val={$form.employeeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        id="name"
                        label={'Nama Kakitangan LKIM'}
                        bind:val={$form.employeeName}
                    ></CustomTextField>

                    <CustomTextField
                        id="relationDetailPosition"
                        label="Jawatan Kakitangan LKIM"
                        bind:val={$form.employeePosition}
                    ></CustomTextField>

                    <CustomSelectField
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
                    id="gradeId"
                    label="Gred Semasa"
                    placeholder="-"
                    options={data.lookups.gradeLookup}
                    bind:val={$serviceDetailForm.gradeId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="positionId"
                    label="Jawatan Semasa"
                    placeholder="-"
                    options={data.lookups.positionLookup}
                    bind:val={$serviceDetailForm.positionId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="placementId"
                    label="Penempatan"
                    placeholder="-"
                    options={data.lookups.placementLookup}
                    bind:val={$serviceDetailForm.placementId}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="serviceTypeId"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    options={data.lookups.serviceTypeLookup}
                    bind:val={$serviceDetailForm.serviceTypeId}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="unitId"
                    label="Bahagian"
                    placeholder="-"
                    options={data.lookups.unitLookup}
                    bind:val={$serviceDetailForm.unitId}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="newRecruitEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Baru'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.newRecruitEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="serviceDate"
                    label={'Mula Dilantik Perkhidmatan LKIM'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.serviceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstServiceDate"
                    label={'Mula Dilantik Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="confirmDate"
                    label={'Mula Disahkan Perkhidmatan Semasa'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.confirmDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstConfirmServiceDate"
                    label={'Mula Disahkan Perkhidmatan Pertama'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.firstConfirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.retirementDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="maximumSalary"
                    type="number"
                    label={'Tangga Gaji'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.maximumSalary}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="bankName"
                    type="text"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceDetailForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
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
            title="Senarai Peperiksaan Perkhidmatan / Kursus Induksi"
        />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <DataTable
                    title="Sejarah Peperiksaan(Perkhidmatan/Kursus Induksi) Yang Pernah Diduduki"
                    bind:tableData={examsListTable}
                />
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
    <StepperContent>
        <StepperContentHeader
            title="Keputusan Pengesahan Dalam Perhidmatan Daripada Peranan - Peranan Bertanggungjawab"
        >
            {#if !data.view.confirmationInServiceView.secretary.isReadonly && data.roles.isEmploymentSecretaryRole}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="employmentSecretaryDetailForm"
                ></TextIconButton>
            {:else if !data.view.confirmationInServiceView.division.isReadonly && data.roles.isStateDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="divisionDirectorDetaiForm"
                ></TextIconButton>
            {:else if !data.view.confirmationInServiceView.integrity.isReadonly && data.roles.isIntegrityDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="integrityDirectorDetailForm"
                ></TextIconButton>
            {:else if !data.view.confirmationInServiceView.audit.isReadonly && data.roles.isAuditDirectorRole && !$isTypeConfirmationExceedsThreeYears}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="auditDirectorDetailForm"
                ></TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                {#if !data.view.confirmationInServiceView.secretary.isReadonly && data.roles.isEmploymentSecretaryRole}
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
                                .secretary.isReadonly}
                            errors={$employmentSecretaryDetailFormErrors.remark}
                            id="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:val={$employmentSecretaryDetailForm.remark}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={data.view.confirmationInServiceView
                                .secretary.isReadonly}
                            errors={$employmentSecretaryDetailFormErrors.status}
                            id="approverIsApproved"
                            options={certifyOptions}
                            label={'Keputusan'}
                            bind:val={$employmentSecretaryDetailForm.status}
                        ></CustomRadioBoolean>
                    </form>
                {:else if !data.view.confirmationInServiceView.division.isReadonly && data.roles.isStateDirectorRole && !$isTypeConfirmationExceedsThreeYears}
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
                                .division.isReadonly}
                            errors={$divisionDirectorDetaiFormErrors.remark}
                            id="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:val={$divisionDirectorDetaiForm.remark}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={data.view.confirmationInServiceView
                                .division.isReadonly}
                            errors={$divisionDirectorDetaiFormErrors.status}
                            id="approverIsApproved"
                            options={confirmOptions}
                            label={'Keputusan'}
                            bind:val={$divisionDirectorDetaiForm.status}
                        ></CustomRadioBoolean>
                    </form>
                {:else if !data.view.confirmationInServiceView.integrity.isReadonly && data.roles.isIntegrityDirectorRole && !$isTypeConfirmationExceedsThreeYears}
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
                                .integrity.isReadonly}
                            errors={$integrityDirectorDetailFormErrors.remark}
                            id="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:val={$integrityDirectorDetailForm.remark}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={data.view.confirmationInServiceView
                                .integrity.isReadonly}
                            errors={$integrityDirectorDetailFormErrors.status}
                            id="approverIsApproved"
                            options={confirmOptions}
                            label={'Keputusan'}
                            bind:val={$integrityDirectorDetailForm.status}
                        ></CustomRadioBoolean>
                    </form>
                {:else if !data.view.confirmationInServiceView.audit.isReadonly && data.roles.isAuditDirectorRole && !$isTypeConfirmationExceedsThreeYears}
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
                            disabled={data.view.confirmationInServiceView.audit
                                .isReadonly}
                            errors={$auditDirectorDetailFormErrors.remark}
                            id="approverRemark"
                            label="Tindakan/Ulasan"
                            bind:val={$auditDirectorDetailForm.remark}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={data.view.confirmationInServiceView.audit
                                .isReadonly}
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
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                        <hr />
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >3. Pengarah Integriti</b
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
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                        <hr />
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >4. Pengarah Audit</b
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
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    {/if}
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    {#if ($isReadOnlyAuditDirectorConfirmationInServiceApproval && $confirmationAuditDirectorIsApproved) || ($isTypeConfirmationExceedsThreeYears && $confirmationEmploymentSecretaryIsApproved)}
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                {#if !data.view.confirmationInServiceView.meeting.isReadonly && data.roles.isEmploymentSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="confirmationMeetingDetailForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if !$isReadOnlyConfirmationInServiceMeetingResult && !data.roles.isEmploymentSecretaryRole}
                    <StepperOtherRolesResult />
                {:else}
                    <form
                        id="confirmationMeetingDetailForm"
                        method="POST"
                        use:confirmationMeetingDetailFormEnhance
                        class="flex w-full flex-col items-center gap-2"
                    >
                        <CustomTextField
                            disabled={$isReadOnlyConfirmationInServiceMeetingResult}
                            errors={$confirmationMeetingDetailFormErrors.meetingName}
                            id="meetingName"
                            label="Nama Mesyuarat"
                            placeholder="-"
                            bind:val={$confirmationMeetingDetailForm.meetingName}
                        ></CustomTextField>
                        <CustomTextField
                            disabled={$isReadOnlyConfirmationInServiceMeetingResult}
                            errors={$confirmationMeetingDetailFormErrors.meetingDate}
                            id="meetingDate"
                            label="Tarikh Mesyuarat"
                            type="date"
                            placeholder="-"
                            bind:val={$confirmationMeetingDetailForm.meetingDate}
                        ></CustomTextField>
                        <CustomTextField
                            disabled={$isReadOnlyConfirmationInServiceMeetingResult}
                            errors={$confirmationMeetingDetailFormErrors.meetingRemark}
                            id="meetingRemark"
                            label="Catatan Mesyuarat"
                            placeholder="-"
                            type="text"
                            bind:val={$confirmationMeetingDetailForm.meetingRemark}
                        ></CustomTextField>
                        <CustomRadioBoolean
                            disabled={$isReadOnlyConfirmationInServiceMeetingResult}
                            errors={$confirmationMeetingDetailFormErrors.meetingResult}
                            id="meetingResult"
                            label="Keputusan Mesyuarat"
                            options={approveOptions}
                            bind:val={$confirmationMeetingDetailForm.meetingResult}
                        ></CustomRadioBoolean>
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
