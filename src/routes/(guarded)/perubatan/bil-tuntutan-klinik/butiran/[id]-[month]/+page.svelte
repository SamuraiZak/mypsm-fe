<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { Accordion, AccordionItem, Alert, Modal } from 'flowbite-svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import { _submitSupporterApprover } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _clinicCommonResultSchema,
        _clinicSuppAppIdSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    export let data: PageData;
    let tuntutanModal: boolean = false;

    let secretaryResult: boolean = false;
    let supporterApproverExist: boolean = false;
    let supporterResult: boolean = false;
    let approverResult: boolean = false;

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
            $supporterApproverForm.id = data.clinicId.id;
            const res = await _submitSupporterApprover($supporterApproverForm);

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
            $supporterApprovalForm.id = data.clinicId.id;
            // const res = await _submitSupporterApprover($supporterApprovalForm);

            // if (res?.response.status == 'success') {
            //     supporterApproverExist = true;
            // }
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
            // const res = await _submitSupporterApprover($approverApprovalForm);

            // if (res?.response.status == 'success') {
            //     supporterApproverExist = true;
            // }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Tuntutan Klinik">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perubatan/bil-tuntutan-klinik')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-3 pb-10 pt-3"
                >
                    <CustomTextField
                        label="Nama Klinik"
                        id="name"
                        disabled
                        bind:val={data.clinicDetail.name}
                    />
                    <CustomTextField
                        label="Emel Klinik"
                        id="email"
                        disabled
                        bind:val={data.clinicDetail.email}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        disabled
                        bind:val={data.clinicDetail.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id="postcode"
                        disabled
                        bind:val={data.clinicDetail.postcode}
                    />
                    <CustomTextField
                        label="Bandar"
                        id="city"
                        disabled
                        bind:val={data.clinicDetail.city}
                    />
                    <CustomTextField
                        label="Negeri"
                        id="state"
                        disabled
                        bind:val={data.clinicDetail.state}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="contactNumber"
                        disabled
                        bind:val={data.clinicDetail.contactNumber}
                    />
                    <ContentHeader
                        title="Maklumat Tuntutan"
                        borderClass="border-none"
                    />
                    <CustomTextField
                        label="Bulan"
                        id="months"
                        disabled
                        bind:val={data.calculationDetail.months}
                    />
                    <CustomTextField
                        label="Jumlah Tuntutan (RM)"
                        id="totalClaims"
                        disabled
                        bind:val={data.calculationDetail.totalClaims}
                    />
                    <CustomTextField
                        label="Bilangan Tuntutan"
                        id="numberOfClaims"
                        disabled
                        bind:val={data.calculationDetail.numberOfClaims}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Senarai Tuntutan">
                {#if data.claimList.length > 0}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicAppointmentForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody paddingClass="p-none">
                {#if data.claimList.length < 1}
                    <div class="flex w-full flex-col gap-10 p-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Klinik tidak mempunyai senarai tuntutan.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <CustomTab>
                        {#each data.claimList as claimList, i}
                            <CustomTabContent title="Tuntutan {i + 1}">
                                <div
                                    class="flex w-full flex-col justify-start gap-2.5 p-3"
                                >
                                    <CustomTextField
                                        label="Nama Kakitangan"
                                        id="employeeName{i}"
                                        disabled
                                        bind:val={claimList.employeeName}
                                    />
                                    <CustomTextField
                                        label="No Kad Pengenalan"
                                        id="ICNumber{i}"
                                        disabled
                                        bind:val={claimList.ICNumber}
                                    />
                                    <div class="flex w-full flex-col items-end">
                                        <TextIconButton
                                            label="Tindakan"
                                            type="neutral"
                                            icon="edit"
                                            onClick={() =>
                                                (tuntutanModal = true)}
                                        />
                                    </div>
                                </div>
                                <Accordion class="w-full px-3 pb-10 pt-3">
                                    {#each claimList.patients as patient, x}
                                        <AccordionItem>
                                            <span
                                                slot="header"
                                                class="text-sm text-ios-labelColors-link-light"
                                                >Pesakit {x + 1}</span
                                            >
                                            <CustomTextField
                                                label="Nama Pesakit"
                                                id="patientName{x}"
                                                disabled
                                                bind:val={patient.patientName}
                                            />
                                            <CustomTextField
                                                label="No Kad Pengenalan"
                                                id="ICNumber{x}"
                                                disabled
                                                bind:val={patient.ICNumber}
                                            />
                                            <CustomTextField
                                                label="Hubungan"
                                                id="relationship{x}"
                                                disabled
                                                bind:val={patient.relationship}
                                            />
                                            <CustomTextField
                                                label="Jumlah (RM)"
                                                id="total{x}"
                                                type="number"
                                                disabled
                                                bind:val={patient.total}
                                            />
                                            {#if patient.treatments.length < 1}
                                                <span
                                                    class="text-sm text-ios-labelColors-link-light"
                                                    >Tiada rekod rawatan.</span
                                                >
                                            {:else}
                                                <p
                                                    class="text-sm font-semibold text-ios-labelColors-link-light"
                                                >
                                                    Butiran:
                                                </p>
                                                {#each patient.treatments as treatment, y}
                                                    <span class="text-sm"
                                                        >{y + 1}. {treatment.name}</span
                                                    ><br />
                                                {/each}
                                            {/if}
                                        </AccordionItem>
                                    {/each}
                                </Accordion>
                            </CustomTabContent>
                        {/each}
                    </CustomTab>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Tuntutan Klinik Panel">
                {#if !secretaryResult && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicVerificationForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <ContentHeader
                    title="Ulasan Penyemakkan Daripada Urus Setia"
                    borderClass="border-none"
                />
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="clinicVerificationForm"
                    method="POST"
                >
                    <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        disabled={secretaryResult}
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id=""
                        disabled={secretaryResult}
                        options={certifyOptions}
                        val={true}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus">
                {#if !supporterApproverExist && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="supporterApproverForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="supporterApproverForm"
                    method="POST"
                    use:supporterApproverEnhance
                >
                    <CustomSelectField
                        label="Nama Penyokong"
                        id="supporterId"
                        disabled={supporterApproverExist}
                        options={data.lookup.supporterApproverIdLookup}
                        bind:val={$supporterApproverForm.supporterId}
                        errors={$supporterApproverError.supporterId}
                    />
                    <CustomSelectField
                        label="Nama Pelulus"
                        id="approverId"
                        disabled={supporterApproverExist}
                        options={data.lookup.supporterApproverIdLookup}
                        bind:val={$supporterApproverForm.approverId}
                        errors={$supporterApproverError.approverId}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong">
                {#if !supporterResult}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Selesai"
                        form="supporterApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="supporterApprovalForm"
                    method="POST"
                    use:supporterApprovalEnhance
                >
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
                        errors={$supporterApprovalError.status}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pelulus">
                {#if !approverResult}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="approverApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="approverApprovalForm"
                    method="POST"
                    use:approverApprovalEnhance
                >
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
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
<Toaster />

<Modal title="Tuntutan" bind:open={tuntutanModal}>
    <div class="flex w-full flex-row items-start justify-evenly">
        <ContentHeader title="Klinik" borderClass="border-none" />
        <CustomTextField
            label="Tindakan/Ulasan"
            placeholder="Simpan ke klinik semula untuk membuat pembetulan"
            id=""
            disabled={false}
            val=""
            errors={[]}
        />
    </div>
    <div class="flex w-full flex-row items-start justify-evenly">
        <ContentHeader title="Kakitangan" borderClass="border-none" />
        <CustomTextField
            label="Tindakan/Ulasan"
            placeholder="Simpan ke kakitangan untuk membuat pembayaran rawatan yang tidak ditanggung oleh LKIM"
            id=""
            disabled={false}
            val=""
            errors={[]}
        />
    </div>
    <CustomTextField
        label="Jumlah Perlu Ditanggung Oleh Kakitangan (RM)"
        id=""
        type="number"
        disabled={false}
        val=""
        errors={[]}
    />
    <div class="flex w-full flex-col justify-start gap-0 border-t">
        <ContentHeader
            title="Maklumat Rawatan/Ubat"
            borderClass="border-none"
        />
        <!-- {#each data.dataList as treatment, i}
            <span class="text-sm text-ios-labelColors-secondaryLabel-light"
                >{treatment.rawatan[i]}</span
            >
        {/each} -->
    </div>
    <CustomTextField
        label="Jumlah Tanggungan Oleh LKIM (RM)"
        id=""
        disabled={false}
        val=""
        errors={[]}
    />
    <div class="flex w-full flex-col items-end">
        <TextIconButton
            label="SAH"
            type="primary"
            icon="check"
            onClick={() => {}}
        />
    </div>
</Modal>
