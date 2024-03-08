<script lang="ts">
    import type { CourseAddExamApplicationRequestDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto.ts';
    import { _examInfoResponseSchema } from '$lib/schemas/mypsm/course/exam-schema';
    import { zod } from 'sveltekit-superforms/adapters';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import {
        _academicInfoSchema,
        _serviceInfoRequestSchema,
    } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { goto } from '$app/navigation';
    import { _createExamForm, _updateTable } from './+page';
    import type { CourseExamDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CourseExamListResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-list-response.dto';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    export let data: PageData;

    let param: CommonListRequestDTO = data.param;

    // Table list - new application view for secretary role
    let examTable: TableDTO = {
        param: param,
        meta: data.responses.examListResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.responses.examListResponse.data
                ?.dataList as CourseExamListResponseDTO) ?? [],
        hiddenData: ['id'],
        selectedData: [],
    };

    async function _updateExamTable() {
        _updateTable(examTable.param).then((value) => {
            examTable.data = value.response.data?.dataList ?? [];
            examTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            examTable.param.pageSize = examTable.meta.pageSize;
            examTable.param.pageNum = examTable.meta.pageNum;
        });
    }

    // Superforms
    const { form, errors, enhance } = superForm(data.examInfoForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        resetForm: true,
        multipleSubmits: 'prevent',
        validationMethod: 'oninput',
        validators: zod(_examInfoResponseSchema),
        onSubmit(formData) {
            _createExamForm(formData.formData);
        },
        taintedMessage: false,
    });

    const submitAddExamApplication = () => {
        if (examTable.selectedData && examTable.selectedData.length > 0) {
            const selectedExams: CourseAddExamApplicationRequestDTO = {
                exams: examTable.selectedData.map((exam) => ({
                    examId: (exam as CourseExamDetailResponseDTO).id,
                })),
            };
            let selectedExamFormData = new FormData();

            // selectedExamFormData.append('exams', selectedExams);
            console.log('HI');
            _createExamForm(selectedExams);
        }
    };
</script>

<ContentHeader title="Maklumat Lantikan Baru"
    ><TextIconButton
        label="Kembali"
        type="neutral"
        onClick={() => {
            goto('../../latihan/rekod-peperiksaan');
        }}
    /></ContentHeader
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Peperiksaan LKIM">
            <TextIconButton
                type="primary"
                label="Mohon Peperiksaan"
                onClick={submitAddExamApplication}
            />
        </StepperContentHeader>
        <StepperContentBody
            ><!-- Maklumat Peperiksaan -->
            <div class="mb-5">
                <b class="text-sm text-system-primary"
                    >Sila pilih satu atau lebih peperiksaan LKIM untuk dipohon:</b
                >
            </div>
            <form
                id="examFormStepper"
                method="POST"
                use:enhance
                class="flex w-full flex-col gap-2"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <CustomTable
                        title="Senarai Peperiksaan"
                        onUpdate={_updateExamTable}
                        bind:tableData={examTable}
                        enableAdd={true}
                    ></CustomTable>
                </div>
            </form>
        </StepperContentBody>
    </StepperContent>
</Stepper>

<Toaster />
