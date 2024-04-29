<script lang="ts">
    import type { CourseExamApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/exam/course-exam-application.dto';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { LayoutData } from './$types';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: LayoutData;
    let rowData: CourseExamApplicationDetailResponseDTO;

    // Table list - new application view for secretary role
    let examTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.examApplicationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.examApplicationResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId', 'examId'],
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
                english: 'employeeIdentityNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'examApplicationOpenDate',
                malay: 'Tarikh Buka Permohonan Peperiksaan',
            },
            {
                english: 'examApplicationCloseDate',
                malay: 'Tarikh Tutup Permohonan Peperiksaan',
            },
            {
                english: 'examDate',
                malay: 'Tarikh Peperiksaan',
            },
            {
                english: 'examLocation',
                malay: 'Lokasi Peperiksaan',
            },
            {
                english: 'examResult',
                malay: 'Keputusan Peperiksaan',
            },
            {
                english: 'examStatus',
                malay: 'Status Peperiksaan',
            },
            {
                english: 'examAttendance',
                malay: 'Kehadiran',
            },
        ],
        url: 'course/exam_application/list',
        id: 'examTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.roles.isStaffRole,
        },
    };
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
        <DataTable
            title="Senarai Permohonan Peperiksaan"
            bind:tableData={examTable}
            bind:passData={rowData}
            detailActions={() => {
                const route = `./rekod-peperiksaan/${rowData.applicationId}`;
                goto(route);
            }}
            addActions={() =>
                goto('./rekod-peperiksaan/tambah-permohonan-peperiksaan')}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={examTable.param.filter
                        .identityDocumentNumber}
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
                    label="Jenis Peperiksaan"
                    options={data.selectionOptions.examTypeLookup}
                    bind:inputValue={examTable.param.filter.examTypeId}
                ></FilterSelectField>
                <FilterSelectField
                    label="Keputusan Peperiksaan"
                    options={data.selectionOptions.examResultLookup}
                    bind:inputValue={examTable.param.filter.examResult}
                ></FilterSelectField>
                <FilterSelectField
                    label="Status"
                    options={data.selectionOptions.statusLookup}
                    bind:inputValue={examTable.param.filter.examStatus}
                ></FilterSelectField>
            </FilterWrapper>
        </DataTable>
    </div>
</section>

<!-- <Toaster /> -->
