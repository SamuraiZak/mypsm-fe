<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockPromotion } from '$lib/mocks/kenaikan-pangkat/mockPromotion';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kenaikan Pangkat"
        description="Sila semak senarai kenaikan pangkat yang dipaparkan di bawah dan lihat butiran untuk tindakan selanjutnya"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <CustomTab>
        <!-- Gred 1-54 -->
        <CustomTabContent title="Gred 1-54">
            <SectionHeader title="Senarai rekod kenaikan pangkat bagi Gred 1-54"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotion}
                    columnKeys={[
                        'groupId',
                        'date',
                        'candidateAmount',
                        'status',
                    ]}
                    withActions={true}
                    actionOptions={['detail', 'edit']}
                    editActions={() => {
                        goto(
                            '/pengarah-bahagian-negeri/perjawatan/kenaikan-pangkat/gred-1_54',
                        );
                    }}
                    detailActions={() => {
                        // goto(
                        //     '/pengarah-bahagian-negeri/perjawatan/kenaikan-pangkat/gred-1_54/butiran',
                        // );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- TBK 1 dan 2 - Kumpulan Sokongan -->
        <CustomTabContent title="TBK 1 dan 2 - Kumpulan Sokongan">
            <SectionHeader
                title="Senarai rekod kenaikan pangkat bagi TBK 1 dan 2 - Kumpulan Sokongan"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotion}
                    columnKeys={[
                        'groupId',
                        'date',
                        'candidateAmount',
                        'status',
                    ]}
                    withActions={true}
                    actionOptions={['detail', 'edit']}
                    editActions={() => {
                        goto(
                            '/pengarah-bahagian-negeri/perjawatan/kenaikan-pangkat/tbk-1-2',
                        );
                    }}
                    detailActions={() => {
                        // goto(
                        //     '/pengarah-bahagian-negeri/perjawatan/kenaikan-pangkat/gred-1_54/butiran',
                        // );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
