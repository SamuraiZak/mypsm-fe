<script lang="ts">
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _documentApprovalSubmit, _retirementDetailSubmit } from './+page';
    import {
        UspRetirementDetailSchema,
        UspRetirementDocumentApprovalSchema,
    } from '$lib/schemas/mypsm/employment/retirement/retirement-other.schema';
    import { goto } from '$app/navigation';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import { Alert, Badge } from 'flowbite-svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    const {
        form: retirementDetailForm,
        errors: retirementDetailErrors,
        enhance: retirementDetailEnhance,
    } = superForm(data.forms.retirementDetailForm, {
        id: 'retirementDetailForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(UspRetirementDetailSchema),
        async onSubmit(input) {
            const response = _retirementDetailSubmit($retirementDetailForm);
        },
    });
    const {
        form: documentApprovalForm,
        errors: documentApprovalErrors,
        enhance: documentApprovalEnhance,
    } = superForm(data.forms.documentApprovalForm, {
        id: 'documentApprovalForm',
        SPA: true,
        taintedMessage: false,
        resetForm: false,
        validationMethod: 'oninput',
        invalidateAll: true,
        validators: zodClient(UspRetirementDocumentApprovalSchema),
        async onSubmit(input) {
            const response = _documentApprovalSubmit($documentApprovalForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Persaraan">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                let url =
                    '/perjawatan/persaraan/persaraan_lain-lain/' +
                    data.props.currentApplicationId;

                goto(url);
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
        <!-- EMPLOYEE DETAIL -->
        <!-- =============================== -->
        <StepperContent>
            <StepperContentHeader title="Butiran Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <div
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="employeeName"
                                label={'Nama Kakitangan'}
                                type="text"
                                val={data.props.chosenDetail.employeeDetail
                                    ?.employeeName}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="identityCardNumber"
                                label={'No. Kad Pengenalan'}
                                type="text"
                                val={data.props.chosenDetail.employeeDetail
                                    ?.identityCardNumber}
                            ></CustomTextField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                disabled
                                id="retirementDate"
                                label={'Tarikh Persaraan'}
                                type="date"
                                val={data.props.chosenDetail.employeeDetail
                                    ?.retirementDate}
                            ></CustomTextField>
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- =============================== -->
        <!-- Kemaskini Butiran Persaraan -->
        <!-- =============================== -->
        <StepperContent>
            <StepperContentHeader title="Butiran Pertukaran">
                {#if data.props.chosenDetail.retirementDetail == null && data.props.userMode == 'secretary'}
                    <TextIconButton
                        label="Hantar"
                        icon="check"
                        form="retirementDetailForm"
                    ></TextIconButton>
                    <TextIconButton
                        label="Set Semula"
                        type="neutral"
                        icon="reset"
                        onClick={() => {
                            retirementDetailForm.set(
                                data.forms.retirementDetailForm.data,
                            );
                        }}
                    ></TextIconButton>
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.props.chosenDetail.retirementDetail == null && data.props.userMode !== 'secretary'}
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
                            id="retirementDetailForm"
                            method="POST"
                            use:retirementDetailEnhance
                            class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    disabled={data.props.chosenDetail
                                        .retirementDetail !== null ||
                                        data.props.userMode != 'secretary'}
                                    id="retirementTypeListDropdown"
                                    label={'Jenis Persaraan'}
                                    bind:val={$retirementDetailForm.retirementTypeId}
                                    options={data.props
                                        .retirementTypeListDropdown}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    disabled={data.props.chosenDetail
                                        .retirementDetail !== null ||
                                        data.props.userMode != 'secretary'}
                                    id="retirementDate"
                                    label={'Tarikh Persaraan (sila kemaskini jika ada perubahan)'}
                                    type="date"
                                    errors={$retirementDetailErrors.retirementDate}
                                    bind:val={$retirementDetailForm.retirementDate}
                                ></CustomTextField>
                            </div>
                        </form>
                    </div>
                {/if}
            </StepperContentBody>
        </StepperContent>
        <!-- =============================== -->
        <!-- Semakan Dokumen Persaraan -->
        <!-- =============================== -->
        {#if data.props.chosenDetail.retirementDetail !== null}
            <StepperContent>
                <StepperContentHeader title="Semakan Dokumen Persaraan">
                    {#if data.props.chosenDetail.documentApproval == null && data.props.userMode == 'secretary'}
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="documentApprovalForm"
                        ></TextIconButton>
                        <TextIconButton
                            label="Set Semula"
                            type="neutral"
                            icon="reset"
                            onClick={() => {
                                documentApprovalForm.set(
                                    data.forms.documentApprovalForm.data,
                                );
                            }}
                        ></TextIconButton>
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.props.chosenDetail.documentApproval == null && data.props.userMode !== 'secretary'}
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
                                id="documentApprovalForm"
                                method="POST"
                                use:documentApprovalEnhance
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div class="flex w-full flex-col gap-2">
                                    <CustomSelectField
                                        disabled={data.props.chosenDetail
                                            .documentApproval !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="status"
                                        label={'Jenis Persaraan'}
                                        bind:val={$documentApprovalForm.status}
                                        options={data.props.endorsementDropdown}
                                    ></CustomSelectField>
                                </div>
                                <div class="flex w-full flex-col gap-2">
                                    <CustomTextField
                                        disabled={data.props.chosenDetail
                                            .documentApproval !== null ||
                                            data.props.userMode != 'secretary'}
                                        id="remark"
                                        label={'Ulasan'}
                                        type="text"
                                        errors={$documentApprovalErrors.remark}
                                        bind:val={$documentApprovalForm.remark}
                                    ></CustomTextField>
                                </div>
                            </form>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}

        <!-- =============================== -->
        <!-- SURAT PERSARAAN -->
        <!-- =============================== -->
        {#if data.props.chosenDetail.documentApproval !== null}
            <StepperContent>
                <StepperContentHeader title="Surat Persaraan"
                ></StepperContentHeader>
                <StepperContentBody>
                    {#if !data.props.chosenDetail.documentApproval.status}
                        <div class="flex w-full flex-col gap-10 px-3 pb-10">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Sila pastikan semua dokumen persaraan telah dihantar
                                    untuk mendapatkan surat persaraan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <div
                            class="flex h-full w-full flex-col items-start justify-start"
                        >
                            <div
                                class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                            >
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 pb-10"
                                >
                                    <p
                                        class="block w-full text-start text-sm font-medium leading-tight text-ios-labelColors-secondaryLabel-light"
                                    >
                                        Surat Permohonan Penangguhan
                                    </p>

                                    {#if data.props.chosenDetail.letter !== null}
                                        <a
                                            href={data.props.chosenDetail.letter
                                                .document.base64}
                                            target="_blank"
                                            download={data.props.chosenDetail
                                                .letter.document.name}
                                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                            >{data.props.chosenDetail.letter
                                                .document.name}</a
                                        >
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>

<Toaster></Toaster>
