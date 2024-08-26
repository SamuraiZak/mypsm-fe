<script lang="ts">
    import { error } from '@sveltejs/kit';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import { Toaster } from 'svelte-french-toast';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { ConfirmationListResponseDTO } from '$lib/dto/mypsm/employment/confirmation/confirmation_request_response.dto';
    import { _checkIfFail } from './+layout';

    export let data: LayoutData;
    let rowData: ConfirmationListResponseDTO;

    // Table list - all Table
    let confirmationListTable: TableSettingDTO = {
        param: data.param,
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
        hiddenColumn: ['applicationId', 'employeeId'],
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
        url:
            data.roles.isEmploymentSecretaryRole || data.roles.isStaffRole
                ? 'employment/confirmation/list'
                : data.roles.isStateDirectorRole ||
                    data.roles.isUnitDirectorRole
                  ? 'employment/confirmation/director/list'
                  : data.roles.isIntegrityDirectorRole
                    ? 'employment/confirmation/integrity/list'
                    : data.roles.isAuditDirectorRole
                      ? 'employment/confirmation/audit/list'
                      : error(401, { message: 'Tiada akses kepada laman ini' }),
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

    // exceeds 3 years Table
    let confirmationExceedsThreeYearsListTable: TableSettingDTO = {
        param: data.exceedsThreeYearsParam,
        meta: data.responses.confirmationInServiceExceedsThreeYearsListResponse
            .data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.responses.confirmationInServiceExceedsThreeYearsListResponse
                .data?.dataList as ConfirmationListResponseDTO[]) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId', 'employeeId'],
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
        url:
            data.roles.isEmploymentSecretaryRole || data.roles.isStaffRole
                ? 'employment/confirmation/list'
                : data.roles.isStateDirectorRole ||
                    data.roles.isUnitDirectorRole
                  ? 'employment/confirmation/director/list'
                  : data.roles.isIntegrityDirectorRole
                    ? 'employment/confirmation/integrity/list'
                    : data.roles.isAuditDirectorRole
                      ? 'employment/confirmation/audit/list'
                      : error(401, { message: 'Tiada akses kepada laman ini' }),
        id: 'confirmationExceedsThreeYearsListTable',
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

    // rationalisation Table
    let confirmationRationalisationListTable: TableSettingDTO = {
        param: data.rationalisationParam,
        meta: data.responses.confirmationInServiceRationalisationListResponse
            .data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.responses.confirmationInServiceRationalisationListResponse
                .data?.dataList as ConfirmationListResponseDTO[]) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['applicationId', 'employeeId'],
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
        url:
            data.roles.isEmploymentSecretaryRole || data.roles.isStaffRole
                ? 'employment/confirmation/list'
                : data.roles.isStateDirectorRole ||
                    data.roles.isUnitDirectorRole
                  ? 'employment/confirmation/director/list'
                  : data.roles.isIntegrityDirectorRole
                    ? 'employment/confirmation/integrity/list'
                    : data.roles.isAuditDirectorRole
                      ? 'employment/confirmation/audit/list'
                      : error(401, { message: 'Tiada akses kepada laman ini' }),
        id: 'confirmationRationalisationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.roles.isEmploymentSecretaryRole,
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
        <CustomTabContent title="Senarai Rekod Pengesahan (Semua Kakitangan)">
            <div
                class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
            >
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <DataTable
                        title="Senarai Rekod Pengesahan Semua Kakitangan LKIM"
                        bind:tableData={confirmationListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            _checkIfFail(
                                rowData.applicationId,
                                rowData.employeeId,
                                rowData.status,
                            );
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
                                    .filter.identityDocumentNumber}
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
        {#if data.roles.isEmploymentSecretaryRole || data.roles.isStaffRole}
            <CustomTabContent title="Pengesahan Yang Melebihi Tempoh 3 Tahun">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <div class="h h-fit w-full">
                            <DataTable
                                title="Senarai Pengesahan Yang Melebihi Tempoh 3 Tahun"
                                bind:tableData={confirmationExceedsThreeYearsListTable}
                                bind:passData={rowData}
                                detailActions={() => {
                                    _checkIfFail(
                                        rowData.applicationId,
                                        rowData.employeeId,
                                        rowData.status,
                                    );
                                }}
                            >
                                <FilterWrapper slot="filter">
                                    <FilterTextField
                                        label="No. Pekerja"
                                        bind:inputValue={confirmationExceedsThreeYearsListTable
                                            .param.filter.employeeNumber}
                                    ></FilterTextField>
                                    <FilterTextField
                                        label="Nama Kakitangan"
                                        bind:inputValue={confirmationExceedsThreeYearsListTable
                                            .param.filter.name}
                                    ></FilterTextField>
                                    <FilterTextField
                                        label="No. Kad Pengenalan"
                                        bind:inputValue={confirmationExceedsThreeYearsListTable
                                            .param.filter
                                            .identityDocumentNumber}
                                    ></FilterTextField>
                                    <FilterSelectField
                                        label="Status"
                                        options={data.selectionOptions
                                            .statusLookup}
                                        bind:inputValue={confirmationExceedsThreeYearsListTable
                                            .param.filter.status}
                                    ></FilterSelectField>
                                </FilterWrapper>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </CustomTabContent>
        {/if}
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
                            title="Senarai Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
                            bind:tableData={confirmationRationalisationListTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                _checkIfFail(
                                    rowData.applicationId,
                                    rowData.employeeId,
                                    rowData.status,
                                );
                            }}
                            addActions={() => {
                                goto('confirmation/add-confirmation');
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={confirmationRationalisationListTable
                                        .param.filter.employeeNumber}
                                ></FilterTextField>
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={confirmationRationalisationListTable
                                        .param.filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={confirmationRationalisationListTable
                                        .param.filter.identityDocumentNumber}
                                ></FilterTextField>
                                <FilterSelectField
                                    label="Status"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={confirmationRationalisationListTable
                                        .param.filter.status}
                                ></FilterSelectField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>

<Toaster />
