<script lang="ts">
    import { superForm } from "sveltekit-superforms";
    import type { PageData } from "./$types";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { RetirementEndorsementSchema, RetirementForcedEndorsementSchema } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
    import { _certificationFormSubmit, _confirmationFormSubmit, _documentFormSubmit, _letterCertificationFormSubmit } from "./+page";
    import StepperContentHeader from "$lib/components/stepper/StepperContentHeader.svelte";
    import StepperContentBody from "$lib/components/stepper/StepperContentBody.svelte";
    import CustomSelectField from "$lib/components/inputs/select-field/CustomSelectField.svelte";
    import CustomTextField from "$lib/components/inputs/text-field/CustomTextField.svelte";
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import TextIconButton from "$lib/components/button/TextIconButton.svelte";
    import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
    import Stepper from "$lib/components/stepper/Stepper.svelte";
    import { Toaster } from 'svelte-french-toast';


export let data: PageData;

const {
        form: certificationForm,
        errors: certificationErrors,
        enhance: certificationEnhance,
    } = superForm(data.forms.certificationDetailForm, {
        id: 'certificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            $certificationForm.forcedId = data.props.currentApplicationId
            const response = _certificationFormSubmit($certificationForm);
        },
    });

    const {
        form: confirmForm,
        errors: confirmErrors,
        enhance: confirmEnhance,
    } = superForm(data.forms.confirmationDetailForm, {
        id: 'confirmForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementForcedEndorsementSchema),
        async onSubmit(input) {
            $confirmForm.forcedId = data.props.currentApplicationId
            const response = _confirmationFormSubmit($confirmForm);
        },
    });

    const {
        form: documentForm,
        errors: documentErrors,
        enhance: documentEnhance,
    } = superForm(data.forms.documentForm, {
        id: 'documentForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementForcedEndorsementSchema),
        async onSubmit(input) {
            $documentForm.forcedId = data.props.currentApplicationId
            const response = _documentFormSubmit($documentForm);
        },
    });

    const {
        form: letterCertificationForm,
        errors: letterCertificationErrors,
        enhance: letterCertificationEnhance,
    } = superForm(data.forms.letterCertificationDetailForm, {
        id: 'letterCertificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementForcedEndorsementSchema),
        async onSubmit(input) {
            $letterCertificationForm.forcedId = data.props.currentApplicationId
            const response = _letterCertificationFormSubmit($letterCertificationForm);
        },
    });

</script>
<Stepper>
<!-- {#if data.props.currentApplicationDetail.applicationDetail !== null} -->
<!-- svelte-ignore missing-declaration -->
<StepperContent>
    <StepperContentHeader title="Perakuan Dari Unit Integriti">
        <!-- {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'} -->
            <TextIconButton
                label="Hantar"
                icon="check"
                form="certificationForm"
            ></TextIconButton>
        <!-- {/if} -->
    </StepperContentHeader>
    <StepperContentBody>
        <!-- {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                <Alert color="blue">
                    <p>
                        <span class="font-medium"
                            >Tiada Maklumat!</span
                        >
                        Menunggu tindakan dari pihak berkenaan
                    </p>
                </Alert>
            </div>
        {:else} -->
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
                        <!-- disabled={data.props.currentApplicationDetail.certificationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomSelectField
                            id="status"
                            label={'Adakah Permohonan Ini Sah?'}
                            bind:val={$certificationForm.status}
                            options={data.props.endorsementDropdown}
                        ></CustomSelectField>
                    </div>
                    <!-- disabled={data.props.currentApplicationDetail.certificationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="remark"
                            label={'Alasan Pertukaran'}
                            errors={$certificationErrors.remark}
                            bind:val={$certificationForm.remark}
                        ></CustomTextField>
                    </div>
                </form>
            </div>
        <!-- {/if} -->
    </StepperContentBody>
</StepperContent>

<!-- Confirm -->

<!-- {/if} -->
<!-- {#if data.props.currentApplicationDetail.applicationDetail !== null} -->
<!-- svelte-ignore missing-declaration -->
<StepperContent>
    <StepperContentHeader title="Pengesahan Permohonan Persaraan">
        <!-- {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'} -->
            <TextIconButton
                label="Hantar"
                icon="check"
                form="confirmForm"
            ></TextIconButton>
        <!-- {/if} -->
    </StepperContentHeader>
    <StepperContentBody>
        <!-- {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                <Alert color="blue">
                    <p>
                        <span class="font-medium"
                            >Tiada Maklumat!</span
                        >
                        Menunggu tindakan dari pihak berkenaan
                    </p>
                </Alert>
            </div>
        {:else} -->
            <div
                class="flex h-full w-full flex-col items-start justify-start"
            >
                <form
                    id="confirmForm"
                    method="POST"
                    use:confirmEnhance
                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.confirmationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomSelectField
                            id="status"
                            label={'Adakah Permohonan Ini Sah?'}
                            bind:val={$confirmForm.status}
                            options={data.props.endorsementDropdown}
                        ></CustomSelectField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.confirmationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomTextField
                            id="remark"
                            label={'Alasan Pertukaran'}
                            errors={$confirmErrors.remark}
                            bind:val={$confirmForm.remark}
                        ></CustomTextField>
                    </div>
                </form>
            </div>
        <!-- {/if} -->
    </StepperContentBody>
</StepperContent>
<!-- download -->


<!-- document -->

<!-- {/if} -->
<!-- {#if data.props.currentApplicationDetail.applicationDetail !== null} -->
<!-- svelte-ignore missing-declaration -->
<StepperContent>
    <StepperContentHeader title="Pengesahan Dokumen Persaraan">
        <!-- {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'} -->
            <TextIconButton
                label="Hantar"
                icon="check"
                form="documentForm"
            ></TextIconButton>
        <!-- {/if} -->
    </StepperContentHeader>
    <StepperContentBody>
        <!-- {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                <Alert color="blue">
                    <p>
                        <span class="font-medium"
                            >Tiada Maklumat!</span
                        >
                        Menunggu tindakan dari pihak berkenaan
                    </p>
                </Alert>
            </div>
        {:else} -->
            <div
                class="flex h-full w-full flex-col items-start justify-start"
            >
                <form
                    id="documentForm"
                    method="POST"
                    use:documentEnhance
                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.document !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomSelectField
                            id="status"
                            label={'Adakah Permohonan Ini Sah?'}
                            bind:val={$documentForm.status}
                            options={data.props.endorsementDropdown}
                        ></CustomSelectField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.document !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomTextField
                            id="remark"
                            label={'Alasan Pertukaran'}
                            errors={$documentErrors.remark}
                            bind:val={$documentForm.remark}
                        ></CustomTextField>
                    </div>
                </form>
            </div>
        <!-- {/if} -->
    </StepperContentBody>
</StepperContent>

<!-- documennt -->
<!-- {/if} -->

<!-- {#if data.props.currentApplicationDetail.applicationDetail !== null} -->
<!-- svelte-ignore missing-declaration -->
<StepperContent>
    <StepperContentHeader title="Pengesahan Surat Persaraan">
        <!-- {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'} -->
            <TextIconButton
                label="Hantar"
                icon="check"
                form="letterCertificationForm"
            ></TextIconButton>
        <!-- {/if} -->
    </StepperContentHeader>
    <StepperContentBody>
        <!-- {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                <Alert color="blue">
                    <p>
                        <span class="font-medium"
                            >Tiada Maklumat!</span
                        >
                        Menunggu tindakan dari pihak berkenaan
                    </p>
                </Alert>
            </div>
        {:else} -->
            <div
                class="flex h-full w-full flex-col items-start justify-start"
            >
                <form
                    id="letterCertificationForm"
                    method="POST"
                    use:letterCertificationEnhance
                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.letterCertificationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomSelectField
                            id="status"
                            label={'Adakah Permohonan Ini Sah?'}
                            bind:val={$letterCertificationForm.status}
                            options={data.props.endorsementDropdown}
                        ></CustomSelectField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <!-- disabled={data.props.currentApplicationDetail.letterCertificationDetail !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code} -->
                        <CustomTextField
                            id="remark"
                            label={'Alasan Pertukaran'}
                            errors={$certificationErrors.remark}
                            bind:val={$letterCertificationForm.remark}
                        ></CustomTextField>
                    </div>
                </form>
            </div>
        <!-- {/if} -->
    </StepperContentBody>
</StepperContent>
<!-- {/if} -->
</Stepper>

<Toaster>

</Toaster>