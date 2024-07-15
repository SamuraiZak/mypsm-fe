<script lang="ts">
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import type { CourseExamApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto';
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import { writable } from 'svelte/store';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import {
        _examApplicationApprovalSchema,
        _examApplicationResultResponseSchema,
    } from '$lib/schemas/mypsm/course/exam-schema';
    import { _coursePersonalInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import {
        _addExamApplicationForm,
        _addSecretaryApprovalForm,
        _submitExamResult,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import { Badge } from 'flowbite-svelte';
    export let data: PageData;

    let isReadonlySecretaryApprovalResult = writable<boolean>(false);
    let isReadonlyExamResult = writable<boolean>(false);
    let examSecretaryApprovalResultIsDraft = writable<boolean>(false);
    let panelExamResultIsDraft = writable<boolean>(false);
    let examApplicationIsFail = writable<boolean>(false);

    $: data.responses.courseExamSecretaryApprovalResponse.data?.details
        .isDraft === true
        ? examSecretaryApprovalResultIsDraft.set(true)
        : examSecretaryApprovalResultIsDraft.set(false);

    $: data.responses.courseExamSecretaryApprovalResponse.data?.details
        .status === false
        ? examApplicationIsFail.set(true)
        : examApplicationIsFail.set(false);

    $: data.responses.courseExamSecretaryApprovalResponse.data?.details
        .status === null
        ? isReadonlySecretaryApprovalResult.set(false)
        : isReadonlySecretaryApprovalResult.set(true);

    $: data.responses.courseExamResultResponse.data?.details.isDraft === true
        ? panelExamResultIsDraft.set(false)
        : panelExamResultIsDraft.set(true);

    $: data.responses.courseExamResultResponse.data?.details.examResult === ''
        ? isReadonlyExamResult.set(false)
        : isReadonlyExamResult.set(true);

    // Superforms
    const { form, enhance } = superForm(data.forms.examInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
    });

    const { form: personalInfoForm, enhance: personalInfoEnhance } = superForm(
        data.forms.examPersonalInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const { form: serviceInfoForm, enhance: serviceInfoEnhance } = superForm(
        data.forms.examServiceInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
        },
    );

    const {
        form: secretaryApprovalInfoForm,
        errors: secretaryApprovalInfoErrors,
        enhance: secretaryApprovalInfoEnhance,
        isTainted: secretaryApprovalInfoIsTainted,
    } = superForm(data.forms.examSecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_examApplicationApprovalSchema),
        onSubmit() {
            if (!secretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $secretaryApprovalInfoForm.id = (
                data.responses.examApplicationDetailResponse.data
                    ?.details as CourseExamApplicationDetailResponseDTO
            ).applicationId;
            _addSecretaryApprovalForm($secretaryApprovalInfoForm);
        },
    });

    const {
        form: examResultInfoForm,
        errors: examResultInfoErrors,
        enhance: examResultInfoEnhance,
        isTainted: examResultInfoIsTainted,
    } = superForm(data.forms.examResultForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_examApplicationResultResponseSchema),
        onSubmit() {
            if (!examResultInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $examResultInfoForm.id = (
                data.responses.examApplicationDetailResponse.data
                    ?.details as CourseExamApplicationDetailResponseDTO
            ).applicationId;
            _submitExamResult($examResultInfoForm);
        },
    });
</script>

<ContentHeader title="Maklumat Peperiksaan Yang Dipohon">
    {#if data.responses.courseExamResultResponse.data?.details && data.responses.courseExamResultResponse.data?.details.examResult !== ''}
        <Badge color="dark">Proses Peperiksaan Tamat</Badge>
    {:else if $examApplicationIsFail}
        <Badge color="red">Proses Permohonan Diberhentikan</Badge>
    {/if}
    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../rekod-peperiksaan');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi" />
        <StepperContentBody>
            <!-- Maklumat Peribadi -->
            <form
                id="personalInfoStepper"
                method="POST"
                use:personalInfoEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="employeeNo"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.employeeNo}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.identityDocumentNumber}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="identityCardColor"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.selectionOptions.identityCardColorLookup}
                    bind:val={$personalInfoForm.identityCardColor}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="date"
                    id="dateOfBirth"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.dateOfBirth}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="placeOfBirth"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.placeOfBirth}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$personalInfoForm.nationality}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$personalInfoForm.race}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$personalInfoForm.religion}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$personalInfoForm.gender}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="status"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$personalInfoForm.status}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="skim"
                    label="Skim Perkhidmatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.skim}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="grade"
                    label="Gred"
                    placeholder="-"
                    bind:val={$personalInfoForm.grade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="position"
                    label="Jawatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.position}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentPlacement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.currentPlacement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="group"
                    label="Kumpulan"
                    placeholder="-"
                    bind:val={$personalInfoForm.group}
                    options={data.selectionOptions.groupLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$personalInfoForm.mailAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="homeNo"
                    label="Nombor Telefon Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeNo}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="mobileNo"
                    label="Nombor Telefon Bimbit"
                    placeholder="-"
                    bind:val={$personalInfoForm.mobileNo}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="housing"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.housing}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.houseLoan}
                />

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$personalInfoForm.isExPolice}
                    options={data.selectionOptions.generalLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan" />
        <StepperContentBody>
            <form
                id="serviceInfoStepper"
                method="POST"
                use:serviceInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentGrade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentPosition}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.placement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.serviceType}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$serviceInfoForm.program}
                    options={data.selectionOptions.programLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.interimDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementDate}
                ></CustomTextField>

                <ContentHeader title="Maklumat Gaji dan Elaun - Elaun" />
                <div class="grid grid-cols-2 gap-10">
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="salaryEffectiveDate"
                            type="date"
                            label={'Tarikh Berkuatkuasa'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="COLA"
                            label={'COLA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.COLA}
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
        <StepperContentHeader title="Maklumat Peperiksaan LKIM Yang Dimohon" />
        <StepperContentBody>
            <form
                id="examApplicationInfoStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    disabled
                    id="applicationId"
                    label="ID Permohonan Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.applicationId}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    id="examTypeId"
                    label="Jenis Peperiksaan"
                    placeholder="-"
                    bind:val={$form.examTypeId}
                    options={data.selectionOptions.examTypeLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.examTitle}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label="Nombor Pekerja Calon Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeeName"
                    label="Nama Calon Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="examApplicationOpenDate"
                    label="Tarikh Mula Permohonan"
                    type="date"
                    placeholder="-"
                    bind:val={$form.examApplicationOpenDate}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="examApplicationCloseDate"
                    label="Tarikh Tutup Permohonan"
                    type="date"
                    placeholder="-"
                    bind:val={$form.examApplicationCloseDate}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    placeholder="-"
                    bind:val={$form.examDate}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="examLocation"
                    label="Lokasi Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.examLocation}
                ></CustomTextField>

                <!-- <CustomTextField
                    disabled
                    id="examStatus"
                    label="Status Peperiksaan"
                    type="text"
                    placeholder="-"
                    bind:val={$form.examStatus}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="examResult"
                    label="Keputusan Peperiksaan"
                    type="text"
                    placeholder="Dalam Proses"
                    bind:val={$form.examResult}
                ></CustomTextField> -->
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Semakan Urus Setia Latihan">
            {#if $examSecretaryApprovalResultIsDraft && data.role.isCourseSecretaryRole}
                <TextIconButton
                    type="neutral"
                    label="Simpan"
                    form="examApplicationSecretaryApprovalForm"
                    onClick={() => {
                        $secretaryApprovalInfoForm.isDraft = true;
                    }}
                ></TextIconButton>
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="examApplicationSecretaryApprovalForm"
                    onClick={() => {
                        $secretaryApprovalInfoForm.isDraft = false;
                    }}
                ></TextIconButton>
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="examApplicationSecretaryApprovalForm"
                method="POST"
                use:secretaryApprovalInfoEnhance
                class="flex w-full flex-col gap-2.5"
            >
                {#if data.role.isCourseSecretaryRole || $isReadonlySecretaryApprovalResult || !$examSecretaryApprovalResultIsDraft}
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Keputusan Urus Setia Latihan</b
                        >
                    </div>

                    <input hidden bind:value={$secretaryApprovalInfoForm.id} />

                    <CustomTextField
                        disabled={!data.role.isCourseSecretaryRole ||
                            !$examSecretaryApprovalResultIsDraft ||
                            $isReadonlySecretaryApprovalResult}
                        errors={$secretaryApprovalInfoErrors.remark}
                        id="remark"
                        label="Tindakan/Ulasan"
                        placeholder="-"
                        bind:val={$secretaryApprovalInfoForm.remark}
                    ></CustomTextField>
                    <CustomRadioBoolean
                        disabled={!!(
                            !data.role.isCourseSecretaryRole ||
                            !$examSecretaryApprovalResultIsDraft ||
                            $isReadonlySecretaryApprovalResult
                        )}
                        errors={$secretaryApprovalInfoErrors.status}
                        id="status"
                        label="Keputusan"
                        bind:val={$secretaryApprovalInfoForm.status}
                        options={certifyOptions}
                    ></CustomRadioBoolean>
                    <CustomTextField
                        disabled
                        isRequired={false}
                        id="approvalDate"
                        label="Tarikh Kelulusan"
                        type="date"
                        placeholder="-"
                        bind:val={$secretaryApprovalInfoForm.approvalDate}
                    ></CustomTextField>
                {:else}
                    <StepperOtherRolesResult />
                {/if}
            </form>
            <hr />
        </StepperContentBody>
    </StepperContent>
    {#if $isReadonlySecretaryApprovalResult}
        <StepperContent>
            <StepperContentHeader title="Keputusan Panel">
                {#if !$examApplicationIsFail && $panelExamResultIsDraft && !$isReadonlyExamResult && data.role.isCourseSecretaryRole}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="examApplicationPanelResultForm"
                        onClick={() => {
                            $examResultInfoForm.isDraft = true;
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="examApplicationPanelResultForm"
                        onClick={() => {
                            $examResultInfoForm.isDraft = false;
                        }}
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="examApplicationPanelResultForm"
                    method="POST"
                    use:examResultInfoEnhance
                    class="flex w-full flex-col gap-2.5"
                >
                    <div class="mb-5">
                        <b class="text-sm text-system-primary"
                            >Keputusan daripada Panel Pemeriksa:</b
                        >
                    </div>

                    <input hidden bind:value={$examResultInfoForm.id} />

                    <CustomTextField
                        disabled
                        id="title"
                        label="Tajuk Peperiksaan"
                        placeholder="-"
                        bind:val={$examResultInfoForm.examTitle}
                    ></CustomTextField>

                    {#if !$examApplicationIsFail && (($isReadonlySecretaryApprovalResult && data.role.isCourseSecretaryRole) || ($isReadonlyExamResult && (!data.role.isCourseSecretaryRole || data.role.isCourseSecretaryRole)))}
                        <CustomTextField
                            disabled={$isReadonlyExamResult || !$panelExamResultIsDraft}
                            errors={$examResultInfoErrors.examRemark}
                            id="examRemark"
                            label="Catatan"
                            placeholder="-"
                            bind:val={$examResultInfoForm.examRemark}
                        ></CustomTextField>

                        <CustomSelectField
                            disabled={$isReadonlyExamResult || !$panelExamResultIsDraft}
                            errors={$examResultInfoErrors.examResult}
                            id="examResult"
                            label="Keputusan Panel"
                            placeholder="-"
                            bind:val={$examResultInfoForm.examResult}
                            options={data.selectionOptions.examResultLookup}
                        ></CustomSelectField>
                    {:else if $examApplicationIsFail}
                        <StepperFailStatement />
                    {:else}
                        <span
                            class="text-center text-sm italic text-system-primary"
                            >Menunggu keputusan daripada panel.</span
                        >
                    {/if}
                </form>
                <hr />
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
