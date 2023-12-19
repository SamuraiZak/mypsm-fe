<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];
    let editable: boolean = true;

    let passerResult: string = 'passed';

    let isApproved: string = 'true';
    const approveOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'LULUS',
        },
        {
            value: 'false',
            label: 'TIDAK LULUS',
        },
    ];
</script>

<div class="flex w-full flex-col gap-2.5">
    <!-- Penyokong Card -->
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Pelulus</b>
    </div>
    <LongTextField id="supporter-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>

    <RadioSingle
        disabled={!editable}
        options={approveOptions}
        legend={'Keputusan'}
        bind:userSelected={isApproved}
    ></RadioSingle>
    <hr />
    <!-- Pelulus Card -->
    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
        <div class="mb-5">
            <b class="text-sm text-system-primary">Penyokong</b>
        </div>
        <TextField
            disabled
            type="text"
            id="passer-name"
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
            <label for="supporter-result" class="w-[220px]">Keputusan</label
            ><Badge border color={passerResult == 'passed' ? 'green' : 'red'}
                >{results[2].name}</Badge
            >
        </div>
    </div>
</div>
