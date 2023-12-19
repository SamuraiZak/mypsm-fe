<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { lantikanBaruTable } from '$lib/mocks/kakitangan/pengesahan/pengesahan-lantikan-baru/lantikan-baru-table';
    import { melebihi3TahunTable } from '$lib/mocks/kakitangan/pengesahan/melebihi-tempoh-3-tahun/melebihi-tempoh-3-tahun-table';
    import { lantikanKeGredTable } from '$lib/mocks/kakitangan/pengesahan/lantikan-ke-gred/lantikan-ke-gred-table';
    import { goto } from '$app/navigation';
    import { status } from '$lib/mocks/status/status';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { positions } from '$lib/mocks/positions/positions';

    let selectedStatus = status[0].value; 
    let selectedPos: string = positions[0].value; 
    let passData: Record<string, any> = {};
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengesahan Dalam Perkhidmatan"
        description="Hal-hal berkaitan Pengesahan Dalam Perkhidmatan"
    >
    </ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Pengesahan Lantikan Baru">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={lantikanBaruTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/baru');
                        else if (passData.status === 'DIPERAKU - Pengarah Negeri/Bahagian')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/diperaku-pengarah-negeri-bahagian');
                        else if (passData.status === 'Selesai')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-lantikan-baru/selesai');
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Pengesahan Yang Melebihi Tempoh 3 Tahun">
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={melebihi3TahunTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/baru');
                        else if (passData.status === 'DIPERAKU - Pengarah Negeri/Bahagian')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/diperaku-pengarah-negeri-bahagian');
                        else if (passData.status === 'Selesai')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-melebihi-tempoh-3-tahun/selesai');
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent
            title="Pengesahan Lantikan ke Gred/Skim Baru (Rasionalisasi)"
        >
            <FilterContainer>
                <StaffSelector />
                <ShortTextField label="Tarikh Lantikan" type="date" />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
                <DropdownSelect
                    id="status-dropdown"
                    label="Status"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
            </FilterContainer>
            <SectionHeader title="Senarai Rekod Kumpulan Persaraan Lain-lain"
            ></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={lantikanKeGredTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        if (passData.status === 'Baru')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/baru');
                        else if (passData.status === 'DIPERAKU - Pengarah Negeri/Bahagian')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/diperaku-pengarah-negeri-bahagian');
                        else if (passData.status === 'Selesai')
                            goto('/urus-setia/perjawatan/pengesahan-dalam-perkhidmatan/butiran-pengesahan-latihan-ke-gred/selesai');
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
