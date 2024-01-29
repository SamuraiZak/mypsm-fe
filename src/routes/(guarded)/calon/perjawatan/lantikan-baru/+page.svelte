<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import type { PageData } from './$types';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import NewRecord from './tab-contents/NewRecord.svelte';
    import SubmittedRecord from './tab-contents/SubmittedRecord.svelte';
    export let data: PageData;
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Rekod Lantikan Baru"
        description="Hal-hal berkaitan Lantikan Dalam Perkhidmatan"
    ></ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col overflow-y-auto"
>
    <Tabs>
        <TabContent title="Senarai Rekod Lantikan yang Telah Dihantar">
            <SubmittedRecord listData={data.submittedRecord} />
        </TabContent>
        <TabContent title="Senarai Rekod Baru">
            <NewRecord listData={data.newRecord} />
        </TabContent>
    </Tabs>
</section>
