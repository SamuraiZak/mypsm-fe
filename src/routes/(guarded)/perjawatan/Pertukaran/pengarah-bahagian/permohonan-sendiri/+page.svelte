<!-- Add your changes to the commented parts -->

<script lang="ts">
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    // import LongTextField from '$lib/components/input/LongTextField.svelte';
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
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import ContentHeader from '$lib/components/header/SectionHeader.svelte';
    // import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

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

<ContentHeader
    title="Permohonan Pertukaran"
    
    ><TextIconButton
        type="close"
        onClick={() => {
            goto('../');
        }}
    /></ContentHeader
>

<Stepper activeIndex={12} dataId={id} dataStatus={status}>
    <StepperContent>
        <StepperContentHeader title="Butiran Pertukaran"></StepperContentHeader>
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
        <StepperContentHeader title="Butiran Peribadi"></StepperContentHeader>
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
                <CustomTextField id="bilanganAnak" label="Bilangan Anak" val="12" disabled={true}
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
                <CustomTextField id="namaJawatan" label="Nama Jawatan" val="Kerani" disabled={true}
                ></CustomTextField>
                <CustomTextField id="gred" label="Gred" val="M22" disabled={true}></CustomTextField>
                <CustomTextField
                id="tarikhLantikan"
                    label="Tarikh Lantikan"
                    val="12/03/2020"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id='namaJabatan'
                    label="Nama Jabatan"
                    val="Jabatan 1"
                    disabled={true}
                ></CustomTextField>
                <CustomTextField
                id='alamatJabatan'
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
        <StepperContentHeader title="Alasan Pertukaran"></StepperContentHeader>
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
                <ContentHeader title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan sila isikan maklumat pasangan seperti berikut:" />
                <CustomTextField
                id='jarakTempatKerja'
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
                <ContentHeader title="Pemohon telah melaukukan pengesahan permohonan pada tarikh berikut:" />
                <CustomTextField id="tarikh" label="Tarikh" val="13/08/2023" disabled={true}
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Cetak Dokumen Permohonan Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader title="Sila cetak dokumen yang berkaitan untuk diperakui oleh pihak yang berkenaan:" />
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
                id='ulasanTindakan'
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
                <CustomTextField id="nama" label="Nama" val="Sufian Adam" disabled={true} />
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
                <CustomTextField id="jenisHukaman" label="Jenis Hukuman" val="-" disabled={true} />
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
                <CustomTextField id='noRujukan' label="No. Rujukan Surat" placeholder="-" val=" " />
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
                <ContentHeader title="Keputusan Permohonan Penangguhan/Pindaan Penempatan" />
                <!-- <DropdownSelect
                    dropdownType="label-left-full"
                    label="Keputusan"
                    options={meetings}
                /> -->
                <CustomTextField id="namaPelulus" label="Nama Pelulus" placeholder="-" val="" />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <!-- <DateSelector label="Tarikh Lapor Diri" handleDateChange disabled /> -->
                <CustomTextField id="penempatanBaru" label="Penempatan Baru" placeholder="-" val="LKIM Kuching - Sarawak" disabled />
                <div class="my-2.5 text-base font-semibold">
                    Masukkan Nama Penyokong dan Pelulus
                </div>
                <CustomTextField id="namaPenyokong" label="Name Penyokong" placeholder="-" val="Mohd Irfan Bin Abu" disabled />
                <CustomTextField id="namaPelulus" label="Name Pelulus" placeholder="-" val="Mohd Abu bin Sufian" disabled />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Peranan Lain"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader  title="Penyokong"
                ></ContentHeader>
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
                    <label for="" class="w-[220px]">Keputusan</label><Badge
                        border
                        color="green">DISOKONG</Badge
                    >
                </div>
                <ContentHeader  title="Pelulus"
                ></ContentHeader>
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
                    <label for="" class="w-[220px]">Keputusan</label><Badge
                        border
                        color="green">LULUS</Badge
                    >
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pengarah"
            ><TextIconButton
                type=primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}
            ></TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <ContentHeader  title="Keputusan Pengarah"
                ></ContentHeader>
                <CustomTextField
                id="namaPengarah"
                    label="Nama Pengarah Bahagian/Negeri"
                    placeholder="-"
                    val=""
                ></CustomTextField>
                <CustomTextField id="ulasan" label="Ulasan" placeholder="-" val=""
                ></CustomTextField>
                <!-- <RadioSingle legend="Keputusan" options={sokongOptions}></RadioSingle> -->
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
