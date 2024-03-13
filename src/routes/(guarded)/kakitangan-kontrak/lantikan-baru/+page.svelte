<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { _updateContractEmployeeListTable } from './+page';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { ContractEmployeeServices } from '$lib/services/implementation/mypsm/kakitangan-kontrak/contract-employee.service';
    import type { GetContractEmployeeOffer } from '$lib/dto/mypsm/kakitangan-kontrak/get-contract-employee-offer.dto';
    export let data: PageData;
    let rowData: GetContractEmployeeOffer;

    //table for urus setia/penyokong/pelulus
    let param: CommonListRequestDTO = data.contractEmployeeListParam;
    let contractEmployeeListTable: TableDTO = {
        param: param,
        meta: data.contractEmployeeListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.contractEmployeeList ?? [],
        hiddenData: ['candidateId'],
    };
    console.log(data.contractEmployeeList);
    //table for calon kakitangan kontrak
    let contractOfferTable: TableDTO = {
        param: param,
        meta: data.contractEmployeeListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.employeeContractOffer ?? [],
        hiddenData: ['candidateId'],
    };

    async function _searchFilterContractEmployeeList() {
        _updateContractEmployeeListTable(contractEmployeeListTable.param).then(
            (value) => {
                contractEmployeeListTable.data =
                    value.response.data?.dataList ?? [];
                contractEmployeeListTable.meta = value.response.data?.meta ?? {
                    pageSize: 1,
                    pageNum: 1,
                    totalData: 1,
                    totalPage: 1,
                };
                contractEmployeeListTable.param.pageSize =
                    contractEmployeeListTable.meta.pageSize;
                contractEmployeeListTable.param.pageNum =
                    contractEmployeeListTable.meta.pageNum;
            },
        );
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Perlantikan Baharu (Kontrak)">
        {#if data.currentRoleCode === UserRoleConstant.urusSetiaPerjawatan.code}
            <TextIconButton
                onClick={() => goto('./lantikan-baru/baru')}
                icon="add"
                type="primary"
                label="Tambah Kontrak Baru"
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        {#if data.currentRoleCode !== UserRoleConstant.calonKontrak.code}
            <FilterCard onSearch={_searchFilterContractEmployeeList}>
                <FilterTextField
                    label="ID Kakitangan Kontrak"
                    bind:inputValue={contractEmployeeListTable.param.filter
                        .temporaryId}
                ></FilterTextField>
                <FilterTextField
                    label="Nama"
                    bind:inputValue={contractEmployeeListTable.param.filter
                        .candidateName}
                ></FilterTextField>
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={contractEmployeeListTable.param.filter
                        .identityCardNo}
                ></FilterTextField>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title="Senarai Rekod Kakitangan Kontrak"
                    onUpdate={_searchFilterContractEmployeeList}
                    enableDetail
                    bind:tableData={contractEmployeeListTable}
                    bind:passData={rowData}
                    detailActions={() =>
                        goto(
                            './lantikan-baru/butiran-calon-' +
                                rowData.candidateId,
                        )}
                />
            </div>
        {:else if data.currentRoleCode === UserRoleConstant.calonKontrak.code}
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <CustomTable
                    title="Senarai Kontrak Yang Ditawarkan"
                    enableDetail
                    bind:tableData={contractOfferTable}
                    bind:passData={rowData}
                    hiddenFooter
                    detailActions={() => {
                        goto(
                            './lantikan-baru/butiran-calon-' +
                                rowData.candidateId,
                        );
                    }}
                />
            </div>
        {/if}
    </div>
</section>
