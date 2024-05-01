<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type {
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import { Modal } from 'flowbite-svelte';
    import type { ContractEmployeeListDTO } from '$lib/dto/mypsm/kakitangan-kontrak/contract-employee-list.dto';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    export let data: PageData;
    let selectedRow = {} as ContractEmployeeListDTO;
    let openModal: boolean = false;
    //table for urus setia/penyokong/pelulus

    let contractEmployeeListTable: TableSettingDTO = {
        param: data.contractEmployeeListParam,
        meta: data.contractEmployeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.contractEmployeeList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['candidateId'],
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
            filter: false,
        },
        controls: {
            add: false,
        },
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Perlantikan Baharu (Kontrak)">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
            <TextIconButton
                onClick={() => goto('./lantikan-baru/permohonan-baru')}
                icon="add"
                type="primary"
                label="Tambah Kontrak Baru"
            />
        {:else if data.currentRoleCode === UserRoleConstant.calonKontrak.code}
            <TextIconButton
                onClick={() =>
                    goto(
                        './lantikan-baru/butiran-' +
                            data.employeeContractOffer[0].candidateId,
                    )}
                type="primary"
                label="Kemaskini Maklumat"
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        {#if data.currentRoleCode !== UserRoleConstant.calonKontrak.code}
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <div class="h h-fit w-full p-3">
                    <DataTable
                        title="Senarai Rekod Kakitangan Kontrak"
                        bind:tableData={contractEmployeeListTable}
                        bind:passData={selectedRow}
                        detailActions={() => {
                            if (selectedRow.status == 'Baru') {
                                openModal = true;
                            } else if (selectedRow.status !== 'Baru') {
                                goto(
                                    './lantikan-baru/butiran-' +
                                        selectedRow.candidateId,
                                );
                            }
                        }}
                    />
                </div>
            </div>
        {:else if data.currentRoleCode === UserRoleConstant.calonKontrak.code}
            <div
                class="flex max-h-full w-full flex-col items-start justify-start gap-5 p-4"
            >
                <CustomTextField
                    label="Nama"
                    id="candidateName"
                    bind:val={data.employeeContractOffer[0].candidateName}
                    disabled
                />
                <CustomTextField
                    label="Id Sementara"
                    id="temporaryId"
                    bind:val={data.employeeContractOffer[0].temporaryId}
                    disabled
                />
                <CustomTextField
                    label="Emel"
                    id="email"
                    bind:val={data.employeeContractOffer[0].email}
                    disabled
                />
                <CustomTextField
                    label="Status"
                    id="status"
                    bind:val={data.employeeContractOffer[0].status}
                    disabled
                />
                <CustomTextField
                    label="Ulasan"
                    id="remark"
                    bind:val={data.employeeContractOffer[0].remark}
                    disabled
                />
            </div>
        {/if}
    </div>
</section>

<Modal class="flex w-[200px]" bind:open={openModal}>
    <div class="flex flex-row justify-center gap-2.5">
        <TextIconButton
            label="Kemaskini Semula"
            type="primary"
            onClick={() =>
                goto('./lantikan-baru/permohonan-' + selectedRow.candidateId)}
        />
    </div>
</Modal>
