<script lang="ts">
    import { enhance } from '$app/forms';
    import TextField from '$lib/components/input/TextField.svelte';
    // import * as ptbService from '$lib/service/ptbAndKwap/services';
    import { onMount } from 'svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { ZodError, z } from 'zod';

    let currentPtb: {
        ptbDate: 'string';
        letterRefNumber: 'string';
        letterRefDate: 'string';
        pensionNumber: 'string';
        kwapDate: 'string';
    };
    export let editable: boolean = false;
    let creating = false;

    onMount(async () => {
        // currentPtb = await ptbService.getPtbKwapdetail(userId);
    });

    // =========================================================================
    // z validation schema and submit function for the ptb form fields
    // =========================================================================
    let errorData: any;

    const textSchema = z
        .string({ required_error: 'Medan ini tidak boleh kosong.' })
        .min(4, {
            message: 'Medan ini hendaklah lebih daripada 4 karakter.',
        })
        .max(124, {
            message: 'Medan ini tidak boleh melebihi 124 karakter.',
        })
        .trim();

    const dateSchema = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .optional();

    // PTB info update section
    const ptbInfoSchema = z.object({
        ptbDate: dateSchema,
        letterRefNumber: textSchema,
        letterRefDate: dateSchema,
        pensionNumber: dateSchema,
        kwapEmailDate: dateSchema,
    });

    export const submitPTBResult = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const meetingResultData = {
            ptbDate: String(formData.get('ptbDate')),
            letterRefNumber: String(formData.getAll('letterRefNumber')),
            letterRefDate: String(formData.get('letterRefDate')),
            pensionNumber: String(formData.getAll('pensionNumber')),
            kwapEmailDate: String(formData.getAll('kwapEmailDate')),
        };

        try {
            errorData = [];
            const result = ptbInfoSchema.parse(meetingResultData);
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

<form
    id="meetingResultForm"
    on:submit|preventDefault={submitPTBResult}
    class="flex w-full flex-col gap-2.5"
>
    <!-- <div class="mb-2.5 flex w-full justify-end">
        <button type="submit">
            <FormButton type="save" />
        </button>
    </div> -->
    <TextField
        hasError={errorData?.ptbDate}
        name="ptbDate"
        type="date"
        disabled={!editable}
        label="Tarikh Diberi PTB"
        value={currentPtb?.ptbDate ?? ''}
    ></TextField>
    {#if errorData?.ptbDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.ptbDate[0]}</span
        >
    {/if}

    <TextField
        hasError={errorData?.letterRefNumber}
        name="letterRefNumber"
        type="text"
        disabled={!editable}
        label="No. Rujukan Surat JPA"
        placeholder="contoh: 81672178"
        value={currentPtb?.letterRefNumber ?? ''}
    ></TextField>
    {#if errorData?.letterRefNumber}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.letterRefNumber[0]}</span
        >
    {/if}

    <TextField
        hasError={errorData?.letterRefDate}
        name="letterRefDate"
        type="date"
        disabled={!editable}
        label="&nbsp;"
        value={currentPtb?.letterRefDate ?? ''}
    ></TextField>
    {#if errorData?.letterRefDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.letterRefDate[0]}</span
        >
    {/if}

    <TextField
        hasError={errorData?.pensionNumber}
        name="pensionNumber"
        type="date"
        disabled={!editable}
        label="No. Pencen"
        value={currentPtb?.pensionNumber ?? ''}
    ></TextField>
    {#if errorData?.pensionNumber}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.pensionNumber[0]}</span
        >
    {/if}

    <TextField
        hasError={errorData?.kwapEmailDate}
        name="kwapEmailDate"
        type="date"
        disabled={!editable}
        label="Tarikh Emel (KWAP)"
        value={currentPtb?.kwapDate ?? ''}
    ></TextField>
    {#if errorData?.kwapEmailDate}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.kwapEmailDate[0]}</span
        >
    {/if}
</form>

<Toaster />
