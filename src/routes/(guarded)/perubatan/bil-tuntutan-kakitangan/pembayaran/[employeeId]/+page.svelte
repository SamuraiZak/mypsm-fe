<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
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
    import {
        _fileToBase64Object,
        _submitPaymentForm,
        _submitSecretaryApprovalForm,
    } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import Error from '../../../../../+error.svelte';

    export let data: PageData;

    let submitSuccess: boolean = false;
    let submitSecretary: boolean = false;
    let files: FileList;
    if (
        (data.paymentDetail?.paymentMethod !== undefined ||
            data.paymentDetail?.paymentMethod !== null) &&
        data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code
    ) {
        submitSuccess = true;
    } else if (
        data.employeePaymentDetail?.paymentMethod !== null &&
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
            if (
                files == undefined &&
                $paymentForm.paymentType == 'Transaksi Atas Talian'
            ) {
                alert('Dokumen sokongan tidak boleh kosong.');
            } else if ($paymentForm.paymentType == 'Penolakan Gaji') {
                $paymentForm.documents = null;
                $paymentForm.transactionDate = null;
                $paymentForm.transactionNumber = null;
                const res = await _submitPaymentForm($paymentForm);

                if (res?.response.status == 'success') {
                    submitSuccess = true;
                }
            } else {
                _fileToBase64Object(files)
                    .then((result) => {
                        $paymentForm.documents = result;
                    })
                    .finally(async () => {
                        const res = await _submitPaymentForm($paymentForm);

                        if (res?.response.status == 'success') {
                            submitSuccess = true;
                        }
                    })
                    .catch((error) => {
                        throw new Error(error);
                    });
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
    if ($secretaryApprovalForm.remark !== '') {
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
                val={data.paymentPersonalDetail?.employeeNumber}
            />
            <CustomTextField
                label="Nama"
                disabled
                id="name"
                val={data.paymentPersonalDetail?.name}
            />
            <CustomTextField
                label="No. Kad Pengenalan"
                disabled
                id="ICNumber"
                val={data.paymentPersonalDetail?.ICNumber}
            />
            <CustomTextField
                label="Jawatan"
                disabled
                id="position"
                val={data.paymentPersonalDetail?.position}
            />
            <CustomTextField
                label="Penempatan"
                disabled
                id="placement"
                val={data.paymentPersonalDetail?.placement}
            />
            <ContentHeader
                title="Maklumat  Pembayaran"
                borderClass="border-none"
            />
            {#if data.paymentDetail?.paymentMethod !== null}
                <CustomTextField
                    label="Jumlah Tunggakan (RM)"
                    disabled
                    id="amountToPay"
                    val={data.paymentDetail?.amountToPay}
                />
                <CustomTextField
                    label="Kaedah Pembayaran"
                    disabled
                    id="paymentMethod"
                    val={data.paymentDetail?.paymentMethod}
                />
                {#if data.paymentDetail?.paymentMethod == 'Transaksi Atas Talian'}
                    <CustomTextField
                        label="No. Rujukan Transaksi"
                        disabled
                        id="transactionNumber"
                        val={data.paymentDetail?.transactionNumber}
                    />
                    <CustomTextField
                        label="Bank Penerima"
                        disabled
                        id="receiverBank"
                        val={data.paymentDetail?.receiverBank}
                    />
                    <CustomTextField
                        label="No. Akaun Bank Penerima"
                        disabled
                        id="receiverBankAcc"
                        val={data.paymentDetail?.receiverBankAcc}
                    />
                    <CustomTextField
                        label="Tarikh Transaksi"
                        disabled
                        type="date"
                        id="transactionDate"
                        val={data.paymentDetail?.transactionDate}
                    />

                    <ContentHeader
                        title="Bukti Pembayaran"
                        borderClass="border-none"
                    />
                    <div
                        class="flex h-fit w-full flex-col justify-start gap-2 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                    >
                        <span
                            >Dokumen-dokumen sokongan yang telah dimuat naik
                            oleh kakitangan :</span
                        >

                        {#each data?.paymentDocuments?.document as documents}
                            <a
                                href={documents.document}
                                download={documents.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{documents.name}</a
                            >
                        {/each}
                    </div>
                {/if}

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
                        <TextIconButton
                            label="Hantar"
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
            {:else}
                <div class="flex w-full flex-col gap-10 px-3">
                    <Alert color="blue">
                        <p>
                            <span class="font-medium">Tiada Maklumat!</span>
                            Menunggu kakitangan membuat pembayaran.
                        </p>
                    </Alert>
                </div>
            {/if}
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col items-start justify-start gap-2.5 p-3">
            <div
                class="flex w-full flex-col justify-start gap-2.5 p-3 md:w-1/2"
            >
                {#if !submitSuccess}
                    <div class="flex w-full justify-end">
                        <TextIconButton
                            label="Simpan"
                            icon="check"
                            form="paymentForm"
                        />
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
                        {#if $paymentForm.paymentType == 'Transaksi Atas Talian'}
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

                            <div
                                class="flex h-fit w-full flex-col justify-start gap-2 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                            >
                                <span
                                    >Muat turun resit dan dokumen-dokumen
                                    sokongan yang berkaitan.</span
                                >
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomFileField
                                    label="Dokumen Sokongan"
                                    id="employeeClaimDocument"
                                    bind:files
                                ></CustomFileField>
                            </div>
                        {/if}
                    </form>
                {:else if submitSuccess}
                    <ContentHeader
                        title="Maklumat  Pembayaran"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Jumlah Dibayar (RM)"
                        disabled
                        id="totalPayment"
                        val={data.employeePaymentDetail?.totalPayment}
                    />
                    <CustomTextField
                        label="Kaedah Pembayaran"
                        disabled
                        id="paymentMethod"
                        val={data.employeePaymentDetail?.paymentMethod}
                    />

                    {#if data.employeePaymentDetail?.paymentMethod == 'Transaksi Atas Talian'}
                        <CustomTextField
                            label="No. Rujukan Transaksi"
                            disabled
                            id="transactionNumber"
                            val={data.employeePaymentDetail?.transactionNumber}
                        />
                        <CustomTextField
                            label="Bank Penerima"
                            disabled
                            id="receiverBank"
                            val={data.employeePaymentDetail?.receiverBank}
                        />
                        <CustomTextField
                            label="No. Akaun Bank Penerima"
                            disabled
                            id="receiverAcc"
                            val={data.employeePaymentDetail?.receiverAcc}
                        />
                        <CustomTextField
                            label="Tarikh Transaksi"
                            disabled
                            type="date"
                            id="transactionDate"
                            val={data.employeePaymentDetail?.transactionDate}
                        />

                        <div
                            class="flex h-fit w-full flex-col justify-start gap-2 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                        >
                            <span
                                >Dokumen-dokumen sokongan yang telah dimuat naik
                                oleh kakitangan :</span
                            >
                            <!-- {#if data.paymentDocuments.document !== null} -->
                            {#each data.paymentDocuments?.document as documents}
                                <a
                                    href={documents.document}
                                    download={documents.name}
                                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                    >{documents.name}</a
                                >
                            {/each}
                            <!-- {/if} -->
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    {/if}
</section>

<Toaster />
