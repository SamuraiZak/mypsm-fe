<script lang="ts">
    import { goto } from '$app/navigation';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
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

    let passerResult: string = 'passed';

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

    // New Employment - Supporter Result section
    const supporterResultSchema = z.object({
        supporterRemark: longTextSchema,
        supporterResult: z.enum(['true', 'false'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Sila tetapkan pilihan anda.'
                        : defaultError,
            }),
        }),
    });

    export const submitSupporterResultForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);

        const supporterResultData = {
            supporterRemark: String(formData.get('supporterRemark')),
            supporterResult: String(formData.get('supporterResult')),
        };

        try {
            errorData = [];
            const result = supporterResultSchema.parse(supporterResultData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
                setTimeout(() => goto('../../perjawatan/tawaran-baru'), 1500);
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
    id="supporterResultForm"
    on:submit|preventDefault={submitSupporterResultForm}
    class="h-fit space-y-2.5 rounded-[3px] border p-2.5"
>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Penyokong</b>
    </div>
    <div class="mb-5">
        <b class="text-sm text-system-primary">Keputusan Penyokong</b>
    </div>
    <LongTextField
        hasError={errorData?.supporterRemark}
        name="supporterRemark"
        id="supporter-remark"
        label="Tindakan/Ulasan"
        value=""
    ></LongTextField>
    {#if errorData?.supporterRemark}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.supporterRemark[0]}</span
        >
    {/if}

    <RadioSingle
        name="supporterResult"
        disabled={false}
        options={supportOptions}
        legend={'Keputusan'}
        bind:userSelected={isSupported}
    ></RadioSingle>
    {#if errorData?.supporterResult}
        <span class="ml-[220px] font-sans text-sm italic text-system-danger"
            >{errorData?.supporterResult[0]}</span
        >
    {/if}
</form>
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
    <div class="text-sm text-system-primary">
        <i class=""><li>● Menunggu keputusan daripada PENYOKONG.</li></i>
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

<Toaster />
