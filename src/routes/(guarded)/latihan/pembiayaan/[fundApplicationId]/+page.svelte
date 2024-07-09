<script lang="ts">
    import StepperFileNotUploaded from '$lib/components/stepper/StepperFileNotUploaded.svelte';
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import {
        integrityOptions,
        supportOptions,
        confirmOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { Badge, Checkbox } from 'flowbite-svelte';
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
    import { superForm } from 'sveltekit-superforms/client';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import {
        _addCourseSecretaryApprovalForm,
        _addIntegritySecretaryApprovalForm,
        _addStateUnitSecretaryApprovalForm,
    } from './+layout';
    import { zod } from 'sveltekit-superforms/adapters';
    import { error } from '@sveltejs/kit';
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import {
        _fundApplicationApprovalSchema,
        _fundApplicationDetailResponseSchema,
    } from '$lib/schemas/mypsm/course/fund-application-schema';
    import { CourseFundApplicationServices } from '$lib/services/implementation/mypsm/latihan/fundApplication.service';
    import type { LayoutData } from './$types';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    export let data: LayoutData;

    let isReadonlyStateUnitDirectorApprovalResult = writable<boolean>(false);
    let isReadonlyIntegritySecretaryApprovalResult = writable<boolean>(false);
    let isReadonlyCourseSecretaryApprovalResult = writable<boolean>(false);
    let fundApplicationIsFail = writable<boolean>(false);
    let fundApplicationFileUploadPass = writable<boolean>(false);

    $: {
        data.responses.fundApplicationDocumentInfoResponse.status === 'success'
            ? fundApplicationFileUploadPass.set(true)
            : fundApplicationFileUploadPass.set(false);

        data.responses.fundApplicationCourseSecretaryApprovalResponse.data
            ?.details.status === false ||
        data.responses.fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details.status === false ||
        data.responses.fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details.status === false
            ? fundApplicationIsFail.set(true)
            : fundApplicationIsFail.set(false);

        data.responses.fundApplicationStateUnitDirectorApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyStateUnitDirectorApprovalResult.set(true)
            : isReadonlyStateUnitDirectorApprovalResult.set(false);

        data.responses.fundApplicationIntegritySecretaryApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyIntegritySecretaryApprovalResult.set(true)
            : isReadonlyIntegritySecretaryApprovalResult.set(false);

        data.responses.fundApplicationCourseSecretaryApprovalResponse.data
            ?.details.status !== null
            ? isReadonlyCourseSecretaryApprovalResult.set(true)
            : isReadonlyCourseSecretaryApprovalResult.set(false);
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

    const { form: documentsForm } = superForm(
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
        id: 'fundApplicationIntegritySecretaryApprovalCourseSubmodule',
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
    } = superForm(data.forms.fundApplicationStateUnitDirectorApprovalForm, {
        id: 'fundApplicationStateUnitDirectorApprovalCourseSubmodule',
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
        <Badge color="green">Permohonan BERJAYA</Badge>
    {:else if $fundApplicationIsFail}
        <Badge color="red">Permohonan TIDAK BERJAYA</Badge>
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

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$personalInfoForm.program}
                    options={data.selectionOptions.programLookup}
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
                            type="number"
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

                <div
                    class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    <label
                        for="role"
                        class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >Jenis Pengajian
                        <span class="text-base text-system-danger">*</span>
                    </label>
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.educationTypeId.includes(1)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[0].value}
                        >{data.lookups.educationTypeLookup[0].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.educationTypeId.includes(2)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[1].value}
                        >{data.lookups.educationTypeLookup[1].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.educationTypeId.includes(3)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[2].value}
                        >{data.lookups.educationTypeLookup[2].name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.educationTypeId.includes(4)}
                        bind:group={$form.educationTypeId}
                        bind:value={data.lookups.educationTypeLookup[3].value}
                        >{data.lookups.educationTypeLookup[3].name}</Checkbox
                    >
                </div>

                <div
                    class="mb-3 flex h-fit w-full flex-col items-start justify-start gap-y-2 bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                >
                    <label
                        for="role"
                        class="mb-2 block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >Jenis Permohonan
                        <span class="text-base text-system-danger">*</span>
                    </label>
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.applicationTypeId.includes(1)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[0]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[0]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.applicationTypeId.includes(2)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[1]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[1]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.applicationTypeId.includes(3)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[2]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[2]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.applicationTypeId.includes(4)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[3]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[3]
                            .name}</Checkbox
                    >
                    <Checkbox
                        class={'text-ios-labelColors-secondaryLabel-light'}
                        disabled={true}
                        checked={$form.applicationTypeId.includes(5)}
                        bind:group={$form.applicationTypeId}
                        bind:value={data.lookups.fundApplicationTypeLookup[4]
                            .value}
                        >{data.lookups.fundApplicationTypeLookup[4]
                            .name}</Checkbox
                    >
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen - Dokumen Sokongan yang Berkaitan"
        ></StepperContentHeader>
        <StepperContentBody>
            {#if !$fundApplicationFileUploadPass}
                <StepperFileNotUploaded />
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
                        {#each $documentsForm.document as _, i}
                            <div
                                class="flex w-full flex-row items-center justify-between"
                            >
                                <label
                                    for=""
                                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                                    >{i + 1}.</label
                                >
                                <a
                                    href={$documentsForm.document[i].document}
                                    download={$documentsForm.document[i].name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{$documentsForm.document[i].name}</a
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </StepperContentBody>
    </StepperContent>
    {#if $fundApplicationFileUploadPass}
        <StepperContent>
            <StepperContentHeader
                title="Keputusan daripada Peranan - Peranan Lain"
            >
                {#if !$fundApplicationIsFail && !$isReadonlyStateUnitDirectorApprovalResult && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="stateUnitDirectorApprovalForm"
                    ></TextIconButton>
                {:else if !$fundApplicationIsFail && $isReadonlyStateUnitDirectorApprovalResult && !$isReadonlyIntegritySecretaryApprovalResult && data.role.isIntegritySecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="integritySecretaryApprovalForm"
                    ></TextIconButton>
                {:else if !$fundApplicationIsFail && $isReadonlyStateUnitDirectorApprovalResult && $isReadonlyIntegritySecretaryApprovalResult && !$isReadonlyCourseSecretaryApprovalResult && data.role.isCourseSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="courseSecretaryApprovalForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    {#if !$fundApplicationIsFail && !$isReadonlyStateUnitDirectorApprovalResult && (data.role.isStateDirectorRole || data.role.isUnitDirectorRole)}
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
                            <CustomRadioBoolean
                                disabled={$isReadonlyStateUnitDirectorApprovalResult}
                                errors={$stateUnitDirectorApprovalInfoErrors.status}
                                id="approverIsApproved"
                                options={supportOptions}
                                label={'Keputusan'}
                                bind:val={$stateUnitDirectorApprovalInfoForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {:else if !$fundApplicationIsFail && $isReadonlyStateUnitDirectorApprovalResult && !$isReadonlyIntegritySecretaryApprovalResult && data.role.isIntegritySecretaryRole}
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
                            <CustomRadioBoolean
                                disabled={$isReadonlyIntegritySecretaryApprovalResult}
                                errors={$integritySecretaryApprovalInfoErrors.status}
                                id="approverIsApproved"
                                options={integrityOptions}
                                label={'Keputusan'}
                                bind:val={$integritySecretaryApprovalInfoForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {:else if !$fundApplicationIsFail && $isReadonlyStateUnitDirectorApprovalResult && $isReadonlyIntegritySecretaryApprovalResult && !$isReadonlyCourseSecretaryApprovalResult && data.role.isCourseSecretaryRole}
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
                            <CustomRadioBoolean
                                disabled={$isReadonlyCourseSecretaryApprovalResult}
                                errors={$courseSecretaryApprovalInfoErrors.status}
                                id="supporterIsApproved"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$courseSecretaryApprovalInfoForm.status}
                            ></CustomRadioBoolean>
                        </form>
                    {/if}

                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >1. Pengarah Negeri/Bahagian</b
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
                                options={supportOptions}
                                label={'Keputusan'}
                                val={data.responses
                                    .fundApplicationStateUnitDirectorApprovalResponse
                                    .data?.details.status}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="approvalDate"
                                label="Tarikh Kelulusan"
                                type="date"
                                placeholder="-"
                                val={data.responses
                                    .fundApplicationStateUnitDirectorApprovalResponse
                                    .data?.details.approvalDate}
                            ></CustomTextField>
                        {:else if $fundApplicationIsFail}
                            <StepperFailStatement />
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                        <hr />
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >2. Urus Setia Integriti</b
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
                                options={integrityOptions}
                                label={'Keputusan'}
                                val={data.responses
                                    .fundApplicationIntegritySecretaryApprovalResponse
                                    .data?.details.status}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="approvalDate"
                                label="Tarikh Kelulusan"
                                type="date"
                                placeholder="-"
                                val={data.responses
                                    .fundApplicationIntegritySecretaryApprovalResponse
                                    .data?.details.approvalDate}
                            ></CustomTextField>
                        {:else if $fundApplicationIsFail}
                            <StepperFailStatement />
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                        <hr />
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >3. Urus Setia Latihan</b
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
                            <CustomTextField
                                disabled
                                id="approvalDate"
                                label="Tarikh Kelulusan"
                                type="date"
                                placeholder="-"
                                val={data.responses
                                    .fundApplicationCourseSecretaryApprovalResponse
                                    .data?.details.approvalDate}
                            ></CustomTextField>
                        {:else if $fundApplicationIsFail}
                            <StepperFailStatement />
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
