<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import { GCRWithdrawalTypeConstant } from '$lib/constants/core/early-gcr.constant';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    let employeeListTable: TableSettingDTO = {
        param: data.props.param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'employeeNumber', 'id'],
        dictionary: [
            {
                english: 'identityCardNumber',
                malay: 'No. Kad Pengenalan',
            },
        ],
        url: 'employee/list',
        id: 'employeeListTable',
        option: {
            checkbox: false,
            detail: false,
            edit: false,
            select: true,
            filter: true,
        },
        controls: {
            add: false,
        },
    };
</script>

<div
    class="flex h-full max-h-full w-full flex-col overflow-y-hidden bg-ios-basic-lightBackgroundGray"
>
    <section class="flex w-full flex-col items-start justify-start">
        <ContentHeader title="Pengeluaran GCR"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={employeeListTable}
                bind:passData={selectedData}
                selectActions={() => {
                    let url =
                        '/cuti/pengeluaran_GCR/permohonan_baru/' +
                        selectedData.employeeId;

                    goto(url);
                }}
            >
                <FilterWrapper slot="filter">
                    <FilterTextField
                        label="No. Pekerja"
                        bind:inputValue={employeeListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={employeeListTable.param.filter.name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={employeeListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={employeeListTable.param.filter.year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
