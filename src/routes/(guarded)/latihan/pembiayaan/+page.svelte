<script lang="ts">
    import { _checkIfDocumentExist } from './+layout';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { LayoutData } from './$types';
    import type { CourseFundApplicationDetailResponseDTO } from '$lib/dto/mypsm/course/fund-application/course-fund-application.dto';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: LayoutData;
    let rowData: CourseFundApplicationDetailResponseDTO;

    let fundApplicationTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.response.fundApplicationResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.response.fundApplicationResponse.data?.dataList ?? [],
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
                english: 'identityDocumentNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'academicLevel',
                malay: 'Taraf Pendidikan',
            },
            {
                english: 'courseName',
                malay: 'Tajuk Pembelajaran',
            },
            {
                english: 'studyDuration',
                malay: 'Tempoh Pembelajaran (Tahun)',
            },
            {
                english: 'courseApplicationDate',
                malay: 'Tarikh Permohonan',
            },
        ],
        url: 'course/fund_application/list',
        id: 'fundApplicationTable',
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
    <ContentHeader title="Rekod Pembiayaan Pelajaran"></ContentHeader>
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
            title="Senarai Permohonan Pembiayaan Pembelajaran"
            bind:tableData={fundApplicationTable}
            bind:passData={rowData}
            detailActions={() => {
                goto(`./pembiayaan/${rowData.id}`);
            }}
            addActions={() => goto('./pembiayaan/mohon-pembiayaan')}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={fundApplicationTable.param.filter
                        .identityDocumentNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Nombor Pekerja"
                    bind:inputValue={fundApplicationTable.param.filter
                        .employeeNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Nama Pekerja"
                    bind:inputValue={fundApplicationTable.param.filter
                        .employeeName}
                ></FilterTextField>
                <FilterDateField
                    label="Tarikh Permohonan"
                    bind:inputValue={fundApplicationTable.param.filter
                        .courseApplicationDate}
                ></FilterDateField>
                <FilterSelectField
                    label="Status"
                    options={data.lookups.statusLookup}
                    bind:inputValue={fundApplicationTable.param.filter.status}
                ></FilterSelectField>
            </FilterWrapper>
        </DataTable>
    </div>
</section>

<!-- <Toaster /> -->
