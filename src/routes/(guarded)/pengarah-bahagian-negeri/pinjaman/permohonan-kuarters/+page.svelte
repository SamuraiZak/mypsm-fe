<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import FilterContainer from '$lib/components/filter-container/FilterContainer.svelte';
    import ShortTextField from '$lib/components/input/ShortTextField.svelte';
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { Select } from 'flowbite-svelte';
    import { permohonanKuarters } from '$lib/mocks/pengarah-bahagian-negeri/pinjaman/permohonan-kuarters';

    let passData: any;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Permohonan Kuarters"
        description="Hal-hal berkaitan menguruskan kuarters kakitangan LKIM"
    ></ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
>
    <FilterContainer>
        <ShortTextField label="No. Pemohon" type="text" />
        <ShortTextField label="Nama Pemohon" type="text" />
        <div class="flex flex-row items-center justify-start gap-x-2.5">
            <p class="text-sm font-normal">Jenis Permohonan</p>
            <div class="flex flex-row items-center justify-start gap-x-2.5">
                <Select
                    id="status"
                    items={[
                        {
                            value: 1,
                            name: 'Permohonan Masuk (Kakitangan LKIM)',
                        },
                        {
                            value: 2,
                            name: 'Permohonan Keluar (Kakitangan LKIM)',
                        },
                        {
                            value: 1,
                            name: 'Permohonan Masuk (Bukan Kakitangan LKIM)',
                        },
                        {
                            value: 2,
                            name: 'Permohonan Keluar (Bukan Kakitangan LKIM)',
                        },
                    ]}
                    placeholder="Semua"
                    class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                    value={''}
                ></Select>
            </div>
            <p class="text-sm font-normal">Jenis Pemohon</p>
            <div class="flex flex-row items-center justify-start gap-x-2.5">
                <Select
                    id="status"
                    items={[
                        {
                            value: 1,
                            name: 'Kakitangan LKIM',
                        },
                        {
                            value: 2,
                            name: 'Agensi/Jabatan Luar',
                        },
                    ]}
                    placeholder="Semua"
                    class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                    value={''}
                ></Select>
            </div>
            <p class="text-sm font-normal">Status</p>
            <div class="flex flex-row items-center justify-start gap-x-2.5">
                <Select
                    id="status"
                    items={[
                        {
                            value: 1,
                            name: 'Baru',
                        },
                        {
                            value: 2,
                            name: 'Sokong',
                        },
                        {
                            value: 3,
                            name: 'Tidak Sokong',
                        },
                    ]}
                    placeholder="Semua"
                    class="block h-[32px] w-fit rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary hover:cursor-pointer hover:border-system-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:bg-bgr-secondary disabled:text-txt-secondary"
                    value={''}
                ></Select>
            </div>
        </div>
        <ShortTextField label="Tarikh Mohon" type="date" />
    </FilterContainer>
    <ContentHeader
        title="Tindakan: Tetapkan untuk semua kakitangan berkaitan."
        description=""
    >
        <FormButton type="not-support"></FormButton><FormButton type="support"
        ></FormButton></ContentHeader
    >
    <SectionHeader title="Senarai Rekod Permohonan Kuarters"></SectionHeader>
    <div
        class="flex max-h-full w-full flex-col items-start justify-start overflow-x-auto overflow-y-auto"
    >
        <DynamicTable
            tableItems={permohonanKuarters}
            withActions
            actionOptions={['detail']}
            detailActions={() => {
                if (
                    passData.applicationType[0] === 'Permohonan Masuk' &&
                    passData.applicationType[1] === '(Kakitangan LKIM)'
                ) {
                    goto(
                        '/pengarah-bahagian-negeri/pinjaman/permohonan-kuarters/butiran-permohonan-kuarters/masuk',
                    );
                } else if (
                    passData.applicationType[0] === 'Permohonan Keluar' &&
                    passData.applicationType[1] === '(Kakitangan LKIM)'
                ) {
                    goto(
                        '/pengarah-bahagian-negeri/pinjaman/permohonan-kuarters/butiran-permohonan-kuarters/keluar',
                    );
                }
            }}
            bind:passData
        ></DynamicTable>
    </div>
</section>
