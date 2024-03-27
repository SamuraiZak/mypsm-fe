<script lang="ts">
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import {
        certifyOptions,
        proceedingMeetingOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import { Button } from 'flowbite-svelte';
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
    import StepperFailStatement from '$lib/components/stepper/StepperFailStatement.svelte';
    import StepperOtherRolesResult from '$lib/components/stepper/StepperOtherRolesResult.svelte';
    import { writable } from 'svelte/store';
    import {
        _proceedingSentencingMeetingSchema,
        _sentenceSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-charge-scheme';
    import type { ProceedingSentenceRequestDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-create-sentencing-meeting-request.dto';
    import { _addSentencingMeeting } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    export let data: PageData;
    let isReadonlyProceedingChargeIntegrityDirectorApproval =
        writable<boolean>(true);

    let proceedingChargeIsCertified = writable<boolean>(false);
    let isReadOnlyProceedingChargeMeeting = writable<boolean>(false);
    let isReadOnlyProceedingChargeConfirmation = writable<boolean>(false);
    let isReadOnlyProceedingSentencingMeeting = writable<boolean>(false);
    let isReadOnlyProceedingSentencingConfirmation = writable<boolean>(false);

    $: {
        data.view.proceedingTypeChargeDetailView.accusationList.accusationList
            .length > 0
            ? isReadOnlyProceedingChargeMeeting.set(true)
            : isReadOnlyProceedingChargeMeeting.set(false);

        data.view.proceedingTypeChargeDetailView.confirmation.status !== null
            ? isReadOnlyProceedingChargeConfirmation.set(true)
            : isReadOnlyProceedingChargeConfirmation.set(false);

        data.view.proceedingTypeChargeDetailView.sentencingDetails
            .meetingName !== ''
            ? isReadOnlyProceedingSentencingMeeting.set(true)
            : isReadOnlyProceedingSentencingMeeting.set(false);

        data.view.proceedingTypeChargeDetailView.sentencingConfirmation
            .status !== null
            ? isReadOnlyProceedingSentencingConfirmation.set(true)
            : isReadOnlyProceedingSentencingConfirmation.set(false);
    }

    // Superforms
    const { form } = superForm(data.forms.proceedingStaffInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: false,
        taintedMessage: false,
    });

    const { form: chargesMeetingForm, enhance: chargesMeetingFormErrors } =
        superForm(data.forms.proceedingChargesMeetingForm, {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
            taintedMessage: false,
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
        onSubmit() {},
    });

    const { form: chargesListForm } = superForm(
        data.forms.proceedingChargesListForm,
        {
            SPA: true,
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: false,
            taintedMessage: false,
        },
    );

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

    const addSentencing = (index: number) => {
        const newSentencingObject = {
            emolumenDate: [
                {
                    startDate: null,
                    endDate: null,
                },
            ],
        };

        $sentencingMeetingForm.meetingResult[index].sentencing = [
            ...$sentencingMeetingForm.meetingResult[index].sentencing,
            newSentencingObject,
        ];
    };
    const removeSentencing = (index: number, indexToDelete: number) => {
        $sentencingMeetingForm.meetingResult[index].sentencing =
            $sentencingMeetingForm.meetingResult[index].sentencing.filter(
                (_, i) => i !== indexToDelete,
            );
    };

    const addSentencingEmolumenDate = (
        firstIndex: number,
        secondIndex: number,
    ) => {
        const emolumenDateObject = {
            startDate: null,
            endDate: null,
        };

        $sentencingMeetingForm.meetingResult[firstIndex].sentencing[
            secondIndex
        ].emolumenDate = [
            ...$sentencingMeetingForm.meetingResult[firstIndex].sentencing[
                secondIndex
            ].emolumenDate,
            emolumenDateObject,
        ];
    };

    const removeSentencingEmolumenDate = (
        firstIndex: number,
        secondIndex: number,
        indexToDelete: number,
    ) => {
        $sentencingMeetingForm.meetingResult[firstIndex].sentencing[
            secondIndex
        ].emolumenDate = $sentencingMeetingForm.meetingResult[
            firstIndex
        ].sentencing[secondIndex].emolumenDate.filter(
            (_, i) => i !== indexToDelete,
        );
    };
</script>

<ContentHeader title="Maklumat Prosiding Tatatertib"
    ><TextIconButton
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

    {#if data.roles.isDisciplineSecretaryRole || data.roles.isStaffRole}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Pertuduhan"
            />
            <StepperContentBody>
                <form
                    id="chargesMeetingForm"
                    method="POST"
                    use:chargesMeetingFormErrors
                    class="flex w-full flex-col items-center gap-2"
                >
                    <CustomTextField
                        disabled={true}
                        id="meetingDate"
                        label="Tarikh Mesyuarat"
                        type="date"
                        placeholder="-"
                        bind:val={$chargesMeetingForm.meetingDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={true}
                        id="meetingCount"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        type="number"
                        bind:val={$chargesMeetingForm.meetingCount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={true}
                        id="meetingName"
                        label="Nama Mesyuarat"
                        placeholder="-"
                        bind:val={$chargesMeetingForm.meetingName}
                    ></CustomTextField>
                    <div
                        class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                    >
                        <ContentHeader
                            title="Senarai Pertuduhan"
                            borderClass="border-none"
                        />
                        <hr />
                        {#each $chargesMeetingForm.accusationList as _, index}
                            <div
                                class="flex w-full flex-row items-center gap-x-2.5 text-base"
                            >
                                <span class="w-4">{index + 1}.</span>
                                <ContentHeader
                                    title={$chargesMeetingForm.accusationList[
                                        index
                                    ]}
                                    borderClass="border-none"
                                />
                            </div>
                        {/each}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Pertuduhan"
            >
                {#if data.roles.isIntegrityDirectorRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="disciplineSecretaryForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    {#if data.roles.isIntegrityDirectorRole}
                        <form
                            id="disciplineSecretaryForm"
                            method="POST"
                            use:disciplineSecretaryFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            <CustomTextField
                                disabled={$isReadonlyProceedingChargeIntegrityDirectorApproval}
                                errors={$disciplineSecretaryFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$disciplineSecretaryForm.remark}
                            ></CustomTextField>
                            <CustomSelectField
                                disabled={$isReadonlyProceedingChargeIntegrityDirectorApproval}
                                errors={$disciplineSecretaryFormErrors.status}
                                id="approverIsApproved"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$disciplineSecretaryForm.status}
                            ></CustomSelectField>
                        </form>
                    {/if}

                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >Pengarah Integriti</b
                            >
                        </div>
                        {#if $isReadonlyProceedingChargeIntegrityDirectorApproval}
                            <CustomTextField
                                disabled
                                id="integrityDirectorRemark"
                                label="Tindakan/Ulasan"
                                val={'value'}
                            ></CustomTextField>
                            <CustomSelectField
                                disabled
                                id="integrityDirectorStatus"
                                options={certifyOptions}
                                label={'Keputusan'}
                                val={'value'}
                            ></CustomSelectField>
                        {:else if $proceedingChargeIsCertified}
                            <StepperFailStatement />
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Penentuan
                Hukuman"
            >
                {#if data.roles.isDisciplineSecretaryRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="sentencingMeetingForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="sentencingMeetingForm"
                    method="POST"
                    use:sentencingMeetingFormEnhance
                    class="flex w-full flex-col items-center gap-2"
                >
                    <input
                        hidden
                        type="text"
                        bind:value={$sentencingMeetingForm.integrityId}
                    />
                    <CustomTextField
                        disabled={false}
                        errors={$sentencingMeetingFormErrors.meetingDate}
                        id="meetingDate"
                        label="Tarikh Mesyuarat"
                        type="date"
                        placeholder="-"
                        bind:val={$sentencingMeetingForm.meetingDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        errors={$sentencingMeetingFormErrors.meetingCount}
                        id="meetingCount"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        type="number"
                        bind:val={$sentencingMeetingForm.meetingCount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        errors={$sentencingMeetingFormErrors.meetingName}
                        id="meetingName"
                        label="Nama Mesyuarat"
                        placeholder="-"
                        bind:val={$sentencingMeetingForm.meetingName}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        errors={$sentencingMeetingFormErrors.meetingCode}
                        id="meetingCode"
                        label="Kod Mesyuarat"
                        placeholder="-"
                        bind:val={$sentencingMeetingForm.meetingCode}
                    ></CustomTextField>
                    {#each $sentencingMeetingForm.meetingResult as _, index}
                        <div
                            class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                        >
                            <ContentHeader
                                title="Pertuduhan #{index +
                                    1}: {$chargesListForm.accusationList[index]
                                    .accusationName}"
                                color="system-primary"
                                fontWeight="bold"
                                borderClass="border-none"
                            />

                            <input
                                hidden
                                type="text"
                                bind:value={$sentencingMeetingForm
                                    .meetingResult[index].accusationListId}
                            />
                            <hr />
                            <div
                                class="flex w-full flex-row items-center gap-x-2.5 border-b text-base"
                            >
                                <CustomRadioField
                                    disabled={false}
                                    id="currentGrade"
                                    label="Keputusan Mesyuarat"
                                    options={proceedingMeetingOptions}
                                    bind:val={$sentencingMeetingForm
                                        .meetingResult[index].result}
                                ></CustomRadioField>
                            </div>
                            {#if $sentencingMeetingForm.meetingResult[index].result}
                                <ContentHeader
                                    title="Penentuan Hukuman"
                                    borderClass="border-none"
                                >
                                    <div class="mr-2">
                                        <TextIconButton
                                            type="primary"
                                            onClick={() => {
                                                addSentencing(index);
                                            }}
                                            label="Tambah Hukuman"
                                            ><SvgPlus /></TextIconButton
                                        >
                                    </div>
                                </ContentHeader>
                                <hr />
                                <!-- List of sentencings, can be multiple -->
                                {#each $sentencingMeetingForm.meetingResult[index].sentencing as _, i}
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
                                            <div class="w-12">
                                                <Button
                                                    outline={false}
                                                    on:click={() => {
                                                        removeSentencing(
                                                            index,
                                                            i,
                                                        );
                                                    }}
                                                    ><span class="text-red-600"
                                                        ><SvgMinusCircle
                                                        /></span
                                                    ></Button
                                                >
                                            </div>
                                        </ContentHeader>
                                        <CustomSelectField
                                            disabled={false}
                                            id="title"
                                            label="Jenis Hukuman"
                                            options={data.lookups
                                                .penaltyTypeLookup}
                                            placeholder="-"
                                            bind:val={$sentencingMeetingForm
                                                .meetingResult[index]
                                                .sentencing[i].penaltyTypeCode}
                                        ></CustomSelectField>

                                        {#if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode}
                                            {#if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '01'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '02'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Hari Emolumen"
                                                    placeholder="1-7 Hari"
                                                    type="number"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .emolumenRight}
                                                ></CustomTextField>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '03'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Hari Emolumen"
                                                    placeholder="Tiada had hari"
                                                    type="number"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .emolumenRight}
                                                ></CustomTextField>
                                                <div
                                                    class="w-full space-y-2 border-l-4 border-r-4 px-2.5"
                                                >
                                                    <ContentHeader
                                                        title="Tarikh Dilucutkan Hak Emolumen"
                                                        ><div class="mr-2">
                                                            <TextIconButton
                                                                type="primary"
                                                                onClick={() => {
                                                                    addSentencingEmolumenDate(
                                                                        index,
                                                                        i,
                                                                    );
                                                                }}
                                                                label=""
                                                                ><SvgPlus
                                                                /></TextIconButton
                                                            >
                                                        </div></ContentHeader
                                                    >
                                                    {#if $sentencingMeetingForm.meetingResult[index].sentencing[i].emolumenDate}
                                                        {#each $sentencingMeetingForm.meetingResult[index].sentencing[i].emolumenDate as _, j}
                                                            <div
                                                                class="flex w-full flex-row items-center gap-x-2.5 text-base"
                                                            >
                                                                <span
                                                                    class="w-[220px] text-sm italic"
                                                                    >Tarikh #{j +
                                                                        1}.</span
                                                                >
                                                                <CustomTextField
                                                                    id="startDate"
                                                                    disabled={false}
                                                                    type="date"
                                                                    label={'Tarikh Mula'}
                                                                    bind:val={$sentencingMeetingForm
                                                                        .meetingResult[
                                                                        index
                                                                    ]
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .emolumenDate[
                                                                        j
                                                                    ].startDate}

                                                                ></CustomTextField>
                                                                <CustomTextField
                                                                    id="endDate"
                                                                    disabled={false}
                                                                    type="date"
                                                                    label={'Hingga'}
                                                                    bind:val={$sentencingMeetingForm
                                                                        .meetingResult[
                                                                        index
                                                                    ]
                                                                        .sentencing[
                                                                        i
                                                                    ]
                                                                        .emolumenDate[
                                                                        j
                                                                    ].endDate}

                                                                ></CustomTextField>
                                                                <!-- <div class="w-fit">
                        <CustomTextField
                            disabled
                            bind:value={totalDayDisplay}
                        />
                    </div> -->
                                                                <!-- {#if isEditMode} -->
                                                                <div
                                                                    class="w-12"
                                                                >
                                                                    <Button
                                                                        outline={false}
                                                                        on:click={() => {
                                                                            removeSentencingEmolumenDate(
                                                                                index,
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
                                                                <!-- {/if} -->
                                                            </div>
                                                        {/each}
                                                    {/if}
                                                </div>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '04'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                                <CustomSelectField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tempoh Bulan Tangguh Pergerakan Gaji"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i].duration}
                                                ></CustomSelectField>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '05'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                                <CustomSelectField
                                                    disabled={false}
                                                    id="title"
                                                    label="Bilangan Pergerakan Gaji"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i].duration}
                                                ></CustomSelectField>
                                                <CustomSelectField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tempoh Hukuman (Bulan)"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .sentencingMonth}
                                                ></CustomSelectField>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '06'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                                <!-- <CustomSelectField
                                                    disabled={true}
                                                    id="title"
                                                    label="Gred Semasa"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .emolumenRight}
                                                ></CustomSelectField> -->
                                                <CustomSelectField
                                                    disabled={false}
                                                    id="title"
                                                    label="Gred Baru"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .newGradeCode}
                                                ></CustomSelectField>
                                            {:else if $sentencingMeetingForm.meetingResult[index].sentencing[i].penaltyTypeCode === '07'}
                                                <CustomTextField
                                                    disabled={false}
                                                    id="title"
                                                    label="Tarikh Berkuatkuasa"
                                                    placeholder="-"
                                                    type="date"
                                                    bind:val={$sentencingMeetingForm
                                                        .meetingResult[index]
                                                        .sentencing[i]
                                                        .effectiveDate}
                                                ></CustomTextField>
                                            {/if}
                                        {/if}
                                    </div>
                                    <hr />
                                {/each}
                            {/if}
                        </div>
                    {/each}
                </form>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Pengesahan Pengarah Integriti - Penentuan Hukuman"
            >
                {#if data.roles.isIntegrityDirectorRole}
                    <TextIconButton
                        type="primary"
                        label="Simpan"
                        form="sentencingConfirmationForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    {#if data.roles.isIntegrityDirectorRole}
                        <form
                            id="sentencingConfirmationForm"
                            method="POST"
                            use:disciplineSecretaryFormEnhance
                            class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
                        >
                            <div class="mb-5">
                                <b class="text-sm text-system-primary"
                                    >Pengarah Integriti</b
                                >
                            </div>
                            <CustomTextField
                                disabled={$isReadonlyProceedingChargeIntegrityDirectorApproval}
                                errors={$disciplineSecretaryFormErrors.remark}
                                id="approverRemark"
                                label="Tindakan/Ulasan"
                                bind:val={$disciplineSecretaryForm.remark}
                            ></CustomTextField>
                            <CustomSelectField
                                disabled={$isReadonlyProceedingChargeIntegrityDirectorApproval}
                                errors={$disciplineSecretaryFormErrors.status}
                                id="approverIsApproved"
                                options={certifyOptions}
                                label={'Keputusan'}
                                bind:val={$disciplineSecretaryForm.status}
                            ></CustomSelectField>
                        </form>
                    {/if}

                    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
                        <div class="mb-5">
                            <b class="text-sm text-system-primary"
                                >Pengarah Integriti</b
                            >
                        </div>
                        {#if $isReadonlyProceedingChargeIntegrityDirectorApproval}
                            <CustomTextField
                                disabled
                                id="integrityDirectorRemark"
                                label="Tindakan/Ulasan"
                                val={'value'}
                            ></CustomTextField>
                            <CustomSelectField
                                disabled
                                id="integrityDirectorStatus"
                                options={certifyOptions}
                                label={'Keputusan'}
                                val={'value'}
                            ></CustomSelectField>
                        {:else if $proceedingChargeIsCertified}
                            <StepperFailStatement />
                        {:else}
                            <StepperOtherRolesResult />
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    {:else if data.roles.isIntegritySecretaryRole || data.roles.isStaffRole}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Tahan Kerja"
            />
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2.5">
                    <CustomTextField
                        disabled={false}
                        id="currentGrade"
                        label="Tarikh Mesyuarat"
                        placeholder="-"
                        bind:val={$form.serviceDetail.currentGrade}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        id="currentGrade"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        bind:val={$form.serviceDetail.currentGrade}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        id="currentGrade"
                        label="Nama Mesyuarat"
                        placeholder="-"
                        bind:val={$form.serviceDetail.currentGrade}
                    ></CustomTextField>
                    <!-- <CustomRadioField
                        disabled={false}
                        id="currentGrade"
                        label="Keputusan Mesyuarat"
                        options={proceedingMeetingOptions}
                        bind:val={$form.serviceDetail.currentGrade}
                    ></CustomRadioField> -->
                </div>
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
