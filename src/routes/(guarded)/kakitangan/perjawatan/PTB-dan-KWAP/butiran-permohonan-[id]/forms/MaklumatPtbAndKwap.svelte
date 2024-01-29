<script lang="ts">
    import { enhance } from '$app/forms';
    import TextField from '$lib/components/input/TextField.svelte';
    // import * as ptbService from '$lib/service/ptbAndKwap/services';
    import type { DetailPensionDetail } from '$lib/view-models/mypsm/perjawatan/pension/pension-detail-pension-detail-response.view-model';

    export let ptbData: DetailPensionDetail;

    export let editable: boolean = false;
    let creating = false;
</script>

<form
    class="flex w-full flex-col gap-2.5"
    method="POST"
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
        name="applicationDate"
        label="Tarikh Permohonan"
        bind:value={ptbData.applicationDate}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="ptb-date"
        label="Tarikh Diberi PTB"
        bind:value={ptbData.PTBDate}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        name="referenceNumber"
        label="No. Rujukan Surat JPA"
        placeholder="contoh: 81672178"
        bind:value={ptbData.referenceNumber}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="referenceDate"
        label="Tarikh Rujukan"
        bind:value={ptbData.referenceDate}
    ></TextField>
    <!-- <TextField
        type="date"
        disabled={!editable}
        name="letter-ref-date"
        label="&nbsp;"
        bind:value={ptbData.letterRefDate}
    ></TextField> -->
    <TextField
        type="text"
        disabled={!editable}
        name="status"
        label="Status"
        bind:value={ptbData.status}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        name="remark"
        label="Ulasan"
        bind:value={ptbData.remark}
    ></TextField>
    <TextField
        type="text"
        disabled={!editable}
        name="pension-number"
        label="No. Pencen"
        bind:value={ptbData.pensionNumber}
    ></TextField>
    <TextField
        type="date"
        disabled={!editable}
        name="kwap-date"
        label="Tarikh Emel (KWAP)"
        bind:value={ptbData.KWAPEmailDate}
    ></TextField>
</form>
