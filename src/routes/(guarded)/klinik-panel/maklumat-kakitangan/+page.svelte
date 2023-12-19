<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import { Select } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { maklumatKakitangan } from '$lib/mocks/klinik-panel/maklumat-kakitangan';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Kakitangan"
        description="Hal-hal berkaitan kakitangan LKIM"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="No. Pekerja" type="text" />
                <ShortTextField label="Nama Pekerja" type="text" />
                <ShortTextField label="No. Kad Pengenalan" type="text" />
                <p class="text-sm font-normal">Gred</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="gred"
                        items={[
                            {
                                value: 1,
                                name: '41',
                            },
                            {
                                value: 2,
                                name: '27',
                            },
                            {
                                value: 3,
                                name: '17',
                            },
                            {
                                value: 4,
                                name: '11',
                            },
                            {
                                value: 5,
                                name: '1',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
            </div>
        </div>
    </FilterContainer>
    <SectionHeader title="Senarai Rekod"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable
            tableItems={maklumatKakitangan}
            withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/klinik-panel/maklumat-kakitangan/maklumat-rawatan',
                        );
                    }}
        ></DynamicTable>
    </div>
</section>
