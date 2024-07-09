<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterNumberField from '$lib/components/table/filter/FilterNumberField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { TableSettingDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedData: any;

    let employeeListTable: TableSettingDTO = {
        param: data.props.employeeListRequestBody,
        meta: data.props.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.employeeListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId', 'employeeNumber'],
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
            detail: true,
            edit: false,
            select: false,
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
        <ContentHeader title="Peruntukan Cuti Kakitangan"></ContentHeader>
    </section>
    <div
        class="flex h-full max-h-full w-full flex-col justify-start gap-2 overflow-y-auto bg-ios-basic-white px-10 py-4"
    >
        <div
            class="flex h-fit min-h-fit w-full flex-row gap-2 rounded bg-blue-100 p-2"
        >
            <div
                class="flex h-5 max-h-5 min-h-5 w-5 min-w-5 max-w-5 flex-col items-center justify-start"
            >
                <span
                    class="flex h-5 w-full flex-col items-center justify-center text-center align-middle text-ios-systemColors-systemBlue-light"
                >
                    <SvgInfoSolid></SvgInfoSolid>
                </span>
            </div>
            <div
                class="flex h-fit min-h-5 w-full flex-col items-start justify-start gap-2"
            >
                <span
                    class="flex h-fit min-h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-semibold text-ios-systemColors-systemBlue-light"
                >
                    Sila pilih kakitangan untuk melihat laporan cuti bagi
                    kakitangan tersebut
                </span>
            </div>
        </div>
        <div class="h h-fit w-full">
            <DataTable
                title="Senarai Kakitangan"
                bind:tableData={employeeListTable}
                bind:passData={selectedData}
                detailActions={() => {
                    let url =
                        'peruntukan_cuti_kakitangan/' + selectedData.employeeNumber;

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
