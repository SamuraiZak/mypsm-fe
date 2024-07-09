<script lang="ts">
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import { _updateChargeTable, _updateSuspensionTable } from './+layout';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import type { ProceedingsuspensionListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-suspension-list-response.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: LayoutData;
    let rowData: ProceedingChargeDetailResponseDTO;

    // Table list - Charge Table
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
                malay: 'Tarikh Mesyuarat Penentuan Hukuman',
            },
            {
                english: 'chargeMeetingDate',
                malay: 'Tarikh Mesyuarat Pertuduhan',
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
        url: 'integrity/proceeding/accusation/list',
        id: 'chargeListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.roles.isIntegritySecretaryRole ||
                data.roles.isDisciplineSecretaryRole,
        },
    };

    // Suspension Table
    let suspendListTable: TableSettingDTO = {
        param: data.param,
        meta: data.responses.proceedingSuspensionListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.list
                .proceedingSuspensionList as ProceedingsuspensionListResponseDTO) ??
            [],
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
            add:
                data.roles.isIntegritySecretaryRole ||
                data.roles.isDisciplineSecretaryRole,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Prosiding Tatatertib"></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.roles.isDisciplineSecretaryRole || data.roles.isIntegritySecretaryRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            <!-- Table filter placeholder -->
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                {#if data.roles.isDisciplineSecretaryRole}
                    <DataTable
                        title="Senarai Rekod Prosiding - Pertuduhan/Hukuman"
                        bind:tableData={chargeListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                            goto(route);
                        }}
                        addActions={() => {
                            goto('./prosiding/tambah-prosiding');
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
                                bind:inputValue={chargeListTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={chargeListTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={chargeListTable.param.filter
                                    .status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                {:else if data.roles.isIntegritySecretaryRole}
                    <DataTable
                        title="Senarai Rekod Prosiding - Tahan Kerja/Gantung Kerja"
                        bind:tableData={suspendListTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `./prosiding/suspend-${rowData.integrityId}-${rowData.employeeId}`;

                            goto(route);
                        }}
                        addActions={() => {
                            goto('./prosiding/tambah-prosiding');
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={suspendListTable.param.filter
                                    .employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={suspendListTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={suspendListTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={suspendListTable.param.filter
                                    .status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                {/if}
            </div>
        </div>
    {:else if data.roles.isStaffRole || data.roles.isIntegrityDirectorRole}
        <CustomTab>
            <CustomTabContent title="Prosiding Pertuduhan/Hukuman">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <DataTable
                            title="Senarai Rekod Prosiding - Pertuduhan/Hukuman"
                            bind:tableData={chargeListTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}-${rowData.isAppeal}`;

                                goto(route);
                            }}
                            addActions={() => {
                                goto('./prosiding/tambah-prosiding');
                            }}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="No. Pekerja"
                                    bind:inputValue={chargeListTable.param
                                        .filter.employeeNumber}
                                ></FilterTextField>
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={chargeListTable.param
                                        .filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={chargeListTable.param
                                        .filter.identityDocumentNumber}
                                ></FilterTextField>
                                <FilterSelectField
                                    label="Status"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={chargeListTable.param
                                        .filter.status}
                                ></FilterSelectField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            </CustomTabContent>
            <CustomTabContent title="Prosiding Tahan Kerja/Gantung Kerja">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <div class="h h-fit w-full">
                            <DataTable
                                title="Senarai Rekod Prosiding - Tahan Kerja/Gantung Kerja"
                                bind:tableData={suspendListTable}
                                bind:passData={rowData}
                                detailActions={() => {
                                    const route = `./prosiding/suspend-${rowData.integrityId}-${rowData.employeeId}`;

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
                                            .filter.identityDocumentNumber}
                                    ></FilterTextField>
                                    <FilterSelectField
                                        label="Status"
                                        options={data.selectionOptions
                                            .statusLookup}
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
    {/if}
</section>

<!-- <Toaster /> -->
