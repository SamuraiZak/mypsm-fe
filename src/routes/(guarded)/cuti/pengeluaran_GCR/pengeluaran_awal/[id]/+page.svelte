<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Pengeluaran GCR Awal">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/cuti/pengeluaran_GCR');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>

<section class="flex h-full w-full flex-col items-center justify-start overflow-y-auto">
    <Stepper>
        <!-- ================================ -->
        <!-- EMPLOYEE DETAIL -->
        <!-- ================================ -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"></StepperContentHeader>
            <StepperContentBody>
                <div class="flex h-full w-full flex-col items-start justify-start">

                </div>
            </StepperContentBody>
        </StepperContent>

    </Stepper>

</section>
