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

    let isReadonlyActionFormStepper: boolean = true;
    let isReadonlyMeetingFormStepper: boolean = true;
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
        onClick={() => goto('/integriti/surcaj/')}
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

                <!-- <CustomTextField
                    disabled
                    id="isExPoliceOrSoldier"
                    label="Bekas Polis / Tentera"
                    bind:val={$personalForm
                        .isExPoliceOrSoldier}
                ></CustomTextField> -->

                <!-- <p class={stepperFormTitleClass}>
                            Maklumat Pertalian Dengan Kakitangan LKIM
                        </p> -->
                <!--   options={data.selectionOptions
                                .generalLookup} -->
                <!-- <CustomTextField
                    disabled
                    id="isInternalRelationship"
                    label="Perhubungan Dengan Kakitangan LKIM"
                    bind:val={$personalForm
                        .isInternalRelationship}
                ></CustomTextField> -->

                <!-- <CustomTextField
                             disabled
                            errors={$personalInfoError.identityCardNumber}
                            id="employeeNumber"
                            label={'No. Pekerja LKIM'}
                            bind:val={$personalInfoForm.employeeNumber}
                            options={data.selectionOptions
                                .employeeLookup}
                        ></CustomTextField> -->

                <!-- <CustomTextField
                    disabled
                    id="employeeNumber"
                    label="ID Kakitangan LKIM"
                    bind:val={$personalForm
                        .employeeNumber}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeeName"
                    label="Nama Kakitangan LKIM"
                    bind:val={$personalForm
                        .employeeName}
                ></CustomTextField>

                <CustomTextField
                    disabled
                    id="employeePosition"
                    label="Jawatan Kakitangan LKIM"
                    bind:val={$personalForm
                        .employeePosition}
                ></CustomTextField> -->
                <!--  -->
                <!-- <CustomTextField
                    disabled
                    id="relationshipId"
                    label="Hubungan"
                    options={data.selectionOptions.relationshipLookup}
                    bind:val={$personalForm
                        .relationshipId}
                ></CustomTextField> -->
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

            <!-- <CustomTextField
                disabled
                id="confirmServiceDate"
                label={'Tarikh Disahkan Jawatan'}
                type="date"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="newRecruitEffectiveDate"
                label={'Mula Dilantik Perkhidmatan LKIM'}
                type="date"
                val=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="firstServiceDate"
                label={'Mula Dilantik Perkhidmatan Sekarang'}
                type="date"
                val=""
            ></CustomTextField> -->
            <CustomTextField
                disabled
                id="firstEffectiveDate"
                label={'Disahkan Dalam Jawatan Pertama LKIM'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .firstEffectiveDate}
            ></CustomTextField>
            <!-- <CustomTextField
                       disabled
                        errors={$serviceInfoError.confirmDate}
                        id="confirmDate"
                        label={'Disahkan Dalam Jawatan Semasa LKIM'}
                        type="date"
                        bind:val={$serviceInfoForm.confirmDate}
                    ></CustomTextField> -->

            <!-- <AccordianField
                    disabled={editable}
                    label="Sejarah Lantikan Jawatan LKIM (Gred, Jawatan, Tarikh Disahkan Jawatan, Tarikh Lantikan)"
                    header={'maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM[0]'}
                > 

                    <{#each maklumatPerkhidmatanData.sejarahLantikanJawatanLKIM as val, i} -->

            <!-- <label
                        for=""
                        class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary text-base {!editable
                            ? 'text-txt-tertiary'
                            : 'text-txt-primary'}
                                                hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                        >{'i + 1'}. {'val'}</label
                    > -->
            <!-- {/each} -->
            <!-- </AccordianField>
                         -->
            <CustomTextField
                disabled
                id="pastAttachmentDate"
                label={'Tarikh Kelulusan Percantuman Perkhidmatan Lepas'}
                type="date"
                bind:val={$personalForm.serviceDetail
                    .pastAttachmentDate}
            ></CustomTextField>
            <!-- <CustomTextField
                disabled
                id="actingDate"
                label={'Pemangkuan Sekarang'}
                type="text"
                val=""
                placeholder=""
            ></CustomTextField>
            <CustomTextField
                disabled
                id="interimDate"
                label={'Tanggung Kerja Sekarang'}
                type="text"
                val=""
            ></CustomTextField> -->
            <CustomTextField
                disabled
                id="pensionScheme"
                label={'Skim Pencen'}
                type="text"
                bind:val={$personalForm.serviceDetail
                    .pensionScheme}
            ></CustomTextField>
            <!-- <CustomTextField
                disabled
                id="lastSalaryRaiseDate"
                label={'Kenaikan Gaji Akhir'}
                type="text"
                val=""
            ></CustomTextField>

            <CustomSelectField
                disabled
                id="salaryMovementMonth"
                label={'Bulan KGT'}
                options={[
                    {
                        value: 'undefined',
                        name: 'Tiada Maklumat',
                    },
                    {
                        value: 1,
                        name: 'January',
                    },
                    {
                        value: 4,
                        name: 'April',
                    },
                    {
                        value: 7,
                        name: 'Julai',
                    },
                    {
                        value: 10,
                        name: 'Oktober',
                    },
                ]}
                val=""
            ></CustomSelectField> -->

            <!-- <CustomTextField
                disabled
                id="lastPromotionDate"
                label={'Kenaikan Pangkat Akhir'}
                type="text"
                val=""
            ></CustomTextField> -->

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
                    <!-- <CustomTextField
                                id="tarikhBerkuatkuasa"
                                label={'Tarikh Berkuatkuasa'}
                                type="text"
                                 bind:val={$serviceInfoForm.gradeId}
                                placeholder=""
                            ></CustomTextField> -->
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
                <!-- hasTooltip={true}
                            toolTipID="type-itka" -->
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
                    <!-- Tooltip body -->
                    <!-- <Tooltip
                                type="dark"
                                triggeredBy="[id^='type-']"
                                on:show={assignContent}
                                >"{tooltipContent}"</Tooltip
                            > -->
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
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyActionFormStepper = false)}
                    form="form"
                />
               
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
                    type="date"
                    id="reportDate"
                    label={'Tarikh Dilaporkan'}
                    errors={$errors.reportDate}
                        bind:val={$form.reportDate}
                    ></CustomTextField>
                    <CustomTextField
                    id="surchargeAction"
                    label={'Tindakan Surcaj'}
                    errors={$errors.surchargeAction}
                        bind:val={$form.surchargeAction}
                    ></CustomTextField>
                    <CustomTextField
                    id="remark"
                    label={'Ulasan'}
                    errors={$errors.remark}
                        bind:val={$form.remark}
                    ></CustomTextField>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Mesyuarat">
            <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/integriti/surcaj/')}

        /> <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyMeetingFormStepper = false)}
                    form="meetingForm"
                />

        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="meetingForm"
                method="POST"
                use:meetingEnhance
                class="flex w-full flex-col gap-2"
            >
                <CustomTextField
                id="meetingType"
                label="Jenis Mesyuarat"
                errors={$meetingError.meetingType}
                    bind:val={$meetingForm.meetingType}
                ></CustomTextField>
                <CustomTextField

                    id="meetingName"
                    label="Nama Mesyuarat"
                    errors={$meetingError.meetingName}
                    bind:val={$meetingForm.meetingName}
                ></CustomTextField>
                <CustomTextField

                    type=number
                    id="meetingCount"
                    label="Bilangan Mesyuarat"
                    errors={$meetingError.meetingCount}
                    bind:val={$meetingForm.meetingCount}
                ></CustomTextField>
                <CustomTextField
                    type="date"

                    id="meetingDate"
                    label="Tarikh Mesyuarat"
                    errors={$meetingError.meetingDate}
                    bind:val={$meetingForm.meetingDate}
                />
                <CustomTextField

                    id="amount"
                    type="number"
                    label={'Jumlah Bayaran (RM)'}
                    errors={$meetingError.amount}
                    bind:val={$meetingForm.amount}
                ></CustomTextField>
                <CustomTextField

                    id="paymentType"
                    label="Cara Bayaran Balik"
                    errors={$meetingError.paymentType}
                    bind:val={$meetingForm.paymentType}
                ></CustomTextField>
                <CustomTextField

                    id="duration"
                    label="Tempoh Bayaran Balik (bulan)"
                    errors={$meetingError.duration}
                    bind:val={$meetingForm.duration}
                ></CustomTextField>
                <CustomTextField
                type=date

                    id="effectiveDate"
                    label="Tarikh Berkuatkuasa"
                    errors={$meetingError.effectiveDate}
                    bind:val={$meetingForm.effectiveDate}
                />
                <CustomTextField

                    id="meetingResult"
                    label="Keputusan Mesyuarat"
                    errors={$meetingError.meetingResult}
                    bind:val={$meetingForm.meetingResult}
                />
                <CustomTextField

                    id="remark"
                    label="Ulasan"
                    errors={$meetingError.remark}
                    bind:val={$meetingForm.remark}
                />
            </form></StepperContentBody
        >
    </StepperContent>
    <!-- <StepperContent>
        <StepperContentHeader title="Pengesahan Pengarah Integriti">
            {#if isReadonlyConfirmFormStepper}
                <TextIconButton
                    type="neutral"
                    label="Kemaskini"
                    onClick={() => (isReadonlyConfirmFormStepper = false)}
                />
            {:else}
                <TextIconButton
                    type="primary"
                    label="Simpan"
                    onClick={() => (isReadonlyConfirmFormStepper = false)}
                    form="confirmationForm"
                />
                <TextIconButton
                    type="neutral"
                    label="Kembali"
                    onClick={() => (isReadonlyConfirmFormStepper = true)}
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
                        type="text"
                        id="name"
                        label="Nama"
                        errors={$confirmationError.name}
                        bind:val={$confirmationForm.name}
                    ></CustomTextField>
                    <CustomTextField
                        disabled={isReadonlyConfirmFormStepper}
                        id="remark"
                        label="Tindakan/Ulasan"
                        errors={$confirmationError.remark}
                        bind:val={$confirmationForm.remark}
                    ></CustomTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="integrity-director-result" class="w-[220px]"
                            >Keputusan</label
                        > -->
                        <!-- <Badge
                                border
                                color={integrityDirectorResult == 'free'
                                    ? 'green'
                                    : 'red'}
                                >{integrityDirectorOptions[0].label}</Badge
                            > -->
                    <!-- </div>

                    <CustomTextField
                        disabled={isReadonlyConfirmFormStepper}
                        id="status"
                        label="status"
                        errors={$confirmationError.status}
                        bind:val={$confirmationForm.status}
                    ></CustomTextField> -->

                    <!-- <CustomTextField
                disabled={isReadonlyConfirmFormStepper}
                    id="statusDescription"
                    label="Ulasan status"
                    bind:val={data.personalInfoForm.confirmation.details
                        .statusDescription}
                ></CustomTextField> -->
                    <!-- <div class="text-sm text-system-primary">
                        <i class=""><li>● Menunggu keputusan...</li></i>
                    </div>
                </form>
            </div>
        </StepperContentBody>
    </StepperContent> -->
</Stepper>
<Toaster />
