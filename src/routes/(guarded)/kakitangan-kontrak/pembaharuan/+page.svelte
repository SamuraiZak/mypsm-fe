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
    import { _addSelectedContractForRenew } from './+page';
    import type { PageData } from './$types';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';

    export let data: PageData;
    let rowData = {} as RenewContractListResponseDTO;
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

    $: selectedContract.contractors =
        (nearExpiredContractTable.selectedData as Contractor[]) ?? [];
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
                                _addSelectedContractForRenew(selectedContract);
                            }}
                        />
                    {/if}
                </ContentHeader>

                <CustomTable
                    title="Senarai Kontrak Yang Hampir Tamat"
                    bind:tableData={nearExpiredContractTable}
                    enableAdd
                />
            {/if}
        </div>
    </div>
</section>

<Toaster />
