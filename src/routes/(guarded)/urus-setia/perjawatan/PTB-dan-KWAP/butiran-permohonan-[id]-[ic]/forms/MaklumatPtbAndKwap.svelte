<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    // import * as ptbService from '$lib/service/ptbAndKwap/services';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from '../$types';
    import { superForm } from 'sveltekit-superforms/client';
    import { _ptbInfoSchema, _submitPTBResult } from '../+page';
    export let data: PageData;

    let currentPtb: {
        ptbDate: 'string';
        referenceNumber: 'string';
        referenceDate: 'string';
        pensionNumber: 'string';
        kwapDate: 'string';
    };
    export let editable: boolean = !!(
        data.PTBKWAPInfoForm.data.status === 'isReadOnly'
    );

    export const { form, errors, enhance } = superForm(data.PTBKWAPInfoForm, {
        SPA: true,
        validators: _ptbInfoSchema,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        onSubmit() {
            _submitPTBResult($form);
        },
    });
</script>

<form
    id="meetingResultForm"
    method="POST"
    use:enhance
    class="flex w-full flex-col gap-2.5"
>
    <TextField
        hasError={!!$errors.PTBDate}
        name="PTBDate"
        type="date"
        disabled={!editable}
        label="Tarikh Diberi PTB"
        bind:value={$form.PTBDate}
    ></TextField>
    {#if $errors.PTBDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.PTBDate}</span
        >
    {/if}

    <TextField
        hasError={!!$errors.referenceNumber}
        name="referenceNumber"
        type="text"
        disabled={!editable}
        label="No. Rujukan Surat JPA"
        placeholder="contoh: 81672178"
        bind:value={$form.referenceNumber}
    ></TextField>
    {#if $errors.referenceNumber}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.referenceNumber}</span
        >
    {/if}

    <TextField
        hasError={!!$errors.referenceDate}
        name="referenceDate"
        type="date"
        disabled={!editable}
        label="&nbsp;"
        bind:value={$form.referenceDate}
    ></TextField>
    {#if $errors.referenceDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.referenceDate}</span
        >
    {/if}

    <TextField
        hasError={!!$errors.pensionNumber}
        name="pensionNumber"
        type="date"
        disabled={!editable}
        label="No. Pencen"
        bind:value={$form.pensionNumber}
    ></TextField>
    {#if $errors.pensionNumber}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.pensionNumber}</span
        >
    {/if}

    <TextField
        hasError={!!$errors.KWAPEmailDate}
        name="KWAPEmailDate"
        type="date"
        disabled={!editable}
        label="Tarikh Emel (KWAP)"
        bind:value={$form.KWAPEmailDate}
    ></TextField>
    {#if $errors.KWAPEmailDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.KWAPEmailDate}</span
        >
    {/if}
</form>

<Toaster />
