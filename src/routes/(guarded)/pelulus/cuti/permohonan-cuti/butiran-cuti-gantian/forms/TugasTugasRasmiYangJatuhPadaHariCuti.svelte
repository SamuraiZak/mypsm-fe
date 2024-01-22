<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { kategoriCuti } from '$lib/mocks/kakitangan/cuti/permohonan-cuti/kategori-cuti';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import {
        _submitOfficialTaskOnHolidayForm,
        _officialTaskOnHolidaySchema,
    } from '../+page';

    export let data: PageData;

    // ======================= Form Validation
    const { form, errors, enhance } = superForm(
        data.officialTaskOnHolidayForm,
        {
            SPA: true,
            validators: _officialTaskOnHolidaySchema,
            onSubmit() {
                _submitOfficialTaskOnHolidayForm($form);
            },
            taintedMessage:
                'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
        },
    );
</script>

<section
    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
>
    <SectionHeader title="Tugas-tugas Rasmi Yang Jatuh Pada Hari Cuti"
    ></SectionHeader>
    <form
        id="validateForm"
        method="POST"
        use:enhance
        class="flex w-full flex-col gap-2"
    >
        <DropdownSelect
            hasError={$errors.holidayCategory ? true : false}
            id="holidayCategory"
            label="Kategori Cuti"
            dropdownType="label-left-full"
            bind:value={$form.holidayCategory}
            options={kategoriCuti}
        ></DropdownSelect>
        {#if $errors.holidayCategory}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.holidayCategory}</span
            >
        {/if}
        <LongTextField
            hasError={$errors.officialTask ? true : false}
            name="officialTask"
            label="Tugas-Tugas Rasmi Yang Dijalankan"
            placeholder="Sila taip jawapan anda dalam ruangan ini"
            bind:value={$form.officialTask}
        ></LongTextField>
        {#if $errors.officialTask}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.officialTask}</span
            >
        {/if}
        <DateSelector
            hasError={$errors.date ? true : false}
            name="date"
            handleDateChange
            label="Tarikh"
            bind:selectedDate={$form.date}
        ></DateSelector>
        {#if $errors.date}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.date}</span
            >
        {/if}
        <TextField
            hasError={$errors.placement ? true : false}
            name="placement"
            label="Tempat Bekerja"
            bind:value={$form.placement}
        ></TextField>
        {#if $errors.placement}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.placement}</span
            >
        {/if}
        <div class="flex w-full flex-row items-center justify-start">
            <TextField
                hasError={$errors.startTime ? true : false}
                type="time"
                label="Waktu Mula"
                bind:value={$form.startTime}
                name="startTime"
            />
        </div>
        {#if $errors.startTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.startTime}</span
            >
        {/if}
        <div class="flex w-full flex-row items-center justify-start">
            <TextField
                hasError={$errors.endTime ? true : false}
                type="time"
                label="Waktu Tamat"
                bind:value={$form.endTime}
                name="endTime"
            />
        </div>
        {#if $errors.endTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.endTime}</span
            >
        {/if}
        <TextField
            hasError={$errors.totalTime ? true : false}
            name="totalTime"
            label="Jumlah Jam"
            bind:value={$form.totalTime}
        ></TextField>
        {#if $errors.totalTime}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.totalTime}</span
            >
        {/if}
    </form>
</section>

