<script lang="ts">
    import { goto } from '$app/navigation';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterCard from '$lib/components/filter/FilterCard.svelte';
    import FilterSelectInput from '$lib/components/filter/FilterSelectInput.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import {
        mockPromotion,
        mockPromotionCandidateSupporterView,
    } from '$lib/mocks/kenaikan-pangkat/mockPromotion';

    let selectedGrade: '1';
    let selectedScheme: '1';

    let gradeOptions: [
        {
            value: '1';
            name: 'Gred 1-54';
        },
        {
            value: '2';
            name: 'TBK 1 dan 2 - Kumpulan Sokongan';
        },
        {
            value: '3';
            name: 'Gred Utama';
        },
    ];
    let schemeOptions: [
        {
            value: '1';
            name: 'Tetap';
        },
        {
            value: '2';
            name: 'Kontrak';
        },
    ];
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
            <FilterCard>
                <FilterTextInput label="No. Pekerja"></FilterTextInput>
                <FilterTextInput label="Nama Pekerja"></FilterTextInput>
                <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
                <FilterSelectInput
                    selectedVal={selectedGrade}
                    label="Gred"
                    options={gradeOptions}
                ></FilterSelectInput>
                <FilterSelectInput
                    selectedVal={selectedScheme}
                    label="Skim"
                    options={schemeOptions}
                ></FilterSelectInput>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotionCandidateSupporterView.filter(
                        (item) => item.grade === 'Gred 1-54',
                    )}
                    columnKeys={[
                        'employeeNumber',
                        'employeeName',
                        'identityDocumentNumber',
                        'grade',
                        'scheme',
                        'status',
                        'remark',
                    ]}
                    withActions={true}
                    actionOptions={['detail', 'edit']}
                    editActions={() => {
                        goto(
                            '/pelulus/perjawatan/kenaikan-pangkat/gred-1_54',
                        );
                    }}
                    detailActions={() => {
                        // goto(
                        //     '/pelulus/perjawatan/kenaikan-pangkat/gred-1_54/butiran',
                        // );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- TBK 1 dan 2 - Kumpulan Sokongan -->
        <CustomTabContent title="TBK 1 dan 2 - Kumpulan Sokongan">
            <FilterCard>
                <FilterTextInput label="No. Pekerja"></FilterTextInput>
                <FilterTextInput label="Nama Pekerja"></FilterTextInput>
                <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
                <FilterSelectInput
                    selectedVal={selectedGrade}
                    label="Gred"
                    options={gradeOptions}
                ></FilterSelectInput>
                <FilterSelectInput
                    selectedVal={selectedScheme}
                    label="Skim"
                    options={schemeOptions}
                ></FilterSelectInput>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotionCandidateSupporterView.filter(
                        (item) =>
                            item.grade === 'TBK 1 dan 2 - Kumpulan Sokongan',
                    )}
                    columnKeys={[
                        'employeeNumber',
                        'employeeName',
                        'identityDocumentNumber',
                        'grade',
                        'scheme',
                        'status',
                        'remark',
                    ]}
                    withActions={true}
                    actionOptions={['detail', 'edit']}
                    editActions={() => {
                        goto('/pelulus/perjawatan/kenaikan-pangkat/tbk-1-2');
                    }}
                    detailActions={() => {
                        // goto(
                        //     '/pelulus/perjawatan/kenaikan-pangkat/gred-1_54/butiran',
                        // );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Gred Utama -->
        <CustomTabContent title="Gred Utama">
            <FilterCard>
                <FilterTextInput label="No. Pekerja"></FilterTextInput>
                <FilterTextInput label="Nama Pekerja"></FilterTextInput>
                <FilterTextInput label="No. Kad Pengenalan"></FilterTextInput>
                <FilterSelectInput
                    selectedVal={selectedGrade}
                    label="Gred"
                    options={gradeOptions}
                ></FilterSelectInput>
                <FilterSelectInput
                    selectedVal={selectedScheme}
                    label="Skim"
                    options={schemeOptions}
                ></FilterSelectInput>
            </FilterCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockPromotionCandidateSupporterView.filter(
                        (item) => item.grade === 'Gred Utama',
                    )}
                    columnKeys={[
                        'employeeNumber',
                        'employeeName',
                        'identityDocumentNumber',
                        'grade',
                        'scheme',
                        'employeeProfile',
                        'status',
                        'remark',
                    ]}
                    withActions={true}
                    actionOptions={['detail', 'edit']}
                    editActions={() => {
                        goto(
                            '/pelulus/perjawatan/kenaikan-pangkat/gred-utama',
                        );
                    }}
                    detailActions={() => {
                        // goto(
                        //     '/pelulus/perjawatan/kenaikan-pangkat/gred-1_54/butiran',
                        // );
                    }}
                ></DynamicTable>
            </div></CustomTabContent
        >
    </CustomTab>
</section>
