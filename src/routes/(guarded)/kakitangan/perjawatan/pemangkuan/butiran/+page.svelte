<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';
    import SvgArrowRight from '$lib/assets/svg/SvgArrowRight.svelte';
    import SvgCircleF2 from '$lib/assets/svg/SvgCircleF2.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';
    import FileInputFieldChildren from '$lib/components/input/FileInputFieldChildren.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { fileSelectionList } from '$lib/stores/globalState';
    import { error } from '@sveltejs/kit';
    import { onMount } from 'svelte';
    import { Toaster } from 'svelte-french-toast';
    import {
        _amendmentOfPlacementApplicationSchema,
        _submitActingDirectorResultForm,
    } from './+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

    let checkedItems: Object[] = [];

    //===================== Stepper controls =====================
    let stepperIndex = 0;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    //Date Selector for Tarikh Lapor Diri - Kemaskini Keputusan Mesyuarat Penempatan Kakitangan
    let selectedDate = new Date();

    //upload files for Kemaskini Maklumat Temuduga
    export let selectedFiles: any = [];
    let target: any;
    let texthidden = false;

    onMount(() => {
        target = document.getElementById('fileInput');
    });
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
    }

    // ==================================
    // Form Validation ==================
    // ==================================
    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _amendmentOfPlacementApplicationSchema,
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });

</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Butiran Tawaran Pemangkuan"
        description="Memaparkan butiran tawaran"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/kakitangan/perjawatan/pemangkuan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'PMGK-1234'}
        dataStatus={'Status: Sedang Diproses'}
    >
        <!-- Panggilan Temuduga -->
        <StepperContent>
            <StepperContentHeader title="Panggilan Temuduga">
                <TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}><SvgArrowRight /></TextIconButton
                >
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Butiran Temuduga"></SectionHeader>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Surat Panggilan Temuduga</label
                        >
                    </div>

                    <DownloadAttachment
                        fileName={'Surat_panggilan_temuduga_irfan.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Borang Perakuan Pendidikan</label
                        >
                    </div>

                    <DownloadAttachment
                        fileName={'Borang_perakuan_pendidikan.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Dokumen Tambahan #1</label
                        >
                    </div>

                    <DownloadAttachment fileName={'Dokumen Tambahan #1.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <span class="text-sm font-bold text-txt-tertiary">
                        Tahniah!
                        <span class="text-sm font-medium text-txt-tertiary">
                            Anda berjaya dipanggil untuk temuduga. <br />
                            Sila hadirkan diri ke temuduga mengikut butiran temuduga
                            seperti yang tertera di atas. <br />
                            Sila bawa dokumen yang berkaitan ke temuduga tersebut.
                        </span>
                    </span>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Mesyuarat -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat">
                <TextIconButton label="Kembali" onClick={() => goPrevious()}
                    ><SvgArrowLeft /></TextIconButton
                ><TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}><SvgArrowRight /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                <TextField
                    disabled
                    labelBlack={false}
                    id="gred"
                    label={'Gred'}
                    value={'N32'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="jawatan"
                    label={'Jawatan'}
                    value={'Setiausaha Pejabat'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tarikh-berkuatkuasa"
                    label={'Tarikh Berkuatkuasa'}
                    value={'20/10/2023'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="penempatan-baru"
                    label={'Penempatan Baru'}
                    value={'LKIM SARAWAK - KUCHING'}
                ></TextField>

                <SectionHeader
                    title="Dokumen-dokumen yang perlu dimuat turun dan diisi"
                ></SectionHeader>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Surat Tawaran Pemangkuan</label
                        >
                    </div>

                    <DownloadAttachment
                        fileName={'Surat_tawaran_pemangkuan.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Surat Setuju Terima</label
                        >
                    </div>

                    <DownloadAttachment fileName={'Surat_setuju_terima.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Borang Lapor Diri</label
                        >
                    </div>

                    <DownloadAttachment fileName={'Borang_lapor_diri.pdf'}
                    ></DownloadAttachment>
                </div>
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Nota Serah Tugas</label
                        >
                    </div>

                    <DownloadAttachment fileName={'Nota_serah_tugas.pdf'}
                    ></DownloadAttachment>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Permohonan Penangguhan/Pindaan Penempatan -->
        <StepperContent>
            <StepperContentHeader
                title="Permohonan Penangguhan/Pindaan Penempatan"
            >
                <TextIconButton label="Kembali" onClick={() => goPrevious()}
                    ><SvgArrowLeft /></TextIconButton
                ><TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}><SvgArrowRight /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Permohonan Penangguhan/Pindaan Penempatan"
                ></SectionHeader>

                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    on:submit|preventDefault={_submitActingDirectorResultForm}
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={$errors.amendmentDropdown ? true : false}
                        id="amendmentDropdown"
                        label="Adakah anda memerlukan penangguhan/Pindaan Penempatan?"
                        labelBlack={false}
                        dropdownType="label-left-full"
                        bind:value={$form.amendmentDropdown}
                        options={[
                            { value: 'true', name: 'Ya' },
                            { value: 'false', name: 'Tidak' },
                        ]}
                    />
                    {#if $errors.amendmentDropdown}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.amendmentDropdown[0]}</span
                        >
                    {/if}

                    <DateSelector
                        hasError={$errors.requestedReportingDate ? true : false}
                        name="requestedReportingDate"
                        labelBlack={false}
                        label={'Tarikh Lapor Diri yang Dipohon'}
                        bind:selectedDate={$form.requestedReportingDate}
                    />
                    {#if $errors.requestedReportingDate}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.requestedReportingDate[0]}</span
                        >
                    {/if}

                    <DropdownSelect
                        hasError={$errors.requestedPlacementAmendment
                            ? true
                            : false}
                        id="requestedPlacementAmendment"
                        label="Pindaan Penempatan Dipohon"
                        labelBlack={false}
                        dropdownType="label-left-full"
                        bind:value={$form.requestedPlacementAmendment}
                        options={[
                            { value: 'true', name: 'Ya' },
                            { value: 'false', name: 'Tidak' },
                        ]}
                    />
                    {#if $errors.requestedPlacementAmendment}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.requestedPlacementAmendment[0]}</span
                        >
                    {/if}
                </form>

                <SectionHeader title="Dokumen-Dokumen yang Berkaitan">
                    <div hidden={$fileSelectionList.length == 0}>
                        <FileInputField id="fileInput" {handleOnChange}
                        ></FileInputField>
                    </div>
                </SectionHeader>
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
                            Seret dan lepas fail anda ke dalam ruangan ini atau
                            pilih fail dari peranti anda
                        </p>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="text-txt-tertiary"
                            hidden={$fileSelectionList.length > 0}
                        ></div>
                        <div hidden={$fileSelectionList.length > 0}>
                            <FileInputField id="fileInput" {handleOnChange}
                            ></FileInputField>
                        </div>
                    </div>
                </div>
                <SuperDebug data={$form} />
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
                ><TextIconButton label="Kembali" onClick={() => goPrevious()}
                    ><SvgArrowLeft /></TextIconButton
                ><TextIconButton
                    primary
                    label="Seterusnya"
                    onClick={() => goNext()}><SvgArrowRight /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <!-- <SectionHeader title="Semak keputusan"></SectionHeader> -->
                <SectionHeader
                    title="Butiran Permohonan Penangguhan/Pindaan Penempatan"
                />
                <TextField
                    disabled
                    labelBlack={false}
                    id="memerlukan-penangguhan"
                    label={'Adakah anda memerlukan penangguhan?'}
                    value={'Ya'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="alamat-penangguhan"
                    label={'Alamat Penangguhan'}
                    value={'Urusan pindah rumah'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tarikh-lapor-diri"
                    label={'Tarikah Lapor Diri yang Dipohon'}
                    value={'30/10/2023'}
                ></TextField>
                <DropdownSelect
                    id="position-dropdown"
                    label="Pindaan Penempatan Dipohon"
                    disabled
                    labelBlack={false}
                    dropdownType="label-left-full"
                    options={[
                        {
                            value: 'Bahagian Teknologi',
                            name: 'Bahagian Teknologi',
                        },
                    ]}
                />

                <SectionHeader title="Keputusan Mesyuarat" />
                <TextField
                    disabled
                    labelBlack={false}
                    id="keputusan"
                    label={'Keputusan'}
                    value={'Lulus'}
                ></TextField>
                <DropdownSelect
                    id="kelulusan-pindaan-penempatan-dipohon"
                    label="Kelulusan Pindaan Penempatan Dipohon"
                    disabled
                    labelBlack={false}
                    dropdownType="label-left-full"
                    options={[
                        {
                            value: 'Bahagian Teknologi',
                            name: 'Bahagian Teknologi',
                        },
                    ]}
                />
                <DateSelector
                    disabled
                    handleDateChange
                    labelBlack={false}
                    label={'Kelulusan Tarikh Lapor Diri Baru'}
                />
                <div class="flex w-full flex-row items-center justify-between">
                    <div class="flex w-[220px] min-w-[220px] flex-row gap-2">
                        <label
                            for=""
                            class="text-sm font-medium text-txt-tertiary"
                            >Surat Penangguhan Rayuan</label
                        >
                    </div>

                    <DownloadAttachment
                        fileName={'Surat_kelulusan_penangguhan_rayuan.pdf'}
                    ></DownloadAttachment>
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Akhir Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Akhir Pemangkuan"
                ><TextIconButton label="Kembali" form="formValidation"
                    ><SvgArrowLeft /></TextIconButton
                ><TextIconButton primary label="Selesai" form="formValidation"
                    ><SvgCircleF2 /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <!-- <SectionHeader title="Butiran Keputusan Akhir Pemangkuan"
                ></SectionHeader> -->
                <SectionHeader title="Butiran Pemangkuan" />
                <TextField
                    disabled
                    labelBlack={false}
                    id="gred"
                    label={'Gred'}
                    value={'N32'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="jawatan"
                    label={'Jawatan'}
                    value={'Setiausaha Pejabat'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tarikh-berkuatkuasa"
                    label={'Tarikh Berkuatkuasa'}
                    value={'20/10/2023'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="penempatan-baru"
                    label={'Penempatan Baru'}
                    value={'LKIM SARAWAK - KUCHING'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="pengarah-baru"
                    label={'Pengarah Baru'}
                    value={'Anuar Bukhari'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="tarikh-lapor-diri"
                    label={'Tarikh Lapor Diri'}
                    value={'30/10/2023'}
                ></TextField>

                <SectionHeader title="Pengesahan Keputusan" />
                <TextField
                    disabled
                    labelBlack={false}
                    id="nama-penyokong"
                    label={'Nama Penyokong'}
                    value={'Micheal Page'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="keputusan"
                    label={'Keputusan'}
                    value={'Disokong'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="nama-pelulus"
                    label={'Nama Pelulus'}
                    value={'Mohd Affendi Hakim'}
                ></TextField>
                <TextField
                    disabled
                    labelBlack={false}
                    id="keputusan"
                    label={'Keputusan'}
                    value={'Diluluskan'}
                ></TextField>

                <div class="flex w-full flex-row items-center justify-between">
                    <span class="text-sm font-medium text-txt-tertiary">
                        Tahniah! Anda boleh menyemak perubahan pada gaji dan
                        buku rekod perkhidmatan anda. Sila hubungi Urus Setia
                        berkenaan jika ada sebarang pertanyaan mengenai
                        perubahan tersebut.
                    </span>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>

<Toaster />
