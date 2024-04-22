<script lang="ts">
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { ConfirmationListResponseDTO } from '$lib/dto/mypsm/employment/confirmation/confirmation_request_response.dto';

    export let data: LayoutData;
    let rowData: ConfirmationListResponseDTO;

    // Table list - Charge Table
    let confirmationListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.responses.confirmationInServiceListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.responses.confirmationInServiceListResponse.data
                ?.dataList as ConfirmationListResponseDTO[]) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id'],
        dictionary: [
            {
                english: 'positionByBoard',
                malay: 'Jawatan Mengikut Waran',
            },
            {
                english: 'employedDate',
                malay: 'Tarikh Mula Perkhidmatan',
            },
        ],
        url: 'employment/confirmation/list',
        id: 'confirmationListTable',
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

    // Suspension Table
    let suspendListTable: TableSettingDTO = {
        param: data.param,
        meta: {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['integrityId', 'employeeId', 'declarationLetter'],
        dictionary: [
            {
                english: 'suspendMeetingDate',
                malay: 'Tarikh Mesyuarat Tahan Kerja',
            },
            {
                english: 'suspendMeetingResult',
                malay: 'Keputusan Mesyuarat Tahan Kerja',
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
        url: 'integrity/proceeding/suspension/list',
        id: 'suspendListTable',
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
    <ContentHeader title="Pengesahan Dalam Perkhidmatan"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Pengesahan Lantikan Baru">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Rekod Pengesahan Lantikan Baru"
                        bind:tableData={confirmationListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `./pengesahan-dalam-perkhidmatan/${rowData.id}`;

                            goto(route);
                        }}
                        addActions={() => {
                            goto('./prosiding/tambah-prosiding');
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={confirmationListTable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={confirmationListTable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={confirmationListTable.param
                                    .filter.identityCard}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={confirmationListTable.param
                                    .filter.status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pengesahan Yang Melebihi Tempoh 3 Tahun">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <div class="h h-fit w-full">
                        <DataTable
                            title="Senarai Rekod Pengesahan Yang Melebihi Tempoh 3 Tahun"
                            bind:tableData={suspendListTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./prosiding/suspend-${rowData.id}`;

                                goto(route);
                            }}
                            addActions={() => {
                                goto('./prosiding/tambah-prosiding');
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={suspendListTable.param
                                        .filter.employeeNumber}
                                ></FilterTextField>
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={suspendListTable.param
                                        .filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={suspendListTable.param
                                        .filter.identityCardNumber}
                                ></FilterTextField>
                                <FilterSelectField
                                    label="Jawatan Semasa"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={suspendListTable.param
                                        .filter.status}
                                ></FilterSelectField>
                                <FilterSelectField
                                    label="Status"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={suspendListTable.param
                                        .filter.status}
                                ></FilterSelectField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent
            title="Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
        >
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <div class="h h-fit w-full">
                        <DataTable
                            title="Senarai Rekod Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
                            bind:tableData={suspendListTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./prosiding/suspend-${rowData.id}`;

                                goto(route);
                            }}
                            addActions={() => {
                                goto('./prosiding/tambah-prosiding');
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={suspendListTable.param
                                        .filter.employeeNumber}
                                ></FilterTextField>
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={suspendListTable.param
                                        .filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={suspendListTable.param
                                        .filter.identityCardNumber}
                                ></FilterTextField>
                                <FilterSelectField
                                    label="Jawatan Semasa"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={suspendListTable.param
                                        .filter.status}
                                ></FilterSelectField>
                                <FilterSelectField
                                    label="Status"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={suspendListTable.param
                                        .filter.status}
                                ></FilterSelectField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>

<!-- <Toaster /> -->
