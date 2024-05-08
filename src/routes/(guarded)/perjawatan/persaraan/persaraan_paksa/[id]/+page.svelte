<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        ForcedRetirementEndorsementSchema,
        type ForcedRetirementDocumentUpload,
    } from '$lib/schemas/mypsm/employment/retirement/forced-retirement.schema';
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
    import {
        _approvalFormSubmit,
        _certificationFormSubmit,
        _confirmationFormSubmit,
        _prepDocumentUpload,
        _uploadForms,
    } from './+page';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let files: FileList;

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
            const response = _certificationFormSubmit($certificationForm);
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
            const response = _confirmationFormSubmit($confirmationForm);
        },
    });

    function uploadForms() {
        if (files == undefined) {
            alert(
                'Dokumen tidak boleh dibiarkan kosong! Sila pastikan anda muat naik semua borang yang diperlukan sebelum hantar.',
            );
        } else if (files.length < 9) {
            alert(
                'Dokumen tidak mencukupi! Sila pastikan anda muat naik semua borang yang diperlukan sebelum hantar.',
            );
        } else {
            _prepDocumentUpload(files)
                .then((result) => {
                    let postpone: ForcedRetirementDocumentUpload = {
                        retirementId: data.props.currentApplicationId,
                        forms: result,
                    };
                    _uploadForms(JSON.stringify(postpone));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

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
            const response = _approvalFormSubmit($approvalForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Persaraan Paksa">
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
                            {#if data.props.currentApplicationDetail.certification !== null}
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled
                                        id="remark"
                                        label={'Nama Pegawai Unit Integriti Yang Memperakui'}
                                        val={data.props.currentApplicationDetail
                                            .certification.name}
                                    ></CustomTextField>
                                </div>
                            {/if}
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
                                {#if data.props.currentApplicationDetail.confirmation !== null}
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled
                                            id="remark"
                                            label={'Nama Urus Setia Yang Meluluskan'}
                                            val={data.props
                                                .currentApplicationDetail
                                                .confirmation.name}
                                        ></CustomTextField>
                                    </div>
                                {/if}
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

        {#if data.props.currentApplicationDetail.confirmation !== null}
            <StepperContent>
                <StepperContentHeader title="Borang-borang Persaraan">
                    {#if data.props.currentApplicationDetail.forms == null && data.props.currentRoleCode == UserRoleConstant.kakitangan.code}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            onClick={() => {
                                uploadForms();
                            }}
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.forms !== null}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <p
                                class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                            >
                                Borang-borang Persaraan
                            </p>
                            {#each data.props.currentApplicationDetail.forms as doc}
                                <a
                                    href={doc.base64}
                                    target="_blank"
                                    download={doc.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{doc.name}</a
                                >
                            {/each}
                        </div>
                    {:else if data.props.currentApplicationDetail.forms == null}
                        {#if data.props.currentRoleCode == UserRoleConstant.kakitangan.code}
                            <div
                                class="flex h-full w-full flex-col items-start justify-start pb-10"
                            >
                                <div
                                    class="flex w-full flex-col gap-10 px-3 pb-10"
                                >
                                    <Alert color="blue">
                                        <p>
                                            <span class="font-medium"
                                                >Arahan:</span
                                            >
                                            Sila muat turun borang-borang persaraan
                                            di bawah dan muat naik semula setelah
                                            selesai diisi.
                                        </p>
                                    </Alert>
                                </div>
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10 lg:w-1/2"
                                >
                                    <p
                                        class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                    >
                                        Senarai Borang-borang Persaraan Untuk
                                        Diisi
                                    </p>
                                    {#each data.props.formList as form}
                                        <a
                                            href={form.base64}
                                            target="_blank"
                                            download={form.name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{form.name}</a
                                        >
                                    {/each}
                                </div>

                                <form
                                    id="documentUploadForm"
                                    method="POST"
                                    class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                                >
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomFileField
                                            id="postponeDocument"
                                            label="Muat Naik Borang-borang Persaraan"
                                            bind:files
                                        ></CustomFileField>
                                    </div>
                                </form>
                            </div>
                        {:else}
                            <div class="flex w-full flex-col gap-10 px-3 pb-10">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium"
                                            >Tiada Maklumat!</span
                                        >
                                        Menunggu kakitangan untuk muat naik borang-borang
                                        berkaitan
                                    </p>
                                </Alert>
                            </div>
                        {/if}
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

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
                                {#if data.props.currentApplicationDetail.approval !== null}
                                    <div class="flex w-full flex-col gap-2">
                                        <CustomTextField
                                            disabled
                                            id="remark"
                                            label={'Nama Urus Setia Yang Meluluskan'}
                                            val={data.props
                                                .currentApplicationDetail
                                                .approval.name}
                                        ></CustomTextField>
                                    </div>
                                {/if}
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

        <!-- ============================================== -->
        <!-- LETTER -->
        <!-- ============================================== -->
        {#if data.props.currentApplicationDetail.approval !== null}
            <StepperContent>
                <StepperContentHeader title="Surat Iringan"
                ></StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.currentApplicationDetail.letter !== null}
                        <div
                            class="flex w-full flex-col justify-start gap-2.5 pb-10"
                        >
                            <div class="flex w-full flex-col gap-10 px-3 pb-4">
                                <Alert color="blue">
                                    <p>
                                        <span class="font-medium">Arahan:</span>
                                        Sila muat turun surat iringan yang tertera
                                        di bawah untuk tujuan KWAP.
                                    </p>
                                </Alert>
                            </div>
                            <div
                                class="flex w-full flex-col gap-2.5 px-3 pb-10 lg:w-1/2"
                            >
                                <p
                                    class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                >
                                    Surat Iringan
                                </p>

                                <a
                                    href={data.props.currentApplicationDetail
                                        .letter.base64}
                                    target="_blank"
                                    download={data.props
                                        .currentApplicationDetail.letter.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{data.props.currentApplicationDetail.letter
                                        .name}</a
                                >
                            </div>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
