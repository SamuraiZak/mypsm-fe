<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';

    const options: RadioOption[] = [
        {
            value: 'ada',
            label: 'Ada',
        },
        {
            value: 'tidak ada',
            label: 'Tidak Ada',
        },
    ];

    let id: string = '193699';
    let status: string = 'Sedang Diproses';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tanggung Kerja"
        description="Borang Permohonan Tanggung Kerja"
        ><FormButton
            type="close"
            onClick={() => {
                goto('../');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Tanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <TextField label="Gred" placeholder="-" value="" />
                    <TextField label="Jawatan" placeholder="-" value="" />
                    <TextField
                        label="Kementrian/Jabatan"
                        placeholder="-"
                        value=""
                    />
                    <TextField
                        label="Nombor Butiran Anggaran Belanjawan Mengurus/Waran Penjawatan"
                        placeholder="-"
                        value=""
                    />
                    <DateSelector label="Tarikh Mula" handleDateChange />
                    <DateSelector label="Tarikh Tamat" handleDateChange />
                    <TextField
                        label="Tempat Kekosongan"
                        placeholder="-"
                        value=""
                    />
                    <LongTextField
                        label="Sebab-sebab Kekosongan"
                        placeholder="-"
                        value=""
                    />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pegawai yang Menanggung Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <TextField
                        label="Nama Pegawai"
                        disabled={true}
                        placeholder="-"
                        value="Mohd. Irfan Bin Abu"
                    />
                    <TextField
                        label="No. K/P"
                        disabled={true}
                        placeholder="-"
                        value="890701-13-5667"
                    />
                    <TextField
                        label="Tarikh Lantikan Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tarikh Sah Dalam Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Jawatan/Gred"
                        disabled={true}
                        placeholder="-"
                        value="F41 - Pegawai Teknologi Maklumat"
                    />
                    <TextField
                        label="Tarikh Mula Bertugas di Jawatan Sekarang"
                        disabled={true}
                        placeholder="-"
                        value="dd/mm/yyyy"
                    />
                    <TextField
                        label="Tempat Bertugas Semasa"
                        disabled={true}
                        placeholder="-"
                        value="Tempat 2"
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Tempoh Penanggungan Kerja"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja bagi Jawatan yang SAMA Sebelum Ini (Jika Ada)"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <DateSelector
                            labelType="label-fit"
                            label="Dari"
                            handleDateChange
                        />
                        <DateSelector
                            labelType="label-fit"
                            label="Hingga"
                            handleDateChange
                        />
                    </div>
                    <SectionHeader
                        title="Tempoh Penanggungan Kerja yang Diperakukan"
                    ></SectionHeader>
                    <div class="flex w-full gap-2">
                        <DateSelector
                            disabled
                            labelType="label-fit"
                            label="Dari"
                            handleDateChange
                        />
                        <DateSelector
                            disabled
                            labelType="label-fit"
                            label="Hingga"
                            handleDateChange
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Muat Naik Dokumen Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2">
                    <SectionHeader title="Sertakan:" />
                    <ul
                        class="w-full list-disc pl-4 text-sm text-txt-secondary"
                    >
                        <li>
                            Carta Organisasi (Kedudukan Pegawai dan jawatan yang
                            Ditanggung Kerja);
                        </li>
                        <li>Salinan Surat Arahan Penangguhan Kerja;</li>
                        <li>Maklumat Cuti yang Terkini;</li>
                        <li>
                            Senarai Tugas Jawatan Ditanggung Kerja dan Pegawai
                            Menanggung Kerja
                        </li>
                    </ul>
                    <FileInputField id="hello" />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Pelangkauan dari Segi Kekananan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <SectionHeader title="Pelangkauan dari Segi Kekananan"
                    ></SectionHeader>
                    <RadioSingle {options}></RadioSingle>
                    <LongTextField
                        label="Jika Ada, sila nyatakan sebab-sebab pelangkauan"
                        placeholder="-"
                        value=""
                    ></LongTextField>
                    <div class="w-full py-10">
                        <Checkbox
                            ><span class="font-semibold"
                                >Saya dengan ini mengesahkan bahawa maklumat
                                sebagaimana yang dinyatakan berikut adalah
                                benar.</span
                            ></Checkbox
                        >
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
