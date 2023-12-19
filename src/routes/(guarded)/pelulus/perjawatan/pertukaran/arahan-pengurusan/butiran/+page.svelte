<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { goto } from '$app/navigation';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';

    const options: RadioOption[] = [
        {
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidak lulus',
            label: 'Tidak Lulus',
        },
    ];

    const sokongOptions: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidak sokong',
            label: 'Tidak Sokong',
        },
    ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Pertukaran Atas Arahan Pihak Pengurusan"
        description="Permohonan Pertukaran Atas Arahan Pihak Pengurusan"
        ><FormButton
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
                    <TextField
                        label="No. Pekerja"
                        disabled={true}
                        placeholder="-"
                        value="001023"
                    ></TextField>
                    <TextField
                        label="Nama"
                        disabled={true}
                        placeholder="-"
                        value="Ismail bin Ramdan"
                    ></TextField>
                    <TextField
                        label="No. K/P"
                        disabled={true}
                        placeholder="-"
                        value="890701-13-5667"
                    ></TextField>
                    <TextField label="Program" disabled={true} placeholder="-"
                    ></TextField>
                    <TextField
                        label="Skim"
                        disabled={true}
                        placeholder="-"
                        value=""
                    ></TextField>
                    <TextField
                        label="Gred"
                        disabled={true}
                        placeholder="-"
                        value="F41"
                    ></TextField>
                    <TextField
                        label="Nama Jawatan"
                        disabled={true}
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                    ></TextField>
                    <TextField
                        label="Penempatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="00105 - Bhgn. Teknologi Maklumat"
                    ></TextField>
                    <TextField
                        label="Kumpulan"
                        disabled={true}
                        placeholder="-"
                        value="PP1 - Pengurusan dan Profesional - A"
                    ></TextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Butiran Pertukaran"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <DateSelector label="Tarikh Pertukaran" handleDateChange
                    ></DateSelector>
                    <TextField label="Penempatan Baru" placeholder="-" value=""
                    ></TextField>
                    <LongTextField
                        label="Alasan Penukaran"
                        placeholder="-"
                        value=""
                    ></LongTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <SectionHeader title="Maklum Balas Kakitangan"
                    ></SectionHeader>
                    <TextField
                        label="Kakitangan memerlukan Penangguhan?"
                        placeholder="-"
                        value="Ya"
                        disabled={true}
                    ></TextField>
                    <DownloadAttachment
                        label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                        fileName="surat_penangguhan_irfan"
                    ></DownloadAttachment>
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
                    <SectionHeader title="Butiran Penangguhan"></SectionHeader>
                    <TextField
                        label="Tarikh Asal Pertukaran"
                        placeholder="-"
                        value="01/09/2023"
                        disabled={true}
                    ></TextField>
                    <TextField
                        label="Tarikh Pertukaran yang Dipohon"
                        placeholder="-"
                        value="08/10/2023"
                        disabled={true}
                    ></TextField>
                    <LongTextField
                        label="Alasan Penangguhan"
                        placeholder="-"
                        value="Menyelesaikan urusan pindah rumah"
                        disabled={true}
                    ></LongTextField>
                    <SectionHeader title="Butiran Pelulus"></SectionHeader>
                    <TextField
                        label="Nama Pelulus"
                        placeholder="-"
                        value="Zakaria Abdullah"
                        disabled={true}
                    ></TextField>
                    <TextField
                        label="Keputusan"
                        placeholder="-"
                        value="Lulus"
                        disabled={true}
                    ></TextField>
                    <LongTextField
                        label="Ulasan"
                        placeholder="-"
                        value=""
                        disabled={true}
                    ></LongTextField>
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
                    primary><SvgPaperAirplane /></TextIconButton
                >
            </StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <SectionHeader title="Butiran Pertukaran"></SectionHeader>
                    <DateSelector
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
                    ></DateSelector>
                    <TextField
                        label="Penempatan baru"
                        placeholder="-"
                        disabled={true}
                        value="LKIM SARAWAK - KUCHING"
                    ></TextField>
                    <LongTextField
                        label="Alasan Penukaran"
                        placeholder="-"
                        disabled={true}
                        value="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan"
                    ></LongTextField>
                    <SectionHeader title="Dokumen Berkaitan"></SectionHeader>
                    <DownloadAttachment
                        label="Borang Lapor Diri"
                        fileName="Borang_Lapor_Diri_Ismail.pdf"
                    ></DownloadAttachment>
                    <DownloadAttachment
                        label="Nota Serah Tugas"
                        fileName="Serah_Tugas.psf"
                    ></DownloadAttachment>
                    <SectionHeader title="Keputusan Penyokong"></SectionHeader>
                    <TextField
                        label="Nama Penyokong"
                        placeholder="-"
                        disabled={true}
                        value="Zul Ariffin"
                    ></TextField>
                    <TextField
                        label="Keputusan"
                        placeholder="-"
                        disabled={true}
                        value="Disokong"
                    ></TextField>
                    <SectionHeader title="Keputusan Pelulus"></SectionHeader>
                    <TextField
                        label="Nama Pelulus"
                        placeholder="-"
                        disabled={true}
                        value="Aiman Akmal"
                    ></TextField>
                    <RadioSingle legend="Keputusan" {options}></RadioSingle>
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
