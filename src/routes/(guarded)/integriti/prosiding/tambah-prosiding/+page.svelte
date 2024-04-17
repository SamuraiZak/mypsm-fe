<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    import type { ProceedingEmployeeListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-employee-list-response.dto';
    import type { ProceedingChargeListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: PageData;
    let rowData: ProceedingEmployeeListResponseDTO;

    // Table list - new application view for secretary role
    let proceedingListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.list.proceedingList as ProceedingChargeListResponseDTO) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'suspendMeetingDate',
                malay: 'Tarikh Mesyuarat Tahan Kerja',
            },
        ],
        url: 'integrity/proceeding/employee_list',
        id: 'proceedingListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: true,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Tambah Rekod Prosiding"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <ContentHeader
            title="Sila pilih kakitangan untuk ditambahkan rekod prosiding"
            borderClass="border-none"
        >
            <TextIconButton
                label="Kembali"
                type="neutral"
                onClick={() => {
                    goto('../prosiding');
                }}
            />
        </ContentHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DataTable
                title=""
                bind:tableData={proceedingListTable}
                bind:passData={rowData}
                selectActions={() => {
                    const route = `./tambah-prosiding/${rowData.id}`;

                    goto(route);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={proceedingListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={proceedingListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={proceedingListTable.param.filter
                            .identityCardNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Gred"
                        options={data.selectionOptions.gradeLookup}
                        bind:inputValue={proceedingListTable.param.filter
                            .grade}
                    ></FilterSelectField>
                    <FilterSelectField
                        label="Jawatan"
                        options={data.selectionOptions.positionLookup}
                        bind:inputValue={proceedingListTable.param.filter
                            .position}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
