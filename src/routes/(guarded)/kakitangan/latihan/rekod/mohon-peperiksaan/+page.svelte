<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { examTypes } from '$lib/mocks/latihan/mockExamTypes.js';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { z } from 'zod';
    import toast, { Toaster } from 'svelte-french-toast';
    export let data;
    let activeStepper = 0;
    let selectedRow: IntExams;

    let selectedExams: any[] = [];

    let disabled = true;

    // =====================================================================================
    // z validation schema for the exam form fields=========================================
    // =====================================================================================
    let errorData: any;

    const examApplicationSchema = z.object({
        examType: z.enum(['psl', 'perkhidmatan'], {
            errorMap: (issue, { defaultError }) => ({
                message:
                    issue.code === 'invalid_enum_value'
                        ? 'Jenis peperiksaan perlu dipilih.'
                        : defaultError,
            }),
        }),
        selectedExams: z.any().array().nonempty({
            message: 'Sila pilih sekurang - kurangnya satu peperiksaan',
        }),
    });

    // =========================================================================
    // exam form fields submit function=========================================
    // =========================================================================
    const submitExamApplicationForm = async () => {
        for (let index = 0; index < selectedExams.length; index++) {
            const element = selectedExams[index];
            console.log(element.examApplicationOpenDate);
        }
        const examTypeSelector = document.getElementById(
            'examType',
        ) as HTMLSelectElement;

        const examApplicationData = {
            examType: String(examTypeSelector.value),
            selectedExams: selectedExams,
        };
        console.log('ARRAY!', examApplicationData.selectedExams);

        try {
            const result = examApplicationSchema.parse(examApplicationData);
            if (result) {
                errorData = [];
                toast.success('Permohonan berjaya dihantar!', {
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
        description="Hal-hal berkaitan dengan pengemaskinian maklumat peperiksaan LKIM"
    >
        <FormButton
            type="close"
            onClick={() => {
                goto('../rekod');
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
                form="examApplicationForm"
            /></StepperContentHeader
        >
        <div class="flex w-full flex-col gap-2">
            <StepperContentBody>
                <form
                    id="examApplicationForm"
                    on:submit|preventDefault={submitExamApplicationForm}
                    class="flex w-full flex-col gap-2"
                >
                    <DropdownSelect
                        hasError={errorData?.examType}
                        dropdownType="label-left-full"
                        id="examType"
                        label="Jenis Peperiksaan"
                        bind:value={data.record.newExam.examType}
                        options={examTypes}
                    ></DropdownSelect>
                    {#if errorData?.examType}
                        <span
                            class="ml-[220px] font-sans text-sm italic text-system-danger"
                            >{errorData?.examType[0]}</span
                        >
                    {/if}
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <SectionHeader title="Senarai Peperiksaan"
                        ></SectionHeader>
                        {#if errorData?.selectedExams}
                            <span
                                class="font-sans text-sm italic text-system-danger"
                                >{errorData?.selectedExams[0]}</span
                            >
                        {/if}
                        <DynamicTable
                            hasCheckbox
                            bind:checkedItems={selectedExams}
                            excludeCol={['id']}
                            tableItems={data.records.examsAvailable.filter(
                                (exam) =>
                                    exam.examType ===
                                    data.record.newExam.examType,
                            )}
                            bind:passData={selectedRow}
                        ></DynamicTable>
                    </div>
                </form>
            </StepperContentBody>
        </div>
    </StepperContent>
</Stepper>

<Toaster />
