<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import { pertukaranSendiriTable } from '$lib/mocks/perjawatan/pertukaran/pertukaran-sendiri-table';
    import { pertukaranArahan } from '$lib/mocks/perjawatan/pertukaran/pertukaran-arahan';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import { stringify } from 'postcss';

    let checkedItems: Object[] = [];
    let checkedTable: Object[] = pertukaranSendiriTable;

    // $: {
    //     console.log(checkedItems);
    // }
</script>

<div class="h-[calc(100vh-127px)] w-full">
    <ContentHeader title="Pertukaran" description="Hal-hal berkaitan Pertukaran"
    ></ContentHeader>
    <div class="h-[calc(100%-50px)]">
        <Tabs>
            <TabContent title="Permohonan Sendiri">
                <div class="h-[calc(100vh-268px)] w-full">
                    <SectionHeader title="Senarai Rekod Permohonan"
                        ><FormButton
                            type="new"
                            addLabel="Tambah Permohonan Baru"
                            onClick={() => {
                                goto('pertukaran/permohonan-sendiri/baru');
                            }}
                        /></SectionHeader
                    >
                    <div class="h-full w-full">
                        <DynamicTable
                            tableItems={pertukaranSendiriTable}
                            withActions
                            actionOptions={['detail']}
                            detailActions={() => {
                                goto(
                                    '/kakitangan/perjawatan/pertukaran/permohonan-sendiri/butiran',
                                );
                            }}
                        />
                    </div>
                </div>
            </TabContent>
            <TabContent title="Arahan Pengarah Bahagian/Negeri">
                <div class="h-[calc(100vh-268px)] w-full">
                    <SectionHeader title="Senarai Rekod Arahan Pertukaran"
                    ></SectionHeader>
                    <div class="h-full w-full">
                        <DynamicTable
                            tableItems={pertukaranArahan}
                            withActions
                            actionOptions={['detail']}
                            detailActions={() => {
                                goto(
                                    '/kakitangan/perjawatan/pertukaran/arahan-pengarah/butiran',
                                );
                            }}
                        />
                    </div>
                </div>
            </TabContent>
            <TabContent title="Arahan Pihak Pengurusan">
                <div class="h-[calc(100vh-268px)] w-full">
                    <SectionHeader title="Senarai Rekod Arahan Pertukaran"
                    ></SectionHeader>
                    <div class="h-full w-full">
                        <DynamicTable
                            tableItems={pertukaranArahan}
                            withActions
                            actionOptions={['detail']}
                            detailActions={() => {
                                goto(
                                    '/kakitangan/perjawatan/pertukaran/arahan-pengurusan/butiran',
                                );
                            }}
                        />
                    </div>
                </div>
            </TabContent>
        </Tabs>
    </div>
</div>
