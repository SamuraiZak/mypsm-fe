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
        _proceedingApproverSchema,
        _proceedingSentencingMeetingSchema,
        _proceedingSuspensionCriminalCancelSchema,
        _proceedingSuspensionCriminalDetailSchema,
        _proceedingSuspensionViewSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import {
        _addCriminalCancelIntegrityDirectorConfirmation,
        _addSentencingIntegrityDirectorApproval,
        _addSuspendsIntegrityDirectorConfirmation,
        _updateSuspensionCriminalCancelDetail,
        _updateSuspensionCriminalDetail,
    } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addSuspensionDetailForm } from '../add-proceeding/[employeeId]/+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    export let data: PageData;

    let proceedingSuspendsIsApproved = writable<boolean>(false);
    let updateSuspendCrimeDetail = writable<boolean>(false);
    let updateCrimeOffenceAppealSuspendedInfo = writable<boolean>(false);
    let isReadOnlyProceedingSuspendsConfirmation = writable<boolean>(false);
    let isReadOnlyProceedingSuspensionCriminal = writable<boolean>(false);
    let isReadOnlyProceedingEndedGantungKerja = writable<boolean>(false);
    let isGantungKerjaEnded = writable<boolean>(false);

    $: {
        data.view.proceedingTypeSuspensionView.editCriminalDetail
            ? isReadOnlyProceedingSuspensionCriminal.set(true)
            : isReadOnlyProceedingSuspensionCriminal.set(false);

        if (data.view.proceedingTypeSuspensionView.cancelCriminalDetail) {
            isReadOnlyProceedingEndedGantungKerja.set(true);

            if (
                data.view.proceedingTypeSuspensionView.cancelCriminalDetail
                    .cancelSuspend === true
            ) {
                isReadOnlyProceedingEndedGantungKerja.set(true);
                isGantungKerjaEnded.set(true);
            } else {
                isReadOnlyProceedingEndedGantungKerja.set(false);
                isGantungKerjaEnded.set(false);
            }
        } else {
            isReadOnlyProceedingEndedGantungKerja.set(false);
        }

        if (data.view.proceedingTypeSuspensionView.confirmation) {
            data.view.proceedingTypeSuspensionView.confirmation.status
                ? proceedingSuspendsIsApproved.set(true)
                : proceedingSuspendsIsApproved.set(false);

            isReadOnlyProceedingSuspendsConfirmation.set(true);
        } else isReadOnlyProceedingSuspendsConfirmation.set(false);
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
        form: sentencingConfirmationForm,
        errors: sentencingConfirmationFormErrors,
        enhance: sentencingConfirmationFormEnhance,
    } = superForm(data.forms.proceedingSuspendsConfirmationForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_proceedingApproverSchema),
        taintedMessage: false,
        onSubmit() {
            $sentencingConfirmationForm.integrityId = Number(
                data.params.integrityId,
            );

            $suspensionMeetingForm.suspensionType ===
            'Tahan Kerja - Prosiding Jenayah'
                ? _addCriminalCancelIntegrityDirectorConfirmation(
                      $sentencingConfirmationForm,
                  )
                : _addSuspendsIntegrityDirectorConfirmation(
                      $sentencingConfirmationForm,
                  );
        },
    });

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
            $suspensionCriminalDetailForm.eligibleEmolumen = 0;
        },
        onSubmit() {
            $suspensionCriminalDetailForm.integrityId = Number(
                data.params.integrityId,
            );
            $suspensionCriminalDetailForm.meetingCode = '21';

            _updateSuspensionCriminalDetail($suspensionCriminalDetailForm);
        },
    });

    const { form: endGantungKerjaForm, enhance: endGantungKerjaFormEnhance } =
        superForm(data.forms.proceedingCriminalEndGantungKerjaForm, {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_proceedingSuspensionCriminalCancelSchema),
            taintedMessage: false,
            onSubmit() {
                $endGantungKerjaForm.integrityId = Number(
                    data.params.integrityId,
                );

                _updateSuspensionCriminalCancelDetail($endGantungKerjaForm);
            },
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
    {#if $isReadOnlyProceedingSuspensionCriminal || $isReadOnlyProceedingEndedGantungKerja}
        <Badge color="indigo">Dikemaskini</Badge>
    {/if}
    {#if $isReadOnlyProceedingSuspendsConfirmation && $proceedingSuspendsIsApproved && !$isReadOnlyProceedingEndedGantungKerja}
        <Badge color="green">Proses Prosiding - Tahan Kerja Sah</Badge>
    {:else if $isReadOnlyProceedingEndedGantungKerja}
        <Badge color="dark">Proses Prosiding - Gantung Kerja Tamat</Badge>
    {:else if $isReadOnlyProceedingSuspendsConfirmation && !$proceedingSuspendsIsApproved}
        <Badge color="red"
            >Proses Prosiding - Tahan/Gantung Kerja Tidak Sah</Badge
        >
    {/if}

    <TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../proceeding');
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
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.fullName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.identityDocumentNumber}
                ></CustomTextField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="icColour"
                    label={'Jenis Kad Pengenalan'}
                    placeholder="-"
                    options={data.lookups.identityCardColorLookup}
                    bind:val={$form.employeeDetail.icColour}
                ></CustomSelectField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="email"
                    label={'Emel'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.email}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="birthplace"
                    label="Tempat Lahir"
                    placeholder="-"
                    bind:val={$form.employeeDetail.birthplace}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="nationality"
                    label="Warganegara"
                    placeholder="-"
                    bind:val={$form.employeeDetail.nationality}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="race"
                    label="Bangsa"
                    placeholder="-"
                    bind:val={$form.employeeDetail.race}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="ethnic"
                    label="Etnik"
                    placeholder="-"
                    bind:val={$form.employeeDetail.ethnic}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="religion"
                    label="Agama"
                    placeholder="-"
                    bind:val={$form.employeeDetail.religion}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="gender"
                    label="Jantina"
                    placeholder="-"
                    bind:val={$form.employeeDetail.gender}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="marital"
                    label="Status Perkahwinan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.marital}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="homeAddress"
                    label="Alamat Rumah"
                    placeholder="-"
                    bind:val={$form.employeeDetail.homeAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    placeholder="-"
                    bind:val={$form.employeeDetail.mailAddress}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="houseLoanType"
                    label="Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoanType}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="houseLoan"
                    label="Pinjaman Perumahan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.houseLoan}
                />

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="vehicleLoan"
                    label="Pinjaman Kenderaan"
                    placeholder="-"
                    bind:val={$form.employeeDetail.vehicleLoan}
                />

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isExPolice"
                    label="Bekas Polis / Tentera"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isExPolice}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                <CustomSelectField
                    disabled
                    isRequired={false}
                    id="isRelatedToLKIM"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    placeholder="-"
                    bind:val={$form.employeeDetail.isRelatedToLKIM}
                    options={data.lookups.generalLookup}
                ></CustomSelectField>

                {#if $form.employeeDetail.isRelatedToLKIM}
                    <CustomTextField
                        id="employeeNumber"
                        disabled
                        isRequired={false}
                        label="No. Pekerja LKIM"
                        bind:val={$form.employeeDetail.relationDetail
                            .employeeNumber}
                    ></CustomTextField>

                    <CustomTextField
                        id="employeeName"
                        disabled
                        isRequired={false}
                        label={'Nama Kakitangan LKIM'}
                        bind:val={$form.employeeDetail.relationDetail.fullName}
                    ></CustomTextField>

                    <CustomTextField
                        id="relationDetailPosition"
                        disabled
                        isRequired={false}
                        label="Jawatan Kakitangan LKIM"
                        bind:val={$form.employeeDetail.relationDetail.position}
                    ></CustomTextField>

                    <CustomTextField
                        id="relationDetailRelationship"
                        disabled
                        isRequired={false}
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
                    isRequired={false}
                    id="currentGrade"
                    label="Gred Semasa"
                    placeholder="-"
                    bind:val={$form.serviceDetail.currentGrade}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="currentPosition"
                    label="Jawatan Semasa"
                    placeholder="-"
                    bind:val={$form.serviceDetail.currentPosition}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="placement"
                    label="Penempatan"
                    placeholder="-"
                    bind:val={$form.serviceDetail.placement}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="serviceType"
                    label="Jenis Perkhidmatan"
                    placeholder="-"
                    bind:val={$form.serviceDetail.serviceType}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="retirementBenefit"
                    label={'Faedah Persaraan'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.retirementBenefit}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="effectiveDate"
                    label={'Tarikh Kuatkuasa Lantikan Semasa'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.effectiveDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="EPFNumber"
                    label={'No. KWSP'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.EPFNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="SOCSO"
                    label={'No. SOCSO'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.SOCSO}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    isRequired={false}
                    id="taxIncome"
                    label={'No. Cukai'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.taxIncome}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="bankName"
                    label={'Bank'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.bankName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="accountNumber"
                    label={'No. Akaun'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.accountNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="program"
                    label="Program"
                    placeholder="-"
                    bind:val={$form.serviceDetail.program}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    type="number"
                    id="eligibleLeaveCount"
                    label={'Kelayakan Cuti'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.eligibleLeaveCount}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="civilServiceStartDate"
                    label={'Mula Dilantik Perkhidmatan Kerajaan'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.civilServiceStartDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="confirmServiceDate"
                    label={'Disahkan Dalam Jawatan Semasa LKIM'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.confirmServiceDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="firstEffectiveDate"
                    label={'Tarikh Berkuatkuasa Lantikan Pertama'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.firstEffectiveDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="pastAttachmentDate"
                    label={'Tarikh Percantuman Perkhidmatan Lepas'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.pastAttachmentDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="actingDate"
                    label={'Pemangkuan Sekarang'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.actingDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="interimDate"
                    label={'Tanggung Kerja Sekarang'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.interimDate}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    isRequired={false}
                    id="pensionScheme"
                    label={'Skim Pencen'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.pensionScheme}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastSalaryRaiseDate"
                    label={'Kenaikan Gaji Akhir'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.lastSalaryRaiseDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
                    id="lastPromotionDate"
                    label={'Kenaikan Pangkat Akhir'}
                    placeholder="-"
                    bind:val={$form.serviceDetail.lastPromotionDate}
                ></CustomTextField>

                <CustomTextField
                    type="date"
                    disabled
                    isRequired={false}
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
                            isRequired={false}
                            id="salaryEffectiveDate"
                            type="date"
                            label={'Tarikh Berkuatkuasa'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.salaryEffectiveDate}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="maximumSalary"
                            type="number"
                            label={'Tangga Gaji'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.maximumSalary}
                        ></CustomTextField>

                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="baseSalary"
                            label={'Gaji Pokok'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.baseSalary}
                        ></CustomTextField>
                    </div>
                    <div class="space-y-2.5">
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITKA"
                            label={'ITKA'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.ITKA}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="ITP"
                            label={'ITP'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.ITP}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
                            id="EPW"
                            label={'EPW'}
                            placeholder="-"
                            bind:val={$form.serviceDetail.EPW}
                        ></CustomTextField>
                        <CustomTextField
                            disabled
                            isRequired={false}
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
    <StepperContent>
        <StepperContentHeader
            title="Maklumat Keputusan Mesyuarat Prosiding Tahan Kerja"
        ></StepperContentHeader>
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
                            {#if $proceedingSuspendsIsApproved && !$isReadOnlyProceedingSuspensionCriminal && $isReadOnlyProceedingSuspendsConfirmation && $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Prosiding Jenayah' && data.roles.isIntegritySecretaryRole}
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
                                        type="primary"
                                        label="Simpan"
                                        form="suspensionCriminalUpdateForm"
                                        ><SvgCheck /></TextIconButton
                                    >
                                    <TextIconButton
                                        type="neutral"
                                        label="Batal"
                                        onClick={() => {
                                            $updateSuspendCrimeDetail = false;
                                        }}><SvgXMark /></TextIconButton
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
                            
                            id="eligibleEmolumen"
                            label="Emolumen Yang Layak Diterima"
                            placeholder="-"
                            bind:val={$suspensionMeetingForm.eligibleEmolumen}
                        ></CustomTextField>
                        <hr />
                        <ContentHeader
                            title="Keputusan Pengarah Integriti"
                            borderClass="border-none"
                            fontWeight="bold"
                            fontSize="small"
                            color="system-primary"
                            titlePadding={false}
                        >
                            {#if !$isReadOnlyProceedingSuspendsConfirmation && data.roles.isIntegrityDirectorRole}
                                <TextIconButton
                                    type="primary"
                                    form="suspendsConfirmationForm"
                                    label="Simpan"
                                ></TextIconButton>
                            {/if}
                        </ContentHeader>
                        <div class="flex w-full flex-col gap-2.5">
                            {#if !$isReadOnlyProceedingSuspendsConfirmation && data.roles.isIntegrityDirectorRole}
                                <form
                                    id="suspendsConfirmationForm"
                                    method="POST"
                                    use:sentencingConfirmationFormEnhance
                                    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                                >
                                    <div class="mb-5">
                                        <b class="text-sm text-system-primary"
                                            >Pengarah Integriti</b
                                        >
                                    </div>
                                    <CustomTextField
                                        disabled={$isReadOnlyProceedingSuspendsConfirmation}
                                        errors={$sentencingConfirmationFormErrors.remark}
                                        id="approverRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$sentencingConfirmationForm.remark}
                                    ></CustomTextField>
                                    <CustomRadioBoolean
                                        disabled={$isReadOnlyProceedingSuspendsConfirmation}
                                        errors={$sentencingConfirmationFormErrors.status}
                                        id="approverIsApproved"
                                        options={certifyOptions}
                                        label={'Keputusan'}
                                        bind:val={$sentencingConfirmationForm.status}
                                    ></CustomRadioBoolean>
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
                                {#if $isReadOnlyProceedingSuspendsConfirmation}
                                    <CustomTextField
                                        disabled
                                        id="integrityDirectorRemark"
                                        label="Tindakan/Ulasan"
                                        bind:val={$sentencingConfirmationForm.remark}
                                    ></CustomTextField>
                                    <CustomSelectField
                                        disabled
                                        id="integrityDirectorStatus"
                                        options={certifyOptions}
                                        label={'Keputusan'}
                                        bind:val={$sentencingConfirmationForm.status}
                                    ></CustomSelectField>
                                    <CustomTextField
                                        disabled
                                        isRequired={false}
                                        id="approvalDate"
                                        label="Tarikh Kelulusan"
                                        type="date"
                                        placeholder="-"
                                        bind:val={$sentencingConfirmationForm.approvalDate}
                                    ></CustomTextField>
                                {:else}
                                    <StepperOtherRolesResult />
                                {/if}
                            </div>
                        </div>
                        {#if ($updateSuspendCrimeDetail || $suspensionCriminalDetailForm.proceedingAction) && $suspensionMeetingForm.suspensionType === 'Tahan Kerja - Prosiding Jenayah'}
                            <hr />
                            <ContentHeader
                                title="Susulan Keputusan"
                                borderClass="border-none"
                                fontWeight="bold"
                                fontSize="small"
                                color="system-primary"
                                titlePadding={false}
                            ></ContentHeader>
                            <CustomRadioField
                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                errors={$suspensionCriminalDetailFormErrors.proceedingAction}
                                id="proceedingAction"
                                label=""
                                options={data.lookups.proceedingActionOptions}
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
                                        {#if $isReadOnlyProceedingSuspensionCriminal && !$isReadOnlyProceedingEndedGantungKerja && !$isGantungKerjaEnded}
                                            {#if !$updateCrimeOffenceAppealSuspendedInfo}
                                                <TextIconButton
                                                    type="primary"
                                                    label="Kemaskini"
                                                    onClick={() => {
                                                        $updateCrimeOffenceAppealSuspendedInfo = true;
                                                    }}
                                                    ><SvgEdit /></TextIconButton
                                                >
                                            {:else if $updateCrimeOffenceAppealSuspendedInfo}
                                                <TextIconButton
                                                    type="primary"
                                                    label="Simpan"
                                                    form="endGantungKerjaForm"
                                                    ><SvgCheck
                                                    /></TextIconButton
                                                >
                                                <TextIconButton
                                                    type="neutral"
                                                    label="Batal"
                                                    onClick={() => {
                                                        $updateCrimeOffenceAppealSuspendedInfo = false;
                                                    }}
                                                    ><SvgXMark
                                                    /></TextIconButton
                                                >
                                            {/if}
                                        {/if}
                                    </ContentHeader>

                                    <CustomTextField
                                        disabled={$isReadOnlyProceedingSuspensionCriminal}
                                        errors={$suspensionCriminalDetailFormErrors.startDate}
                                        id="startDate"
                                        type="date"
                                        label="Tarikh Mula"
                                        placeholder="-"
                                        bind:val={$suspensionCriminalDetailForm.startDate}
                                    ></CustomTextField>
                                    <CustomTextField
                                      
                                        id="eligibleEmolumen"
                                        label="Emolumen Yang Layak Diterima"
                                        placeholder="-"
                                        bind:val={$suspensionCriminalDetailForm.eligibleEmolumen}
                                    ></CustomTextField>
                                </form>

                                {#if $isReadOnlyProceedingSuspensionCriminal || $updateCrimeOffenceAppealSuspendedInfo}
                                    <form
                                        id="endGantungKerjaForm"
                                        method="POST"
                                        use:endGantungKerjaFormEnhance
                                        class="flex w-full flex-row items-center"
                                    >
                                        <label
                                            for="appeal"
                                            class="mr-2.5 flex h-9 items-center justify-center bg-ios-backgroundColors-systemBackground-light text-sm font-normal text-ios-labelColors-secondaryLabel-light"
                                        >
                                            Batal Gantung Kerja</label
                                        >
                                        <Checkbox
                                            class={$isGantungKerjaEnded
                                                ? 'text-ios-labelColors-secondaryLabel-light'
                                                : ''}
                                            disabled={!$updateCrimeOffenceAppealSuspendedInfo ||
                                                $isGantungKerjaEnded}
                                            value="cancelSuspend"
                                            bind:checked={$endGantungKerjaForm.cancelSuspend}
                                        />
                                    </form>
                                {/if}
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
                                        disabled={$isReadOnlyProceedingSuspensionCriminal}
                                        errors={$suspensionCriminalDetailFormErrors.meetingDate}
                                        id="meetingDate"
                                        label="Tarikh Mesyuarat"
                                        type="date"
                                        placeholder="-"
                                        bind:val={$suspensionCriminalDetailForm.meetingDate}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={$isReadOnlyProceedingSuspensionCriminal}
                                        errors={$suspensionCriminalDetailFormErrors.meetingCount}
                                        id="meetingCount"
                                        label="Bil Mesyuarat"
                                        placeholder="-"
                                        type="number"
                                        bind:val={$suspensionCriminalDetailForm.meetingCount}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                            title="Tahan Kerja - Penentuan Hukuman"
                                            color="system-primary"
                                            fontWeight="bold"
                                            borderClass="border-none"
                                        />

                                        <hr />
                                        <div
                                            class="flex w-full flex-row items-center gap-x-2.5 border-b text-base"
                                        >
                                            <CustomRadioField
                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                {#if data.roles.isIntegritySecretaryRole && !$isReadOnlyProceedingSuspensionCriminal}
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
                                                        title="Hukuman #{i + 1}"
                                                        fontSize="small"
                                                        fontWeight="bold"
                                                        borderClass="border-none"
                                                        color="system-primary"
                                                    >
                                                        {#if data.roles.isIntegritySecretaryRole && !$isReadOnlyProceedingSuspensionCriminal}
                                                            <div class="w-12">
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
                                                        disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                        id="title"
                                                        label="Jenis Hukuman"
                                                        options={data.lookups
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
                                                            ></CustomTextField>
                                                        {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '02'}
                                                            <CustomTextField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
                                                            ></CustomTextField>
                                                            <CustomTextField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Hari Emolumen"
                                                                placeholder="1-7"
                                                                type="number"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].emolumenRight}
                                                            ></CustomTextField>
                                                        {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '03'}
                                                            <CustomTextField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
                                                            ></CustomTextField>
                                                            <CustomTextField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Hari Emolumen"
                                                                placeholder="-"
                                                                type="number"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].emolumenRight}
                                                            ></CustomTextField>
                                                            <div
                                                                class="w-full space-y-2 border-l-4 border-r-4 px-2.5"
                                                            >
                                                                <ContentHeader
                                                                    title="Tarikh Dilucutkan Hak Emolumen"
                                                                >
                                                                    {#if data.roles.isIntegritySecretaryRole && !$isReadOnlyProceedingSuspensionCriminal}
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
                                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                                            {#if !$isReadOnlyProceedingSuspensionCriminal}
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
                                                            ></CustomTextField>
                                                            <CustomSelectField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
                                                            ></CustomTextField>
                                                            <CustomSelectField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
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
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                options={data
                                                                    .lookups
                                                                    .gradeLookup}
                                                                label="Gred Baru"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].newGradeCode}

                                                            ></CustomSelectField>
                                                        {:else if $suspensionCriminalDetailForm.meetingResult.sentencing[i].penaltyTypeCode === '07'}
                                                            <CustomTextField
                                                                disabled={$isReadOnlyProceedingSuspensionCriminal}
                                                                id="title"
                                                                label="Tarikh Berkuatkuasa"
                                                                placeholder="-"
                                                                type="date"
                                                                bind:val={$suspensionCriminalDetailForm
                                                                    .meetingResult
                                                                    .sentencing[
                                                                    i
                                                                ].effectiveDate}
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
                        {:else}
                            <form
                                id="suspensionCriminalUpdateForm"
                                method="POST"
                                use:suspensionCriminalDetailFormEnhance
                            ></form>
                        {/if}
                    {/if}
                {/if}
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
