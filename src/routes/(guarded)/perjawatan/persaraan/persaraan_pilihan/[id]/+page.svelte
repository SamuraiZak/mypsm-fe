<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import type { PageData } from "./$types";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { _applicationDetailFormSubmit, _approvalFormSubmit, _certificationFormSubmit, _confirmationFormSubmit, _documentCertificationFormSubmit, _firstSupporterFormSubmit, _letterCertificationFormSubmit, _secondSupporterFormSubmit, _secretaryApprovalFormSubmit, _supportApproverFormSubmit } from "./+page";
    import { RetirementEndorsementSchema, RetirementEndorserDetailSchema, RetirementVoluntaryDetailSchema } from "$lib/schemas/mypsm/employment/retirement/retirement.schema";
    import ContentHeader from "$lib/components/headers/ContentHeader.svelte";
    import TextIconButton from "$lib/components/button/TextIconButton.svelte";
    import SvgChevronLeft from "$lib/assets/svg/SvgChevronLeft.svelte";
    import { goto } from "$app/navigation";
    import Stepper from "$lib/components/stepper/Stepper.svelte";
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { UserRoleConstant } from "$lib/constants/core/user-role.constant";
    import CustomTextField from "$lib/components/inputs/text-field/CustomTextField.svelte";
    import { Alert } from "flowbite-svelte";
    import CustomSelectField from "$lib/components/inputs/select-field/CustomSelectField.svelte";
    import type { RetirementVoluntaryDetailDTO } from "$lib/dto/mypsm/employment/retirement/retirement.dto";
    import { Toaster } from "svelte-french-toast";

    export let data: PageData;

    // create all forms

    // detail form
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
        validators: zodClient(RetirementVoluntaryDetailSchema),
        async onSubmit(input) {
            const response = _applicationDetailFormSubmit($applicationDetailForm).then((value) => {
                if (value.response.status == 'success') {
                    let applicationDetail: RetirementVoluntaryDetailDTO =
                        value.response.data?.details;

                    let url =
                        '/perjawatan/persaraan/persaraan_pilihan/' + applicationDetail.voluntaryId;

                    goto(url);
                }
            });;
        },
    });
    
    // certification form
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
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _certificationFormSubmit($certificationForm);
        },
    });

    // confirmation form
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
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _confirmationFormSubmit($confirmationForm);
        },
    });

    const {
        form: supportApproverForm,
        errors: supportApproverErrors,
        enhance: supportApproverEnhance,
    } = superForm(data.forms.supportApproverForm, {
        id: 'supportApproverForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorserDetailSchema),
        async onSubmit(input) {
            const response = _supportApproverFormSubmit($supportApproverForm);
        },
    });

    const {
        form: firstSupporterForm,
        errors: firstSupporterErrors,
        enhance: firstSupporterEnhance,
    } = superForm(data.forms.firstSupporterForm, {
        id: 'firstSupporterForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _firstSupporterFormSubmit($firstSupporterForm);
        },
    });
    const {
        form: secondSupporterForm,
        errors: secondSupporterErrors,
        enhance: secondSupporterEnhance,
    } = superForm(data.forms.secondSupporterForm, {
        id: 'secondSupporterForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _secondSupporterFormSubmit($secondSupporterForm);
        },
    });

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
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _approvalFormSubmit($approvalForm);
        },
    });
    const {
        form: secretaryApprovalForm,
        errors: secretaryApprovalErrors,
        enhance: secretaryApprovalEnhance,
    } = superForm(data.forms.secretaryApprovalForm, {
        id: 'secretaryApprovalForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _secretaryApprovalFormSubmit($secretaryApprovalForm);
        },
    });
    const {
        form: documentCertificationForm,
        errors: documentCertificationErrors,
        enhance: documentCertificationEnhance,
    } = superForm(data.forms.documentCertificationForm, {
        id: 'documentCertificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _documentCertificationFormSubmit($documentCertificationForm);
        },
    });

    const {
        form: letterCertificationForm,
        errors: letterCertificationErrors,
        enhance: letterCertificationEnhance,
    } = superForm(data.forms.letterCertificationForm, {
        id: 'letterCertificationForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(RetirementEndorsementSchema),
        async onSubmit(input) {
            const response = _letterCertificationFormSubmit($letterCertificationForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Baru">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/perjawatan/persaraan');
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
        <!-- =============================== -->
        <!-- APPLICATION DETAIL -->
        <!-- =============================== -->
        <StepperContent>
            <StepperContentHeader title="Permohonan Persaraan">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.currentRoleCode == UserRoleConstant.kakitangan.code}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="applicationDetailForm"
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
                                    id="retirementDate"
                                    label={'Tarikh Persaraan Asal'}
                                    type="date"
                                    errors={$applicationDetailErrors.retirementDate}
                                    bind:val={$applicationDetailForm.retirementDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.currentRoleCode !== UserRoleConstant.kakitangan.code}
                                    id="newRetirementDate"
                                    label={'Tarikh Persaraan Dipohon'}
                                    type="date"
                                    errors={$applicationDetailErrors.newRetirementDate}
                                    bind:val={$applicationDetailForm.newRetirementDate}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props
                                        .currentApplicationDetail
                                        .applicationDetail !== null ||
                                        data.props.currentRoleCode !== UserRoleConstant.kakitangan.code}
                                    id="reason"
                                    label={'Alasan Persaraan Awal'}
                                    type="text"
                                    errors={$applicationDetailErrors.reason}
                                    bind:val={$applicationDetailForm.reason}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =============================== -->
        <!-- CERITIFICATION -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Perakuan Dari Unit Integriti">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.certification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                                    disabled={data.props.currentApplicationDetail.certification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$certificationForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.certification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$certificationErrors.remark}
                                    bind:val={$certificationForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
    

      <!-- =============================== -->
        <!-- CONFIRMATION -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Pengesahan Permohonan Persaraan">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.confirmation == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                                    disabled={data.props.currentApplicationDetail.confirmation !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$confirmationForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.confirmation !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
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
    
      <!-- =============================== -->
        <!-- SUPPORT APPROVER -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Penyokong & Pelulus">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.supportApprover == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="supportApproverForm"
                            method="POST"
                            use:supportApproverEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.supportApprover !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$supportApproverForm.supporter1}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.supportApprover !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$supportApproverErrors.supporter2}
                                    bind:val={$supportApproverForm.supporter2}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.supportApprover !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$supportApproverErrors.approver}
                                    bind:val={$supportApproverForm.approver}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
   
      <!-- =============================== -->
        <!-- FIRST SUPPORTER -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Penyokong #1">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.firstSupporter == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="firstSupporterForm"
                            method="POST"
                            use:firstSupporterEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.firstSupporter !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$firstSupporterForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.firstSupporter !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$firstSupporterErrors.remark}
                                    bind:val={$firstSupporterForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
    
      <!-- =============================== -->
        <!-- SECOND SUPPORTER -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Penyokong #2">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.secondSupporter == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="secondSupporterForm"
                            method="POST"
                            use:secondSupporterEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.secondSupporter !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$secondSupporterForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.secondSupporter !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$secondSupporterErrors.remark}
                                    bind:val={$secondSupporterForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
    
      <!-- =============================== -->
        <!-- APPROVAL -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Kelulusan Permohonan Persaraan">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.approval == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                                    disabled={data.props.currentApplicationDetail.approval !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$approvalForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.approval !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
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
    

     <!-- =============================== -->
        <!-- SECRECTARY APPROVAL -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Pengesahan Urus Setia">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.secretaryApproval == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="secretaryApprovalForm"
                            method="POST"
                            use:secretaryApprovalEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.secretaryApproval !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$secretaryApprovalForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.secretaryApproval !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$secretaryApprovalErrors.remark}
                                    bind:val={$secretaryApprovalForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
   
     <!-- =============================== -->
        <!-- DOCUMENT CERTIFICATION -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Pengesahan Dokumen Persaraan">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.documentCertification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
                    <div
                        class="flex h-full w-full flex-col items-start justify-start"
                    >
                        <form
                            id="documentCertificationForm"
                            method="POST"
                            use:documentCertificationEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.documentCertification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$documentCertificationForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.documentCertification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$documentCertificationErrors.remark}
                                    bind:val={$documentCertificationForm.remark}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        {/if}
   
     <!-- =============================== -->
        <!-- LETTER CERTIFICATION -->
        <!-- =============================== -->
        {#if data.props.currentApplicationDetail.applicationDetail !== null}
        <StepperContent>
            <StepperContentHeader title="Pengesahan Surat Persaraan">
                {#if data.props.currentApplicationDetail.applicationDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="meetingResultForm"
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.currentApplicationDetail.letterCertification == null && data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
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
                {:else}
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
                                <CustomSelectField
                                    disabled={data.props.currentApplicationDetail.letterCertification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="status"
                                    label={'Adakah Permohonan Ini Sah?'}
                                    bind:val={$letterCertificationForm.status}
                                    options={data.props.endorsementDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                disabled={data.props.currentApplicationDetail.letterCertification !== null || data.props.currentRoleCode !== UserRoleConstant.unitIntegriti.code}
                                    id="remark"
                                    label={'Alasan Pertukaran'}
                                    errors={$letterCertificationErrors.remark}
                                    bind:val={$letterCertificationForm.remark}
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