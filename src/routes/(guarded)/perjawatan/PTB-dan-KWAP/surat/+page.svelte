<script lang="ts">
    import DownloadAttachment from "$lib/components/inputs/attachment/DownloadAttachment.svelte";


    import Stepper from "$lib/components/stepper/Stepper.svelte";
    import StepperContent from "$lib/components/stepper/StepperContent.svelte";
    import StepperContentHeader from "$lib/components/stepper/StepperContentHeader.svelte";
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

        <DownloadAttachment
        triggerDownload={() =>
            handleDownload(data.agreementLetter)}
        fileName="Surat Perjanjian Pinjaman Komputer Telefon Pintar.pdf"
    />
    </StepperContent>
    </Stepper>
    



