<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import { goto } from '$app/navigation';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import DFilterTextField from '$lib/components/d-filter/DFilterTextField.svelte';
    import DFilterCard from '$lib/components/d-filter/DFilterCard.svelte';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;

    let table: TableDTO = {
        param: data.props.param,
        meta: data.props.response.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.props.response.data?.dataList ?? [],
        selectedData: [],
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
            table.param.pageSize = table.param.pageSize;
            table.param.pageNum = table.meta.pageNum;
        });
    }
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Klinik Panel"
        description="Hal-hal berkaitan dengan pengurusan klinik panel"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5"
>
    <!-- filter card -->

    <DFilterCard onSearch={_search}>
        <!-- textfield -->
        <DFilterTextField label="Kod" bind:inputValue={table.param.filter.code}
        ></DFilterTextField>

        <!-- textfield -->
        <DFilterTextField label="Nama" bind:inputValue={table.param.filter.name}
        ></DFilterTextField>

        <!-- textfield -->
        <DFilterTextField
            label="Negeri"
            bind:inputValue={table.param.filter.state}
        ></DFilterTextField>

        <!-- textfield -->
        <DFilterTextField
            label="Status"
            bind:inputValue={table.param.filter.status}
        ></DFilterTextField>
    </DFilterCard>
    <!-- filter card end here -->

    <section class="h-full w-full">
        <SectionHeader title="Senarai Rekod Permohonan Klinik Panel"
        ></SectionHeader>
        <div class="h-fit max-h-full w-full pb-5">
            <CustomTable tableData={table} onUpdate={_search} enableDetail detailActions={()=>{goto('/urus-setia/perubatan/permohonan-panel-klinik/butiran-1')}}
            ></CustomTable>
        </div>
    </section>
</section>
