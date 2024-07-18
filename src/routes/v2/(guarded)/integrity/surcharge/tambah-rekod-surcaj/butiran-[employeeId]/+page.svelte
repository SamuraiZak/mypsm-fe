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
    import { goto } from '$app/navigation';
    export let data: PageData;

    let isReadonlyActionFormStepper: boolean = false;
    let isReadonlyMeetingFormStepper: boolean = false;
    let isReadonlyConfirmFormStepper: boolean = true;
    let newSurchargeId: number = 0;
   
    const { form: personalForm, enhance: personalEnhance } = superForm(
        data.personalInfoForm,
        {
            SPA: true,
            id: 'serviceDetail',
            dataType: 'json',
            validators: false,
        },
    );

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
                    newSurchargeId = result.response.data?.details.surchargeId;
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
            $meetingForm.surchargeId = newSurchargeId;
            const result = await _meetingDetailSubmit($meetingForm);
            
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
            if (!confirmationtanted()) {
                toast('Tiada perubahan data dikesan.');
                error(400);
            }
            const result = await _confirmationDetailSubmit($confirmationForm);
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
        <StepperContentHeader title="Maklumat Kakitangan"
        > <TextIconButton
        type="primary"
        label="Kembali"
        onClick={() => goto('/v2/integrity/surcharge/')}
        form="form"
    /></StepperContentHeader>
        
        
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
                    bind:val={$personalForm.employeeDetail
                        .employeeNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="identityCardNumber"
                    label={'No. Kad Pengenalan'}
                    type="text"
                    bind:val={$personalForm.employeeDetail
                        .identityCardNumber}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="fullName"
                    label={'Nama Penuh'}
                    type="text"
                    bind:val={$personalForm.employeeDetail
                        .fullName}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="alternativeName"
                    label={'Nama Lain'}
                    type="text"
                    bind:val={$personalForm.employeeDetail
                        .alternativeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="email"
                    label="Emel Pekerja"
                    bind:val={$personalForm.employeeDetail
                        .email}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="icColour"
                    label="Jenis Kad Pengenalan"
                    bind:val={$personalForm.employeeDetail
                        .icColour}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    type="date"
                    id="birthDate"
                    label="Tarikh Lahir"
                    bind:val={$personalForm.employeeDetail
                        .birthDate}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="birthplace"
                    label="Tempat Lahir"
                    bind:val={$personalForm.employeeDetail
                        .birthplace}
                ></CustomTextField>
                <CustomTextField
                    disabled
                    id="nationality"
                    label="Warganegara"
                    bind:val={$personalForm.employeeDetail
                        .nationality}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="race"
                    label="Bangsa"
                    bind:val={$personalForm.employeeDetail.race}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="ethnic"
                    label="Etnik"
                    bind:val={$personalForm.employeeDetail
                        .ethnic}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="religion"
                    label="Agama"
                    bind:val={$personalForm.employeeDetail
                        .religion}
                ></CustomTextField>
                <!--   -->
                <CustomTextField
                    disabled
                    id="gender"
                    label="Jantina"
                    bind:val={$personalForm.employeeDetail
                        .gender}
                ></CustomTextField>
                <!--  -->
                <CustomTextField
                    disabled
                    id="marital"
                    label="Status Perkahwinan"
                    bind:val={$personalForm.employeeDetail
                        .marital}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="homeAddress"
                    label="Alamat Rumah"
                    bind:val={$personalForm.employeeDetail
                        .homeAddress}
                />

                <CustomTextField
                    disabled
                    id="mailAddress"
                    label="Alamat Surat Menyurat"
                    bind:val={$personalForm.employeeDetail
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
        >
        <TextIconButton
        type="primary"
        label="Kembali"
        onClick={() => goto('/integriti/surcaj/')}
        form="form"
    /></StepperContentHeader>
        <StepperContentBody>
            <CustomTextField
                disabled
                id="currentGrade"
                label={'Gred Semasa'}
                bind:val={$personalForm.serviceDetail
                    .currentGrade}
            ></CustomTextField>
            <!--  -->
            <CustomTextField
                disabled
                id="currentPosition"
                label={'Jawatan'}
                bind:val={$personalForm.serviceDetail
                    .currentPosition}
            ></CustomTextField>
            <!-- -->
            <CustomTextField
                disabled
                id="placement"
                label={'Penempatan'}
                bind:val={$personalForm.serviceDetail.placement}
            ></CustomTextField>
            <!--  -->
            <CustomTextField
                disabled
                id="serviceType"
                label={'Taraf Perkhidmatan'}
                bind:val={$personalForm.serviceDetail
                    .serviceType}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="effectiveDate"
                label={'Tarikh Berkuatkuasa'}
                type="text"
                bind:val={$personalForm.serviceDetail
                    .effectiveDate}
            ></CustomTextField>
            <!--   -->

            <CustomTextField
                disabled
                id="retirementBenefit"
                label="Faedah Persaraan"
                bind:val={$personalForm.serviceDetail
                    .retirementBenefit}
            />

            <CustomTextField
                disabled
                id="EPFNumber"
                label={'No. KWSP'}
                type="text"
                bind:val={$personalForm.serviceDetail.EPFNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="SOCSO"
                label={'No. SOCSO'}
                type="text"
                bind:val={$personalForm.serviceDetail.SOCSO}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="taxIncome"
                label={'No. Cukai (LHDN)'}
                type="text"
                bind:val={$personalForm.serviceDetail.taxIncome}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="bankName"
                label={'Bank'}
                type="text"
                bind:val={$personalForm.serviceDetail.bankName}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="accountNumber"
                label={'No. Akaun'}
                type="text"
                bind:val={$personalForm.serviceDetail
                    .accountNumber}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="program"
                label={'Program'}
                type="text"
                bind:val={$personalForm.serviceDetail.program}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="eligibleLeaveCount"
                label={'Kelayakan Cuti'}
                type="text"
                bind:val={$personalForm.serviceDetail
                    .eligibleLeaveCount}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="civilServiceStartDate"
                label={'Mula Dilantik Perkhidmatan Kerajaan'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .civilServiceStartDate}
            ></CustomTextField>
            <CustomTextField
                disabled
                id="firstEffectiveDate"
                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .firstEffectiveDate}
            ></CustomTextField>
           
            <CustomTextField
                disabled
                id="pastAttachmentDate"
                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .pastAttachmentDate}
            ></CustomTextField>
          
            <CustomTextField
                disabled
                id="pensionScheme"
                label={'Skim Pencen'}
                type="text"
                bind:val={$personalForm.serviceDetail
                    .pensionScheme}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="retirementDate"
                label={'Tarikh Bersara'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .retirementDate}
            ></CustomTextField>

            <CustomTextField
                disabled
                id="salaryEffectiveDate"
                label={'Tarikh Kuatkuasa Gaji'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .salaryEffectiveDate}
            ></CustomTextField>


            <p class="text-sm text-system-primary font-semibold text-start w-full"
                >Maklumat Gaji dan Elaun - Elaun</p
            >
            <div class="grid grid-cols-2 gap-10 w-full">
                <div class="space-y-2.5">
                    
                    <CustomTextField
                        disabled
                        id="maximumSalary"
                        label={'Tangga Gaji'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .maximumSalary}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="baseSalary"
                        label={'Gaji Pokok'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .baseSalary}
                    ></CustomTextField>
                </div>
            
                <div class="space-y-2.5">
                    <CustomTextField
                        disabled
                        id="ITKA"
                        label={'ITKA'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .ITKA}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="ITP"
                        label={'ITP'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .ITP}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="EPW"
                        label={'EPW'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .EPW}
                    ></CustomTextField>
                    <CustomTextField
                        disabled
                        id="COLA"
                        label={'COLA'}
                        type="text"
                        bind:val={$personalForm.serviceDetail
                            .COLA}
                    ></CustomTextField>
                
                </div>
            </div>
            <!-- </form> -->
        </StepperContentBody>
    </StepperContent>

    <StepperContent>
        <StepperContentHeader title="Butiran Surcaj">
            
            <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/integriti/surcaj/')}
            form="form"
        />
        {#if !isReadonlyActionFormStepper }
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    form="form"
                />
                {/if}
               
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="form"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <div class="flex w-full flex-col gap-2.5">
                    <CustomTextField
                    disabled={isReadonlyActionFormStepper}
                    type="date"
                    id="reportDate"
                    label={'Tarikh Dilaporkan'}
                    errors={$errors.reportDate}
                        bind:val={$form.reportDate}
                    ></CustomTextField>
                    <CustomTextField
                    disabled={isReadonlyActionFormStepper}
                    id="surchargeAction"
                    label={'Tindakan Surcaj'}
                    errors={$errors.surchargeAction}
                        bind:val={$form.surchargeAction}
                    ></CustomTextField>
                    <CustomTextField
                    disabled={isReadonlyActionFormStepper}
                    id="remark"
                    label={'Ulasan'}
                    errors={$errors.remark}
                        bind:val={$form.remark}
                    ></CustomTextField>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    {#if isReadonlyActionFormStepper }
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat">
            <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/integriti/surcaj/')}

        /> 
        {#if !isReadonlyMeetingFormStepper }<TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyMeetingFormStepper = false)}
                    form="meetingForm"
                />
{/if}
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="meetingForm"
                method="POST"
                use:meetingEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                id="meetingType"
                label="Jenis Mesyuarat"
                errors={$meetingError.meetingType}
                    bind:val={$meetingForm.meetingType}
                ></CustomTextField>
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="meetingName"
                    label="Nama Mesyuarat"
                    errors={$meetingError.meetingName}
                    bind:val={$meetingForm.meetingName}
                ></CustomTextField>
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    type=number
                    id="meetingCount"
                    label="Bilangan Mesyuarat"
                    errors={$meetingError.meetingCount}
                    bind:val={$meetingForm.meetingCount}
                ></CustomTextField>
                <CustomTextField
                    type="date"
                    disabled={isReadonlyMeetingFormStepper}
                    id="meetingDate"
                    label="Tarikh Mesyuarat"
                    errors={$meetingError.meetingDate}
                    bind:val={$meetingForm.meetingDate}
                />
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="amount"
                    type="number"
                    label={'Jumlah Bayaran (RM)'}
                    errors={$meetingError.amount}
                    bind:val={$meetingForm.amount}
                ></CustomTextField>
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="paymentType"
                    label="Cara Bayaran Balik"
                    errors={$meetingError.paymentType}
                    bind:val={$meetingForm.paymentType}
                ></CustomTextField>
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="duration"
                    label="Tempoh Bayaran Balik (bulan)"
                    errors={$meetingError.duration}
                    bind:val={$meetingForm.duration}
                ></CustomTextField>
                <CustomTextField
                type=date
                disabled={isReadonlyMeetingFormStepper}
                    id="effectiveDate"
                    label="Tarikh Berkuatkuasa"
                    errors={$meetingError.effectiveDate}
                    bind:val={$meetingForm.effectiveDate}
                />
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="meetingResult"
                    label="Keputusan Mesyuarat"
                    errors={$meetingError.meetingResult}
                    bind:val={$meetingForm.meetingResult}
                />
                <CustomTextField
                disabled={isReadonlyMeetingFormStepper}
                    id="remark"
                    label="Ulasan"
                    errors={$meetingError.remark}
                    bind:val={$meetingForm.remark}
                />
            </form></StepperContentBody
        >
    </StepperContent>
   {/if}
   
</Stepper>
<Toaster />
