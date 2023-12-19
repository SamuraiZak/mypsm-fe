<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let passerResult: string = 'passed';
</script>

<!-- <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Pelulus</b>
    </div>
    <TextField type="text" id="passer-name" label="Nama" value=""></TextField>
    <LongTextField id="passer-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="passer-result" class="w-[220px]">Keputusan</label><Badge
            border
            color={passerResult == 'passed' ? 'green' : 'red'}
            >{results[0].label}</Badge
        >
    </div>
</div>

<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Penyokong</b>
    </div>
    <TextField type="text" id="supporter-name" label="Nama" value=""
    ></TextField>
    <LongTextField id="supporter-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="supporter-result" class="w-[220px]">Keputusan</label><Badge
            border
            color={supporterResult == 'supported' ? 'green' : 'red'}
            >{results[3].label}</Badge
        >
    </div>
</div>
<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Urus Setia Perjawatan</b>
    </div>
    <TextField type="text" id="staffing-sec-name" label="Nama" value=""
    ></TextField>
    <LongTextField id="staffing-sec-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="staffing-sec-result" class="w-[220px]">Keputusan</label
        ><Badge border color={staffingSecResult == 'passed' ? 'green' : 'red'}
            >{results[0].label}</Badge
        >
    </div>
</div> -->

<div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
    <div class="mb-5">
        <b class="text-sm text-system-primary">Penyokong</b>
    </div>
    <TextField
        disabled
        type="text"
        id="supporter-name"
        label="Nama"
        value="Mohd Rahim Ismail"
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
            color={passerResult == 'supported' ? 'green' : 'red'}
            >{results[3].name}</Badge
        >
    </div>
</div>
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
    <LongTextField
        disabled
        id="approver-remark"
        label="Tindakan/Ulasan"
        value="Layak"
    ></LongTextField>
    <div class="flex w-full flex-row text-sm">
        <label for="approver-result" class="w-[220px]">Keputusan</label><Badge
            border
            color={passerResult == 'passed' ? 'green' : 'red'}
            >{results[0].name}</Badge
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
