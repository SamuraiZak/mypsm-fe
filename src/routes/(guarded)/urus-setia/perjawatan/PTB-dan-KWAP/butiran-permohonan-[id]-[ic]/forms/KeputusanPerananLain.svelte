<script lang="ts">
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    // import { getEmployees } from '$lib/service/employees/staff-service';
    import { Badge, type SelectOptionType } from 'flowbite-svelte';

    import { onMount } from 'svelte';

    let results = [
        { value: 'passed', name: 'LULUS' },
        { value: 'notPassed', name: 'TIDAK LULUS' },
        { value: 'supported', name: 'SOKONG' },
        { value: 'notSupported', name: 'TIDAK SOKONG' },
    ];

    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;
    let status: string = 'baru';

    let passerResult: string = 'passed';

    onMount(async () => {
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });
</script>

<div class="flex w-full flex-col gap-2.5">
    {#if status === 'SOKONG'}
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
                ><Badge
                    border
                    color={passerResult == 'passed' ? 'green' : 'red'}
                    >{results[2].name}</Badge
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
                id="passer-name"
                label="Nama"
                value=""
            ></TextField>
            <div class="text-sm text-system-primary">
                <i class=""><li>● Menunggu keputusan daripada PENYOKONG.</li></i
                >
            </div>
        </div>
    {:else if status === 'LULUS'}
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
                <label for="supporter-result" class="w-[220px]">Keputusan</label
                ><Badge
                    border
                    color={passerResult == 'passed' ? 'green' : 'red'}
                    >{results[2].name}</Badge
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
                <label for="approver-result" class="w-[220px]">Keputusan</label
                ><Badge
                    border
                    color={passerResult == 'passed' ? 'green' : 'red'}
                    >{results[0].name}</Badge
                >
            </div>
        </div>
    {/if}
</div>
