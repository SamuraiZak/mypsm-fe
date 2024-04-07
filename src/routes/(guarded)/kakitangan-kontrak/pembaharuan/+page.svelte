<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type {
        Contractor,
        RenewContractAddDTO,
    } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto';
    import type { RenewContractListResponseDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto';
    import { Toaster } from 'svelte-french-toast';
    import { _addSelectedContractForRenew, _updateApproverTable, _updateSupporterTable, _updateTable } from './+page';
    import type { PageData } from './$types';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { RenewContractEmployeeTable } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-employee-table.dto';

    export let data: PageData;
    let rowData = {} as RenewContractListResponseDTO;
    let employeeData = {} as RenewContractEmployeeTable;
    let selectedContract: RenewContractAddDTO = {
        contractors: [],
    };

    // table for near expired contract
    let nearExpiredContractTable: TableDTO = {
        param: data.nearExpiredContractParam,
        meta: data.nearExpiredContractListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.nearExpiredContractList ?? [],
        selectedData: [],
    };

    //table for renewing contract
    let renewContractTable: TableDTO = {
        param: data.renewContractParam,
        meta: data.renewContractListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.renewContractList ?? [],
        hiddenData: ['contractId'],
    };

    //table for penyokong/pelulus
    let supporterApproverTable: TableDTO = {
        param: data.supporterApproverParam,
        meta: data.supporterApproverTableResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.supporterApproverTable ?? [],
        hiddenData: ['contractId'],
    };

    //table for kakitangan kontrak
    let contractEmployeeTable: TableDTO = {
        param: data.supporterApproverParam,
        meta: data.employeeTableResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.employeeTable ?? [],
        hiddenData: ['contractId'],
    };

    $: selectedContract.contractors =
        (nearExpiredContractTable.selectedData as Contractor[]) ?? [];

    async function _search() {
        _updateTable(nearExpiredContractTable.param).then((value) => {
            nearExpiredContractTable.data =
                value.props.response.data?.dataList ?? [];
            nearExpiredContractTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            nearExpiredContractTable.param.pageSize =
                value.props.param.pageSize;
            nearExpiredContractTable.param.pageNum = value.props.param.pageNum;
        });
    }

    async function _searchRenewTable() {
        _updateTable(renewContractTable.param).then((value) => {
            renewContractTable.data = value.props.response.data?.dataList ?? [];
            renewContractTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            renewContractTable.param.pageSize = value.props.param.pageSize;
            renewContractTable.param.pageNum = value.props.param.pageNum;
        });
    }
    async function _searchSuppAppTable() {
        if (data.currentRoleCode == UserRoleConstant.penyokong.code) {
            _updateSupporterTable(supporterApproverTable.param).then((value) => {
                supporterApproverTable.data =
                    value.props.response.data?.dataList ?? [];
                supporterApproverTable.meta = value.props.response.data?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };
                supporterApproverTable.param.pageSize = value.props.param.pageSize;
                supporterApproverTable.param.pageNum = value.props.param.pageNum;
            });
        } else if (data.currentRoleCode == UserRoleConstant.pelulus.code){
            _updateApproverTable(supporterApproverTable.param).then((value) => {
                supporterApproverTable.data =
                    value.props.response.data?.dataList ?? [];
                supporterApproverTable.meta = value.props.response.data?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };
                supporterApproverTable.param.pageSize = value.props.param.pageSize;
                supporterApproverTable.param.pageNum = value.props.param.pageNum;
            });
        }
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pembaharuan Kontrak" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    {#if data.currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code || data.currentRoleCode === UserRoleConstant.pengarahBahagian.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5">
            <!-- <FilterCard onSearch={() => {}}>
                <FilterTextField
                    label="ID Kakitangan Kontrak"
                    inputValue={''}
                />
                <FilterTextField label="Nama" inputValue={''} />
                <FilterTextField label="No. Kad Pengenalan" inputValue={''} />
            </FilterCard> -->
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                <CustomTable
                    title="Senarai Kontrak Dalam Proses Pembaharuan"
                    onUpdate={_searchRenewTable}
                    bind:tableData={renewContractTable}
                    bind:passData={rowData}
                    enableDetail
                    detailActions={() =>
                        goto('./pembaharuan/butiran/' + rowData.contractId)}
                />

                {#if data.currentRoleCode == UserRoleConstant.urusSetiaKhidmatSokongan.code}
                    <ContentHeader
                        title="Tindakan: Pilih Kakitangan Untuk Dinilai Dalam Proses Pembaharuan Kontrak"
                        borderClass="border-none"
                    >
                        {#if selectedContract.contractors.length > 0}
                            <TextIconButton
                                label="Hantar Untuk Dinilai"
                                type="primary"
                                onClick={() => {
                                    _addSelectedContractForRenew(
                                        selectedContract,
                                    );
                                    _search;
                                }}
                            />
                        {/if}
                    </ContentHeader>

                    <CustomTable
                        title="Senarai Kontrak Yang Hampir Tamat"
                        onUpdate={_search}
                        bind:tableData={nearExpiredContractTable}
                        enableAdd
                    />
                {/if}
            </div>
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.penyokong.code || data.currentRoleCode == UserRoleConstant.pelulus.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5">
            <CustomTable
                title="Senarai Kontrak Dalam Proses Pembaharuan"
                onUpdate={_searchSuppAppTable}
                bind:tableData={supporterApproverTable}
                bind:passData={rowData}
                enableDetail
                detailActions={() =>
                    goto('./pembaharuan/butiran/' + rowData.contractId)}
            />
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5">
            <CustomTable
                title="Senarai Tawaran Pembaharuan Kontrak"
                bind:tableData={contractEmployeeTable}
                bind:passData={employeeData}
                enableDetail
                detailActions={() =>
                    goto('./pembaharuan/butiran/' + employeeData.contractId)}
            />
        </div>
    {/if}
</section>

<Toaster />
