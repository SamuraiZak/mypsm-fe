<!-- Add your changes to the commented parts -->

<script lang="ts">
    // import SectionHeader from './../../../../../../../lib/components/header/SectionHeader.svelte';
    // import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import { Checkbox, DropdownDivider } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    // import FileInputField from '$lib/components/input/FileInputField.svelte';
    // import LongTextField from '$lib/components/input/LongTextField.svelte';
    // import TextField from '$lib/components/input/TextField.svelte';
    // import DateSelector from '$lib/components/input/DateSelector.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    // import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    // import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    // const options: RadioOption[] = [
    //     {
    //         value: 'ya',
    //         label: 'Ya',
    //     },
    //     {
    //         value: 'tidak',
    //         label: 'Tidak',
    //     },
    // ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<ContentHeader title="Pertukaran Atas Arahan Pengarah Bahagian/Negeri"
    ><TextIconButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>

<!-- dataId={id} dataStatus={status} -->
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField id="noPekerja" label="No. Pekerja" val="001023"
                ></CustomTextField>
                <CustomTextField id="name" label="Nama" val="Ismail bin Ramdan"
                ></CustomTextField>
                <CustomTextField id="noKP" label="No. K/P" val="890210-11-2667"
                ></CustomTextField>
                <CustomTextField id="program" label="Program" val="-"
                ></CustomTextField>
                <CustomTextField id="skim" label="Skim" val="-"
                ></CustomTextField>
                <CustomTextField id="Gred" label="Gred" val="F41"
                ></CustomTextField>
                <CustomTextField
                    id="position"
                    label="Nama Jawatan"
                    val="F41 - Pegawai Teknologi Maklumat"
                ></CustomTextField>
                <CustomTextField
                    id="penempatanSekarang"
                    label="Penempatan Sekarang"
                    val="00105 - Bhgn. Teknologi Maklumat"
                ></CustomTextField>
                <CustomTextField
                    id="kumpulan"
                    label="Kumpulan"
                    val="PP1 - Pengurusan dan Professional - A"
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField
                    id="tarikhPertukaran"
                    label="Tarikh Pertukaran"
                    val="19/09/2023"
                ></CustomTextField>
                <CustomTextField
                    id="PenempatanBaru"
                    label="Penempatan Baru"
                    val="LKIM SARAWAK - KUCHING"
                ></CustomTextField>
                <CustomTextField
                    id="alasanPenukaran"
                    label="Alasan Penukaran"
                    val="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan"
                ></CustomTextField>
                <!-- <DownloadAttachment
                    label="Surat Pertukaran"
                    fileName="Surat Pertukaran"
                ></DownloadAttachment> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <ContentHeader title="Maklum Balas"></ContentHeader>
                <!-- <DropdownSelect
                    options={meetings}
                    label="Adakah anda memerlukan penangguhan?"
                ></DropdownSelect>
                <FileInputField
                    label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                ></FileInputField> -->
                <div class="text-sm text-txt-secondary">
                    Sekiranya anda memilih untuk tidak membuat Permohonan
                    Penangguhan/Pindaan Penempatan sila terus ke langkah
                    berikut: <span class="cursor-pointer text-system-primary"
                        >Semak Keputusan Pertukaran</span
                    >
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Semak Keputusan Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Butiran Penangguhan"></ContentHeader>
                <!-- <DateSelector
                    label="Tarikh Asal Pertukaran"
                    handleDateChange
                    selectedDate="01/09/2023"
                ></DateSelector>
                <DateSelector
                    label="Tarikh Pertukaran yang Dipohon"
                    handleDateChange
                    selectedDate="08/10/2023"
                ></DateSelector> -->
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
                    id="keputusan"
                    label="Keputusan"
                    placeholder="-"
                    val="Lulus"
                ></CustomTextField>
                <CustomTextField
                    id="ulasan"
                    label="Ulasan"
                    placeholder="-"
                    val=""
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Keputusan Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Butiran Penangguhan"></ContentHeader>
                <CustomTextField
                    id="tarikhAsalPertukaran"
                    label="Tarikh Asal Pertukaran"
                    val="01/09/2023"
                ></CustomTextField>
                <CustomTextField
                    id="tarikhPertukaranYangDiPohon"
                    label="Tarikh Pertukaran yang Dipohon"
                    val="08/10/2023"
                ></CustomTextField>
                <CustomTextField
                    id="tarikhLaporDiri"
                    label="Tarikh Lapor Diri"
                    val="18/10/2023"
                ></CustomTextField>
                <CustomTextField
                    id="namaPengarahBaru"
                    label="Nama Pengarah Baru"
                    val="Mohd Asyraf bin Sufian"
                    placeholder="-"
                ></CustomTextField>
                <CustomTextField
                    id="penempatanBaru"
                    label="Penempatan Baru"
                    placeholder="-"
                    val="LKIM SARAWAK - KUCHING"
                ></CustomTextField>
                <CustomTextField
                    id="alasanPertukaran"
                    label="Alasan Pertukaran"
                    placeholder="-"
                    val="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan."
                ></CustomTextField>
                <ContentHeader title="Dokumen Berkaitan"></ContentHeader>
                <!-- <DownloadAttachment
                    label="Borang Lapor Diri"
                    fileName="Borang_Lapor_diri_Ismail.pdf"
                ></DownloadAttachment>
                <DownloadAttachment
                    label="Nota Serah Tugas"
                    fileName="Serah_Tugas.pdf"
                ></DownloadAttachment> -->
                <ContentHeader title="Keputusan Penyokong"></ContentHeader>
                <CustomTextField
                    id="namaPenyokong"
                    label="Name Penyokong"
                    placeholder="-"
                    val="Zul Ariffin"
                ></CustomTextField>
                <CustomTextField
                    id="keputusan"
                    label="Keputusan"
                    placeholder="-"
                    val="Disokong"
                ></CustomTextField>
                <ContentHeader title="Keputusan Pelulus"></ContentHeader>
                <CustomTextField
                    id="namaPelulus"
                    label="Name Pelulus"
                    placeholder="-"
                    val="Aiman Akmal"
                ></CustomTextField>
                <CustomTextField
                    id="keputusan"
                    label="Keputusan"
                    placeholder="-"
                    val="Lulus"
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
