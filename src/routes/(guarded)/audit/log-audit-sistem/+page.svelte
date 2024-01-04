<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { Select } from 'flowbite-svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { logSistem } from '$lib/mocks/audit/log-sistem';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Log Audit Sistem"
        description="Hal-hal berkaitan dengan pengurusan log audit sistem kakitangan LKIM"
    ></ContentHeader>
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <FilterContainer>
        <div class="flex flex-row gap-x-2.5">
            <div class="flex flex-row items-center justify-center gap-x-2.5">
                <ShortTextField label="Nama Pengguna" type="text" />
                <ShortTextField label="No. Pengguna" type="text" />
                <p class="text-sm font-normal">Modul</p>
                <div class="flex flex-row items-center justify-start gap-x-2.5">
                    <Select
                        id="modul"
                        items={[
                            {
                                value: 1,
                                name: 'Perubatan',
                            },
                            {
                                value: 2,
                                name: 'Cuti',
                            },
                            {
                                value: 3,
                                name: 'Perjawatan',
                            },
                            {
                                value: 4,
                                name: 'Rekod Perkhidmatan',
                            },
                            {
                                value: 5,
                                name: 'Latihan',
                            },
                        ]}
                        placeholder="Semua"
                        class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                        value={''}
                    ></Select>
                </div>
                <ShortTextField label="Dari" type="date" />
                <ShortTextField label="Hingga" type="date" />
            </div>
        </div></FilterContainer
    >
    <SectionHeader title="Senarai Rekod"></SectionHeader>
    <div class="flex max-h-full w-full flex-col items-start justify-start">
        <DynamicTable tableItems={logSistem}></DynamicTable>
    </div>
</section>
