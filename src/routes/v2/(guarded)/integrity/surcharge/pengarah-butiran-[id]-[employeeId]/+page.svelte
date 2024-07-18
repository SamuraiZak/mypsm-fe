<script lang="ts">
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { Checkbox, Modal } from 'flowbite-svelte';

    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SuperDebug, { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _applicationDetail,
        _confirmationDetail,
        _meetingDetail,
        _surcajEmployeeResponseSchema,
    } from '$lib/schemas/mypsm/integrity/surcaj-scheme';
    import toast from 'svelte-french-toast';
    import { error } from '@sveltejs/kit';
    import {
        _applicationDetailSubmit,
        _confirmationDetailSubmit,
        _meetingDetailSubmit,
    } from './+page';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import {
        certifyOptions,
        certifySurcajOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { goto } from '$app/navigation';
    export let data: PageData;

    let isReadonlyActionFormStepper: boolean = true;
    let isReadonlyMeetingFormStepper: boolean = true;
    let isReadonlyConfirmFormStepper: boolean = false;

    const { form, errors, enhance, isTainted } = superForm(
        data.applicationDetail,
        {
            SPA: true,
            id: 'serviceDetail',
            dataType: 'json',
            invalidateAll: true,
            resetForm: false,
            multipleSubmits: 'allow',
            validationMethod: 'oninput',
            validators: zod(_applicationDetail),

            async onSubmit() {
                if (!isTainted()) {
                    toast('Tiada perubahan data dikesan.');
                    error(400);
                }
                $form.employeeId = data.employeeID.employeeId;
                const result = await _applicationDetailSubmit($form);
                if (result.response.status === 'success')
                    isReadonlyActionFormStepper = true;
            },
            taintedMessage: false,
        },
    );

    const {
        form: meetingForm,
        errors: meetingError,
        enhance: meetingEnhance,
        isTainted: meetingtanted,
    } = superForm(data.meetingDetail, {
        SPA: true,
        id: 'meetingForm',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_meetingDetail),

        async onSubmit() {
            // console.log($meetingForm)
            if (!meetingtanted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _meetingDetailSubmit($meetingForm);
            console.log(result);
            if (result.response.status === 'success')
                isReadonlyMeetingFormStepper = true;
        },
        taintedMessage: false,
    });

    const {
        form: confirmationForm,
        errors: confirmationError,
        enhance: confirmationEnhance,
        isTainted: confirmationtanted,
    } = superForm(data.confirmationDetail, {
        SPA: true,
        id: 'confirmationForm',
        dataType: 'json',
        invalidateAll: true,
        resetForm: false,
        multipleSubmits: 'allow',
        validationMethod: 'oninput',
        validators: zod(_confirmationDetail),

        async onSubmit() {
            $confirmationForm.surchargeId = data.currentID.surchargeId;
            const result = await _confirmationDetailSubmit($confirmationForm);
            console.log(result);
            if (result.response.status === 'success')
                isReadonlyConfirmFormStepper = true;
        },
        taintedMessage: false,
    });
</script>

<!------------------------------------------------------>
<!---------------Maklumat Kakitangan---------------------->
<!------------------------------------------------------>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan">
            <TextIconButton
                type="primary"
                label="Kembali"
                onClick={() => goto('/v2/integrity/surcharge/')}
            /></StepperContentHeader
        >
        <StepperContentBody
            ><!-- Maklumat Peribadi -->
            <!-- <form
                    id="personalFormStepper"
                    method="POST"
                    use:personalInfoEnhance
                    class="flex w-full flex-col gap-2"
                > -->
            <div
                class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
            >
                <!-- stepperFormTitleClass -->

                <CustomTextField
                    disabled
                    id="employeeNumber"
                    label={'No. Pekerja'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .employeeNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .identityCardNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .fullName}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="email"
                    label="Emel Pekerja"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .email}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="icColour"
                    label="Jenis Kad Pengenalan"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .icColour}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .birthDate}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .birthplace}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .nationality}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="race"
                    label="Bangsa"
                    bind:val={data.personalInfoForm.employeeDetail.details.race}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .ethnic}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="religion"
                    label="Agama"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .religion}
                ></CustomTextField>
                <!--   -->
                <CustomTextField
                    disabled
                    id="gender"
                    label="Jantina"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .gender}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .marital}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:val={data.personalInfoForm.employeeDetail.details
                        .mailAddress}
                />
                <!--  -->

            </div>
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <!------------------------------------------------------>
    <!--------------- Maklumat Perkhidmatan ---------------->
    <!------------------------------------------------------>

    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        > <TextIconButton
        type="primary"
        label="Kembali"
        onClick={() => goto('/v2/integrity/surcharge/')}
    /></StepperContentHeader>
        <StepperContentBody>
            <CustomTextField
                disabled
                id="currentGrade"
                label={'Gred Semasa'}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .currentGrade}
            ></CustomTextField>
            <!--  -->
            <CustomTextField
                disabled
                id="currentPosition"
                label={'Jawatan'}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .currentPosition}
            ></CustomTextField>
            <!-- -->
            <CustomTextField
                disabled
                id="placement"
                label={'Penempatan'}
                bind:val={data.personalInfoForm.serviceDetail.details.placement}
            ></CustomTextField>
            <!--  -->
            <CustomTextField
                disabled
                id="serviceType"
                label={'Taraf Perkhidmatan'}
                bind:val={data.personalInfoForm.serviceDetail.details
                    .serviceType}
            ></CustomTextField>

            <!-- <RadioButton
                    
                    options={faedahPersaraanOptions}
                    label={'Faedah Persaraan'}
                    bind:userSelected={isFaedahKWSP}
                ></RadioButton>  -->
            <CustomTextField
                disabled
                id="effectiveDate"
                label={'Tarikh Berkuatkuasa'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .effectiveDate}
            ></CustomTextField>
            <!--   -->

            <CustomTextField
                disabled
                id="retirementBenefit"
                label="Faedah Persaraan"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .retirementBenefit}
            />

            <CustomTextField
                disabled
                id="EPFNumber"
                label={'No. KWSP'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details.EPFNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="SOCSO"
                label={'No. SOCSO'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details.SOCSO}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="taxIncome"
                label={'No. Cukai (LHDN)'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details.taxIncome}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="bankName"
                label={'Bank'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details.bankName}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="accountNumber"
                label={'No. Akaun'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .accountNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="program"
                label={'Program'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details.program}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="eligibleLeaveCount"
                label={'Kelayakan Cuti'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .eligibleLeaveCount}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="civilServiceStartDate"
                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .civilServiceStartDate}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="firstEffectiveDate"
                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .firstEffectiveDate}
            ></CustomTextField>
        
            <CustomTextField
                disabled
                id="pastAttachmentDate"
                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                type="date"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .pastAttachmentDate}
            ></CustomTextField>
         
            <CustomTextField
                disabled
                id="pensionScheme"
                label={'Skim Pencen'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .pensionScheme}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="retirementDate"
                label={'Tarikh Bersara'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .retirementDate}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="salaryEffectiveDate"
                label={'Tarikh Kuatkuasa Gaji'}
                type="text"
                bind:val={data.personalInfoForm.serviceDetail.details
                    .salaryEffectiveDate}
            ></CustomTextField>
            <p
                class="w-full text-start text-sm font-semibold text-system-primary"
            >
                Maklumat Gaji dan Elaun - Elaun
            </p>
            <div class="grid w-full grid-cols-2 gap-10">
                <div class="space-y-2.5">
                  
                    <CustomTextField
                        disabled
                        id="maximumSalary"
                        label={'Tangga Gaji'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .maximumSalary}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="baseSalary"
                        label={'Gaji Pokok'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .baseSalary}
                    ></CustomTextField>
                </div>
                <div class="space-y-2.5">
                    <CustomTextField
                        disabled
                        id="ITKA"
                        label={'ITKA'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .ITKA}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="ITP"
                        label={'ITP'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .ITP}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="EPW"
                        label={'EPW'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .EPW}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="COLA"
                        label={'COLA'}
                        type="text"
                        bind:val={data.personalInfoForm.serviceDetail.details
                            .COLA}
                    ></CustomTextField>
                </div>
            </div>
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Butiran Surcaj"> <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/v2/integrity/surcharge/')}
        /></StepperContentHeader>
        <StepperContentBody>
            <form
                id="form"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2.5">
                    <CustomTextField
                        type="date"
                        id="reportDate"
                        disabled
                        label={'Tarikh Dilaporkan'}
                        bind:val={$form.reportDate}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="surchargeAction"
                        label={'Tindakan Surcaj'}
                        bind:val={$form.surchargeAction}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="remark"
                        label={'Ulasan'}
                        bind:val={$form.remark}
                    ></CustomTextField>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat"> <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/v2/integrity/surcharge/')}
        /></StepperContentHeader>
        <StepperContentBody>
            <form
                id="meetingForm"
                method="POST"
                use:meetingEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                    disabled
                    id="meetingType"
                    label="Jenis Mesyuarat"
                    bind:val={$meetingForm.meetingType}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="meetingCount"
                    label="Bilangan Mesyuarat"
                    bind:val={$meetingForm.meetingCount}
                ></CustomTextField>
                <CustomTextField
                    type="date"
                    disabled
                    id="meetingDate"
                    label="Tarikh Mesyuarat"
                    bind:val={$meetingForm.meetingDate}
                />
                <CustomTextField
                    disabled
                    id="amount"
                    type="number"
                    label={'Jumlah Bayaran (RM)'}
                    bind:val={$meetingForm.amount}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="paymentType"
                    label="Cara Bayaran Balik"
                    bind:val={$meetingForm.paymentType}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="duration"
                    label="Tempoh Bayaran Balik (bulan)"
                    bind:val={$meetingForm.duration}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="effectiveDate"
                    label="Tarikh Berkuatkuasa"
                    bind:val={$meetingForm.effectiveDate}
                />
                <CustomTextField
                    disabled
                    id="meetingResult"
                    label="Keputusan Mesyuarat"
                    bind:val={$meetingForm.meetingResult}
                />
                <CustomTextField
                    disabled
                    id="remark"
                    label="Ulasan"
                    bind:val={$meetingForm.remark}
                />
            </form></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Pengarah Integriti">
            <TextIconButton
                type="primary"
                label="Kembali"
                onClick={() => goto('/integriti/surcaj/')}
            />
            {#if ! isReadonlyConfirmFormStepper}
            <TextIconButton
                type="primary"
                label="Simpan"
                form="confirmationForm"
            />
            {/if}
        </StepperContentHeader>
        <StepperContentBody>
            <div class="h-fit w-full space-y-2.5 rounded-[3px] border p-2.5">
                <div class="mb-5">
                    <b class="text-sm text-system-primary">Pengarah Integriti</b
                    >
                </div>

                <form
                    id="confirmationForm"
                    method="POST"
                    use:confirmationEnhance
                    class="flex w-full flex-col gap-2"
                >
                    <CustomTextField
                    disabled={isReadonlyConfirmFormStepper}
                        id="remark"
                        label="Tindakan/Ulasan"
                        bind:val={$confirmationForm.remark}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="integrity-director-result" class="w-[220px]"
                            >Keputusan</label
                        >
                    
                    </div>

                    <CustomRadioBoolean
                    disabled={isReadonlyConfirmFormStepper}
                        id="status"
                        label="status"
                        options={certifySurcajOptions}
                        bind:val={$confirmationForm.status}
                    ></CustomRadioBoolean>
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
