<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import FilterCard from '$lib/components/table/filter/FilterCard.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import FilterSelectField from '$lib/components/table/filter/FilterSelectField.svelte';
    import FilterTextField from '$lib/components/table/filter/FilterTextField.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import type { TableDTO } from '$lib/dto/core/table/table.dto';
    import type { PageData } from './$types';
    import type { MedicalClaimList } from '$lib/dto/mypsm/perubatan/medical-claim-list.dto';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let medicalClaimTable: TableDTO = {
        param: data.param,
        meta: data.medicalClaimListResponse.data?.meta ?? {
            pageSize: 5,
            pageNum: 1,
            totalData: 4,
            totalPage: 1,
        },
        data: data.medicalClaimList ?? [],
        hiddenData: ['medicalClaimId'],
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Perubatan" />
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <CustomTabContent title="Tuntutan Perubatan">
            <div class="flex w-full flex-col justify-start gap-5 p-5">
                <FilterCard>
                    <FilterTextField label="Nama" inputValue={''} />
                </FilterCard>
                <div class="flex w-full justify-end items-end">
                    <TextIconButton
                        label="Tuntutan Baru"
                        icon="add"
                        onClick={() => {
                            goto('/perubatan/baru/'+data.currentEmployeeDetail.employeeId)
                        }}
                    />
                </div>
                <CustomTable
                    title="Senarai Rekod Tuntutan"
                    bind:tableData={medicalClaimTable}
                />
            </div>
        </CustomTabContent>

        <CustomTabContent title="Perkhidmatan">
            <div class="flex w-full flex-col justify-start gap-5 p-5">
                
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
