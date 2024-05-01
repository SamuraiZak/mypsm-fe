<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type {
        Contractor,
        RenewContractAddDTO,
    } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto';
    import type { RenewContractListResponseDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto';
    import { Toaster } from 'svelte-french-toast';
    import { _addSelectedContractForRenew } from './+page';
    import type { PageData } from './$types';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { RenewContractEmployeeTable } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-employee-table.dto';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: PageData;
    let rowData = {} as RenewContractListResponseDTO;
    let employeeData = {} as RenewContractEmployeeTable;
    let selectedContract: RenewContractAddDTO = {
        contractors: [],
    };

    // table for near expired contract
    let nearExpiredContractTable: TableSettingDTO = {
        param: data.nearExpiredContractParam,
        meta: data.nearExpiredContractListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.nearExpiredContractList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [],
        url: 'contracts/renew/list',
        id: 'nearExpiredContractTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    //table for renewing contract
    let renewContractTable: TableSettingDTO = {
        param: data.renewContractParam,
        meta: data.renewContractListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.renewContractList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['contractId'],
        dictionary: [],
        url: 'contracts/renew/list',
        id: 'renewContractTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    //table for penyokong/pelulus
    let supporterApproverTable: TableSettingDTO = {
        param: data.supporterApproverParam,
        meta: data.supporterApproverTableResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.supporterApproverTable ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['contractId'],
        dictionary: [],
        url:
            data.currentRoleCode == UserRoleConstant.penyokong.code
                ? 'contracts/renew/supporter/list'
                : 'contracts/renew/approver/list',
        id: 'supporterApproverTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    //table for kakitangan kontrak
    let contractEmployeeTable: TableSettingDTO = {
        param: data.supporterApproverParam,
        meta: data.employeeTableResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.employeeTable ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['contractId'],
        dictionary: [],
        url: '',
        id: 'contractEmployeeTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: false,
        },
        controls: {
            add: false,
        },
    };

    $: selectedContract.contractors =
        (nearExpiredContractTable.selectedData as Contractor[]) ?? [];
    $: nearExpiredContractTable.data = data.nearExpiredContractList;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pembaharuan Kontrak" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code || data.currentRoleCode === UserRoleConstant.pengarahBahagian.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
            >
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Pembaharuan Kontrak"
                        bind:tableData={renewContractTable}
                        bind:passData={rowData}
                        detailActions={() =>
                            goto('./pembaharuan/butiran/' + rowData.contractId)}
                    />
                </div>

                {#if data.currentRoleCode == UserRoleConstant.urusSetiaKhidmatSokongan.code}
                    <ContentHeader
                        title="Arahan: Pilih Kakitangan Untuk Dinilai Dalam Proses Pembaharuan Kontrak"
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
                                }}
                            />
                        {/if}
                    </ContentHeader>

                    <div class="h h-fit w-full">
                        <DataTable
                            title="Senarai Kontrak Yang Hampir Tamat"
                            bind:tableData={nearExpiredContractTable}
                        />
                    </div>
                {/if}
            </div>
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.penyokong.code || data.currentRoleCode == UserRoleConstant.pelulus.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5">
            <div class="h h-fit w-full">
                <DataTable
                    title="Senarai Kontrak Dalam Proses Pembaharuan"
                    bind:tableData={supporterApproverTable}
                    bind:passData={rowData}
                    detailActions={() =>
                        goto('./pembaharuan/butiran/' + rowData.contractId)}
                />
            </div>
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.kakitanganKontrak.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5">
            <div class="h h-fit w-full">
                <DataTable
                    title="Senarai Tawaran Pembaharuan Kontrak"
                    bind:tableData={contractEmployeeTable}
                    bind:passData={employeeData}
                    detailActions={() =>
                        goto(
                            './pembaharuan/butiran/' + employeeData.contractId,
                        )}
                />
            </div>
        </div>
    {/if}
</section>

<Toaster />
