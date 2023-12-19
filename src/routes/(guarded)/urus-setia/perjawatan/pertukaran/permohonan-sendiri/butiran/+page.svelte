<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { meetings } from '$lib/mocks/mesyuarat/mesyuarat';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { Badge } from 'flowbite-svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

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
            value: 'lulus',
            label: 'Lulus',
        },
        {
            value: 'tidak lulus',
            label: 'Tidak Lulus',
        },
    ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<ContentHeader
    title="Permohonan Pertukaran"
    description="Pertukaran atas permohonan sendiri"
    ><FormButton
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
                <TextField
                    label="Jenis Pertukaran"
                    value="Pertukaran Dalam Ibu Pejabat/Negeri/Wilayah"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Pilihan Penempatan Pertama"
                    value="Kuala Kangsar"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Pilihan Penempatan Kedua (Jika Ada)"
                    value="Bahagian Perikanan"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran Peribadi"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField
                    label="Nama"
                    value="Mohd Irfan bin Abu"
                    disabled={true}
                ></TextField>
                <TextField
                    label="No. K/P"
                    value="890210-11-2667"
                    disabled={true}
                ></TextField>
                <TextField
                    label="No. Telefon"
                    value="890210-11-2667"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Status Berkahwin"
                    value="Berkahwin"
                    disabled={true}
                ></TextField>
                <TextField label="Bilangan Anak" value="12" disabled={true}
                ></TextField>
                <TextField
                    label="Bilangan Anak Bersekolah"
                    value="10"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField label="Nama Jawatan" value="Kerani" disabled={true}
                ></TextField>
                <TextField label="Gred" value="M22" disabled={true}></TextField>
                <TextField
                    label="Tarikh Lantikan"
                    value="12/03/2020"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Nama Jabatan"
                    value="Jabatan 1"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Alamat Jabatan"
                    value="404, Jalan Keruing, Sabah"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Bahagian / Unit"
                    value="Pelaksana"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Tempoh Perkhidmatan (Tahun)"
                    value="4"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Di Penempatan Sekarang (Bulan)"
                    value="10"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Alasan Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField
                    label="Alasan Pertukaran"
                    value="Mengikut Pasangan"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Nyatakan Alasan (jika tiada dalam pilihan)"
                    value="-"
                    disabled={true}
                ></TextField>
                <SectionHeader title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan sila isikan maklumat pasangan seperti berikut:" />
                <TextField
                    label="Jarak Tempat Kerja (km)"
                    value="1020"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Nama Majikan"
                    value="PetroShell"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                    value="13/05/2022"
                    disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Pemohon telah melaukukan pengesahan permohonan pada tarikh berikut:" />
                <TextField label="Tarikh" value="13/08/2023" disabled={true}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Cetak Dokumen Permohonan Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Sila cetak dokumen yang berkaitan untuk diperakui oleh pihak yang berkenaan:" />
                <DownloadAttachment
                    label="Borang Permohonan Pertukaran"
                    fileName="Borang_permohonan_pertukaran_ariffin.pdf"
                ></DownloadAttachment>
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
                <TextField
                    label="Nama"
                    value="Mohd Sahwan Bin Murni"
                    disabled={true}
                />
                <LongTextField
                    label="Ulasan/Tindakan"
                    value="Layak disokong"
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
                <TextField label="Nama" value="Sufian Adam" disabled={true} />
                <LongTextField
                    label="Ulasan/Tindakan"
                    value="Alasan tidak ketara"
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
                <TextField label="Jenis Hukuman" value="-" disabled={true} />
                <TextField
                    label="Tarikh Laporan"
                    value="dd/mm/yyyy"
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
                <DropdownSelect
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
                ></DateSelector>
                <TextField label="No. Rujukan Surat" placeholder="-" />
                <DateSelector label="Tarikh Surat" {handleDateChange}
                ></DateSelector>
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Lapor Diri Kepada"
                    options={meetings}
                />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Butiran Penangguhan" />
                <TextField
                    label="Tarikh Asal Pertukaran"
                    value="dd/mm/yyyy"
                    disabled={true}
                ></TextField>
                <TextField
                    label="Tarikh Pertukaran yang Dipohon"
                    value="dd/mm/yyyy"
                    disabled={true}
                ></TextField>
                <LongTextField
                    label="Alasan Penangguhan"
                    value="Sedang Diproses"
                    disabled={true}
                ></LongTextField>
                <DownloadAttachment
                    label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                    fileName="surat_penangguhan_ariffin.pdf"
                />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader
            title="Status Permohonan Penangguhan/Pindaan Penempatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Butiran Penangguhan" />
                <TextField
                    label="Tarikh Asal Pertukaran"
                    value="dd/mm/yyyy"
                    disabled={true}
                />
                <TextField
                    label="Tarikh Pertukaran yang Dipohon"
                    value="dd/mm/yyyy"
                    disabled={true}
                />
                <LongTextField
                    label="Alasan Penangguhan"
                    value="Sedang Diproses"
                    disabled={true}
                />
                <DownloadAttachment
                    label="Surat Permohonan Penangguhan/Pindaan Penempatan"
                    fileName="surat_penangguhan_irfan"
                />
                <SectionHeader title="Keputusan Permohonan Penangguhan/Pindaan Penempatan" />
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Keputusan"
                    options={meetings}
                />
                <TextField label="Nama Pelulus" placeholder="-" />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Kemaskini Maklumat Pertukaran"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <DateSelector label="Tarikh Lapor Diri" handleDateChange />
                <TextField label="Penempatan Baru" placeholder="-" />
                <div class="my-2.5 text-base font-semibold">
                    Masukkan Nama Penyokong dan Pelulus
                </div>
                <TextField label="Name Penyokong" placeholder="-" />
                <TextField label="Name Pelulus" placeholder="-" />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Keputusan Pertukaran"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}
            ><SvgPaperAirplane /></TextIconButton></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader title="Keputusan Permohonan Pertukaran" />
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Keputusan"
                    options={meetings}
                />
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
