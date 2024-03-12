<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { RenewContractAddDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-add.dto';
    import type { RenewContractListResponseDTO } from '$lib/dto/mypsm/kakitangan-kontrak/renew-contract-list-response.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData = {} as RenewContractListResponseDTO;
    let selectedContract = {} as RenewContractAddDTO;

    // table for near expired contract
    let nearExpiredContractTable: TableDTO = {
        param: data.nearExpiredContractParam,
        meta: data.nearExpiredContractListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.nearExpiredContractList ?? [],
    };

    //table for renewing contract
    let renewContractTable: TableDTO = {
        param: data.renewContractParam,
        meta: data.renewContractListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 0,
            totalPage: 1,
        },
        data: data.renewContractList ?? [],
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pembaharuan Kontrak" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="ID Kakitangan Kontrak" inputValue={''} />
            <FilterTextField label="Nama" inputValue={''} />
            <FilterTextField label="No. Kad Pengenalan" inputValue={''} />
        </FilterCard>
        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <CustomTable
                title="Senarai Kontrak Dalam Proses Pembaharuan"
                bind:tableData={renewContractTable}
                bind:passData={rowData}
                enableDetail
                detailActions={() =>
                    goto('./pembaharuan/butiran/' + rowData.contractId)}
            />

            <ContentHeader
                title="Tindakan: Pilih Kakitangan Untuk Dinilai Dalam Proses Pembaharuan Kontrak"
                borderClass="border-none"
            >
                <TextIconButton
                    label="Hantar Untuk Dinilai"
                    type="primary"
                    onClick={() => {}}
                />
            </ContentHeader>

            <CustomTable
                title="Senarai Kontrak Yang Hampir Tamat"
                bind:tableData={nearExpiredContractTable}
                bind:passData={selectedContract.contractors}
                enableAdd
            />
        </div>
    </div>
</section>
