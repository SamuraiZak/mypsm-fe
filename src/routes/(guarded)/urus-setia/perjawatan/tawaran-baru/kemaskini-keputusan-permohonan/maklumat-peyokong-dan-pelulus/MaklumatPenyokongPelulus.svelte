<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        const staffs: IntEmployees[] = await getEmployees();

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });
</script>

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
