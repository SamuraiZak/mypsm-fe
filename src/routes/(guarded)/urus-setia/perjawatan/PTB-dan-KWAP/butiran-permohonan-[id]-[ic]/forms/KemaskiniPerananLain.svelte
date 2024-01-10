<script lang="ts">
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { mockEmployees } from '$lib/mocks/database/mockEmployees';
    // import { getEmployees } from '$lib/service/employees/staff-service';
    import type { SelectOptionType } from 'flowbite-svelte';

    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

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
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
            }
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
            }
        }
    };
</script>

<!-- Pelulus Card -->
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

<Toaster />
