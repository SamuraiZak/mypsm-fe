<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import { goto } from '$app/navigation';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { Accordion, AccordionItem, Alert, Modal } from 'flowbite-svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _addEmployeeClaimsSchema,
        _clinicCommonResultSchema,
        _clinicSuppAppIdSchema,
        _clinicSupporterApproverSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import {
        _submitApproverApprovalForm,
        _submitSecretaryApprovalForm,
        _submitSupporterApprovalForm,
        _submitSupporterApproverForm,
    } from './+page';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    export let data: PageData;

    let secretaryResult: boolean = false;
    let supporterApproverExist: boolean = false;
    let supporterResult: boolean = false;
    let approverResult: boolean = false;

    if (data.secretaryApproval.remark !== null) {
        secretaryResult = true;
    }
    if (data.supporterApprover.approverId !== 0) {
        supporterApproverExist = true;
    }
    if (data.supporterApproval.remark !== undefined) {
        supporterResult = true;
    }
    if (data.approverApproval.remark !== undefined) {
        approverResult = true;
    }

    const {
        form: secretaryApprovalForm,
        errors: secretaryApprovalError,
        enhance: secretaryApprovalEnhance,
    } = superForm(data.secretaryApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'secretaryApprovalForm',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $secretaryApprovalForm.id = data.claimId.id;
            const res = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );

            if (res?.response.status == 'success') {
                secretaryResult = true;
            }
        },
    });
    const {
        form: supporterApproverForm,
        errors: supporterApproverError,
        enhance: supporterApproverEnhance,
    } = superForm(data.supporterApproverForm, {
        SPA: true,
        taintedMessage: false,
        id: 'supporterApproverForm',
        validators: zod(_clinicSuppAppIdSchema),
        resetForm: false,
        async onSubmit() {
            $supporterApproverForm.id = data.claimId.id;
            const res = await _submitSupporterApproverForm(
                $supporterApproverForm,
            );

            if (res?.response.status == 'success') {
                supporterApproverExist = true;
            }
        },
    });
    const {
        form: supporterApprovalForm,
        errors: supporterApprovalError,
        enhance: supporterApprovalEnhance,
    } = superForm(data.supporterApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'supporterApprovalForm',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $supporterApprovalForm.id = data.claimId.id;
            const res = await _submitSupporterApprovalForm(
                $supporterApprovalForm,
            );

            if (res?.response.status == 'success') {
                supporterResult = true;
            }
        },
    });
    const {
        form: approverApprovalForm,
        errors: approverApprovalError,
        enhance: approverApprovalEnhance,
    } = superForm(data.approverApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'approverApprovalForm',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $approverApprovalForm.id = data.claimId.id;
            const res = await _submitApproverApprovalForm(
                $approverApprovalForm,
            );

            if (res?.response.status == 'success') {
                approverResult = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Tuntutan Perubatan">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perubatan/bil-tuntutan-kakitangan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-3 py-5"
                >
                    <CustomTextField
                        label="No. Pekerja"
                        disabled
                        id="employeeNumber"
                        bind:val={data.employeeDetail.employeeNumber}
                    />
                    <CustomTextField
                        label="Nama"
                        disabled
                        id="fullName"
                        bind:val={data.employeeDetail.fullName}
                    />
                    <CustomTextField
                        label="No. Kad Pengenalan"
                        disabled
                        id="identityCardNumber"
                        bind:val={data.employeeDetail.identityCardNumber}
                    />
                    <CustomTextField
                        label="Gred"
                        disabled
                        id="grade"
                        bind:val={data.employeeDetail.grade}
                    />
                    <CustomTextField
                        label="Penempatan"
                        disabled
                        id="placement"
                        bind:val={data.employeeDetail.placement}
                    />
                    <CustomTextField
                        label="Kumpulan"
                        disabled
                        id="serviceGroup"
                        bind:val={data.employeeDetail.serviceGroup}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Tuntutan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10 pt-5"
                >
                    <CustomTextField
                        label="Tarikh Rawatan"
                        id="treatmentDate"
                        disabled
                        type="date"
                        bind:val={data.claimsDetail.treatmentDate}
                    />
                    <CustomSelectField
                        label="Klinik"
                        id="clinicId"
                        disabled
                        options={data.lookup.clinicLookup}
                        bind:val={data.claimsDetail.clinicId}
                    />
                    <CustomTextField
                        label="Bilangan Hari Cuti Sakit"
                        id="medicalLeave"
                        disabled
                        type="number"
                        bind:val={data.claimsDetail.medicalLeave}
                    />
                    <ContentHeader
                        title="Senarai Tuntutan"
                        borderClass="border-none"
                    />
                    {#if data.claimsDetail.claims.length < 1}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Kakitangan gagal menambah tuntutan.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        {#each data.claimsDetail.claims as claim, i}
                            <div
                                class="flex w-full flex-col justify-start gap-2.5 rounded-md border border-ios-activeColors-activeBlue-light p-3"
                            >
                                <div
                                    class="flex w-full items-center justify-start gap-2.5 pb-1 text-sm font-semibold text-ios-labelColors-link-light"
                                >
                                    <span>
                                        Tuntutan {i + 1}
                                    </span>
                                </div>
                                <CustomTextField
                                    label="Jumlah Rawatan (RM)"
                                    id="claims{i}"
                                    disabled
                                    type="number"
                                    val={claim}
                                />
                            </div>
                        {/each}
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Urus Setia">
                {#if !secretaryResult}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="secretaryApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Ulasan Penyemakan Urus Setia"
                    borderClass="border-none"
                />
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="secretaryApprovalForm"
                    method="POST"
                    use:secretaryApprovalEnhance
                >
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id="remark"
                        disabled={secretaryResult}
                        bind:val={$secretaryApprovalForm.remark}
                        errors={$secretaryApprovalError.remark}
                    />
                    <CustomRadioBoolean
                        label="Pengesahan"
                        id="status"
                        disabled={secretaryResult}
                        options={certifyOptions}
                        bind:val={$secretaryApprovalForm.status}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus">
                {#if !supporterApproverExist}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="supporterApproverForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="supporterApproverForm"
                    use:supporterApproverEnhance
                    method="POST"
                >
                    <CustomSelectField
                        label="Penyokong"
                        id="supporterId"
                        disabled={supporterApproverExist}
                        options={data.lookup.supporterApproverLookup}
                        bind:val={$supporterApproverForm.supporterId}
                        errors={$supporterApproverError.supporterId}
                    />
                    <CustomSelectField
                        label="Pelulus"
                        id="approverId"
                        disabled={supporterApproverExist}
                        options={data.lookup.supporterApproverLookup}
                        bind:val={$supporterApproverForm.approverId}
                        errors={$supporterApproverError.approverId}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Penyokong">
                {#if !supporterResult && data.currentRoleCode == UserRoleConstant.penyokong.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="supporterApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.supporterApproval.remark == null && data.currentRoleCode !== UserRoleConstant.penyokong.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu keputusan daripada penyokong.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        id="supporterApprovalForm"
                        method="POST"
                        use:supporterApprovalEnhance
                    >
                        <CustomSelectField
                            label="Penyokong"
                            id="supporterId"
                            disabled
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$supporterApproverForm.supporterId}
                            errors={$supporterApproverError.supporterId}
                        />
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            id="remark"
                            disabled={supporterResult}
                            bind:val={$supporterApprovalForm.remark}
                            errors={$supporterApprovalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            disabled={supporterResult}
                            options={supportOptions}
                            bind:val={$supporterApprovalForm.status}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Pelulus">
                {#if !approverResult && data.currentRoleCode == UserRoleConstant.pelulus.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="approverApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if data.approverApproval.remark == null && data.currentRoleCode !== UserRoleConstant.pelulus.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu keputusan daripada pelulus.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 p-3"
                        id="approverApprovalForm"
                        method="POST"
                        use:approverApprovalEnhance
                    >
                        <CustomSelectField
                            label="Pelulus"
                            id="approverId"
                            disabled
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$supporterApproverForm.approverId}
                            errors={$supporterApproverError.approverId}
                        />
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            id="remark"
                            disabled={approverResult}
                            bind:val={$approverApprovalForm.remark}
                            errors={$approverApprovalError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            disabled={approverResult}
                            options={approveOptions}
                            bind:val={$approverApprovalForm.status}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
