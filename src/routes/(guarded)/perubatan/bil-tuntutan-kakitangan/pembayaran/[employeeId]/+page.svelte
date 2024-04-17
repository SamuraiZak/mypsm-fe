<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { certifyOptions } from '$lib/constants/core/radio-option-constants';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _clinicCommonResultSchema,
        _clinicPaymentSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submitPaymentForm, _submitSecretaryApprovalForm } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    export let data: PageData;

    let submitSuccess: boolean = false;
    let submitSecretary: boolean = false;

    if (
        data.paymentDetail.transactionNumber !== null &&
        data.currentRoleCode == UserRoleConstant.kakitangan.code
    ) {
        submitSuccess = true;
    }
    

    const {
        form: paymentForm,
        errors: paymentError,
        enhance: paymentEnhance,
    } = superForm(data.paymentForm, {
        SPA: true,
        taintedMessage: false,
        id: 'paymentForm',
        validators: zod(_clinicPaymentSchema),
        resetForm: false,
        async onSubmit() {
            $paymentForm.id = data.currentId.id;
            const res = await _submitPaymentForm($paymentForm);

            if (res?.response.status == 'success') {
                submitSuccess = true;
            }
        },
    });
    const {
        form: secretaryApprovalForm,
        errors: secretaryApprovalError,
        enhance: secretaryApprovalEnhance,
    } = superForm(data.secretaryApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'secretaryApprovalForm',
        validationMethod: 'onsubmit',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $secretaryApprovalForm.id = data.currentId.id;
            const res = await _submitSecretaryApprovalForm(
                $secretaryApprovalForm,
            );

            if (res?.response.status == 'success') {
                submitSecretary = true;
            }
        },
    });
    if($secretaryApprovalForm.remark !== ""){
        submitSecretary = true;
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Pembayaran Tidak Ditanggung LKIM">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() =>
                data.currentRoleCode == UserRoleConstant.kakitangan.code
                    ? goto('/perubatan')
                    : goto('/perubatan/bil-tuntutan-kakitangan')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
        <div class="flex w-full flex-col p-5">
            <ContentHeader
                title="Maklumat  Kakitangan"
                borderClass="border-none"
            />
            <CustomTextField
                label="No. Pekerja"
                disabled
                id="employeeNumber"
                bind:val={data.paymentPersonalDetail.employeeNumber}
            />
            <CustomTextField
                label="Nama"
                disabled
                id="name"
                bind:val={data.paymentPersonalDetail.name}
            />
            <CustomTextField
                label="No. Kad Pengenalan"
                disabled
                id="ICNumber"
                bind:val={data.paymentPersonalDetail.ICNumber}
            />
            <CustomTextField
                label="Jawatan"
                disabled
                id="position"
                bind:val={data.paymentPersonalDetail.position}
            />
            <CustomTextField
                label="Penempatan"
                disabled
                id="placement"
                bind:val={data.paymentPersonalDetail.placement}
            />
            <ContentHeader
                title="Maklumat  Pembayaran"
                borderClass="border-none"
            />
            <CustomTextField
                label="Jumlah Tunggakan (RM)"
                disabled
                id="amountToPay"
                bind:val={data.paymentDetail.amountToPay}
            />
            <CustomTextField
                label="Kaedah Pembayaran"
                disabled
                id="paymentMethod"
                bind:val={data.paymentDetail.paymentMethod}
            />
            <CustomTextField
                label="No. Rujukan Transaksi"
                disabled
                id="transactionNumber"
                bind:val={data.paymentDetail.transactionNumber}
            />
            <CustomTextField
                label="Bank Penerima"
                disabled
                id="receiverBank"
                bind:val={data.paymentDetail.receiverBank}
            />
            <CustomTextField
                label="No. Akaun Bank Penerima"
                disabled
                id="receiverBankAcc"
                bind:val={data.paymentDetail.receiverBankAcc}
            />
            <CustomTextField
                label="Tarikh Transaksi"
                disabled
                type="date"
                id="transactionDate"
                bind:val={data.paymentDetail.transactionDate}
            />

            <!-- <ContentHeader title="Bukti Pembayaran" borderClass="border-none" />
            <DownloadAttachment fileName="receipt.pdf" /> -->

            <ContentHeader
                title="Keputusan Urus Setia"
                borderClass="border-none"
            >
                {#if !submitSecretary}
                    <TextIconButton
                        label="Simpan"
                        icon="check"
                        form="secretaryApprovalForm"
                    />
                {/if}
            </ContentHeader>
            <form
                class="flex w-full flex-col justify-start gap-2.5"
                id="secretaryApprovalForm"
                use:secretaryApprovalEnhance
                method="POST"
            >
                <CustomTextField
                    label="Tindakan/Ulasan"
                    id="remark"
                    disabled={submitSecretary}
                    bind:val={$secretaryApprovalForm.remark}
                    errors={$secretaryApprovalError.remark}
                />
                <CustomRadioBoolean
                    label="Keputusan"
                    id="status"
                    options={certifyOptions}
                    disabled={submitSecretary}
                    bind:val={$secretaryApprovalForm.status}
                />
            </form>
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col items-start justify-start gap-2.5 p-3">
            <div
                class="flex w-full flex-col justify-start gap-2.5 p-3 md:w-1/2"
            >
                {#if !submitSuccess}
                    <div class="flex w-full justify-end">
                        <TextIconButton
                            label="Hantar"
                            icon="check"
                            form="paymentForm"
                        />
                    </div>
                    <form
                        class="flex w-full flex-col justify-start gap-2.5"
                        id="paymentForm"
                        method="POST"
                        use:paymentEnhance
                    >
                        <CustomSelectField
                            label="Jenis Pembayaran"
                            id="paymentType"
                            options={data.lookup.paymentTypeLookup}
                            bind:val={$paymentForm.paymentType}
                            errors={$paymentError.paymentType}
                        />
                        <CustomTextField
                            label="No. Rujukan Transaksi"
                            id="transactionNumber"
                            bind:val={$paymentForm.transactionNumber}
                            errors={$paymentError.transactionNumber}
                        />
                        <CustomTextField
                            label="Tarikh Transaksi"
                            id="transactionDate"
                            type="date"
                            bind:val={$paymentForm.transactionDate}
                            errors={$paymentError.transactionDate}
                        />
                    </form>
                {:else if submitSuccess}
                    <ContentHeader
                        title="Maklumat  Pembayaran"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Jumlah Tunggakan (RM)"
                        disabled
                        id="amountToPay"
                        bind:val={data.paymentDetail.amountToPay}
                    />
                    <CustomTextField
                        label="Kaedah Pembayaran"
                        disabled
                        id="paymentMethod"
                        bind:val={data.paymentDetail.paymentMethod}
                    />
                    <CustomTextField
                        label="No. Rujukan Transaksi"
                        disabled
                        id="transactionNumber"
                        bind:val={data.paymentDetail.transactionNumber}
                    />
                    <CustomTextField
                        label="Bank Penerima"
                        disabled
                        id="receiverBank"
                        bind:val={data.paymentDetail.receiverBank}
                    />
                    <CustomTextField
                        label="No. Akaun Bank Penerima"
                        disabled
                        id="receiverBankAcc"
                        bind:val={data.paymentDetail.receiverBankAcc}
                    />
                    <CustomTextField
                        label="Tarikh Transaksi"
                        disabled
                        type="date"
                        id="transactionDate"
                        bind:val={data.paymentDetail.transactionDate}
                    />
                {/if}
            </div>
        </div>
    {/if}
</section>

<Toaster />
