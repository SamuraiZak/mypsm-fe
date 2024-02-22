<!-- Add your changes to the commented parts -->

<script lang="ts">
    // import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import { Badge, Checkbox } from 'flowbite-svelte';
    import { Textarea } from 'flowbite-svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
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
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Jenis Pertukaran"
                    id="dropdown"
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Pilihan Penempatan Pertama"
                    id="dropdown2"
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <DropdownField
                    dropdownType="label-left-full"
                    label="Pilihan Penempatan Kedua (Jika Ada)"
                    id="dropdown3"
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                /> -->
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <CustomTextField id="name" label="Nama" val="Mohd Irfan bin Abu"
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
                <!-- <DropdownField
                    dropdownType="label-left-full"
                    label="Status Berkahwin"
                    id="dropdown"
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                /> -->
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
        <StepperContentHeader title="Alasan Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col text-sm">
                    <div class="w-full">
                        <span class="font-semibold">Alasan Pertukaran</span>
                    </div>
                    <div class="w-full flex flex-col ">
                        <div class="flex w-full justify-between flex-col">
                            <div
                                class="flex w-1/5  flex-row items-start pt-4 text-sm"
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
                                <div>Mengikut Ibu/Bapa yang Uzur/Sakit</div>
                            </div>
                            <div class="w-1/2  py-3">
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
                            <div class="w-1/2  py-3">
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
                            <div class="w-1/2  py-3">
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
                            <div class="w-1/2  py-3 ">
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
                            Saya sesungguhnya mengakui bahawa semua keterangan
                            di atas adalah benar. Lembaga Kemajuan Ikan Malaysia
                            (LKIM) berhak membatalkan permohonan saya jika
                            didapati ada maklumat yang tidak benar. Saya faham
                            bahawa pertukaran ini hanyalah ke Ibu Pejabat/
                            Negeri / Wilayah yang saya nyatakan di atas sahaja.
                            Saya juga faham bahawa penempatan saya ke mana-mana
                            tempat di dalam Ibu/ Pejabat/ Negeri/ Wilayah itu
                            adalah terpulang kepada pertimbangan dan sokongan
                            Pengarah Bahagian/ Negeri berkenaan. Saya juga
                            mengambil maklum bahawa sekiranya saya membatalkan
                            pertukaran yang telah diluluskan oleh Jawatankuasa
                            Penyelarasan Penempatan Pegawai dan Kakitangan LKIM,
                            saya tidak layak diberi sebarang pertimbangan
                            pertukaran ke tempat yang sama dalam tempoh satu(1)
                            tahun dai tarikh pembatalan dilakukan.
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
                    <label for="" class="w-[220px]">Keputusan</label><Badge
                        border
                        color="green">DISOKONG</Badge
                    >
                </div>
                <ContentHeader title="Pilihan Penempatan Kedua"></ContentHeader>
                <ContentHeader
                    title="Ulasan Keputusan daripada Pengarah Bahagian/Negeri"
                ></ContentHeader>
                <CustomTextField id="name" label="Nama" val="Sufian Adam"
                ></CustomTextField>
                <CustomTextField
                    id="ulasan"
                    label="Ulasan/Tindakan"
                    val="Alasan tidak ketara"
                ></CustomTextField>
                <div class="flex w-full flex-row text-sm">
                    <label for="" class="w-[220 px]">Keputusan</label><Badge
                        border
                        color="red">TIDAK DISOKONG</Badge
                    >
                </div>
                <ContentHeader title="Butiran Tindakan Tatatertib (jika ada)"
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
        <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
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
                <ContentHeader title="Butiran Penangguhan"></ContentHeader>
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
                <ContentHeader title="Ulasan Keputusan daripada Peranan Lain"
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
                    <label for="" class="w-[220px]">Keputusan</label><Badge
                        border
                        color="green">DISOKONG</Badge
                    >
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
                    <label for="" class="w-[220px]">Keputusan</label><Badge
                        border
                        color="green">LULUS</Badge
                    >
                </div>
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
                <ContentHeader title="Keputusan Permohonan Pertukaran"
                ></ContentHeader>
                <CustomTextField id="keputusan" label="Keputusan" val="Lulus" 
                ></CustomTextField>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
