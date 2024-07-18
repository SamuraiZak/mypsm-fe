<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';

    import type { PageData } from '../tambah-rekod-surcaj/$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import { _updateTable } from './+page';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    let rowData: any;

    // ===============================================
    // ================ new Table ====================
    let addSurcajtable: TableSettingDTO = {
        param: data.param ?? data.param,
        meta: data.addSurcajViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.addSurcajViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id', 'employeeId'],
        dictionary: [],
        url: 'integrity/surcharge/employee_list',
        id: 'addSurcajtable',
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

<section class="flex w-full flex-col items-start justify-start overflow-y-auto">
    <ContentHeader title="">
        <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/v2/integrity/surcharge/')}
            form="form"
        />
    </ContentHeader>
    <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
        <div
            class="flex max-h-full w-full flex-col items-start justify-start pb-10"
        >

            <DataTable
                title="Senarai Permohonan"
                bind:tableData={addSurcajtable}
                bind:passData={rowData}
                detailActions={() =>
                    goto(
                        '/integriti/surcaj/tambah-rekod-surcaj/butiran-' +
                            rowData.id,
                    )}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama"
                        bind:inputValue={addSurcajtable.param.filter.name}
                    />
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={addSurcajtable.param.filter
                            .employeeNumber}
                    />
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={addSurcajtable.param.filter
                            .identityDocumentNumber}
                    />
                    <FilterTextField
                        label="Gred"
                        bind:inputValue={addSurcajtable.param.filter.grade}
                    />
                    <FilterTextField
                        label="Jawatan"
                        bind:inputValue={addSurcajtable.param.filter.position}
                    />
                    <FilterTextField
                        label="Tahun"
                        bind:inputValue={addSurcajtable.param.filter.year}
                    />
                </FilterWrapper>
            </DataTable>
        </div>
    </CustomTabContent>
</section>
