<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        LeaveCommonDetailsSchema,
        LeaveDeliveryDetailsSchema,
        LeaveEndorsementSchema,
        LeaveEndorserDetailsSchema,
        LeaveStudyDetailsSchema,
        LeaveUnrecordedDetailsSchema,
    } from '$lib/schemas/mypsm/leave/leave.schema';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { LeaveTypeConstant } from '$lib/constants/core/leave-type.constant';
    import { Alert } from 'flowbite-svelte';
    import { Toaster } from 'svelte-french-toast';
    import {
        _submitApproverFeedbackForm,
        _submitDirectorFeedbackForm,
        _submitEndorserDetailsForm,
        _submitHeadOfDirectorFeedbackForm,
        _submitManagementFeedbackForm,
        _submitMeetingResultForm,
        _submitSecretaryVerificationForm,
        _submitSupporterFeedbackForm,
    } from './+page';

    export let data: PageData;

    // common leave
    const {
        form: leaveCommonForm,
        errors: leaveCommonErrors,
        enhance: leaveCommonEnhance,
    } = superForm(data.forms.leaveCommonForm, {
        id: 'leaveCommonForm',
        SPA: true,
        validators: zodClient(LeaveCommonDetailsSchema),
        onSubmit(input) {},
    });

    // unrecorded leave
    const {
        form: leaveUnrecordedForm,
        errors: leaveUnrecordedErrors,
        enhance: leaveUnrecordedEnhance,
    } = superForm(data.forms.leaveUnrecordedForm, {
        id: 'leaveUnrecordedForm',
        SPA: true,
        validators: zodClient(LeaveUnrecordedDetailsSchema),
        onSubmit(input) {},
    });

    // delivery leave
    const {
        form: leaveDeliveryForm,
        errors: leaveDeliveryErrors,
        enhance: leaveDeliveryEnhance,
    } = superForm(data.forms.leaveDeliveryForm, {
        id: 'leaveDeliveryForm',
        SPA: true,
        validators: zodClient(LeaveDeliveryDetailsSchema),
        onSubmit(input) {},
    });

    // study leave
    const {
        form: leaveStudyForm,
        errors: leaveStudyErrors,
        enhance: leaveStudyEnhance,
    } = superForm(data.forms.leaveStudyForm, {
        id: 'leaveStudyForm',
        SPA: true,
        validators: zodClient(LeaveStudyDetailsSchema),
        onSubmit(input) {},
    });

    // =========================================================
    // endorsement forms
    // =========================================================
    // headOfDirectorFeedback
    const {
        form: headOfDirectorFeedbackForm,
        errors: headOfDirectorFeedbackErrors,
        enhance: headOfDirectorFeedbackEnhance,
    } = superForm(data.forms.headOfDirectorFeedbackForm, {
        id: 'headOfDirectorFeedbackForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitHeadOfDirectorFeedbackForm($headOfDirectorFeedbackForm);
        },
    });

    // directorFeedback
    const {
        form: directorFeedbackForm,
        errors: directorFeedbackErrors,
        enhance: directorFeedbackEnhance,
    } = superForm(data.forms.directorFeedbackForm, {
        id: 'directorFeedbackForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitDirectorFeedbackForm($directorFeedbackForm);
        },
    });

    // secretaryVerification
    const {
        form: secretaryVerificationForm,
        errors: secretaryVerificationErrors,
        enhance: secretaryVerificationEnhance,
    } = superForm(data.forms.secretaryVerificationForm, {
        id: 'secretaryVerificationForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitSecretaryVerificationForm($secretaryVerificationForm);
        },
    });

    // supporterFeedback
    const {
        form: supporterFeedbackForm,
        errors: supporterFeedbackErrors,
        enhance: supporterFeedbackEnhance,
    } = superForm(data.forms.supporterFeedbackForm, {
        id: 'supporterFeedbackForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitSupporterFeedbackForm($supporterFeedbackForm);
        },
    });

    // approverFeedback
    const {
        form: approverFeedbackForm,
        errors: approverFeedbackErrors,
        enhance: approverFeedbackEnhance,
    } = superForm(data.forms.approverFeedbackForm, {
        id: 'approverFeedbackForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitApproverFeedbackForm($approverFeedbackForm);
        },
    });

    // managementFeedback
    const {
        form: managementFeedbackForm,
        errors: managementFeedbackErrors,
        enhance: managementFeedbackEnhance,
    } = superForm(data.forms.managementFeedbackForm, {
        id: 'managementFeedbackForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitManagementFeedbackForm($managementFeedbackForm);
        },
    });

    // meetingResult
    const {
        form: meetingResultForm,
        errors: meetingResultErrors,
        enhance: meetingResultEnhance,
    } = superForm(data.forms.meetingResultForm, {
        id: 'meetingResultForm',
        SPA: true,
        validators: zodClient(LeaveEndorserDetailsSchema),
        onSubmit(input) {
            _submitMeetingResultForm($managementFeedbackForm);
        },
    });

    // endorserDetail
    const {
        form: endorserDetailForm,
        errors: endorserDetailErrors,
        enhance: endorserDetailEnhance,
    } = superForm(data.forms.endorserDetailForm, {
        id: 'endorserDetailForm',
        SPA: true,
        validators: zodClient(LeaveEndorsementSchema),
        onSubmit(input) {
            _submitEndorserDetailsForm($endorserDetailForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/permohonan');
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
            <StepperContentHeader title="Butiran Permohonan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-4 p-4"
                >
                    <div
                        class="flex h-fit w-full flex-col items-center justify-start gap-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col">
                            <CustomSelectField
                                id="leaveType"
                                disabled
                                label={'Jenis Cuti'}
                                bind:val={data.props.currentLeaveType.code}
                                options={data.props.leaveTypeDropdown}
                            ></CustomSelectField>
                        </div>
                        {#if data.props.currentLeaveType.code == LeaveTypeConstant.unrecordedLeave.code}
                            <!-- UNRECORDED LEAVE -->
                            <form
                                id="leaveUnrecordedForm"
                                method="POST"
                                use:leaveUnrecordedEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col">
                                    <CustomSelectField
                                        id="category"
                                        disabled
                                        label={'Jenis Cuti Tanpa Rekod'}
                                        bind:val={$leaveUnrecordedForm.category}
                                        errors={$leaveUnrecordedErrors.category}
                                        options={data.props
                                            .unrecordedLeaveTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveUnrecordedForm.startDate}
                                        errors={$leaveUnrecordedErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveUnrecordedForm.endDate}
                                        errors={$leaveUnrecordedErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveUnrecordedForm.endHalfDayOption}
                                        errors={$leaveUnrecordedErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveUnrecordedForm.startHalfDayOption}
                                        errors={$leaveUnrecordedErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        disabled
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveUnrecordedForm.reason}
                                        errors={$leaveUnrecordedErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveType.code == LeaveTypeConstant.earlyMaternityLeave.code || data.props.currentLeaveType.code == LeaveTypeConstant.officerMaternityLeave.code || data.props.currentLeaveType.code == LeaveTypeConstant.partnerMaternityLeave.code}
                            <!-- DELIVERY LEAVE -->
                            <form
                                id="leaveDeliveryForm"
                                method="POST"
                                use:leaveDeliveryEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="expectedDeliveryDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Anggaran Bersalin'}
                                        bind:val={$leaveDeliveryForm.expectedDeliveryDate}
                                        errors={$leaveDeliveryErrors.expectedDeliveryDate}
                                    ></CustomTextField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveDeliveryForm.startDate}
                                        errors={$leaveDeliveryErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveDeliveryForm.endDate}
                                        errors={$leaveDeliveryErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveDeliveryForm.endHalfDayOption}
                                        errors={$leaveDeliveryErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveDeliveryForm.startHalfDayOption}
                                        errors={$leaveDeliveryErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        disabled
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveDeliveryForm.reason}
                                        errors={$leaveDeliveryErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else if data.props.currentLeaveType.code == LeaveTypeConstant.studyLeave.code}
                            <!-- DELIVERY LEAVE -->
                            <form
                                id="leaveStudyForm"
                                method="POST"
                                use:leaveStudyEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="certificationType"
                                        type="text"
                                        disabled
                                        label={'Jenis Kursus/Sijil/Pengajian'}
                                        bind:val={$leaveStudyForm.certificationType}
                                        errors={$leaveStudyErrors.certificationType}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="fieldOfStudy"
                                        type="text"
                                        disabled
                                        label={'Bidang Pengajian'}
                                        bind:val={$leaveStudyForm.fieldOfStudy}
                                        errors={$leaveStudyErrors.fieldOfStudy}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="institution"
                                        type="text"
                                        disabled
                                        label={'Bidang Pengajian'}
                                        bind:val={$leaveStudyForm.institution}
                                        errors={$leaveStudyErrors.institution}
                                    ></CustomTextField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="courseName"
                                        type="text"
                                        disabled
                                        label={'Nama Kursus'}
                                        bind:val={$leaveStudyForm.courseName}
                                        errors={$leaveStudyErrors.courseName}
                                    ></CustomTextField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveStudyForm.startDate}
                                        errors={$leaveStudyErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveStudyForm.endDate}
                                        errors={$leaveStudyErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveStudyForm.endHalfDayOption}
                                        errors={$leaveStudyErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveStudyForm.startHalfDayOption}
                                        errors={$leaveStudyErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        disabled
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveStudyForm.reason}
                                        errors={$leaveStudyErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {:else}
                            <!-- COMMON LEAVE -->
                            <form
                                id="leaveCommonForm"
                                method="POST"
                                use:leaveCommonEnhance
                                class="flex w-full flex-col items-center justify-start gap-2"
                            >
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="startDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Mula'}
                                        bind:val={$leaveCommonForm.startDate}
                                        errors={$leaveCommonErrors.startDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveCommonForm.startHalfDayOption}
                                        errors={$leaveCommonErrors.startHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveCommonForm.startHalfDayOption}
                                        errors={$leaveCommonErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div
                                    class="flex w-full flex-row items-center justify-center gap-2"
                                >
                                    <CustomTextField
                                        id="endDate"
                                        type="date"
                                        disabled
                                        label={'Tarikh Tamat'}
                                        bind:val={$leaveCommonForm.endDate}
                                        errors={$leaveCommonErrors.endDate}
                                    ></CustomTextField>

                                    <CustomSelectField
                                        id="endHalfDayOption"
                                        disabled
                                        label={'Setengah Hari'}
                                        bind:val={$leaveCommonForm.endHalfDayOption}
                                        errors={$leaveCommonErrors.endHalfDayOption}
                                        options={data.props
                                            .halfDayOptionDropdown}
                                    ></CustomSelectField>
                                    <CustomSelectField
                                        id="startHalfDayOption"
                                        disabled
                                        label={'Pagi / Petang'}
                                        bind:val={$leaveCommonForm.startHalfDayOption}
                                        errors={$leaveCommonErrors.startHalfDayOption}
                                        options={data.props.halfDayTypeDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        id="reason"
                                        type="text"
                                        disabled
                                        label={'Alasan Permohonan'}
                                        bind:val={$leaveCommonForm.reason}
                                        errors={$leaveCommonErrors.reason}
                                    ></CustomTextField>
                                </div>
                            </form>
                        {/if}
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ================================================================ -->
        <!-- DIRECTOR FEEDBACK -->
        <!-- ================================================================ -->

        {#if data.props.currentApplicationProcess.directorFeedback}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Pengarah">
                    {#if data.props.currentApplicationDetail.directorFeedback == null && data.props.userMode == 'director'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="directorFeedbackForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.directorFeedback == null && data.props.userMode !== 'director'}
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
                                id="directorFeedbackForm"
                                method="POST"
                                use:directorFeedbackEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .directorFeedback !== null ||
                                            data.props.userMode != 'pengarah'}
                                        id="directorApprove"
                                        label={'Adakah Permohonan Ini Sah?'}
                                        bind:val={$directorFeedbackForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .directorFeedback !== null ||
                                            data.props.userMode != 'pengarah'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$directorFeedbackErrors.remark}
                                        bind:val={$directorFeedbackForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================================================ -->
        <!-- SECRETARY VERIFICATION -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.secretaryVerification}
            <StepperContent>
                <StepperContentHeader title="Semakan Oleh Urus Setia">
                    {#if data.props.currentApplicationDetail.secretaryVerification == null && data.props.userMode == 'secretary'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="secretaryVerificationForm"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.secretaryVerification == null && data.props.userMode !== 'secretary'}
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
                                id="secretaryVerificationForm"
                                method="POST"
                                use:secretaryVerificationEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .secretaryVerification !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="status"
                                        label={'Adakah Permohonan Ini Sah?'}
                                        bind:val={$secretaryVerificationForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .secretaryVerification !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$secretaryVerificationErrors.remark}
                                        bind:val={$secretaryVerificationForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================================================ -->
        <!-- ENDORSER DETAIL -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.endorserDetail}
            <StepperContent>
                <StepperContentHeader title="Maklumat Penyokong dan Pelulus">
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
                                    Menunggu maklum balas dari pihak berkenaan.
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
                                            data.props.userMode != 'secretary'}
                                        id="supporter"
                                        label={'Pilih Nama Penyokong'}
                                        bind:val={$endorserDetailForm.supporterIC}
                                        bind:errors={$endorserDetailErrors.supporterIC}
                                        options={data.props.endorserDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .endorserDetail !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="approver"
                                        label={'Pilih Nama Pelulus'}
                                        bind:val={$endorserDetailForm.approverIC}
                                        bind:errors={$endorserDetailErrors.approverIC}
                                        options={data.props.endorserDropdown}
                                    ></CustomSelectField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================================================ -->
        <!-- SUPPORTER FEEDBACK -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.supporterFeedback}
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
                                    Menunggu maklum balas dari pihak berkenaan.
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
                                            data.props.userMode != 'supporter'}
                                        id="status"
                                        label={'Adakah Anda Sokong Permohonan Ini?'}
                                        bind:val={$supporterFeedbackForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .supporterFeedback !== null ||
                                            data.props.userMode != 'supporter'}
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

        <!-- ================================================================ -->
        <!-- APPROVER FEEDBACK -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.approverFeedback}
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
                                    Menunggu maklum balas dari pihak berkenaan.
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
                                            data.props.userMode != 'approver'}
                                        id="status"
                                        label={'Adakah Anda Sokong Permohonan Ini?'}
                                        bind:val={$approverFeedbackForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .approverFeedback !== null ||
                                            data.props.userMode != 'approver'}
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

        <!-- ================================================================ -->
        <!-- MANAGMENT FEEDBACK -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.managementFeedback}
            <StepperContent>
                <StepperContentHeader
                    title="Maklum Balas Pengarah Khidmat Pengurusan"
                >
                    {#if data.props.currentApplicationDetail.managementFeedback == null && data.props.userMode == 'management'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="managementFeedback"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.managementFeedback == null && data.props.userMode !== 'management'}
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
                                id="managementFeedback"
                                method="POST"
                                use:managementFeedbackEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .managementFeedback !== null ||
                                            data.props.userMode != 'management'}
                                        id="status"
                                        label={'Adakah Anda Sokong Permohonan Ini?'}
                                        bind:val={$managementFeedbackForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .managementFeedback !== null ||
                                            data.props.userMode != 'management'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$managementFeedbackErrors.remark}
                                        bind:val={$managementFeedbackForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================================================ -->
        <!-- MEETING RESULT -->
        <!-- ================================================================ -->
        {#if data.props.currentApplicationProcess.meeting}
            <StepperContent>
                <StepperContentHeader
                    title="Maklum Balas Pengarah Khidmat Pengurusan"
                >
                    {#if data.props.currentApplicationDetail.meeting == null && data.props.userMode == 'secretary'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="meetingResult"
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
                                    Menunggu maklum balas dari pihak berkenaan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="meetingResult"
                                method="POST"
                                use:meetingResultEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .meeting !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="status"
                                        label={'Adakah Anda Sokong Permohonan Ini?'}
                                        bind:val={$meetingResultForm.status}
                                        options={data.props
                                            .leaveEndorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .meeting !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$meetingResultErrors.remark}
                                        bind:val={$meetingResultForm.remark}
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
