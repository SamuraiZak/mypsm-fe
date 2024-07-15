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
    import { Alert, Modal } from 'flowbite-svelte';
    import SearchSelect from '$lib/components/inputs/search-select/SearchSelect.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';

    export let data: PageData;
    let rowData: any;
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
        hiddenColumn: ['contractId'],
        dictionary: [],
        url: 'contracts/renew/list',
        id: 'nearExpiredContractTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: true,
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
            filter: true,
        },
        controls: {
            add: false,
            pdf: true,
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
            filter: true,
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
        dictionary: [
            {
                english: 'Remark',
                malay: 'Ulasan',
            },
        ],
        url: 'contracts/renew/personal_detail/list',
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

    $:{ selectedContract.contractors =
        (nearExpiredContractTable.selectedData as Contractor[]) ?? [];
    }
   
    let renewModal: boolean = false;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pembaharuan Kontrak" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    {#if data.currentRoleCode === UserRoleConstant.urusSetiaKhidmatSokongan.code || data.currentRoleCode === UserRoleConstant.pengarahBahagian.code || data.currentRoleCode === UserRoleConstant.pengarahNegeri.code}
        <div class="flex w-full flex-col justify-start gap-5 p-5 pb-10">
            <div class="flex max-h-full w-full flex-col pb-5">
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Pembaharuan Kontrak"
                        bind:tableData={renewContractTable}
                        bind:passData={rowData}
                        detailActions={() =>
                            goto('./contract-renewal/butiran/' + rowData.contractId)}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="ID Sementara"
                                bind:inputValue={renewContractTable.param.filter
                                    .temporaryId}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={renewContractTable.param.filter
                                    .name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={renewContractTable.param.filter
                                    .identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={renewContractTable.param.filter
                                    .status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>

            {#if data.currentRoleCode == UserRoleConstant.urusSetiaKhidmatSokongan.code}
                <div class="flex max-h-full w-full flex-col border-t">
                    <ContentHeader
                        title="Arahan: Pilih Kakitangan Untuk Dinilai Dalam Proses Pembaharuan Kontrak"
                        borderClass="border-none"
                    >
                        {#if selectedContract.contractors.length > 0}
                            <TextIconButton
                                label="Hantar Untuk Dinilai"
                                type="primary"
                                icon="edit"
                                onClick={() => (renewModal = true)}
                            />
                        {/if}
                    </ContentHeader>

                    <div class="h h-fit w-full">
                        <DataTable
                            title="Senarai Kontrak Yang Hampir Tamat"
                            bind:tableData={nearExpiredContractTable}
                        >
                            <FilterWrapper slot="filter">
                                <FilterTextField
                                    label="ID Sementara"
                                    bind:inputValue={nearExpiredContractTable
                                        .param.filter.temporaryId}
                                ></FilterTextField>
                                <FilterTextField
                                    label="Nama Kakitangan"
                                    bind:inputValue={nearExpiredContractTable
                                        .param.filter.name}
                                ></FilterTextField>
                                <FilterTextField
                                    label="No. Kad Pengenalan"
                                    bind:inputValue={nearExpiredContractTable
                                        .param.filter.identityDocumentNumber}
                                ></FilterTextField>
                                <FilterSelectField
                                    label="Status"
                                    options={data.selectionOptions.statusLookup}
                                    bind:inputValue={nearExpiredContractTable
                                        .param.filter.status}
                                ></FilterSelectField>
                            </FilterWrapper>
                        </DataTable>
                    </div>
                </div>
            {/if}
        </div>
    {:else if data.currentRoleCode == UserRoleConstant.kakitangan.code}
        <div class="flex w-full flex-col justify-start gap-2.5 p-5 pb-10">
            <div class="h h-fit w-full">
                <DataTable
                    title="Senarai Kontrak Dalam Proses Pembaharuan"
                    bind:tableData={supporterApproverTable}
                    bind:passData={rowData}
                    detailActions={() =>
                        goto('./contract-renewal/butiran/' + rowData.candidateId)}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="ID Sementara"
                            bind:inputValue={supporterApproverTable.param.filter
                                .temporaryId}
                        ></FilterTextField>
                        <FilterTextField
                            label="Nama Kakitangan"
                            bind:inputValue={supporterApproverTable.param.filter
                                .name}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={supporterApproverTable.param.filter
                                .identityDocumentNumber}
                        ></FilterTextField>
                        <FilterSelectField
                            label="Status"
                            options={data.selectionOptions.statusLookup}
                            bind:inputValue={supporterApproverTable.param.filter
                                .status}
                        ></FilterSelectField>
                    </FilterWrapper>
                </DataTable>
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
                            './contract-renewal/butiran/' + employeeData.contractId,
                        )}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="ID Sementara"
                            bind:inputValue={contractEmployeeTable.param.filter
                                .temporaryId}
                        ></FilterTextField>
                        <FilterTextField
                            label="Nama Kakitangan"
                            bind:inputValue={contractEmployeeTable.param.filter
                                .name}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={contractEmployeeTable.param.filter
                                .identityDocumentNumber}
                        ></FilterTextField>
                        <FilterSelectField
                            label="Status"
                            options={data.selectionOptions.statusLookup}
                            bind:inputValue={contractEmployeeTable.param.filter
                                .status}
                        ></FilterSelectField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </div>
    {/if}
</section>

<Toaster />
<Modal
    title="Sistem MyPSM"
    bind:open={renewModal}
    size="sm"
    dismissable={false}
>
    <div class="flex w-full flex-col justify-start gap-2.5">
        <Alert color="blue">
            <p>
                <span class="font-medium">Sistem: </span>
                Kakitangan kontrak yang dipilih akan dihantar ke Pengarah Bahagian/Negeri
                untuk dinilai dan dimasukkan ke dalam proses pembaharuan kontrak.
            </p>
        </Alert>
        <!-- <CustomSelectField
            label="Pengarah Bahagian/Negeri"
            id="director"
            options={data.supporterApproverLookup}
            bind:val={directorId}
        /> -->
        <div class="flex justify-center gap-3">
            <TextIconButton
                label="Hantar"
                icon="check"
                type="primary"
                onClick={async () => {
                    await _addSelectedContractForRenew(selectedContract)
                        .then((res) => {
                            if (res?.response?.status == 'success') {
                                nearExpiredContractTable.data =
                                    data.nearExpiredContractList;
                                renewContractTable.data =
                                    data.renewContractList;
                            }
                        })
                        .finally(() => {
                            renewModal = false;
                            nearExpiredContractTable.selectedData = [];
                        });
                }}
            />
            <TextIconButton
                label="Batal"
                icon="cancel"
                type="neutral"
                onClick={() => (renewModal = false)}
            />
        </div>
    </div>
</Modal>
