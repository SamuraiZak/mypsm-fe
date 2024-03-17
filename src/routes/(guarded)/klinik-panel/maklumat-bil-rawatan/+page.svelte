<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { ClinicPanelTreatmentBillList } from '$lib/dto/mypsm/perubatan/clinic-panel-treatment-bill-list.dto';
    import type { PageData } from './$types';

    export let data: PageData;
    let rowData: ClinicPanelTreatmentBillList;
    let treatmentBillTable: TableDTO = {
        param: data.param,
        meta: data.treatmentBillResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.treatmentBills ?? [],
        hiddenData: ['patientId', 'claimId', 'employeeId'],
    };

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Bil Rawatan">
        <TextIconButton
            label="Tambah Tuntutan"
            icon="add"
            onClick={() => goto('/klinik-panel/maklumat-bil-rawatan/butiran/baru')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <div class="flex w-full flex-col justify-start gap-2.5 p-5">
        <FilterCard onSearch={() => {}}>
            <FilterTextField label="Nama Pekerja" inputValue={''} />
            <FilterTextField label="Nama Pesakit" inputValue={''} />
            <FilterTextField label="Kod Klinik" inputValue={''} />
            <FilterTextField label="Nama Klinik" inputValue={''} />
            <FilterTextField label="Status" inputValue={''} />
        </FilterCard>

        <CustomTable
            title="Senarai Bil Rawatan"
            bind:tableData={treatmentBillTable}
            bind:passData={rowData}
            enableDetail
            detailActions={() =>
                goto('./maklumat-bil-rawatan/butiran/'+rowData.employeeId+'-'+rowData.claimId)
            }
        />
    </div>
</section>
