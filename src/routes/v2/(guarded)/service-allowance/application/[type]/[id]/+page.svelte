<script lang="ts">
    import {
        certifyOptions,
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
        ServiceAllowanceHouseMovingDetailSchema,
        ServiceAllowanceOtherAllowanceDetailSchema,
        ServiceAllowancePassportPaymentDetailSchema,
        ServiceAllowanceWinterClothingDetailSchema,
        type ServiceAllowanceCeremonyClothingDetailType,
        type ServiceAllowancePassportPaymentDetailType,
    } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
    import {
        _approverFeedbackSubmit,
        _assignDirectorSubmit,
        _ceremonyClothingSubmit,
        _directorSupportSubmit,
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

    // 4. house moving form
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
            _approverFeedbackSubmit($approverFeedbackForm);
        },
    });

    // 6. Supporter Confirmation Form
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
                                    disabled={$ceremonyClothingForm.isDraft == false}
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
                                    disabled={false}
                                    id="ceremonyClothingPrevious"
                                    label="8.1 Bayaran Pakaian Istiadat"
                                    bind:errors={$ceremonyClothingErrors.ceremonyClothingPrevious}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    type="date"
                                    id="ceremonyClothingPreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.ceremonyClothingPreviousDate}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="blackTiePrevious"
                                    label="8.2 Bantuan Bayaran Black Tie"
                                    bind:errors={$ceremonyClothingErrors.blackTiePrevious}
                                    bind:val={$ceremonyClothingForm.blackTiePrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    type="date"
                                    id="blackTiePreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.blackTiePreviousDate}
                                    bind:val={$ceremonyClothingForm.blackTiePreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="officialClothingPrevious"
                                    label="8.3 Bayaran Pakaian Menghadiri Upacara Rasmi"
                                    bind:errors={$ceremonyClothingErrors.officialClothingPrevious}
                                    bind:val={$ceremonyClothingForm.officialClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
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
                                    type="number"
                                    id="personal"
                                    label={'9.1 Sendiri (RM)'}
                                    errors={$ceremonyClothingErrors.personal}
                                    bind:val={$ceremonyClothingForm.personal}
                                ></CustomTextField>
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'9.2 Pasangan (RM)'}
                                    errors={$ceremonyClothingErrors.partner}
                                    bind:val={$ceremonyClothingForm.partner}
                                ></CustomTextField>

                                <DocumentInput
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
                                    errors={$otherAllowanceErrors.documents?._errors?.map(
                                        (error) => error,
                                    )}
                                    bind:documents={$otherAllowanceForm.documents}
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
                                    disabled={false}
                                    id="ceremonyClothingPrevious"
                                    label="8.1 Bayaran Pakaian Istiadat"
                                    bind:errors={$ceremonyClothingErrors.ceremonyClothingPrevious}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    type="date"
                                    id="ceremonyClothingPreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.ceremonyClothingPreviousDate}
                                    bind:val={$ceremonyClothingForm.ceremonyClothingPreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="blackTiePrevious"
                                    label="8.2 Bantuan Bayaran Black Tie"
                                    bind:errors={$ceremonyClothingErrors.blackTiePrevious}
                                    bind:val={$ceremonyClothingForm.blackTiePrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
                                    type="date"
                                    id="blackTiePreviousDate"
                                    label={'Jika pernah, sila nyatakan tarikh terakhir kemudahan diluluskan'}
                                    errors={$ceremonyClothingErrors.blackTiePreviousDate}
                                    bind:val={$ceremonyClothingForm.blackTiePreviousDate}
                                ></CustomTextField>
                                <CustomRadioBoolean
                                    disabled={false}
                                    id="officialClothingPrevious"
                                    label="8.3 Bayaran Pakaian Menghadiri Upacara Rasmi"
                                    bind:errors={$ceremonyClothingErrors.officialClothingPrevious}
                                    bind:val={$ceremonyClothingForm.officialClothingPrevious}
                                    options={commonOptions}
                                ></CustomRadioBoolean>
                                <CustomTextField
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
                                    type="number"
                                    id="personal"
                                    label={'9.1 Sendiri (RM)'}
                                    errors={$ceremonyClothingErrors.personal}
                                    bind:val={$ceremonyClothingForm.personal}
                                ></CustomTextField>
                                <CustomTextField
                                    type="number"
                                    id="partner"
                                    label={'9.2 Pasangan (RM)'}
                                    errors={$ceremonyClothingErrors.partner}
                                    bind:val={$ceremonyClothingForm.partner}
                                ></CustomTextField>

                                <DocumentInput
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
                    type="draft"
                    label="Simpan"
                    form="assignDirectorForm"
                    onClick={() => {
                        isDraft = true;
                    }}
                >
                    <SvgSave></SvgSave>
                </TextIconButton>
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
                            <CustomSelectField
                                id="directorName"
                                label={'Sila pilih Pengarah Bahagian/Negeri untuk memberi sokongan bagi permohonan ini'}
                                bind:val={currentAllowanceTypeCode}
                                options={data.lookup.allowanceDropdown}
                            ></CustomSelectField>
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
                            use:ceremonyClothingEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={false}
                                id="status"
                                label="Permohonan tuntutan pegawai di atas adalah"
                                bind:val={$directorSupportForm.status}
                                bind:errors={$directorSupportErrors.status}
                                options={supportAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                type="textarea"
                                id="reason"
                                label={'Jika tidak disokong, sila nyatakan sebab'}
                                errors={$directorSupportErrors.remark}
                                bind:val={$directorSupportForm.remark}
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
            <StepperContentHeader title="Semakan Urus Setia">
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
                            id="secretaryVerificationForm"
                            method="POST"
                            use:secretaryVerificationEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={false}
                                id="reason"
                                label="Butiran permohonan adalah lengkap dan sah"
                                bind:val={$secretaryVerificationForm.status}
                                bind:errors={$secretaryVerificationErrors.status}
                                options={certifyOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                type="textarea"
                                id="reason"
                                label={'Jika tidak sah, sila nyatakan sebab'}
                                errors={$secretaryVerificationErrors.remark}
                                bind:val={$secretaryVerificationForm.remark}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- SUPPORTER FEEDBACK -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Ulasan & Syor Ketua Seksyen Pengurusan Sumber Manusia"
            >
                <TextIconButton
                    type="draft"
                    label="Simpan"
                    form="supporterFeedbackForm"
                    onClick={() => {
                        isDraft = true;
                    }}
                >
                    <SvgSave></SvgSave>
                </TextIconButton>
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
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ======================================================================= -->
        <!-- approver FEEDBACK -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader
                title="Kelulusan Pengarah Bahagian Khidmat Pengurusan"
            >
                <TextIconButton
                    type="draft"
                    label="Simpan"
                    form="approverFeedbackForm"
                    onClick={() => {
                        isDraft = true;
                    }}
                >
                    <SvgSave></SvgSave>
                </TextIconButton>
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
                                options={supportAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                type="textarea"
                                id="reason"
                                label={'Jika tidak diluluskan, sila nyatakan sebab'}
                                errors={$approverFeedbackErrors.remark}
                                bind:val={$approverFeedbackForm.remark}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- ======================================================================= -->
        <!-- Secretary Confirmation -->
        <!-- ======================================================================= -->
        <StepperContent>
            <StepperContentHeader title="Pengesahan Urus Setia">
                <TextIconButton
                    type="draft"
                    label="Simpan"
                    form="secretaryConfirmationForm"
                    onClick={() => {
                        isDraft = true;
                    }}
                >
                    <SvgSave></SvgSave>
                </TextIconButton>
                <TextIconButton
                    type="primary"
                    label="Hantar"
                    form="secretaryConfirmationForm"
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
                            id="secretaryConfirmationForm"
                            method="POST"
                            use:secretaryConfirmationEnhance
                            class="flex w-full flex-col items-center justify-start gap-2"
                        >
                            <CustomRadioBoolean
                                disabled={false}
                                id="reason"
                                label="Permohonan ini"
                                bind:val={$secretaryConfirmationForm.status}
                                bind:errors={$secretaryConfirmationErrors.status}
                                options={supportAltOptions}
                            ></CustomRadioBoolean>
                            <CustomTextField
                                type="textarea"
                                id="reason"
                                label={'Jika tidak diluluskan, sila nyatakan sebab'}
                                errors={$secretaryConfirmationErrors.remark}
                                bind:val={$secretaryConfirmationForm.remark}
                            ></CustomTextField>
                        </form>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
