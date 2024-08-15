<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { RoleConstant } from '$lib/constants/core/role.constant';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
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

    function addApplication() {
        goto('/v2/employment/transfer/self/new');
    }

    function viewDetails() {
        goto('/v2/employment/transfer/self/details');
    }
</script>

<section class="flex w-full flex-col items-center justify-center">
    <ContentHeader title="Senarai Pertukaran Atas Permohonan Sendiri">
        <TextIconButton
            icon="previous"
            type="draft"
            label="Pemangkuan Baru"
        />
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <div
        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto p-4"
    >
        <DataTable
            title=""
            bind:tableData={selfApplicationListTable}
            bind:passData={selectedData}
            detailActions={() => {
                // showDetails();
            }}
            addActions={() => {
                addApplication();
            }}
        >
            <FilterWrapper slot="filter">
                <FilterTextField
                    inputId="selfEmployeeNumber"
                    label="Nombor Pekerja"
                    bind:inputValue={selfApplicationListTable.param.filter
                        .employeeNumber}
                ></FilterTextField>
                <FilterTextField
                    inputId="selfName"
                    label="Nama Kakitangan"
                    bind:inputValue={selfApplicationListTable.param.filter.name}
                ></FilterTextField>
                <FilterTextField
                    inputId="selfIdentityDocumentNumber"
                    label="No. Kad Pengenalan"
                    bind:inputValue={selfApplicationListTable.param.filter
                        .identityDocumentNumber}
                ></FilterTextField>
                <FilterTextField
                    inputId="selfStatus"
                    label="Status"
                    bind:inputValue={selfApplicationListTable.param.filter
                        .status}
                ></FilterTextField>
            </FilterWrapper>
        </DataTable>
    </div>
</section>
