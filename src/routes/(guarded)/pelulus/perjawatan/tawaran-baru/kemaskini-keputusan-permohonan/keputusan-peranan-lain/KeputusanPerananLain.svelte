<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { _approverResultSchema, _submitApproverResultForm } from '../+page';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from '../$types';
    export let data: PageData;
    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let isApproved: boolean = true;
    const approveOptions: RadioOption[] = [
        {
            value: true,
            label: 'LULUS',
        },
        {
            value: false,
            label: 'TIDAK LULUS',
        },
    ];

    let passerResult: string = 'passed';

    export const { form, errors, enhance } = superForm(data.supporterForm, {
        SPA: true,
        validators: _approverResultSchema,
        delayMs: 500,
        timeoutMs: 2000,
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
        onSubmit() {
            _submitApproverResultForm($form);
        },
    });
</script>

<form
    id="approverResultForm"
    method="POST"
    use:enhance
    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Pelulus</b>
    </div>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Pelulus</b>
    </div>
    <LongTextField
        hasError={!!$errors.approverRemark}
        name="approverRemark"
        id="approver-remark"
        label="Tindakan/Ulasan"
        bind:value={$form.approverRemark}
    ></LongTextField>
    {#if $errors.approverRemark}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.approverRemark}</span
        >
    {/if}

    <RadioSingle
        name="approverResult"
        disabled={false}
        options={approveOptions}
        legend={'Keputusan'}
        bind:userSelected={$form.approverResult}
    ></RadioSingle>
    {#if $errors.approverResult}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{$errors.approverResult}</span
        >
    {/if}
</form>
<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Penyokong</b>
    </div>
    <TextField
        disabled
        type="text"
        id="supporter-name"
        label="Nama"
        value="Mohd Safwan Adam"
    ></TextField>
    <LongTextField
        disabled
        id="supporter-remark"
        label="Tindakan/Ulasan"
        value="Layak"
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="supporter-result" class="w-[220px]">Keputusan</label><Badge
            border
            color={passerResult == 'passed' ? 'green' : 'red'}
            >{results[2].name}</Badge
        >
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
