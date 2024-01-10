<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import { categories } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/categories';
    import CutiGantian from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiGantian.svelte';
    import CutiTanpaRekod from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaRekod.svelte';
    import CutiSeparuhGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiSeparuhGaji.svelte';
    import CutiTanpaGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaGaji.svelte';
    import CutiBersalinAwal from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiIsteriBersalin.svelte';
    import CutiHaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiHaji.svelte';
    import CutiKuarantin from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiKuarantin.svelte';
    import CutiMenjagaAnakTanpaGaji from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiMenjagaAnakTanpaGaji.svelte';
    import CutiKursusSambilan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiKursusSambilan.svelte';
    import CutiPerakuanTidakHadirKePejabat from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPerakuanTidakHadirKePejabat.svelte';
    import CutiSakitLanjutan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiSakitLanjutan.svelte';
    import CutiTanpaGajiMengikutPasangan from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiTanpaGajiMengikutPasangan.svelte';
    import CutiPenyakitBarahDanKusta from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPenyakitBarahDanKusta.svelte';
    import CutiPenyakitTibi from '../../../../penyokong/cuti/permohonan-cuti/butiran-cuti-gantian/forms/CutiPenyakitTibi.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { onMount } from 'svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { uploadedFileSchema } from './form-schema';
    import { ZodError } from 'zod';

    let selectedCuti = '';

    const options: RadioOption[] = [
        {
            value: 'luls',
            label: 'Lulus',
        },
        {
            value: 'tidakLulus',
            label: 'Tidak Lulus',
        },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];

    // Function to handle the file changes
    let selectedFiles: File[] = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });
    function handleOnChange() {
        texthidden = true;
        const files = target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                selectedFiles.push(files[i]);
            }
        }

        fileSelectionList.set(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
    }

    // ============== Form Validation ================
    let errorData: any;
    //File uploaded validation
    const submitFilesForm = async () => {
        let uploadedFiles = selectedFiles;
        const uploadedFileData = {
            uploadedFiles: uploadedFiles,
        };

        try {
            const result = uploadedFileSchema.parse(uploadedFileData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error('Sila pastikan dokumen telah dimuat naik.', {
                    style: 'background: #333; color: #fff;',
                });
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Cuti Gantian"
        description="Sila semak maklumat-maklumat permohonan cuti tanpa rekod berikut untuk sokongan"
    >
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/penyokong/cuti/permohonan-cuti');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            label="Nama"
                            disabled={true}
                            placeholder="-"
                            value="Abu Bin Ali"
                        />
                        <TextField
                            label="No. K/P"
                            disabled={true}
                            placeholder="-"
                            value="870121-21-4531"
                        />
                        <TextField
                            label="No. Pekerja"
                            disabled={true}
                            placeholder="-"
                            value="123456"
                        />
                        <TextField
                            label="Gred"
                            disabled={true}
                            placeholder="-"
                            value="F41 - Pegawai Teknologi Maklumat"
                        />
                        <TextField
                            label="Penempatan"
                            disabled={true}
                            placeholder="-"
                            value="123 - Bhgn. Teknologi Maklumat"
                        />
                        <TextField
                            label="Kumpulan"
                            disabled={true}
                            placeholder="-"
                            value="PP1 - Pengurusan dan Professional - A"
                        />
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Cuti"></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col gap-2.5 border-b border-bdr-primary pb-5"
                >
                    <DropdownSelect
                        dropdownType="label-left-full"
                        label="Jenis Cuti"
                        options={categories.filter(
                            (cat) => cat.name != 'Semua',
                        )}
                        bind:value={selectedCuti}
                        onSelect={() => {}}
                    ></DropdownSelect>

                    {#if selectedCuti === 'Cuti Gantian'}
                        <CutiGantian></CutiGantian>
                    {:else if selectedCuti === 'Cuti Tanpa Rekod'}
                        <CutiTanpaRekod></CutiTanpaRekod>
                    {:else if selectedCuti === 'Cuti Separuh Gaji'}
                        <CutiSeparuhGaji></CutiSeparuhGaji>
                    {:else if selectedCuti === 'Cuti Tanpa Gaji'}
                        <CutiTanpaGaji></CutiTanpaGaji>
                    {:else if selectedCuti === 'Cuti Bersalin Awal'}
                        <CutiBersalinAwal></CutiBersalinAwal>
                    {:else if selectedCuti === 'Cuti Bersalin Pegawai'}
                        <CutiBersalinPegawai></CutiBersalinPegawai>
                    {:else if selectedCuti === 'Cuti Isteri Bersalin'}
                        <CutiIsteriBersalin></CutiIsteriBersalin>
                    {:else if selectedCuti === 'Cuti Haji'}
                        <CutiHaji></CutiHaji>
                    {:else if selectedCuti === 'Cuti Kuarantin'}
                        <CutiKuarantin></CutiKuarantin>
                    {:else if selectedCuti === 'Cuti Menjaga Anak Tanpa Gaji'}
                        <CutiMenjagaAnakTanpaGaji></CutiMenjagaAnakTanpaGaji>
                    {:else if selectedCuti === 'Cuti Kursus Sambilan'}
                        <CutiKursusSambilan></CutiKursusSambilan>
                    {:else if selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat'}
                        <CutiPerakuanTidakHadirKePejabat
                        ></CutiPerakuanTidakHadirKePejabat>
                    {:else if selectedCuti === 'Cuti Sakit Lanjutan'}
                        <CutiSakitLanjutan></CutiSakitLanjutan>
                    {:else if selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'}
                        <CutiTanpaGajiMengikutPasangan
                        ></CutiTanpaGajiMengikutPasangan>
                    {:else if selectedCuti === 'Cuti Penyakit Barah Dan Kusta'}
                        <CutiPenyakitBarahDanKusta></CutiPenyakitBarahDanKusta>
                    {:else if selectedCuti === 'Cuti Penyakit Tibi'}
                        <CutiPenyakitTibi></CutiPenyakitTibi>
                    {/if}
                </div></StepperContentBody
            >
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Dokumen Sokongan"
                ><TextIconButton
                    primary
                    label="test validation"
                    onClick={() => submitFilesForm()}
                /></StepperContentHeader
            >
            <StepperContentBody>
                <div class="flex w-full flex-col"></div>
                <SectionHeader subTitle="Dokumen Sokongan"
                    ><div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div></SectionHeader
                >
                <div class="w-full">
                    {#if errorData?.uploadedFiles}
                        <span
                            class="font-sans text-sm italic text-system-danger"
                            >{errorData?.uploadedFiles[0]}</span
                        >
                    {/if}
                </div>
                <div
                    class="border-bdr-primaryp-5 flex h-fit w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5"
                >
                    <div class="flex flex-wrap gap-3">
                        {#each $fileSelectionList as item, index}
                            <FileInputFieldChildren
                                childrenType="grid"
                                handleDelete={() => handleDelete(index)}
                                fileName={item.name}
                            />
                        {/each}
                    </div>
                    <div
                        class="flex flex-col items-center justify-center gap-2.5"
                    >
                        <p
                            class=" text-sm text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            Pilih fail dari peranti anda.
                        </p>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        >
                            <svg
                                width={40}
                                height={40}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                />
                            </svg>
                        </div>
                        <div hidden={$fileSelectionList.length > 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div>
                    </div>
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Pengesahan"></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <div class="w-full py-5">
                        <Checkbox checked disabled
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
        <StepperContent>
            <StepperContentHeader title="Ulasan Kelulusan Urus Setia"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    color="system-primary"
                    title="*Keputusan akan dihantar ke email klinik dan Urus Setia berkaitan"
                ></SectionHeader>
                <LongTextField
                    disabled
                    label="Tindakan/Ulasan"
                    placeholder="-"
                    value="Butiran Lengkap"
                />
                <RadioSingle {options} disabled />
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Penyokongan Permohonan"
                ><TextIconButton
                    primary
                    label="Hantar"
                    onClick={() => {
                        goto('/penyokong/cuti/permohonan-cuti');
                    }}
                >
                    <SvgPaperAirplane></SvgPaperAirplane>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Keputusan daripada Penyokong"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <LongTextField
                        disabled
                        label="Tindakan/Ulasan"
                        value="butiran lengkap"
                        placeholder="-"
                    ></LongTextField>
                    <RadioSingle options={supportOptions} disabled />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
