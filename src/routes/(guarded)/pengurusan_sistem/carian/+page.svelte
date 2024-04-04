<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import ImpactCard from '$lib/components/button/ImpactCard.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import ImpactTable from '$lib/components/table/ImpactTable.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import FilterWrapper from '$lib/components/table/filter/FilterWrapper.svelte';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';
    export let data: PageData;

    let param: CommonListRequestDTO = data.props.listParam;

    let table: TableDTO = {
        param: param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        hiddenData: ['employeeId'],
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
    <ContentHeader title="Carian"
        ><TextIconButton
            label="Tambah Rekod"
            onClick={() => {
                goto('./sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgPlus />
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="mb-20 flex h-full min-h-full w-full flex-col justify-start bg-black overflow-y-auto px-10"
>

    <div
        class="flex h-full max-h-full w-full resize-none flex-col justify-start gap-2 overflow-hidden bg-white pb-14"
    >
        <!-- component starts here -->
        <!-- component wrapper -->
        <div
            class="flex h-full max-h-full w-full resize-none flex-col justify-start gap-2 overflow-hidden bg-white"
        >
            <!-- component starts here -->
            <!-- component wrapper -->
            <ImpactTable title="Senarai Kategori Carian">
                <FilterWrapper slot="filter">
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                    <FilterTextField></FilterTextField>
                </FilterWrapper>
            </ImpactTable>
        </div>
    </div>
    
</section>
