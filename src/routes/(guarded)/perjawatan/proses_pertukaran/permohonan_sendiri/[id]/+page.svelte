<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { TransferTypeConstant } from '$lib/constants/core/transfer.constant';
    import type {
        TransferCommonDetailDTO,
        TransferDocumentAddDTO,
        TransferSelfDetailDTO,
    } from '$lib/dto/mypsm/employment/transfer/transfer.dto';
    import {
        TransferCommonDetailSchema,
        TransferCommonEndorsementSchema,
        TransferCommonEndorserDetailSchema,
        TransferCommonMeetingSchema,
        TransferCommonPostponeApplicationSchema,
        TransferCommonPostponeResultSchema,
        TransferSelfDetailSchema,
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
    import { Alert, Badge } from 'flowbite-svelte';
    import { Toaster } from 'svelte-french-toast';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _submitApplicationDetailForm,
        _submitMeetingResultForm,
        _submitPostponeApplicationForm,
        _submitPostponeResultForm,
        _submitPostponeApprovalForm,
        _submitEndorserDetailForm,
        _submitSupporterFeedbackForm,
        _submitApproverFeedbackForm,
        _prepDocumentUpload,
        _submitDocument,
        _submitPostponeDocument,
        _submitReasonForm,
        _submitFirstDirectorFeedbackForm,
        _submitSecondDirectorFeedbackForm,
        _submitConfirmationForm,
    } from './+page';
    import type { PageData } from './$types';

    export let data: PageData;

    let files: FileList;

    // application detail
    const {
        form: applicationDetailForm,
        errors: applicationDetailErrors,
        enhance: applicationDetailEnhance,
    } = superForm(data.forms.applicationDetailForm, {
        id: 'applicationDetailForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferSelfDetailSchema),
        async onSubmit(input) {
            const response = _submitApplicationDetailForm(
                $applicationDetailForm,
            ).then((value) => {
                if (value.response.status == 'success') {
                    let applicationDetail: TransferSelfDetailDTO =
                        value.response.data?.details;

                    let url =
                        '/perjawatan/proses_pertukaran/permohonan_sendiri/' +
                        applicationDetail.id;

                    goto(url, { replaceState: true });
                }
            });
        },
    });

    // // reason form
    const {
        form: employeeReasonForm,
        errors: employeeReasonErrors,
        enhance: employeeReasonEnhance,
    } = superForm(data.forms.employeeReasonForm, {
        id: 'employeeReasonForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonMeetingSchema),
        async onSubmit(input) {
            $employeeReasonForm.id = data.props.currentApplicationId;
            const response = _submitReasonForm($employeeReasonForm);
        },
    });

    // postpone approval form
    const {
        form: employeeConfirmationForm,
        errors: employeeConfirmationErrors,
        enhance: employeeConfirmationEnhance,
    } = superForm(data.forms.employeeConfirmationForm, {
        id: 'employeeConfirmationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitConfirmationForm($employeeConfirmationForm);
        },
    });

    // firstDirectorFeedback form
    const {
        form: firstDirectorFeedbackForm,
        errors: firstDirectorFeedbackErrors,
        enhance: firstDirectorFeedbackEnhance,
    } = superForm(data.forms.firstDirectorFeedbackForm, {
        id: 'firstDirectorFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitFirstDirectorFeedbackForm(
                $firstDirectorFeedbackForm,
            );
        },
    });

    // secondDirectorFeedback form
    const {
        form: secondDirectorFeedbackForm,
        errors: secondDirectorFeedbackErrors,
        enhance: secondDirectorFeedbackEnhance,
    } = superForm(data.forms.secondDirectorFeedbackForm, {
        id: 'secondDirectorFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitSecondDirectorFeedbackForm(
                $secondDirectorFeedbackForm,
            );
        },
    });

    // meeting form
    const {
        form: meetingResultForm,
        errors: meetingResultErrors,
        enhance: meetingResultEnhance,
    } = superForm(data.forms.meetingResultForm, {
        id: 'meetingResultForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonMeetingSchema),
        async onSubmit(input) {
            const response = _submitMeetingResultForm($meetingResultForm);
        },
    });

    // postpone application
    const {
        form: postponeApplicationForm,
        errors: postponeApplicationErrors,
        enhance: postponeApplicationEnhance,
    } = superForm(data.forms.postponeApplicationForm, {
        id: 'postponeApplicationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonPostponeApplicationSchema),
        async onSubmit(input) {
            const response = _submitPostponeApplicationForm(
                $postponeApplicationForm,
            );
        },
    });

    // postpone result form
    const {
        form: postponeResultForm,
        errors: postponeResultErrors,
        enhance: postponeResultEnhance,
    } = superForm(data.forms.postponeResultForm, {
        id: 'postponeResultForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonPostponeResultSchema),
        async onSubmit(input) {
            const response = _submitPostponeResultForm($postponeResultForm);
        },
    });

    // postpone approval form
    const {
        form: postponeApprovalForm,
        errors: postponeApprovalErrors,
        enhance: postponeApprovalEnhance,
    } = superForm(data.forms.postponeApprovalForm, {
        id: 'postponeApprovalForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitPostponeApprovalForm($postponeApprovalForm);
        },
    });

    // ednorser detail form
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorserDetailSchema),
        async onSubmit(input) {
            const response = _submitEndorserDetailForm($endorserDetailForm);
        },
    });

    // supporter feedback form
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.forms.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitSupporterFeedbackForm(
                $supporterFeedbackForm,
            );
        },
    });

    // approver feedback form
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.forms.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(TransferCommonEndorsementSchema),
        async onSubmit(input) {
            const response = _submitApproverFeedbackForm($approverFeedbackForm);
        },
    });

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _prepDocumentUpload(files)
                .then((result) => {
                    let interimDocuments: TransferDocumentAddDTO = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitDocument(JSON.stringify(interimDocuments));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    function uploadPostponeDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _prepDocumentUpload(files)
                .then((result) => {
                    let postpone: TransferDocumentAddDTO = {
                        id: data.props.currentApplicationId,
                        documents: result,
                    };
                    _submitPostponeDocument(JSON.stringify(postpone));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        {#if data.props.currentApplicationId !== 0}
            <Badge color="indigo"
                >{data.props.currentApplicationDetail.status}</Badge
            >
        {/if}
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/perjawatan/proses_pertukaran');
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
        <!-- ================================= -->
        <!-- DETAIL -->
        <!-- ================================= -->
        <StepperContent>
            <StepperContentHeader title="Butiran Pertukaran">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'employee'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="applicationDetailForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode !== 'employee'}
                    <div class="flex w-full flex-col gap-10 px-3 pb-10">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu maklum balas dari pihak berkenaan.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="applicationDetailForm"
                            method="POST"
                            use:applicationDetailEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'employee'}
                                    id="transferType"
                                    label={'Jenis Pertukaran'}
                                    bind:val={$applicationDetailForm.transferType}
                                    options={data.props.transferTypeDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'employee'}
                                    id="firstChoiceId"
                                    label={'Penempatan Baru Pilihan Pertama'}
                                    bind:val={$applicationDetailForm.firstChoiceId}
                                    options={data.props.placementListDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'employee'}
                                    id="secondChoiceId"
                                    label={'Penempatan Baru Pilihan Kedua'}
                                    bind:val={$applicationDetailForm.secondChoiceId}
                                    options={data.props.placementListDropdown}
                                ></CustomSelectField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        {#if data.props.currentApplicationId !== 0}
            <!-- ================================= -->
            <!-- REASON -->
            <!-- ================================= -->
            <StepperContent>
                <StepperContentHeader title="Alasan Pertukaran">
                    {#if data.props.currentApplicationDetail.reason == null && data.props.userMode == 'employee'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="employeeReasonForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.reason == null && data.props.userMode !== 'employee'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="employeeReasonForm"
                                method="POST"
                                use:employeeReasonEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail.reason !==
                                            null ||
                                            data.props.userMode != 'employee'}
                                        id="reasonId"
                                        label={'Alasan Permohonan Pertukaran'}
                                        bind:val={$employeeReasonForm.reasonId}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail.reason !==
                                            null ||
                                            data.props.userMode != 'employee'}
                                        id="explanation"
                                        label={'Sila Beri Penjelasan Lebih Lanjut'}
                                        type="text"
                                        errors={$employeeReasonErrors.explanation}
                                        bind:val={$employeeReasonForm.explanation}
                                    ></CustomTextField>
                                </div>
                                {#if $employeeReasonForm.reasonId == 1}
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .reason !== null ||
                                                data.props.userMode !=
                                                    'employee'}
                                            id="distance"
                                            label={'Nyatakan Jarak Antara Tempat Kerja Pasangan (KM)'}
                                            type="number"
                                            errors={$employeeReasonErrors.distance}
                                            bind:val={$employeeReasonForm.distance}
                                        ></CustomTextField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .reason !== null ||
                                                data.props.userMode !=
                                                    'employee'}
                                            id="company"
                                            label={'Nama Majikan Suami/Isteri'}
                                            type="text"
                                            errors={$employeeReasonErrors.company}
                                            bind:val={$employeeReasonForm.company}
                                        ></CustomTextField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .reason !== null ||
                                                data.props.userMode !=
                                                    'employee'}
                                            id="company"
                                            label={'Tarikh Pasangan Mula Berkhidmat'}
                                            type="date"
                                            errors={$employeeReasonErrors.company}
                                            bind:val={$employeeReasonForm.company}
                                        ></CustomTextField>
                                    </div>
                                {/if}
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <!-- ================================= -->
            <!-- CONFIRMATION -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.reason !== null}
                <StepperContent>
                    <StepperContentHeader title="Pengesahan Permohonan">
                        {#if data.props.currentApplicationDetail.confirmation == null && data.props.userMode == 'employee'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="employeeConfirmationForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.confirmation == null && data.props.userMode !== 'employee'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="employeeConfirmationForm"
                                    method="POST"
                                    use:employeeConfirmationEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .confirmation !== null}
                                            id="status"
                                            label={'Saya mengaku bahawa semua butiran permohonan adalah benar'}
                                            bind:val={$employeeConfirmationForm.confirmation}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    {#if data.props.currentApplicationDetail.confirmation !== null}
                                        <div class="flex w-full flex-col gap-2">
                                            <CustomTextField
                                                disabled={data.props
                                                    .currentApplicationDetail
                                                    .confirmation !== null}
                                                id="applicationDate"
                                                label={'Tarikh Pengesahan Permohonan'}
                                                errors={$employeeConfirmationErrors.applicationDate}
                                                bind:val={$employeeConfirmationForm.applicationDate}
                                            ></CustomTextField>
                                        </div>
                                    {/if}
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- TRANSFER DOCUMENT -->
            <!-- ================================= -->
            <!-- {#if data.props.currentApplicationDetail.reason !== null}
                <StepperContent>
                    <StepperContentHeader title="Dokumen Keperluan Pertukaran">
                        {#if data.props.currentApplicationDetail.transferDocument == null && data.props.userMode == 'secretary'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                onClick={() => {
                                    uploadDocument();
                                }}
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.transferDocument !== null}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Muat Naik Surat Pertukaran dan Borang Serah
                                    Tugas
                                </p>
                                {#each data.props.currentApplicationDetail.transferDocument.documents as doc}
                                    <a
                                        href={doc.base64}
                                        target="_blank"
                                        download={doc.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{doc.name}</a
                                    >
                                {/each}
                            </div>
                        {:else if data.props.currentApplicationDetail.transferDocument == null}
                            {#if data.props.userMode == 'secretary'}
                                <div
                                    class="flex h-full w-full flex-col items-start justify-start"
                                >
                                    <form
                                        id="documentUploadForm"
                                        method="POST"
                                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                    >
                                        <div class="flex w-full flex-col gap-2">
                                            <CustomFileField
                                                id="transferDocument"
                                                bind:files
                                            ></CustomFileField>
                                        </div>
                                    </form>
                                </div>
                            {:else}
                                <div
                                    class="flex w-full flex-col gap-10 px-3 pb-10"
                                >
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Tiada Maklumat!</span
                                            >
                                            {data.props.currentApplicationDetail
                                                .status}
                                        </p>
                                    </Alert>
                                </div>
                            {/if}
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if} -->

            <!-- ================================= -->
            <!-- FIRST DIRECTOR APPROVAL -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.confirmation !== null}
                <StepperContent>
                    <StepperContentHeader
                        title="Maklum Balas Pengarah Penempatan Pilihan Pertama"
                    >
                        {#if data.props.currentApplicationDetail.firstDirector == null && data.props.userMode == 'director'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="firstDirectorFeedbackForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.firstDirector == null && data.props.userMode !== 'director'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu maklum balas daripada Pengarah Negeri/Bahagian
                                        <!-- {data.props.currentApplicationDetail
                                            .status} -->
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="firstDirectorFeedbackForm"
                                    method="POST"
                                    use:firstDirectorFeedbackEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .firstDirector !== null}
                                            id="status"
                                            label={'Adakah Permohonan Penangguhan Ini Lulus?'}
                                            bind:val={$firstDirectorFeedbackForm.status}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .firstDirector !== null}
                                            id="remark"
                                            label={'Ulasan'}
                                            errors={$firstDirectorFeedbackErrors.remark}
                                            bind:val={$firstDirectorFeedbackForm.remark}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- SECOND DIRECTOR APPROVAL -->
            <!-- ================================= -->
            <!-- {#if data.props.currentApplicationDetail.confirmation !== null}
                <StepperContent>
                    <StepperContentHeader
                        title="Maklum Balas Pengarah Penempatan Pilihan Kedua"
                    >
                        {#if data.props.currentApplicationDetail.secondDirector == null && data.props.userMode == 'director'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="secondDirectorFeedbackForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.secondDirector == null && data.props.userMode !== 'director'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="secondDirectorFeedbackForm"
                                    method="POST"
                                    use:secondDirectorFeedbackEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .secondDirector !== null}
                                            id="status"
                                            label={'Adakah Permohonan Penangguhan Ini Lulus?'}
                                            bind:val={$secondDirectorFeedbackForm.status}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .secondDirector !== null}
                                            id="remark"
                                            label={'Ulasan'}
                                            errors={$secondDirectorFeedbackErrors.remark}
                                            bind:val={$secondDirectorFeedbackForm.remark}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if} -->

            <!-- ================================= -->
            <!-- MEETING -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.firstDirector !== null}
                <StepperContent>
                    <StepperContentHeader title="Keputusan Mesyuarat">
                        {#if data.props.currentApplicationDetail.meetingDetail == null && data.props.userMode == 'secretary'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="meetingResultForm"
                            ></TextIconButton>
                            <TextIconButton
                                label="Set Semula"
                                type="neutral"
                                icon="reset"
                                onClick={() => {
                                    meetingResultForm.set(
                                        data.forms.meetingResultForm.data,
                                    );
                                }}
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.meetingDetail == null && data.props.userMode !== 'secretary'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu keputusan mesyuarat.
                                        <!-- {data.props.currentApplicationDetail
                                                .status} -->
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="meetingResultForm"
                                    method="POST"
                                    use:meetingResultEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="name"
                                            label={'Nama Mesyuarat'}
                                            type="text"
                                            errors={$meetingResultErrors.name}
                                            bind:val={$meetingResultForm.name}
                                        ></CustomTextField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="date"
                                            label={'Tarikh Mesyuarat'}
                                            type="date"
                                            errors={$meetingResultErrors.date}
                                            bind:val={$meetingResultForm.date}
                                        ></CustomTextField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="result"
                                            label={'Keputusan Mesyuarat'}
                                            bind:val={$meetingResultForm.result}
                                            options={data.props
                                                .meetingResultOption}
                                        ></CustomSelectField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="placementId"
                                            label={'Penempatan Baru (jika ada perubahan dari penempatan cadangan asal)'}
                                            bind:val={$meetingResultForm.placementId}
                                            options={data.props
                                                .placementListDropdown}
                                        ></CustomSelectField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="programmeId"
                                            label={'Program'}
                                            bind:val={$meetingResultForm.programmeId}
                                            options={data.props
                                                .programmeListDropdown}
                                        ></CustomSelectField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="effectiveDate"
                                            label={'Tarikh Berkuatkuasa (jika ada perubahan dari tarikh pertukaran asal)'}
                                            type="date"
                                            errors={$meetingResultErrors.effectiveDate}
                                            bind:val={$meetingResultForm.effectiveDate}
                                        ></CustomTextField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="referenceNo"
                                            label={'Nombor Rujukan Surat'}
                                            type="text"
                                            errors={$meetingResultErrors.referenceNo}
                                            bind:val={$meetingResultForm.referenceNo}
                                        ></CustomTextField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="referenceDate"
                                            label={'Tarikh Surat'}
                                            type="date"
                                            errors={$meetingResultErrors.referenceDate}
                                            bind:val={$meetingResultForm.referenceDate}
                                        ></CustomTextField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .meetingDetail !== null}
                                            id="directorIC"
                                            label={'Lapor Diri Kepada'}
                                            bind:val={$meetingResultForm.directorIC}
                                            options={data.props
                                                .employeeDropdown}
                                        ></CustomSelectField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- POSTPONEMENT APPLICATION -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.meetingDetail !== null}
                <StepperContent>
                    <StepperContentHeader title="Permohonan Penangguhan">
                        {#if data.props.currentApplicationDetail.postponeDetail == null && data.props.userMode == 'employee'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="postponeApplicationForm"
                            ></TextIconButton>
                            <TextIconButton
                                label="Set Semula"
                                type="neutral"
                                icon="reset"
                                onClick={() => {
                                    postponeApplicationForm.set(
                                        data.forms.postponeApplicationForm.data,
                                    );
                                }}
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.postponeDetail == null && data.props.userMode !== 'employee'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu maklum balas daripada Kakitangan
                                        <!-- {data.props.currentApplicationDetail
                                            .status} -->
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="postponeApplicationForm"
                                    method="POST"
                                    use:postponeApplicationEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .postponeDetail !== null ||
                                                data.props.userMode !==
                                                    'employee'}
                                            id="isPostpone"
                                            label={'Adakah Anda Ingin Memohon Untuk Penangguhan Tarikh Pertukaran?'}
                                            bind:val={$postponeApplicationForm.isPostpone}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>

                                    {#if $postponeApplicationForm.isPostpone}
                                        <div class="flex w-full flex-col gap-2">
                                            <CustomTextField
                                                disabled={data.props
                                                    .currentApplicationDetail
                                                    .postponeDetail !== null ||
                                                    data.props.userMode !==
                                                        'employee'}
                                                id="postponeDate"
                                                label={'Nyatakan Tarikh Pertukaran Yang Dipohon'}
                                                type="date"
                                                errors={$postponeApplicationErrors.postponeDate}
                                                bind:val={$postponeApplicationForm.postponeDate}
                                            ></CustomTextField>
                                        </div>

                                        <div class="flex w-full flex-col gap-2">
                                            <CustomTextField
                                                disabled={data.props
                                                    .currentApplicationDetail
                                                    .postponeDetail !== null ||
                                                    data.props.userMode !==
                                                        'employee'}
                                                id="reason"
                                                label={'Nyatakan Alasan Untuk Penangguhan'}
                                                type="text"
                                                errors={$postponeApplicationErrors.reason}
                                                bind:val={$postponeApplicationForm.reason}
                                            ></CustomTextField>
                                        </div>
                                    {/if}
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- POSTPONEMENT DOCUMENT UPLOAD -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.postponeDetail !== null}
                <StepperContent>
                    <StepperContentHeader title="Surat Permohonan Penangguhan">
                        {#if data.props.currentApplicationDetail.postponeDocument == null && data.props.userMode == 'employee'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                onClick={() => {
                                    uploadPostponeDocument();
                                }}
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.postponeDocument !== null}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 pb-10"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Surat Permohonan Penangguhan
                                </p>
                                {#each data.props.currentApplicationDetail.postponeDocument.documents as doc}
                                    <a
                                        href={doc.base64}
                                        target="_blank"
                                        download={doc.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{doc.name}</a
                                    >
                                {/each}
                            </div>
                        {:else if data.props.currentApplicationDetail.postponeDocument == null}
                            {#if data.props.userMode == 'employee'}
                                <div
                                    class="flex h-full w-full flex-col items-start justify-start"
                                >
                                    <form
                                        id="documentUploadForm"
                                        method="POST"
                                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                    >
                                        <div class="flex w-full flex-col gap-2">
                                            <CustomFileField
                                                id="postponeDocument"
                                                label="Muat Naik Surat Permohonan Penangguhan"
                                                bind:files
                                            ></CustomFileField>
                                        </div>
                                    </form>
                                </div>
                            {:else}
                                <div
                                    class="flex w-full flex-col gap-10 px-3 pb-10"
                                >
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Tiada Maklumat!</span
                                            >
                                            {data.props.currentApplicationDetail
                                                .status}
                                        </p>
                                    </Alert>
                                </div>
                            {/if}
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- POSTPONEMENT RESULT-->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.postponeDocument !== null}
                <StepperContent>
                    <StepperContentHeader
                        title="Semakan Permohonan Penangguhan"
                    >
                        {#if data.props.currentApplicationDetail.postponeResult == null && data.props.userMode == 'secretary'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="postponeResultForm"
                            ></TextIconButton>
                            <TextIconButton
                                label="Set Semula"
                                type="neutral"
                                icon="reset"
                                onClick={() => {
                                    postponeResultForm.set(
                                        data.forms.postponeResultForm.data,
                                    );
                                }}
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.postponeResult == null && data.props.userMode !== 'secretary'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="postponeResultForm"
                                    method="POST"
                                    use:postponeResultEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled
                                            id="transferDate"
                                            label={'Tarikh Pertukaran Asal'}
                                            type="date"
                                            val={data.props
                                                .currentApplicationDetail
                                                .meetingDetail?.effectiveDate}
                                        ></CustomTextField>
                                    </div>

                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .postponeResult !== null}
                                            id="finalEffectiveDate"
                                            label={'Tarikh Pertukaran Baru'}
                                            type="date"
                                            errors={$postponeResultErrors.finalEffectiveDate}
                                            bind:val={$postponeResultForm.finalEffectiveDate}
                                        ></CustomTextField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .postponeResult !== null}
                                            id="approverIC"
                                            label={'Nama Pelulus Permohonan Penangguhan'}
                                            bind:val={$postponeResultForm.approverIC}
                                            options={data.props
                                                .endorserDropdown}
                                        ></CustomSelectField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- POSTPONE APPROVAL -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.postponeResult !== null}
                <StepperContent>
                    <StepperContentHeader
                        title="Keputusan Permohonan Penangguhan"
                    >
                        {#if data.props.currentApplicationDetail.postponeApproval == null && data.props.userMode == 'approver'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="postponeApprovalForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.postponeApproval == null && data.props.userMode !== 'approver'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="postponeApprovalForm"
                                    method="POST"
                                    use:postponeApprovalEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .postponeApproval !== null}
                                            id="status"
                                            label={'Adakah Permohonan Penangguhan Ini Lulus?'}
                                            bind:val={$postponeApprovalForm.status}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .postponeApproval !== null}
                                            id="remark"
                                            label={'Ulasan'}
                                            errors={$postponeApprovalErrors.remark}
                                            bind:val={$postponeApprovalForm.remark}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- TRANSFER DOCUMENT -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.postponeDetail !== null}
                {#if data.props.currentApplicationDetail.postponeDetail.isPostpone == false || data.props.currentApplicationDetail.postponeApproval !== null}
                    <StepperContent>
                        <StepperContentHeader
                            title="Dokumen Keperluan Pertukaran"
                        >
                            {#if data.props.currentApplicationDetail.transferDocument == null && data.props.userMode == 'secretary'}
                                <TextIconButton
                                    label="Hantar"
                                    icon="check"
                                    onClick={() => {
                                        uploadDocument();
                                    }}
                                ></TextIconButton>
                            {/if}
                        </StepperContentHeader>
                        <StepperContentBody>
                            {#if data.props.currentApplicationDetail.transferDocument !== null}
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                >
                                    <p
                                        class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                    >
                                        Muat Naik Surat Pertukaran dan Borang
                                        Serah Tugas
                                    </p>
                                    {#each data.props.currentApplicationDetail.transferDocument.documents as doc}
                                        <a
                                            href={doc.base64}
                                            target="_blank"
                                            download={doc.name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{doc.name}</a
                                        >
                                    {/each}
                                </div>
                            {:else if data.props.currentApplicationDetail.transferDocument == null}
                                {#if data.props.userMode == 'secretary'}
                                    <div
                                        class="flex h-full w-full flex-col items-start justify-start"
                                    >
                                        <form
                                            id="documentUploadForm"
                                            method="POST"
                                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                        >
                                            <div
                                                class="flex w-full flex-col gap-2"
                                            >
                                                <CustomFileField
                                                    id="transferDocument"
                                                    bind:files
                                                ></CustomFileField>
                                            </div>
                                        </form>
                                    </div>
                                {:else}
                                    <div
                                        class="flex w-full flex-col gap-10 px-3 pb-10"
                                    >
                                        <Alert color="blue">
                                            <p>
                                                <span class="font-medium"
                                                    >Tiada Maklumat!</span
                                                >
                                                {data.props
                                                    .currentApplicationDetail
                                                    .status}
                                            </p>
                                        </Alert>
                                    </div>
                                {/if}
                            {/if}
                        </StepperContentBody>
                    </StepperContent>
                {/if}
            {/if}

            <!-- ================================= -->
            <!-- ENDORSER DETAILS -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.transferDocument !== null}
                <StepperContent>
                    <StepperContentHeader
                        title="Maklumat Penyokong dan Pelulus"
                    >
                        {#if data.props.currentApplicationDetail.endorserDetail == null && data.props.userMode == 'secretary'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="endorserDetailForm"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.endorserDetail == null && data.props.userMode !== 'secretary'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="endorserDetailForm"
                                    method="POST"
                                    use:endorserDetailEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .endorserDetail !== null ||
                                                data.props.userMode !=
                                                    'secretary'}
                                            id="supporter"
                                            label={'Pilih Nama Penyokong'}
                                            bind:val={$endorserDetailForm.supporterIC}
                                            bind:errors={$endorserDetailErrors.supporterIC}
                                            options={data.props
                                                .endorserDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .endorserDetail !== null ||
                                                data.props.userMode !=
                                                    'secretary'}
                                            id="approver"
                                            label={'Pilih Nama Pelulus'}
                                            bind:val={$endorserDetailForm.approverIC}
                                            bind:errors={$endorserDetailErrors.approverIC}
                                            options={data.props
                                                .endorserDropdown}
                                        ></CustomSelectField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- SUPPORTER FEEDBACK -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.endorserDetail != null}
                <StepperContent>
                    <StepperContentHeader title="Maklum Balas Penyokong">
                        {#if data.props.currentApplicationDetail.supporterFeedback == null && data.props.userMode == 'supporter'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="supporterFeedback"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.supporterFeedback == null && data.props.userMode !== 'supporter'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="supporterFeedback"
                                    method="POST"
                                    use:supporterFeedbackEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .supporterFeedback !== null ||
                                                data.props.userMode !=
                                                    'supporter'}
                                            id="status"
                                            label={'Adakah Anda Sokong Permohonan Ini?'}
                                            bind:val={$supporterFeedbackForm.status}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .supporterFeedback !== null ||
                                                data.props.userMode !=
                                                    'supporter'}
                                            id="remark"
                                            label={'Ulasan'}
                                            errors={$supporterFeedbackErrors.remark}
                                            bind:val={$supporterFeedbackForm.remark}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}

            <!-- ================================= -->
            <!-- APPROVER FEEDBACK -->
            <!-- ================================= -->
            {#if data.props.currentApplicationDetail.supporterFeedback != null}
                <StepperContent>
                    <StepperContentHeader title="Maklum Balas Pelulus">
                        {#if data.props.currentApplicationDetail.approverFeedback == null && data.props.userMode == 'approver'}
                            <TextIconButton
                                label="Hantar"
                                icon="check"
                                form="approverFeedback"
                            ></TextIconButton>
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        {#if data.props.currentApplicationDetail.approverFeedback == null && data.props.userMode !== 'approver'}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        {data.props.currentApplicationDetail
                                            .status}
                                    </p>
                                </Alert>
                            </div>
                        {:else}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start"
                            >
                                <form
                                    id="approverFeedback"
                                    method="POST"
                                    use:approverFeedbackEnhance
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomSelectField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .approverFeedback !== null ||
                                                data.props.userMode !=
                                                    'approver'}
                                            id="status"
                                            label={'Adakah Anda Sokong Permohonan Ini?'}
                                            bind:val={$approverFeedbackForm.status}
                                            options={data.props
                                                .endorsementDropdown}
                                        ></CustomSelectField>
                                    </div>
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled={data.props
                                                .currentApplicationDetail
                                                .approverFeedback !== null ||
                                                data.props.userMode !=
                                                    'approver'}
                                            id="remark"
                                            label={'Ulasan'}
                                            errors={$approverFeedbackErrors.remark}
                                            bind:val={$approverFeedbackForm.remark}
                                        ></CustomTextField>
                                    </div>
                                </form>
                            </div>
                        {/if}
                    </StepperContentBody>
                </StepperContent>
            {/if}
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
