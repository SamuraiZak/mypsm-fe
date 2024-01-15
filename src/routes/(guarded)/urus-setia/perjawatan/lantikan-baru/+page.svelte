<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SenaraiBelumDiisi from './tab-contents/SenaraiBelumDiisi.svelte';
    import SenaraiTelahDiisi from './tab-contents/SenaraiTelahDiisi.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import DynamicTable from '$lib/components/table/DynamicTable.svelte';
    import type { NewHireListResponse } from '$lib/view-models/mypsm/perjawatan/new-hire/new-hire-list-response.view-model';
    import { _sort } from './+page';

    export let data;

    // mock data
    // const newStaffUrl = data.props.candidateLists;
    const lantikanBaru = data.props.newHireLists

    const newHireListsResult: NewHireListResponse = data.props.registeredLists;

    const base64String = `JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog
                            IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv
                            TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K
                            Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg
                            L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+
                            PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u
                            dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq
                            Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU
                            CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu
                            ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g
                            CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw
                            MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v
                            dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G`; // Your Base64 string here

    // Convert the base64 string to a string
    export const convertBase64toPdf = async (base64String: string) => {
        const binaryString = atob(base64String);
        const byteArray = new Uint8Array(binaryString.length);

        for (let i = 0; i < binaryString.length; i++) {
            byteArray[i] = binaryString.charCodeAt(i);
        }

        const blob = new Blob([byteArray], { type: 'application/pdf' });
        const dataUrl = URL.createObjectURL(blob);

        return dataUrl;
    };
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    >
        <FormButton
            type="new"
            addLabel="Tambah Lantikan Baru"
            onClick={() => {
                goto('lantikan-baru/permohonan-baru');
                // _sort();
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Tabs>
        <TabContent title="Senarai Rekod Selesai Diisi">
            <SenaraiTelahDiisi listData={lantikanBaru} />
        </TabContent>
        <TabContent title="Senarai Rekod Penambahan Calon Lantikan Baru">
            <SenaraiBelumDiisi listData={newHireListsResult} />
        </TabContent>
    </Tabs>

    <!-- <Tabs>
        <TabContent>
            <div class="flex w-full flex-col items-start justify-center">
                <SectionHeader title="Senarai Rekod Pautan Belum Diisi"
                ></SectionHeader>
                <DynamicTable tableItems={newHireListsResult.data.newHires}
                ></DynamicTable>
            </div>
        </TabContent>
    </Tabs> -->
</section>
