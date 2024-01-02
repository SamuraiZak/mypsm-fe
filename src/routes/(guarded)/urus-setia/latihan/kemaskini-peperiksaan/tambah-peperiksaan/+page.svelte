<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto, invalidateAll } from '$app/navigation';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z } from 'zod';
    let activeStepper = 0;

    // =====================================================================================
    // z validation schema for the exam form fields=========================================
    // =====================================================================================
    let examType: string = '';
    let examTitle: string = '';
    let examApplicationOpenDate: string = '';
    let examApplicationCloseDate: string = '';
    let examDate: string = '';
    let examLocation: string = '';
    let errorData: any;

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
            message: 'Tarikh lepas tidak boleh kurang dari tarikh semasa.',
        });
    const examFormSchema = z.object({
        examType: z.enum(['perkhidmatan', 'psl'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Jenis latihan perlu dipilih.'
                        : defaultError,
            }),
        }),
        examTitle: z
            .string({ required_error: 'Tajuk latihan tidak boleh kosong.' })
            .min(4, {
                message: 'Tajuk hendaklah lebih daripada 4 karakter.',
            })
            .max(84, { message: 'Tajuk tidak boleh melebihi 84 karakter.' })
            .trim(),
        examApplicationOpenDate: dateScheme,
        examApplicationCloseDate: dateScheme.refine(
            (data) => data >= new Date(examApplicationOpenDate),
            {
                message:
                    'Tarikh tutup tidak boleh lebih awal daripada tarikh buka permohonan',
            },
        ),
        examDate: dateScheme.refine(
            (data) => data >= new Date(examApplicationCloseDate),
            {
                message:
                    'Tarikh peperiksaan tidak boleh lebih awal daripada tarikh tutup permohonan',
            },
        ),
        examLocation: z
            .string({ required_error: 'Lokasi tidak boleh kosong.' })
            .min(4, {
                message: 'Lokasi hendaklah lebih daripada 4 karakter.',
            })
            .max(124, {
                message: 'Lokasi tidak boleh melebihi 124 karakter.',
            })
            .trim(),
    });

    // =====================================================================================
    // exam form fields submit function=====================================================
    // =====================================================================================
    const submitExamForm = async (event: Event) => {
        const formElement = event.target as HTMLFormElement;
        const formData = new FormData(formElement);
        const examTypeSelector = document.getElementById(
            'examType',
        ) as HTMLSelectElement;

        const examFormData = {
            examType: String(examTypeSelector.value),
            examTitle: String(formData.get('examTitle')),
            examApplicationOpenDate: String(
                formData.get('examApplicationOpenDate'),
            ),
            examApplicationCloseDate: String(
                formData.get('examApplicationCloseDate'),
            ),
            examDate: String(formData.get('examDate')),
            examLocation: String(formData.get('examLocation')),
        };

        try {
            const result = examFormSchema.parse(examFormData);
            if (result) {
                errorData = [];

                const id = crypto.randomUUID().toString();
                const validatedExamFormData: IntExams = { ...examFormData, id };

                console.log(JSON.stringify(validatedExamFormData));

                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });

                await invalidateAll();
            }
        } catch (err: unknown) {
            if (err instanceof z.ZodError) {
                const { fieldErrors: errors } = err.flatten();
                errorData = errors;
                toast.error(
                    'Sila pastikan maklumat adalah lengkap dengan tepat.',
                    {
                        style: 'background: #333; color: #fff;',
                    },
                );
                console.log('ERROR!', errorData);
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../kemaskini-peperiksaan');
            }}
        ></FormButton>
    </ContentHeader>
</section>
<Stepper activeIndex={activeStepper}>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peperiksaan LKIM"
            ><TextIconButton
                primary
                label="Simpan"
                form="examForm"
            /></StepperContentHeader
        >
        <StepperContentBody>
            <form
                id="examForm"
                on:submit|preventDefault={submitExamForm}
                class="flex w-full flex-col gap-2"
            >
                <DropdownSelect
                    hasError={errorData?.examType}
                    dropdownType="label-left-full"
                    id="examType"
                    label="Jenis Peperiksaan"
                    bind:value={examType}
                    options={examTypes}
                ></DropdownSelect>
                {#if errorData?.examType}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examType[0]}</span
                    >
                {/if}
                <TextField
                    hasError={errorData?.examTitle}
                    name="examTitle"
                    label="Tajuk Peperiksaan"
                    type="text"
                    bind:value={examTitle}
                />
                {#if errorData?.examTitle}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examTitle[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={errorData?.examApplicationOpenDate}
                    name="examApplicationOpenDate"
                    handleDateChange
                    label="Tarikh Mula Permohonam"
                    bind:selectedDate={examApplicationOpenDate}
                ></DateSelector>
                {#if errorData?.examApplicationOpenDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examApplicationOpenDate[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={errorData?.examApplicationCloseDate}
                    name="examApplicationCloseDate"
                    handleDateChange
                    label="Tarikh Tutup Permohonan"
                    bind:selectedDate={examApplicationCloseDate}
                ></DateSelector>
                {#if errorData?.examApplicationCloseDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examApplicationCloseDate[0]}</span
                    >
                {/if}
                <DateSelector
                    hasError={errorData?.examDate}
                    name="examDate"
                    handleDateChange
                    label="Tarikh Peperiksaan"
                    bind:selectedDate={examDate}
                ></DateSelector>
                {#if errorData?.examDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examDate[0]}</span
                    >
                {/if}
                <LongTextField
                    hasError={errorData?.examLocation}
                    name="examLocation"
                    label="Lokasi Peperiksaan"
                    bind:value={examLocation}
                />
                {#if errorData?.examLocation}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examLocation[0]}</span
                    >
                {/if}
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
