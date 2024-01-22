<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { setengahHari } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/setengah-hari';
    import { Checkbox } from 'flowbite-svelte';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _submitGeneralLeaveForm,
        _generalLeaveSchema,
        _generalLeaveSchema2,
        _generalLeaveSchema3,
        _generalLeaveSchema4,
    } from '../+page';

    export let data: PageData;
    let hasHalfDayStartDate: boolean = false;
    let hasHalfDayEndDate: boolean = false;

    // ==================================
    // Form Validation ==================
    // ==================================
    const { form, errors, enhance, options } = superForm(
        data.generalLeaveForm,
        {
            SPA: true,
            onSubmit() {
                _submitGeneralLeaveForm(
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
        options.validators = _generalLeaveSchema2;
    } else if (hasHalfDayEndDate && !hasHalfDayStartDate) {
        options.validators = _generalLeaveSchema3;
    } else if (hasHalfDayEndDate && hasHalfDayStartDate) {
        options.validators = _generalLeaveSchema4;
    } else if (!hasHalfDayStartDate && !hasHalfDayEndDate) {
        options.validators = _generalLeaveSchema;
    }
</script>

<section>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 border-b border-bdr-primary pb-5"
    >
        <SectionHeader title="Cuti Kursus Sambilan"></SectionHeader>
        <form
            id="formValidation"
            method="POST"
            use:enhance
            class="flex w-full flex-col gap-2"
        >
            <div
                class="flex w-full  flex-row items-center justify-start gap-2.5"
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
                        hasError={$errors.halfDayStartDate ? true : false}
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
                class=" flex w-full  flex-row items-center justify-start gap-2.5"
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
            <TextField disabled label="Bilangan Hari" value="7"></TextField>
        </form>
    </div>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start gap-2.5 pb-5"
    >
        <SectionHeader title="Maklumat Pengajian"></SectionHeader>
        <TextField
            disabled
            label="Kelayakan Akademik"
            value="Sarjana Muda Sains Komputer"
        ></TextField>
        <TextField disabled label="Kelayakan Ikhtisas" value=""></TextField>
        <TextField disabled label="Bidang Kursus Diambil" value=""></TextField>
        <TextField disabled label="Tempat Pengajian" value=""></TextField>
    </div>
</section>
