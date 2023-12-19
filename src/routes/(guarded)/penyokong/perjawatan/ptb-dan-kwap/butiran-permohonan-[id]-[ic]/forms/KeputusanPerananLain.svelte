<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';

    import { onMount } from 'svelte';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];
    let editable: boolean = true;
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    let passerResult: string = 'passed';
    let supporterResult: string = 'notSupported';

    let isSupported: string = 'true';
    const supportOptions: RadioOption[] = [
        {
            value: 'true',
            label: 'SOKONG',
        },
        {
            value: 'false',
            label: 'TIDAK SOKONG',
        },
    ];
</script>

<div class="flex w-full flex-col gap-2.5">
    <!-- Penyokong Card -->
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Penyokong</b>
    </div>
    <LongTextField id="supporter-remark" label="Tindakan/Ulasan" value=""
    ></LongTextField>

    <RadioSingle
        disabled={!editable}
        options={supportOptions}
        legend={'Keputusan'}
        bind:userSelected={isSupported}
    ></RadioSingle>
    <hr />
    <!-- Pelulus Card -->
    <div class="h-fit space-y-2.5 rounded-[3px] border p-2.5">
        <div class="mb-5">
            <b class="text-sm text-system-primary">Pelulus</b>
        </div>
        <TextField disabled type="text" id="passer-name" label="Nama" value=""
        ></TextField>
        <div class="text-sm text-system-primary">
            <i class=""><li>● Menunggu keputusan daripada PENYOKONG.</li></i>
        </div>
    </div>
</div>
