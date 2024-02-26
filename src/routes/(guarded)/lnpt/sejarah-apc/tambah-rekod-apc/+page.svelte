<script lang="ts">
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';

    export let data: PageData;

    let param: CommonListRequestDTO = data.props.param;

    let selectedDataRow: CommonEmployeeDTO | null = null;

    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
    };

    async function _search() {
        _updateTable(table.param).then((value) => {
            table.data = value.props.response.data?.dataList ?? [];
            table.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            table.param.pageSize = table.meta.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
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
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    title="Senarai Semua Kakitangan"
                    bind:tableData={table}
                    bind:passData={selectedDataRow}
                    enableSelect
                    onUpdate={_search}
                    selectActions={() => {
                        const url =
                            '/lnpt/sejarah-apc/tambah-rekod-apc/butiran-' +
                            selectedDataRow?.employeeNumber;
                        goto(url);
                    }}
                ></CustomTable>
            </div>
        </div>
    </div>
</section>
