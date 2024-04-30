<script lang="ts">
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import type { PageData } from './$types';

    export let data: PageData;
    function handleDownload(agreementLetter: any): void {
        throw new Error('Function not implemented.');
    }
</script>

<Stepper dataStatus="Surat">
    <StepperContent>
        <StepperContentHeader title="Permohonan Taraf Pencen "
        ></StepperContentHeader>

        {#each data.documentDetailsPTBResponse.data?.details.document as document, index}
            <div
                class="flex w-full flex-row items-center justify-between space-y-2.5"
            >
                <label
                    for=""
                    class="block w-[20px] min-w-[20px] text-[11px] font-medium"
                    >{index + 1}.</label
                >
                <a
                    href={document.document}
                    download={document.name}
                    class="flex h-8 w-full cursor-pointer items-center justify-between rounded-[3px] border border-system-primary bg-bgr-secondary px-2.5 text-base text-system-primary"
                    >{document.name}</a
                >
            </div>
        {/each}
    </StepperContent>
</Stepper>
 