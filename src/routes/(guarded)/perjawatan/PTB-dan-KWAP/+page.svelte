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
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { PageData } from './$types';
    import {
        _updateTable,
        _updateTableEmployee,
        _updateTableNo,
    } from './+page';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';
    import { _tableInformation } from './butiran/[id]-[pensionid]/+page';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
 
    export let data: PageData;
  
    let param: CommonListRequestDTO = data.param;
    let paramNo: CommonListRequestDTO = data.paramNo;
    let paramEmp: CommonListRequestDTO = data.paramEmp;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );
    // urusetia
    let urusetia = UserRoleConstant.urusSetiaPerjawatan.code;
    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;
    // penyokong
    let pelulus = UserRoleConstant.pelulus.code;
    // penyokong
    let penyokong = UserRoleConstant.penyokong.code;

    let rowData: any;

    // list employee

    let addActingTable: TableSettingDTO = {
        param: data.paramEm,
        meta: data.actingEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.actingEmployeeList,
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'homeAddress'],
        dictionary: [],
        url: 'employee/list',
        id: 'addActingTable',
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

    let PTBtable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbViewTable ?? [],
    };

    let PTBtableNo: TableDTO = {
        param: paramNo,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbNoViewTable ?? [],
    };

    let PTBtableEmployee: TableDTO = {
        param: paramEmp,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbEmployeeTable ?? [],
    };

    // async function _search() {
    //     _updateTable(PTBtable.param).then((value) => {
    //         PTBtable.data = value.props.response.data?.dataList ?? [];
    //         PTBtable.meta = value.props.response.data?.meta ?? {
    //             pageSize: 1,
    //             pageNum: 1,
    //             totalData: 1,
    //             totalPage: 1,
    //         };
    //         PTBtable.param.pageSize = PTBtable.meta.pageSize;
    //         PTBtable.param.pageNum = PTBtable.meta.pageNum;
    //     });
    // }

     // Table list - New Offer Meeting

     let employeeLoantable: TableDTO = {
        param: param,
        meta: {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.ptbViewTable ?? [],
    };

    // new table
     let PTBListTable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.ptbViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            (data.ptbViewResponse.data
                ?.dataList ) ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id',"employeeId"],
        dictionary: [
        ],
        url: 'employment/pension_detail/list',
        id: 'PTBListTable',
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
    async function _searchNo() {
        _updateTableNo(PTBtableNo.param).then((value) => {
            PTBtableNo.data = value.props.response.data?.dataList ?? [];
            PTBtableNo.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            PTBtableNo.param.pageSize = PTBtableNo.meta.pageSize;
            PTBtableNo.param.pageNum = PTBtableNo.meta.pageNum;
        });
    }

    async function _searchEmp() {
        _updateTableEmployee(PTBtableEmployee.param).then((value) => {
            PTBtableEmployee.data = value.props.response.data?.dataList ?? [];
            PTBtableEmployee.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            PTBtableEmployee.param.pageSize = PTBtableEmployee.meta.pageSize;
            PTBtableEmployee.param.pageNum = PTBtableEmployee.meta.pageNum;
        });
    }

    function handleDownload(agreementLetter: any): void {
        throw new Error('Function not implemented.');
    }

    const getEmployee = async () => {
        _tableInformation(rowData.employeeId).then((res) => {
            // $personalInfoForm = res.response.data?.details as PersonalDetailDTO;
        });
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
    >
        <!-- <TextIconButton
            label="Tambah Rekod"
            onClick={() => {
                goto('/perjawatan/PTB-dan-KWAP/butiran/baru-permohonan');
            }}
        >
            <SvgPlus />
        </TextIconButton> -->

        {#if currentRoleCode === kakitangan}
        <TextIconButton
        label="Surat Permohonan"
        onClick={() => {
            goto('/perjawatan/PTB-dan-KWAP/surat');
        }}
    >
        <SvgPlus />
    </TextIconButton>
    {/if}</ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
{#if currentRoleCode === urusetia || currentRoleCode === pelulus || currentRoleCode === penyokong }
        <CustomTab>
            <CustomTabContent
                title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
            >
              
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                <!-- <FilterCard onSearch={_search}>
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={PTBtable.param.filter
                            .staffName}
                    />
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={PTBtable.param.filter.staffNo}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={PTBtable.param.filter
                            .identityCard}
                    />
                    <FilterTextField
                        label="Jawatan"
                        bind:inputValue={PTBtable.param.filter
                            .position}
                    />
                    <FilterTextField
                        label="Gred"
                        bind:inputValue={PTBtable.param.filter.grade}
                    />
                </FilterCard>
                    <CustomTable
                    title="Senarai Kakitangan Baharu diberi PTB dan KWAP"
                        onUpdate={_search}
                        enableDetail
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                `/perjawatan/PTB-dan-KWAP/butiran/` +
                                    rowData.employeeId +
                                    '-' +
                                    rowData.id,
                            );
                        }}
                        bind:tableData={PTBtable}
                    ></CustomTable> -->

                    <DataTable
                    title="Senarai Permohonan"
                    bind:tableData={PTBListTable}
                    bind:passData={rowData}
                    detailActions={() => {
                        goto(
                            `/perjawatan/PTB-dan-KWAP/butiran/` +
                                rowData.employeeId +
                                '-' +
                                rowData.id,
                        );
                    }}
                 
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="Nama"
                            bind:inputValue={PTBListTable.param.filter
                                .employeeName}
                        />
                        <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={PTBtable.param.filter.staffNo}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={PTBtable.param.filter
                            .identityCard}
                    />
                    <FilterTextField
                        label="Jawatan"
                        bind:inputValue={PTBtable.param.filter
                            .position}
                    />
                    <FilterTextField
                        label="Gred"
                        bind:inputValue={PTBtable.param.filter.grade}
                    />
                    </FilterWrapper>
                </DataTable>




                </div>

<!-- new -->



<!--  -->

            </CustomTabContent>

            <CustomTabContent title="Senarai Kakitangan TIADA No. Pencen">
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- <CustomTable
                        onUpdate={_searchNo}
                        enableDetail
                        bind:passData={rowData}
                        detailActions={() => {
                            goto(
                                `./PTB-dan-KWAP/urus-setia/butiran/` +
                                    rowData.employeeId +
                                    '-' +
                                    rowData.id,
                            );
                        }}
                        bind:tableData={PTBtableNo}
                    ></CustomTable> -->
                    <div class="h-fit w-full p-3">
                        <DataTable
                            title="Senarai Kakitangan"
                            bind:tableData={addActingTable}
                            bind:passData={rowData}
                            detailActions={() => {
                            goto('/perjawatan/PTB-dan-KWAP/butiran/'+rowData.employeeId+'-baru')
                            }}
                                
                        >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="Nama"
                                bind:inputValue={addActingTable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={addActingTable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={addActingTable.param
                                    .filter.identityCard}
                            ></FilterTextField>
                            <FilterTextField
                                label="Jawatan"
                                bind:inputValue={addActingTable.param
                                    .filter.position}
                            ></FilterTextField>
                        </FilterWrapper>
                    </DataTable>
                    </div>
                </div>
            </CustomTabContent>
        </CustomTab>
        {/if}
  

    {#if currentRoleCode === kakitangan}
        <CustomTabContent title="Senarai Kakitangan Baharu diberi PTB dan KWAP">
            <FilterCard></FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    onUpdate={_searchEmp}
                    enableDetail
                    bind:passData={rowData}
                    detailActions={() => {
                        goto(
                            `/perjawatan/PTB-dan-KWAP/butiran/` +
                                rowData.employeeId +
                                '-' +
                                rowData.id,
                        );
                    }}
                    bind:tableData={PTBtableEmployee}
                ></CustomTable>
            </div>
        </CustomTabContent>
    {/if}
</section>
