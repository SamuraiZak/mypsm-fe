<!-- Add your changes to the commented parts -->

<script lang="ts">
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { Badge, Checkbox, Textarea } from 'flowbite-svelte';
    import type { PageData } from './$types';

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

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
    export let data: PageData;

    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    // urusetia
    let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;
    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;
    // pelulus
    let pelulus = UserRoleConstant.pelulus.code;
    // penyokong
    let penyokong = UserRoleConstant.penyokong.code;
    // pengarah Bahagian
    let pengarahBahagian = UserRoleConstant.pengarahBahagian.code;
</script>

<ContentHeader title="Permohonan Pertukaran"
    ><TextIconButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>
<!-- Arahan Pengarah -->

<Stepper dataId={id} dataStatus={status}>
    {#if data.detail === 'arahan_pengarah'}
        {#if currentRoleCode === urusetia }
            <StepperContent>
                <StepperContentHeader title="Butiran Pemohon"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="namaPengarah"
                            label="Nama Pengarah"
                            val="Iskandar Ismail"
                        ></CustomTextField>
                        <CustomTextField
                            id="jabatan"
                            label="Jabatan"
                            val="LKIM SELANGOR"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Kakitangan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="noPekerja"
                            label="No. Pekerja"
                            val="001023"
                        ></CustomTextField>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Ismail bin Ramdan"
                        ></CustomTextField>

                        <CustomTextField
                            id="noKP"
                            label="No. K/P"
                            val="890210-11-2667"
                        ></CustomTextField>
                        <CustomTextField id="program" label="Program" val="-"
                        ></CustomTextField>
                        <CustomTextField id="skim" label="Skim" val="-"
                        ></CustomTextField>
                        <CustomTextField id="gred" label="Gred" val="F41"
                        ></CustomTextField>
                        <CustomTextField
                            id="jawatan"
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
                <StepperContentHeader title="Butiran Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="tarikhPertukaran"
                            label="Tarikh Pertukaran"
                            val="19/09/2023"
                        ></CustomTextField>
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan Baru"
                            val="LKIM SARAWAK - KUCHING"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenukaran"
                            label="Alasan Penukaran"
                            val="Memenuhi keperluan tenaga kerja"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomSelectField
                            label="Nama Mesyuarat"
                            id="dropdown"
                            val=""
                            options={[
                                { value: '1', name: '-' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Tarikh Mesyuarat"
                            id="dropdown2"
                            val=""
                            options={[
                                { value: '1', name: 'DD/MM/YYYY' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Keputusan"
                            id="dropdown3"
                            val=""
                            options={[
                                { value: '1', name: 'LULUS/TIDAK LULUS' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Penempatan Diluluskan (Jika Lulus)"
                            id="dropdown"
                            val=""
                            options={[
                                { value: '1', name: 'Sila Pilih' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Tarikh Kuatkuasa Pertukaran (Jika Lulus)"
                            id="dropdown2"
                            val=""
                            options={[
                                { value: '1', name: 'DD/MM/YYYY' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="No. Rujukan Surat"
                            id="dropdown3"
                            val=""
                            options={[
                                { value: '1', name: '-' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Tarikh Surat"
                            id="dropdown2"
                            val=""
                            options={[
                                { value: '1', name: '-' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Lapor Diri Kepada"
                            id="dropdown3"
                            val=""
                            options={[
                                { value: '1', name: 'Pilih Penempatan' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Penangguhan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhAwalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val=""
                            placeholder="dd/mm/yyyy"
                        ></CustomTextField>
                        <!-- <DownloadAttachment
                    label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                    fileName="surat_penangguhan_irfan"
                /> -->
                        <ContentHeader
                            title="Keputusan Permohonan Penaungguhan/Pindaan Penempatan"
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            val=""
                            placeholder="-"
                        ></CustomTextField>
                        <CustomTextField
                            id="keputusanPelulus"
                            label="Keputusan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Pertukaran"
                    ><TextIconButton
                        type="primary"
                        label="Hantar"
                        onClick={() => {
                            goto('../');
                        }}
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <!-- <DateSelector label="Tarikh Lapor Diri" {handleDateChange} /> -->
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan Baru"
                            val=""
                            placeholder="-"
                        ></CustomTextField>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama Penyokong"
                            val=""
                            placeholder="-"
                        ></CustomTextField>
                        <CustomSelectField
                            label="Keputusan Penyokong"
                            id="dropdown"
                            val=""
                            options={[
                                { value: '1', name: 'Sila Pilih' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            val=""
                            placeholder="-"
                        ></CustomTextField>
                        <CustomSelectField
                            label="Keputusan Pelulus"
                            id="dropdown3"
                            val=""
                            options={[
                                { value: '1', name: 'Sila Pilih' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}

        {#if currentRoleCode === penyokong || currentRoleCode === pelulus}

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
                        id="name"
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
                        id="program" label="Program" disabled={true} placeholder="-" val=""
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
                        id="namaJAwatan"
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
                        id='kumpulan'
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
                        <CustomTextField id="penempatanBaru" label="Penempatan Baru" placeholder="-" val=""
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
                        id='kakitanganMemerlukanPenangguhan'
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
                        id='tarikhAsalPertukaran'
                            label="Tarikh Asal Pertukaran"
                            placeholder="-"
                            val="01/09/2023"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                        id='tarikhPertukaranYangDipohon'
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
                            goto('/penyokong/perjawatan/pertukaran/');
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
                            disabled -->
                        <!-- ></DateSelector> -->
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
                        <!-- <RadioSingle legend="Keputusan" options={sokongOptions}></RadioSingle> -->
                        <ContentHeader title="Keputusan Pelulus"></ContentHeader>
                        <CustomTextField
                        id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            disabled={true}
                            val="Aiman Akmal"
                        ></CustomTextField>
                        <CustomTextField
                        id="keputusanPelulus"
                            label="Keputusan"
                            placeholder="-"
                            disabled={true}
                            val="Sedang Diproses"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}

        {#if currentRoleCode === kakitangan}

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
                     <CustomSelectField
                        id="penangguhan"
                        label="Adakah anda memerlukan penangguhan?"
                        val=""
                    ></CustomSelectField>
                   <!-- <FileInputField
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
        {/if}
        
<!-- arahan Pengurusan -->
    {:else if data.detail === 'arahan_pengurusan'}
        {#if currentRoleCode === urusetia}
            <!-- arahan Pengurusan -->

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
                            Permohonan Penangguhan/Pindaan Penempatan sila terus
                            ke langkah berikut:
                            <span
                                class="cursor-pointer text-sm text-system-primary"
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
                        <ContentHeader title="Butiran Penangguhan"
                        ></ContentHeader>
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
                        <ContentHeader title="Butiran Penangguhan"
                        ></ContentHeader>
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
                        <ContentHeader title="Butiran Pertukaran"
                        ></ContentHeader>
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
                        <ContentHeader title="Dokumen Berkaitan"
                        ></ContentHeader>
                        <!-- <FileInputField label="Borang Lapor Diri"></FileInputField>
                <FileInputField label="Nota Serah Tugas"></FileInputField> -->
                        <ContentHeader title="Butiran Penyokong"
                        ></ContentHeader>
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
                <StepperContentHeader
                    title="Semak Pengesahan Keputusan Pertukaran"
                >
                    <TextIconButton
                        label="Hantar"
                        onClick={() => {
                            goto('/urus-setia/perjawatan/pertukaran/');
                        }}
                        type="primary"
                    ></TextIconButton>
                </StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Pertukaran"
                        ></ContentHeader>
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
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan baru"
                            placeholder="-"
                            val="LKIM SARAWAK - KUCHING"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenukaran"
                            label="Alasan Penukaran"
                            placeholder="-"
                            val="Memenuhi keperluan tenaga kerja dengan kemahiran yang berkaitan"
                        ></CustomTextField>
                        <ContentHeader title="Dokumen Berkaitan"
                        ></ContentHeader>
                        <!-- <DownloadAttachment
                    label="Borang Lapor Diri"
                    fileName="Borang_Lapor_Diri_Ismail.pdf"
                ></DownloadAttachment>
                <DownloadAttachment
                    label="Nota Serah Tugas"
                    fileName="Serah_Tugas.psf"
                ></DownloadAttachment> -->
                        <ContentHeader title="Keputusan Penyokong"
                        ></ContentHeader>
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
                        <ContentHeader title="Keputusan Pelulus"
                        ></ContentHeader>
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
        {/if}

        {#if currentRoleCode === penyokong || currentRoleCode === pelulus}

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
                    id="program" label="Program" disabled={true} placeholder="-" val=""
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
                    id="namaJawatan"
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
                    <CustomTextField id="penempatanBaru" label="Penempatan Baru" placeholder="-" val=""
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
                    id="kakitanganmemerlukanPenanguhan"
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
                    id="tarikhPertukaranyangDipohon"
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
                        goto('/penyokong/perjawatan/pertukaran/');
                    }}
                   type=primary></TextIconButton>
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
                    <!-- <RadioSingle legend="Keputusan" options={sokongOptions}></RadioSingle> -->
                    <ContentHeader title="Keputusan Pelulus"></ContentHeader>
                    <CustomTextField
                    id="namaPelulus"
                        label="Nama Pelulus"
                        placeholder="-"
                        disabled={true}
                        val="Aiman Akmal"
                    ></CustomTextField>
                    <CustomTextField
                    id="keputusan"
                        label="Keputusan"
                        placeholder="-"
                        disabled={true}
                        val="Sedang Diproses"
                    ></CustomTextField>
                </div></StepperContentBody
            >
        </StepperContent>
        {/if}

        {#if currentRoleCode === kakitangan}

        <StepperContent>
            <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <CustomTextField id="noPkerja" label="No. Pekerja" val="001023"
                    ></CustomTextField>
                    <CustomTextField id="name" label="Nama" val="Ismail bin Ramdan"
                    ></CustomTextField>
                    <CustomTextField id="noKP" label="No. K/P" val="890210-11-2667"
                    ></CustomTextField>
                    <CustomTextField id="program" label="Program" val="-"
                    ></CustomTextField>
                    <CustomTextField id="skim" label="Skim" val="-"
                    ></CustomTextField>
                    <CustomTextField id="gred" label="Gred" val="F41"
                    ></CustomTextField>
                    <CustomTextField
                        id="namaJawatan"
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
                        id="penempatanBaru"
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
                     <CustomSelectField
                        id="penangguhan"
                        label="Adakah anda memerlukan penangguhan?"
                        val=""
                    ></CustomSelectField>
                    <!--
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
                    <!-- <DateSelector
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
                    ></DateSelector> -->
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
                        label="Nama Penyokong"
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
        {/if}


<!-- permohonan Sendiri -->
    {:else if data.detail === 'permohonan_sendiri'}
        {#if currentRoleCode === urusetia || currentRoleCode === penyokong}
            <!-- permohonan sendiri -->
            <StepperContent>
                <StepperContentHeader title="Butiran Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="jenisPertukaran"
                            label="Jenis Pertukaran"
                            val="Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah"
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanPertama"
                            label="Pilihan Penempatan Pertama"
                            val="Kuala Kangsar"
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanKedua"
                            label="Pilihan Penempatan Kedua (Jika Ada)"
                            val="Bahagian Perikanan"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Peribadi"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="name"
                            label="Nama"
                            val="Mohd Irfan bin Abu"
                        ></CustomTextField>
                        <CustomTextField
                            id="noKP"
                            label="No. K/P"
                            val="890210-11-2667"
                        ></CustomTextField>
                        <CustomTextField
                            id="phoneNumber"
                            label="No. Telefon"
                            val="890210-11-2667"
                        ></CustomTextField>
                        <CustomTextField
                            id="statusBerkahwin"
                            label="Status Berkahwin"
                            val="Berkahwin"
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnak"
                            label="Bilangan Anak"
                            val="12"
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnakBersekolah"
                            label="Bilangan Anak Bersekolah"
                            val="10"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Maklumat Perkhidmatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="namaJawatan"
                            label="Nama Jawatan"
                            val="Kerani"
                        ></CustomTextField>
                        <CustomTextField id="Gred" label="Gred" val="M22"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhLantikan"
                            label="Tarikh Lantikan"
                            val="12/03/2020"
                        ></CustomTextField>
                        <CustomTextField
                            id="namaJabatan"
                            label="Nama Jabatan"
                            val="Jabatan 1"
                        ></CustomTextField>
                        <CustomTextField
                            id="alamatJabatan"
                            label="Alamat Jabatan"
                            val="404, Jalan Keruing, Sabah"
                        ></CustomTextField>
                        <CustomTextField
                            id="bahagiaUnit"
                            label="Bahagian / Unit"
                            val="Pelaksana"
                        ></CustomTextField>
                        <CustomTextField
                            id="tempohPerkhidmatan"
                            label="Tempoh Perkhidmatan (Tahun)"
                            val="4"
                        ></CustomTextField>
                        <CustomTextField
                            id="penempatanSekarang"
                            label="Di Penempatan Sekarang (Bulan)"
                            val="10"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Alasan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="alasanPertukaran"
                            label="Alasan Pertukaran"
                            val="Mengikut Pasangan"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasan"
                            label="Nyatakan Alasan (jika tiada dalam pilihan)"
                            val="-"
                        ></CustomTextField>
                        <ContentHeader
                            title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan sila isikan maklumat pasangan seperti berikut:"
                        />
                        <CustomTextField
                            id="jarakTempatKerja"
                            label="Jarak Tempat Kerja (km)"
                            val="1020"
                        ></CustomTextField>
                        <CustomTextField
                            id="namaMajikan"
                            label="Nama Majikan"
                            val="PetroShell"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhMulaBerkhidmat"
                            label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                            val="13/05/2022"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Pemohon telah melaukukan pengesahan permohonan pada tarikh berikut:"
                        />
                        <CustomTextField
                            id="tarikh"
                            label="Tarikh"
                            val="13/08/2023"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Cetak Dokumen Permohonan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Sila cetak dokumen yang berkaitan untuk diperakui oleh pihak yang berkenaan:"
                        />
                        <!-- <DownloadAttachment
                label="Borang Permohonan Pertukaran"
                fileName="Borang_permohonan_pertukaran_ariffin.pdf"
            ></DownloadAttachment> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Sokongan Pengarah Bahagian/Negeri"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Pertama
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama"
                            val="Mohd Sahwan Bin Murni"
                        />
                        <CustomTextField
                            id="ulasanPenyokong"
                            label="Ulasan/Tindakan"
                            val="Layak disokong"
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Kedua
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama"
                            val="Sufian Adam"
                        />
                        <CustomTextField
                            id="ulasanPenyokong"
                            label="Ulasan/Tindakan"
                            val="Alasan tidak ketara"
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="red">TIDAK DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base font-semibold">
                            Butiran Tindakan Tatatertib (jika ada)
                        </div>
                        <CustomTextField
                            id="jenisHukuman"
                            label="Jenis Hukuman"
                            val="-"
                        />
                        <CustomTextField
                            id="tarikhLaporan"
                            label="Tarikh Laporan"
                            val="dd/mm/yyyy"
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomSelectField
                            id="namaMesyuarat"
                            label="Nama Mesyuarat"
                            val=""
                        />
                        <!--
            <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
            ></DateSelector>
            <RadioSingle legend="Keputusan" {options}></RadioSingle>
            -->
                        <CustomSelectField
                            id="penempatanDiluluskan"
                            label="Penempatan Diluluskan (Jika Lulus)"
                            val=""
                        />
                        <!--  <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
            ></DateSelector> -->
                        <CustomTextField
                            id="noRujukan"
                            label="No. Rujukan Surat"
                            placeholder="-"
                            val=""
                        />
                        <!-- <DateSelector label="Tarikh Surat" {handleDateChange}
            ></DateSelector>-->
                        <CustomSelectField
                            id="laporDiriKepada"
                            label="Lapor Diri Kepada"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhPertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                        <!-- <DownloadAttachment
                label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                fileName="surat_penangguhan_ariffin.pdf"
            /> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Status Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                        />
                        <CustomTextField
                            id="tarikhPertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                        />
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                        />
                        <!-- <DownloadAttachment
                label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                fileName="surat_penangguhan_irfan"
            /> -->
                        <ContentHeader
                            title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                        />
                        <!-- <DropdownSelect
                dropdownType="label-left-full"
                label="Keputusan"
                options={meetings}
            /> -->
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <!-- <DateSelector label="Tarikh Lapor Diri" handleDateChange /> -->
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan Baru"
                            placeholder="-"
                            val=""
                        />
                        <div class="my-2.5 text-base font-semibold">
                            Masukkan Nama Penyokong dan Pelulus
                        </div>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Name Penyokong"
                            placeholder="-"
                            val=""
                        />
                        <CustomTextField
                            id="namPelulus"
                            label="Name Pelulus"
                            placeholder="-"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Pertukaran"
                    ><TextIconButton
                        type="primary"
                        label="Hantar"
                        onClick={() => {
                            goto('../');
                        }}
                    ></TextIconButton></StepperContentHeader
                >
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Keputusan Permohonan Pertukaran"
                        />
                        <CustomSelectField
                            id="keputusan"
                            label="Keputusan"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}
        {#if currentRoleCode === kakitangan}
            <StepperContent>
                <StepperContentHeader title="Butiran Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomSelectField
                            label="Jenis Pertukaran"
                            id="dropdown"
                            val=""
                            options={[
                                { value: '1', name: 'Semua' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Pilihan Penempatan Pertama"
                            id="dropdown2"
                            val=""
                            options={[
                                { value: '1', name: 'Semua' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomSelectField
                            label="Pilihan Penempatan Kedua (Jika Ada)"
                            id="dropdown3"
                            val=""
                            options={[
                                { value: '1', name: 'Semua' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Peribadi"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="name"
                            label="Nama"
                            val="Mohd Irfan bin Abu"
                        ></CustomTextField>
                        <CustomTextField
                            id="identityCard"
                            label="No. K/P"
                            val="890210-11-2667"
                        ></CustomTextField>
                        <CustomTextField
                            id="phoneNumber"
                            label="No. Telefon"
                            val="890210-11-2667"
                        ></CustomTextField>
                        <CustomSelectField
                            label="Status Berkahwin"
                            id="dropdown"
                            val=""
                            options={[
                                { value: '1', name: 'Semua' },
                                { value: '2', name: '1/12' },
                                { value: '3', name: '1/102' },
                                { value: '4', name: '2/101' },
                            ]}
                        />
                        <CustomTextField
                            id="child"
                            label="Bilangan Anak"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="childinSchool"
                            label="Bilangan Anak Bersekolah"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Maklumat Perkhidmatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="position"
                            label="Nama Jawatan"
                            val="Urus Setia"
                        ></CustomTextField>
                        <CustomTextField id="Gred" label="Gred" val="3.97"
                        ></CustomTextField>
                        <CustomTextField
                            id="TarikhLantikan"
                            label="Tarikh Lantikan"
                            val="19/7/2023"
                        ></CustomTextField>
                        <CustomTextField
                            id="namaJabatan"
                            label="Nama Jabatan"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="alamatJabatan"
                            label="Alamat Jabatan"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="bahagianUnit"
                            label="Bahagian / Unit"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="tempohPerkhidmatan"
                            label="Tempoh Perkhidmatan (Tahun)"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="penempatanSekarang"
                            label="Di Penempatan Sekarang (Bulan)"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Alasan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <div class="flex w-full flex-col text-sm">
                            <div class="w-full">
                                <span class="font-semibold"
                                    >Alasan Pertukaran</span
                                >
                            </div>
                            <div class="flex w-full flex-col">
                                <div
                                    class="flex w-full flex-col justify-between"
                                >
                                    <div
                                        class="flex w-1/5 flex-row items-start pt-4 text-sm"
                                    >
                                        <Checkbox />
                                        <div>Mengikut Pasangan</div>
                                    </div>
                                    <div class="w-1/2 py-3">
                                        <Textarea
                                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div class="flex w-full flex-col">
                                    <div
                                        class="flex w-1/2 flex-row items-start pt-4 text-sm"
                                    >
                                        <Checkbox />
                                        <div>
                                            Mengikut Ibu/Bapa yang Uzur/Sakit
                                        </div>
                                    </div>
                                    <div class="w-1/2 py-3">
                                        <Textarea
                                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div class="flex w-full flex-col">
                                    <div
                                        class="flex w-1/2 flex-row items-start pt-4 text-sm"
                                    >
                                        <Checkbox />
                                        <div>Ancaman Keselamatan</div>
                                    </div>
                                    <div class="w-1/2 py-3">
                                        <Textarea
                                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div class="flex w-full flex-col">
                                    <div
                                        class="flex w-1/2 flex-row items-start pt-4 text-sm"
                                    >
                                        <Checkbox />
                                        <div>Kes Kesihatan Kronik Pemohon</div>
                                    </div>
                                    <div class="w-1/2 py-3">
                                        <Textarea
                                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                        ></Textarea>
                                    </div>
                                </div>
                                <div class="flex w-full flex-col">
                                    <div
                                        class="flex w-1/2 flex-row items-start pt-4 text-sm"
                                    >
                                        <Checkbox />
                                        <div>Lain-lain (Sila Nyatakan)</div>
                                    </div>
                                    <div class="w-1/2 py-3">
                                        <Textarea
                                            placeholder="Sila taip jawapan anda dalam ruangan ini"
                                            class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                        ></Textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ContentHeader
                            title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan
                sila isikan maklumat pasangan seperti berikut:"
                        ></ContentHeader>
                        <CustomTextField
                            id="jarakTempatKerja"
                            label="Jarak Tempat Kerja (km)"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="namaMajikan"
                            label="Nama Majikan"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhMula"
                            type="date"
                            label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                            val=""
                        />
                        <!-- <FileInputField id="hello" /> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Sila sahkan permohonan anda sebelum hantar"
                        ></ContentHeader>
                        <div class="flex text-sm">
                            <div class="w-[250px]"><span>Pengesahan</span></div>
                            <div class="flex w-full">
                                <input
                                    type="radio"
                                    class="mr-2 leading-tight text-system-primary focus:outline-none focus:ring-0"
                                />
                                <span>
                                    Saya sesungguhnya mengakui bahawa semua
                                    keterangan di atas adalah benar. Lembaga
                                    Kemajuan Ikan Malaysia (LKIM) berhak
                                    membatalkan permohonan saya jika didapati
                                    ada maklumat yang tidak benar. Saya faham
                                    bahawa pertukaran ini hanyalah ke Ibu
                                    Pejabat/ Negeri / Wilayah yang saya nyatakan
                                    di atas sahaja. Saya juga faham bahawa
                                    penempatan saya ke mana-mana tempat di dalam
                                    Ibu/ Pejabat/ Negeri/ Wilayah itu adalah
                                    terpulang kepada pertimbangan dan sokongan
                                    Pengarah Bahagian/ Negeri berkenaan. Saya
                                    juga mengambil maklum bahawa sekiranya saya
                                    membatalkan pertukaran yang telah diluluskan
                                    oleh Jawatankuasa Penyelarasan Penempatan
                                    Pegawai dan Kakitangan LKIM, saya tidak
                                    layak diberi sebarang pertimbangan
                                    pertukaran ke tempat yang sama dalam tempoh
                                    satu(1) tahun dai tarikh pembatalan
                                    dilakukan.
                                </span>
                            </div>
                        </div>
                        <CustomTextField
                            id="Date"
                            type="date"
                            label="Tarikh"
                            val=""
                            placeholder=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Perakuan Pengarah Bahagian/Negeri"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Pilihan Penempatan Pertama"
                        ></ContentHeader>
                        <ContentHeader
                            title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                        ></ContentHeader>
                        <CustomTextField
                            id="name"
                            label="Nama"
                            val="Mohd Sahwan Bin Murni"
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan/Tindakan"
                            val="Layak disokong"
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <ContentHeader title="Pilihan Penempatan Kedua"
                        ></ContentHeader>
                        <ContentHeader
                            title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                        ></ContentHeader>
                        <CustomTextField
                            id="name"
                            label="Nama"
                            val="Sufian Adam"
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan/Tindakan"
                            val="Alasan tidak ketara"
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220 px]">Keputusan</label
                            ><Badge border color="red">TIDAK DISOKONG</Badge>
                        </div>
                        <ContentHeader
                            title="Butiran Tindakan Tatatertib (jika ada)"
                        ></ContentHeader>
                        <CustomTextField
                            id="jenisHukuman"
                            label="Jenis Hukuman"
                            val="Sedang Diproses"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhlaporan"
                            label="Tarikh Laporan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="keputusan"
                            label="Keputusan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <!-- <RadioSingle
                    {options}
                    legend="Adakah anda perlu penangguhan pertukaran?"
                    disabled={false}
                ></RadioSingle> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Status Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan"
                        ></ContentHeader>
                        <CustomTextField
                            id="tarikhAsalpertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhPertukaranYangDiPohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenanguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                        <!-- <DownloadAttachment
                    label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                    fileName="surat_penangguhan_irfan"
                /> -->
                        <ContentHeader
                            title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                        ></ContentHeader>
                        <CustomTextField
                            id="keputusan"
                            label="Keputusan"
                            val="Sedang Diproses"
                        ></CustomTextField>
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            val="Sedang Diproses"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Muat Turun Dokumen Lapor Diri"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Sila cetak dan isi borang-borang berikut untuk dibawa semasa
                melapor diri"
                        ></ContentHeader>
                        <!-- <DownloadAttachment
                    label="Surat Pertukaran Penempatan"
                    fileName="Surat Pertukaran Penempatan.pdf"
                />
                <DownloadAttachment
                    label="Nota Serah Tugas"
                    fileName="Nota Serah Tugas.pdf"
                />
                <DownloadAttachment
                    label="Borang Lapor Diri"
                    fileName="Borang_Lapor_Diri.pdf"
                /> -->
                        <ContentHeader
                            title="Ulasan Keputusan daripada Peranan Lain"
                        ></ContentHeader>
                        <ContentHeader title="Penyokong"></ContentHeader>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama"
                            val="Mohd Sahwan Bin Murni"
                        ></CustomTextField>
                        <CustomTextField
                            id="keputusan"
                            label="Ulasan/Tindakan"
                            val="Layak disokong"
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <ContentHeader title="Pelulus"></ContentHeader>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Sufian Aadam"
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan/Tindakan"
                            val="Layak diluluskan"
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">LULUS</Badge>
                        </div>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Pertukaran"
                    ><TextIconButton
                        type="primary"
                        label="Hantar"
                        onClick={() => {
                            goto('../');
                        }}
                    ></TextIconButton></StepperContentHeader
                >
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Keputusan Permohonan Pertukaran"
                        ></ContentHeader>
                        <CustomTextField
                            id="keputusan"
                            label="Keputusan"
                            val="Lulus"
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}

        {#if currentRoleCode === pelulus}
            <StepperContent>
                <StepperContentHeader title="Butiran Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="jenisPertukaran"
                            label="Jenis Pertukaran"
                            val="Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanPertama"
                            label="Pilihan Penempatan Pertama"
                            val="Kuala Kangsar"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanKedua"
                            label="Pilihan Penempatan Kedua (Jika Ada)"
                            val="Bahagian Perikanan"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Peribadi"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="name"
                            label="Nama"
                            val="Mohd Irfan bin Abu"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="noKP"
                            label="No. K/P"
                            val="890210-11-2667"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="noPhone"
                            label="No. Telefon"
                            val="890210-11-2667"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="sstatusKahwin"
                            label="Status Berkahwin"
                            val="Berkahwin"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnak"
                            label="Bilangan Anak"
                            val="12"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnakBersekolah"
                            label="Bilangan Anak Bersekolah"
                            val="10"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Maklumat Perkhidmatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="namaJawatan"
                            label="Nama Jawatan"
                            val="Kerani"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="gred"
                            label="Gred"
                            val="M22"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhLantikan"
                            label="Tarikh Lantikan"
                            val="12/03/2020"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="namaJabatan"
                            label="Nama Jabatan"
                            val="Jabatan 1"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="alamatJabatan"
                            label="Alamat Jabatan"
                            val="404, Jalan Keruing, Sabah"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bahagianUnit"
                            label="Bahagian / Unit"
                            val="Pelaksana"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tempohPerkhidmatan"
                            label="Tempoh Perkhidmatan (Tahun)"
                            val="4"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="diPenempatanSekarang"
                            label="Di Penempatan Sekarang (Bulan)"
                            val="10"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Alasan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="alsanPertukaran"
                            label="Alasan Pertukaran"
                            val="Mengikut Pasangan"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="nyatakanAlasan"
                            label="Nyatakan Alasan (jika tiada dalam pilihan)"
                            val="-"
                            disabled={true}
                        ></CustomTextField>
                        <ContentHeader
                            title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan sila isikan maklumat pasangan seperti berikut:"
                        />
                        <CustomTextField
                            id="jarakTempatKerja"
                            label="Jarak Tempat Kerja (km)"
                            val="1020"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="namaMajikan"
                            label="Nama Majikan"
                            val="PetroShell"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhMulaBerkhidmat"
                            label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                            val="13/05/2022"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Pemohon telah melaukukan pengesahan permohonan pada tarikh berikut:"
                        />
                        <CustomTextField
                            id="tarikh"
                            label="Tarikh"
                            val="13/08/2023"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Cetak Dokumen Permohonan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Sila cetak dokumen yang berkaitan untuk diperakui oleh pihak yang berkenaan:"
                        />
                        <!-- <DownloadAttachment
                        label="Borang Permohonan Pertukaran"
                        fileName="Borang_permohonan_pertukaran_ariffin.pdf"
                    ></DownloadAttachment> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Sokongan Pengarah Bahagian/Negeri"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Pertama
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Mohd Sahwan Bin Murni"
                            disabled={true}
                        />
                        <CustomTextField
                            id="ulasanTindakan"
                            label="Ulasan/Tindakan"
                            val="Layak disokong"
                            disabled={true}
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Kedua
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Sufian Adam"
                            disabled={true}
                        />
                        <CustomTextField
                            id="ulasanTindakan"
                            label="Ulasan/Tindakan"
                            val="Alasan tidak ketara"
                            disabled={true}
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="red">TIDAK DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base font-semibold">
                            Butiran Tindakan Tatatertib (jika ada)
                        </div>
                        <CustomTextField
                            id="jenisHukuman"
                            label="Jenis Hukuman"
                            val="-"
                            disabled={true}
                        />
                        <CustomTextField
                            id="tarikhLaporan"
                            label="Tarikh Laporan"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomSelectField
                            id="namaMesyuarat"
                            label="Nama Mesyuarat"
                            val=""
                        />

                        <!-- <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
                    ></DateSelector>
                    <RadioSingle legend="Keputusan" {options}></RadioSingle>
                    -->
                        <CustomSelectField
                            id="penempatanDiluluskan"
                            label="Penempatan Diluluskan (Jika Lulus)"
                            val=""
                        />
                        <!--
                    <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
                    ></DateSelector> -->
                        <CustomTextField
                            id="noRujukan"
                            label="No. Rujukan Surat"
                            placeholder="-"
                            val=""
                        />
                        <!-- <DateSelector label="Tarikh Surat" {handleDateChange}
                    ></DateSelector>
                    -->
                        <CustomSelectField
                            id="laporDiriKepada"
                            label="Lapor Diri Kepada"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhPertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenanagguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                            disabled={true}
                        ></CustomTextField>
                        <!-- <DownloadAttachment
                        label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                        fileName="surat_penangguhan_ariffin.pdf"
                    /> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Status Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                        <CustomTextField
                            id="tarikhPertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                            disabled={true}
                        />
                        <!-- <DownloadAttachment
                        label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                        fileName="surat_penangguhan_irfan"
                    /> -->
                        <ContentHeader
                            title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                        />
                        <CustomSelectField
                            id="keputusan"
                            label="Keputusan"
                            val=""
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <!-- <DateSelector label="Tarikh Lapor Diri" handleDateChange disabled /> -->
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan Baru"
                            placeholder="-"
                            val="LKIM Kuching - Sarawak"
                            disabled
                        />
                        <div class="my-2.5 text-base font-semibold">
                            Masukkan Nama Penyokong dan Pelulus
                        </div>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama Penyokong"
                            placeholder="-"
                            val="Mohd Irfan Bin Abu"
                            disabled
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val="Mohd Abu bin Sufian"
                            disabled
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Penyokongan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Penyokong"></ContentHeader>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama Penyokong"
                            placeholder="-"
                            val="Mohd Irfan Bin Abu Bakar"
                            disabled
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasanPenyokong"
                            label="Ulasan"
                            placeholder="-"
                            val="Layak Disokong"
                            disabled
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Pelulusan Pertukaran"
                    ><TextIconButton
                        type="primary"
                        label="Hantar"
                        onClick={() => {
                            goto('../');
                        }}
                    ></TextIconButton></StepperContentHeader
                >
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Pelulus"></ContentHeader>
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasanPelulus"
                            label="Ulasan"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <!-- <RadioSingle legend="Keputusan" {options}></RadioSingle> -->
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}

        {#if currentRoleCode === pengarahBahagian}
            <StepperContent>
                <StepperContentHeader title="Butiran Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="jenisP"
                            label="Jenis Pertukaran"
                            val="Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanPertama"
                            label="Pilihan Penempatan Pertama"
                            val="Kuala Kangsar"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="pilihanPenempatanKedua"
                            label="Pilihan Penempatan Kedua (Jika Ada)"
                            val="Bahagian Perikanan"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Butiran Peribadi"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Mohd Irfan bin Abu"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="noKP"
                            label="No. K/P"
                            val="890210-11-2667"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="phoneNo"
                            label="No. Telefon"
                            val="890210-11-2667"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="statusBerkahwin"
                            label="Status Berkahwin"
                            val="Berkahwin"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnak"
                            label="Bilangan Anak"
                            val="12"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bilanganAnakBersekolah"
                            label="Bilangan Anak Bersekolah"
                            val="10"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Maklumat Perkhidmatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="namaJawatan"
                            label="Nama Jawatan"
                            val="Kerani"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="gred"
                            label="Gred"
                            val="M22"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhLantikan"
                            label="Tarikh Lantikan"
                            val="12/03/2020"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="namaJabatan"
                            label="Nama Jabatan"
                            val="Jabatan 1"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="alamatJabatan"
                            label="Alamat Jabatan"
                            val="404, Jalan Keruing, Sabah"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="bahagianUnit"
                            label="Bahagian / Unit"
                            val="Pelaksana"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tempohPerkhidmatan"
                            label="Tempoh Perkhidmatan (Tahun)"
                            val="4"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="diPenempatanSekarang"
                            label="Di Penempatan Sekarang (Bulan)"
                            val="10"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Alasan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            id="alasanPertukaran"
                            label="Alasan Pertukaran"
                            val="Mengikut Pasangan"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="nyatakanAlasan"
                            label="Nyatakan Alasan (jika tiada dalam pilihan)"
                            val="-"
                            disabled={true}
                        ></CustomTextField>
                        <ContentHeader
                            title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan sila isikan maklumat pasangan seperti berikut:"
                        />
                        <CustomTextField
                            id="jarakTempatKerja"
                            label="Jarak Tempat Kerja (km)"
                            val="1020"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="namaMajikan"
                            label="Nama Majikan"
                            val="PetroShell"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhMulaBerkhidmat"
                            label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                            val="13/05/2022"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Pengesahan Permohonan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Pemohon telah melaukukan pengesahan permohonan pada tarikh berikut:"
                        />
                        <CustomTextField
                            id="tarikh"
                            label="Tarikh"
                            val="13/08/2023"
                            disabled={true}
                        ></CustomTextField>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Cetak Dokumen Permohonan Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader
                            title="Sila cetak dokumen yang berkaitan untuk diperakui oleh pihak yang berkenaan:"
                        />
                        <!-- <DownloadAttachment
                        label="Borang Permohonan Pertukaran"
                        fileName="Borang_permohonan_pertukaran_ariffin.pdf"
                    ></DownloadAttachment> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Sokongan Pengarah Bahagian/Negeri"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Pertama
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Mohd Sahwan Bin Murni"
                            disabled={true}
                        />
                        <CustomTextField
                            id="ulasanTindakan"
                            label="Ulasan/Tindakan"
                            val="Layak disokong"
                            disabled={true}
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base text-system-primary">
                            Pilihan Penempatan Kedua
                        </div>
                        <div class="text-base font-semibold">
                            Ulasan Keputusan daripada Pengarah Bahagian/Negeri
                        </div>
                        <CustomTextField
                            id="nama"
                            label="Nama"
                            val="Sufian Adam"
                            disabled={true}
                        />
                        <CustomTextField
                            id="ulasanTindakan"
                            label="Ulasan/Tindakan"
                            val="Alasan tidak ketara"
                            disabled={true}
                        />
                        <div class="flex w-full flex-row text-sm">
                            <label for="staffing-sec-result" class="w-[220px]"
                                >Keputusan</label
                            ><Badge border color="red">TIDAK DISOKONG</Badge>
                        </div>
                        <div class="w-full border-b"></div>
                        <div class="text-base font-semibold">
                            Butiran Tindakan Tatatertib (jika ada)
                        </div>
                        <CustomTextField
                            id="jenisHukaman"
                            label="Jenis Hukuman"
                            val="-"
                            disabled={true}
                        />
                        <CustomTextField
                            id="tarikhLaporan"
                            label="Tarikh Laporan"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Mesyuarat"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <CustomSelectField
                            id="namaMesyuarat"
                            label="Nama Mesyuarat"
                            val=""
                        />
                        <!--
                    <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
                    ></DateSelector>
                    <RadioSingle legend="Keputusan" {options}></RadioSingle> -->
                        <CustomSelectField
                            id="penempatanDiluluskan"
                            label="Penempatan Diluluskan (Jika Lulus)"
                            val=""
                        />
                        <!--
                    <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
                    ></DateSelector> -->
                        <CustomTextField
                            id="noRujukan"
                            label="No. Rujukan Surat"
                            placeholder="-"
                            val=" "
                        />
                        <!-- <DateSelector label="Tarikh Surat" {handleDateChange}
                    ></DateSelector> -->
                        <CustomSelectField
                            id="laporDirikepada"
                            label="Lapor Diri Kepada"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="tarikhPertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                            disabled={true}
                        ></CustomTextField>
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                            disabled={true}
                        ></CustomTextField>
                        <!-- <DownloadAttachment
                        label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                        fileName="surat_penangguhan_ariffin.pdf"
                    /> -->
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader
                    title="Status Permohonan Penangguhan/Pindaan Penempatan"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Butiran Penangguhan" />
                        <CustomTextField
                            id="tarikhAsalPertukaran"
                            label="Tarikh Asal Pertukaran"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                        <CustomTextField
                            id="tarikhpertukaranYangDipohon"
                            label="Tarikh Pertukaran yang Dipohon"
                            val="dd/mm/yyyy"
                            disabled={true}
                        />
                        <CustomTextField
                            id="alasanPenangguhan"
                            label="Alasan Penangguhan"
                            val="Sedang Diproses"
                            disabled={true}
                        />
                        <!-- <DownloadAttachment
                        label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                        fileName="surat_penangguhan_irfan"
                    /> -->
                        <ContentHeader
                            title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                        />
                        <CustomSelectField
                            id="keputusan"
                            label="Keputusan"
                            val=""
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val=""
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <!-- <DateSelector label="Tarikh Lapor Diri" handleDateChange disabled /> -->
                        <CustomTextField
                            id="penempatanBaru"
                            label="Penempatan Baru"
                            placeholder="-"
                            val="LKIM Kuching - Sarawak"
                            disabled
                        />
                        <div class="my-2.5 text-base font-semibold">
                            Masukkan Nama Penyokong dan Pelulus
                        </div>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Name Penyokong"
                            placeholder="-"
                            val="Mohd Irfan Bin Abu"
                            disabled
                        />
                        <CustomTextField
                            id="namaPelulus"
                            label="Name Pelulus"
                            placeholder="-"
                            val="Mohd Abu bin Sufian"
                            disabled
                        />
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Peranan Lain"
                ></StepperContentHeader>
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Penyokong"></ContentHeader>
                        <CustomTextField
                            id="namaPenyokong"
                            label="Nama Penyokong"
                            placeholder="-"
                            val="Mohd Irfan Bin Abu Bakar"
                            disabled
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan"
                            placeholder="-"
                            val="Layak Disokong"
                            disabled
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">DISOKONG</Badge>
                        </div>
                        <ContentHeader title="Pelulus"></ContentHeader>
                        <CustomTextField
                            id="namaPelulus"
                            label="Nama Pelulus"
                            placeholder="-"
                            val="Mohd Abu Bin Sufian"
                            disabled
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan"
                            placeholder="-"
                            val="Layak Diluluskan"
                            disabled
                        ></CustomTextField>
                        <div class="flex w-full flex-row text-sm">
                            <label for="" class="w-[220px]">Keputusan</label
                            ><Badge border color="green">LULUS</Badge>
                        </div>
                    </div></StepperContentBody
                >
            </StepperContent>
            <StepperContent>
                <StepperContentHeader title="Keputusan Pengarah"
                    ><TextIconButton
                        type="primary"
                        label="Hantar"
                        onClick={() => {
                            goto('../');
                        }}
                    ></TextIconButton></StepperContentHeader
                >
                <StepperContentBody
                    ><div class="flex w-full flex-col gap-2">
                        <ContentHeader title="Keputusan Pengarah"
                        ></ContentHeader>
                        <CustomTextField
                            id="namaPengarah"
                            label="Nama Pengarah Bahagian/Negeri"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <CustomTextField
                            id="ulasan"
                            label="Ulasan"
                            placeholder="-"
                            val=""
                        ></CustomTextField>
                        <!-- <RadioSingle legend="Keputusan" options={sokongOptions}></RadioSingle> -->
                    </div></StepperContentBody
                >
            </StepperContent>
        {/if}

    {/if}
</Stepper>
