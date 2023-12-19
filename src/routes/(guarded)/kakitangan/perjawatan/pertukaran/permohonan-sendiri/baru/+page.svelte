<!-- Add your changes to the commented parts -->

<script lang="ts">
    import DropdownField from '$lib/components/input/DropdownSelect.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import { Badge, Checkbox } from 'flowbite-svelte';
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
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';

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
                <DropdownField
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
                />
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
                <DropdownField
                    dropdownType="label-left-full"
                    label="Status Berkahwin"
                    id="dropdown"
                    options={[
                        { value: '1', name: 'Semua' },
                        { value: '2', name: '1/12' },
                        { value: '3', name: '1/102' },
                        { value: '4', name: '2/101' },
                    ]}
                />
                <TextField
                    label="Bilangan Anak"
                    placeholder="-"
                    disabled={false}
                ></TextField>
                <TextField
                    label="Bilangan Anak Bersekolah"
                    placeholder="-"
                    disabled={false}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Maklumat Perkhidmatan"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <TextField
                    label="Nama Jawatan"
                    value="Urus Setia"
                    disabled={true}
                ></TextField>
                <TextField label="Gred" value="3.97" disabled={true}
                ></TextField>
                <TextField
                    label="Tarikh Lantikan"
                    value="19/7/2023"
                    disabled={true}
                ></TextField>
                <TextField label="Nama Jabatan" placeholder="-" disabled={false}
                ></TextField>
                <TextField
                    label="Alamat Jabatan"
                    placeholder="-"
                    disabled={false}
                ></TextField>
                <TextField
                    label="Bahagian / Unit"
                    placeholder="-"
                    disabled={false}
                ></TextField>
                <TextField
                    label="Tempoh Perkhidmatan (Tahun)"
                    placeholder="-"
                    disabled={false}
                ></TextField>
                <TextField
                    label="Di Penempatan Sekarang (Bulan)"
                    placeholder="-"
                    disabled={false}
                ></TextField>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Alasan Pertukaran"></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-row text-sm">
                    <div class="w-1/4">
                        <span class="font-semibold">Alasan Pertukaran</span>
                    </div>
                    <div class="w-3/4">
                        <div class="flex w-full">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <Checkbox />
                                <div>Mengikut Pasangan</div>
                            </div>
                            <div class="w-2/3">
                                <Textarea
                                    placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                ></Textarea>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <Checkbox />
                                <div>Mengikut Ibu/Bapa yang Uzur/Sakit</div>
                            </div>
                            <div class="w-2/3">
                                <Textarea
                                    placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                ></Textarea>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <Checkbox />
                                <div>Ancaman Keselamatan</div>
                            </div>
                            <div class="w-2/3">
                                <Textarea
                                    placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                ></Textarea>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <Checkbox />
                                <div>Kes Kesihatan Kronik Pemohon</div>
                            </div>
                            <div class="w-2/3">
                                <Textarea
                                    placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                ></Textarea>
                            </div>
                        </div>
                        <div class="flex w-full">
                            <div
                                class="flex w-1/3 flex-row items-start pt-4 text-sm"
                            >
                                <Checkbox />
                                <div>Lain-lain (Sila Nyatakan)</div>
                            </div>
                            <div class="w-2/3">
                                <Textarea
                                    placeholder="Sila taip jawapan anda dalam ruangan ini"
                                    class="border-1 active:border-1 w-full rounded-[3px] border-bdr-primary bg-bgr-primary text-[12px] placeholder:text-txt-tertiary hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                                ></Textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <SectionHeader
                    title="Sekiranya alasan pertukaran pemohon kerana Mengikut Pasangan
                sila isikan maklumat pasangan seperti berikut:"
                ></SectionHeader>
                <TextField
                    label="Jarak Tempat Kerja (km)"
                    placeholder="-"
                    disabled={false}
                ></TextField>
                <TextField label="Nama Majikan" placeholder="-" disabled={false}
                ></TextField>
                <DateSelector
                    label="Tarikh Mula Berkhidmat di Penempatan Sekarang"
                    {handleDateChange}
                />
                <FileInputField id="hello" />
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('../');
                }}><SvgPaperAirplane></SvgPaperAirplane></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <SectionHeader
                    title="Sila sahkan permohonan anda sebelum hantar"
                ></SectionHeader>
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
                <DateSelector label="Tarikh" {handleDateChange} />
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
