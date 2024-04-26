<script lang="ts">
    import type { CourseFundReimbursementDetailResponseDTO } from '$lib/dto/mypsm/course/fund-reimbursement/course-fund-reimbursement.dto';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _checkIfDocumentExist, _updateTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { LayoutData } from './$types';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: LayoutData;
    let rowData: CourseFundReimbursementDetailResponseDTO;

    let fundReimbursementTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.fundReimbursementResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.responses.fundReimbursementResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'employeeIdentityNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'academic',
                malay: 'Taraf Pendidikan',
            },
            {
                english: 'courseName',
                malay: 'Tajuk Pembelajaran',
            },
            {
                english: 'LNPTAverage',
                malay: 'Purata LNPT (%)',
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
        url: 'course/fund_reimbursement/list',
        id: 'fundReimbursementTable',
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
    <ContentHeader title="Rekod Tuntutan Pembiayaan Yuran Pengajian"
    ></ContentHeader>
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
            title="Senarai Permohonan Tuntutan Yuran Pengajian"
            bind:tableData={fundReimbursementTable}
            bind:passData={rowData}
            detailActions={() => {
                _checkIfDocumentExist(data.roles.isStaffRole, rowData.id);
            }}
            addActions={() => goto('./tuntutan-yuran/mohon-tuntutan')}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={fundReimbursementTable.param.filter
                        .identityDocumentNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Nombor Pekerja"
                    bind:inputValue={fundReimbursementTable.param.filter
                        .employeeNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Nama Pekerja"
                    bind:inputValue={fundReimbursementTable.param.filter
                        .employeeName}
                ></FilterTextField>
                <FilterNumberField
                    label="Jumlah Tuntutan"
                    bind:inputValue={fundReimbursementTable.param.filter
                        .totalClaim}
                ></FilterNumberField>
                <FilterSelectField
                    label="Status"
                    options={data.lookups.statusLookup}
                    bind:inputValue={fundReimbursementTable.param.filter.status}
                ></FilterSelectField>
            </FilterWrapper>
        </DataTable>
    </div>
</section>

<!-- <Toaster /> -->
