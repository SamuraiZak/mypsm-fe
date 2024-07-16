<script lang="ts">
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { approveOptions } from '$lib/constants/core/radio-option-constants';
    import { writable } from 'svelte/store';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import {
        _addSecretaryApprovalForm,
        _createFundReimbursementForm,
        _submitDocumentForm,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import type { CourseFundReimbursementDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
    import {
        _fundReimbursementApprovalSchema,
        _fundReimbursementDetailResponseSchema,
        _fundReimbursementUploadDocSchema,
    } from '$lib/schemas/mypsm/course/fund-reimbursement-schema';
    import { Badge } from 'flowbite-svelte';
    import StepperFileNotUploaded from '$lib/components/stepper/StepperFileNotUploaded.svelte';
    import { CourseFundReimbursementServices } from '$lib/services/implementation/mypsm/latihan/fundReimbursement.service';
    import FileInputField from '$lib/components/inputs/file-input-field/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/inputs/file-input-field/FileInputFieldChildren.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import StatusPill from '$lib/components/status-pills/StatusPill.svelte';
    export let data: PageData;

    let isReadonlySecretaryApprovalResult = writable<boolean>(false);

    let fundReimbursementIsFail = writable<boolean>(false);

    let reimbursementInfoIsDrafted = writable<boolean>(false);

    let reimbursementDocumentIsDrafted = writable<boolean>(false);

    let reimbursementSecretaryApprovalIsDrafted = writable<boolean>(false);

    let fundReimbursementNotUploaded = writable<boolean>(false);
    $: {
        data.responses.fundReimbursementDetailResponse.data?.details.isDraft ===
        true
            ? reimbursementInfoIsDrafted.set(true)
            : reimbursementInfoIsDrafted.set(false);

        data.responses.fundReimbursementDocumentInfoResponse.data?.details
            .document === null
            ? fundReimbursementNotUploaded.set(true)
            : fundReimbursementNotUploaded.set(false);

        data.responses.fundReimbursementDocumentInfoResponse.data?.details
            .isDraft === true
            ? reimbursementDocumentIsDrafted.set(true)
            : reimbursementDocumentIsDrafted.set(false);

        data.responses.fundReimbursementSecretaryApprovalResponse.data?.details
            .isDraft === true
            ? reimbursementSecretaryApprovalIsDrafted.set(true)
            : reimbursementSecretaryApprovalIsDrafted.set(false);

        data.responses.fundReimbursementSecretaryApprovalResponse.data?.details
            .status === false
            ? fundReimbursementIsFail.set(true)
            : fundReimbursementIsFail.set(false);

        data.responses.fundReimbursementSecretaryApprovalResponse.data?.details
            .status !== null
            ? isReadonlySecretaryApprovalResult.set(true)
            : isReadonlySecretaryApprovalResult.set(false);
    }

    // Superforms
    const { form, errors, enhance } = superForm(
        data.forms.fundReimbursementInfoForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_fundReimbursementDetailResponseSchema),
            async onSubmit() {
                $form.id = data.fundReimbursementId;
                await _createFundReimbursementForm($form);
            },
            taintedMessage: false,
        },
    );

    const { form: reimbursementDocumentsForm } = superForm(
        data.forms.fundReimbursementDocumentForm,
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
        form: fundReimbursementUploadDocumentForm,
        errors: fundReimbursementUploadDocumentError,
        enhance: fundReimbursementUploadDocumentEnhance,
    } = superForm(data.forms.fundReimbursementUploadDocumentForm, {
        SPA: true,
        resetForm: false,
        invalidateAll: true,
        id: 'documentUploadForm',
        validators: zod(_fundReimbursementUploadDocSchema),
        onSubmit() {
            _submitDocumentForm(
                data.fundReimbursementId,
                $fundReimbursementUploadDocumentForm.isDraft,
                $fundReimbursementUploadDocumentForm.documents,
                $reimbursementDocumentsForm,
            );
        },
        taintedMessage: 'Permohonon anda belum selesai.',
    });

    const { form: personalInfoForm, enhance: personalInfoEnhance } = superForm(
        data.forms.fundReimbursementPersonalInfoForm,
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
        data.forms.fundReimbursementServiceInfoForm,
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
    } = superForm(data.forms.fundReimbursementSecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundReimbursementApprovalSchema),
        onSubmit() {
            if (!secretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $secretaryApprovalInfoForm.id = (
                data.responses.fundReimbursementDetailResponse.data
                    ?.details as CourseFundReimbursementDetailResponseDTO
            ).id;
            _addSecretaryApprovalForm($secretaryApprovalInfoForm);
        },
    });

    const handleOnInput = (e: Event) => {
        const additionalFiles: File[] = Array.from(
            (e.currentTarget as HTMLInputElement)?.files ?? [],
        );

        additionalFiles.forEach((file) => {
            $fundReimbursementUploadDocumentForm.documents = [
                ...$fundReimbursementUploadDocumentForm.documents,
                file,
            ];
        });
    };

    const handleDelete = (i: number) => {
        $fundReimbursementUploadDocumentForm.documents =
            $fundReimbursementUploadDocumentForm.documents.filter(
                (_, index) => {
                    return index !== i;
                },
            );
    };

    const handleDeleteUploadedFile = (i: number) => {
        $reimbursementDocumentsForm.document =
            $reimbursementDocumentsForm.document.filter((_, index) => {
                return index !== i;
            });
    };
</script>

<ContentHeader title="Maklumat Tuntutan Pembiayaan Yuran Pembelajaran">
    <StatusPill status={data.params.status} slot="status" />

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../claims');
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
        <StepperContentHeader title="Maklumat Pembelajaran Diikuti">
            {#if $reimbursementInfoIsDrafted && data.role.isStaffRole}
                <TextIconButton
                    type="neutral"
                    label="Simpan"
                    form="examReimbursementInfoStepper"
                    onClick={() => {
                        $form.isDraft = true;
                    }}
                />
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="examReimbursementInfoStepper"
                    onClick={() => {
                        $form.isDraft = false;
                    }}
                />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            {#if $reimbursementInfoIsDrafted && data.role.isCourseSecretaryRole}
                <StepperOtherRolesResult />
            {:else}
                <form
                    id="examReimbursementInfoStepper"
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomSelectField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.academicLevel}
                        id="academicLevel"
                        label="Peringkat Kursus Pengajian"
                        placeholder="-"
                        bind:val={$form.academicLevel}
                        options={data.lookups.educationLookup}
                    ></CustomSelectField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.courseName}
                        id="courseName"
                        label="Nama Kursus Pengajian"
                        type="text"
                        placeholder="-"
                        bind:val={$form.courseName}
                    ></CustomTextField>

                    <CustomSelectField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.institution}
                        id="institution"
                        label="Tempat Pengajian"
                        placeholder="-"
                        bind:val={$form.institution}
                        options={data.lookups.institutionLookup}
                    ></CustomSelectField>

                    <CustomSelectField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.learningInstitution}
                        id="learningInstitution"
                        label="Institusi/Pusat Pembelajaran"
                        placeholder="-"
                        bind:val={$form.learningInstitution}
                        options={data.lookups.institutionLookup}
                    ></CustomSelectField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.studyDuration}
                        id="studyDuration"
                        label="Tempoh Pengajian (Tahun)"
                        type="number"
                        placeholder="-"
                        bind:val={$form.studyDuration}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.entryDateToInstituition}
                        id="entryDateToInstituition"
                        label="Tarikh Kemasukan Ke IPTA"
                        type="date"
                        placeholder="-"
                        bind:val={$form.entryDateToInstituition}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.finishedStudyDate}
                        id="finishedStudyDate"
                        label="Tamat Pada"
                        type="date"
                        placeholder="-"
                        bind:val={$form.finishedStudyDate}
                    ></CustomTextField>

                    <CustomSelectField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.semester}
                        id="semester"
                        label="Tuntutan Untuk Semester"
                        placeholder="-"
                        bind:val={$form.semester}
                        options={[
                            {
                                value: 1,
                                name: 'Satu',
                            },
                            {
                                value: 2,
                                name: 'Dua',
                            },
                            {
                                value: 3,
                                name: 'Tiga',
                            },
                            {
                                value: 4,
                                name: 'Empat',
                            },
                            {
                                value: 5,
                                name: 'Lima',
                            },
                            {
                                value: 6,
                                name: 'Enam',
                            },
                            {
                                value: 7,
                                name: 'Tujuh',
                            },
                            {
                                value: 8,
                                name: 'Lapan',
                            },
                        ]}
                    ></CustomSelectField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.finalResult}
                        id="finalResult"
                        label="Keputusan Semester (GPA/skema pemarkahan berkaitan)"
                        type="text"
                        placeholder="-"
                        bind:val={$form.finalResult}
                    ></CustomTextField>

                    <CustomTextField
                        disabled={!$reimbursementInfoIsDrafted}
                        errors={$errors.totalClaim}
                        id="totalClaim"
                        label="Jumlah Tuntutan (RM)"
                        type="number"
                        placeholder="-"
                        bind:val={$form.totalClaim}
                    ></CustomTextField>
                </form>
            {/if}
        </StepperContentBody>
    </StepperContent>
    {#if !$reimbursementInfoIsDrafted}
        <StepperContent>
            <StepperContentHeader
                title="Dokumen - Dokumen Sokongan yang Berkaitan"
            >
                {#if $reimbursementDocumentIsDrafted && data.role.isStaffRole}
                    <TextIconButton
                        type="neutral"
                        label="Simpan"
                        form="documentUploadForm"
                        onClick={() => {
                            $fundReimbursementUploadDocumentForm.isDraft = true;
                        }}
                    />
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="documentUploadForm"
                        onClick={() => {
                            $fundReimbursementUploadDocumentForm.isDraft = false;
                        }}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if ($fundReimbursementNotUploaded || $reimbursementDocumentIsDrafted) && data.role.isCourseSecretaryRole}
                    <StepperFileNotUploaded />
                {:else if ($fundReimbursementNotUploaded || $reimbursementDocumentIsDrafted) && data.role.isStaffRole}
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm">
                            Sila muat turun, isi dengan lengkap dokumen berikut,
                            kemudian muat naik dokumen pada ruangan yang
                            disediakan.
                        </p>

                        <ol class="list-inside list-decimal space-y-1 text-sm">
                            <li>Slip keputusan</li>
                            <li>Resit tuntutan</li>
                            <li>Lain-lain dokumen yang berkaitan</li>
                        </ol>
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            method="POST"
                            id="documentUploadForm"
                            enctype="multipart/form-data"
                            use:fundReimbursementUploadDocumentEnhance
                        >
                            {#if $fundReimbursementUploadDocumentError.documents}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >Sila muat naik dokumen barkaitan dan
                                    pastikan tidak melebihi 10MB.</span
                                >
                            {/if}
                            <ContentHeader
                                title="Pastikan dokumen berkenaan dimuat naik"
                                borderClass="border-none"
                            >
                                <div
                                    hidden={$fundReimbursementUploadDocumentForm
                                        .documents.length < 1}
                                >
                                    <FileInputField
                                        id="documents"
                                        handleOnInput={(e) => handleOnInput(e)}
                                    ></FileInputField>
                                </div>
                            </ContentHeader>
                            <div
                                class="flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border border-bdr-primary p-2.5"
                            >
                                <div class="flex flex-wrap gap-3">
                                    {#each $fundReimbursementUploadDocumentForm.documents as _, i}
                                        <FileInputFieldChildren
                                            childrenType="grid"
                                            handleDelete={() => handleDelete(i)}
                                            document={$fundReimbursementUploadDocumentForm
                                                .documents[i]}
                                        />
                                    {/each}
                                    {#each $reimbursementDocumentsForm.document as doc, i}
                                        <div class="flex flex-row">
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <div
                                                class="0 flex h-fit w-fit flex-col items-center justify-center gap-2.5 rounded-md bg-bgr-secondary p-2.5 text-sm hover:bg-bgr-tertiary"
                                            >
                                                <svg
                                                    fill="#ffffff"
                                                    class="mr-2 h-16 w-16 text-system-primary"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    ><g
                                                        id="SVGRepo_bgCarrier"
                                                        stroke-width="0"
                                                    ></g><g
                                                        id="SVGRepo_tracerCarrier"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    ></g><g
                                                        id="SVGRepo_iconCarrier"
                                                    >
                                                        <path
                                                            d="M4 4C4 3.44772 4.44772 3 5 3H14H14.5858C14.851 3 15.1054 3.10536 15.2929 3.29289L19.7071 7.70711C19.8946 7.89464 20 8.149 20 8.41421V20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V4Z"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                        ></path>
                                                        <path
                                                            d="M20 8H15V3"
                                                            stroke="currentColor"
                                                            stroke-width="2"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M11.5 13H11V17H11.5C12.6046 17 13.5 16.1046 13.5 15C13.5 13.8954 12.6046 13 11.5 13Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M15.5 17V13L17.5 13"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M16 15H17"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                        <path
                                                            d="M7 17L7 15.5M7 15.5L7 13L7.75 13C8.44036 13 9 13.5596 9 14.25V14.25C9 14.9404 8.44036 15.5 7.75 15.5H7Z"
                                                            stroke="currentColor"
                                                            stroke-width="1.5"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                        ></path>
                                                    </g></svg
                                                >
                                                {#if doc.name.length < 15}
                                                    {doc.name}
                                                {:else}
                                                    {doc.name.substring(0, 15) +
                                                        '...'}
                                                {/if}
                                            </div>
                                            <div
                                                class=" flex h-fit w-fit flex-col items-center justify-center rounded-xl bg-bgr-primary"
                                            >
                                                <button
                                                    type="button"
                                                    on:click={() =>
                                                        handleDeleteUploadedFile(
                                                            i,
                                                        )}
                                                    class="text-system-danger"
                                                    ><SvgMinusCircle size="22"
                                                    ></SvgMinusCircle></button
                                                >
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                                {#if $fundReimbursementUploadDocumentForm.documents.length < 1}
                                    <div
                                        class="flex flex-col items-center justify-center gap-2.5 text-sm text-txt-tertiary"
                                    >
                                        <span
                                            >Pilih fail dari peranti anda.</span
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
                                        <FileInputField
                                            id="documents"
                                            handleOnInput={(e) =>
                                                handleOnInput(e)}
                                        ></FileInputField>
                                    </div>
                                {/if}
                            </div>
                        </form>
                    </div>
                {:else}
                    <div class="flex w-full flex-col gap-2">
                        <div
                            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
                        >
                            <p
                                class="mt-2 h-fit w-full bg-bgr-primary text-sm font-medium text-system-primary"
                            >
                                Fail-fail yang dimuat naik:
                            </p>

                            {#each $reimbursementDocumentsForm.document as _, i}
                                <div
                                    class="flex w-full flex-row items-center justify-between"
                                >
                                    <label
                                        for=""
                                        class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                        >{i + 1}.</label
                                    >
                                    <a
                                        href={$reimbursementDocumentsForm
                                            .document[i].document}
                                        download={$reimbursementDocumentsForm
                                            .document[i].name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{$reimbursementDocumentsForm.document[
                                            i
                                        ].name}</a
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {#if !$fundReimbursementNotUploaded && !$reimbursementDocumentIsDrafted}
            <StepperContent>
                <StepperContentHeader
                    title="Pengesahan Semakan Urus Setia Latihan"
                >
                    {#if (!$isReadonlySecretaryApprovalResult || $reimbursementSecretaryApprovalIsDrafted) && data.role.isCourseSecretaryRole}
                        <TextIconButton
                            type="neutral"
                            label="Simpan"
                            form="examReimbursementSecretaryApprovalForm"
                            onClick={() => {
                                $secretaryApprovalInfoForm.isDraft = true;
                            }}
                        />
                        <TextIconButton
                            type="primary"
                            label="Hantar"
                            form="examReimbursementSecretaryApprovalForm"
                            onClick={() => {
                                $secretaryApprovalInfoForm.isDraft = false;
                            }}
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <form
                        id="examReimbursementSecretaryApprovalForm"
                        method="POST"
                        use:secretaryApprovalInfoEnhance
                        class="flex w-full flex-col gap-2.5"
                    >
                        {#if ($isReadonlySecretaryApprovalResult && !$reimbursementSecretaryApprovalIsDrafted) || data.role.isCourseSecretaryRole}
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Keputusan Urus Setia Latihan</b
                                >
                            </div>

                            <input
                                hidden
                                bind:value={$secretaryApprovalInfoForm.id}
                            />

                            <CustomTextField
                                disabled={($isReadonlySecretaryApprovalResult &&
                                    !$reimbursementSecretaryApprovalIsDrafted) ||
                                    !data.role.isCourseSecretaryRole}
                                errors={$secretaryApprovalInfoErrors.remark}
                                id="remark"
                                label="Tindakan/Ulasan"
                                placeholder="-"
                                bind:val={$secretaryApprovalInfoForm.remark}
                            ></CustomTextField>

                            <CustomRadioBoolean
                                disabled={($isReadonlySecretaryApprovalResult &&
                                    !$reimbursementSecretaryApprovalIsDrafted) ||
                                    !data.role.isCourseSecretaryRole}
                                errors={$secretaryApprovalInfoErrors.status}
                                id="status"
                                label="Keputusan"
                                bind:val={$secretaryApprovalInfoForm.status}
                                options={approveOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                disabled
                                isRequired={false}
                                id="approvalDate"
                                label="Tarikh Kelulusan"
                                type="date"
                                placeholder="-"
                                val={$secretaryApprovalInfoForm.approvalDate}
                            ></CustomTextField>
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </form>
                    <hr />
                </StepperContentBody>
            </StepperContent>
        {/if}
    {/if}
</Stepper>

<Toaster />
