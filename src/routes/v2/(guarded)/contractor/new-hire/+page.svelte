<script lang="ts">
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { goto } from '$app/navigation';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { Alert, Modal } from 'flowbite-svelte';
    import type { ContractEmployeeListDTO } from '$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { PageData } from './$types';
    export let data: PageData;
    let selectedRow = {} as ContractEmployeeListDTO;
    let select2: any;
    let openModal: boolean = false;
    //table for urus setia/penyokong/pelulus
    let contractEmployeeListTable: TableSettingDTO = {
        param: data.contractEmployeeListParam,
        meta: data.contractEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.contractEmployeeList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['candidateId', 'applicationId'],
        dictionary: [],
        url:
            data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code
                ? 'contracts/list'
                : data.currentRoleCode == UserRoleConstant.penyokong.code
                  ? 'contracts/supporter_approval/list'
                  : 'contracts/approver_approval/list',
        id: 'contractEmployeeListTable',
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
    let contractEmployeeListTable2: TableSettingDTO = {
        param: data.contractEmployeeListParam,
        meta: data.contractEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 2,
            totalPage: 1,
        },
        data: data.contractEmployeeList2 ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['candidateId', 'applicationId'],
        dictionary: [],
        url:
            data.currentRoleCode == UserRoleConstant.urusSetiaPerjawatan.code
                ? 'contracts/list'
                : data.currentRoleCode == UserRoleConstant.penyokong.code
                  ? 'contracts/supporter_approval/list'
                  : 'contracts/approver_approval/list',
        id: 'contractEmployeeListTable2',
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
    <ContentHeader title="Pelantikan Baharu (Kontrak)">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
            <TextIconButton
                onClick={() => goto('./new-hire/permohonan-baru')}
                icon="add"
                type="primary"
                label="Tambah Kontrak Baharu"
            />
        {:else if data.currentRoleCode === UserRoleConstant.calonKontrak.code}
            <TextIconButton
                onClick={() =>
                    goto(
                        './new-hire/butiran-' +
                            data.employeeContractOffer[0].applicationId,
                    )}
                type="primary"
                icon="add"
                label="Kemaskini"
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Senarai Rekod Kakitangan Kontrak"
                        bind:tableData={contractEmployeeListTable}
                        bind:passData={selectedRow}
                        detailActions={() => {
                            if (
                                selectedRow.remark ==
                                    'Menunggu Calon Menghantar Maklumat Peribadi' ||
                                selectedRow.status == 'Draf'
                            ) {
                                openModal = true;
                            } else if (selectedRow.status !== 'Baru') {
                                goto(
                                    './new-hire/butiran-' +
                                        selectedRow.applicationId,
                                );
                            }
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="ID Sementara"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.temporaryId}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        {:else if data.currentRoleCode === UserRoleConstant.calonKontrak.code}
            <div class="flex max-h-full w-full flex-col p-4">
                <div class="flex w-1/2 flex-col justify-start gap-5">
                    <Alert color="blue">
                        <p class="font-medium">
                            Arahan:
                            <span class="font-normal"
                                >Tekan butang kemaskini untuk mengemaskini
                                maklumat calon.</span
                            >
                        </p>
                    </Alert>
                    <CustomTextField
                        label="Nama"
                        id="candidateName"
                        bind:val={data.employeeContractOffer[0].candidateName}
                        disabled
                        isRequired={false}
                    />
                    <CustomTextField
                        label="Id Sementara"
                        id="temporaryId"
                        bind:val={data.employeeContractOffer[0].temporaryId}
                        disabled
                        isRequired={false}
                    />
                    <CustomTextField
                        label="Emel"
                        id="email"
                        bind:val={data.employeeContractOffer[0].email}
                        disabled
                        isRequired={false}
                    />
                    <CustomTextField
                        label="Status"
                        id="status"
                        bind:val={data.employeeContractOffer[0].status}
                        disabled
                        isRequired={false}
                    />
                    <CustomTextField
                        label="Ulasan"
                        id="remark"
                        bind:val={data.employeeContractOffer[0].remark}
                        disabled
                        isRequired={false}
                    />
                </div>
            </div>
        {:else if data.currentRoleCode == UserRoleConstant.kakitangan.code}
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Senarai Rekod Kakitangan Kontrak"
                        bind:tableData={contractEmployeeListTable2}
                        bind:passData={select2}
                        detailActions={() => {
                            if (
                                select2.remark ==
                                    'Menunggu Calon Menghantar Maklumat Peribadi' ||
                                select2.status == 'Draf'
                            ) {
                                openModal = true;
                            } else if (select2.status !== 'Baru') {
                                goto(
                                    './new-hire/butiran-' +
                                        select2.candidateId,
                                );
                            }
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="ID Sementara"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.temporaryId}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={contractEmployeeListTable.param
                                    .filter.status}
                            ></FilterSelectField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        {/if}
    </div>
</section>

<Modal title="Sistem MyPSM" size="xs" bind:open={openModal}>
    <Alert color="blue">
        <p>
            <span class="font-medium">Arahan: </span>
            {selectedRow.status == 'Draf'
                ? 'Masuk ke draf permohonan?'
                : 'Calon belum mengemaskini maklumat peribadi.'}
        </p>
    </Alert>
    <div class="flex flex-row justify-center">
        <TextIconButton
            label={selectedRow.status == 'Draf' ? 'Masuk' : 'Kemaskini'}
            icon={selectedRow.status == 'Draf' ? 'check' : ''}
            type="primary"
            onClick={() =>
                goto('./new-hire/permohonan-' + selectedRow.applicationId)}
        />
    </div>
</Modal>
