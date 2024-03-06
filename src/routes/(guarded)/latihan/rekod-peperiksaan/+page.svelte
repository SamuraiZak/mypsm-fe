<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateTable } from './+page';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CourseExamListResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-list-response.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CourseExamDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData: CourseExamDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    // Table list - new application view for secretary role
    let examTable: TableDTO = {
        param: param,
        meta: data.responses.examApplicationResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.list.examApplicationList as CourseExamListResponseDTO) ?? [],
        hiddenData: ['applicationId'],
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
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Peperiksaan"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->
        <FilterCard onSearch={_updateExamTable}>
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={examTable.param.filter.employeeIdentityNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nombor Pekerja"
                bind:inputValue={examTable.param.filter.employeeNumber}
            ></FilterTextField>
            <FilterTextField
                label="Nama Pekerja"
                bind:inputValue={examTable.param.filter.employeeName}
            ></FilterTextField>
            <FilterTextField
                label="Tajuk Peperiksaan"
                bind:inputValue={examTable.param.filter.examTitle}
            ></FilterTextField>
            <FilterSelectField
                label="Keputusan Peperiksaan"
                options={data.selectionOptions.statusLookup}
                bind:inputValue={examTable.param.filter.examTypeId}
            ></FilterSelectField>
            <FilterTextField
                label="Tajuk Peperiksaan"
                bind:inputValue={examTable.param.filter.examTitle}
            ></FilterTextField>
            <FilterTextField
                label="Tajuk Peperiksaan"
                bind:inputValue={examTable.param.filter.examTitle}
            ></FilterTextField>
            <FilterTextField
                label="Tajuk Peperiksaan"
                bind:inputValue={examTable.param.filter.examTitle}
            ></FilterTextField>
            <FilterSelectField
                label="Status"
                options={data.selectionOptions.statusLookup}
                bind:inputValue={examTable.param.filter.examTypeId}
            ></FilterSelectField>
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Permohonan Peperiksaan"
                onUpdate={_updateExamTable}
                enableDetail
                bind:tableData={examTable}
                bind:passData={rowData}
                detailActions={() => {
                    const route = `./lantikan/peperiksaan/${rowData.id}`;

                    goto(route);
                }}
            ></CustomTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
