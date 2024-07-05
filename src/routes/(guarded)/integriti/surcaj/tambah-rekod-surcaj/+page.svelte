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

    // let addSurcajtable: TableDTO = {
    //     param: param,
    //     meta: {
    //         pageSize: 5,
    //         pageNum: 1,
    //         totalData: 4,
    //         totalPage: 1,
    //     },
    //     data: data.addSurcajViewTable ?? [],
    // };

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

    // async function _search() {
    //     _updateTable(addSurcajtable.param).then((value) => {
    //         addSurcajtable.data =
    //             value.props.response.data?.dataList ?? [];
    //         addSurcajtable.meta = value.props.response.data?.meta ?? {
    //             pageSize: 1,
    //             pageNum: 1,
    //             totalData: 1,
    //             totalPage: 1,
    //         };
    //         addSurcajtable.param.pageSize = value.props.param.pageSize;
    //         addSurcajtable.param.pageNum = value.props.param.pageNum;
    //     });
    // }
</script>

<section class="flex w-full flex-col items-start justify-start overflow-y-auto">
    <ContentHeader title="">
        <TextIconButton
            type="primary"
            label="Kembali"
            onClick={() => goto('/integriti/surcaj/')}
            form="form"
        />
    </ContentHeader>
    <CustomTabContent title="Senarai Tindakan/Ulasan Tatatertib">
        <div
            class="flex max-h-full w-full flex-col items-start justify-start pb-10"
        >
            <!-- <FilterCard onSearch={_search}>
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
                <FilterTextField
                    label="Nama"
                    bind:inputValue={addSurcajtable.param.filter.name}
                />
            </FilterCard>
            
            <CustomTable
            title="Rekod Pekerja"
                enableDetail
                bind:passData={rowData}
                bind:tableData={addSurcajtable}
                detailActions= {()=>goto ("/integriti/surcaj/tambah-rekod-surcaj/butiran-" + rowData.id)}
            ></CustomTable> -->

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
