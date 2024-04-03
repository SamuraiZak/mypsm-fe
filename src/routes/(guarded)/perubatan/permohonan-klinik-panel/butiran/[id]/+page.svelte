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
    import { _addClinicApplicationSchema, _clinicCommonResultSchema, _clinicSupporterApproverSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import {
        _submitClinicApplicationForm,
        _submitClinicContractForm,
        _submitSecretaryApprovalForm,
        _submitSupporterApproverForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import { approveOptions, certifyOptions, supportOptions } from '$lib/constants/core/radio-option-constants';

    export let data: PageData;

    let notEditingclinicApplicationForm: boolean = false;
    let notEditingClinicContractForm: boolean = false;
    let notEditingVerificationForm: boolean = false;
    let notEditingSuppAppForm: boolean = false;
    let newClinicApplicationId: number;

    const {
        form: clinicApplicationForm,
        errors: clinicApplicationError,
        enhance: clinicApplicationEnhance,
    } = superForm(data.clinicApplicationForm, {
        SPA: true,
        taintedMessage: false,
        id: 'clinicDetailForm',
        validators: zod(_addClinicApplicationSchema),
        resetForm: false,
        async onSubmit() {
            const editMode = await _submitClinicApplicationForm(
                $clinicApplicationForm,
            );

            if (editMode?.response.status == 'success') {
                notEditingclinicApplicationForm = true;
                newClinicApplicationId = editMode.response.data?.details.clinicId;
            }
        },
    });
    const {
        form: clinicContractForm,
        errors: clinicContractError,
        enhance: clinicContractEnhance,
    } = superForm(data.clinicContractForm, {
        SPA: true,
        taintedMessage: false,
        id: 'clinicContractForm',
        validators: zod(_addClinicApplicationSchema),
        resetForm: false,
        async onSubmit() {
            $clinicContractForm.id = newClinicApplicationId;
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
            $clinicVerificationForm.id = newClinicApplicationId;
            const editMode =
                await _submitSecretaryApprovalForm($clinicVerificationForm);

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
            $supporterApproverForm.id = newClinicApplicationId;
            const editMode =
                await _submitSupporterApproverForm($supporterApproverForm);

            if (editMode?.response.status == 'success') {
                notEditingSuppAppForm = true;
            }
        },
    });
    $: {
        if(data.clinicContractForm.data.panelAppointedDate !== ""){
            notEditingClinicContractForm = true;
        }

        if(data.supporterApproverForm.data.approverName !== ""){
            notEditingSuppAppForm = true;
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
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
            <StepperContentHeader title="Maklumat Klinik">
                {#if !data.isViewOnly && !notEditingclinicApplicationForm}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicDetailForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="clinicDetailForm"
                    method="POST"
                    use:clinicApplicationEnhance
                >
                    <CustomTextField
                        label="Nama Klinik"
                        id="name"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.name}
                        errors={$clinicApplicationError.name}
                    />
                    <CustomTextField
                        label="Emel Klinik"
                        id="email"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.email}
                        errors={$clinicApplicationError.email}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.address}
                        errors={$clinicApplicationError.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id="postcode"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.postcode}
                        errors={$clinicApplicationError.postcode}
                    />
                    <CustomSelectField
                        label="Bandar"
                        id="cityId"
                        disabled={notEditingclinicApplicationForm}
                        options={data.lookup.cityLookup}
                        bind:val={$clinicApplicationForm.cityId}
                        errors={$clinicApplicationError.cityId}
                    />
                    <CustomSelectField
                        label="Negeri"
                        id="districtId"
                        disabled={notEditingclinicApplicationForm}
                        options={data.lookup.stateLookup}
                        bind:val={$clinicApplicationForm.districtId}
                        errors={$clinicApplicationError.districtId}
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Klinik Panel"
                        id="panelAppointedDate"
                        type="date"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.panelAppointedDate}
                        errors={$clinicApplicationError.panelAppointedDate}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Kontrak Klinik Panel"
                        id="panelContractEndDate"
                        type="date"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.panelContractEndDate}
                        errors={$clinicApplicationError.panelContractEndDate}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="contactNumber"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.contactNumber}
                        errors={$clinicApplicationError.contactNumber}
                    />
                    <CustomTextField
                        label="Nama Bank"
                        id="bankName"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.bankName}
                        errors={$clinicApplicationError.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        id="bankAccount"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.bankAccount}
                        errors={$clinicApplicationError.bankAccount}
                    />
                    <CustomTextField
                        label="Tarikh Pendaftaran Klinik"
                        id="foundationDate"
                        type="date"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.foundationDate}
                        errors={$clinicApplicationError.foundationDate}
                    />
                    <CustomTextField
                        label="Jenis Klinik"
                        id="clinicType"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.clinicType}
                        errors={$clinicApplicationError.clinicType}
                    />
                    <CustomTextField
                        label="Status Pemilikan"
                        id="ownershipStatus"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.ownershipStatus}
                        errors={$clinicApplicationError.ownershipStatus}
                    />
                    <CustomTextField
                        label="Doktor Berdaftar"
                        id="registeredMedicalPractitioner"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.registeredMedicalPractitioner}
                        errors={$clinicApplicationError.registeredMedicalPractitioner}
                    />
                    <CustomTextField
                        label="Bilangan Cawangan"
                        id="branchCount"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.branchCount}
                        errors={$clinicApplicationError.branchCount}
                    />
                    <CustomTextField
                        label="Jarak Klinik Dari Pejabat"
                        id="clinicOfficeDistance"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.clinicOfficeDistance}
                        errors={$clinicApplicationError.clinicOfficeDistance}
                    />
                    <CustomTextField
                        label="Jarak Klinik Terdekat Dari Pejabat"
                        id="nearestClinicDistance"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.nearestClinicDistance}
                        errors={$clinicApplicationError.nearestClinicDistance}
                    />
                    <CustomTextField
                        label="Jam Operasi"
                        id="operationHours"
                        disabled={notEditingclinicApplicationForm}
                        bind:val={$clinicApplicationForm.operationHours}
                        errors={$clinicApplicationError.operationHours}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lantikan">
                {#if !data.isViewOnly && !notEditingClinicContractForm}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicContractForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
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
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan"
                >{#if !data.isViewOnly}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="document"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="document"
                    method="POST"
                >
                    <span
                        class="text-sm text-ios-labelColors-secondaryLabel-light"
                        >Dokumen-dokumen yang telah dimuat naik:</span
                    >
                    <DownloadAttachment
                        fileName="Salinan maklumat klinik.pdf"
                    />
                    <DownloadAttachment fileName="Salinan maklumat bank.pdf" />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan Permohonan Klinik Panel"
                >
                <!-- {#if !data.isViewOnly} -->
                {#if !notEditingVerificationForm}
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
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus"
                >
                {#if !data.isViewOnly && !notEditingSuppAppForm}
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
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Penyokong"
                >{#if !data.isViewOnly}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="supporterApprovalForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="supporterApprovalForm"
                    method="POST"
                >
                <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        disabled={data.isViewOnly}
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id=""
                        disabled={data.isViewOnly}
                        options={supportOptions}
                        val={1}
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Keputusan Pelulus"
                >{#if !data.isViewOnly}
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
                >
                <CustomTextField
                        label="Tindakan/Ulasan"
                        id=""
                        disabled={data.isViewOnly}
                        val=""
                        errors={[]}
                    />
                    <CustomRadioBoolean
                        label="Keputusan"
                        id=""
                        disabled={data.isViewOnly}
                        options={approveOptions}
                        val={1}
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

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
    </Stepper>
</section>
<Toaster />
