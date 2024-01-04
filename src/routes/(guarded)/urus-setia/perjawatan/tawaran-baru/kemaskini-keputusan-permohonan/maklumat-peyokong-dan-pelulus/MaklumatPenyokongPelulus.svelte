<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    // import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { ZodError, z } from 'zod';
    let employeeLists: SelectOptionType<any>[] = [];
    let selectedSupporter: string;
    let selectedApprover: string;

    onMount(async () => {
        const staffs: IntEmployees[] = mockEmployees;

        employeeLists = staffs.map((staff) => ({
            value: staff.id.toString(),
            name: staff.name,
        }));
        selectedSupporter = employeeLists[0].value;
        selectedApprover = employeeLists[0].value;
    });

    // =========================================================================
    // z validation schema and submit function for the new employment form fields
    // =========================================================================
    let errorData: any;

    // New Employment - Assign Approver & Supporter section
    const assignApproverSupporterSchema = z.object({
        staffSupporter: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
        staffApprover: z
            .string()
            .min(1, { message: 'Sila tetapkan pilihan anda.' }),
    });

    const submitAssignApproverSupporterForm = async () => {
        const staffSupporterSelector = document.getElementById(
            'staffSupporter',
        ) as HTMLSelectElement;
        const staffApproverSelector = document.getElementById(
            'staffApprover',
        ) as HTMLSelectElement;

        const newEmploymentSecretaryResultData = {
            staffSupporter: String(staffSupporterSelector.value),
            staffApprover: String(staffApproverSelector.value),
        };

        try {
            const result = assignApproverSupporterSchema.parse(
                newEmploymentSecretaryResultData,
            );
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
            }
        }
    };
</script>

<form
    id="newEmploymentAssignApproverSupporterForm"
    on:submit|preventDefault={submitAssignApproverSupporterForm}
    class="flex w-full flex-col gap-2"
>
    <DropdownSelect
        hasError={errorData?.staffSupporter}
        id="staffSupporter"
        label="Nama Penyokong"
        dropdownType="label-left-full"
        options={employeeLists}
        bind:value={selectedSupporter}
    />
    {#if errorData?.staffSupporter}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.staffSupporter[0]}</span
        >
    {/if}
    <DropdownSelect
        hasError={errorData?.staffApprover}
        id="staffApprover"
        label="Nama Pelulus"
        dropdownType="label-left-full"
        options={employeeLists}
        bind:value={selectedApprover}
    />
    {#if errorData?.staffApprover}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.staffApprover[0]}</span
        >
    {/if}
</form>
