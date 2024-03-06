<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        <!-- <TextIconButton
            onClick={() => goto('./lantikan-baru/baru')}
            icon="add"
            type="primary"
            label="Tambah Kontrak Baru"
        /> -->
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
<Stepper>
    <StepperContent>
        <StepperContentHeader title="Maklumat Peribadi">
            </StepperContentHeader>
            <StepperContentBody>

            </StepperContentBody>
            </StepperContent>
</Stepper>

</section>