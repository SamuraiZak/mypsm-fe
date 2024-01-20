<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import {
        _submitSupporterResultForm,
        _supporterResultSchema,
    } from '../+page';
    import type { PageData } from '../$types';

    export let data: PageData;

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: true,
            label: 'SOKONG',
        },
        {
            value: false,
            label: 'TIDAK SOKONG',
        },
    ];

    let passerResult: string = 'passed';

    export const { form, errors, enhance } = superForm(data.supporterForm, {
        SPA: true,
        validators: _supporterResultSchema,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        onSubmit() {
            _submitSupporterResultForm($form);
        },
    });
</script>

<form
    id="supporterResultForm"
    method="POST"
    use:enhance
    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Penyokong</b>
    </div>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Penyokong</b>
    </div>
    <LongTextField
        hasError={!!$errors.supporterRemark}
        name="supporterRemark"
        id="supporter-remark"
        label="Tindakan/Ulasan"
        bind:value={$form.supporterRemark}
    ></LongTextField>
    {#if $errors.supporterRemark}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.supporterRemark}</span
        >
    {/if}

    <RadioSingle
        name="supporterResult"
        disabled={false}
        options={supportOptions}
        legend={'Keputusan'}
        bind:userSelected={$form.supporterResult}
    ></RadioSingle>
    {#if $errors.supporterResult}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.supporterResult}</span
        >
    {/if}
</form>
<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Pelulus</b>
    </div>
    <TextField
        disabled
        type="text"
        id="approver-name"
        label="Nama"
        value="Mohd Safwan Adam"
    ></TextField>
    <div class="text-sm text-system-primary">
        <i class=""><li>● Menunggu keputusan daripada PENYOKONG.</li></i>
    </div>
</div>
<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Urus Setia Perjawatan</b>
    </div>
    <TextField
        disabled
        type="text"
        id="service-secretary-name"
        label="Nama"
        value="Ikhwan bin Salem"
    ></TextField>
    <LongTextField
        disabled
        id="service-secretary-remark"
        label="Tindakan/Ulasan"
        value="Layak"
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="service-secretary-result" class="w-[220px]">Keputusan</label
        ><Badge border color={passerResult == 'passed' ? 'green' : 'red'}
            >{results[0].name}</Badge
        >
    </div>
</div>

<Toaster />
