<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import SenaraiPermohonan from './tab-contents/SenaraiPermohonan.svelte';
    import SenaraiTiadaPencen from './tab-contents/SenaraiTiadaPencen.svelte';

    export let data;
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    const url = './PTB-dan-KWAP/tambah-rekod';
    // data.props.lists[0].noPekerja +
    // '-' +
    // data.props.lists[0].noKadPengenalan;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
        description="Hal-hal berkaitan urusan PTB dan KWAP"
        ><FormButton
            type="new"
            addLabel="Tambah Rekod"
            onClick={() => {
                goto(url);
            }}
        /></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col overflow-y-auto"
>
    <Tabs>
        <TabContent title="Senarai Kakitangan Baharu diberi PTB dan KWAP">
            <SenaraiPermohonan tableData={data.props.lists} />
        </TabContent>
        <TabContent title="Senarai Kakitangan TIADA No. Pencen">
            <SenaraiTiadaPencen tableData={data.props.lists} />
        </TabContent>
    </Tabs>
</section>
