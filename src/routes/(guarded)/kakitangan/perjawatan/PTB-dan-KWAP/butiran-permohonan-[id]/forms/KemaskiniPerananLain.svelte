<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    // import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';

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

    let passerResult: string = 'passed';
    let supporterResult: string = 'notSupported';

    let stepperFormTitleClass =
        'w-full h-fit mt-2 bg-bgr-primary text-system-primary text-sm font-medium';

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

<!-- Pelulus Card -->
<div class="flex w-full flex-col gap-2.5">
    <DropdownSelect
        id="staffs-supporter"
        label="Nama Penyokong"
        dropdownType="label-left-full"
        options={employeeLists}
        bind:index={selectedSupporter}
    />
    <DropdownSelect
        id="staffs-approver"
        label="Nama Pelulus"
        dropdownType="label-left-full"
        options={employeeLists}
        bind:index={selectedApprover}
    />
</div>
