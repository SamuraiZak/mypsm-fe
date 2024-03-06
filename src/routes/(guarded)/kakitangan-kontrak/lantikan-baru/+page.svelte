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
    export let data: PageData;
    // Role Code
    let rowData: any;

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
        <TextIconButton
            onClick={() => goto('./lantikan-baru/baru')}
            icon="add"
            type="primary"
            label="Tambah Kontrak Baru"
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
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
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Senarai Rekod Kakitangan Kontrak"
                onUpdate={_searchFilterContractEmployeeList}
                enableDetail
                bind:tableData={contractEmployeeListTable}
                bind:passData={rowData}
                detailActions={() =>
                    goto('./lantikan-baru/butiran-' + rowData.candidateId)}
            />
        </div>
    </div>
</section>
