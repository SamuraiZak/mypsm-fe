<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        TransferCommonDetailSchema,
        TransferCommonEndorsementSchema,
        TransferCommonEndorserDetailSchema,
        TransferCommonMeetingSchema,
        TransferCommonPostponeApplicationSchema,
        TransferCommonPostponeResultSchema,
    } from '$lib/schemas/mypsm/employment/transfer/transfer.schema';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { Alert } from 'flowbite-svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import {
        _submitApplicationDetailForm,
        _submitApproverFeedbackForm,
        _submitEndorserDetailForm,
        _submitMeetingResultForm,
        _submitPostponeApplicationForm,
        _submitPostponeApprovalForm,
        _submitPostponeResultForm,
        _submitSupporterFeedbackForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import type { TransferCommonDetailDTO } from '$lib/dto/mypsm/employment/transfer/transfer.dto';
    import { TransferTypeConstant } from '$lib/constants/core/transfer.constant';

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
        validators: zodClient(TransferCommonDetailSchema),
        async onSubmit(input) {
            const response = _submitApplicationDetailForm(
                $applicationDetailForm,
            ).then((value) => {
                if (value.response.status == 'success') {
                    let applicationDetail: TransferCommonDetailDTO =
                        value.response.data?.details;

                    let currentApplicationType =
                        TransferTypeConstant.list.find(
                            (item) =>
                                item.code == applicationDetail?.applicationType,
                        )?.description ??
                        TransferTypeConstant.director.description;

                    let url =
                        '/perjawatan/pertukaran-new/' +
                        currentApplicationType +
                        '/' +
                        applicationDetail.id;

                    goto(url);
                }
            });
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

    // postpone result form
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

    // postpone result form
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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/perjawatan/pertukaran-new');
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
            <StepperContentHeader title="Butiran Pertukaran">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'director'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="applicationDetailForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode !== 'director'}
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
                                        data.props.userMode != 'director'}
                                    id="employeeIC"
                                    label={'Nama Kakitangan'}
                                    bind:val={$applicationDetailForm.employeeIC}
                                    options={data.props.employeeDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'director'}
                                    id="newPlacementId"
                                    label={'Penempatan Baru'}
                                    bind:val={$applicationDetailForm.newPlacementId}
                                    options={data.props.placementListDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'director'}
                                    id="transferDate"
                                    label={'Tarikh Pertukaran'}
                                    type="date"
                                    errors={$applicationDetailErrors.transferDate}
                                    bind:val={$applicationDetailForm.transferDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.userMode != 'director'}
                                    id="reason"
                                    label={'Alasan Pertukaran'}
                                    errors={$applicationDetailErrors.reason}
                                    bind:val={$applicationDetailForm.reason}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {#if data.props.currentApplicationId !== 0}
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat">
                    {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="meetingResultForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.meeting == null && data.props.userMode !== 'secretary'}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    {data.props.currentApplicationDetail.status}
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
                                use:applicationDetailEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .applicationDetail !== null ||
                                            data.props.userMode != 'director'}
                                        id="employeeIC"
                                        label={'Nama Kakitangan'}
                                        bind:val={$applicationDetailForm.employeeIC}
                                        options={data.props.employeeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .applicationDetail !== null ||
                                            data.props.userMode != 'director'}
                                        id="newPlacementId"
                                        label={'Penempatan Baru'}
                                        bind:val={$applicationDetailForm.newPlacementId}
                                        options={data.props
                                            .placementListDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .applicationDetail !== null ||
                                            data.props.userMode != 'director'}
                                        id="transferDate"
                                        label={'Tarikh Pertukaran'}
                                        type="date"
                                        errors={$applicationDetailErrors.transferDate}
                                        bind:val={$applicationDetailForm.transferDate}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .applicationDetail !== null ||
                                            data.props.userMode != 'director'}
                                        id="reason"
                                        label={'Alasan Pertukaran'}
                                        errors={$applicationDetailErrors.reason}
                                        bind:val={$applicationDetailForm.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
