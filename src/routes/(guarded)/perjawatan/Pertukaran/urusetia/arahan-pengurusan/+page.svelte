<script lang="ts">
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Pertukaran Atas Arahan Pihak Pengurusan"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/pertukaran/');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="Butiran Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <CustomTextField
                        id="noPekerja"
                        label="No. Pekerja"
                        placeholder="-"
                        val="001023"
                    ></CustomTextField>
                    <CustomTextField
                        id="nama"
                        label="Nama"
                        placeholder="-"
                        val="Ismail bin Ramdan"
                    ></CustomTextField>
                    <CustomTextField
                        id="noKP"
                        label="No. K/P"
                        placeholder="-"
                        val="890701-13-5667"
                    ></CustomTextField>
                    <CustomTextField
                        id="program"
                        label="Program"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="skim"
                        label="Skim"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="gred"
                        label="Gred"
                        placeholder="-"
                        val="F41"
                    ></CustomTextField>
                    <CustomTextField
                        id="namaJawatan"
                        label="Nama Jawatan"
                        placeholder="-"
                        val="F41 - Pegawai Teknologi Maklumat"
                    ></CustomTextField>
                    <CustomTextField
                        id="penempatanSekarang"
                        label="Penempatan Sekarang"
                        placeholder="-"
                        val="00105 - Bhgn. Teknologi Maklumat"
                    ></CustomTextField>
                    <CustomTextField
                        id="kumpulan"
                        label="Kumpulan"
                        placeholder="-"
                        val="PP1 - Pengurusan dan Profesional - A"
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Butiran Pertukaran"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <!-- <DateSelector label="Tarikh Pertukaran" handleDateChange
                    ></DateSelector> -->
                    <CustomTextField
                        id="penempatanBaru"
                        label="Penempatan Baru"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="alasanPenukaran"
                        label="Alasan Penukaran"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Maklum Balas Kakitangan"
                    ></ContentHeader>
                    <CustomTextField
                        id="kakitanganmemerlukanPenangguhan"
                        label="Kakitangan memerlukan Penangguhan?"
                        placeholder="-"
                        val="Ya"
                    ></CustomTextField>
                    <!-- <DownloadAttachment
                        label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                        fileName="surat_penangguhan_irfan"
                    ></DownloadAttachment> -->
                    <div class="py-2.5 text-sm text-txt-secondary">
                        Sekiranya kakitangan memilih untuk tidak membuat
                        Permohonan Penangguhan/Pindaan Penempatan sila terus ke
                        langkah berikut:
                        <span class="cursor-pointer text-sm text-system-primary"
                            >Kemaskini Keputusan Pertukaran</span
                        >
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Maklumat Permohonan/Penangguhan Pindaan Penempatan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Butiran Penangguhan"></ContentHeader>
                    <!-- <DateSelector
                        label="Tarikh Asal Pertukaran"
                        handleDateChange
                    />
                    <DateSelector
                        label="Tarikh Pertukaran yang Dipohon"
                        handleDateChange
                    /> -->
                    <CustomTextField
                        id="alasanPenangguhan"
                        label="Alasan Penangguhan"
                        placeholder="Sila nyatakan alasan permohonan"
                        val=""
                    ></CustomTextField>
                    <ContentHeader title="Butiran Pelulus"></ContentHeader>
                    <CustomSelectField
                    id="namaPelulus"
                        label="Nama Pelulus"
                        val=""
                    ></CustomSelectField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Semak Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Butiran Penangguhan"></ContentHeader>
                    <CustomTextField
                        id="tarikhAsalPertukaran"
                        label="Tarikh Asal Pertukaran"
                        placeholder="-"
                        val="01/09/2023"
                    ></CustomTextField>
                    <CustomTextField
                        id="tarikhPertukaranyangDipohon"
                        label="Tarikh Pertukaran yang Dipohon"
                        placeholder="-"
                        val="08/10/2023"
                    ></CustomTextField>
                    <CustomTextField
                        id="alasanPenangguhan"
                        label="Alasan Penangguhan"
                        placeholder="-"
                        val="Menyelesaikan urusan pindah rumah"
                    ></CustomTextField>
                    <ContentHeader title="Butiran Pelulus"></ContentHeader>
                    <CustomTextField
                        id="namaPelulus"
                        label="Nama Pelulus"
                        placeholder="-"
                        val="Zakaria Abdullah"
                    ></CustomTextField>
                    <CustomTextField
                        id="keputusanPelulus"
                        label="Keputusan"
                        placeholder="-"
                        val="Lulus"
                    ></CustomTextField>
                    <CustomTextField
                        id="ulasanPelulus"
                        label="Ulasan"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Pertukaran"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Butiran Pertukaran"></ContentHeader>
                    <!-- <DateSelector
                        label="Tarikh Asal Pertukaran"
                        handleDateChange
                    ></DateSelector>
                    <DateSelector
                        label="Tarikh Baru Pertukaran"
                        handleDateChange
                    ></DateSelector>
                    <DateSelector label="Tarikh Lapor Diri" handleDateChange
                    ></DateSelector> -->
                    <CustomTextField
                        id="penempatanBaru"
                        label="Penempatan Baru"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="alasanPenukaran"
                        label="Alasan Penukaran"
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <ContentHeader title="Dokumen Berkaitan"></ContentHeader>
                    <!-- <FileInputField label="Borang Lapor Diri"></FileInputField>
                    <FileInputField label="Nota Serah Tugas"></FileInputField> -->
                    <ContentHeader title="Butiran Penyokong"></ContentHeader>
                    <CustomSelectField
                        id="namaPenyokong"
                        label="Nama Penyokong"
                       val=""
                    ></CustomSelectField>
                    <ContentHeader title="Butiran Pelulus"></ContentHeader>
                    <CustomSelectField
                        id="namaPelulus"
                        label="Nama Pelulus"
                       val=""
                    ></CustomSelectField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Semak Pengesahan Keputusan Pertukaran">
                <TextIconButton
                    label="Hantar"
                    onClick={() => {
                        goto('/urus-setia/perjawatan/pertukaran/');
                    }}
                   type=primary></TextIconButton
                >
            </StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Butiran Pertukaran"></ContentHeader>
                    <!-- <DateSelector
                        label="Tarikh Asal Pertukaran"
                        handleDateChange
                    ></DateSelector>
                    <DateSelector
                        label="Tarikh Baru Pertukaran"
                        handleDateChange
                    ></DateSelector>
                    <DateSelector label="Tarikh Lapor Diri" handleDateChange
                    ></DateSelector>
                    <DateSelector label="Nama Pengarah baru" handleDateChange
                    ></DateSelector> -->
                    <CustomTextField id="penempatanBaru"
                        label="Penempatan baru"
                        placeholder="-"
                        val="LKIM SARAWAK - KUCHING"
                    ></CustomTextField>
                    <CustomTextField id="alasanPenukaran"
                        label="Alasan Penukaran"
                        placeholder="-"
                        val="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan"
                    ></CustomTextField>
                    <ContentHeader title="Dokumen Berkaitan"></ContentHeader>
                    <!-- <DownloadAttachment
                        label="Borang Lapor Diri"
                        fileName="Borang_Lapor_Diri_Ismail.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment
                        label="Nota Serah Tugas"
                        fileName="Serah_Tugas.psf"
                    ></DownloadAttachment> -->
                    <ContentHeader title="Keputusan Penyokong"></ContentHeader>
                    <CustomTextField
                    id="namaPenyokong"
                        label="Nama Penyokong"
                        placeholder="-"
                        val="Zul Ariffin"
                    ></CustomTextField>
                    <CustomTextField
                    id="keputusanPenyokong"
                        label="Keputusan"
                        placeholder="-"
                        val="Disokong"
                    ></CustomTextField>
                    <ContentHeader title="Keputusan Pelulus"></ContentHeader>
                    <CustomTextField
                    id="namaPelulus"
                        label="Nama Pelulus"
                        placeholder="-"
                        val="Aiman Akmal"
                    ></CustomTextField>
                    <CustomTextField
                    id="keputusanPelulus"
                        label="Keputusan"
                        placeholder="-"
                        val="Lulus"
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
