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
    import { _addClinicApplicationSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _submitClinicApplicationForm } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';

    export let data: PageData;

    let notEditing: boolean = false;

    const { form:clinicApplicationForm, errors:clinicApplicationError, enhance:clinicApplicationEnhance } = superForm(data.clinicApplicationForm, {
        SPA: true,
        taintedMessage: false,
        id: "clinicDetailForm",
        validators: zod(_addClinicApplicationSchema),
        resetForm: false,
        async onSubmit() {
          const editMode = await _submitClinicApplicationForm($clinicApplicationForm)

          if(editMode?.response.status == "success"){
            notEditing = true;
          }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto("/perubatan/permohonan-klinik-panel")}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik">
                {#if !data.isViewOnly}
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
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.name}
                        errors={$clinicApplicationError.name}
                    />
                    <CustomTextField
                        label="Emel Klinik"
                        id="email"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.email}
                        errors={$clinicApplicationError.email}
                    />
                    <CustomTextField
                        label="Alamat"
                        id="address"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.address}
                        errors={$clinicApplicationError.address}
                    />
                    <CustomTextField
                        label="Poskod"
                        id=""
                        disabled={notEditing}
                        val="missing"
                    />
                    <CustomTextField
                        label="Bandar"
                        id=""
                        disabled={notEditing}
                        val="missing"
                    />
                    <CustomTextField
                        label="Negeri"
                        id="district"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.district}
                        errors={$clinicApplicationError.district}
                    />
                    <CustomTextField
                        label="Tarikh Lantikan Klinik Panel"
                        id="panelAppointedDate"
                        type="date"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.panelAppointedDate}
                        errors={$clinicApplicationError.panelAppointedDate}
                    />
                    <CustomTextField
                        label="Tarikh Tamat Kontrak Klinik Panel"
                        id="panelContractEndDate"
                        type="date"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.panelContractEndDate}
                        errors={$clinicApplicationError.panelContractEndDate}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id="contactNumber"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.contactNumber}
                        errors={$clinicApplicationError.contactNumber}
                    />
                    <CustomTextField
                        label="Nama Bank"
                        id="bankName"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.bankName}
                        errors={$clinicApplicationError.bankName}
                    />
                    <CustomTextField
                        label="No. Akaun Bank"
                        id="bankAccount"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.bankAccount}
                        errors={$clinicApplicationError.bankAccount}
                    />
                    <CustomTextField
                        label="Tarikh Pendaftaran Klinik"
                        id="foundationDate"
                        type="date"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.foundationDate}
                        errors={$clinicApplicationError.foundationDate}
                    />
                    <CustomTextField
                        label="Jenis Klinik"
                        id="clinicType"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.clinicType}
                        errors={$clinicApplicationError.clinicType}
                    />
                    <CustomTextField
                        label="Status Pemilikan"
                        id="ownershipStatus"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.ownershipStatus}
                        errors={$clinicApplicationError.ownershipStatus}
                    />
                    <CustomTextField
                        label="Doktor Berdaftar"
                        id="registeredMedicalPractitioner"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.registeredMedicalPractitioner}
                        errors={$clinicApplicationError.registeredMedicalPractitioner}
                    />
                    <CustomTextField
                        label="Bilangan Cawangan"
                        id="branchCount"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.branchCount}
                        errors={$clinicApplicationError.branchCount}
                    />
                    <CustomTextField
                        label="Jarak Klinik Dari Pejabat"
                        id="clinicOfficeDistance"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.clinicOfficeDistance}
                        errors={$clinicApplicationError.clinicOfficeDistance}
                    />
                    <CustomTextField
                        label="Jarak Klinik Terdekat Dari Pejabat"
                        id="nearestClinicDistance"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.nearestClinicDistance}
                        errors={$clinicApplicationError.nearestClinicDistance}
                    />
                    <CustomTextField
                        label="Jam Operasi"
                        id="operationHours"
                        disabled={notEditing}
                        bind:val={$clinicApplicationForm.operationHours}
                        errors={$clinicApplicationError.operationHours}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Lantikan">
                {#if !data.isViewOnly}
                    <TextIconButton
                        icon="check"
                        type="primary"
                        label="Simpan"
                        form="clinicAppointmentForm"
                    />
                {/if}
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="clinicAppointmentForm"
                    method="POST"
                >
                    <CustomTextField
                        label="Tarikh Mula Lantikan"
                        id=""
                        type="date"
                        disabled={data.isViewOnly}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh  Tamat Lantikan"
                        id=""
                        type="date"
                        disabled={data.isViewOnly}
                        val=""
                        errors={[]}
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
                >{#if !data.isViewOnly}
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
                        options={data.lookup.verifyOption}
                        val={true}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Penyokong dan Pelulus"
                >{#if !data.isViewOnly}
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
                >
                    <CustomSelectField
                        label="Nama Penyokong"
                        id=""
                        disabled={data.isViewOnly}
                        options={data.lookup.verifyOption}
                        val=""
                        errors={[]}
                    />
                    <CustomSelectField
                        label="Nama Pelulus"
                        id=""
                        disabled={data.isViewOnly}
                        options={data.lookup.verifyOption}
                        val=""
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
