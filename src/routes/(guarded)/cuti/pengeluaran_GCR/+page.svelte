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

    let withdrawalListTable: TableSettingDTO = {
        param: data.props.request,
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
        url: 'leave/gcr/withdrawal/list',
        id: 'withdrawalListTable',
        option: {
            checkbox: false,
            detail: true,
            edit: false,
            select: false,
            filter: true,
        },
        controls: {
            add: true,
        },
    };

    function addApplication() {
        let url = '';
        switch (data.props.currentRoleCode) {
            case UserRoleConstant.kakitangan.code:
                url = '/cuti/pengeluaran_GCR/baru/pengeluaran_awal';
                break;
            case UserRoleConstant.urusSetiaCuti.code:
                url = '/cuti/pengeluaran_GCR/senarai_kakitangan';
                break;
            default:
                url = '/cuti/pengeluaran_GCR/baru/pengeluaran_awal';
                break;
        }

        goto(url);
    }

    function viewDetails() {
        let currentType: DropdownDTO =
            GCRWithdrawalTypeConstant.list.find(
                (item) => item.name == selectedData.dataType,
            ) ?? GCRWithdrawalTypeConstant.early;

        let url =
            '/cuti/pengeluaran_GCR/' + selectedData.id + '/' + currentType.url;

        goto(url);
    }
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
                title="Senarai Permohonan Pengeluaran GCR"
                bind:tableData={withdrawalListTable}
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
                        label="No. Pekerja"
                        bind:inputValue={withdrawalListTable.param.filter
                            .employeeNumber}
                    ></FilterTextField>
                    <FilterTextField
                        label="Nama Kakitangan"
                        bind:inputValue={withdrawalListTable.param.filter
                            .name}
                    ></FilterTextField>
                    <FilterTextField
                        label="No. Kad Pengenalan"
                        bind:inputValue={withdrawalListTable.param.filter
                            .identityDocumentNumber}
                    ></FilterTextField>
                    <FilterNumberField
                        label="Tahun"
                        bind:inputValue={withdrawalListTable.param.filter.year}
                    ></FilterNumberField>
                </FilterWrapper>
            </DataTable>
        </div>
    </div>
</div>
