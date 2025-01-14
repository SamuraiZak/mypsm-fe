<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import { onMount } from 'svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _submitLeaveReplacementForm, _staffDetailSchema } from './+page';
    export let data: PageData;

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
        $form.uploadedFiles.push(selectedFiles);
    }

    // Function to handle the file deletion
    function handleDelete(index: number) {
        selectedFiles.splice(index, 1);
        fileSelectionList.set(selectedFiles);
        $form.uploadedFiles.pop();
    }

    // ==================================
    // Form Validation ==================
    // ==================================
    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: false,
        onSubmit() {
            _submitLeaveReplacementForm();
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<ContentHeader
    title="Gantian Cuti Rehat"
    description="Maklumat berkaitan Gantian Cuti Rehat (GCR)"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/cuti/gantian-cuti-rehat');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Kakitangan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col gap-2"
                >
                    <p class="text-sm font-bold">Maklumat Kakitangan</p>
                    <TextField
                        disabled
                        id="nama"
                        label={'Nama'}
                        bind:value={data.gcrWithdrawalEmployeeDetail.name}
                    ></TextField>
                    <TextField
                        disabled
                        id="noKadPengenalan"
                        label={'No. K/P'}
                        bind:value={data.gcrWithdrawalEmployeeDetail
                            .identityCard}
                    ></TextField>
                    <TextField
                        disabled
                        id="noPekerja"
                        label={'No. Pekerja'}
                        bind:value={data.gcrWithdrawalEmployeeDetail
                            .employeeNumber}
                    ></TextField>
                    <TextField
                        disabled
                        id="noPekerja"
                        label={'Gred'}
                        bind:value={data.gcrWithdrawalEmployeeDetail.grade}
                    ></TextField>
                    <TextField
                        disabled
                        id="noPekerja"
                        label={'Penempatan'}
                        bind:value={data.gcrWithdrawalEmployeeDetail.placement}
                    ></TextField>
                    <TextField
                        disabled
                        id="noPekerja"
                        label={'Kumpulan'}
                        bind:value={data.gcrWithdrawalEmployeeDetail.group}
                    ></TextField>
                </form>
            </div>
        </StepperContentBody>
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Butiran GCR Sedia Ada"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Butiran GCR Sedia Ada</p>
                <TextField
                    disabled
                    id="jumlahGcrTerkumpul"
                    label={'Jumlah GCR Terkumpul'}
                    bind:value={data.gcrDetail.accumulatedLeave}
                ></TextField>
                <TextField
                    disabled
                    id="jumlahLayakUntukPengeluaran"
                    label={'Jumlah Layak Untuk Pengeluaran'}
                    bind:value={data.gcrDetail.leaveWithdrawal}
                ></TextField>
                <TextField
                    disabled
                    id="bakiSelepasPengeluaran"
                    label={'Baki Selepas Pengeluaran'}
                    bind:value={data.gcrDetail.leaveBalance}
                ></TextField>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm">Syarat-Syarat Pengeluaran Awal GCR</p>
                <ul class="list-inside list-disc text-sm">
                    <li>
                        Tempoh perkhidmatan pegawai tidak kurang daripada 15
                        tahun
                    </li>
                    <li>
                        Pegawai telah mencapai umur 45 tahun semasa permohonan
                        dibuat
                    </li>
                    <li>Jumlah terkumpul GCR 90 hari</li>
                    <li>
                        Bebas daripada prosiding jenayah atau tindakan
                        tatatertib
                    </li>
                    <li>Mendapat perakuan daripada Ketua Jabatan</li>
                    <li>
                        Pemberian awal award wang tunai GCR sebanyak 90 hari
                        hanya boleh dibuat sekali sahaja sepanjang perkhidmatan
                        pegawai
                    </li>
                </ul>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Dokumen Sokongan"
            ><TextIconButton primary label="Hantar" form="formValidation"
                ><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm font-bold">
                        Sila Muat Naik Dokumen yang Berkaitan
                    </p>
                    <ul class="list-inside list-disc text-sm">
                        <li>
                            Satu (1) Salinan Rekod Kenyataan Perkhidmatan yang
                            Terkini
                        </li>
                        <li>Satu (1) Salinan Kenyataan Cuti</li>
                        <li>Dua (2) Salinan Penyata Kiraan Cuti</li>
                        <li>Satu (1) Salinan Kad Pengenalan</li>
                        <li>Lain-lain dokumen sokongan</li>
                    </ul>
                </div>
                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col gap-2"
                >
                    <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div>
                    <div class="w-full">
                        {#if $fileSelectionList.length === 0}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >Sila muat naik dokumen barkaitan.</span
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
                </form>
                <div class="flex w-full flex-col gap-2">
                    <p class="text-sm">Fail-fail yang dimuat naik:</p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Kenyataan-Perkhidmatan.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Kenyataan-Cuti.pdf"
                            />
                        </li>
                        <li>
                            <DownloadAttachment
                                fileName="Salinan-Penyata-Kiraan-Cuti.pdf"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
