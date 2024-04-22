<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        GcrAccumulationDetailSchema,
        GcrEndorsementSchema,
    } from '$lib/schemas/mypsm/leave/gcr.schema';
    import {
        _submitApplicationDetailForm,
        _submitDirectorFeedbackForm,
        _submitSecretaryFeedbackForm,
        _submitSectionLeadFeedbackForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';
    import type { GCRAccumulationDetailDTO } from '$lib/dto/mypsm/leave/leave.dto';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { Alert } from 'flowbite-svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    export let data: PageData;

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
        validators: zodClient(GcrAccumulationDetailSchema),
        async onSubmit(input) {
            const response = _submitApplicationDetailForm(
                $applicationDetailForm,
            ).then((value) => {
                if (value.response.status == 'success') {
                    let applicationDetail: GCRAccumulationDetailDTO =
                        value.response.data?.details;

                    let url = '/cuti/pengumpulan_GCR/' + applicationDetail.id;

                    goto(url);
                }
            });
        },
    });

    // section lead feedback form
    const {
        form: sectionLeadFeedbackForm,
        errors: sectionLeadFeedbackErrors,
        enhance: sectionLeadFeedbackEnhance,
    } = superForm(data.forms.sectionLeadFeedbackForm, {
        id: 'sectionLeadFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitSectionLeadFeedbackForm(
                $sectionLeadFeedbackForm,
            );
        },
    });

    // director feedback form
    const {
        form: directorFeedbackForm,
        errors: directorFeedbackErrors,
        enhance: directorFeedbackEnhance,
    } = superForm(data.forms.directorFeedbackForm, {
        id: 'directorFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitDirectorFeedbackForm($directorFeedbackForm);
        },
    });

    // secretary feedback form
    const {
        form: secretaryFeedbackForm,
        errors: secretaryFeedbackErrors,
        enhance: secretaryFeedbackEnhance,
    } = superForm(data.forms.secretaryFeedbackForm, {
        id: 'secretaryFeedbackForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(GcrEndorsementSchema),
        async onSubmit(input) {
            const response = _submitSecretaryFeedbackForm(
                $secretaryFeedbackForm,
            );
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/pengumpulan_GCR');
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
        <!-- ================================ -->
        <!-- Application Detail -->
        <!-- ================================ -->
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan">
                {#if data.props.currentRoleCode == UserRoleConstant.kakitangan.code && data.props.currentApplicationDetail.accumulation?.currentCollected == 0}
                    <TextIconButton
                        form="applicationDetailForm"
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
                    <form
                        id="applicationDetailForm"
                        method="POST"
                        use:applicationDetailEnhance
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="year"
                                label={'Tahun'}
                                val={data.props.currentApplicationDetail
                                    .accumulation?.year}
                            ></CustomTextField>
                        </div>

                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="annualLeave"
                                label={'Jumlah Cuti Tahunan'}
                                val={data.props.currentApplicationDetail
                                    .accumulation?.annualLeave}
                            ></CustomTextField>
                        </div>

                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="annualBalance"
                                label={'Baki Cuti Tahunan'}
                                val={data.props.currentApplicationDetail
                                    .accumulation?.annualBalance}
                            ></CustomTextField>
                        </div>

                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="gcr"
                                label={'Jumlah Cuti Yang Boleh Dikumpul'}
                                val={data.props.currentApplicationDetail
                                    .accumulation?.gcr}
                            ></CustomTextField>
                        </div>

                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="gcr"
                                label={'Baki Bawa Ke Tahun Hadapan'}
                                val={data.props.currentApplicationDetail
                                    .accumulation?.carryForward}
                            ></CustomTextField>
                        </div>

                        {#if data.props.currentApplicationDetail.accumulation?.currentCollected !== 0}
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled
                                    id="currentCollected"
                                    label={'Jumlah Untuk Dikumpul'}
                                    val={data.props.currentApplicationDetail
                                        .accumulation?.currentCollected}
                                ></CustomTextField>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.accumulation
                                        ?.currentCollected !== 0 ||
                                        data.props.userMode != 'employee'}
                                    id="currentCollected"
                                    label={'Jumlah Untuk Dikumpul'}
                                    type="number"
                                    errors={$applicationDetailErrors.collectedGCR}
                                    bind:val={$applicationDetailForm.collectedGCR}
                                ></CustomTextField>
                            </div>
                        {/if}
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- ================================ -->
        <!-- Section Lead Feedback -->
        <!-- ================================ -->
        {#if data.props.currentApplicationDetail.lead != null}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Ketua Seksyen">
                    {#if data.props.userMode == 'sectionLeader' && !data.props.currentApplicationDetail.lead.isReadonly}
                        <TextIconButton
                            form="sectionLeadFeedbackForm"
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
                        <form
                            id="sectionLeadFeedbackForm"
                            method="POST"
                            use:sectionLeadFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.lead
                                        .isReadonly ||
                                        data.props.userMode != 'sectionLeader'}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$sectionLeadFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.lead
                                        .isReadonly ||
                                        data.props.userMode != 'sectionLeader'}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$sectionLeadFeedbackErrors.remark}
                                    bind:val={$sectionLeadFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================ -->
        <!-- DIRECTOR Feedback -->
        <!-- ================================ -->
        {#if data.props.currentApplicationDetail.director != null}
            <StepperContent>
                <StepperContentHeader title="Maklum Balas Pengarah">
                    {#if data.props.userMode == 'director' && !data.props.currentApplicationDetail.director.isReadonly}
                        <TextIconButton
                            form="directorFeedbackForm"
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
                        <form
                            id="directorFeedbackForm"
                            method="POST"
                            use:directorFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.director
                                        .isReadonly ||
                                        data.props.userMode != 'director'}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$directorFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.director
                                        .isReadonly ||
                                        data.props.userMode != 'director'}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$directorFeedbackErrors.remark}
                                    bind:val={$directorFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- ================================ -->
        <!-- SECRETARY Feedback -->
        <!-- ================================ -->
        {#if data.props.currentApplicationDetail.secretary !== null}
            <StepperContent>
                <StepperContentHeader title="Pengesahan Urus Setia">
                    {#if data.props.userMode == 'secretary' && !data.props.currentApplicationDetail.secretary.isReadonly}
                        <TextIconButton
                            form="secretaryFeedbackForm"
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
                        <form
                            id="secretaryFeedbackForm"
                            method="POST"
                            use:secretaryFeedbackEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props
                                        .currentApplicationDetail.secretary
                                        .isReadonly ||
                                        data.props.userMode != 'secretary'}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$secretaryFeedbackForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail.secretary
                                        .isReadonly ||
                                        data.props.userMode != 'secretary'}
                                    id="remark"
                                    label={'Ulasan'}
                                    errors={$secretaryFeedbackErrors.remark}
                                    bind:val={$secretaryFeedbackForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
