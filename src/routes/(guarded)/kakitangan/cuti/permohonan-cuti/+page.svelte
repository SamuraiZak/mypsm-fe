<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Checkbox } from 'flowbite-svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { categories } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/categories';
    import CutiGantian from './forms/CutiGantian.svelte';
    import CutiTanpaGaji from './forms/CutiTanpaGaji.svelte';
    import CutiSeparuhGaji from './forms/CutiSeparuhGaji.svelte';
    import CutiTanpaRekod from './forms/CutiTanpaRekod.svelte';
    import CutiBersalinAwal from './forms/CutiBersalinAwal.svelte';
    import CutiBersalinPegawai from './forms/CutiBersalinPegawai.svelte';
    import CutiIsteriBersalin from './forms/CutiIsteriBersalin.svelte';
    import CutiHaji from './forms/CutiHaji.svelte';
    import CutiKuarantin from './forms/CutiKuarantin.svelte';
    import CutiPenyakitTibi from './forms/CutiPenyakitTibi.svelte';
    import CutiPenyakitBarahDanKusta from './forms/CutiPenyakitBarahDanKusta.svelte';
    import CutiTanpaGajiMengikutPasangan from './forms/CutiTanpaGajiMengikutPasangan.svelte';
    import CutiSakitLanjutan from './forms/CutiSakitLanjutan.svelte';
    import CutiPerakuanTidakHadirKePejabat from './forms/CutiPerakuanTidakHadirKePejabat.svelte';
    import CutiKursusSambilan from './forms/CutiKursusSambilan.svelte';
    import CutiMenjagaAnakTanpaGaji from './forms/CutiMenjagaAnakTanpaGaji.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';
    import { onMount } from 'svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { _staffDetailSchema, _submitStaffDetailForm } from './+page';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';

    export let data: PageData;
    export let disabled: boolean = false;
    let selectedCuti = '';

    // ================ Stepper Control ==================
    let stepperIndex = 0;

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

    const uploadedFileSchema = z.object({
        uploadedFiles: z.any().array().nonempty({
            message: 'Sila muat naik dokumen - dokumen berkaitan.',
        }),
    });

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
                console.log(result);
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

    const { form, errors, enhance } = superForm(data.staffDetailForm, {
        SPA: true,
        validators: _staffDetailSchema,
        onSubmit() {
            _submitStaffDetailForm($form);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<ContentHeader
    title="Permohonan Cuti"
    description="Sila isi borang permohonan cuti di bawah dengan butiran yang tepat dan lengkap."
></ContentHeader>

<Stepper bind:activeIndex={stepperIndex}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>

        <!-- ========== STEPPER 1 ========== -->
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2">
                    <TextField
                        disabled
                        name="employeeNumber"
                        label={'No. Pekerja'}
                        bind:value={data.employeeDetails.employeeNumber}
                    ></TextField>
                    <TextField
                        disabled
                        name="staffName"
                        label={'Nama'}
                        bind:value={data.employeeDetails.name}
                    ></TextField>
                    <TextField
                        disabled
                        name="identificationNo"
                        label={'No. K/P'}
                        bind:value={data.employeeDetails.identityCardNumber}
                    ></TextField>
                    <TextField
                        disabled
                        name="grade"
                        label={'Gred'}
                        bind:value={data.employeeDetails.grade}
                    ></TextField>
                    <TextField
                        disabled
                        name="position"
                        label={'Jawatan'}
                        bind:value={data.employeeDetails.position}
                    ></TextField>
                    <TextField
                        disabled
                        name="placement"
                        label={'Penempatan'}
                        bind:value={data.employeeDetails.placement}
                    ></TextField>
                    <TextField
                        disabled
                        name="serviceGroup"
                        label={'Kumpulan'}
                        bind:value={data.employeeDetails.serviceGroup}
                    ></TextField>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>

    <!-- ========== STEPPER 2 ========== -->
    <StepperContent>
        <StepperContentHeader title="Maklumat Cuti">
            <TextIconButton primary label="Hantar" form="formValidation"
                ><SvgPaperAirplane /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex max-h-full w-full flex-col gap-2.5">
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Cuti"
                    options={data.leaveList}
                    bind:value={selectedCuti}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedCuti === 'Cuti Gantian'}
                    <CutiGantian {data}></CutiGantian>
                {:else if selectedCuti === 'Cuti Tanpa Rekod'}
                    <CutiTanpaRekod {data}></CutiTanpaRekod>
                {:else if selectedCuti === 'Cuti Separuh Gaji'}
                    <CutiSeparuhGaji {data}></CutiSeparuhGaji>
                {:else if selectedCuti === 'Cuti Tanpa Gaji'}
                    <CutiTanpaGaji {data}></CutiTanpaGaji>
                {:else if selectedCuti === 'Cuti Bersalin Awal'}
                    <CutiBersalinAwal {data}></CutiBersalinAwal>
                {:else if selectedCuti === 'Cuti Bersalin Pegawai'}
                    <CutiBersalinPegawai {data}></CutiBersalinPegawai>
                {:else if selectedCuti === 'Cuti Isteri Bersalin'}
                    <CutiIsteriBersalin {data}></CutiIsteriBersalin>
                {:else if selectedCuti === 'Cuti Haji'}
                    <CutiHaji {data}></CutiHaji>
                {:else if selectedCuti === 'Cuti Kuarantin'}
                    <CutiKuarantin {data}></CutiKuarantin>
                {:else if selectedCuti === 'Cuti Menjaga Anak Tanpa Gaji'}
                    <CutiMenjagaAnakTanpaGaji {data}></CutiMenjagaAnakTanpaGaji>
                {:else if selectedCuti === 'Cuti Kursus Sambilan'}
                    <CutiKursusSambilan {data}></CutiKursusSambilan>
                {:else if selectedCuti === 'Cuti Perakuan Tidak Hadir Ke Pejabat'}
                    <CutiPerakuanTidakHadirKePejabat {data}
                    ></CutiPerakuanTidakHadirKePejabat>
                {:else if selectedCuti === 'Cuti Sakit Lanjutan'}
                    <CutiSakitLanjutan {data}></CutiSakitLanjutan>
                {:else if selectedCuti === 'Cuti Tanpa Gaji Mengikut Pasangan'}
                    <CutiTanpaGajiMengikutPasangan {data}
                    ></CutiTanpaGajiMengikutPasangan>
                {:else if selectedCuti === 'Cuti Penyakit Barah Dan Kusta'}
                    <CutiPenyakitBarahDanKusta {data}
                    ></CutiPenyakitBarahDanKusta>
                {:else if selectedCuti === 'Cuti Penyakit Tibi'}
                    <CutiPenyakitTibi {data}></CutiPenyakitTibi>
                {/if}
            </div></StepperContentBody
        >
    </StepperContent>

    <!-- ========== STEPPER 3 ========== -->
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => submitFilesForm()}
                ><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
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
                    <span class="font-sans text-sm italic text-system-danger"
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
                <div class="flex flex-col items-center justify-center gap-2.5">
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

    <!-- ========== STEPPER 4 ========== -->
    <StepperContent>
        <StepperContentHeader title="Pengesahan">
            <TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/cuti/permohonan-cuti');
                }}><SvgPaperAirplane /></TextIconButton
            >
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="w-full py-5">
                    <Checkbox checked disabled
                        ><span class="font-semibold"
                            >Saya dengan ini mengesahkan bahawa maklumat
                            sebagaimana yang dinyatakan berikut adalah benar.</span
                        ></Checkbox
                    >
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
