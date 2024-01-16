<script lang="ts">
    import MaklumatPeribadi from './tabs/MaklumatPeribadi.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import Tabs from '$lib/components/tabs/Tabs.svelte';
    import TabContent from '$lib/components/tabs/TabContent.svelte';
    import AgendaSemasa from './tabs/AgendaSemasa.svelte';
    import GajiElaun from './tabs/GajiElaun.svelte';
    import RekodKesihatan from './tabs/RekodKesihatan.svelte';
    import MaklumatKontrak from './tabs/MaklumatKontrak.svelte';
    import type { PageData } from './$types';
    import toast, { Toaster } from 'svelte-french-toast';

    let currentEmployeeNumber: string = '00003';
    let isEditing: boolean = false;
    let disabled: boolean = true;
    export let data: PageData;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Profil"
        description="Menguruskan hal-hal berkaitan profil anda"
    >
        {#if isEditing === true}
            <FormButton
                type="cancel"
                onClick={() => {
                    isEditing = !isEditing;

                    disabled = !disabled;
                }}
            />
        {:else}
            <FormButton
                type="update"
                onClick={() => {
                    isEditing = !isEditing;

                    disabled = !disabled;
                }}
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Tabs>
        <TabContent paddingClass="p-0" title="Maklumat Peribadi"
            ><MaklumatPeribadi {data} {disabled} employeeNumber={currentEmployeeNumber}
            ></MaklumatPeribadi>
            </TabContent
        >

        <!-- Agenda Semasa Tab -->
        <TabContent paddingClass="p-0" title="Agenda Semasa"
            ><AgendaSemasa></AgendaSemasa></TabContent
        >

        <!-- Gaji & Elaun Tab -->
        <TabContent paddingClass="p-0" title="Gaji & Elaun">
            <GajiElaun></GajiElaun>
        </TabContent>

        <!-- Rekod Kesihatan Tab -->
        <TabContent paddingClass="p-0" title="Rekod Kesihatan"
            ><RekodKesihatan {data} {disabled}></RekodKesihatan>
        </TabContent>

        <!-- Maklumat Kontrak Tab -->
        <TabContent paddingClass="p-0" title="Maklumat Kontrak">
            <MaklumatKontrak {data} {disabled}></MaklumatKontrak>
        </TabContent>
    </Tabs>
</section>
<Toaster />
