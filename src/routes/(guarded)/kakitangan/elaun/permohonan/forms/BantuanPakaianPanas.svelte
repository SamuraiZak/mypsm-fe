<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperBantuanPakaianPanas,
        _submitPakaianPanasForm,
    } from '../+page';
    import type { PageData } from '../$types';
    export let data: PageData;

    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });
    export let reasonVal = '-';
    export let selfAmount: any = '-';

    // Function to handle the file changes
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
    const { form, errors, enhance } = superForm(
        data.bantuanPakaianPanasForm,
        {
            SPA: true,
            validators: _stepperBantuanPakaianPanas,
            onSubmit() {
                _submitPakaianPanasForm($form);
            },
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        },
    );
    let errorData: any;

</script>

<section>
    <div>
        <form
            id="formValidation"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Bantuan Pakaian Panas"></SectionHeader>
        <LongTextField
        hasError={$errors.tujuanPermohonan ? true : false}
        name="tujuanPermohonan"
        label="Tujuan Permohonan"
        bind:value={$form.tujuanPermohonan}
        ></LongTextField>
        {#if $errors.tujuanPermohonan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.tujuanPermohonan[0]}</span
                    >
                {/if}
    </div>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Amaun"></SectionHeader>
        <TextField
        hasError={$errors.jumlahTuntutan ? true : false}
        name="jumlahTuntutan"
        label="Jumlah Tuntutan"
        bind:value={$form.jumlahTuntutan}
        ></TextField>
        {#if $errors.jumlahTuntutan}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.jumlahTuntutan[0]}</span
                    >
                {/if}


    </div>
    <!-- Document Upload -->
    <div
        class="flex max-h-full w-full flex-col items-center justify-center gap-2.5 pb-5 pt-5"
    >
        <SectionHeader title="Dokumen Sokongan"
            ><div hidden={$fileSelectionList.length == 0}>
                <FileInputField id="fileInput" {handleOnChange}
                ></FileInputField>
            </div></SectionHeader
        >
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
    </div>
    </form>
    </div>
    <p class="text-sm text-system-danger pb-5">
        Sila muat naik dokumen sokongan anda pada ruangan yang disediakan di
        atas.
    </p>
</section>

