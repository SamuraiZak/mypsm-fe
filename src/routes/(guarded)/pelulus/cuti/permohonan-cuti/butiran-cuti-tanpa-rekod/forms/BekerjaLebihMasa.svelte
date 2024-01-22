<script lang="ts">
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _submitLeaveTypeForm, _leaveTypeSchema } from '../+page';

    export let data: PageData;

    //  ===================== Form Validation ===========================
    const { form, errors, enhance } = superForm(data.leaveTypeForm, {
        SPA: true,
        validators: _leaveTypeSchema,
        onSubmit() {
            _submitLeaveTypeForm($form);
        },
        taintedMessage:
            'Terdapat maklumat yang belum dismpan. Adakah anda henda keluar dari laman ini?',
    });
</script>

<section
    class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
>
    <SectionHeader title="Bekerja Lebih Masa"></SectionHeader>
    <form
        id="validateForm"
        method="POST"
        use:enhance
        class="flex w-full flex-col gap-2"
    >
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
                label="Waktu Mula"
                type="time"
                name="startTime"
                bind:value={$form.startTime}
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
                label="Waktu Tamat"
                type="time"
                name="endTime"
                bind:value={$form.endTime}
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
