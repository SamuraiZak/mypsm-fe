<script lang="ts">
    import OptionButton from '$lib/components/buttons/OptionButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { mockActingBatch } from '$lib/mocks/database/mockActingBatch';

    // TODO: Get list of pemangkuan records

    let gradeOptions: IntDropdownOption[] = [
        {
            value: 'Gred 1-54',
            name: 'Gred 1-54',
            href: '/urus-setia/perjawatan/pemangkuan/gred-1_54/butiran',
        },
        {
            value: 'Gred Flexi 41',
            name: 'Gred Flexi 41',
            href: '/urus-setia/perjawatan/pemangkuan/gred-flexi_41/baru',
        },
        {
            value: 'Gred Utama',
            name: 'Gred Utama',
            href: '/urus-setia/perjawatan/pemangkuan/gred-utama/baru',
        },
    ];
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan"
        description="Hal-hal berkaitan urusan pemangkuan"
    >
        <!-- <Button>Dropdown button</Button> -->
        <OptionButton primary options={gradeOptions} label="Pemangkuan Baru"
        ></OptionButton>
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <CustomTab>
        <!-- Gred 1-54 -->
        <CustomTabContent title="Gred 1-54">
            <SectionHeader title="Senarai rekod pemangkuan bagi Gred 1-54"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockActingBatch.filter((item) =>
                        item.type.includes('Gred 1-54'),
                    )}
                    excludeCol={['id']}
                ></DynamicTable>
            </div>
            
        </CustomTabContent>

        <!-- Gred Flexi 41 -->
        <CustomTabContent title="Gred Flexi 41">
            <SectionHeader title="Senarai rekod pemangkuan bagi Gred Flexi 41"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockActingBatch.filter((item) =>
                        item.type.includes('Gred Flexi 41'),
                    )}
                    excludeCol={['id']}
                ></DynamicTable>
            </div>
        </CustomTabContent>

        <!-- Gred Utama -->
        <CustomTabContent title="Gred Utama">
            <SectionHeader title="Senarai rekod pemangkuan bagi Gred Utama"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={mockActingBatch.filter((item) =>
                        item.type.includes('Gred Utama'),
                    )}
                    excludeCol={['id']}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
