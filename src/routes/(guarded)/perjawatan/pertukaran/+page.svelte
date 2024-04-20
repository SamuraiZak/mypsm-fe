<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { TransferTypeConstant } from '$lib/constants/core/transfer.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    let directorApplicationTable: TableSettingDTO = {
        param: data.director.directorApplicationListRequest,
        meta: data.director.directorApplicationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            data.director.directorApplicationListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id', 'employeeNumber', 'applicationType'],
        dictionary: [],
        url: 'employment/forced_transfer/list',
        id: 'directorApplicationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.props.userMode == 'director',
        },
    };

    let managementApplicationTable: TableSettingDTO = {
        param: data.management.managementApplicationListRequest,
        meta: data.management.managementApplicationListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data:
            data.management.managementApplicationListResponse.data?.dataList ??
            [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['id', 'employeeNumber', 'applicationType'],
        dictionary: [],
        url: 'employment/forced_transfer/list',
        id: 'managementApplicationTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: data.props.userMode == 'secretary',
        },
    };

    function addApplication() {
        let url = '';

        switch (data.props.userMode) {
            case 'director':
                url =
                    '/perjawatan/pertukaran-new/' +
                    TransferTypeConstant.director.description +
                    '/Baru';
                break;
            case 'secretary':
                url =
                    '/perjawatan/pertukaran-new/' +
                    TransferTypeConstant.management.description +
                    '/Baru';
                break;
            case 'employee':
                url =
                    '/perjawatan/pertukaran-new/' +
                    TransferTypeConstant.self.description +
                    '/Baru';
                break;

            default:
                url =
                    '/perjawatan/pertukaran-new/' +
                    TransferTypeConstant.self.description +
                    '/Baru';
                break;
        }

        goto(url);
    }

    function viewDetails() {
        const selectedApplicationType: LookupDTO =
            TransferTypeConstant.list.find(
                (item) => item.code == selectedData.applicationType,
            ) ?? TransferTypeConstant.director;

        let url =
            '/perjawatan/pertukaran-new/' +
            selectedApplicationType.description +
            '/' +
            selectedData.id;

        goto(url);
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Pertukaran"></ContentHeader>
    </section>

    <CustomTab>
        <CustomTabContent title="Pertukaran Atas Arahan Pengarah">
            <div
                class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-4"
            >
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Permohonan Pertukaran"
                        bind:tableData={directorApplicationTable}
                        bind:passData={selectedData}
                        addActions={() => {
                            addApplication();
                        }}
                        detailActions={() => {
                            viewDetails();
                        }}
                    >
                        <FilterWrapper slot="filter">
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={directorApplicationTable.param
                                    .filter.year}
                            ></FilterNumberField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pertukaran Atas Arahan Pihak Pengurusan">
            <div
                class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-4"
            >
                <div class="h-fit w-full">
                    <DataTable
                        title="Senarai Permohonan Pertukaran"
                        bind:tableData={managementApplicationTable}
                        bind:passData={selectedData}
                        addActions={() => {
                            addApplication();
                        }}
                        detailActions={() => {}}
                    >
                        <FilterWrapper slot="filter">
                            <FilterNumberField
                                label="Tahun"
                                bind:inputValue={managementApplicationTable
                                    .param.filter.year}
                            ></FilterNumberField>
                        </FilterWrapper>
                    </DataTable>
                </div>
            </div>
        </CustomTabContent>
    </CustomTab>
</div>
