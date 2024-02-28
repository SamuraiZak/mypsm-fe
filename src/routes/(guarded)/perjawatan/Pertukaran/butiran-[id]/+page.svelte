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
    import { Badge } from 'flowbite-svelte';

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

    {#if currentRoleCode === urusetia === 'arahan_pengarah'}
    <StepperContent>
        <StepperContentHeader title="Butiran Pemohon"></StepperContentHeader>
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
        <StepperContentHeader title="Butiran Kakitangan"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField id="noPekerja" label="No. Pekerja" val="001023"
                ></CustomTextField>
                <CustomTextField id="nama" label="Nama" val="Ismail bin Ramdan"
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
        <StepperContentHeader title="Penangguhan"></StepperContentHeader>
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


    {:else if currentRoleCode === urusetia === 'arahan_pengurusan'}
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

    {:else if currentRoleCode === urusetia === 'permohonan_sendiri'}
<!-- permohonan sendiri -->
<StepperContent>
    <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
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
    <StepperContentHeader title="Butiran Peribadi"></StepperContentHeader>
    <StepperContentBody
        ><div class="flex w-full flex-col gap-2">
            <CustomTextField id="name" label="Nama" val="Mohd Irfan bin Abu"
            ></CustomTextField>
            <CustomTextField id="noKP" label="No. K/P" val="890210-11-2667"
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
    <StepperContentHeader title="Alasan Pertukaran"></StepperContentHeader>
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
            <CustomTextField id="tarikh" label="Tarikh" val="13/08/2023"
            ></CustomTextField>
        </div></StepperContentBody
    >
</StepperContent>
<StepperContent>
    <StepperContentHeader title="Cetak Dokumen Permohonan Pertukaran"
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
    <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
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
            <ContentHeader title="Keputusan Permohonan Pertukaran" />
            <CustomSelectField id="keputusan" label="Keputusan" val="" />
        </div></StepperContentBody
    >
</StepperContent>
   {/if}
</Stepper>



