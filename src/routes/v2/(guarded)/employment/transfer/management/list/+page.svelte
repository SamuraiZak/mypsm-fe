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
        hiddenColumn: ['applicationId'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
            {
                english: 'status',
                malay: 'Status Permohonan',
            },
            {
                english: 'transferType',
                malay: 'Jenis Pertukaran',
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
                    RoleConstant.pengarahNegeri.code ||
                data.props.layoutData.accountDetails.currentRoleCode ==
                    RoleConstant.pengarahBahagian.code ||
                data.props.layoutData.accountDetails.currentRoleCode ==
                    RoleConstant.ketuaPengarah.code
                    ? true
                    : false,
            pdf: true,
            excel: true,
        },
    };

    function addApplication() {
        goto('/v2/employment/transfer/management/new');
    }

    function viewDetails() {
        goto(
            '/v2/employment/transfer/management/details/' +
                selectedData.applicationId,
        );
    }
</script>

<section class="flex w-full flex-col items-center justify-center">
    <div class="flex h-20 w-full flex-row items-center justify-between px-10">
        <!-- leading -->
        <div class="flex w-full flex-col items-start justify-center gap-0">
            <p
                class="w-full text-wrap text-lg font-medium leading-tight text-slate-700"
            >
                Senarai Arahan Pertukaran
            </p>
            <p
                class="w-full text-wrap text-base font-normal leading-tight text-slate-500"
            >
                Pertukaran Atas Arahan Pihak Pengurusan
            </p>
        </div>
        <!-- trailing -->
        <div class="flex w-fit flex-row items-center justify-end gap-1">
            <TextIconButton
                icon="previous"
                label="Kembali"
                type="draft"
                onClick={() => {
                    goto('/v2/employment/transfer');
                }}
            ></TextIconButton>
        </div>
    </div>
</section>

<section
    class="flex h-full w-full flex-col items-start justify-start overflow-y-hidden"
>
    <div
        class="flex h-full max-h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto px-10"
    >
        <DataTable
            title=""
            bind:tableData={selfApplicationListTable}
            bind:passData={selectedData}
            detailActions={() => {
                viewDetails();
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
