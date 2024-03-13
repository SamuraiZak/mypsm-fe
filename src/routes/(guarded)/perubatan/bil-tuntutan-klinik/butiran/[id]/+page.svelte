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

    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Tuntutan Klinik">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto("/perubatan/bil-tuntutan-klinik")}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Simpan"
                    form="clinicDetailForm"
                />
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    class="flex w-full flex-col justify-start gap-2.5 px-2 pb-10"
                    id="clinicDetailForm"
                    method="POST"
                >
                <ContentHeader title="Maklumat Klinik" borderClass="border-none"/>
                    <CustomTextField
                        label="Nama Klinik"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Emel Klinik"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Alamat"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Poskod"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Bandar"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Negeri"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="No. Telefon"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <ContentHeader title="Maklumat Tuntutan" borderClass="border-none"/>
                    <CustomTextField
                        label="Bulan"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Jumlah Tuntutan (RM)"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Bilangan Tuntutan"
                        id=""
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Senarai Tuntutan">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Simpan"
                    form="clinicAppointmentForm"
                />
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
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                    <CustomTextField
                        label="Tarikh  Tamat Lantikan"
                        id=""
                        type="date"
                        disabled={false}
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Simpan"
                    form="document"
                />
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
            <StepperContentHeader title="Pengesahan Permohonan Klinik Panel">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Simpan"
                    form="clinicVerificationForm"
                />
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
                        disabled={false}
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
            <StepperContentHeader title="Penyokong dan Pelulus">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Simpan"
                    form="supporterApproverForm"
                />
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
                        disabled={false}
                        options={data.lookup.verifyOption}
                        val=""
                        errors={[]}
                    />
                    <CustomSelectField
                        label="Nama Pelulus"
                        id=""
                        disabled={false}
                        options={data.lookup.verifyOption}
                        val=""
                        errors={[]}
                    />
                </form>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Surat Pelantikan Klinik Panel">
                <TextIconButton
                    icon="check"
                    type="primary"
                    label="Selesai"
                    form=""
                />
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
