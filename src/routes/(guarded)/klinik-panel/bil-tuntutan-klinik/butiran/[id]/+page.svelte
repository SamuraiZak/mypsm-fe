<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import type { PageData } from './$types';
    import { monthNumberLookup } from '$lib/constants/core/dropdown.constant';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { superForm } from 'sveltekit-superforms/client';
    import { _clinicCommonResultSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _submitApproverApprovalForm,
        _submitSecretaryApprovalForm,
        _submitSuppAppForm,
        _submitSupporterApprovalForm,
    } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;

    let secretaryApproved: boolean = false;
    let suppAppExist: boolean = false;
    let supporterApproved: boolean = false;
    let approverApproved: boolean = false;

    if (data.claimDetail.secretaryApproval !== null) {
        secretaryApproved = true;
    }
    if (data.claimDetail.supporterApprover !== null) {
        suppAppExist = true;
    }
    if (data.claimDetail.supporter !== null) {
        supporterApproved = true;
    }

    if (data.claimDetail.approver !== null) {
        approverApproved = true;
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
            $secretaryApprovalForm.id = data.clinicId.id;
            const editMode = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );

            if (editMode?.response.status == 'success') {
                secretaryApproved = true;
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
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $supporterApproverForm.id = data.clinicId.id;
            const editMode = await _submitSuppAppForm($supporterApproverForm);

            if (editMode?.response.status == 'success') {
                suppAppExist = true;
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
            $supporterApprovalForm.id = data.clinicId.id;
            const editMode = await _submitSupporterApprovalForm(
                $supporterApprovalForm,
            );

            if (editMode?.response.status == 'success') {
                supporterApproved = true;
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
            $approverApprovalForm.id = data.clinicId.id;
            const editMode = await _submitApproverApprovalForm(
                $approverApprovalForm,
            );

            if (editMode?.response.status == 'success') {
                approverApproved = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Bil Tuntutan Klinik Panel">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/klinik-panel/bil-tuntutan-klinik')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Invois"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Klinik"
                    disabled
                    id="clinicName"
                    bind:val={data.claimDetail.detail.invoiceNumber}
                />
                <CustomTextField
                    label="Tarikh Invois"
                    disabled
                    id="invoiceDate"
                    bind:val={data.claimDetail.detail.invoiceDate}
                />
                <CustomTextField
                    label="No. Invois"
                    disabled
                    id="invoiceNumber"
                    bind:val={data.claimDetail.detail.invoiceNumber}
                />
                <CustomSelectField
                    label="Bulan Rawatan"
                    disabled
                    options={monthNumberLookup}
                    id="treatmentMonth"
                    bind:val={data.claimDetail.detail.treatmentMonth}
                />
                <CustomTextField
                    label="Tahun Rawatan"
                    disabled
                    id="treatmentYear"
                    bind:val={data.claimDetail.detail.treatmentYear}
                />
                <CustomTextField
                    label="Jumlah (RM)"
                    disabled
                    id="total"
                    bind:val={data.claimDetail.detail.total}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan Yang Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    {#each data.claimDetail.download as docs, i}
                        <a
                            href={docs.document}
                            download={docs.name}
                            class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                            >{docs.name}</a
                        >
                    {/each}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan">
                {#if !secretaryApproved && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="secretaryApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="secretaryApprovalForm"
                    method="POST"
                    use:secretaryApprovalEnhance
                >
                    <CustomTextField
                        label="Ulasan/Tindakan"
                        id="remark"
                        disabled={secretaryApproved}
                        bind:val={$secretaryApprovalForm.remark}
                        errors={$secretaryApprovalError.remark}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        disabled={secretaryApproved}
                        options={certifyOptions}
                        bind:val={$secretaryApprovalForm.status}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus">
                {#if !suppAppExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
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
                        disabled={suppAppExist}
                        options={data.lookup.supporterApproverLookup}
                        bind:val={$supporterApproverForm.supporterId}
                        errors={$supporterApproverError.supporterId}
                    />
                    <CustomSelectField
                        label="Pelulus"
                        id="approverId"
                        disabled={suppAppExist}
                        options={data.lookup.supporterApproverLookup}
                        bind:val={$supporterApproverForm.approverId}
                        errors={$supporterApproverError.approverId}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Sokongan">
                {#if !supporterApproved && data.currentRoleCode == UserRoleConstant.penyokong.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="supporterApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="supporterApprovalForm"
                    method="POST"
                    use:supporterApprovalEnhance
                >
                    <CustomTextField
                        label="Ulasan/Tindakan"
                        id="remark"
                        disabled={supporterApproved}
                        bind:val={$supporterApprovalForm.remark}
                        errors={$supporterApprovalError.remark}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        disabled={supporterApproved}
                        options={supportOptions}
                        bind:val={$supporterApprovalForm.status}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Kelulusan">
                {#if !approverApproved && data.currentRoleCode == UserRoleConstant.pelulus.code}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="approverApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                    id="approverApprovalForm"
                    method="POST"
                    use:approverApprovalEnhance
                >
                    <CustomTextField
                        label="Ulasan/Tindakan"
                        id="remark"
                        disabled={approverApproved}
                        bind:val={$approverApprovalForm.remark}
                        errors={$approverApprovalError.remark}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id="status"
                        disabled={approverApproved}
                        options={approveOptions}
                        bind:val={$approverApprovalForm.status}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />
