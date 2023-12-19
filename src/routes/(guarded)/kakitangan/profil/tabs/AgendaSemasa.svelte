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

    let passData: Record<string, any> = {};
</script>

<div class="flex h-fit w-full flex-col items-center justify-start px-2.5">
    <SectionHeader title="Senarai Agenda Semasa"></SectionHeader>
    <DynamicTable
        tableItems={agendaSemasaTable}
        withActions
        actionOptions={['detail']}
        detailActions={() => {
            if (passData.jenisAgenda === 'Cuti')
                goto('/kakitangan/cuti/laporan');
            else if (passData.jenisAgenda === 'Kenaikan Pangkat')
                goto('/kakitangan/perjawatan/kenaikan-pangkat');
        }}
        bind:passData
    ></DynamicTable>
</div>
