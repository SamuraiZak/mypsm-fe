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
    import {
        _addClinicApplicationSchema,
        _addClinicContractSchema,
        _clinicCommonResultSchema,
        _clinicSupporterApproverSchema,
    } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _fileToBase64Object,
        _submitApproverApprovalForm,
        _submitClinicContractForm,
        _submitSecretaryApprovalForm,
        _submitSupporterApprovalForm,
        _submitSupporterApproverForm,
        _uploadClinicApplicationForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        approveOptions,
        certifyOptions,
        supportOptions,
    } from '$lib/constants/core/radio-option-constants';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import Alert from 'flowbite-svelte/Alert.svelte';
    import CustomFileField from '$lib/components/inputs/file-field/CustomFileField.svelte';
    import type { QuartersUploadDocuments } from '$lib/dto/mypsm/pinjaman/kuarters/quarters-upload-document.dto';

    export let data: PageData;

    let notEditingClinicContractForm: boolean = false;
    let notEditingVerificationForm: boolean = false;
    let notEditingSuppAppForm: boolean = false;
    let notEditingSupporterForm: boolean = false;
    let notEditingApproverForm: boolean = false;
    let successUpload: boolean = false;
    let files: FileList;

    const {
        form: clinicContractForm,
        errors: clinicContractError,
        enhance: clinicContractEnhance,
    } = superForm(data.clinicContractForm, {
        SPA: true,
        taintedMessage: false,
        id: 'clinicContractForm',
        validators: zod(_addClinicContractSchema),
        resetForm: false,
        async onSubmit() {
            $clinicContractForm.id = data.clinicId.id;
            const editMode =
                await _submitClinicContractForm($clinicContractForm);

            if (editMode?.response.status == 'success') {
                notEditingClinicContractForm = true;
            }
        },
    });
    const {
        form: clinicVerificationForm,
        errors: clinicVerificationError,
        enhance: clinicVerificationEnhance,
    } = superForm(data.secretaryApprovalForm, {
        SPA: true,
        taintedMessage: false,
        id: 'clinicVerificationForm',
        validators: zod(_clinicCommonResultSchema),
        resetForm: false,
        async onSubmit() {
            $clinicVerificationForm.id = data.clinicId.id;
            const editMode = await _submitSecretaryApprovalForm(
                $clinicVerificationForm,
            );

            if (editMode?.response.status == 'success') {
                notEditingVerificationForm = true;
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
        validators: zod(_clinicSupporterApproverSchema),
        resetForm: false,
        async onSubmit() {
            $supporterApproverForm.id = data.clinicId.id;
            const editMode = await _submitSupporterApproverForm(
                $supporterApproverForm,
            );

            if (editMode?.response.status == 'success') {
                notEditingSuppAppForm = true;
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
                notEditingSupporterForm = true;
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
                notEditingApproverForm = true;
            }
        },
    });

    function uploadDocument() {
        if (files == undefined) {
            alert('Dokumen sokongan tidak boleh kosong.');
        } else {
            _fileToBase64Object(files)
                .then(async (result) => {
                    let quartersDocument: QuartersUploadDocuments = {
                        id: data.clinicId.id,
                        documents: result,
                    };
                    const res = await _uploadClinicApplicationForm(
                        JSON.stringify(quartersDocument),
                    );

                    if (res.response.status == 'success') {
                        successUpload = true;
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        }
    }

        if(data.applicationDoc?.document?.length > 0){
            successUpload = true;
        }
    $: {
        if (data.clinicContractForm.data.panelAppointedDate !== '') {
            notEditingClinicContractForm = true;
        }
        if (data.secretaryApprovalForm.data.remark !== '') {
            notEditingVerificationForm = true;
        }
        if (data.supporterApproverForm.data.approverName !== '') {
            notEditingSuppAppForm = true;
        }
        if (data.supporterApprovalForm.data.remark !== '') {
            notEditingSupporterForm = true;
        }
        if (data.approverApprovalForm.data.remark !== '') {
            notEditingApproverForm = true;
        }
    }
    console.log(data.applicationDoc.document)
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Klinik">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('/perubatan/permohonan-klinik-panel')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik" />
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
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
                    <CustomSelectField
                        label="Bandar"
                        id="cityId"
                        disabled
                        options={data.lookup.cityLookup}
                        bind:val={data.clinicDetail.cityId}
                    />
                    <CustomSelectField
                        label="Daerah"
                        id="districtId"
                        disabled
                        options={data.lookup.districtLookup}
                        bind:val={data.clinicDetail.districtId}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="contactNumber"
                        disabled
                        bind:val={data.clinicDetail.contactNumber}
                    />
                    <CustomTextField
                        label="Nama Bank"
                        id="bankName"
                        disabled
                        bind:val={data.clinicDetail.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        id="bankAccount"
                        disabled
                        bind:val={data.clinicDetail.bankAccount}
                    />
                    <CustomTextField
                        label="Tarikh Pendaftaran Klinik"
                        id="foundationDate"
                        type="date"
                        disabled
                        bind:val={data.clinicDetail.foundationDate}
                    />
                    <CustomTextField
                        label="Jenis Klinik"
                        id="clinicType"
                        disabled
                        bind:val={data.clinicDetail.clinicType}
                    />
                    <CustomTextField
                        label="Status Pemilikan"
                        id="ownershipStatus"
                        disabled
                        bind:val={data.clinicDetail.ownershipStatus}
                    />
                    <CustomTextField
                        label="Doktor Berdaftar"
                        id="registeredMedicalPractitioner"
                        disabled
                        bind:val={data.clinicDetail
                            .registeredMedicalPractitioner}
                    />
                    <CustomTextField
                        label="Bilangan Cawangan"
                        id="branchCount"
                        disabled
                        bind:val={data.clinicDetail.branchCount}
                    />
                    <CustomTextField
                        label="Jarak Klinik Dari Pejabat (KM)"
                        id="clinicOfficeDistance"
                        disabled
                        bind:val={data.clinicDetail.clinicOfficeDistance}
                    />
                    <CustomTextField
                        label="Jarak Klinik Terdekat Dari Pejabat (KM)"
                        id="nearestClinicDistance"
                        disabled
                        bind:val={data.clinicDetail.nearestClinicDistance}
                    />
                    <CustomTextField
                        label="Jam Operasi"
                        id="operationHours"
                        disabled
                        bind:val={data.clinicDetail.operationHours}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                {#if !successUpload && (data.currentRoleCode == UserRoleConstant.unitBahagian.code || data.currentRoleCode == UserRoleConstant.unitNegeri.code)}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        onClick={() => uploadDocument()}
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                >
                    {#if (data.applicationDoc?.document?.length < 1 || data.applicationDoc?.document == null)  && (data.currentRoleCode == UserRoleConstant.unitBahagian.code || data.currentRoleCode == UserRoleConstant.unitNegeri.code)}
                        <div
                            class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                        >
                            <span>Dokumen-dokumen yang perlu dimuat naik:</span>
                            <span>1. Salinan Maklumat Klinik.pdf</span>
                            <span>2. Salinan Maklumat Bank Klinik.pdf</span>
                        </div>
                        <div class="flex w-full flex-col gap-2 px-3">
                            <CustomFileField
                                label="Dokumen Sokongan"
                                id="employeeClaimDocument"
                                bind:files
                            ></CustomFileField>
                        </div>
                    {:else}
                        <div
                            class="flex h-fit w-full flex-col justify-start gap-2 px-3 pb-5 text-sm text-ios-labelColors-secondaryLabel-light"
                        >
                            <span
                                >Dokumen-dokumen sokongan yang telah dimuat naik
                                :</span
                            >
                            {#if data.applicationDoc?.document?.length > 0}
                                {#each data.applicationDoc?.document as documents}
                                    <a
                                        href={documents.document}
                                        download={documents.name}
                                        class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                                        >{documents.name}</a
                                    >
                                {/each}
                            {/if}
                        </div>
                    {/if}
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lantikan">
                {#if !notEditingClinicContractForm && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicContractForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if $clinicContractForm.panelAppointedDate == '' && data.currentRoleCode !== UserRoleConstant.urusSetiaPerubatan.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu maklumat lantikan daripada Urus Setia Perubatan.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                        id="clinicContractForm"
                        method="POST"
                        use:clinicContractEnhance
                    >
                        <CustomTextField
                            label="Tarikh Mula Lantikan"
                            id=""
                            type="date"
                            disabled={notEditingClinicContractForm}
                            bind:val={$clinicContractForm.panelAppointedDate}
                            errors={$clinicContractError.panelAppointedDate}
                        />
                        <CustomTextField
                            label="Tarikh  Tamat Lantikan"
                            id=""
                            type="date"
                            disabled={notEditingClinicContractForm}
                            bind:val={$clinicContractForm.panelContractEndDate}
                            errors={$clinicContractError.panelContractEndDate}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Permohonan Klinik Panel">
                {#if !notEditingVerificationForm && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicVerificationForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if $clinicVerificationForm.remark == '' && data.currentRoleCode !== UserRoleConstant.urusSetiaPerubatan.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Pengesahan daripada Urus Setia Perubatan.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <ContentHeader
                        title="Ulasan Penyemakan Daripada Urus Setia"
                        borderClass="border-none"
                    />
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                        id="clinicVerificationForm"
                        method="POST"
                        use:clinicVerificationEnhance
                    >
                        <CustomTextField
                            label="Tindakan/Ulasan"
                            id="remark"
                            disabled={notEditingVerificationForm}
                            bind:val={$clinicVerificationForm.remark}
                            errors={$clinicVerificationError.remark}
                        />
                        <CustomRadioBoolean
                            label="Keputusan"
                            id="status"
                            disabled={notEditingVerificationForm}
                            options={certifyOptions}
                            bind:val={$clinicVerificationForm.status}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus">
                {#if !notEditingSuppAppForm && data.currentRoleCode == UserRoleConstant.urusSetiaPerubatan.code}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="supporterApproverForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                {#if $supporterApproverForm.supporterName == '' && data.currentRoleCode !== UserRoleConstant.urusSetiaPerubatan.code}
                    <div class="flex w-full flex-col gap-10 px-3">
                        <Alert color="blue">
                            <p>
                                <span class="font-medium">Tiada Maklumat!</span>
                                Menunggu Pemilihan daripada Urus Setia Perubatan.
                            </p>
                        </Alert>
                    </div>
                {:else}
                    <form
                        class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                        id="supporterApproverForm"
                        method="POST"
                        use:supporterApproverEnhance
                    >
                        <CustomSelectField
                            label="Nama Penyokong"
                            id="supporterName"
                            disabled={notEditingSuppAppForm}
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$supporterApproverForm.supporterName}
                            errors={$supporterApproverError.supporterName}
                        />
                        <CustomSelectField
                            label="Nama Pelulus"
                            id="approverName"
                            disabled={notEditingSuppAppForm}
                            options={data.lookup.supporterApproverLookup}
                            bind:val={$supporterApproverForm.approverName}
                            errors={$supporterApproverError.approverName}
                        />
                    </form>
                {/if}
            </StepperContentBody>
        </StepperContent>

        {#if data.clinicSecretaryApproval.remark !== null}
            <StepperContent>
                <StepperContentHeader title="Keputusan Penyokong">
                    {#if !notEditingSupporterForm && data.currentRoleCode == UserRoleConstant.penyokong.code}
                        <TextIconButton
                            icon="check"
                            type="primary"
                            label="Simpan"
                            form="supporterApprovalForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.clinicSupporterApproval.remark == null && data.currentRoleCode !== UserRoleConstant.penyokong.code}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu keputusan daripada penyokong.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="supporterApprovalForm"
                            method="POST"
                            use:supporterApprovalEnhance
                        >
                            <div class="w-full">
                                <span
                                    class="text-base font-semibold text-ios-labelColors-link-light"
                                    >Penyokong</span
                                >
                            </div>
                            {#if notEditingSupporterForm}
                                <CustomTextField
                                    label="Nama"
                                    id="supporterName"
                                    disabled
                                    bind:val={data.clinicSupporterApproval
                                        .supporterName}
                                />
                            {/if}
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                disabled={notEditingSupporterForm}
                                bind:val={$supporterApprovalForm.remark}
                                errors={$supporterApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                disabled={notEditingSupporterForm}
                                options={supportOptions}
                                bind:val={$supporterApprovalForm.status}
                                errors={$supporterApprovalError.status}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <StepperContent>
                <StepperContentHeader title="Keputusan Pelulus"
                    >{#if !notEditingApproverForm && data.currentRoleCode == UserRoleConstant.pelulus.code}
                        <TextIconButton
                            icon="check"
                            type="primary"
                            label="Simpan"
                            form="approverApprovalForm"
                        />
                    {/if}
                </StepperContentHeader>
                <StepperContentBody>
                    {#if data.clinicApproverApproval.remark == null && data.currentRoleCode !== UserRoleConstant.pelulus.code}
                        <div class="flex w-full flex-col gap-10 px-3">
                            <Alert color="blue">
                                <p>
                                    <span class="font-medium"
                                        >Tiada Maklumat!</span
                                    >
                                    Menunggu keputusan daripada pelulus.
                                </p>
                            </Alert>
                        </div>
                    {:else}
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="approverApprovalForm"
                            method="POST"
                            use:approverApprovalEnhance
                        >
                            <div class="w-full">
                                <span
                                    class="text-base font-semibold text-ios-labelColors-link-light"
                                    >Pelulus</span
                                >
                            </div>
                            {#if notEditingApproverForm}
                                <CustomTextField
                                    label="Nama"
                                    id="approverName"
                                    disabled
                                    bind:val={data.clinicApproverApproval
                                        .approverName}
                                />
                            {/if}
                            <CustomTextField
                                label="Tindakan/Ulasan"
                                id="remark"
                                disabled={notEditingApproverForm}
                                bind:val={$approverApprovalForm.remark}
                                errors={$approverApprovalError.remark}
                            />
                            <CustomRadioBoolean
                                label="Keputusan"
                                id="status"
                                disabled={notEditingApproverForm}
                                options={approveOptions}
                                bind:val={$approverApprovalForm.status}
                                errors={$approverApprovalError.status}
                            />
                        </form>
                    {/if}
                </StepperContentBody>
            </StepperContent>

            <!-- {#if data.clinicApproverApproval.status}
                <StepperContent>
                    <StepperContentHeader title="Surat Pelantikan Klinik Panel"
                        >{#if !data.isViewOnly}
                            <TextIconButton
                                icon="check"
                                type="primary"
                                label="Selesai"
                                form=""
                            />
                        {/if}
                    </StepperContentHeader>
                    <StepperContentBody>
                        <ContentHeader
                            title="Cetak Surat Pelantikan Klinik Panel"
                            borderClass="border-none"
                        />
                        <form
                            class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                            id="clinicDetailForm"
                            method="POST"
                        >
                            <DownloadAttachment
                                fileName="Surat Pelantikan Klinik Panel.pdf"
                            />
                        </form>
                    </StepperContentBody>
                </StepperContent>
            {/if} -->
        {/if}
    </Stepper>
</section>
<Toaster />
