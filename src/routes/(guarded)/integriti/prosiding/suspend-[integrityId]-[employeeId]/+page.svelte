<script lang="ts">
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import {
        certifyOptions,
        proceedingMeetingOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Badge, Checkbox } from 'flowbite-svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
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
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import { writable } from 'svelte/store';
    import {
        _proceedingAppealSchema,
        _proceedingSentencingMeetingSchema,
        _proceedingSuspensionSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import {
        _addChargeDisciplineSecretaryApproval,
        _addSentencingIntegrityDirectorApproval,
        _addSentencingMeeting,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addSuspensionDetailForm } from '../tambah-prosiding/[employeeId]/+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    export let data: PageData;

    let proceedingChargeIsCertified = writable<boolean>(false);
    let proceedingSentencingIsCertified = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionMeeting = writable<boolean>(false); //not yet initialised
    let isReadOnlyProceedingSuspensionConfirmation = writable<boolean>(false); //not yet initialised
    let updateSuspendCrimeDetail = writable<boolean>(false);
    let updateCrimeOffenceAppealSuspendedInfo = writable<boolean>(false);
    let updateSuspendCrimePenaltyDetails = writable<boolean>(false);

    // Superforms
    const { form } = superForm(data.forms.proceedingStaffInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
    });

    const {
        form: disciplineSecretaryForm,
        errors: disciplineSecretaryFormErrors,
        enhance: disciplineSecretaryFormEnhance,
    } = superForm(data.forms.proceedingIntegrityDirectorForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
        taintedMessage: false,
        onSubmit() {
            _addChargeDisciplineSecretaryApproval($disciplineSecretaryForm);
        },
    });

    const {
        form: sentencingMeetingForm,
        errors: sentencingMeetingFormErrors,
        enhance: sentencingMeetingFormEnhance,
    } = superForm(data.forms.proceedingSentencingMeetingForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_proceedingSentencingMeetingSchema),
        taintedMessage: false,
        onSubmit() {
            _addSentencingMeeting($sentencingMeetingForm);
        },
    });

    const {
        form: sentencingConfirmationForm,
        errors: sentencingConfirmationFormErrors,
        enhance: sentencingConfirmationFormEnhance,
    } = superForm(data.forms.proceedingSentencingConfirmationForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
        taintedMessage: false,
        onSubmit() {
            _addSentencingIntegrityDirectorApproval(
                $sentencingConfirmationForm,
            );
        },
    });

    const {
        form: appealConfirmationForm,
        errors: appealConfirmationFormErrors,
        enhance: appealConfirmationFormEnhance,
    } = superForm(data.forms.proceedingAppealConfirmationForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
        taintedMessage: false,
        onSubmit() {},
    });

    const { form: suspensionMeetingForm } = superForm(
        data.forms.proceedingSuspensionMeetingForm,
        {
            SPA: true,
            dataType: 'json',
            validators: false,
        },
    );

    const {
        form: suspensionCriminalDetailForm,
        errors: suspensionCriminalDetailFormErrors,
        enhance: suspensionCriminalDetailFormEnhance,
    } = superForm(data.forms.proceedingSuspensionCriminalDetailForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
        taintedMessage: false,
        onSubmit() {},
    });

    $suspensionCriminalDetailForm.proceedingAction === 'Rayuan dikemukakan'
        ? ($suspensionMeetingForm.eligibleEmolumen = 0)
        : ($suspensionMeetingForm.eligibleEmolumen = null);
</script>

<ContentHeader title="Maklumat Prosiding Tatatertib">
    {#if $proceedingSentencingIsCertified}
        <Badge color="dark">Proses Prosiding Tamat</Badge>
    {:else if !$proceedingChargeIsCertified}
        <Badge color="red">Proses Prosiding DIBERHENTIKAN</Badge>
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../prosiding');
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
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.fullName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.identityCardNumber}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    id="icColour"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.lookups.identityCardColorLookup}
                    bind:val={$form.employeeDetail.icColour}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthplace}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$form.employeeDetail.nationality}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$form.employeeDetail.race}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    placeholder="-"
                    bind:val={$form.employeeDetail.ethnic}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$form.employeeDetail.religion}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$form.employeeDetail.gender}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.marital}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$form.employeeDetail.homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$form.employeeDetail.mailAddress}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoanType"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoanType}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoan}
                />

                <CustomTextField
                    disabled
                    type="number"
                    id="vehicleLoan"
                    label="Pinjaman Kenderaan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.vehicleLoan}
                />

                <CustomSelectField
                    disabled
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isExPolice}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    id="isRelatedToLKIM"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isRelatedToLKIM}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                {#if $form.employeeDetail.isRelatedToLKIM}
                    <CustomTextField
                        id="employeeNumber"
                        label="No. Pekerja LKIM"
                        bind:val={$form.employeeDetail.relationDetail
                            .employeeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        id="employeeName"
                        label={'Nama Kakitangan LKIM'}
                        bind:val={$form.employeeDetail.relationDetail.fullName}
                    ></CustomTextField>

                    <CustomTextField
                        id="relationDetailPosition"
                        label="Jawatan Kakitangan LKIM"
                        bind:val={$form.employeeDetail.relationDetail.position}
                    ></CustomTextField>

                    <CustomTextField
                        id="relationDetailRelationship"
                        label="Hubungan"
                        bind:val={$form.employeeDetail.relationDetail
                            .relationship}
                    ></CustomTextField>
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan" />
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2.5">
                <CustomTextField
                    disabled
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$form.serviceDetail.currentGrade}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$form.serviceDetail.currentPosition}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$form.serviceDetail.placement}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$form.serviceDetail.serviceType}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$form.serviceDetail.program}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.interimDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    id="retirementDate"
                    label={'Tarikh Bersara'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.retirementDate}
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
                            bind:val={$form.serviceDetail.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            id="COLA"
                            label={'COLA'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.COLA}
                        ></CustomTextField>
                    </div>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>

    {#if data.roles.isIntegritySecretaryRole || data.roles.isStaffRole}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Tahan Kerja"
            >
                <TextIconButton
                    type="primary"
                    form="suspensionMeetingForm"
                    label="Simpan"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col items-center gap-2">
                    <CustomTextField
                        disabled={true}
                        type="date"
                        id="meetingDate"
                        label="Tarikh Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={true}
                        id="meetingCount"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingCount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={true}
                        id="meetingName"
                        label="Nama Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingName}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={true}
                        id="meetingCode"
                        label="Kod Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingCode}
                    ></CustomTextField>
                    <!-- Hidden for the time being!!!! -->
                    <CustomRadioField
                        disabled={true}
                        id="currentGrade"
                        label="Keputusan Mesyuarat"
                        options={proceedingMeetingOptions}
                        bind:val={$suspensionMeetingForm.meetingResult}
                    ></CustomRadioField>

                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                    >
                        <ContentHeader
                            title="Maklumat Keputusan Mesyuarat Prosiding - Tahan Kerja"
                            borderClass="border-none"
                            titlePadding={false}
                        >
                            {#if !$updateSuspendCrimeDetail}
                                <TextIconButton
                                    type="primary"
                                    label="Kemaskini"
                                    onClick={() => {
                                        $updateSuspendCrimeDetail = true;
                                    }}><SvgEdit /></TextIconButton
                                >
                            {:else if $updateSuspendCrimeDetail}
                                <TextIconButton
                                    type="neutral"
                                    label="Batal"
                                    onClick={() => {
                                        $updateSuspendCrimeDetail = false;
                                    }}><SvgXMark /></TextIconButton
                                >
                                <TextIconButton
                                    type="primary"
                                    label="Simpan"
                                    onClick={() => {}}
                                    ><SvgCheck /></TextIconButton
                                >
                            {/if}
                        </ContentHeader>
                        <hr />
                        <CustomTextField
                            disabled={true}
                            id="suspensionType"
                            label="Jenis Prosiding Tahan Kerja"
                            placeholder="-"
                            bind:val={$suspensionMeetingForm.suspensionType}
                        ></CustomTextField>
                        <ContentHeader
                            title="Butiran Tahan Kerja - {$suspensionMeetingForm.suspensionType ===
                            'Tahan Kerja - Penyiasatan'
                                ? 'Tujuan Penyiasatan'
                                : 'Prosiding Jenayah'}"
                            borderClass="border-none"
                            fontWeight="bold"
                            fontSize="small"
                            color="system-primary"
                            titlePadding={false}
                        ></ContentHeader>
                        <CustomTextField
                            disabled={true}
                            id="startDate"
                            type="date"
                            label="Tarikh Mula"
                            placeholder="-"
                            bind:val={$suspensionMeetingForm.startDate}
                        ></CustomTextField>
                        {#if $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Penyiasatan'}
                            <CustomTextField
                                disabled={true}
                                id="endDate"
                                type="date"
                                label="Tarikh Akhir - 2 Bulan Dari Tarikh Mula"
                                placeholder="-"
                                bind:val={$suspensionMeetingForm.endDate}
                            ></CustomTextField>
                        {/if}
                        <CustomTextField
                            disabled={true}
                            id="eligibleEmolumen"
                            label="Emolumen Yang Layak Diterima"
                            placeholder="-"
                            bind:val={$suspensionMeetingForm.eligibleEmolumen}
                        ></CustomTextField>

                        {#if $updateSuspendCrimeDetail || $suspensionCriminalDetailForm.proceedingAction !== ''}
                            <CustomRadioField
                                disabled={!$updateSuspendCrimeDetail}
                                errors={$suspensionCriminalDetailFormErrors.proceedingAction}
                                id="proceedingAction"
                                label="Keputusan Mesyuarat"
                                options={data.lookups.proceedingActionOptions}
                                bind:val={$suspensionCriminalDetailForm.proceedingAction}
                            ></CustomRadioField>
                        {/if}
                    </div>
                    {#if $suspensionCriminalDetailForm.proceedingAction === 'Rayuan dikemukakan'}
                        <div
                            class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                        >
                            <form
                                id="suspensionCriminalDetailForm"
                                method="POST"
                                use:suspensionCriminalDetailFormEnhance
                            >
                                <!-- Gantung Kerja Section -->
                                <ContentHeader
                                    title="Butiran Gantung Kerja"
                                    borderClass="border-none"
                                    titlePadding={false}
                                    >{#if !$updateCrimeOffenceAppealSuspendedInfo}
                                        <TextIconButton
                                            type="primary"
                                            label="Kemaskini"
                                            onClick={() => {
                                                $updateCrimeOffenceAppealSuspendedInfo = true;
                                            }}><SvgEdit /></TextIconButton
                                        >
                                    {:else if $updateCrimeOffenceAppealSuspendedInfo}
                                        <TextIconButton
                                            type="neutral"
                                            label="Batal"
                                            onClick={() => {
                                                $updateCrimeOffenceAppealSuspendedInfo = false;
                                            }}><SvgXMark /></TextIconButton
                                        >
                                        <TextIconButton
                                            type="primary"
                                            label="Simpan"
                                            onClick={() => {}}
                                            ><SvgCheck /></TextIconButton
                                        >
                                    {/if}
                                </ContentHeader>

                                <CustomTextField
                                    disabled={!$updateCrimeOffenceAppealSuspendedInfo}
                                    errors={$suspensionCriminalDetailFormErrors.startDate}
                                    id="startDate"
                                    type="date"
                                    label="Tarikh Mula"
                                    placeholder="-"
                                    bind:val={$suspensionMeetingForm.startDate}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={true}
                                    id="eligibleEmolumen"
                                    label="Emolumen Yang Layak Diterima"
                                    placeholder="-"
                                    bind:val={$suspensionMeetingForm.eligibleEmolumen}
                                ></CustomTextField>

                                <div class="flex w-full flex-row items-center">
                                    <label
                                        for="appeal"
                                        class="mr-2.5 flex w-fit flex-row text-sm font-medium italic text-system-primary"
                                    >
                                        Batal Gantung Kerja</label
                                    >
                                    <Checkbox
                                        disabled={!$updateCrimeOffenceAppealSuspendedInfo}
                                        value="suspended-appeal-follow-through"
                                        bind:checked={$suspensionMeetingForm.meetingResult}
                                    />
                                </div>
                            </form>
                        </div>
                    {:else if $suspensionCriminalDetailForm.proceedingAction === 'Prosiding Penentu Hukuman'}
                        <div
                            class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                        >
                            Hukuman..
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if $isReadOnlyProceedingSuspensionMeeting}
            <StepperContent>
                <StepperContentHeader
                    title="Pengesahan Pengarah Integriti - Tahan Kerja/Gantung Kerja"
                >
                    {#if !$isReadOnlyProceedingSuspensionConfirmation && data.roles.isIntegrityDirectorRole}
                        <TextIconButton
                            type="primary"
                            label="Simpan"
                            form="appealConfirmationForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    <div class="flex w-full flex-col gap-2.5">
                        {#if !$isReadOnlyProceedingSuspensionConfirmation && data.roles.isIntegrityDirectorRole}
                            <form
                                id="appealConfirmationForm"
                                method="POST"
                                use:appealConfirmationFormEnhance
                                class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                            >
                                <div class="mb-5">
                                    <b class="text-sm text-system-primary"
                                        >Pengarah Integriti</b
                                    >
                                </div>
                                <CustomTextField
                                    disabled={$isReadOnlyProceedingSuspensionConfirmation}
                                    errors={$appealConfirmationFormErrors.remark}
                                    id="approverRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$appealConfirmationForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled={$isReadOnlyProceedingSuspensionConfirmation}
                                    errors={$appealConfirmationFormErrors.status}
                                    id="approverIsApproved"
                                    options={certifyOptions}
                                    label={'Keputusan'}
                                    bind:val={$appealConfirmationForm.status}
                                ></CustomSelectField>
                            </form>
                        {/if}

                        <div
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            {#if $isReadOnlyProceedingSuspensionConfirmation}
                                <CustomTextField
                                    disabled
                                    id="integrityDirectorRemark"
                                    label="Tindakan/Ulasan"
                                    bind:val={$appealConfirmationForm.remark}
                                ></CustomTextField>
                                <CustomSelectField
                                    disabled
                                    id="integrityDirectorStatus"
                                    options={certifyOptions}
                                    label={'Keputusan'}
                                    bind:val={$appealConfirmationForm.status}
                                ></CustomSelectField>
                            {:else}
                                <StepperOtherRolesResult />
                            {/if}
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    {/if}
</Stepper>

<Toaster />
