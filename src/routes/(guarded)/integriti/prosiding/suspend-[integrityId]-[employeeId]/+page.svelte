<script lang="ts">
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import {
        certifyOptions,
        proceedingMeetingOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { Badge, Button, Checkbox } from 'flowbite-svelte';
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
        _proceedingSuspensionCriminalDetailSchema,
        _proceedingSuspensionSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import {
        _addSentencingIntegrityDirectorApproval,
        _updateSuspensionCriminalDetail,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addSuspensionDetailForm } from '../tambah-prosiding/[employeeId]/+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    export let data: PageData;

    let proceedingChargeIsCertified = writable<boolean>(false);
    let proceedingSuspensionIsCertified = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionMeeting = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionConfirmation = writable<boolean>(false);
    let updateSuspendCrimeDetail = writable<boolean>(false);
    let updateCrimeOffenceAppealSuspendedInfo = writable<boolean>(false);
    let updateSuspendCrimePenaltyDetails = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionCriminal = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionCriminalAppeal = writable<boolean>(false);

    $: {
        data.view.proceedingTypeSuspensionCriminalView.proceedingAction
            ? isReadOnlyProceedingSuspensionCriminal.set(true)
            : isReadOnlyProceedingSuspensionCriminal.set(false);

        data.view.proceedingTypeSuspensionCriminalView
            ? isReadOnlyProceedingSuspensionCriminalAppeal.set(true)
            : isReadOnlyProceedingSuspensionCriminalAppeal.set(false);
    }
    // Superforms
    const { form } = superForm(data.forms.proceedingStaffInfoForm, {
        SPA: true,
        dataType: 'json',
        validators: false,
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
        validators: zod(_proceedingSuspensionCriminalDetailSchema),
        taintedMessage: false,
        onChange() {
            $suspensionCriminalDetailForm.proceedingAction ===
            'Rayuan dikemukakan'
                ? ($suspensionCriminalDetailForm.eligibleEmolumen = 0)
                : ($suspensionCriminalDetailForm.eligibleEmolumen = null);
        },
        onSubmit() {
            _updateSuspensionCriminalDetail($suspensionCriminalDetailForm);
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

    // Function to create or remove sentencings
    const addSentencing = () => {
        const newSentencingObject = {
            emolumenDate: [
                {
                    startDate: null,
                    endDate: null,
                },
            ],
        };

        $suspensionCriminalDetailForm.meetingResult.sentencing = [
            ...$suspensionCriminalDetailForm.meetingResult.sentencing,
            newSentencingObject,
        ];
    };

    const removeSentencing = (indexToDelete: number) => {
        $suspensionCriminalDetailForm.meetingResult.sentencing =
            $suspensionCriminalDetailForm.meetingResult.sentencing.filter(
                (_, i) => i !== indexToDelete,
            );
    };

    const addSentencingEmolumenDate = (firstIndex: number) => {
        const emolumenDateObject = {
            startDate: null,
            endDate: null,
        };

        $suspensionCriminalDetailForm.meetingResult.sentencing[
            firstIndex
        ].emolumenDate = [
            ...$suspensionCriminalDetailForm.meetingResult.sentencing[
                firstIndex
            ].emolumenDate,
            emolumenDateObject,
        ];
    };

    const removeSentencingEmolumenDate = (
        firstIndex: number,
        indexToDelete: number,
    ) => {
        $suspensionCriminalDetailForm.meetingResult.sentencing[
            firstIndex
        ].emolumenDate = $suspensionCriminalDetailForm.meetingResult.sentencing[
            firstIndex
        ].emolumenDate.filter((_, i) => i !== indexToDelete);
    };
</script>

<ContentHeader title="Maklumat Prosiding Tatatertib">
    {#if $proceedingSuspensionIsCertified}
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
                    form="suspensionCriminalUpdateForm"
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
                    <!-- Hidden for the time being!!!! -->
                    <CustomRadioField
                        disabled={true}
                        id="currentGrade"
                        label="Keputusan Mesyuarat"
                        options={proceedingMeetingOptions}
                        bind:val={$suspensionMeetingForm.suspendMeetingResult}
                    ></CustomRadioField>
                    {#if $suspensionMeetingForm.suspendMeetingResult}
                        <div
                            class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                        >
                            <ContentHeader
                                title="Maklumat Keputusan Mesyuarat Prosiding - Tahan Kerja"
                                borderClass="border-none"
                                titlePadding={false}
                            >
                                {#if !$suspensionCriminalDetailForm.proceedingAction && $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Prosiding Jenayah'}
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
                            {#if ($updateSuspendCrimeDetail || $suspensionCriminalDetailForm.proceedingAction) && $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Prosiding Jenayah'}
                                <CustomRadioField
                                    disabled={!$updateSuspendCrimeDetail}
                                    errors={$suspensionCriminalDetailFormErrors.proceedingAction}
                                    id="proceedingAction"
                                    label="Keputusan Mesyuarat"
                                    options={data.lookups
                                        .proceedingActionOptions}
                                    bind:val={$suspensionCriminalDetailForm.proceedingAction}
                                ></CustomRadioField>
                            {/if}
                        </div>
                        {#if $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Prosiding Jenayah'}
                            {#if $suspensionCriminalDetailForm.proceedingAction === 'Rayuan dikemukakan'}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                                >
                                    <form
                                        id="suspensionCriminalUpdateForm"
                                        method="POST"
                                        use:suspensionCriminalDetailFormEnhance
                                    >
                                        <!-- Gantung Kerja Section -->
                                        <ContentHeader
                                            title="Butiran Gantung Kerja"
                                            borderClass="border-none"
                                            titlePadding={false}
                                        >
                                            {#if $isReadOnlyProceedingSuspensionCriminal}
                                                {#if !$updateCrimeOffenceAppealSuspendedInfo}
                                                    <TextIconButton
                                                        type="primary"
                                                        label="Kemaskini"
                                                        onClick={() => {
                                                            $updateCrimeOffenceAppealSuspendedInfo = true;
                                                        }}
                                                        ><SvgEdit
                                                        /></TextIconButton
                                                    >
                                                {:else if $updateCrimeOffenceAppealSuspendedInfo}
                                                    <TextIconButton
                                                        type="neutral"
                                                        label="Batal"
                                                        onClick={() => {
                                                            $updateCrimeOffenceAppealSuspendedInfo = false;
                                                        }}
                                                        ><SvgXMark
                                                        /></TextIconButton
                                                    >
                                                    <TextIconButton
                                                        type="primary"
                                                        label="Simpan"
                                                        onClick={() => {}}
                                                        ><SvgCheck
                                                        /></TextIconButton
                                                    >
                                                {/if}
                                            {/if}
                                        </ContentHeader>

                                        <CustomTextField
                                            disabled={!$updateCrimeOffenceAppealSuspendedInfo}
                                            errors={$suspensionCriminalDetailFormErrors.startDate}
                                            id="startDate"
                                            type="date"
                                            label="Tarikh Mula"
                                            placeholder="-"
                                            bind:val={$suspensionCriminalDetailForm.startDate}
                                        ></CustomTextField>
                                        <CustomTextField
                                            disabled={true}
                                            id="eligibleEmolumen"
                                            label="Emolumen Yang Layak Diterima"
                                            placeholder="-"
                                            bind:val={$suspensionCriminalDetailForm.eligibleEmolumen}
                                        ></CustomTextField>

                                        <div
                                            class="flex w-full flex-row items-center"
                                        >
                                            <label
                                                for="appeal"
                                                class="mr-2.5 flex w-fit flex-row text-sm font-medium italic text-system-primary"
                                            >
                                                Batal Gantung Kerja</label
                                            >
                                            <Checkbox
                                                disabled={!$updateCrimeOffenceAppealSuspendedInfo}
                                                value="suspended-appeal-follow-through"
                                                checked={false}
                                            />
                                        </div>
                                    </form>
                                </div>
                            {:else if $suspensionCriminalDetailForm.proceedingAction === 'Prosiding Penentu Hukuman'}
                                <div
                                    class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                                >
                                    <form
                                        id="suspensionCriminalUpdateForm"
                                        method="POST"
                                        use:suspensionCriminalDetailFormEnhance
                                        class="flex w-full flex-col items-center gap-2"
                                    >
                                        <input
                                            hidden
                                            type="text"
                                            bind:value={$suspensionCriminalDetailForm.integrityId}
                                        />
                                        <CustomTextField
                                            disabled={$updateSuspendCrimePenaltyDetails}
                                            errors={$suspensionCriminalDetailFormErrors.meetingDate}
                                            id="meetingDate"
                                            label="Tarikh Mesyuarat"
                                            type="date"
                                            placeholder="-"
                                            bind:val={$suspensionCriminalDetailForm.meetingDate}
                                        ></CustomTextField>
                                        <CustomTextField
                                            disabled={$updateSuspendCrimePenaltyDetails}
                                            errors={$suspensionCriminalDetailFormErrors.meetingCount}
                                            id="meetingCount"
                                            label="Bil Mesyuarat"
                                            placeholder="-"
                                            type="number"
                                            bind:val={$suspensionCriminalDetailForm.meetingCount}
                                        ></CustomTextField>
                                        <CustomTextField
                                            disabled={$updateSuspendCrimePenaltyDetails}
                                            errors={$suspensionCriminalDetailFormErrors.meetingName}
                                            id="meetingName"
                                            label="Nama Mesyuarat"
                                            placeholder="-"
                                            bind:val={$suspensionCriminalDetailForm.meetingName}
                                        ></CustomTextField>
                                        <div
                                            class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                                        >
                                            <ContentHeader
                                                title="Pertuduhan"
                                                color="system-primary"
                                                fontWeight="bold"
                                                borderClass="border-none"
                                            />

                                            <hr />
                                            <div
                                                class="flex w-full flex-row items-center gap-x-2.5 border-b text-base"
                                            >
                                                <CustomRadioField
                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                    id="currentGrade"
                                                    label="Keputusan Mesyuarat"
                                                    options={proceedingMeetingOptions}
                                                    bind:val={$suspensionCriminalDetailForm
                                                        .meetingResult.result}
                                                ></CustomRadioField>
                                            </div>
                                            {#if $suspensionCriminalDetailForm.meetingResult.result}
                                                <ContentHeader
                                                    title="Penentuan Hukuman"
                                                    borderClass="border-none"
                                                >
                                                    {#if data.roles.isIntegritySecretaryRole}
                                                        <div class="mr-2">
                                                            <TextIconButton
                                                                type="primary"
                                                                onClick={() => {
                                                                    addSentencing();
                                                                }}
                                                                label="Tambah Hukuman"
                                                                ><SvgPlus
                                                                /></TextIconButton
                                                            >
                                                        </div>
                                                    {/if}
                                                </ContentHeader>
                                                <hr />
                                                <!-- List of sentencings, can be multiple -->
                                                {#each $suspensionCriminalDetailForm.meetingResult.sentencing as _, i}
                                                    <div
                                                        class="w-full border-l-4 border-r-4 px-2.5"
                                                    >
                                                        <ContentHeader
                                                            title="Hukuman #{i +
                                                                1}"
                                                            fontSize="small"
                                                            fontWeight="bold"
                                                            borderClass="border-none"
                                                            color="system-primary"
                                                        >
                                                            {#if data.roles.isIntegritySecretaryRole}
                                                                <div
                                                                    class="w-12"
                                                                >
                                                                    <Button
                                                                        outline={false}
                                                                        on:click={() => {
                                                                            removeSentencing(
                                                                                i,
                                                                            );
                                                                        }}
                                                                        ><span
                                                                            class="text-red-600"
                                                                            ><SvgMinusCircle
                                                                            /></span
                                                                        ></Button
                                                                    >
                                                                </div>
                                                            {/if}
                                                        </ContentHeader>
                                                        <CustomSelectField
                                                            disabled={$updateSuspendCrimePenaltyDetails}
                                                            id="title"
                                                            label="Jenis Hukuman"
                                                            options={data
                                                                .lookups
                                                                .penaltyCodeLookup}
                                                            placeholder="-"
                                                            bind:val={$suspensionCriminalDetailForm
                                                                .meetingResult
                                                                .sentencing[i]
                                                                .penaltyTypeCode}
                                                        ></CustomSelectField>

                                                        {#if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode}
                                                            {#if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '01'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '02'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Hari Emolumen"
                                                                    placeholder="-"
                                                                    type="number"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .emolumenRight}

                                                                ></CustomTextField>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '03'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Hari Emolumen"
                                                                    placeholder="-"
                                                                    type="number"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .emolumenRight}

                                                                ></CustomTextField>
                                                                <div
                                                                    class="w-full space-y-2 border-l-4 border-r-4 px-2.5"
                                                                >
                                                                    <ContentHeader
                                                                        title="Tarikh Dilucutkan Hak Emolumen"
                                                                    >
                                                                        {#if !$updateSuspendCrimePenaltyDetails}
                                                                            <div
                                                                                class="mr-2"
                                                                            >
                                                                                <TextIconButton
                                                                                    type="primary"
                                                                                    onClick={() => {
                                                                                        addSentencingEmolumenDate(
                                                                                            i,
                                                                                        );
                                                                                    }}
                                                                                    label=""
                                                                                    ><SvgPlus
                                                                                    /></TextIconButton
                                                                                >
                                                                            </div>
                                                                        {/if}
                                                                    </ContentHeader>
                                                                    {#if $suspensionCriminalDetailForm.meetingResult.sentencing[i].emolumenDate}
                                                                        {#each $suspensionCriminalDetailForm.meetingResult.sentencing[i].emolumenDate as _, j}
                                                                            <div
                                                                                class="flex w-full flex-row items-center gap-x-2.5 text-base"
                                                                            >
                                                                                <span
                                                                                    class="w-[220px] text-sm italic"
                                                                                    >Tarikh
                                                                                    #{j +
                                                                                        1}.</span
                                                                                >
                                                                                <CustomTextField
                                                                                    id="startDate"
                                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                                    type="date"
                                                                                    label={'Tarikh Mula'}
                                                                                    bind:val={$suspensionCriminalDetailForm
                                                                                        .meetingResult
                                                                                        .sentencing[
                                                                                        i
                                                                                    ]
                                                                                        .emolumenDate[
                                                                                        j
                                                                                    ]
                                                                                        .startDate}

                                                                                ></CustomTextField>
                                                                                <CustomTextField
                                                                                    id="endDate"
                                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                                    type="date"
                                                                                    label={'Hingga'}
                                                                                    bind:val={$suspensionCriminalDetailForm
                                                                                        .meetingResult
                                                                                        .sentencing[
                                                                                        i
                                                                                    ]
                                                                                        .emolumenDate[
                                                                                        j
                                                                                    ]
                                                                                        .endDate}

                                                                                ></CustomTextField>
                                                                                {#if !$updateSuspendCrimePenaltyDetails}
                                                                                    <div
                                                                                        class="w-12"
                                                                                    >
                                                                                        <Button
                                                                                            outline={false}
                                                                                            on:click={() => {
                                                                                                removeSentencingEmolumenDate(
                                                                                                    i,
                                                                                                    j,
                                                                                                );
                                                                                            }}
                                                                                            ><span
                                                                                                class="text-red-600"
                                                                                                ><SvgMinusCircle
                                                                                                /></span
                                                                                            ></Button
                                                                                        >
                                                                                    </div>
                                                                                {/if}
                                                                            </div>
                                                                        {/each}
                                                                    {/if}
                                                                </div>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '04'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                                <CustomSelectField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tempoh Bulan Tangguh Pergerakan Gaji"
                                                                    options={data
                                                                        .lookups
                                                                        .salaryMovementDelayMonthCountLookup}
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ].duration}

                                                                ></CustomSelectField>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '05'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                                <CustomSelectField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Bilangan Pergerakan Gaji"
                                                                    options={data
                                                                        .lookups
                                                                        .salaryMovementCountLookup}
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .salaryMovementCount}

                                                                ></CustomSelectField>
                                                                <CustomSelectField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tempoh Hukuman (Bulan)"
                                                                    options={data
                                                                        .lookups
                                                                        .sentencingMonthLookup}
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .sentencingMonth}

                                                                ></CustomSelectField>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '06'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                                <!-- <CustomSelectField
                                                    disabled={true}
                                                    id="title"
                                                    label="Gred Semasa"
                                                    bind:val={$suspensionCriminalDetailForm
                                                        .meetingResult
                                                        .sentencing[i]
                                                        .emolumenRight}
                                                ></CustomSelectField> -->
                                                                <CustomSelectField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    options={data
                                                                        .lookups
                                                                        .gradeLookup}
                                                                    label="Gred Baru"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .newGradeCode}

                                                                ></CustomSelectField>
                                                            {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '07'}
                                                                <CustomTextField
                                                                    disabled={$updateSuspendCrimePenaltyDetails}
                                                                    id="title"
                                                                    label="Tarikh Berkuatkuasa"
                                                                    placeholder="-"
                                                                    type="date"
                                                                    bind:val={$suspensionCriminalDetailForm
                                                                        .meetingResult
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .effectiveDate}

                                                                ></CustomTextField>
                                                            {/if}
                                                        {/if}
                                                    </div>
                                                    <hr />
                                                {/each}
                                            {/if}
                                        </div>
                                    </form>
                                </div>
                            {/if}
                        {/if}
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
