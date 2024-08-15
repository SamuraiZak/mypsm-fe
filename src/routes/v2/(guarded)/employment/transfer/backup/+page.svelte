<script lang="ts">
    import { goto } from '$app/navigation';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    // table setting for self application
    let selfApplicationListTable: TableSettingDTO = {
        param: data.props.selfApplication.request,
        meta: data.props.selfApplication.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.selfApplication.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'status',
                malay: 'Status Permohonan',
            },
        ],
        url: 'employment/self_transfer/list',
        id: 'selfApplicationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.props.layoutData.accountDetails.currentRoleCode ==
                RoleConstant.kakitangan.code,
        },
    };

    // table setting for director application
    let directorApplicationListTable: TableSettingDTO = {
        param: data.props.directorApplication.request,
        meta: data.props.directorApplication.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.directorApplication.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'status',
                malay: 'Status Permohonan',
            },
        ],
        url: 'employment/self_transfer/list',
        id: 'directorApplicationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.props.layoutData.accountDetails.currentRoleCode ==
                    RoleConstant.pengarahBahagian.code ||
                data.props.layoutData.accountDetails.currentRoleCode ==
                    RoleConstant.pengarahNegeri.code,
        },
    };

    // table setting for management application
    let managementApplicationListTable: TableSettingDTO = {
        param: data.props.managementApplication.request,
        meta: data.props.managementApplication.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.managementApplication.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: [],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'status',
                malay: 'Status Permohonan',
            },
        ],
        url: 'employment/self_transfer/list',
        id: 'managementApplicationListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add:
                data.props.layoutData.accountDetails.currentRoleCode ==
                RoleConstant.urusSetiaPerjawatan.code,
        },
    };

    function addApplication(params: string) {
        let url: string = '';

        switch (params) {
            case 'self':
                url = '/v2/employment/transfer/self/0';
                break;
            case 'director':
                url = '/v2/employment/transfer/director/0';
                break;
            case 'management':
                url = '/v2/employment/transfer/management/0';
                break;
            default:
                break;
        }

        goto(url);
    }
    
    function viewDetails() {
        let url: string = '/v2/employment/transfer/';

        goto(url);
    }
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Pertukaran"></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pertukaran Atas Permohonan Sendiri">
            <div
                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
            >
                <DataTable
                    title="Senarai Permohonan Pertukaran: Permohonan Sendiri"
                    bind:tableData={selfApplicationListTable}
                    bind:passData={selectedData}
                    detailActions={() => {
                        // showDetails();
                    }}
                    addActions={() => {
                        addApplication('self');
                    }}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            inputId="selfEmployeeNumber"
                            label="Nombor Pekerja"
                            bind:inputValue={selfApplicationListTable.param
                                .filter.employeeNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="selfName"
                            label="Nama Kakitangan"
                            bind:inputValue={selfApplicationListTable.param
                                .filter.name}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="selfIdentityDocumentNumber"
                            label="No. Kad Pengenalan"
                            bind:inputValue={selfApplicationListTable.param
                                .filter.identityDocumentNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="selfStatus"
                            label="Status"
                            bind:inputValue={selfApplicationListTable.param
                                .filter.status}
                        ></FilterTextField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pertukaran Atas Arahan Pengarah">
            <div
                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
            >
                <DataTable
                    title="Senarai Permohonan Pertukaran: Arahan Pengarah"
                    bind:tableData={directorApplicationListTable}
                    bind:passData={selectedData}
                    detailActions={() => {
                        // showDetails();
                    }}
                    addActions={() => {
                        addApplication('director');
                    }}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            inputId="directorEmployeeNumber"
                            label="Nombor Pekerja"
                            bind:inputValue={directorApplicationListTable.param
                                .filter.employeeNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="directorName"
                            label="Nama Kakitangan"
                            bind:inputValue={directorApplicationListTable.param
                                .filter.name}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="directorIdentityDocumentNumber"
                            label="No. Kad Pengenalan"
                            bind:inputValue={directorApplicationListTable.param
                                .filter.identityDocumentNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="directorStatus"
                            label="Status"
                            bind:inputValue={directorApplicationListTable.param
                                .filter.status}
                        ></FilterTextField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pertukaran Secara Pentadbiran">
            <div
                class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
            >
                <DataTable
                    title="Senarai Permohonan Pertukaran: Secara Pentadbiran"
                    bind:tableData={managementApplicationListTable}
                    bind:passData={selectedData}
                    detailActions={() => {
                        // showDetails();
                    }}
                    addActions={() => {
                        addApplication('management');
                    }}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            inputId="managementEmployeeNumber"
                            label="Nombor Pekerja"
                            bind:inputValue={managementApplicationListTable
                                .param.filter.employeeNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="managementName"
                            label="Nama Kakitangan"
                            bind:inputValue={managementApplicationListTable
                                .param.filter.name}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="managementIdentityDocumentNumber"
                            label="No. Kad Pengenalan"
                            bind:inputValue={managementApplicationListTable
                                .param.filter.identityDocumentNumber}
                        ></FilterTextField>
                        <FilterTextField
                            inputId="managementStatus"
                            label="Status"
                            bind:inputValue={managementApplicationListTable
                                .param.filter.status}
                        ></FilterTextField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
