<script lang="ts">
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { CourseExamDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: LayoutData;
    let rowData: CourseExamDetailResponseDTO;

    // Table list - new application view for secretary role
    let examTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.examListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.examListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'examTitle',
                malay: 'Tajuk Peperiksaan',
            },
            {
                english: 'examType',
                malay: 'Jenis Peperiksaan',
            },
            {
                english: 'examDate',
                malay: 'Tarikh Peperiksaan',
            },
            {
                english: 'examLocation',
                malay: 'Lokasi Peperiksaan',
            },
        ],
        url: 'course/exam/list',
        id: 'examTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.role.isCourseSecretaryRole,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Jenis - Jenis Peperiksaan"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <DataTable
            title="Senarai Peperiksaan"
            bind:tableData={examTable}
            bind:passData={rowData}
            detailActions={() => {
                const route = `./exam/${rowData.id}`;
                goto(route);
            }}
            addActions={() => {
                goto('./exam/add-exam');
            }}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="Tajuk Peperiksaan"
                    bind:inputValue={examTable.param.filter.examTitle}
                ></FilterTextField>
                <FilterSelectField
                    label="Jenis Peperiksaan"
                    options={data.selectionOptions.examTypeLookup}
                    bind:inputValue={examTable.param.filter.examTypeId}
                ></FilterSelectField>
            </FilterWrapper>
        </DataTable>
    </div>
</section>

<!-- <Toaster /> -->
