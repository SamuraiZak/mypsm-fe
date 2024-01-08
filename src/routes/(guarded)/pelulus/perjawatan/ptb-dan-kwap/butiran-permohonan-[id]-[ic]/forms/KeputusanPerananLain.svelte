<script lang="ts">
    import { goto } from '$app/navigation';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

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
    // =========================================================================
    // z validation schema and submit function for the new employment form fields
    // =========================================================================
    let errorData: any;

    const longTextSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    // New Employment - Approver Result section
    const approverResultSchema = z.object({
        approverRemark: longTextSchema,
        approverResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    export const submitApproverResultForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const approverResultData = {
            approverRemark: String(formData.get('approverRemark')),
            approverResult: String(formData.get('approverResult')),
        };

        try {
            errorData = [];
            const result = approverResultSchema.parse(approverResultData);

            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                setTimeout(() => goto('../../perjawatan/PTB-dan-KWAP'), 1500);
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

<form
    id="approverResultForm"
    on:submit={submitApproverResultForm}
    class="flex w-full flex-col gap-2.5"
>
    <!-- Penyokong Card -->
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Pelulus</b>
    </div>
    <LongTextField
        hasError={errorData?.approverRemark}
        name="approverRemark"
        id="supporter-remark"
        label="Tindakan/Ulasan"
        value=""
    ></LongTextField>
    {#if errorData?.approverRemark}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.approverRemark[0]}</span
        >
    {/if}

    <RadioSingle
        name="approverResult"
        disabled={!editable}
        options={approveOptions}
        legend={'Keputusan'}
        bind:userSelected={isApproved}
    ></RadioSingle>
    {#if errorData?.approverResult}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.approverResult[0]}</span
        >
    {/if}
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
</form>

<Toaster />
