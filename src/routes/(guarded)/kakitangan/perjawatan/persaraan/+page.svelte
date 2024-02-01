<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import CustomTab from '$lib/components/tab/CustomTab.svelte';
    import CustomTabContent from '$lib/components/tab/CustomTabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { permohonanPersaraan } from '$lib/mocks/kakitangan/persaraan/permohonan-persaraan';
    import { persaraanPaksaan } from '$lib/mocks/kakitangan/persaraan/persaraan-paksaan';
    import { goto } from '$app/navigation';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';

    let selectedTahun = tahun[0].value;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Persaraan" description="Hal-hal berkaitan persaraan">
        <TextIconButton
            primary
            label="Permohonan Baru"
            onClick={() => {
                goto('persaraan/permohonan-persaraan');
            }}><SvgPlus /></TextIconButton
        ></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <CustomTab>
        <CustomTabContent title="Permohonan Persaraan">
            <SectionHeader title="Senarai Permohonan yang Dimohon"
                ><DropdownSelect
                    id="tahun-dropdown"
                    label="Tahun"
                    dropdownType="label-left"
                    bind:index={selectedTahun}
                    options={tahun}
                ></DropdownSelect></SectionHeader
            >
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={permohonanPersaraan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/kakitangan/perjawatan/persaraan/permohonan-persaraan/butiran',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
        <CustomTabContent title="Persaraan Paksaan">
            <SectionHeader title="Senarai Persaraan Paksaan"></SectionHeader>
            <div
                class="flex max-h-full w-full flex-col items-start justify-start"
            >
                <DynamicTable
                    tableItems={persaraanPaksaan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={() => {
                        goto(
                            '/kakitangan/perjawatan/persaraan/persaraan-paksaan',
                        );
                    }}
                ></DynamicTable>
            </div>
        </CustomTabContent>
    </CustomTab>
</section>
