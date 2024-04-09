<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import type { AllowanceTypeDTO } from '$lib/dto/mypsm/allowance/allowance.dto';
    import {
        AllowanceCeremonyClothingSchema,
        AllowanceFuneralArrangementSchema,
        AllowanceHouseMovingSchema,
        AllowanceInsurancePaymentSchema,
        AllowancePassportPaymentSchema,
        AllowanceWelfareFundSchema,
        AllowanceWinterClothingSchema,
    } from '$lib/schemas/mypsm/allowance/allowance.schema';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import {
        _submitCeremonyClothingForm,
        _submitFuneralArrangementForm,
        _submitHouseMovingForm,
        _submitInsurancePaymentForm,
        _submitPassportPaymentForm,
        _submitWelfareFundForm,
        _submitWinterClothingForm,
    } from './+page';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let currentAllowanceTypeCode: string = data.props.currentAllowanceType.code;

    // variable to store the files
    let files: FileList;

    function _handleAllowanceTypeChange(allowanceTypeCode: string) {
        let currentType: AllowanceTypeDTO =
            AllowanceTypeConstant.list.find(
                (item) => item.code == allowanceTypeCode,
            ) ?? AllowanceTypeConstant.ceremonyClothing;

        let url =
            '/elaun-elaun_perkhidmatan/permohonan/' +
            currentType.description +
            '/Baru';

        goto(url);
    }

    //  1. ceremonyClothing form
    const {
        form: ceremonyClothingForm,
        errors: ceremonyClothingErrors,
        enhance: ceremonyClothingEnhance,
    } = superForm(data.forms.ceremonyClothingForm, {
        id: 'ceremonyClothingForm',
        SPA: true,
        validators: zodClient(AllowanceCeremonyClothingSchema),
        onSubmit(input) {
            _submitCeremonyClothingForm($ceremonyClothingForm, files);
        },
    });

    //  2. winterClothing form
    const {
        form: winterClothingForm,
        errors: winterClothingErrors,
        enhance: winterClothingEnhance,
    } = superForm(data.forms.winterClothingForm, {
        id: 'winterClothingForm',
        SPA: true,
        validators: zodClient(AllowanceWinterClothingSchema),
        onSubmit(input) {
            _submitWinterClothingForm($winterClothingForm, files);
        },
    });

    //  3. state visit

    //  4. funeralArrangement form
    const {
        form: funeralArrangementForm,
        errors: funeralArrangementErrors,
        enhance: funeralArrangementEnhance,
    } = superForm(data.forms.funeralArrangementForm, {
        id: 'funeralArrangementForm',
        SPA: true,
        validators: zodClient(AllowanceFuneralArrangementSchema),
        onSubmit(input) {
            _submitFuneralArrangementForm($funeralArrangementForm, files);
        },
    });

    //  5. welfareFund form
    const {
        form: welfareFundForm,
        errors: welfareFundErrors,
        enhance: welfareFundEnhance,
    } = superForm(data.forms.welfareFundForm, {
        id: 'welfareFundForm',
        SPA: true,
        validators: zodClient(AllowanceWelfareFundSchema),
        onSubmit(input) {
            _submitWelfareFundForm($welfareFundForm, files);
        },
    });

    //  6. houseMoving
    const {
        form: houseMovingForm,
        errors: houseMovingErrors,
        enhance: houseMovingEnhance,
    } = superForm(data.forms.houseMovingForm, {
        id: 'houseMovingForm',
        SPA: true,
        validators: zodClient(AllowanceHouseMovingSchema),
        onSubmit(input) {
            _submitHouseMovingForm($houseMovingForm, files);
        },
    });

    //  7. passportPayment form
    const {
        form: passportPaymentForm,
        errors: passportPaymentErrors,
        enhance: passportPaymentEnhance,
    } = superForm(data.forms.passportPaymentForm, {
        id: 'passportPaymentForm',
        SPA: true,
        validators: zodClient(AllowancePassportPaymentSchema),
        onSubmit(input) {
            _submitPassportPaymentForm($passportPaymentForm, files);
        },
    });

    //  8. insurancePayment form
    const {
        form: insurancePaymentForm,
        errors: insurancePaymentErrors,
        enhance: insurancePaymentEnhance,
    } = superForm(data.forms.insurancePaymentForm, {
        id: 'insurancePaymentForm',
        SPA: true,
        validators: zodClient(AllowanceInsurancePaymentSchema),
        onSubmit(input) {
            _submitInsurancePaymentForm($insurancePaymentForm, files);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/elaun-elaun_perkhidmatan/permohonan');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Permohonan">
                {#if currentAllowanceTypeCode == AllowanceTypeConstant.ceremonyClothing.code}
                    <TextIconButton
                        form="ceremonyClothingForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.winterClothing.code}
                    <TextIconButton
                        form="winterClothingForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.stateVisit.code}
                    <TextIconButton
                        form="stateVisitForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.funeralArrangement.code}
                    <TextIconButton
                        form="funeralArrangementForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.welfareFund.code}
                    <TextIconButton
                        form="welfareFundForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.houseMoving.code}
                    <TextIconButton
                        form="houseMovingForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.passportPayment.code}
                    <TextIconButton
                        form="passportPaymentForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.insurancePayment.code}
                    <TextIconButton
                        form="insurancePaymentForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {:else if currentAllowanceTypeCode == AllowanceTypeConstant.cargoShipping.code}
                    <TextIconButton
                        form="cargoShippingForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    {#if currentAllowanceTypeCode == AllowanceTypeConstant.ceremonyClothing.code}
                        <!-- ===================================================================== -->
                        <!-- CEREMONY CLOTHING -->
                        <!-- ===================================================================== -->
                        <form
                            id="ceremonyClothingForm"
                            method="POST"
                            use:ceremonyClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$ceremonyClothingErrors.reason}
                                    bind:val={$ceremonyClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$ceremonyClothingErrors.personal}
                                    bind:val={$ceremonyClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$ceremonyClothingErrors.partner}
                                    bind:val={$ceremonyClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    id="ceremonyclothing"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.winterClothing.code}
                        <!-- ===================================================================== -->
                        <!-- WINTER CLOTHING -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField id="winterclothing" bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.stateVisit.code}
                        <!-- ===================================================================== -->
                        <!-- STATE VISIT -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField id="winterclothing" bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.funeralArrangement.code}
                        <!-- ===================================================================== -->
                        <!-- FUNERAL ARRANGMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="funeralArrangementForm"
                            method="POST"
                            use:funeralArrangementEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="deathDate"
                                    label={'Tarikh Kematian'}
                                    type="date"
                                    errors={$funeralArrangementErrors.deathDate}
                                    bind:val={$funeralArrangementForm.deathDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="deathTime"
                                    label={'Masa Kematian'}
                                    placeholder="hh:mm"
                                    errors={$funeralArrangementErrors.deathTime}
                                    bind:val={$funeralArrangementForm.deathTime}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    label="Sila Muatnaik Salinan Sijil Kematian Dalam Format PDF"
                                    id="funeralArrangement"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.welfareFund.code}
                        <!-- ===================================================================== -->
                        <!-- WELFARE FUND -->
                        <!-- ===================================================================== -->
                        <form
                            id="welfareFundForm"
                            method="POST"
                            use:welfareFundEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="welfareTypeCode"
                                    label={'Jenis Tabung Kebajikan'}
                                    errors={$welfareFundErrors.welfareTypeCode}
                                    bind:val={$welfareFundForm.welfareTypeCode}
                                    options={data.props.welfareTypeOptions}
                                ></CustomSelectField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField id="winterclothing" bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.houseMoving.code}
                        <!-- ===================================================================== -->
                        <!-- HOUSE MOVING -->
                        <!-- ===================================================================== -->
                        <form
                            id="houseMovingForm"
                            method="POST"
                            use:houseMovingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="movingDate"
                                    label={'Tarikh Perpindahan'}
                                    type="date"
                                    errors={$houseMovingErrors.movingDate}
                                    bind:val={$houseMovingForm.movingDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="oldAddress"
                                    label={'Alamat Lama'}
                                    errors={$houseMovingErrors.oldAddress}
                                    bind:val={$houseMovingForm.oldAddress}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="newAddress"
                                    label={'Alamat Baru'}
                                    errors={$houseMovingErrors.newAddress}
                                    bind:val={$houseMovingForm.newAddress}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField id="houseMoving" bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.passportPayment.code}
                        <!-- ===================================================================== -->
                        <!-- PASSPORT PAYMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="passportPaymentForm"
                            method="POST"
                            use:passportPaymentEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="renewDate"
                                    label={'Tarikh Pembaharuan Passport'}
                                    type="date"
                                    errors={$passportPaymentErrors.renewDate}
                                    bind:val={$passportPaymentForm.renewDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="reason"
                                    label={'Alasan'}
                                    errors={$passportPaymentErrors.reason}
                                    bind:val={$passportPaymentForm.reason}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    label="Sila Muatnaik Resit Pembayaran Dalam Format PDF"
                                    id="passportPayment"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.insurancePayment.code}
                        <!-- ===================================================================== -->
                        <!-- INSURANCE PAYMENT -->
                        <!-- ===================================================================== -->
                        <form
                            id="insurancePaymentForm"
                            method="POST"
                            use:insurancePaymentEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="insuranceType"
                                    label={'Jenis Insurans'}
                                    errors={$insurancePaymentErrors.insuranceType}
                                    bind:val={$insurancePaymentForm.insuranceType}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="regionCode"
                                    label={'Destinasi'}
                                    bind:val={$insurancePaymentForm.regionCode}
                                    options={data.props.areaOptions}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="startDate"
                                    label={'Tarikh Mula Perjalanan'}
                                    type="date"
                                    errors={$insurancePaymentErrors.startDate}
                                    bind:val={$insurancePaymentForm.startDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="endDate"
                                    label={'Tarikh Tamat Perjalanan'}
                                    type="date"
                                    errors={$insurancePaymentErrors.endDate}
                                    bind:val={$insurancePaymentForm.endDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="text"
                                    id="reason"
                                    label={'Alasan'}
                                    errors={$insurancePaymentErrors.reason}
                                    bind:val={$insurancePaymentForm.reason}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    id="insurancePayment"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {:else if currentAllowanceTypeCode == AllowanceTypeConstant.cargoShipping.code}
                        <!-- ===================================================================== -->
                        <!-- CARGO SHIPPING -->
                        <!-- ===================================================================== -->
                        <form
                            id="winterClothingForm"
                            method="POST"
                            use:winterClothingEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Jenis Elaun'}
                                    bind:val={currentAllowanceTypeCode}
                                    options={data.props.allowanceTypeOption}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="reason"
                                    label={'Nyatakan Alasan Untuk Permohonan Ini'}
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="personal"
                                    label={'Nyatakan Jumlah Untuk Diri Sendiri (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'Nyatakan Jumlah Untuk Pasangan (RM)'}
                                    errors={$winterClothingErrors.partner}
                                    bind:val={$winterClothingForm.partner}
                                ></CustomTextField>
                            </div>

                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField id="winterclothing" bind:files
                                ></CustomFileField>
                            </div>
                        </form>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster></Toaster>
