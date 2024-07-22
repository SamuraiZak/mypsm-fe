<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO, TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import {
        _updateDirectorTable,
        _updateEmployeeTable,
        _updateTable,
    } from './+page';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
 
    // urusetia
    let urusetia = UserRoleConstant.urusSetiaIntegriti.code;

    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;

    // pengarah Integriti
    let pengarah = UserRoleConstant.pengarahIntegriti.code;

    let rowData: any;

   

    // ==================== New Table ===================
    // =================================================
   
    // ================= pengarah ======================
    // =================================================

    let directorSurcajtable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.directorSurcajViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.directorSurcajViewResponse.data
                ?.dataList ) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id',"employeeId"],
        dictionary: [
        ],
        url: 'integrity/surcharge/list',
        id: 'directorSurcajtable',
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

     // ================= employee ======================
    // =================================================

    let employeeSurcajtable: TableSettingDTO = {
        param: data.paramEmployee ?? data.paramEmployee,
        meta: data.employeeSurcajViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.employeeSurcajViewResponse.data
                ?.dataList ) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id',"employeeId"],
        dictionary: [
        ],
        url: 'integrity/surcharge/list_by_employee',
        id: 'employeeSurcajtable',
        option: {
            checkbox: false,
            detail:  false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
    
      // ================= urusetia ======================
    // =================================================
    
    let surcajtable: TableSettingDTO = {
        param: data.paramUrusSetia ?? data.paramUrusSetia,
        meta: data.surcajViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.surcajViewResponse.data
                ?.dataList ) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id',"employeeId"],
        dictionary: [
        ],
        url: 'integrity/surcharge/list',
        id: 'surcajtable',
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

<!-- double check filter semua -->

{#if data.currentRoleCode === urusetia}
    <section class="flex w-full flex-col items-start justify-start gap-2.5 overflow-y-auto">
        <ContentHeader title="Tekan butang disebelah untuk tambah Surcaj">
            <TextIconButton
                type="primary"
                label="Tambah Surcaj"
                onClick={() => goto('/v2/integrity/surcharge/tambah-rekod-surcaj')}
                form="form"
            />
        </ContentHeader>
        <div class="flex w-full flex-col justify-start p-3">
            <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
               
                    <!-- New Table -->

                    <DataTable
                    title="Senarai Permohonan"
                    bind:tableData={surcajtable}
                    bind:passData={rowData}
                    detailActions={() =>
                        goto(
                            '/integriti/surcaj/butiran-' +
                                rowData.surchargeId +
                                '-' +
                                rowData.employeeId,
                        )}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={surcajtable.param.filter.employeeNumber}
                    />
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={surcajtable.param.filter.name}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={surcajtable.param.filter.identityDocumentNumber}
                    />
                    <FilterDateField
                        label="Tarikh Permohonan"
                        bind:inputValue={surcajtable.param.filter.applicationDate}
                    />
                    </FilterWrapper>
                </DataTable>
                </div>
            </CustomTabContent>
        </div>
    </section>
{/if}

{#if data.currentRoleCode === pengarah}
    <section class="flex w-full flex-col items-start justify-start  overflow-y-auto">
        <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >


                <!--  new table -->
                <DataTable
                title="Senarai Permohonan"
                bind:tableData={directorSurcajtable}
                bind:passData={rowData}
                detailActions={() =>
                    goto(
                        '/integriti/surcaj/pengarah-butiran-' +
                            rowData.surchargeId +
                            '-' +
                            rowData.employeeId,
                    )}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={directorSurcajtable.param.filter.employeeNumber}
                />
                <FilterTextField
                    label="Nama"
                    bind:inputValue={directorSurcajtable.param.filter.name}
                />
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={directorSurcajtable.param.filter.identityDocumentNumber}
                />
                <FilterTextField
                    label="Tarikh Permohonan"
                    bind:inputValue={directorSurcajtable.param.filter.applicationDate}
                />
                </FilterWrapper>
            </DataTable>
                
            </div>
        </CustomTabContent>
    </section>
{/if}

{#if data.currentRoleCode === kakitangan}
    <section class="flex w-full flex-col items-start justify-start  overflow-y-auto">
        <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
            <div class="h-fit w-full p-3">
           
            <!-- New Table -->
            
            <DataTable
            title="Senarai Tindakan/Ulasan Tatatertib"
            bind:tableData={employeeSurcajtable}
            bind:passData={rowData}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                label="No. Pekerja"
                bind:inputValue={employeeSurcajtable.param.filter.employeeNumber}
            />
            <FilterTextField
                label="Nama"
                bind:inputValue={employeeSurcajtable.param.filter.name}
            />
            <FilterTextField
                label="No. Kad Pengenalan"
                bind:inputValue={employeeSurcajtable.param.filter.identityDocumentNumber}
            />
            <FilterTextField
                label="Tarikh Permohonan"
                bind:inputValue={employeeSurcajtable.param.filter.applicationDate}
            />
            </FilterWrapper>
        </DataTable>
    </div>

        </CustomTabContent>
    </section>
{/if}
