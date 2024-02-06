<script lang="ts">
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { agendaCutiTable } from '$lib/mocks/profil/agenda-cuti';
    import { agendaKenaikanPangkatTable } from '$lib/mocks/profil/agenda-kenaikan-pangkat';
    import { agendaSemasaTable } from '$lib/mocks/profil/agenda-semasa';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { goto } from '$app/navigation';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { CommonListRequestDTO } from '$lib/dto/core/common/common-list-request.dto';
    import { _updateTable } from '../+page';
    import type { PageData } from '../$types';
    export let data: PageData;

    let passData: Record<string, any> = {};

    let param: CommonListRequestDTO = data.param;

    let table: TableDTO = {
        param: param,
        meta: data.personalAgendaResponse.data?.meta ?? {
            pageSize: 1,
            pageNum: 1,
            totalData: 1,
            totalPage: 1,
        },
        data: data.personalAgendaResponse.data?.dataList ?? [],
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

<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <SectionHeader title="Senarai Agenda Semasa"></SectionHeader>
    <CustomTable onUpdate={_search} bind:tableData={table}
    ></CustomTable>
</div>
