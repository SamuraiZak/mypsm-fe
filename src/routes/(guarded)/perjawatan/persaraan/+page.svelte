<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';

    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { LocalStorageKeyConstant } from '$lib/constants/core/local-storage-key.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';

    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import { _updateUnspecifyTable, _updatevoluntaryTable } from './+page';

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



    <section class="flex w-full flex-col items-start justify-start  overflow-y-auto">
       
       <CustomTab> <CustomTabContent title="Permohonan Sendiri">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
            <FilterCard onSearch={_searchVoluntary}>
                <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={voluntarytable.param.filter.employeeNumber}
                />
                <FilterTextField
                    label="Nama"
                    bind:inputValue={voluntarytable.param.filter.name}
                />
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={voluntarytable.param.filter.identityCardNumber}
                />
                <FilterTextField
                    label="Tarikh Permohonan"
                    bind:inputValue={voluntarytable.param.filter.applicationDate}
                />
            </FilterCard>
                <CustomTable
                title="Rekod Surcaj"
                    bind:passData={rowData}
                    bind:tableData={voluntarytable}
                    onUpdate={_searchVoluntary}
                ></CustomTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Paksaan">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
            <FilterCard onSearch={_searchForce}>
                <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={voluntarytable.param.filter.employeeNumber}
                />
                <FilterTextField
                    label="Nama"
                    bind:inputValue={voluntarytable.param.filter.name}
                />
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={voluntarytable.param.filter.identityCardNumber}
                />
                <FilterTextField
                    label="Tarikh Permohonan"
                    bind:inputValue={voluntarytable.param.filter.applicationDate}
                />
            </FilterCard>
                <CustomTable
                title="Rekod Surcaj"
                    bind:passData={rowData}
                    bind:tableData={forcetable}
                    onUpdate={_searchForce}
                ></CustomTable>
            </div>
        </CustomTabContent>

        <CustomTabContent title="Persaraan lain-lain">
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
            <FilterCard onSearch={_searchForce}>
                <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={voluntarytable.param.filter.employeeNumber}
                />
                <FilterTextField
                    label="Nama"
                    bind:inputValue={voluntarytable.param.filter.name}
                />
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={voluntarytable.param.filter.identityCardNumber}
                />
                <FilterTextField
                    label="Tarikh Permohonan"
                    bind:inputValue={voluntarytable.param.filter.applicationDate}
                />
            </FilterCard>
                <CustomTable
                title="Rekod Surcaj"
                    bind:passData={rowData}
                    bind:tableData={unspecifytable}
                    onUpdate={_searchUnspecify}
                ></CustomTable>
            </div>
        </CustomTabContent>
    </CustomTab>
    </section>

