<script lang="ts">
    import SvgPlus from '$lib/assets/svg/SvgPlus.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { pertukaranSendiriTable } from '$lib/mocks/perjawatan/pertukaran/pertukaran-sendiri-table';
    import { senaraiRekodPermohonan } from '$lib/mocks/perjawatan/pertukaran/senarai-rekod-permohonan';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';

    let activeClasses =
        'text-system-primary text-sm h-full px-4 border-b-2 border-system-primary';
    let inactiveClasses = 'text-txt-secondary text-sm h-full px-4 border-b-2';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Pertukaran" description="Hal-hal berkaitan Pertukaran"
    ></ContentHeader>
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Tabs>
        <TabContent title="Permohonan Sendiri">
            <SectionHeader
                title="Senarai Rekod Permohonan Menunggu Tindakan Anda"
            ></SectionHeader>
            <div class="w-full">
                <DynamicTable
                    tableItems={pertukaranSendiriTable}
                    withActions
                    actionOptions={['detail']}
                    detailActions={()=>{goto("/pengarah-bahagian-negeri/perjawatan/pertukaran/permohonan-sendiri/butiran")}}
                />
            </div>
        </TabContent>
        <TabContent title="Arahan Pengarah Bahagian/Negeri">
            <SectionHeader title="Senarai Rekod Permohonan Pertukaran"
                ><TextIconButton label="Tambah Pertukaran" primary onClick={() => {
                    goto('pertukaran/arahan-pengarah/baru');
                }}
                    ><SvgPlus></SvgPlus></TextIconButton
                ></SectionHeader
            >
            <div class="w-full">
                <DynamicTable
                    tableItems={senaraiRekodPermohonan}
                    withActions
                    actionOptions={['detail']}
                    detailActions={()=>{goto("/pengarah-bahagian-negeri/perjawatan/pertukaran/arahan-pengarah/butiran")}}
                />
            </div>
        </TabContent>
    </Tabs>
</section>
