<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterDateField from '$lib/components/table/filter/FilterDateField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicApplicationList } from '$lib/dto/mypsm/perubatan/permohonan-klinik/medical-clinic-application-list.dto';
    import type { PageData } from './$types';
    import { _updateTable } from './+page';

    export let data: PageData;
    let rowData = {} as ClinicApplicationList;

    let klinikPanelTable: TableDTO = {
        param: data.param,
        meta: data.clinicApplicationListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.clinicApplicationList ?? [],
        hiddenData: ['id'],
    };

    async function _search() {
        _updateTable(klinikPanelTable.param).then((value) => {
            klinikPanelTable.data = value.props.response.data?.dataList ?? [];
            klinikPanelTable.meta = value.props.response.data?.meta ?? {
                pageSize: 1,
                pageNum: 1,
                totalData: 1,
                totalPage: 1,
            };
            klinikPanelTable.param.pageSize = value.props.param.pageSize;
            klinikPanelTable.param.pageNum = value.props.param.pageNum;
            klinikPanelTable.hiddenData = ['id'];
        });
    }
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Klinik Panel">
        <TextIconButton
            icon="add"
            type="primary"
            label="Tambah Klinik Panel"
            onClick={() => goto('./permohonan-klinik-panel/butiran/baru')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="Kod Klinik" inputValue={''} />
            <FilterTextField label="Nama Klinik" inputValue={''} />
            <FilterTextField label="Status" inputValue={''} />
            <FilterDateField label="Tarikh Dimohon" inputValue={undefined}/>
            <FilterDateField label="Tarikh Dilantik" inputValue={undefined} />
        </FilterCard>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTable
                title="Rekod Permohonan Klinik Panel"
                onUpdate={_search}
                bind:tableData={klinikPanelTable}
                bind:passData={rowData}
                enableDetail
                detailActions={() =>
                    goto('./permohonan-klinik-panel/butiran/' + rowData.id)}
            />
        </div>
    </div>
</section>
