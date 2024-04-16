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
    import { superForm } from 'sveltekit-superforms';
    import { zod } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import { _personalDetail } from '$lib/schemas/mypsm/loan/loan-application';

    export let data: PageData;


    // const {
    //     form: personalInfoForm,
    //     errors: personalInfoError,
    //     enhance: personalInfoEnhance,
    //     isTainted: personalDetailTainted,
    // } = superForm(data.personalDetail, {
    //     SPA: true,
    //     id: 'personalDetail',
    //     dataType: 'json',
    //     multipleSubmits: 'allow',
    //     validationMethod: 'oninput',
    //     validators: zod(_personalDetail),

    // });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Butiran Rekod Permohonan Pinjaman Pembiayaan Kenderaan"
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
            <CustomTextField id="name" disabled label={'Nama Penuh'} val=""
            ></CustomTextField>
            <CustomTextField disabled id="" label={'No. K/P'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Tarikh Lahir'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Umur'} val=""
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
            <CustomTextField id="" disabled label={'Skim'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Tarikh Perkhidmatan'} val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Tarikh Pengesahan Dalam Perkhidmatan'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Gaji Pokok'} val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jumlah Elaun-elaun'} val=""
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
                label={'Kelayakan Pembiayaan Maksimum'}
                val=""
            ></CustomTextField>
            <CustomTextField id="" disabled label={'Jumlah yang Dipohon'} val=""
            ></CustomTextField>
            <CustomSelectField id="" disabled label={'Tempoh Pembayaran'} val=""
            ></CustomSelectField>
            <CustomTextField
                id=""
                disabled
                label={'Tugas Jawatan yang menunjukan sebab-sebab keperluan menggunakan kenderaan persendirian'}
                val={'-'}
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Kenderaan yang Hendak Dibeli">
            <TextIconButton type="back"></TextIconButton>

            <TextIconButton></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <CustomSelectField disabled id="" label={'Kondisi Kenderaan'} val=""
            ></CustomSelectField>
            <CustomSelectField id="" disabled label={'Jenis Kenderaan'} val=""
            ></CustomSelectField>
            <CustomTextField
                id=""
                disabled
                label={'Jenama dan Model Kenderaan'}
                val={'Perodua Myvi'}
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Sukatan Silinder/No. Chasis/No. Enjin'}
                val={'1.3'}
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Nombor Pendaftaran'}
                val={'ABX1234'}
            ></CustomTextField>
            <CustomTextField id="" disabled label="Tarikh Pendaftaran" val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Harga Bersih (seperti ditetapkan dalam WP 9.3'}
                val=""
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pembiayaan Pinjaman">
            <TextIconButton type="back"></TextIconButton>

            <TextIconButton></TextIconButton>
        </StepperContentHeader>
        <StepperContentBody>
            <!-- <RadioSingle
                onChange={change}
                userSelected={loanBefore}
                disabled
                {options}
                legend={'Pernahkah diberikan pinjaman/pembiayaan sebelum ini'}
            ></RadioSingle> -->
            <!-- {#if loanBefore == 'true'} -->
            <CustomTextField
                id=""
                disabled
                val=""
                label="Tarikh Pinjaman/Pembayaran Terakhir"
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Jumlah Pinjaman/Pembiayaan'}
                val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label="Tarikh Ansuran Terakhir Dibayar"
                val=""
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Jumlah Ansuran Terakhir Dibayar'}
                val=""
            ></CustomTextField>

            <CustomTextField
                id=""
                disabled
                label={'Jenis Kenderaan yang Digunakan Sekarang Untuk Tugas Rasmi'}
                val="bind:"
            ></CustomTextField>
            <CustomTextField
                id=""
                disabled
                label={'Butir-butir Baki Hutang/Tuntutan Lain dengan Kerajaan Bagi Pihak Diri Sendiri, Jika Ada'}
                val=""
            ></CustomTextField>
            <!-- {/if} -->
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ><TextIconButton type="back"></TextIconButton>
            <TextIconButton type="reset" onClick={() => {}}></TextIconButton>
            <TextIconButton></TextIconButton></StepperContentHeader
        >
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
                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <p class="text-sm text-txt-tertiary">
                        Muat naik salinan berikut:
                    </p>
                    <ul
                        class="list-inside list-disc pl-2 text-sm text-txt-tertiary"
                    >
                        <li>Kad Pengenalan</li>
                        <li>Lesen</li>
                        <li>Slip Gaji Terkini</li>
                        <li>Sijil Nilaian (Jika kenderaan terpakai)</li>
                        <li>Salinan Sebut Harga</li>
                    </ul>
                </div>
            </div>

            <div class="flex w-full items-start justify-start">
                <p class="text-sm text-system-primary">
                    Fail - fail yang dimuat naik:
                </p>
            </div>

            <!-- <DownloadAttachment fileName="Dokumen_Sokongan_1.pdf"
            ></DownloadAttachment>
            <DownloadAttachment fileName="Dokumen_Sokongan_2.pdf"
            ></DownloadAttachment> -->
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
            <CustomTextField
                id=""
                disabled
                label={'Status Sokongan'}
                val={'DISOKONG'}
            ></CustomTextField>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Muat Turun Surat Tawaran"
            ><TextIconButton type="back"></TextIconButton><TextIconButton
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <ContentHeader title="Permohonan Pinjaman Kenderaan"
            ></ContentHeader>
            <div class="flex w-full flex-col items-start justify-start gap-2.5">
                <p class="text-sm text-txt-secondary">
                    Sila muat turun dan pastikan dokumen diisi dengan lengkap
                    dan ditandatangani sebelum dihantar kepada Urus Setia
                </p>
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Tawaran Opsyen</a
                >
                <a href="/" class="text-sm text-system-primary underline"
                    >Surat Perjanjian Pinjaman Kenderaan</a
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
                <div
                    class="flex h-fit w-full flex-col items-start justify-start"
                >
                    <ul
                        class="list-inside list-decimal pl-2 text-sm text-txt-tertiary"
                    >
                        <li>Resit Pembelian</li>
                        <li>Geran Kenderaan</li>
                        <li>Cover Note Insuran</li>
                    </ul>
                </div>

                <div class="flex w-full items-start justify-start">
                    <p class="text-sm text-system-primary">
                        Fail - fail yang dimuat naik:
                    </p>
                </div>

                <!-- <DownloadAttachment fileName="SURAT PERJANJIAN.pdf"
                ></DownloadAttachment> -->
            </div>
            <div class="flex w-full flex-row items-start justify-start">
                <p class="text-sm text-txt-secondary">
                    Muat naik Resit Pembelian yang lengkap.
                </p>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
