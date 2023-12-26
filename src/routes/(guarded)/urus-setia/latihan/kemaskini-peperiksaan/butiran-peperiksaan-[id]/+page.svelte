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
    import { goto } from '$app/navigation';
    import toast, { Toaster } from 'svelte-french-toast';
    import { z } from 'zod';
    export let data;
    let activeStepper = 0;

    // =========================================================================
    // z validation schema for the exam form fields=============================
    // =========================================================================
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
            .min(4, { message: 'Tajuk hendaklah lebih daripada 4 karakter.' })
            .max(124, { message: 'Tajuk tidak boleh melebihi 124 karakter.' })
            .trim(),
        examApplicationOpenDate: dateScheme,
        examApplicationCloseDate: dateScheme.refine(
            (value) =>
                value >=
                new Date(data.record.currentExam.examApplicationOpenDate),
            {
                message:
                    'Tarikh tutup tidak boleh lebih awal daripada tarikh buka permohonan',
            },
        ),
        examDate: dateScheme.refine(
            (value) =>
                value >=
                new Date(data.record.currentExam.examApplicationCloseDate),
            {
                message:
                    'Tarikh peperiksaan tidak boleh lebih awal daripada tarikh tutup permohonan',
            },
        ),
        examLocation: z
            .string({ required_error: 'Lokasi tidak boleh kosong.' })
            .min(4, { message: 'Lokasi hendaklah lebih daripada 4 karakter.' })
            .max(124, { message: 'Lokasi tidak boleh melebihi 124 karakter.' })
            .trim(),
    });

    // =========================================================================
    // exam form fields submit function=========================================
    // =========================================================================
    const submitExamForm = async (event: Event) => {
        const formData = new FormData(event.target as HTMLFormElement);
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
            // const currentExamId = String(formData.get('id'));
            if (result) {
                errorData = [];
                toast.success('Berjaya disimpan!', {
                    style: 'background: #333; color: #fff;',
                });
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
            }
        }
    };
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Latihan (Kemaskini Maklumat Peperiksaan LKIM)"
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM - {data
            .record.currentExam.examTitle}"
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
            ><TextIconButton primary label="Simpan" form="examForm" />
        </StepperContentHeader>
        <StepperContentBody>
            <form
                id="examForm"
                on:submit|preventDefault={submitExamForm}
                class="flex w-full flex-col gap-2"
            >
                <input
                    type="text"
                    name="id"
                    hidden
                    bind:value={data.record.currentExam.id}
                />

                <DropdownSelect
                    hasError={errorData?.examType}
                    dropdownType="label-left-full"
                    id="examType"
                    label="Jenis Peperiksaan"
                    bind:value={data.record.currentExam.examType}
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
                    bind:value={data.record.currentExam.examTitle}
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
                    label="Tarikh Mula Permohonan"
                    bind:selectedDate={data.record.currentExam
                        .examApplicationOpenDate}
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
                    bind:selectedDate={data.record.currentExam
                        .examApplicationCloseDate}
                ></DateSelector>
                {#if errorData?.examApplicationCloseDate}
                    <span
                        class="ml-[220px] font-sans text-sm italic text-system-danger"
                        >{errorData?.examApplicationCloseDate[0]}</span
                    >
                {/if}
                <TextField
                    hasError={errorData?.examDate}
                    name="examDate"
                    label="Tarikh Peperiksaan"
                    type="date"
                    bind:value={data.record.currentExam.examDate}
                />
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
                    bind:value={data.record.currentExam.examLocation}
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
