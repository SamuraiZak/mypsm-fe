<script lang="ts">
    import SvgManifyingGlass from '$lib/assets/svg/SvgManifyingGlass.svelte';
    import OptionButton from '$lib/components/buttons/OptionButton.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import CustomCard from '$lib/components/cards/CustomCard.svelte';
    import CustomCardBody from '$lib/components/cards/CustomCardBody.svelte';
    import CustomCardHeader from '$lib/components/cards/CustomCardHeader.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterTextInput from '$lib/components/filter/FilterTextInput.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockWorkAllowance } from '$lib/mocks/database/mockWorkAllowance';
    import { mockPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiRekodPemangkuan';
    import { storePemangkuanList } from '$lib/stores/pemangkuan/pemangkuanStores';
    import FilterDateSelector from '$lib/components/filter/FilterDateSelector.svelte';
    import { goto } from '$app/navigation';

    let columnKeys = [
        'employeeNumber',
        'employeeName',
        'identityDocumentNumber',
        'currentPosition',
        'workAllowancePosition',
        'currentPlacement',
        'workAllowancePlacement',
        'status',
        'remark',
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tanggung Kerja"
        description="Hal-hal berkaitan urusan tanggung kerja"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Tabs>
        <!-- Permohonan Tanggung Kerja -->
        <TabContent title="Permohonan Tanggung Kerja">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="No. Pekerja"></FilterTextInput>
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                        <FilterDateSelector
                            handleDateChange
                            label="Tarikh Mohon"
                        ></FilterDateSelector>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockWorkAllowance}
                    {columnKeys}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perjawatan/tanggung-kerja/permohonan/butiran',
                        );
                    }}
                ></DynamicTable>
            </div>
        </TabContent>

        <!-- Penamatan Tanggung Kerja -->
        <TabContent title="Penamatan Tanggung Kerja">
            <CustomCard borderClass="border-system-primary">
                <CustomCardHeader title="Semua Tetapan Pencarian">
                    <TextIconButton label="Cari" primary onClick={() => {}}>
                        <SvgManifyingGlass></SvgManifyingGlass>
                    </TextIconButton>
                </CustomCardHeader>
                <CustomCardBody>
                    <div class="flex w-full flex-wrap gap-2.5">
                        <FilterTextInput label="No. Pekerja"></FilterTextInput>
                        <FilterTextInput label="Nama"></FilterTextInput>
                        <FilterTextInput label="No. K/P"></FilterTextInput>
                        <FilterDateSelector
                            handleDateChange
                            label="Tarikh Mohon"
                        ></FilterDateSelector>
                    </div>
                </CustomCardBody>
            </CustomCard>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockWorkAllowance}
                    {columnKeys}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/urus-setia/perjawatan/tanggung-kerja/penamatan/butiran',
                        );
                    }}
                ></DynamicTable>
            </div>
        </TabContent>
    </Tabs>
</section>
