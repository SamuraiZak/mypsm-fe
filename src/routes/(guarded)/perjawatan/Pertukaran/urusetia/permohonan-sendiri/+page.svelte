<!-- Add your changes to the commented parts -->

<script lang="ts">
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    // import { goto } from '$app/navigation';
    // import TextField from '$lib/components/input/TextField.svelte';
    // import DateSelector from '$lib/components/input/DateSelector.svelte';
    // import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    // import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    // import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { Badge } from 'flowbite-svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import ContentHeader from '$lib/components/header/ContentHeader.svelte';
    // import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.val);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

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

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<ContentHeader title="Permohonan Pertukaran"
    ><TextIconButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>

<Stepper dataId={id} dataStatus={status}>
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
                <!-- <DropdownSelect
                    dropdownType="label-left-full"
                    label="Nama Mesyuarat"
                    options={meetings}
                />
                <DateSelector label="Tarikh Mesyuarat" {handleDateChange}
                ></DateSelector>
                <RadioSingle legend="Keputusan" {options}></RadioSingle>
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Penempatan Diluluskan (Jika Lulus)"
                    options={meetings}
                />
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
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Lapor Diri Kepada"
                    options={meetings}
                /> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Butiran Penangguhan" />
                <CustomTextField id="tarikhAsalPertukaran" label="Tarikh Asal Pertukaran" val="dd/mm/yyyy"
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
                <CustomTextField id="namaPelulus"
                label="Nama Pelulus" placeholder="-" val="" />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <!-- <DateSelector label="Tarikh Lapor Diri" handleDateChange /> -->
                <CustomTextField id="penempatanBaru" label="Penempatan Baru" placeholder="-" val='' />
                <div class="my-2.5 text-base font-semibold">
                    Masukkan Nama Penyokong dan Pelulus
                </div>
                <CustomTextField id="namaPenyokong" label="Name Penyokong" placeholder="-" val=""/>
                <CustomTextField id="namPelulus" label="Name Pelulus" placeholder="-" val=""/>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pertukaran"
            ><TextIconButton
                type=primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Keputusan Permohonan Pertukaran" />
                <!-- <DropdownSelect
                    dropdownType="label-left-full"
                    label="Keputusan"
                    options={meetings}
                /> -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
