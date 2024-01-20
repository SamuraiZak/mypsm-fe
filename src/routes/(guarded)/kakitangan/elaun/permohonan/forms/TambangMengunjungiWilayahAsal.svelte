<script lang="ts">
    import FormTable from '$lib/components/form-table/FormTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Modal } from 'flowbite-svelte';
    import { fareType } from '$lib/mocks/elaun/fareType';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { onMount } from 'svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _stepperTambangMengungjungiWilayahAsal,
        _submitTambangMengungjungiWilayahAsalForm,
        _submitAddMoreMaklumatKeluargaForm,
        _addMaklumatKeluargaInfoSchema,
    } from '../+page';
    import type { PageData } from '../$types';

    export let data: PageData;
    export let disabled: boolean = false;
    export let selectedFiles: any = [];
    export let openMaklumatKeluargaModal: boolean = false;
    let target: any;
    let texthidden = false;

    let selectedFareType: any = '';

    onMount(() => {
        target = document.getElementById('fileInput');
    });
    export let wilayahVal = '-';

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

    let famInfo = {
        name: '',
        age: 0,
        relationship: '',
    };

    // export let data: any[] = [{ ...famInfo }];

    const { form, errors, enhance } = superForm(
        data.TambangMengungjungiWilayahAsalForm,
        {
            SPA: true,
            validators: _stepperTambangMengungjungiWilayahAsal,
            onSubmit() {
                _submitTambangMengungjungiWilayahAsalForm($form);
            },
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        },
    );
    const {
        form: addMaklumatKeluargaModalForm,
        errors: addMaklumatKeluargaErrors,
        enhance: addmaklumatKeluargaEnhance,
    } = superForm(data.MaklumatKeluargaForm, {
        SPA: true,
        validators: _addMaklumatKeluargaInfoSchema,
        onSubmit() {
            _submitAddMoreMaklumatKeluargaForm($addMaklumatKeluargaModalForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
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
                <SectionHeader title="Tambang Mengunjungi Wilayah Asal"
                ></SectionHeader>
                <DropdownSelect
                    hasError={$errors.memohonUntuk ? true : false}
                    id="memohonUntuk"
                    options={fareType}
                    bind:value={$form.memohonUntuk}
                    dropdownType="label-left-full"
                    label="Memohon Untuk"
                ></DropdownSelect>
                {#if $errors.memohonUntuk}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.memohonUntuk}</span
                    >
                {/if}
                <LongTextField
                    hasError={$errors.wilayahAsal ? true : false}
                    name="wilayahAsal"
                    label="Wilayah Asal"
                    bind:value={$form.wilayahAsal}
                ></LongTextField>
                {#if $errors.wilayahAsal}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{$errors.wilayahAsal[0]}</span
                    >
                {/if}
            </div>
        </form>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
        >
            <SectionHeader title="Maklumat Keluarga"></SectionHeader>
            <div class="w-full rounded-[3px] border-b border-t p-2.5">
                <TextIconButton
                    primary
                    label="Tambah Maklumat Keluarga"
                    onClick={() => (openMaklumatKeluargaModal = true)}
                >
                    <SvgPlus></SvgPlus>
                </TextIconButton>
            </div>

            <FormTable sampleData={famInfo}></FormTable>
        </div>
        <!-- bind:data -->
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
    <p class="pb-5 text-sm text-system-danger">
        Sila muat naik dokumen sokongan anda pada ruangan yang disediakan di
        atas.
    </p>
</section>

<Modal title={'Tambah Maklumat Keluarga'} bind:open={openMaklumatKeluargaModal}>
    <form
        id="addNaklumatKeluargaModal"
        method="POST"
        use:addmaklumatKeluargaEnhance
        class="flex h-fit w-full flex-col gap-y-2"
    >
        <TextField
            hasError={!!$addMaklumatKeluargaErrors.namaKeluarga}
            {disabled}
            name="namaKeluarga"
            label={'Nama'}
            bind:value={$addMaklumatKeluargaModalForm.namaKeluarga}
        ></TextField>
        {#if $addMaklumatKeluargaErrors.namaKeluarga}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addMaklumatKeluargaErrors.namaKeluarga}</span
            >
        {/if}
        <TextField
            hasError={!!$addMaklumatKeluargaErrors.umurKeluarga}
            {disabled}
            name="umurKeluarga"
            label={'Umur'}
            bind:value={$addMaklumatKeluargaModalForm.umurKeluarga}
        ></TextField>
        {#if $addMaklumatKeluargaErrors.umurKeluarga}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addMaklumatKeluargaErrors.umurKeluarga}</span
            >
        {/if}
        <TextField
            hasError={!!$addMaklumatKeluargaErrors.hubunganKeluarga}
            {disabled}
            name="year"
            label={'Hubungan'}
            bind:value={$addMaklumatKeluargaModalForm.hubunganKeluarga}
        ></TextField>
        {#if $addMaklumatKeluargaErrors.hubunganKeluarga}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$addMaklumatKeluargaErrors.hubunganKeluarga}</span
            >
        {/if}

        <TextIconButton
            primary
            label={'Simpan'}
            form="addNaklumatKeluargaModal"
        />
    </form>
</Modal>
