<script lang="ts">
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import { _updateChargeAppealTable } from './+layout';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type {
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: LayoutData;
    let rowData: ProceedingChargeDetailResponseDTO;

    // Table list - Charge Appeal Table
    let chargeListTable: TableSettingDTO = {
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
        hiddenColumn: ['integrityId', 'employeeId', 'declarationLetter'],
        dictionary: [
            {
                english: 'proceedingMeetingDate',
                malay: 'Tarikh Mesyuarat Prosiding',
            },
            {
                english: 'chargeMeetingDate',
                malay: 'Tarikh Mesyuarat Pertuduhan',
            },
            {
                english: 'chargeMeetingResult',
                malay: 'Keputusan Mesyuarat Pertuduhan',
            },
            {
                english: 'disciplinaryType',
                malay: 'Jenis Prosiding Tatatertib',
            },
            {
                english: 'isAppeal',
                malay: 'Rayuan Dikemuka',
            },
        ],
        url: 'integrity/proceeding/appeal/list',
        id: 'chargeListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Prosiding Tatatertib - Rayuan"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <DataTable
                title="Senarai Rekod Prosiding - Pertuduhan/Hukuman"
                bind:tableData={chargeListTable}
                bind:passData={rowData}
                detailActions={() => {
                    const route = `../integriti/prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                    goto(route);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={chargeListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={chargeListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={chargeListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterSelectField
                        label="Status"
                        options={data.selectionOptions.statusLookup}
                        bind:inputValue={chargeListTable.param.filter.status}
                    ></FilterSelectField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</section>

<!-- <Toaster /> -->
