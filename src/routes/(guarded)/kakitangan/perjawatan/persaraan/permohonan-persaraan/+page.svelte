<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z, ZodError } from 'zod';

    export let data;
    export let disabled: boolean = false;
    let earlyRetirementApplicationDate: string;
    let earlyRetirementDate: string;
    let applicationPurpose: string;

    let selectedDate = new Date();
    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    let errorData: any;

    // date common schema
    const dateScheme = z.coerce
        .date({
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_date'
                        ? 'Tarikh tidak boleh dibiar kosong.'
                        : defaultError,
            }),
        })
        .min(new Date(), {
            message: 'Tarikh boleh kurang dari tarikh semasa.',
        });

    const exampleFormSchema = z.object({
        earlyRetirementDate: dateScheme.refine(
            (value) => value >= new Date(earlyRetirementApplicationDate),
            {
                message:
                    'Tidak boleh kurang daripada tarikh permohonan bersara awal',
            },
        ),
        earlyRetirementApplicationDate: dateScheme.refine(
            (value) => value <= new Date(earlyRetirementDate),
            {
                message: 'Tidak boleh lebih daripada tarikh bersara awal',
            },
        ),
        longTextExample: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),

        applicationPurpose: z
            .string({ required_error: 'Medan ini tidak boleh kosong.' })
            .min(4, {
                message: 'Medan ini hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Medan ini tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    const submitForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
        const selectOptionExampleSelector = document.getElementById(
            'selectOptionExample',
        ) as HTMLSelectElement;

        const exampleFormData = {
            applicationPurpose: String(formData.get('applicationPurpose')),
            earlyRetirementDate: String(formData.get('earlyRetirementDate')),
            earlyRetirementApplicationDate: String(
                formData.get('earlyRetirementApplicationDate'),
            ),
        };
        try {
            const result = exampleFormSchema.parse(exampleFormData);
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                const id = crypto.randomUUID().toString();
                const validatedExamFormData = { ...exampleFormData, id };
                console.log(
                    'REQUEST BODY: ',
                    JSON.stringify(validatedExamFormData),
                );
            }
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                console.log('ERROR!', err.flatten());
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

<ContentHeader
    title="Persaraan"
    description="Maklumat berkaitan dengan perjawatan - persaraan"
    ><FormButton
        type="close"
        onClick={() => {
            goto('/kakitangan/perjawatan/persaraan');
        }}
    /></ContentHeader
>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Persaraan">
            <TextIconButton primary label="Hantar" form="formValidation" />
        </StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col">
                <form
                    id="formValidation"
                    on:submit|preventDefault={submitForm}
                    class="flex w-full flex-col gap-2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <p class="text-sm font-bold">Permohonan Persaraan</p>

                        <DateSelector
                            hasError={errorData?.earlyRetirementDate}
                            name="earlyRetirementDate"
                            handleDateChange
                            label="Tarikh Bersara Awal"
                            bind:selectedDate={earlyRetirementDate}
                        ></DateSelector>
                        {#if errorData?.earlyRetirementDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.earlyRetirementDate[0]}</span
                            >
                        {/if}

                        <DateSelector
                            hasError={errorData?.earlyRetirementApplicationDate}
                            name="earlyRetirementApplicationDate"
                            handleDateChange
                            label="Tarikh Permohonan Persaraan Awal"
                            bind:selectedDate={earlyRetirementApplicationDate}
                        ></DateSelector>
                        {#if errorData?.earlyRetirementApplicationDate}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData
                                    ?.earlyRetirementApplicationDate[0]}</span
                            >
                        {/if}

                        <LongTextField
                            hasError={errorData?.applicationPurpose}
                            name="applicationPurpose"
                            label="Tujuan Permohonan"
                            bind:value={applicationPurpose}
                        />
                        {#if errorData?.applicationPurpose}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{errorData?.applicationPurpose[0]}</span
                            >
                        {/if}
                    </div>
                </form>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>

<Toaster />
