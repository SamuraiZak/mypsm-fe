<script lang="ts">
    import {
        approveAltOptions,
        certifyAltAltOptions,
        certifyOptions,
        certifySurcajOptions,
        commonOptions,
        supportAltOptions,
    } from '$lib/constants/core/radio-option-constants';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { AllowanceTypeConstant } from '$lib/constants/core/allowance-type.constant';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import { superForm, message } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        ServiceAllowanceAssignDirectorSchema,
        ServiceAllowanceCeremonyClothingDetailSchema,
        ServiceAllowanceEndorsementSchema,
        ServiceAllowanceEndorserDetailSchema,
        ServiceAllowanceFuneralDetailSchema,
        ServiceAllowanceHouseMovingDetailSchema,
        ServiceAllowanceOtherAllowanceDetailSchema,
        ServiceAllowancePassportPaymentDetailSchema,
        ServiceAllowanceWinterClothingDetailSchema,
        type ServiceAllowanceCeremonyClothingDetailType,
        type ServiceAllowanceFuneralDetailType,
        type ServiceAllowancePassportPaymentDetailType,
    } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
    import {
        _approverFeedbackSubmit,
        _assignDirectorSubmit,
        _ceremonyClothingSubmit,
        _directorSupportSubmit,
        _endorserDetailSubmit,
        _funeralSubmit,
        _houseMovingSubmit,
        _otherAllowanceSubmit,
        _passportPaymentSubmit,
        _secretaryConfirmationSubmit,
        _secretaryVerificationSubmit,
        _supporterFeedbackSubmit,
        _winterClothingSubmit,
    } from './+page';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import type { DocumentDTO } from '$lib/dto/core/document/document.dto';
    import FileInputComponent from '$lib/components/document-input/FileInputComponent.svelte';
    import DocumentInput from '$lib/components/document-input/DocumentInput.svelte';
    import { onMount } from 'svelte';
    import type {
        ServiceAllowanceHouseMovingDetail,
        ServiceAllowanceOtherAllowanceDetailDTO,
        ServiceAllowanceWinterClothingDetail,
    } from '$lib/dto/mypsm/service-allowance/service-allowance.dto';
    import Jadual_2 from '$lib/components/notes/service-allowance/Jadual_2.svelte';
    import SvgSave from '$lib/assets/svg/SvgSave.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';

    export let data: PageData;

    let currentAllowanceId: number = data.props.currentAllowanceId;

    let currentAllowanceTypeCode: string = data.props.currentAllowanceTypeCode;

    let files: FileList;

    let documents: DocumentDTO[] = [];

    let currentFormId: string = 'ceremonyClothingForm';

    let isDraft: boolean = true;

    $: handleAllowanceTypeChange(currentAllowanceTypeCode);

    function handleAllowanceTypeChange(params: string) {
        switch (params) {
            case AllowanceTypeConstant.ceremonyClothing.code:
                currentFormId = 'ceremonyClothingForm';
                break;
            case AllowanceTypeConstant.passportPayment.code:
                currentFormId = 'passportPaymentForm';
                break;
            case AllowanceTypeConstant.otherAllowance.code:
                currentFormId = 'otherAllowanceForm';
                break;
            case AllowanceTypeConstant.houseMoving.code:
                currentFormId = 'houseMovingForm';
                break;
            case AllowanceTypeConstant.winterClothing.code:
                currentFormId = 'winterClothingForm';
                break;
            case AllowanceTypeConstant.funeralArrangement.code:
                currentFormId = 'funeralForm';
                break;

            default:
                break;
        }
    }

    onMount(() => {
        handleAllowanceTypeChange(currentAllowanceTypeCode);
    });

    // create all forms by type
    // 1. ceremony clothing form
    const {
        form: ceremonyClothingForm,
        errors: ceremonyClothingErrors,
        enhance: ceremonyClothingEnhance,
    } = superForm(data.forms.ceremonyClothingDetailsForm, {
        dataType: 'json',
        id: 'ceremonyClothingForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceCeremonyClothingDetailSchema),
        async onSubmit(input) {
            // alert('hello');
            $ceremonyClothingForm.isDraft = isDraft;
            _ceremonyClothingSubmit($ceremonyClothingForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowanceCeremonyClothingDetailType =
                        result.data
                            ?.details as ServiceAllowanceCeremonyClothingDetailType;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });

            // const response = await _ceremonyClothingSubmit($ceremonyClothingForm);
        },
    });

    // 2. passport payment form
    const {
        form: passportPaymentForm,
        errors: passportPaymentErrors,
        enhance: passportPaymentEnhance,
    } = superForm(data.forms.passportPaymentDetailsForm, {
        dataType: 'json',
        id: 'passportPaymentForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowancePassportPaymentDetailSchema),
        async onSubmit(input) {
            $passportPaymentForm.isDraft = isDraft;
            _passportPaymentSubmit($passportPaymentForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowancePassportPaymentDetailType =
                        result.data
                            ?.details as ServiceAllowancePassportPaymentDetailType;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });
        },
    });

    // 3. other allowance form
    const {
        form: otherAllowanceForm,
        errors: otherAllowanceErrors,
        enhance: otherAllowanceEnhance,
    } = superForm(data.forms.otherAllowanceDetailsForm, {
        dataType: 'json',
        id: 'otherAllowanceForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceOtherAllowanceDetailSchema),
        async onSubmit(input) {
            $otherAllowanceForm.isDraft = isDraft;
            _otherAllowanceSubmit($otherAllowanceForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowanceOtherAllowanceDetailDTO =
                        result.data
                            ?.details as ServiceAllowanceOtherAllowanceDetailDTO;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });
        },
    });

    // 4. house moving form
    const {
        form: houseMovingForm,
        errors: houseMovingErrors,
        enhance: houseMovingEnhance,
    } = superForm(data.forms.houseMovingDetailsForm, {
        dataType: 'json',
        id: 'houseMovingForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceHouseMovingDetailSchema),
        async onSubmit(input) {
            $houseMovingForm.isDraft = isDraft;
            _houseMovingSubmit($houseMovingForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowanceHouseMovingDetail =
                        result.data
                            ?.details as ServiceAllowanceHouseMovingDetail;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });
        },
    });

    // 5. winter clothing form
    const {
        form: winterClothingForm,
        errors: winterClothingErrors,
        enhance: winterClothingEnhance,
    } = superForm(data.forms.winterClothingDetailsForm, {
        dataType: 'json',
        id: 'winterClothingForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceWinterClothingDetailSchema),
        async onSubmit(input) {
            $winterClothingForm.isDraft = isDraft;
            _winterClothingSubmit($winterClothingForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowanceWinterClothingDetail =
                        result.data
                            ?.details as ServiceAllowanceWinterClothingDetail;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });
        },
    });

    // 6. funeral form
    const {
        form: funeralForm,
        errors: funeralErrors,
        enhance: funeralEnhance,
    } = superForm(data.forms.funeralDetailsForm, {
        dataType: 'json',
        id: 'funeralForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceFuneralDetailSchema),
        async onSubmit(input) {
            $funeralForm.isDraft = isDraft;
            _funeralSubmit($funeralForm).then((result) => {
                if (result.status == 'success') {
                    const applicationDetail: ServiceAllowanceFuneralDetailType =
                        result.data
                            ?.details as ServiceAllowanceFuneralDetailType;

                    let url: string =
                        '/v2/service-allowance/application/' +
                        applicationDetail.allowanceTypeCode +
                        '/' +
                        applicationDetail.allowanceId;
                    goto(url);
                }
            });
        },
    });

    // create all processes form
    // 1. Assign Director Form
    const {
        form: assignDirectorForm,
        errors: assignDirectorErrors,
        enhance: assignDirectorEnhance,
    } = superForm(data.forms.assignDirectorForm, {
        id: 'assignDirectorForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceAssignDirectorSchema),
        async onSubmit(input) {
            $assignDirectorForm.allowanceId = data.props.currentAllowanceId;
            $assignDirectorForm.type = 'pengarah bahagian negeri';
            _assignDirectorSubmit($assignDirectorForm);
        },
    });

    // 2. Director Support Form
    const {
        form: directorSupportForm,
        errors: directorSupportErrors,
        enhance: directorSupportEnhance,
    } = superForm(data.forms.directorSupportForm, {
        id: 'directorSupportForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        async onSubmit(input) {
            $directorSupportForm.allowanceId = data.props.currentAllowanceId;
            _directorSupportSubmit($directorSupportForm);
        },
    });

    // 3. Secretary Verification Form
    const {
        form: secretaryVerificationForm,
        errors: secretaryVerificationErrors,
        enhance: secretaryVerificationEnhance,
    } = superForm(data.forms.secretaryVerificationForm, {
        id: 'secretaryVerificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        async onSubmit(input) {
            $secretaryVerificationForm.allowanceId =
                data.props.currentAllowanceId;
            _secretaryVerificationSubmit($secretaryVerificationForm);
        },
    });

    // 4. Supporter Feedback Form
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.forms.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        async onSubmit(input) {
            $supporterFeedbackForm.allowanceId = data.props.currentAllowanceId;
            _supporterFeedbackSubmit($supporterFeedbackForm);
        },
    });

    // 5. Approver Feedback Form
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.forms.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        async onSubmit(input) {
            $approverFeedbackForm.allowanceId = data.props.currentAllowanceId;
            _approverFeedbackSubmit($approverFeedbackForm);
        },
    });

    // 6. Secretary Confirmation Form
    const {
        form: secretaryConfirmationForm,
        errors: secretaryConfirmationErrors,
        enhance: secretaryConfirmationEnhance,
    } = superForm(data.forms.secretaryConfirmationForm, {
        id: 'secretaryConfirmationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorsementSchema),
        async onSubmit(input) {
            _secretaryConfirmationSubmit($secretaryConfirmationForm);
        },
    });

    // 7. Endorser Detail Form
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        invalidateAll: true,
        validationMethod: 'oninput',
        validators: zodClient(ServiceAllowanceEndorserDetailSchema),
        async onSubmit(input) {
            _endorserDetailSubmit($endorserDetailForm);
        },
    });
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader
        title="Permohonan Elaun-elaun Perkhidmatan {data.props
            .currentAllowanceId}"
    >
        <TextIconButton
            type="draft"
            label="Kembali"
            onClick={() => {
                goto('/v2/service-allowance/application/');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-hidden"
>
    <Stepper activeIndex={0}>
        <!-- ======================================================================= -->
        <!-- DETAILS -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Butir-butir Permohonan">
                {#if data.props.currentApplicationDetails.status == 'Draf'}
                    <TextIconButton
                        type="draft"
                        label="Simpan"
                        form={currentFormId}
                        onClick={() => {
                            isDraft = true;
                        }}
                    >
                        <SvgSave></SvgSave>
                    </TextIconButton>
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form={currentFormId}
                        icon="check"
                        onClick={() => {
                            isDraft = false;
                        }}
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-2 lg:w-1/2"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-2"
                        >
                            <CustomSelectField
                                disabled={data.props.currentAllowanceId !== 0}
                                id="allowanceType"
                                label={'Jenis Elaun'}
                                bind:val={currentAllowanceTypeCode}
                                options={data.lookup.allowanceDropdown}
                            ></CustomSelectField>
                            <CustomTextField
                                disabled
                                id="name"
                                label={'1. Nama Pemohon'}
                                bind:val={data.props.currentEmployeeDetails
                                    .fullName}
                                errors={undefined}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="identityDocumentNumber"
                                label={'2. No Kad Pengenalan'}
                                bind:val={data.props.currentEmployeeDetails
                                    .identityCardNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="position"
                                label={'3. Jawatan'}
                                bind:val={data.props.currentEmployeeDetails
                                    .position}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="grade"
                                label={'4. Gred'}
                                bind:val={data.props.currentEmployeeDetails
                                    .grade}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="employeeNumber"
                                label={'5. No. Pekerja'}
                                bind:val={data.props.currentEmployeeDetails
                                    .employeeNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                id="placement"
                                label={'6. Penempatan'}
                                bind:val={data.props.currentEmployeeDetails
                                    .placement}
                            ></CustomTextField>
                        </div>

                        {#if currentAllowanceTypeCode == AllowanceTypeConstant.ceremonyClothing.code}
                            <!-- ################################################################### -->
                            <!-- CEREMONY CLOTHING -->
                            <!-- ################################################################### -->
                            <form
                                id="ceremonyClothingForm"
                                method="POST"
                                use:ceremonyClothingEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    id="reason"
                                    label={'7. Tujuan Permohonan'}
                                    type="textarea"
                                    errors={$ceremonyClothingErrors.reason}
                                    bind:val={$ceremonyClothingForm.reason}
                                    disabled={$ceremonyClothingForm.isDraft ==
                                        false}
                                ></CustomTextField>
                                <div
                                    class="w-full flex-row items-center justify-start"
                                >
                                    <p
                                        class="w-full text-justify text-base italic text-slate-500"
                                    >
                                        (Sertakan resit <span
                                            class="font-medium">ASAL</span
                                        > yang disahkan perbelanjaan adalah di atas
                                        urusan rasmi dan sesalinan jemputan ke majlis/upacara
                                        rasmi atau surat arahan bertugas di Parlimen
                                        atau Dewan Undangan Negeri)
                                    </p>
                                </div>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <p
                                        class="flex w-full flex-col text-base font-medium text-slate-700"
                                    >
                                        8. Pernah mendapat kemudahan ini dalam
                                        tiga (3) tahun?
                                    </p>
                                </div>
                                <CustomRadioBoolean
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    id="ceremonyClothingPrevious"
                                    label="8.1 Bayaran Pakaian Istiadat"
                                    bind:errors={$ceremonyClothingErrors.ceremonyClothingPrevious}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    type="date"
                                    id="ceremonyClothingPreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.ceremonyClothingPreviousDate}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    id="blackTiePrevious"
                                    label="8.2 Bantuan Bayaran Black Tie"
                                    bind:errors={$ceremonyClothingErrors.blackTiePrevious}
                                    bind:val={$ceremonyClothingForm.blackTiePrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    type="date"
                                    id="blackTiePreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.blackTiePreviousDate}
                                    bind:val={$ceremonyClothingForm.blackTiePreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    id="officialClothingPrevious"
                                    label="8.3 Bayaran Pakaian Menghadiri Upacara Rasmi"
                                    bind:errors={$ceremonyClothingErrors.officialClothingPrevious}
                                    bind:val={$ceremonyClothingForm.officialClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    type="date"
                                    id="officialClothingPreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.officialClothingPreviousDate}
                                    bind:val={$ceremonyClothingForm.officialClothingPreviousDate}
                                ></CustomTextField>
                                <div
                                    class="flex w-full flex-col items-start justify-start gap-1"
                                >
                                    <p
                                        class="flex w-full flex-col text-base font-medium text-slate-700"
                                    >
                                        9. Jumlah Tuntutan
                                    </p>
                                </div>
                                <CustomTextField
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    type="number"
                                    id="personal"
                                    label={'9.1 Sendiri (RM)'}
                                    errors={$ceremonyClothingErrors.personal}
                                    bind:val={$ceremonyClothingForm.personal}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    type="number"
                                    id="partner"
                                    label={'9.2 Pasangan (RM)'}
                                    errors={$ceremonyClothingErrors.partner}
                                    bind:val={$ceremonyClothingForm.partner}
                                ></CustomTextField>

                                <DocumentInput
                                    disabled={!$ceremonyClothingForm.isDraft}
                                    errors={$ceremonyClothingErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$ceremonyClothingForm.documents}
                                    label="10. Sila muat naik dokumen sokongan"
                                ></DocumentInput>
                                <!-- card starts -->
                                <div
                                    class=" flex w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border"
                                >
                                    <!-- card header starts -->
                                    <div
                                        class="flex h-7 min-h-7 w-full flex-row items-center justify-start rounded-t bg-gray-100 px-4"
                                    >
                                        <p
                                            class="w-full text-md font-medium leading-tight text-slate-500"
                                        >
                                            Nota
                                        </p>
                                    </div>
                                    <!-- card header ends -->
                                    <!-- card body starts -->
                                    <div
                                        class="flex w-full flex-col items-start justify-start p-4"
                                    >
                                        <ol
                                            class="list-decimal pl-6 text-base text-slate-500"
                                        >
                                            <li class="mb-4">
                                                <p class="mb-2">
                                                    Kadar bagi Bayaran Pakaian
                                                    Istiadat, Bantuan Bayaran
                                                    Pakaian <em>Black Tie</em> dan
                                                    Bayaran Pakaian Menghadiri Upacara
                                                    Rasmi adalah seperti berikut:
                                                </p>
                                                <table
                                                    class="mb-4 w-full table-auto border-collapse border border-gray-400"
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                class="border border-gray-400 px-4 py-2"
                                                                >Bil</th
                                                            >
                                                            <th
                                                                class="border border-gray-400 px-4 py-2"
                                                                >Jenis Pakaian</th
                                                            >
                                                            <th
                                                                class="border border-gray-400 px-4 py-2"
                                                                >Kadar Bayaran
                                                                (RM)</th
                                                            >
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-center"
                                                                >1.</td
                                                            >
                                                            <td
                                                                class="border border-gray-400 px-4 py-2"
                                                                >Bayaran Pakaian
                                                                Istiadat</td
                                                            >
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-right"
                                                                >1,500.00</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-center"
                                                                >2.</td
                                                            >
                                                            <td
                                                                class="border border-gray-400 px-4 py-2"
                                                                >Bantuan Bayaran
                                                                Pakaian <em
                                                                    >Black Tie</em
                                                                ></td
                                                            >
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-right"
                                                                >1,000.00</td
                                                            >
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-center"
                                                                >3.</td
                                                            >
                                                            <td
                                                                class="border border-gray-400 px-4 py-2"
                                                            >
                                                                Bayaran Pakaian
                                                                Menghadiri
                                                                Upacara Rasmi<br
                                                                />
                                                                <span
                                                                    class="block"
                                                                    >(pegawai)</span
                                                                >
                                                                <span
                                                                    class="block"
                                                                    >(pasangan)</span
                                                                >
                                                            </td>
                                                            <td
                                                                class="border border-gray-400 px-4 py-2 text-right"
                                                            >
                                                                650.00<br />
                                                                450.00
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </li>
                                            <li class="mb-4">
                                                <p class="mb-2">
                                                    Kemudahan ini adalah
                                                    tertakluk kepada syarat
                                                    seperti berikut:
                                                </p>
                                                <ul class="list-disc pl-6">
                                                    <li class="mb-1">
                                                        Kemudahan bayaran
                                                        pakaian ini diberi
                                                        setiap tiga (3) tahun
                                                        sekali.
                                                    </li>
                                                    <li class="mb-1">
                                                        Pegawai yang telah
                                                        diberi Bayaran Pakaian
                                                        Istiadat <strong
                                                            >tidak layak</strong
                                                        > menuntut Bayaran Pakaian
                                                        Menghadiri Upacara Rasmi
                                                        dalam tempoh tiga (3) tahun
                                                        yang sama;
                                                    </li>
                                                    <li class="mb-1">
                                                        Tuntutan bayaran balik
                                                        hendaklah disokong
                                                        dengan resit; dan
                                                    </li>
                                                    <li class="mb-1">
                                                        Tuntutan bayaran balik
                                                        Pakaian Menghadiri
                                                        Upacara Rasmi hendaklah
                                                        disokong dengan maklumat
                                                        mengenai jemputan
                                                        upacara rasmi atau surat
                                                        arahan bertugas di
                                                        Parlimen atau Dewan
                                                        Undangan Negeri.
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <p>
                                                    Penggunaan kemudahan ini
                                                    hendaklah dicatatkan dalam
                                                    Buku Perkhidmatan pegawai.
                                                </p>
                                            </li>
                                        </ol>
                                    </div>
                                    <!-- card body ends -->
                                </div>
                                <!-- card ends -->
                            </form>
                        {:else if currentAllowanceTypeCode == AllowanceTypeConstant.passportPayment.code}
                            <!-- ################################################################### -->
                            <!-- PASSPORT PAYMENT -->
                            <!-- ################################################################### -->
                            <form
                                id="passportPaymentForm"
                                method="POST"
                                use:passportPaymentEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    disabled={$passportPaymentForm.isDraft ==
                                        false}
                                    id="reason"
                                    label={'7. Tujuan Pembaharuan Pasport'}
                                    type="textarea"
                                    errors={$passportPaymentErrors.reason}
                                    bind:val={$passportPaymentForm.reason}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={$passportPaymentForm.isDraft ==
                                        false}
                                    id="renewDate"
                                    label={'8. Tarikh Pembaharuan Pasport'}
                                    type="date"
                                    errors={$passportPaymentErrors.renewDate}
                                    bind:val={$passportPaymentForm.renewDate}
                                ></CustomTextField>
                                <div
                                    class="w-full flex-row items-center justify-start"
                                >
                                    <p
                                        class="w-full text-justify text-base italic text-slate-500"
                                    >
                                        (Sertakan resit <span
                                            class="font-medium">ASAL</span
                                        >)
                                    </p>
                                </div>

                                <DocumentInput
                                    disabled={$passportPaymentForm.isDraft ==
                                        false}
                                    errors={$passportPaymentErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$passportPaymentForm.documents}
                                    label="10. Dokumen Sokongan"
                                ></DocumentInput>
                            </form>
                        {:else if currentAllowanceTypeCode == AllowanceTypeConstant.otherAllowance.code}
                            <!-- ################################################################### -->
                            <!-- OTHER ALLOWANCE -->
                            <!-- ################################################################### -->
                            <form
                                id="otherAllowanceForm"
                                method="POST"
                                use:otherAllowanceEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    disabled={$otherAllowanceForm.isDraft ==
                                        false}
                                    id="reason"
                                    label={'7. Tujuan Permohonan'}
                                    type="textarea"
                                    errors={$otherAllowanceErrors.reason}
                                    bind:val={$otherAllowanceForm.reason}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={$otherAllowanceForm.isDraft ==
                                        false}
                                    id="amount"
                                    label={'8. Amaun (RM)'}
                                    type="number"
                                    errors={$otherAllowanceErrors.amount}
                                    bind:val={$otherAllowanceForm.amount}
                                ></CustomTextField>
                                <div
                                    class="w-full flex-row items-center justify-start"
                                >
                                    <p
                                        class="w-full text-justify text-base italic text-slate-500"
                                    >
                                        (Sertakan resit-resit yang berkaitan )
                                    </p>
                                </div>

                                <DocumentInput
                                    id="otherAllowanceDocument"
                                    disabled={$otherAllowanceForm.isDraft ==
                                        false}
                                    errors={$otherAllowanceErrors.document?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$otherAllowanceForm.document}
                                    label="10. Dokumen Sokongan"
                                ></DocumentInput>
                            </form>
                        {:else if currentAllowanceTypeCode == AllowanceTypeConstant.houseMoving.code}
                            <!-- ################################################################### -->
                            <!-- HOUSE MOVING -->
                            <!-- ################################################################### -->
                            <form
                                id="houseMovingForm"
                                method="POST"
                                use:houseMovingEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    disabled={$houseMovingForm.isDraft == false}
                                    id="movingDate"
                                    label={'7. Tarikh Melaksanakan Perpindahan Rumah'}
                                    type="date"
                                    errors={$houseMovingErrors.movingDate}
                                    bind:val={$houseMovingForm.movingDate}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={$houseMovingForm.isDraft == false}
                                    id="oldAddress"
                                    label={'8. Alamat Rumah Lama'}
                                    type="textarea"
                                    errors={$houseMovingErrors.oldAddress}
                                    bind:val={$houseMovingForm.oldAddress}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={$houseMovingForm.isDraft == false}
                                    id="newAddress"
                                    label={'9. Alamat Rumah Baru'}
                                    type="textarea"
                                    errors={$houseMovingErrors.newAddress}
                                    bind:val={$houseMovingForm.newAddress}
                                ></CustomTextField>
                                <DocumentInput
                                    id="houseMovingDocument"
                                    disabled={$houseMovingForm.isDraft == false}
                                    errors={$houseMovingErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$houseMovingForm.documents}
                                    label="10. Dokumen Sokongan"
                                ></DocumentInput>

                                <!-- card starts -->
                                <div
                                    class=" flex w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border"
                                >
                                    <!-- card header starts -->
                                    <div
                                        class="flex h-7 min-h-7 w-full flex-row items-center justify-start rounded-t bg-gray-100 px-4"
                                    >
                                        <p
                                            class="w-full text-md font-medium leading-tight text-slate-500"
                                        >
                                            Pengakuan
                                        </p>
                                    </div>
                                    <!-- card header ends -->
                                    <!-- card body starts -->
                                    <div
                                        class="flex w-full flex-col items-start justify-start p-4"
                                    >
                                        <p
                                            class="text-slate text-base text-slate-500"
                                        >
                                            Saya mengaku bahawa:
                                        </p>
                                        <ol
                                            class="list-decimal pl-6 text-base text-slate-500"
                                        >
                                            <li class="mb-4">
                                                <p class="mb-2">
                                                    Perjalanan pada tarikh
                                                    tersebut adalah benar.
                                                </p>
                                            </li>
                                            <li class="mb-4">
                                                <p class="mb-2">
                                                    Tuntutan ini dibuat mengikut
                                                    kadar dan syarat seperti
                                                    yang berkuatkuasa semasa;
                                                    dan
                                                </p>
                                            </li>
                                            <li>
                                                <p>
                                                    Butir-butir seperti yang
                                                    dinyatakan di atas adalah
                                                    benar dan saya
                                                    bertanggungjawab
                                                    terhadapnya.
                                                </p>
                                            </li>
                                        </ol>
                                    </div>
                                    <!-- card body ends -->
                                </div>
                                <!-- card ends -->
                                <!-- card starts -->
                                <div
                                    class=" flex w-full flex-col items-start justify-start gap-2 overflow-hidden rounded-md border"
                                >
                                    <!-- card header starts -->
                                    <div
                                        class="flex h-7 min-h-7 w-full flex-row items-center justify-start rounded-t bg-gray-100 px-4"
                                    >
                                        <p
                                            class="w-full text-md font-medium leading-tight text-slate-500"
                                        >
                                            Jadual 2
                                        </p>
                                    </div>
                                    <!-- card header ends -->
                                    <!-- card body starts -->
                                    <div
                                        class="flex w-full flex-col items-start justify-start p-4"
                                    >
                                        <Jadual_2></Jadual_2>
                                    </div>
                                    <!-- card body ends -->
                                </div>
                                <!-- card ends -->
                            </form>
                        {:else if currentAllowanceTypeCode == AllowanceTypeConstant.winterClothing.code}
                            <!-- ################################################################### -->
                            <!-- WINTER CLOTHING -->
                            <!-- ################################################################### -->
                            <form
                                id="winterClothingForm"
                                method="POST"
                                use:winterClothingEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    disabled={!$winterClothingForm.isDraft}
                                    id="reason"
                                    label={'7. Tujuan Permohonan'}
                                    type="textarea"
                                    errors={$winterClothingErrors.reason}
                                    bind:val={$winterClothingForm.reason}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$winterClothingForm.isDraft}
                                    type="number"
                                    id="personal"
                                    label={'8. Jumlah Tuntutan (RM)'}
                                    errors={$winterClothingErrors.personal}
                                    bind:val={$winterClothingForm.personal}
                                ></CustomTextField>
                                <DocumentInput
                                    disabled={!$winterClothingForm.isDraft}
                                    errors={$winterClothingErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$winterClothingForm.documents}
                                    label="9. Sila muat naik dokumen sokongan"
                                ></DocumentInput>
                            </form>
                        {:else if currentAllowanceTypeCode == AllowanceTypeConstant.funeralArrangement.code}
                            <!-- ################################################################### -->
                            <!-- FUNERAL -->
                            <!-- ################################################################### -->
                            <form
                                id="funeralForm"
                                method="POST"
                                use:funeralEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    id="name"
                                    label={'7. Nama Kakitangan Yang Meninggal'}
                                    type="text"
                                    errors={$funeralErrors.name}
                                    bind:val={$funeralForm.name}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="text"
                                    id="employeeNumber"
                                    label={'8. Nombor Pekerja Kakitangan Yang Meninggal'}
                                    errors={$funeralErrors.employeeNumber}
                                    bind:val={$funeralForm.employeeNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="text"
                                    id="identityDocumentNumber"
                                    label={'9. No. Kad Pengenalan Kakitangan Yang Meninggal'}
                                    errors={$funeralErrors.identityDocumentNumber}
                                    bind:val={$funeralForm.identityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="date"
                                    id="deathDate"
                                    label={'10. Tarikh Kematian'}
                                    errors={$funeralErrors.deathDate}
                                    bind:val={$funeralForm.deathDate}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="text"
                                    id="deathTime"
                                    label={'11. Masa Kematian Disahkan'}
                                    errors={$funeralErrors.deathTime}
                                    bind:val={$funeralForm.deathTime}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="text"
                                    id="nextOfKinName"
                                    label={'12. Nama Waris'}
                                    errors={$funeralErrors.nextOfKinName}
                                    bind:val={$funeralForm.nextOfKinName}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="text"
                                    id="nextOfKinAddress"
                                    label={'13. Alamat Waris'}
                                    errors={$funeralErrors.nextOfKinAddress}
                                    bind:val={$funeralForm.nextOfKinAddress}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled={!$funeralForm.isDraft}
                                    type="number"
                                    id="relationshipId"
                                    label={'14. Hubungan Dengan Kakitangan Yang Meninggal'}
                                    errors={$funeralErrors.relationshipId}
                                    bind:val={$funeralForm.relationshipId}
                                ></CustomTextField>
                                <DocumentInput
                                    disabled={!$funeralForm.isDraft}
                                    errors={$funeralErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$funeralForm.documents}
                                    label="15. Sila muat naik dokumen sokongan"
                                ></DocumentInput>
                            </form>
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- ASSIGN DIRECTOR -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Lantikan Pengarah Bahagian/Negeri">
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="assignDirectorForm"
                    onClick={() => {
                        isDraft = false;
                    }}
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="assignDirectorForm"
                            method="POST"
                            use:assignDirectorEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            {#if data.props.currentApplicationDetails.assignDirector == null}
                                {#if (data.props.layoutData.accountDetails.currentRoleCode = RoleConstant.urusSetiaElaunElaunPerkhidmatan.code)}
                                    <CustomSelectField
                                        id="identityDocumentNumber"
                                        label={'Sila pilih Pengarah Bahagian/Negeri untuk memberi sokongan bagi permohonan ini'}
                                        bind:val={$assignDirectorForm.identityDocumentNumber}
                                        options={data.lookup.directorDrodpwon}
                                    ></CustomSelectField>
                                {:else}
                                    <div
                                        class="flex w-full flex-row items-center justify-start gap-2 rounded-md bg-blue-200 p-2"
                                    >
                                        <p
                                            class="text-base font-medium text-blue-700"
                                        >
                                            Bahagian ini adalah untuk kegunaan
                                            Urus Setia Elaun-elaun Perkhidmatan
                                        </p>
                                    </div>
                                {/if}
                            {:else}
                                <CustomTextField
                                    disabled
                                    id="identityDocumentNumber"
                                    label={'No Kad Pengenalan'}
                                    bind:val={$assignDirectorForm.identityDocumentNumber}
                                ></CustomTextField>
                                <CustomTextField
                                    disabled
                                    id="employeeName"
                                    label={'Nama Pengarah'}
                                    bind:val={$assignDirectorForm.employeeName}
                                ></CustomTextField>
                            {/if}
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- DIRECTOR SUPPORT -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Sokongan & Ulasan Pengarah Bahagian/Negeri"
            >
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="directorSupportForm"
                    onClick={() => {
                        isDraft = false;
                    }}
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="directorSupportForm"
                            method="POST"
                            use:directorSupportEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={!data.props.currentApplicationDetails
                                    .directorSupport?.status == null}
                                id="status"
                                label="Permohonan tuntutan pegawai di atas adalah"
                                bind:val={$directorSupportForm.status}
                                bind:errors={$directorSupportErrors.status}
                                options={supportAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                disabled={!data.props.currentApplicationDetails
                                    .directorSupport?.status == null}
                                type="textarea"
                                id="remark"
                                label={'Jika tidak disokong, sila nyatakan sebab'}
                                errors={$directorSupportErrors.remark}
                                bind:val={$directorSupportForm.remark}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="name"
                                label={'Nama'}
                                errors={$directorSupportErrors.name}
                                bind:val={$directorSupportForm.name}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                errors={$directorSupportErrors.identityDocumentNumber}
                                bind:val={$directorSupportForm.identityDocumentNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="date"
                                label={'Tarikh'}
                                errors={$directorSupportErrors.date}
                                bind:val={$directorSupportForm.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- SECRETARY VERIFICATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Pengesahan Urus Setia">
                {#if data.props.currentApplicationDetails.verification?.status == null}
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="secretaryVerificationForm"
                        onClick={() => {
                            isDraft = false;
                        }}
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="secretaryVerificationForm"
                            method="POST"
                            use:secretaryVerificationEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={!data.props.currentApplicationDetails
                                    .verification?.status == null}
                                id="reason"
                                label="Adakah Permohonan Ini Sah?"
                                bind:val={$secretaryVerificationForm.status}
                                bind:errors={$secretaryVerificationErrors.status}
                                options={certifyAltAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                disabled={!data.props.currentApplicationDetails
                                    .verification?.status == null}
                                type="textarea"
                                id="reason"
                                label={'Jika tidak diluluskan, sila nyatakan sebab'}
                                errors={$secretaryVerificationErrors.remark}
                                bind:val={$secretaryVerificationForm.remark}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="name"
                                label={'Nama'}
                                errors={$secretaryVerificationErrors.name}
                                bind:val={$secretaryVerificationForm.name}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                errors={$secretaryVerificationErrors.identityDocumentNumber}
                                bind:val={$secretaryVerificationForm.identityDocumentNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="date"
                                label={'Tarikh'}
                                errors={$secretaryVerificationErrors.date}
                                bind:val={$secretaryVerificationForm.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- ASSIGN SUPPORTER AND APPROVER -->
        <!-- ======================================================================= -->
        {#if data.props.layoutData.accountDetails.currentRoleCode == RoleConstant.urusSetiaElaunElaunPerkhidmatan.code}
            <StepperContent>
                <StepperContentHeader title="Lantikan Penyokong dan Pelulus">
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="endorserDetailForm"
                        onClick={() => {
                            isDraft = false;
                        }}
                        icon="check"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                    >
                        <div
                            class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                        >
                            <form
                                id="endorserDetailForm"
                                method="POST"
                                use:endorserDetailEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                {#if data.props.currentApplicationDetails.supporterApprover == null}
                                    <CustomSelectField
                                        id="supporterIdentityDocumentNumber"
                                        label={'Sila pilih penyokong untuk permohonan ini'}
                                        bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                        options={data.lookup.directorDrodpwon}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="approverIdentityDocumentNumber"
                                        label={'Sila pilih pelulus untuk permohonan ini'}
                                        bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                        options={data.lookup.directorDrodpwon}
                                    ></CustomSelectField>
                                {:else}
                                    <CustomTextField
                                        disabled
                                        type="text"
                                        id="supporterName"
                                        label={'Nama Penyokong'}
                                        errors={$endorserDetailErrors.supporterName}
                                        bind:val={$endorserDetailForm.supporterName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        type="text"
                                        id="supporterIdentityDocumentNumber"
                                        label={'No. Kad Pengenalan  Penyokong'}
                                        errors={$endorserDetailErrors.supporterIdentityDocumentNumber}
                                        bind:val={$endorserDetailForm.supporterIdentityDocumentNumber}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        type="text"
                                        id="approverName"
                                        label={'Nama Pelulus'}
                                        errors={$endorserDetailErrors.approverName}
                                        bind:val={$endorserDetailForm.approverName}
                                    ></CustomTextField>
                                    <CustomTextField
                                        disabled
                                        type="text"
                                        id="approverIdentityDocumentNumber"
                                        label={'No. Kad Pengenalan Pelulus'}
                                        errors={$endorserDetailErrors.approverIdentityDocumentNumber}
                                        bind:val={$endorserDetailForm.approverIdentityDocumentNumber}
                                    ></CustomTextField>
                                {/if}
                            </form>
                        </div>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ======================================================================= -->
        <!-- SUPPORTER FEEDBACK -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Ulasan & Syor Ketua Seksyen Pengurusan Sumber Manusia"
            >
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="supporterFeedbackForm"
                    onClick={() => {
                        isDraft = false;
                    }}
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="supporterFeedbackForm"
                            method="POST"
                            use:supporterFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={false}
                                id="reason"
                                label="Permohonan tuntutan pegawai di atas adalah"
                                bind:val={$supporterFeedbackForm.status}
                                bind:errors={$supporterFeedbackErrors.status}
                                options={supportAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                type="textarea"
                                id="reason"
                                label={'Jika tidak disokong, sila nyatakan sebab'}
                                errors={$supporterFeedbackErrors.remark}
                                bind:val={$supporterFeedbackForm.remark}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="name"
                                label={'Nama'}
                                errors={$supporterFeedbackErrors.name}
                                bind:val={$supporterFeedbackForm.name}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                errors={$supporterFeedbackErrors.identityDocumentNumber}
                                bind:val={$supporterFeedbackForm.identityDocumentNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="date"
                                label={'Tarikh'}
                                errors={$supporterFeedbackErrors.date}
                                bind:val={$supporterFeedbackForm.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- APPROVER FEEDBACK -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Kelulusan Pengarah Bahagian Khidmat Pengurusan"
            >
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="approverFeedbackForm"
                    onClick={() => {
                        isDraft = false;
                    }}
                    icon="check"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="approverFeedbackForm"
                            method="POST"
                            use:approverFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={false}
                                id="reason"
                                label="Permohonan ini"
                                bind:val={$approverFeedbackForm.status}
                                bind:errors={$approverFeedbackErrors.status}
                                options={approveAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                disabled={false}
                                type="textarea"
                                id="reason"
                                label={'Jika tidak diluluskan, sila nyatakan sebab'}
                                errors={$approverFeedbackErrors.remark}
                                bind:val={$approverFeedbackForm.remark}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="name"
                                label={'Nama'}
                                errors={$approverFeedbackErrors.name}
                                bind:val={$approverFeedbackForm.name}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="identityDocumentNumber"
                                label={'No. Kad Pengenalan'}
                                errors={$approverFeedbackErrors.identityDocumentNumber}
                                bind:val={$approverFeedbackForm.identityDocumentNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="date"
                                label={'Tarikh'}
                                errors={$approverFeedbackErrors.date}
                                bind:val={$approverFeedbackForm.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- SECRETARY  CONFIRMATION -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Pengesahan Urus Setia">
                {#if data.props.currentApplicationDetails.secretaryVerification?.status == null}
                    <TextIconButton
                        type="primary"
                        label="Hantar"
                        form="secretaryConfirmationForm"
                        onClick={() => {
                            isDraft = false;
                        }}
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full max-h-full w-full max-w-full flex-col items-start justify-start overflow-y-auto overflow-x-hidden p-4"
                >
                    <div
                        class="flex w-full flex-col items-start justify-start gap-4 lg:w-1/2"
                    >
                        <form
                            id="secretaryConfirmationForm"
                            method="POST"
                            use:secretaryConfirmationEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomTextField
                                type="number"
                                id="total"
                                label={'Jumlah Yang Diluluskan (RM)'}
                                errors={$secretaryConfirmationErrors.total}
                                bind:val={$secretaryConfirmationForm.total}
                            ></CustomTextField>
                            <CustomTextField
                                type="text"
                                id="referenceNumber"
                                label={'Nombor Rujukan Surat/Arahan Bayaran'}
                                errors={$secretaryConfirmationErrors.referenceNumber}
                                bind:val={$secretaryConfirmationForm.referenceNumber}
                            ></CustomTextField>
                            <CustomTextField
                                disabled
                                type="text"
                                id="date"
                                label={'Tarikh'}
                                errors={$secretaryConfirmationErrors.date}
                                bind:val={$secretaryConfirmationForm.date}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
