<script lang="ts">
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import { Button } from 'flowbite-svelte';
    import SvgMinusCircle from '$lib/assets/svg/SvgMinusCircle.svelte';
    import {
        _proceedingAccusationSchema,
        _proceedingChargeMeetingRequestSchema,
        _proceedingSuspensionSchema,
    } from '$lib/schemas/mypsm/integrity/proceeding-scheme';
    import { _addChargeDetailForm, _addSuspensionDetailForm } from './+page';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomRadioField from '$lib/components/inputs/radio-field/CustomRadioField.svelte';
    import { proceedingMeetingOptions } from '$lib/constants/core/radio-option-constants';
    export let data: PageData;

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
            validators: zod(_proceedingChargeMeetingRequestSchema),
            taintedMessage: false,
            async onSubmit() {
                $chargesMeetingForm.employeeId = Number(data.params.employeeId);

                _addChargeDetailForm($chargesMeetingForm);
            },
        });

    const {
        form: suspensionMeetingForm,
        errors: suspensionMeetingFormErrors,
        enhance: suspensionMeetingFormEnhance,
    } = superForm(data.forms.proceedingSuspensionMeetingForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_proceedingSuspensionSchema),
        taintedMessage: false,
        onChange() {
            if (
                $suspensionMeetingForm.suspensionType ===
                'Tahan Kerja - Penyiasatan'
            ) {
                $suspensionMeetingForm.eligibleEmolumen = 100;
                $suspensionMeetingForm.endDate = addTwoMonths();
            } else {
                $suspensionMeetingForm.eligibleEmolumen = 50;
                $suspensionMeetingForm.endDate = null;
            }
        },
        async onSubmit() {
            $suspensionMeetingForm.employeeId = Number(data.params.employeeId);
            $suspensionMeetingForm.meetingCode = '20';
            //meeting code for suspend
            // 17 - charge
            // 18 - penalty
            // 19 - appeal
            // 20 - suspend
            // 21 - criminal

            _addSuspensionDetailForm($suspensionMeetingForm);
        },
    });

    const addCharge = () => {
        const newChargeObject = '';

        $chargesMeetingForm.accusationList = [
            ...$chargesMeetingForm.accusationList,
            newChargeObject,
        ];
    };

    const removeCharge = (index: number) => {
        $chargesMeetingForm.accusationList =
            $chargesMeetingForm.accusationList.filter((_, i) => {
                return i !== index;
            });
    };

    // method to add 2 months to the date
    const addTwoMonths = (): string => {
        const inputDate = new Date($suspensionMeetingForm.startDate ?? '');
        let outputDate = new Date(inputDate);

        // Adds 2 months
        new Date(outputDate.setMonth(inputDate.getMonth() + 2));

        // Set the new Date string
        let day = ('0' + outputDate.getDate()).slice(-2);
        let month = ('0' + (outputDate.getMonth() + 1)).slice(-2);
        let year = String(outputDate.getFullYear());

        const endDate: string = `${year}-${month}-${day}`;

        return endDate;
    };
</script>

<ContentHeader title="Maklumat Prosiding Tatatertib"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../add-proceeding');
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
                    id="identityDocumentNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    placeholder="-"
                    bind:val={$form.employeeDetail.identityDocumentNumber}
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
                            type="date"
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
    {#if data.roles.isDisciplineSecretaryRole}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Pertuduhan"
            >
                <TextIconButton
                    type="neutral"
                    form="chargesMeetingForm"
                    label="Simpan"
                    onClick={() => {
                        $chargesMeetingForm.isDraft = true;
                    }}
                ></TextIconButton>
                <TextIconButton
                    type="primary"
                    form="chargesMeetingForm"
                    label="Hantar"
                    onClick={() => {
                        $chargesMeetingForm.isDraft = false;
                    }}
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="chargesMeetingForm"
                    method="POST"
                    use:chargesMeetingFormErrors
                    class="flex w-full flex-col items-center gap-2"
                >
                    <CustomTextField
                        disabled={false}
                        id="meetingDate"
                        label="Tarikh Mesyuarat"
                        type="date"
                        placeholder="-"
                        bind:val={$chargesMeetingForm.meetingDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        id="meetingCount"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        type="number"
                        bind:val={$chargesMeetingForm.meetingCount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
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
                            ><div class="mr-2">
                                <TextIconButton
                                    type="primary"
                                    onClick={addCharge}
                                    label="Tambah Tuduhan"
                                    ><SvgPlus /></TextIconButton
                                >
                            </div>
                        </ContentHeader>
                        <hr />
                        {#if $chargesMeetingForm.accusationList.length > 0}
                            {#each $chargesMeetingForm.accusationList as _, index}
                                <div
                                    class="flex w-full flex-row items-center gap-x-2.5 text-base"
                                >
                                    <span class="w-4 pb-3">{index + 1}.</span>
                                    <CustomTextField
                                        disabled={false}
                                        label=""
                                        id={index + 'charge'}
                                        bind:val={$chargesMeetingForm
                                            .accusationList[index]}
                                    />
                                    <div class="w-12 pb-3">
                                        <Button
                                            outline={false}
                                            on:click={() => removeCharge(index)}
                                            ><span class="text-red-600"
                                                ><SvgMinusCircle /></span
                                            ></Button
                                        >
                                    </div>
                                </div>
                            {/each}
                        {:else}
                            <div
                                class="flex w-full flex-row items-center justify-center gap-x-2.5 text-base"
                            >
                                <span
                                    class="w-fit text-sm italic text-system-neutral"
                                    >Sila tambah tuduhan.</span
                                >
                            </div>
                        {/if}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
    {:else if data.roles.isIntegritySecretaryRole}
        <StepperContent>
            <StepperContentHeader
                title="Maklumat Keputusan Mesyuarat Prosiding Tahan Kerja"
            >
                <TextIconButton
                    type="neutral"
                    form="suspensionMeetingForm"
                    label="Simpan"
                    onClick={() => {
                        $suspensionMeetingForm.isDraft = true;
                    }}
                ></TextIconButton>
                <TextIconButton
                    type="primary"
                    form="suspensionMeetingForm"
                    label="Hantar"
                    onClick={() => {
                        $suspensionMeetingForm.isDraft = false;
                    }}
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="suspensionMeetingForm"
                    method="POST"
                    use:suspensionMeetingFormEnhance
                    class="flex w-full flex-col items-center gap-2"
                >
                    <CustomTextField
                        disabled={false}
                        errors={$suspensionMeetingFormErrors.meetingDate}
                        type="date"
                        id="meetingDate"
                        label="Tarikh Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        errors={$suspensionMeetingFormErrors.meetingCount}
                        id="meetingCount"
                        label="Bil Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingCount}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={false}
                        errors={$suspensionMeetingFormErrors.meetingName}
                        id="meetingName"
                        label="Nama Mesyuarat"
                        placeholder="-"
                        bind:val={$suspensionMeetingForm.meetingName}
                    ></CustomTextField>
                    <CustomRadioField
                        disabled={false}
                        errors={$suspensionMeetingFormErrors.suspendMeetingResult}
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
                            ></ContentHeader>

                            <hr />
                            <CustomSelectField
                                disabled={false}
                                errors={$suspensionMeetingFormErrors.suspensionType}
                                id="suspensionType"
                                label="Jenis Prosiding Tahan Kerja"
                                options={data.lookups.suspensionTypeLookup}
                                placeholder="-"
                                bind:val={$suspensionMeetingForm.suspensionType}
                            ></CustomSelectField>

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
                                disabled={false}
                                errors={$suspensionMeetingFormErrors.startDate}
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
                        </div>
                    {/if}
                </form>
            </StepperContentBody>
        </StepperContent>
    {/if}
</Stepper>

<Toaster />
