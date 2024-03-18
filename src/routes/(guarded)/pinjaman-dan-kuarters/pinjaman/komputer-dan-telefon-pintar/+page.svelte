<script lang="ts">
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Butiran Rekod Permohonan Pinjaman Komputer dan Telefon Pintar"
        ><TextIconButton
            type="close"
            onClick={() => {
                window.history.back();
            }}
        ></TextIconButton>
    </ContentHeader>
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi Kakitangan">
            <TextIconButton></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <ContentHeader title="Butiran Peminjam"></ContentHeader>
            <CustomTextField id="" disabled label={'Nama Penuh'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'No. K/P'} val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                type="date"
                disabled
                label={'Tarikh Lahir'}
                val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Umur Pada Tarikh Memohon'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jawatan Sekarang'} val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Kumpulan Perkhidmatan'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Gred Jawatan'} val=""
            ></CustomTextField>
            <CustomTextField disabled id="" label={'Kementerian'} val=""
            ></CustomTextField>
            <CustomTextField disabled id="" label={'Jabatan'} val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Alamat Penuh Tempat Bertugas'}
                val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                type="date"
                disabled
                label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Tarikh Persaraan Wajib'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Gaji Pokok'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jumlah Elaun-elaun'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jumlah Potongan'} val=""
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pinjaman">
            <TextIconButton type="back"></TextIconButton>

            <TextIconButton></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <CustomTextField
                id=""
                disabled
                label={'Jumlah yang Dipohon (RM)'}
                val=""
            ></CustomTextField>
            <CustomSelectField id="" disabled label={'Tempoh Pembayaran'} val=""
            ></CustomSelectField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Dokumen Berkaitan">
            <TextIconButton type="back"></TextIconButton>

            <TextIconButton></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Dokumen Sokongan">
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                </ContentHeader>
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>

                <!-- <DownloadAttachment fileName="Dokumen_Sokongan_1.pdf"
                ></DownloadAttachment>
                <DownloadAttachment fileName="Dokumen_Sokongan_2.pdf"
                ></DownloadAttachment> -->
            </div>
            <ContentHeader title="Pengesahan"></ContentHeader>
            <div
                class="flex h-fit w-full flex-col items-start justify-start gap-2.5"
            >
                <!-- <Checkbox checked={infoTrue} disabled
                    ><p>
                        Saya dengan ini mengesahkan bahawa maklumat sebagaimana
                        yang dinyatakan berikut adalah benar
                    </p></Checkbox
                > -->
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Status Sokongan"
            ><TextIconButton type="back"></TextIconButton><TextIconButton
            ></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <ContentHeader title="Semakan Status Sokongan"></ContentHeader>
            <CustomTextField id="" disabled label={'Status Sokongan'} val=""
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Surat Tawaran"
            ><TextIconButton type="back"></TextIconButton><TextIconButton
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <ContentHeader title="Surat Tawaran"></ContentHeader>
            <div class="flex w-full flex-col items-start justify-start gap-2.5">
                <p class="text-sm text-txt-secondary">
                    Sila muat turun dan pastikan dokumen diisi dengan lengkap
                    dan ditandatangani sebelum dihantar kepada Urus Setia
                </p>
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Tawaran Opsyen</a
                >
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Perjanjian Pinjaman Komputer dan Telefon Pintar</a
                >
                <p class="text-sm italic text-system-danger">
                    *Kegagalan melengkapkan dokumen akan menyebabkan permohonan
                    tidak akan diproses.
                </p>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Surat Perjanjian">
            <TextIconButton type="back"></TextIconButton>
            <TextIconButton></TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Surat Perjanjian">
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                </ContentHeader>
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>

                <!-- <DownloadAttachment fileName="SURAT PERJANJIAN.pdf"
                ></DownloadAttachment> -->
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Keputusan Permohonan">
            <TextIconButton type="back"></TextIconButton><TextIconButton
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><CustomTextField
                id=""
                disabled
                label={'Keputusan Permohonan'}
                val=""
            ></CustomTextField></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Resit Pembelian"
            ><TextIconButton type="back"></TextIconButton><TextIconButton
                type="done"
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <!-- Document Upload -->
            <div
                class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5"
            >
                <ContentHeader title="Resit Pembelian">
                    <!-- <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div> -->
                </ContentHeader>
                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>

                <!-- <DownloadAttachment fileName="RESIT PEMBELIAN.pdf"
                ></DownloadAttachment> -->
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
