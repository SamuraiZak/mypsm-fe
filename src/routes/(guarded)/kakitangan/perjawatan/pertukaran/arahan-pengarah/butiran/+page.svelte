<!-- Add your changes to the commented parts -->

<script lang="ts">
    import SectionHeader from './../../../../../../../lib/components/header/SectionHeader.svelte';
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import { Checkbox, DropdownDivider } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';

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

    const options: RadioOption[] = [
        {
            value: 'ya',
            label: 'Ya',
        },
        {
            value: 'tidak',
            label: 'Tidak',
        },
    ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<ContentHeader
    title="Pertukaran Atas Arahan Pengarah Bahagian/Negeri"
    description="Sila sema dan isi bahagian yang berkaitan."
    ><FormButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>

<Stepper dataId={id} dataStatus={status}>
    <StepperContent>
        <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField label="No. Pekerja" value="001023" disabled={true}
                ></TextField>
                <TextField
                    label="Nama"
                    value="Ismail bin Ramdan"
                    disabled={true}
                ></TextField>
                <TextField
                    label="No. K/P"
                    value="890210-11-2667"
                    disabled={true}
                ></TextField>
                <TextField label="Program" value="-" disabled={true}
                ></TextField>
                <TextField label="Skim" value="-" disabled={true}></TextField>
                <TextField label="Gred" value="F41" disabled={true}></TextField>
                <TextField
                    label="Nama Jawatan"
                    value="F41 - Pegawai Teknologi Maklumat"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Penempatan Sekarang"
                    value="00105 - Bhgn. Teknologi Maklumat"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Kumpulan"
                    value="PP1 - Pengurusan dan Professional - A"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField
                    label="Tarikh Pertukaran"
                    value="19/09/2023"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Penempatan Baru"
                    value="LKIM SARAWAK - KUCHING"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Alasan Penukaran"
                    value="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan"
                    disabled={true}
                ></TextField>
                <DownloadAttachment
                    label="Surat Pertukaran"
                    fileName="Surat Pertukaran"
                ></DownloadAttachment>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <SectionHeader title="Maklum Balas"></SectionHeader>
                <DropdownSelect
                    options={meetings}
                    label="Adakah anda memerlukan penangguhan?"
                ></DropdownSelect>
                <FileInputField
                    label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                ></FileInputField>
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
                <SectionHeader title="Butiran Penangguhan"></SectionHeader>
                <DateSelector
                    label="Tarikh Asal Pertukaran"
                    handleDateChange
                    selectedDate="01/09/2023"
                ></DateSelector>
                <DateSelector
                    label="Tarikh Pertukaran yang Dipohon"
                    handleDateChange
                    selectedDate="08/10/2023"
                ></DateSelector>
                <LongTextField
                    label="Alasan Penangguhan"
                    placeholder="-"
                    value="Menyelesaikan urusan pindah rumah"
                ></LongTextField>
                <SectionHeader title="Butiran Pelulus"></SectionHeader>
                <TextField
                    label="Nama Pelulus"
                    placeholder="-"
                    value="Zakaria Abdullah"
                ></TextField>
                <TextField label="Keputusan" placeholder="-" value="Lulus"
                ></TextField>
                <LongTextField label="Ulasan" placeholder="-" value=""
                ></LongTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Semak Keputusan Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Butiran Penangguhan"></SectionHeader>
                <DateSelector
                    label="Tarikh Asal Pertukaran"
                    handleDateChange
                    selectedDate="01/09/2023"
                ></DateSelector>
                <DateSelector
                    label="Tarikh Pertukaran yang Dipohon"
                    handleDateChange
                    selectedDate="08/10/2023"
                ></DateSelector>
                <DateSelector
                    label="Tarikh Lapor Diri"
                    handleDateChange
                    selectedDate="18/10/2023"
                ></DateSelector>
                <TextField
                    label="Nama Pengarah Baru"
                    value="Mohd Asyraf bin Sufian"
                    placeholder="-"
                ></TextField>
                <TextField
                    label="Penempatan Baru"
                    placeholder="-"
                    value="LKIM SARAWAK - KUCHING"
                ></TextField>
                <LongTextField
                    label="Alasan Pertukaran"
                    placeholder="-"
                    value="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan."
                ></LongTextField>
                <SectionHeader title="Dokumen Berkaitan"></SectionHeader>
                <DownloadAttachment
                    label="Borang Lapor Diri"
                    fileName="Borang_Lapor_diri_Ismail.pdf"
                ></DownloadAttachment>
                <DownloadAttachment
                    label="Nota Serah Tugas"
                    fileName="Serah_Tugas.pdf"
                ></DownloadAttachment>
                <SectionHeader title="Keputusan Penyokong"></SectionHeader>
                <TextField
                    label="Name Penyokong"
                    placeholder="-"
                    value="Zul Ariffin"
                ></TextField>
                <TextField label="Keputusan" placeholder="-" value="Disokong"
                ></TextField>
                <SectionHeader title="Keputusan Pelulus"></SectionHeader>
                <TextField
                    label="Name Pelulus"
                    placeholder="-"
                    value="Aiman Akmal"
                ></TextField>
                <TextField label="Keputusan" placeholder="-" value="Lulus"
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
