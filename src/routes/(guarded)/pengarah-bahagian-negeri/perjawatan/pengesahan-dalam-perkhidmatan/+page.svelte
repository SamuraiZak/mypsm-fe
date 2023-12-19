<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { status } from '$lib/mocks/status/status';
    import StaffSelector from '$lib/components/staff-selector/StaffSelector.svelte';
    import { positions } from '$lib/mocks/positions/positions';
    import { lantikanBaru } from '$lib/mocks/pengarah-bahagian-negeri/pengesahan/lantikan-baru';
    import { lantikanKeGred } from '$lib/mocks/pengarah-bahagian-negeri/pengesahan/lantikan-ke-gred';
    import FormButton from '$lib/components/buttons/FormButton.svelte';

    let selectedStatus = status[0].value;
    let selectedPos: string = positions[0].value;
    let passData: Record<string, any> = {};
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pengesahan Dalam Perkhidmatan"
        description="Hal-hal berkaitan Pengesahan Dalam Perkhidmatan"
    ></ContentHeader>
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
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
            </FilterContainer>
            <SectionHeader
                title="Tindakan: Perakukan semua kakitangan berkaitan"
                ><FormButton type="perakukan"></FormButton></SectionHeader
            >

            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    hasCheckbox
                    tableItems={lantikanBaru}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pengarah-bahagian-negeri/perjawatan/pengesahan-dalam-perkhidmatan/pengesahan-lantikan-baru',
                        );
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
                    id="gred-dropdown"
                    label="Gred"
                    dropdownType="label-left"
                    bind:index={selectedStatus}
                    options={status}
                />
                <DropdownSelect
                    id="position-dropdown"
                    label="Jawatan Semasa"
                    dropdownType="label-left"
                    bind:index={selectedPos}
                    options={positions}
                />
            </FilterContainer>
            <SectionHeader
                title="Tindakan: Perakukan semua kakitangan berkaitan"
                ><FormButton type="perakukan"></FormButton></SectionHeader
            >
            <SectionHeader title="Senarai Kakitangan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    hasCheckbox
                    tableItems={lantikanKeGred}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/pengarah-bahagian-negeri/perjawatan/pengesahan-dalam-perkhidmatan/pengesahan-lantikan-gred',
                        );
                    }}
                    bind:passData
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
