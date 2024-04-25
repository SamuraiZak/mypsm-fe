<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import { TextAppearanceHelper } from '$lib/helpers/core/text-appearance.helper';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { Alert } from 'flowbite-svelte';
    import type {
        ADRoleDTO,
        ADRolePlusDTO,
    } from '$lib/dto/core/admin/admin.dto';
    import { _addRoles } from './+page';

    export let data: PageData;

    let selectedData: any;

    // POC
    let roleListTable: TableSettingDTO = {
        param: data.props.roleListRequest,
        meta: data.props.roleListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.roleListResponse.data?.dataList ?? [],
        selectedData: [...(data.props.currentEmployeeDetail?.roles ?? [])],
        exportData: [],
        hiddenColumn: ['code', 'id', 'userGroupCode'],
        dictionary: [
            {
                english: 'description',
                malay: 'Nama Peranan',
            },
        ],
        url: 'lookup/roles/filter',
        id: 'roleListTable',
        option: {
            checkbox: true,
            detail: false,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: false,
        },
    };

    function submit() {
        let formData: ADRolePlusDTO = {
            id: data.props.currentEmployeeId,
            roles: roleListTable.selectedData as ADRoleDTO[],
        };

        const response = _addRoles(formData);
    }
    function reset() {
        roleListTable.selectedData = [
            ...(data.props.currentEmployeeDetail?.roles ?? []),
        ];
    }
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Pengurusan Peranan Pengguna"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="flex h-fit w-full flex-col">
            <div class="flex h-fit w-full flex-col rounded bg-blue-100 p-2.5">
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >Nama Kakitangan:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.currentEmployeeDetail?.name ?? '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >No. Pekerja:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.currentEmployeeDetail?.employeeNumber ??
                                '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >No. Kad Pengenalan:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.currentEmployeeDetail?.identityCard ??
                                '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >Gred:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.currentEmployeeDetail?.grade ?? '',
                        )}</span
                    >
                </div>
                <div
                    class="flex h-7 w-full flex-row items-center justify-start gap-2"
                >
                    <span class="w-40 min-w-40 text-base font-medium"
                        >Jawatan:</span
                    >
                    <span class="w-full text-base font-normal"
                        >{TextAppearanceHelper.toProper(
                            data.props.currentEmployeeDetail?.position ?? '',
                        )}</span
                    >
                </div>
            </div>
        </div>
        <div class="flex w-full flex-col gap-10">
            <Alert color="blue">
                <p>
                    <span class="font-medium">Arahan:</span>
                    Sila klik butang tambah untuk tambah perananan atau butang tolak
                    untuk buang peranan bagi pengguna ini dan klik butang "Kemaskini"
                    untuk simpan.
                </p>
            </Alert>
        </div>
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Peranan"
                bind:tableData={roleListTable}
                bind:passData={selectedData}
            >
                <div
                    slot="extras"
                    class="flex h-full w-fit flex-row items-center justify-end gap-1"
                >
                    <TextIconButton
                        label="Set Semula"
                        icon="reset"
                        type="neutral"
                        onClick={() => {
                            reset();
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        label="Kemaskini"
                        icon="check"
                        onClick={() => {
                            submit();
                        }}
                    ></TextIconButton>
                </div>
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="Nama Peranan"
                        bind:inputValue={roleListTable.param.filter.name}
                    ></FilterTextField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>

<Toaster></Toaster>
