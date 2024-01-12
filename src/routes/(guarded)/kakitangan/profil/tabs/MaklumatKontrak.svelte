<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    export let disabled: boolean = false;
    import toast, { Toaster } from 'svelte-french-toast';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import { _stepperkontrak, _submitFormstepperkontrak } from '../+page';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';

    export let data: PageData;


    // =================================================================================
    // z validation schema for the example form fields==================================
    // =================================================================================

    const { form, errors, message, constraints, enhance } = superForm(
        data.form,
        {
            SPA: true,
            validators: _stepperkontrak,
            taintedMessage:
                'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        },
    );
</script>

<section class="w-full flex-col px-2 py-2">
    <SectionHeader title="Maklumat Kontrak Terkini">
        {#if !disabled}
            <TextIconButton primary label="Simpan" form="Formstepperkontrak" />
        {/if}
    </SectionHeader>
    <div class="flex w-full flex-col gap-2.5">
        <form
            id="Formstepperkontrak"
            on:submit|preventDefault={_submitFormstepperkontrak}
            class="flex w-full flex-col gap-2 pt-3"
            use:enhance
            method="POST"
        >
            <TextField
                {disabled}
                hasError={$errors.ID ? true : false}
                name="ID"
                label={'ID'}
                type="text"
                bind:value={$form.ID}
            ></TextField>
            {#if $errors?.ID}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors?.ID[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={$errors.emel ? true : false}
                name="emel"
                label={'Emel'}
                type="text"
                bind:value={$form.emel}
            ></TextField>
            {#if $errors?.emel}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors?.emel[0]}</span
                >
            {/if}

            <DateSelector
                {disabled}
                hasError={$errors.tarikhMulaKontrak ? true : false}
                name="tarikhMulaKontrak"
                handleDateChange
                label="Tarikh Mula Kontrak"
                bind:selectedDate={$form.tarikhMulaKontrak}
            ></DateSelector>
            {#if $errors?.tarikhMulaKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors?.tarikhMulaKontrak[0]}</span
                >
            {/if}

            <DateSelector
                {disabled}
                hasError={$errors.tarikhTamatKontrak ? true : false}
                name="tarikhTamatKontrak"
                handleDateChange
                label="Tarikh Tamat Kontrak"
                bind:selectedDate={$form.tarikhTamatKontrak}
            ></DateSelector>
            {#if $errors.tarikhTamatKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.tarikhTamatKontrak[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={$errors.tempohKontrak ? true : false}
                name="tempohKontrak"
                label={'Tempoh Kontrak'}
                type="text"
                bind:value={$form.tempohKontrak}
            ></TextField>
            {#if $errors.tempohKontrak}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.tempohKontrak[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={$errors.kadarUpah ? true : false}
                name="kadarUpah"
                label={'Kadar Upah (RM)'}
                type="text"
                bind:value={$form.kadarUpah}
            ></TextField>
            {#if $errors.kadarUpah}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.kadarUpah[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={$errors.penempatan ? true : false}
                name="penempatan"
                label={'Penempatan'}
                type="text"
                bind:value={$form.penempatan}
            ></TextField>
            {#if $errors.penempatan}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.penempatan[0]}</span
                >
            {/if}

            <TextField
                {disabled}
                hasError={$errors.gelaranTugas ? true : false}
                name="gelaranTugas"
                label={'Gelaran Tugas'}
                type="text"
                bind:value={$form.gelaranTugas}
            ></TextField>
            {#if $errors.gelaranTugas}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.gelaranTugas[0]}</span
                >
            {/if}

            <DateSelector
                {disabled}
                hasError={$errors.tarikhLaporDiri ? true : false}
                name="tarikhLaporDiri"
                handleDateChange
                label="Tarikh Lapor Diri"
                bind:selectedDate={$form.tarikhLaporDiri}
            ></DateSelector>
            {#if $errors.tarikhLaporDiri}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.tarikhLaporDiri[0]}</span
                >
            {/if}
        </form>
    </div>
</section>
<Toaster />
