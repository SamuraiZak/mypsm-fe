<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    let param: CommonListRequestDTO = data.props.param;

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
        title="Sejarah Anugerah Pekerja Cemerlang (APC)"
        description="Hal-hal pengurusan sejarah APC bagi kakitangan LKIM"
        ><TextIconButton
            primary
            label="Tambah Rekod"
            onClick={() => {
                goto('./sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgPlus />
        </TextIconButton></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <SectionHeader title="Senarai Sejarah APC Mengikut Tahun"
            ></SectionHeader>
            <div class="h-fit max-h-full w-full pb-5">
                <CustomTable
                    bind:tableData={table}
                    onUpdate={_search}
                ></CustomTable>
            </div>
        </div>
    </div>
</section>
