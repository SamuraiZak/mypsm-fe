<script lang="ts">
    import {
        integrityOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { Badge } from 'flowbite-svelte';
    import {
        approveOptions,
        certifyOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { writable } from 'svelte/store';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { dateProxy, superForm } from 'sveltekit-superforms/client';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import {
        _addCourseSecretaryApprovalForm,
        _addIntegritySecretaryApprovalForm,
        _addStateUnitSecretaryApprovalForm,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import {
        _fundApplicationApprovalSchema,
        _fundApplicationDetailResponseSchema,
    } from '$lib/schemas/mypsm/course/fund-application-schema';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';
    export let data: PageData;

    let isReadonlyStateUnitDirectorApprovalResult = writable<boolean>(false);
    let isReadonlyIntegritySecretaryApprovalResult = writable<boolean>(false);
    let isReadonlyCourseSecretaryApprovalResult = writable<boolean>(false);

    $: {
        isReadonlyStateUnitDirectorApprovalResult.set(
            !!(
                data.responses.fundApplicationStateUnitDirectorApprovalResponse
                    .data?.details.status !== null
            ),
        );
        isReadonlyIntegritySecretaryApprovalResult.set(
            !!(
                data.responses.fundApplicationIntegritySecretaryApprovalResponse
                    .data?.details.status !== null
            ),
        );
        isReadonlyCourseSecretaryApprovalResult.set(
            !!(
                data.responses.fundApplicationCourseSecretaryApprovalResponse
                    .data?.details.status !== null
            ),
        );
    }

    // Superforms
    const { form, enhance } = superForm(data.forms.fundApplicationInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
    });

    const { form: personalInfoForm, enhance: personalInfoEnhance } = superForm(
        data.forms.fundApplicationPersonalInfoForm,
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
        data.forms.fundApplicationServiceInfoForm,
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

    const { form: documentsForm, enhance: documentsEnhance } = superForm(
        data.forms.fundApplicationDocumentForm,
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
        form: courseSecretaryApprovalInfoForm,
        errors: courseSecretaryApprovalInfoErrors,
        enhance: courseSecretaryApprovalInfoEnhance,
        isTainted: courseSecretaryApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationCourseSecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!courseSecretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $courseSecretaryApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addCourseSecretaryApprovalForm($courseSecretaryApprovalInfoForm);
        },
    });

    const {
        form: integritySecretaryApprovalInfoForm,
        errors: integritySecretaryApprovalInfoErrors,
        enhance: integritySecretaryApprovalInfoEnhance,
        isTainted: integritySecretaryApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationIntegritySecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!integritySecretaryApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $integritySecretaryApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addIntegritySecretaryApprovalForm(
                $integritySecretaryApprovalInfoForm,
            );
        },
    });

    const {
        form: stateUnitDirectorApprovalInfoForm,
        errors: stateUnitDirectorApprovalInfoErrors,
        enhance: stateUnitDirectorApprovalInfoEnhance,
        isTainted: stateUnitDirectorApprovalInfoIsTainted,
    } = superForm(data.forms.fundApplicationIntegritySecretaryApprovalForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_fundApplicationApprovalSchema),
        onSubmit() {
            if (!stateUnitDirectorApprovalInfoIsTainted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }

            $stateUnitDirectorApprovalInfoForm.id = (
                data.responses.fundApplicationDetailResponse.data
                    ?.details as CourseFundApplicationDetailResponseDTO
            ).id;
            _addStateUnitSecretaryApprovalForm(
                $stateUnitDirectorApprovalInfoForm,
            );
        },
    });

    const handleDownload = async (url: string) => {
        await CourseFundApplicationServices.downloadAttachment(url);
    };
</script>

<ContentHeader title="Maklumat Pembiayaan Pelajaran">
    {#if data.responses.fundApplicationCourseSecretaryApprovalResponse.data?.details && data.responses.fundApplicationCourseSecretaryApprovalResponse.data?.details.status === true}
        <Badge color="green">Permohonan LULUS</Badge>
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../pembiayaan');
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
                    id="employeeNo"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.employeeNo}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="name"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.name}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="identityCard"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.identityCard}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    id="identityCardColor"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.selectionOptions.identityCardColorLookup}
                    bind:val={$personalInfoForm.identityCardColor}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$personalInfoForm.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="dateOfBirth"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.dateOfBirth}
                ></CustomTextField>
                <CustomSelectField
                    disabled
                    id="placeOfBirth"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$personalInfoForm.placeOfBirth}
                    options={data.selectionOptions.stateLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$personalInfoForm.nationality}
                    options={data.selectionOptions.nationalityLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$personalInfoForm.race}
                    options={data.selectionOptions.raceLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$personalInfoForm.religion}
                    options={data.selectionOptions.religionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$personalInfoForm.gender}
                    options={data.selectionOptions.genderLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="status"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$personalInfoForm.status}
                    options={data.selectionOptions.maritalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="skim"
                    label="Skim Perkhidmatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.skim}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="grade"
                    label="Gred"
                    placeholder="-"
                    bind:val={$personalInfoForm.grade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="position"
                    label="Jawatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.position}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="currentPlacement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$personalInfoForm.currentPlacement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="group"
                    label="Kumpulan"
                    placeholder="-"
                    bind:val={$personalInfoForm.group}
                    options={data.selectionOptions.groupLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$personalInfoForm.program}
                    options={data.selectionOptions.programLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$personalInfoForm.mailAddress}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="homeNo"
                    label="Nombor Telefon Rumah"
                    placeholder="-"
                    bind:val={$personalInfoForm.homeNo}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="mobileNo"
                    label="Nombor Telefon Bimbit"
                    placeholder="-"
                    bind:val={$personalInfoForm.mobileNo}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="housing"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.housing}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$personalInfoForm.houseLoan}
                />

                <CustomSelectField
                    disabled
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
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentGrade}
                    options={data.selectionOptions.gradeLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$serviceInfoForm.currentPosition}
                    options={data.selectionOptions.positionLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.placement}
                    options={data.selectionOptions.placementLookup}
                ></CustomSelectField>
                <CustomSelectField
                    disabled
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$serviceInfoForm.serviceType}
                    options={data.selectionOptions.serviceTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$serviceInfoForm.program}
                    options={data.selectionOptions.programLookup}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.interimDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$serviceInfoForm.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
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
                            id="salaryEffectiveDate"
                            type="number"
                            label={'Tarikh Berkuatkuasa'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="COLA"
                            label={'COLA'}
                            placeholder="-"
                            bind:val={$serviceInfoForm.COLA}
                        ></CustomTextField>
                    </div>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Pembelajaran Diikuti" />
        <StepperContentBody>
            <form
                id="examApplicationInfoStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <CustomSelectField
                    disabled={true}
                    id="academicLevel"
                    label="Peringkat Kursus Pengajian"
                    placeholder="-"
                    bind:val={$form.academicLevel}
                    options={data.lookups.educationLookup}
                ></CustomSelectField>
                <CustomTextField
                    disabled={true}
                    id="courseName"
                    label="Nama Kursus Pengajian"
                    type="text"
                    placeholder="-"
                    bind:val={$form.courseName}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="institution"
                    label="Nama IPTA"
                    type="text"
                    placeholder="-"
                    bind:val={$form.institution}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="learningInstitution"
                    label="Institusi/Pusat Pembelajaran"
                    type="text"
                    placeholder="-"
                    bind:val={$form.learningInstitution}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="studyDuration"
                    label="Tempoh Pengajian (Tahun)"
                    type="text"
                    placeholder="-"
                    bind:val={$form.studyDuration}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="courseApplicationDate"
                    label="Tarikh Kemasukan Ke IPTA"
                    type="date"
                    placeholder="-"
                    bind:val={$form.courseApplicationDate}
                ></CustomTextField>

                <CustomTextField
                    disabled={true}
                    id="expectedFinishedStudyDate"
                    label="Dijangka Tamat Pada"
                    type="date"
                    placeholder="-"
                    bind:val={$form.expectedFinishedStudyDate}
                ></CustomTextField>

                <CustomSelectField
                    disabled={true}
                    id="educationType"
                    label="Jenis Pengajian"
                    placeholder="-"
                    bind:val={$form.educationTypeId}
                    options={data.lookups.educationTypeLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled={true}
                    id="applicationType"
                    label="Jenis Permohonan"
                    placeholder="-"
                    bind:val={$form.applicationTypeId}
                    options={data.lookups.fundApplicationTypeLookup}
                ></CustomSelectField>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
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

                    {#each $documentsForm.document as _, i}
                        <div
                            class="flex w-full flex-row items-center justify-between"
                        >
                            <label
                                for=""
                                class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                >1.</label
                            >
                            <DownloadAttachment
                                triggerDownload={() =>
                                    handleDownload(
                                        $documentsForm.document[i].document,
                                    )}
                                fileName={$documentsForm.document[i].document}
                            ></DownloadAttachment>
                        </div>
                    {/each}
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    {#if data.response.fundReimbursementResponse.data}
        <StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Keputusan daripada Peranan - Peranan Lain"
                >
                    {#if !$isReadonlyStateUnitDirectorApprovalResult && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="stateUnitDirectorApprovalForm"
                        ></TextIconButton>
                    {:else if !$isReadonlyCourseSecretaryApprovalResult && data.role.isIntegritySecretaryRole}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="integritySecretaryApprovalForm"
                        ></TextIconButton>
                    {:else if !$isReadonlyCourseSecretaryApprovalResult && data.role.isCourseSecretaryRole}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="courseSecretaryApprovalForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5">
                        {#if !$isReadonlyStateUnitDirectorApprovalResult && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
                            <form
                                id="stateUnitDirectorApprovalForm"
                                method="POST"
                                use:stateUnitDirectorApprovalInfoEnhance
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >Pengarah Negeri/Bahagian</b
                                    >
                                </div>
                                <CustomTextField
                                    disabled={$isReadonlyStateUnitDirectorApprovalResult}
                                    errors={$stateUnitDirectorApprovalInfoErrors.remark}
                                    id="approverRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$stateUnitDirectorApprovalInfoForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={$isReadonlyStateUnitDirectorApprovalResult}
                                    errors={$stateUnitDirectorApprovalInfoErrors.status}
                                    id="approverIsApproved"
                                    options={supportOptions}
                                    label={'Keputusan'}
                                    bind:val={$stateUnitDirectorApprovalInfoForm.status}
                                ></CustomSelectField>
                            </form>
                        {:else if !$isReadonlyIntegritySecretaryApprovalResult && data.role.isIntegritySecretaryRole}
                            <form
                                id="integritySecretaryApprovalForm"
                                method="POST"
                                use:integritySecretaryApprovalInfoEnhance
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >Urus Setia Integriti</b
                                    >
                                </div>
                                <CustomTextField
                                    disabled={$isReadonlyIntegritySecretaryApprovalResult}
                                    errors={$integritySecretaryApprovalInfoErrors.remark}
                                    id="approverRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$integritySecretaryApprovalInfoForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={$isReadonlyIntegritySecretaryApprovalResult}
                                    errors={$integritySecretaryApprovalInfoErrors.status}
                                    id="approverIsApproved"
                                    options={integrityOptions}
                                    label={'Keputusan'}
                                    bind:val={$integritySecretaryApprovalInfoForm.status}
                                ></CustomSelectField>
                            </form>
                        {:else if !$isReadonlyCourseSecretaryApprovalResult && data.role.isCourseSecretaryRole}
                            <form
                                id="courseSecretaryApprovalForm"
                                method="POST"
                                use:courseSecretaryApprovalInfoEnhance
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >Urus Setia Latihan</b
                                    >
                                </div>
                                <CustomTextField
                                    disabled={$isReadonlyCourseSecretaryApprovalResult}
                                    errors={$courseSecretaryApprovalInfoErrors.remark}
                                    id="supporterRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$courseSecretaryApprovalInfoForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={$isReadonlyCourseSecretaryApprovalResult}
                                    errors={$courseSecretaryApprovalInfoErrors.status}
                                    id="supporterIsApproved"
                                    options={certifyOptions}
                                    label={'Keputusan'}
                                    bind:val={$courseSecretaryApprovalInfoForm.status}
                                ></CustomSelectField>
                            </form>
                        {/if}

                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Negeri/Bahagian</b
                                >
                            </div>
                            {#if $isReadonlyStateUnitDirectorApprovalResult}
                                <CustomTextField
                                    disabled
                                    id="stateUnitDirectorRemark"
                                    label="Tindakan/Ulasan"
                                    val={data.responses
                                        .fundApplicationStateUnitDirectorApprovalResponse
                                        .data?.details.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="stateUnitDirectorStatus"
                                    options={approveOptions}
                                    label={'Keputusan'}
                                    val={data.responses
                                        .fundApplicationStateUnitDirectorApprovalResponse
                                        .data?.details.status}
                                ></CustomSelectField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        </div>
                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Urus Setia Integriti</b
                                >
                            </div>
                            {#if $isReadonlyIntegritySecretaryApprovalResult}
                                <CustomTextField
                                    disabled
                                    id="integrityCourseRemark"
                                    label="Tindakan/Ulasan"
                                    val={data.responses
                                        .fundApplicationIntegritySecretaryApprovalResponse
                                        .data?.details.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="integrityCourseStatus"
                                    options={supportOptions}
                                    label={'Keputusan'}
                                    val={data.responses
                                        .fundApplicationIntegritySecretaryApprovalResponse
                                        .data?.details.status}
                                ></CustomSelectField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        </div>

                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Urus Setia Latihan</b
                                >
                            </div>
                            {#if $isReadonlyCourseSecretaryApprovalResult}
                                <CustomTextField
                                    disabled
                                    id="courseSecretaryRemark"
                                    label="Tindakan/Ulasan"
                                    val={data.responses
                                        .fundApplicationCourseSecretaryApprovalResponse
                                        .data?.details.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="courseSecretaryStatus"
                                    options={certifyOptions}
                                    label={'Keputusan'}
                                    val={data.responses
                                        .fundApplicationCourseSecretaryApprovalResponse
                                        .data?.details.status}
                                ></CustomSelectField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
