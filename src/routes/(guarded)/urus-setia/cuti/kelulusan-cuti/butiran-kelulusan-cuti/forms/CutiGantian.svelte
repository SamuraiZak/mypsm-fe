<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { namaPengganti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/nama-pengganti';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import BekerjaLebihMasa from './BekerjaLebihMasa.svelte';
    import TugasTugasRasmiYangJatuhPadaHariCuti from './TugasTugasRasmiYangJatuhPadaHariCuti.svelte';
    import { jenisGantian } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/jenis-gantian';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';
    import { Checkbox } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _replacementLeaveSchema1,
        _replacementLeaveSchema2,
        _replacementLeaveSchema3,
        _replacementLeaveSchema4,
        _submitReplacementLeaveForm,
    } from '../+page';

    export let data: PageData;
    let selectedJenisGantian = '';
    let hasHalfDayStartDate: boolean = false;
    let hasHalfDayEndDate: boolean = false;

    // ==================================
    // Form Validation ==================
    // ==================================
    const { form, errors, enhance, options } = superForm(
        data.replacementLeaveForm,
        {
            SPA: true,
            onSubmit() {
                _submitReplacementLeaveForm(
                    $form,
                    hasHalfDayStartDate,
                    hasHalfDayEndDate,
                );
            },
            taintedMessage:
                'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
        },
    );

    $: if (hasHalfDayStartDate && !hasHalfDayEndDate) {
        options.validators = _replacementLeaveSchema2;
    } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
        options.validators = _replacementLeaveSchema3;
    } else if (hasHalfDayEndDate && hasHalfDayStartDate) {
        options.validators = _replacementLeaveSchema4;
    } else if (!hasHalfDayStartDate && !hasHalfDayEndDate) {
        options.validators = _replacementLeaveSchema1;
    }

</script>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <CustomTab>
        <CustomTabContent title="Maklumat Gantian">
            <SectionHeader title="Cuti Gantian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-5"
            >
                <form
                    id="formValidation"
                    method="POST"
                    use:enhance
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={$errors.substituteName ? true : false}
                        id="substituteName"
                        options={namaPengganti}
                        bind:value={$form.substituteName}
                        dropdownType="label-left-full"
                        label="Nama Pengganti / Gred"
                    ></DropdownSelect>
                    {#if $errors.substituteName}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.substituteName}</span
                        >
                    {/if}
                    <div
                        class="flex w-full flex-row items-center justify-start gap-2.5"
                    >
                        <div class="flex w-full flex-col">
                            <DateSelector
                                hasError={$errors.startDate ? true : false}
                                name="startDate"
                                handleDateChange
                                bind:selectedDate={$form.startDate}
                                label="Tarikh Mula"
                            ></DateSelector>
                            {#if $errors.startDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$errors.startDate}</span
                                >
                            {/if}
                        </div>
                        <Checkbox
                            name="hasHalfDayStartDate"
                            bind:checked={hasHalfDayStartDate}
                            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                            for="hasHalfDayStartDate"
                            class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Setengah Hari</label
                        >
                        <div class="flex w-full flex-col">
                            <DropdownSelect
                                hasError={$errors.halfDayStartDate
                                    ? true
                                    : false}
                                id="halfDayStartDate"
                                disabled={!hasHalfDayStartDate}
                                options={setengahHari}
                                bind:value={$form.halfDayStartDate}
                                dropdownType="noLabel"
                                label=""
                            ></DropdownSelect>
                            {#if $errors.halfDayStartDate}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{$errors.halfDayStartDate}</span
                                >
                            {/if}
                        </div>
                    </div>
                    <div
                        class="flex w-full flex-row items-center justify-start gap-2.5"
                    >
                        <div class="flex w-full flex-col">
                            <DateSelector
                                hasError={$errors.endDate ? true : false}
                                name="endDate"
                                handleDateChange
                                label="Tarikh Tamat"
                                bind:selectedDate={$form.endDate}
                            ></DateSelector>
                            {#if $errors.endDate}
                                <span
                                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                                    >{$errors.endDate}</span
                                >
                            {/if}
                        </div>

                        <Checkbox
                            name="hasHalfDayEndDate"
                            bind:checked={hasHalfDayEndDate}
                            class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label
                            for="hasHalfDayEndDate"
                            class="w-[100px] text-sm font-medium text-gray-900 dark:text-gray-300"
                            >Setengah Hari</label
                        >
                        <div class="flex w-full flex-col">
                            <DropdownSelect
                                hasError={$errors.halfDayEndDate ? true : false}
                                id="halfDayEndDate"
                                disabled={!hasHalfDayEndDate}
                                options={setengahHari}
                                bind:value={$form.halfDayEndDate}
                                dropdownType="noLabel"
                                label=""
                            ></DropdownSelect>
                            {#if $errors.halfDayEndDate}
                                <span
                                    class="font-sans text-sm italic text-system-danger"
                                    >{$errors.halfDayEndDate}</span
                                >
                            {/if}
                        </div>
                    </div>
                    <TextField
                        disabled
                        label="Jumlah Cuti Gantian Yang Telah Diambil Pada Tahun Semasa"
                        value="2"
                    ></TextField>
                    <DateSelector
                        hasError={$errors.latestReplacementLeave ? true : false}
                        name="latestReplacementLeave"
                        handleDateChange
                        label="Cuti Gantian Terakhir Diambil Pada"
                        bind:selectedDate={$form.latestReplacementLeave}
                    ></DateSelector>
                    {#if $errors.latestReplacementLeave}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{$errors.latestReplacementLeave}</span
                        >
                    {/if}
                </form>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Jenis Gantian">
            <SectionHeader title="Jenis Gantian"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DropdownSelect
                    dropdownType="label-left-full"
                    label="Jenis Gantian"
                    options={jenisGantian.filter((cat) => cat.name != 'Semua')}
                    bind:value={selectedJenisGantian}
                    onSelect={() => {}}
                ></DropdownSelect>

                {#if selectedJenisGantian === 'Bekerja Lebih Masa'}
                    <BekerjaLebihMasa {data}></BekerjaLebihMasa>
                {:else if selectedJenisGantian === 'Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti'}
                    <TugasTugasRasmiYangJatuhPadaHariCuti {data}
                    ></TugasTugasRasmiYangJatuhPadaHariCuti>
                {/if}
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
