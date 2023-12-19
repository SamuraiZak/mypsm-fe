<script lang="ts">
    import { enhance } from '$app/forms';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Alert } from 'flowbite-svelte';
    import type { ActionData } from '../$types';
    import * as ptbService from '$lib/service/ptbAndKwap/services';
    import { onMount } from 'svelte';
    import type { Cookies } from '@sveltejs/kit';

    let form: ActionData;
    export let ptbData: PtbAndKwap;
    let currentPtb: {
        ptbDate: string;
        letterRefNumber: string;
        letterRefDate: string;
        pensionNumber: string;
        kwapDate: string;
    };
    export let userId: string | undefined;
    export let editable: boolean = false;
    let creating = false;

    onMount(async () => {
        currentPtb = await ptbService.getPtbKwapdetail(userId);
    });
</script>

<form
    class="flex w-full flex-col gap-2.5"
    method="POST"
    action="./butiran-permohonan-{ptbData.noPekerja}-{ptbData.noKadPengenalan}?/create"
    use:enhance={() => {
        creating = true;

        return async ({ update }) => {
            await update();
            creating = false;
        };
    }}
>
    <!-- <div class="mb-2.5 flex w-full justify-end">
        <button type="submit">
            <FormButton type="save" />
        </button>
    </div> -->
    <TextField
        type="date"
        disabled={!editable}
        name="ptb-date"
        label="Tarikh Diberi PTB"
        value={currentPtb?.ptbDate ?? ''}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        name="letter-ref-number"
        label="No. Rujukan Surat JPA"
        placeholder="contoh: 81672178"
        value={currentPtb?.letterRefNumber ?? ''}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="letter-ref-date"
        label="&nbsp;"
        value={currentPtb?.letterRefDate ?? ''}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="pension-number"
        label="No. Pencen"
        value={currentPtb?.pensionNumber ?? ''}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="kwap-date"
        label="Tarikh Emel (KWAP)"
        value={currentPtb?.kwapDate ?? ''}
    ></TextField>
</form>
