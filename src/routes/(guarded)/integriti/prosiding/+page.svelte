<script lang="ts">
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { _updateChargeTable, _updateSuspensionTable } from './+layout';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import type {
        ProceedingChargeDetailResponseDTO,
        ProceedingChargeListResponseDTO,
    } from '$lib/dto/mypsm/integrity/proceeding/proceeding-charges-response.dto';
    import type { ProceedingsuspensionListResponseDTO } from '$lib/dto/mypsm/integrity/proceeding/proceeding-suspension-list-response.dto';

    export let data: LayoutData;
    let rowData: ProceedingChargeDetailResponseDTO;
    let param: CommonListRequestDTO = data.param;

    // Table list - Charge Table
    let proceedingChargeTable: TableDTO = {
        param: param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.list.proceedingList as ProceedingChargeListResponseDTO) ?? [],
        hiddenData: ['integrityId', 'employeeId'],
    };

    async function _updateProceedingChargeTable() {
        _updateChargeTable(proceedingChargeTable.param).then((value) => {
            proceedingChargeTable.data = value.response.data?.dataList ?? [];
            proceedingChargeTable.meta = value.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            proceedingChargeTable.param.pageSize =
                proceedingChargeTable.meta.pageSize;
            proceedingChargeTable.param.pageNum =
                proceedingChargeTable.meta.pageNum;
        });
    }

    // Suspension Table
    let proceedingSuspensionTable: TableDTO = {
        param: param,
        meta: data.responses.proceedingListResponse.data?.meta ?? {
            pageNum: 1,
            pageSize: 5,
            totalData: 4,
            totalPage: 1,
        },
        data:
            (data.list
                .proceedingSuspensionList as ProceedingsuspensionListResponseDTO) ??
            [],
        hiddenData: ['integrityId', 'employeeId'],
    };

    async function _updateProceedingSuspensionTable() {
        _updateSuspensionTable(proceedingSuspensionTable.param).then(
            (value) => {
                proceedingSuspensionTable.data =
                    value.response.data?.dataList ?? [];
                proceedingSuspensionTable.meta = value.response.data?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };
                proceedingSuspensionTable.param.pageSize =
                    proceedingSuspensionTable.meta.pageSize;
                proceedingSuspensionTable.param.pageNum =
                    proceedingSuspensionTable.meta.pageNum;
            },
        );
    }
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
    {#if !data.roles.isStaffRole}
        <div
            class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
        >
            {#if !data.roles.isStaffRole}
                <ContentHeader
                    title="Tekan butang disebelah untuk menambah rekod prosiding"
                    borderClass="border-none"
                >
                    <TextIconButton
                        label="Tambah Prosiding - Pertuduhan"
                        type="primary"
                        onClick={() => goto('./prosiding/tambah-prosiding')}
                    ></TextIconButton>
                </ContentHeader>
            {/if}
            <!-- Table filter placeholder -->
            <FilterCard onSearch={_updateProceedingChargeTable}>
                <FilterSelectField
                    label="Status"
                    options={data.selectionOptions.statusLookup}
                    bind:inputValue={proceedingChargeTable.param.filter.status}
                ></FilterSelectField>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                {#if data.roles.isDisciplineSecretaryRole}
                    <CustomTable
                        title="Senarai Rekod Prosiding - Tahan Kerja/Gantung Kerja"
                        onUpdate={_updateProceedingChargeTable}
                        enableDetail
                        bind:tableData={proceedingChargeTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}`;

                            goto(route);
                        }}
                    ></CustomTable>
                {:else if data.roles.isIntegritySecretaryRole}
                    <CustomTable
                        title="Senarai Rekod Prosiding"
                        onUpdate={_updateProceedingSuspensionTable}
                        enableDetail
                        bind:tableData={proceedingSuspensionTable}
                        bind:passData={rowData}
                        detailActions={() => {
                            const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}`;

                            goto(route);
                        }}
                    ></CustomTable>
                {/if}
            </div>
        </div>
    {:else if data.roles.isStaffRole}
        <CustomTab>
            <CustomTabContent title="Prosiding Pertuduhan">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <!-- Table filter placeholder -->
                    <FilterCard onSearch={_updateProceedingChargeTable}>
                        <FilterSelectField
                            label="Status"
                            options={data.selectionOptions.statusLookup}
                            bind:inputValue={proceedingChargeTable.param.filter
                                .status}
                        ></FilterSelectField>
                    </FilterCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            title="Senarai Rekod Prosiding"
                            onUpdate={_updateProceedingChargeTable}
                            enableDetail
                            bind:tableData={proceedingChargeTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}`;

                                goto(route);
                            }}
                        ></CustomTable>
                    </div>
                </div>
            </CustomTabContent>
            <CustomTabContent title="Prosiding Tahan Kerja/Gantung Kerja">
                <div
                    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
                >
                    <FilterCard onSearch={_updateProceedingSuspensionTable}>
                        <FilterSelectField
                            label="Status"
                            options={data.selectionOptions.statusLookup}
                            bind:inputValue={proceedingChargeTable.param.filter
                                .status}
                        ></FilterSelectField>
                    </FilterCard>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <CustomTable
                            title="Senarai Rekod Prosiding"
                            onUpdate={_updateProceedingSuspensionTable}
                            enableDetail
                            bind:tableData={proceedingSuspensionTable}
                            bind:passData={rowData}
                            detailActions={() => {
                                const route = `./prosiding/${rowData.integrityId}-${rowData.employeeId}`;

                                goto(route);
                            }}
                        ></CustomTable>
                    </div>
                </div>
            </CustomTabContent>
        </CustomTab>
    {/if}
</section>

<!-- <Toaster /> -->
