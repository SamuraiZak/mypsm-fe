<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
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

    let passerResult: string = 'passed';
</script>

<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Pelulus</b>
    </div>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Pelulus</b>
    </div>
    <LongTextField id="approver-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>

    <RadioSingle
        disabled={false}
        options={approveOptions}
        legend={'Keputusan'}
        bind:userSelected={isApproved}
    ></RadioSingle>
</div>
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
