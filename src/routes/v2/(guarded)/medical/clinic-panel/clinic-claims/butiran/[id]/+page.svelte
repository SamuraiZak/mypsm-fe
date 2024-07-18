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
        _submitClaims,
        _submitSecretaryApprovalForm,
        _submitSuppAppForm,
        _submitSupporterApprovalForm,
    } from './+page';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Toaster } from 'svelte-french-toast';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import { Accordion, AccordionItem, Checkbox, Modal } from 'flowbite-svelte';
    import MedicTable from '$lib/components/table/MedicTable.svelte';
    import XCard from '$lib/components/card/XCard.svelte';

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
        form: claimsForm,
        errors: claimsError,
        enhance: claimsEnhance,
    } = superForm(data.claimsForm, {
        SPA: true,
        taintedMessage: false,
        id: 'claimsForm',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $claimsForm.id = data.clinicId.id;
            const editMode = await _submitClaims($claimsForm);
            console.log($claimsForm);
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

    let modal: boolean = false;

    let isCheck: boolean[] = [];

    function calculateTotal() {}
    $: {
        $claimsForm.totalLkimToPay = 0;
        data.mockData.forEach((value, i) => {
            if (isCheck[i]) {
                $claimsForm.totalLkimToPay += value.total;
                // $claimsForm.treatments.push(value.treatment[i].name)
                let tempData = {
                    name: '',
                    total: 0,
                }
                value.treatment.forEach((item) => {
                    tempData.name = item.name;
                    tempData.total = value.total;
                    $claimsForm.treatments.push(tempData)
                })

                console.log($claimsForm)
            }
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Bil Tuntutan Klinik Panel">
        <TextIconButton
            label="Kembali"
            icon="previous"
            type="neutral"
            onClick={() => goto('/v2/medical/clinic-panel/clinic-claims')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Rawatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <Accordion class="flex w-full flex-col">
                    <AccordionItem>
                        <span
                            class="text-[12px] text-ios-activeColors-activeBlue-dark"
                            slot="header"
                        >
                            Tuntutan 1
                        </span>
                        <div class="flex w-full flex-col gap-3">
                            <div class="flex w-full justify-start">
                                <TextIconButton
                                    label="Tindakan"
                                    icon="action"
                                    type="neutral"
                                    onClick={() => (modal = true)}
                                />
                            </div>
                            <div class="flex w-full justify-between gap-3">
                                <div class="flex w-full flex-col gap-2.5">
                                    <CustomTextField
                                        label="Nama Kakitangan"
                                        id="dignosis"
                                        disabled
                                        isRequired={false}
                                        val="Ali bin Abu"
                                    />
                                    <CustomTextField
                                        label="No. Kad Pengenalan"
                                        id="identityDocumentNumber"
                                        disabled
                                        isRequired={false}
                                        val="871113137712"
                                    />
                                </div>
                                <MedicTable tableData={data.mockData} />
                            </div>
                        </div>
                    </AccordionItem>
                </Accordion>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Invois"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="Klinik"
                    disabled
                    id="clinicName"
                    val={data.claimDetail.detail?.invoiceNumber}
                />
                <CustomTextField
                    label="Tarikh Invois"
                    disabled
                    id="invoiceDate"
                    val={data.claimDetail.detail?.invoiceDate}
                />
                <CustomTextField
                    label="No. Invois"
                    disabled
                    id="invoiceNumber"
                    val={data.claimDetail.detail?.invoiceNumber}
                />
                <CustomSelectField
                    label="Bulan Rawatan"
                    disabled
                    options={monthNumberLookup}
                    id="treatmentMonth"
                    val={data.claimDetail.detail?.treatmentMonth}
                />
                <CustomTextField
                    label="Tahun Rawatan"
                    disabled
                    id="treatmentYear"
                    val={data.claimDetail.detail?.treatmentYear}
                />
                <CustomTextField
                    label="Jumlah (RM)"
                    disabled
                    id="total"
                    val={data.claimDetail?.detail?.total}
                />
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan Yang Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col justify-start gap-2.5 p-3">
                    {#if data.claimDetail?.download !== undefined && data.claimDetail?.download !== null}
                        {#each data.claimDetail?.download as docs, i}
                            <a
                                href={docs?.document}
                                download={docs?.name}
                                class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                >{docs?.name}</a
                            >
                        {/each}
                    {/if}
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
                {#if data.claimDetail.secretaryApproval == null && data.currentRoleCode !== UserRoleConstant.urusSetiaPerubatan.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu keputusan daripada Urus Setia Perubatan.
                            </p>
                        </Alert>
                    </div>
                {:else}
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
                {/if}
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
                {#if data.claimDetail.supporterApprover == null && data.currentRoleCode !== UserRoleConstant.urusSetiaPerubatan.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu pemilihan daripada Urus Setia Perubatan.
                            </p>
                        </Alert>
                    </div>
                {:else}
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
                {/if}
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
                {#if data.claimDetail.supporter == null && data.currentRoleCode !== UserRoleConstant.penyokong.code}
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
                            options={[{ value: true, name: 'SOKONG' }]}
                            bind:val={$supporterApprovalForm.status}
                        />
                    </form>
                {/if}
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
                {#if data.claimDetail.approver == null && data.currentRoleCode !== UserRoleConstant.pelulus.code}
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
                            options={[{ value: true, name: 'LULUS' }]}
                            bind:val={$approverApprovalForm.status}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />

<Modal bind:open={modal} size="lg" title="Sistem MyPSM">
    <!-- <Modal open={true} title="Sistem MyPSM"> -->
    <form
        class="flex w-full flex-col justify-start gap-3"
        use:claimsEnhance
        id="claimsForm"
        method="POST"
    >
        <ContentHeader
            title="Klinik"
            borderClass="border-none"
            titlePadding={false}
        >
            <TextIconButton label="Hantar" icon="check" form="" />
        </ContentHeader>
        <CustomTextField
            label="Tindakan/Ulasan"
            isRequired={false}
            type="textarea"
            placeholder="Hantar ke klinik untuk membuat pembetulan..."
            id="clinicRemarks"
            val=""
        />
        <ContentHeader
            title="Kakitangan"
            borderClass="border-none"
            titlePadding={false}
        >
            <TextIconButton label="Hantar" icon="check" form="" />
        </ContentHeader>
        <CustomTextField
            label="Tindakan/Ulasan"
            isRequired={false}
            type="textarea"
            placeholder="Hantar ke kakitangan untuk membuat pembayaran rawatan yang tidak ditanggung oleh LKIM..."
            id="employeeRemarks"
            val=""
        />
        <CustomTextField
            label="Jumlah Perlu Ditanggung Oleh Kakitangan (RM)"
            isRequired={false}
            type="number"
            id="employeeRemarks"
            val=""
        />
        <XCard
            title="Maklumat Rawatan/Ubat"
            headerColor="bg-ios-systemColors-systemGrey-light"
        >
            <div class="flex w-full flex-col justify-start gap-5">
                <div class="flex w-full flex-col justify-start gap-2">
                    {#each data.mockData as item, i}
                        <div
                            class="flex w-full flex-col justify-start rounded-sm border p-2"
                        >
                            <Checkbox
                                bind:checked={isCheck[i]}
                                class="text-[11px] text-ios-systemColors-systemGrey-dark"
                            >
                                <div class="flex w-full flex-col">
                                    <span class="flex w-full">
                                        {i + 1}.
                                        {#each item.treatment as treatmentList, index}
                                            {treatmentList.name}{index ==
                                            item.treatment.length - 1
                                                ? ''
                                                : '/'}
                                        {/each}
                                    </span>
                                    <CustomTextField
                                        label=""
                                        id=""
                                        val={'RM ' + item.total}
                                        isRequired={false}
                                        disabled
                                    />
                                </div>
                            </Checkbox>
                        </div>
                    {/each}
                </div>

                <div class="flex w-full items-center justify-end gap-3">
                    <CustomTextField
                        label="Jumlah Tanggungan oleh LKIM (RM)"
                        id="totalPay"
                        type="number"
                        disabled
                        bind:val={$claimsForm.totalLkimToPay}
                    />
                    <TextIconButton
                        label="SAH"
                        icon="check"
                        form="claimsForm"
                    />
                </div>
            </div>
        </XCard>
    </form>
</Modal>
