<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import { ProgramDropdownConstant } from '$lib/constants/dropdown/program.constant';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    let selectedDataRow: CommonEmployeeDTO;

    let employeeListTable: TableDTO = {
        param: data.props.employeeListRequestBody,
        meta: data.props.employeeListResponse.data?.meta ?? {
            pageSize: data.props.employeeListRequestBody.pageSize ?? 50,
            pageNum: data.props.employeeListRequestBody.pageNum ?? 1,
            totalData: 50,
            totalPage: 1,
        },
        data: data.props.employeeList,
        hiddenData: ['employeeId'],
    };

    async function _search() {
        _updateTable(employeeListTable.param).then((value) => {
            employeeListTable.data = value.props.response.data?.dataList ?? [];
            employeeListTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            employeeListTable.param.pageSize = employeeListTable.meta.pageSize;
            employeeListTable.param.pageNum = employeeListTable.meta.pageNum;
        });
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Laporan Cuti"></ContentHeader>
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
            <FilterCard onSearch={_search}>
                <FilterTextField
                    label="No. Pekerja"
                    bind:inputValue={employeeListTable.param.filter
                        .employeeNumber}
                ></FilterTextField>
                <FilterTextField
                    label="Nama"
                    bind:inputValue={employeeListTable.param.filter.name}
                ></FilterTextField>
                <FilterTextField
                    label="No. Kad Pengenalan"
                    bind:inputValue={employeeListTable.param.filter
                        .identityCard}
                ></FilterTextField>
                <FilterSelectField
                    label="Program"
                    options={ProgramDropdownConstant.list}
                    bind:inputValue={employeeListTable.param.filter.program}
                ></FilterSelectField>
            </FilterCard>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    title="Senarai Semua Kakitangan"
                    bind:tableData={employeeListTable}
                    bind:passData={selectedDataRow}
                    enableDetail
                    onUpdate={_search}
                    detailActions={() => {
                        const redirectUrl =
                            '/cuti/laporan-cuti/' +
                            selectedDataRow.employeeNumber;

                        goto(redirectUrl);
                    }}
                ></CustomTable>
            </div>
        </div>
    </div>
</section>
