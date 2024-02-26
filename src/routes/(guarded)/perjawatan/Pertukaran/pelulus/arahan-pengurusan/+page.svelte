<script lang="ts">
    // import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';

    // import FileInputField from '$lib/components/input/FileInputField.svelte';
    // import CustomTextField from '$lib/components/input/LongTextField.svelte';
    // import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    // import DateSelector from '$lib/components/input/DateSelector.svelte';
    // import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    // import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    // import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';

    // const options: RadioOption[] = [
    //     {
    //         value: 'lulus',
    //         label: 'Lulus',
    //     },
    //     {
    //         value: 'tidak lulus',
    //         label: 'Tidak Lulus',
    //     },
    // ];

    // const sokongOptions: RadioOption[] = [
    //     {
    //         value: 'sokong',
    //         label: 'Sokong',
    //     },
    //     {
    //         value: 'tidak sokong',
    //         label: 'Tidak Sokong',
    //     },
    // ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Pertukaran Atas Arahan Pihak Pengurusan"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('/pelulus/perjawatan/pertukaran/');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper activeIndex={4} dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="Butiran Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <CustomTextField
                        id="noPekerja"
                        label="No. Pekerja"
                        disabled={true}
                        placeholder="-"
                        val="001023"
                    ></CustomTextField>
                    <CustomTextField
                        id="nama"
                        label="Nama"
                        disabled={true}
                        placeholder="-"
                        val="Ismail bin Ramdan"
                    ></CustomTextField>
                    <CustomTextField
                        id="noKP"
                        label="No. K/P"
                        disabled={true}
                        placeholder="-"
                        val="890701-13-5667"
                    ></CustomTextField>
                    <CustomTextField
                        id="program"
                        label="Program"
                        disabled={true}
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="skim"
                        label="Skim"
                        disabled={true}
                        placeholder="-"
                        val=""
                    ></CustomTextField>
                    <CustomTextField
                        id="gred"
                        label="Gred"
                        disabled={true}
                        placeholder="-"
                        val="F41"
                    ></CustomTextField>
                    <CustomTextField
                        id="namajawatan"
                        label="Nama Jawatan"
                        disabled={true}
                        placeholder="-"
                        val="F41 - Pegawai Teknologi Maklumat"
                    ></CustomTextField>
                    <CustomTextField
                        id="penempatanSekarang"
                        label="Penempatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        val="00105 - Bhgn. Teknologi Maklumat"
                    ></CustomTextField>
                    <CustomTextField
                        id="kumpulan"
                        label="Kumpulan"
                        disabled={true}
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
                        id="alassamPenukaran"
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
                        id="kakitanganMemerlukanPenangguhan"
                        label="Kakitangan memerlukan Penangguhan?"
                        placeholder="-"
                        val="Ya"
                        disabled={true}
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
                        disabled={true}
                    ></CustomTextField>
                    <CustomTextField
                        id="tarikhPertukaranYangDipohon"
                        label="Tarikh Pertukaran yang Dipohon"
                        placeholder="-"
                        val="08/10/2023"
                        disabled={true}
                    ></CustomTextField>
                    <CustomTextField
                        id="alasanPenangguhan"
                        label="Alasan Penangguhan"
                        placeholder="-"
                        val="Menyelesaikan urusan pindah rumah"
                        disabled={true}
                    ></CustomTextField>
                    <ContentHeader title="Butiran Pelulus"></ContentHeader>
                    <CustomTextField
                        id="namaPelulus"
                        label="Nama Pelulus"
                        placeholder="-"
                        val="Zakaria Abdullah"
                        disabled={true}
                    ></CustomTextField>
                    <CustomTextField
                        id="keputusanPelulus"
                        label="Keputusan"
                        placeholder="-"
                        val="Lulus"
                        disabled={true}
                    ></CustomTextField>
                    <CustomTextField
                        id="ulasanPelulus"
                        label="Ulasan"
                        placeholder="-"
                        val=""
                        disabled={true}
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Semak Pengesahan Keputusan Pertukaran">
                <TextIconButton
                    label="Hantar"
                    onClick={() => {
                        goto('/pelulus/perjawatan/pertukaran/');
                    }}
                    type="primary"
                ></TextIconButton>
            </StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <ContentHeader title="Butiran Pertukaran"></ContentHeader>
                    <!-- <DateSelector
                        label="Tarikh Asal Pertukaran"
                        handleDateChange
                        disabled
                    ></DateSelector>
                    <DateSelector
                        label="Tarikh Baru Pertukaran"
                        handleDateChange
                        disabled
                    ></DateSelector>
                    <DateSelector
                        label="Tarikh Lapor Diri"
                        handleDateChange
                        disabled
                    ></DateSelector>
                    <DateSelector
                        label="Nama Pengarah baru"
                        handleDateChange
                        disabled
                    ></DateSelector> -->
                    <CustomTextField
                        id="penempatanBaru"
                        label="Penempatan baru"
                        placeholder="-"
                        disabled={true}
                        val="LKIM SARAWAK - KUCHING"
                    ></CustomTextField>
                    <CustomTextField
                        id="alasanPenukaran"
                        label="Alasan Penukaran"
                        placeholder="-"
                        disabled={true}
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
                        disabled={true}
                        val="Zul Ariffin"
                    ></CustomTextField>
                    <CustomTextField
                        id="keputusanPenyokong"
                        label="Keputusan"
                        placeholder="-"
                        disabled={true}
                        val="Disokong"
                    ></CustomTextField>
                    <ContentHeader title="Keputusan Pelulus"></ContentHeader>
                    <CustomTextField
                        id="namaPelulus"
                        label="Nama Pelulus"
                        placeholder="-"
                        disabled={true}
                        val="Aiman Akmal"
                    ></CustomTextField>
                    <!-- <RadioSingle legend="Keputusan" {options}></RadioSingle> -->
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
