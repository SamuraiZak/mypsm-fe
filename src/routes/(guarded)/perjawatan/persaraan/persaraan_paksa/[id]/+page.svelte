<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { ForcedRetirementEndorsementSchema } from '$lib/schemas/mypsm/employment/retirement/forced-retirement.schema';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    export let data: PageData;

    // certification
    const {
        form: certificationForm,
        errors: certificationErrors,
        enhance: certificationEnhance,
    } = superForm(data.forms.certificationForm, {
        id: 'certificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(ForcedRetirementEndorsementSchema),
        async onSubmit(input) {
            // const response = _submitMeetingResultForm($certificationForm);
        },
    });

    // confirmation
    const {
        form: confirmationForm,
        errors: confirmationErrors,
        enhance: confirmationEnhance,
    } = superForm(data.forms.confirmationForm, {
        id: 'confirmationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(ForcedRetirementEndorsementSchema),
        async onSubmit(input) {
            // const response = _submitMeetingResultForm($confirmationForm);
        },
    });

    // approval
    const {
        form: approvalForm,
        errors: approvalErrors,
        enhance: approvalEnhance,
    } = superForm(data.forms.approvalForm, {
        id: 'approvalForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(ForcedRetirementEndorsementSchema),
        async onSubmit(input) {
            // const response = _submitMeetingResultForm($approvalForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Persaraan Paksa">
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
        <!-- ============================================== -->
        <!-- Certification -->
        <!-- ============================================== -->
        <StepperContent>
            <StepperContentHeader title="Perakuan Permohonan">
                {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode == UserRoleConstant.unitIntegriti.code}
                    <TextIconButton
                        form="certificationForm"
                        type="primary"
                        label="Hantar"
                        icon="check"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                            id="certificationForm"
                            method="POST"
                            use:certificationEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .certification !== null ||
                                        data.props.currentRoleCode !==
                                            UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Anda Memperakui Permohonan Persaraan Ini?'}
                                    bind:val={$certificationForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .certification !== null ||
                                        data.props.currentRoleCode !==
                                            UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$certificationErrors.remark}
                                    bind:val={$certificationForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <!-- ============================================== -->
        <!-- Confirmation -->
        <!-- ============================================== -->

        {#if data.props.currentApplicationDetail.certification !== null}
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan">
                    {#if data.props.currentApplicationDetail.confirmation == null && data.props.currentRoleCode == UserRoleConstant.urusSetiaPersaraan.code}
                        <TextIconButton
                            form="confirmationForm"
                            type="primary"
                            label="Hantar"
                            icon="check"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.confirmation == null && data.props.currentRoleCode !== UserRoleConstant.urusSetiaPersaraan.code}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas daripada Urus Setia Persaraan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="confirmationForm"
                                method="POST"
                                use:confirmationEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .confirmation !== null ||
                                            data.props.currentRoleCode !==
                                                UserRoleConstant
                                                    .urusSetiaPersaraan.code}
                                        id="status"
                                        label={'Adakah Anda Mengesahkan Permohonan Persaraan Ini?'}
                                        bind:val={$confirmationForm.status}
                                        options={data.props.endorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .confirmation !== null ||
                                            data.props.currentRoleCode !==
                                                UserRoleConstant
                                                    .urusSetiaPersaraan.code}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$confirmationErrors.remark}
                                        bind:val={$confirmationForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ============================================== -->
        <!-- Forms -->
        <!-- ============================================== -->


        <!-- ============================================== -->
        <!-- Approval -->
        <!-- ============================================== -->

        {#if data.props.currentApplicationDetail.forms !== null}
            <StepperContent>
                <StepperContentHeader title="Pelulusan Permohonan">
                    {#if data.props.currentApplicationDetail.approval == null && data.props.currentRoleCode == UserRoleConstant.urusSetiaPersaraan.code}
                        <TextIconButton
                            form="approvalForm"
                            type="primary"
                            label="Hantar"
                            icon="check"
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.approval == null && data.props.currentRoleCode !== UserRoleConstant.urusSetiaPersaraan.code}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu maklum balas daripada Urus Setia Persaraan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <form
                                id="approvalForm"
                                method="POST"
                                use:approvalEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .approval !== null ||
                                            data.props.currentRoleCode !==
                                                UserRoleConstant
                                                    .urusSetiaPersaraan.code}
                                        id="status"
                                        label={'Adakah Anda Meluluskan Permohonan Persaraan Ini?'}
                                        bind:val={$approvalForm.status}
                                        options={data.props.endorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props
                                            .currentApplicationDetail
                                            .approval !== null ||
                                            data.props.currentRoleCode !==
                                                UserRoleConstant
                                                    .urusSetiaPersaraan.code}
                                        id="remark"
                                        label={'Ulasan'}
                                        errors={$approvalErrors.remark}
                                        bind:val={$approvalForm.remark}
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
