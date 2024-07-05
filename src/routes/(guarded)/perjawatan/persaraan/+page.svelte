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
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import { _updateUnspecifyTable, _updatevoluntaryTable } from './+page';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';

    export let data: PageData;
    let param: CommonListRequestDTO = data.param;
    let currentRoleCode = localStorage.getItem(
        LocalStorageKeyConstant.currentRoleCode,
    );

    // urusetia
    let urusetia = UserRoleConstant.urusSetiaIntegriti.code;

    // kakitangan
    let kakitangan = UserRoleConstant.kakitangan.code;

    // pengarah Integriti
    let pengarah = UserRoleConstant.pengarahIntegriti.code;

    let rowData: any;

    // voluntay table
    let voluntaryApplicationtable: TableSettingDTO = {
        param: data.param,
        meta: data.voluntaryViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.voluntaryViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'durationDays',
                malay: 'Jumlah Hari',
            },
        ],
        url: 'employment/retirement/voluntary/list',
        id: 'voluntaryApplicationtable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.props.currentRoleCode == UserRoleConstant.kakitangan.code,
        },
    };

    // Forced table

    let forceApplicationtable: TableSettingDTO = {
        param: data.param,
        meta: data.forceViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.forceViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'durationDays',
                malay: 'Jumlah Hari',
            },
        ],
        url: 'employment/retirement/force/list',
        id: 'forceApplicationtable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.props.currentRoleCode ==
                UserRoleConstant.urusSetiaPersaraan.code,
        },
    };

    // Unspecify table

    let unspecifyApplicationtable: TableSettingDTO = {
        param: data.param,
        meta: data.unspecifyViewResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.unspecifyViewResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['retirementId'],
        dictionary: [
            {
                english: 'name',
                malay: 'Kod Kumpulan',
            },
            {
                english: 'headCount',
                malay: 'Jumlah Kakitangan Terpilih',
            },
        ],
        url: 'employment/retirement/unspecify/list',
        id: 'unspecifyApplicationtable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.props.currentRoleCode ==
                UserRoleConstant.urusSetiaPersaraan.code,
        },
    };

    function unspecifyAddNew() {
        let url = '/perjawatan/persaraan/persaraan_lain-lain/baru';

        goto(url);
    }

    function forceAddNew() {
        let url = '/perjawatan/persaraan/persaraan_paksaan/baru';

        goto(url);
    }

    let voluntarytable: TableDTO = {
        param: data.param,
        meta: data.voluntaryViewResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.voluntaryViewTable ?? [],
    };

    let forcetable: TableDTO = {
        param: data.param,
        meta: data.forceViewResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.forceViewTable ?? [],
    };

    let unspecifytable: TableDTO = {
        param: data.param,
        meta: data.unspecifyViewResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.unspecifyViewTable ?? [],
    };

    async function _searchVoluntary() {
        _updatevoluntaryTable(voluntarytable.param).then((value) => {
            voluntarytable.data = value.props.response.data?.dataList ?? [];
            voluntarytable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            voluntarytable.param.pageSize = value.props.param.pageSize;
            voluntarytable.param.pageNum = value.props.param.pageNum;
        });
    }

    async function _searchForce() {
        _updatevoluntaryTable(forcetable.param).then((value) => {
            forcetable.data = value.props.response.data?.dataList ?? [];
            forcetable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            forcetable.param.pageSize = value.props.param.pageSize;
            forcetable.param.pageNum = value.props.param.pageNum;
        });
    }

    async function _searchUnspecify() {
        _updateUnspecifyTable(unspecifytable.param).then((value) => {
            unspecifytable.data = value.props.response.data?.dataList ?? [];
            unspecifytable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            unspecifytable.param.pageSize = value.props.param.pageSize;
            unspecifytable.param.pageNum = value.props.param.pageNum;
        });
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Persaraan"></ContentHeader>
</section>

<section class="flex w-full flex-col items-start justify-start overflow-y-auto">
    <CustomTab>
        <CustomTabContent title="Permohonan Sendiri">
            <div
                class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
            >
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Permohonan Sendiri"
                        bind:tableData={voluntaryApplicationtable}
                        bind:passData={rowData}
                        addActions={() => {
                            // addApplication();
                            let url =
                                '/perjawatan/persaraan/persaraan_pilihan/Baru';
                            goto(url);
                        }}
                        detailActions={() => {
                            let url =
                                '/perjawatan/persaraan/persaraan_pilihan/' +
                                rowData.retirementId;
                            goto(url);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={voluntaryApplicationtable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={voluntaryApplicationtable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={voluntaryApplicationtable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={voluntaryApplicationtable.param
                                    .filter.status}
                            ></FilterSelectField>
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={voluntaryApplicationtable.param
                                    .filter.year}
                            ></FilterNumberField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        <!-- forceApplicationtable -->
        <CustomTabContent title="Persaraan Paksaan">
            <div
                class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
            >
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Kumpulan Persaraan Paksaan"
                        bind:tableData={forceApplicationtable}
                        bind:passData={rowData}
                        addActions={() => {
                            // addApplication();
                            // let url =
                            //     '/perjawatan/persaraan/persaraan_paksaan/Baru';
                            // goto(url);
                            forceAddNew();
                        }}
                        detailActions={() => {
                            // let url =
                            //     '/perjawatan/persaraan/persaraan_paksaan/' +
                            //     rowData.retirementId;

                            let url =
                                '/perjawatan/persaraan/persaraan_paksa/' +
                                rowData.retirementId;
                            goto(url);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={forceApplicationtable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={forceApplicationtable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={forceApplicationtable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={forceApplicationtable.param
                                    .filter.status}
                            ></FilterSelectField>
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={forceApplicationtable.param
                                    .filter.year}
                            ></FilterNumberField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>

        <!-- unspecifyApplicationtable -->

        <CustomTabContent title="Persaraan lain-lain">
            <div
                class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
            >
                <div class="h h-fit w-full">
                    <DataTable
                        title="Senarai Kumpulan Persaraan Lain-lain"
                        bind:tableData={unspecifyApplicationtable}
                        bind:passData={rowData}
                        addActions={() => {
                            unspecifyAddNew();
                        }}
                        detailActions={() => {
                            let url =
                                '/perjawatan/persaraan/persaraan_lain-lain/' +
                                rowData.retirementId;
                            goto(url);
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterTextField
                                label="No. Pekerja"
                                bind:inputValue={unspecifyApplicationtable.param
                                    .filter.employeeNumber}
                            ></FilterTextField>
                            <FilterTextField
                                label="Nama Kakitangan"
                                bind:inputValue={unspecifyApplicationtable.param
                                    .filter.name}
                            ></FilterTextField>
                            <FilterTextField
                                label="No. Kad Pengenalan"
                                bind:inputValue={unspecifyApplicationtable.param
                                    .filter.identityDocumentNumber}
                            ></FilterTextField>
                            <FilterSelectField
                                label="Status"
                                options={data.selectionOptions.statusLookup}
                                bind:inputValue={unspecifyApplicationtable.param
                                    .filter.status}
                            ></FilterSelectField>
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={unspecifyApplicationtable.param
                                    .filter.year}
                            ></FilterNumberField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
