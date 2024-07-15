<script lang="ts">
    import type {
        TableDTO,
        TableSettingDTO,
    } from '$lib/dto/core/table/table.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    import DataTable from '$lib/components/table/DataTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';

    export let data: PageData;

    // set up table
    let selectedData: any;

    // POC
    let employeeListTable: TableSettingDTO = {
        param: data.props.employeeListRequest,
        meta: data.props.employeeListResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.employeeListResponse.data?.dataList ?? [],
        selectedData: [],
        exportData: [],
        hiddenColumn: ['employeeId'],
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

    function selectActions(employeeNumber: number) {
        goto('/v2/performance/apc/add/' + employeeNumber);
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod Sejarah Anugerah Perkhidmatan Cemerlang (APC)"
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('../sejarah-apc');
            }}
        >
            <SvgChevronLeft></SvgChevronLeft>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <!-- Table filter placeholder -->

        <div
            class="flex max-h-full w-full flex-col items-start justify-start gap-2.5"
        >
            <div
                class="flex h-fit min-h-5 w-full flex-row gap-2 rounded bg-blue-100 p-2"
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
                        class="flex h-5 w-full flex-col items-start justify-center text-center align-middle text-sm font-semibold text-ios-systemColors-systemBlue-light"
                    >
                        Sila pilih kakitangan yang terpilih untuk diberikan
                        Anugerah Pekerja Cemerlang
                    </span>
                </div>
            </div>
            <div class="h h-fit w-full">
                <DataTable
                    title="Senarai Kakitangan"
                    bind:tableData={employeeListTable}
                    bind:passData={selectedData}
                    selectActions={() => {
                        selectActions(selectedData.employeeNumber);
                    }}
                >
                    <FilterWrapper slot="filter">
                        <FilterTextField
                            label="Nama Pengguna"
                            bind:inputValue={employeeListTable.param.filter
                                .name}
                        ></FilterTextField>
                        <FilterTextField
                            label="No. Kad Pengenalan"
                            bind:inputValue={employeeListTable.param.filter
                                .identityDocumentNumber}
                        ></FilterTextField>
                    </FilterWrapper>
                </DataTable>
            </div>
        </div>
    </div>
</section>
