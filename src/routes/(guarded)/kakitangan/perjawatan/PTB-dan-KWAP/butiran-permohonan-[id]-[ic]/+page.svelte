<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import Form from '$lib/components/form/Form.svelte';
    import FormHeading from '$lib/components/form/FormHeading.svelte';
    import FormContents from '$lib/components/form/FormContents.svelte';
    import MaklumatKakitangan from './forms/MaklumatKakitangan.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import MaklumatPerkhidmatan from './forms/MaklumatPerkhidmatan.svelte';
    import MaklumatPtbAndKwap from './forms/MaklumatPtbAndKwap.svelte';
    import KeputusanPerananLain from './forms/KeputusanPerananLain.svelte';
    import { onMount } from 'svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    export let data;
    let status: string = 'SOKONG - Urus setia';
    let stepperIndex = 0;

    // Stepper Names
    onMount(() => {
        console.log(data.record.status);
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Permohonan Pemberian Taraf Berpencen {data.record
            .namaPekerja} ({data.record.noPekerja})"
        description="Kemaskini maklumat PTB dan KWAP berikut"
        ><FormButton
            type="close"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        /></ContentHeader
    >
</section>
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper bind:activeIndex={stepperIndex} dataId="#01" dataStatus="Draf">
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <!-- {#if editingCandidateList} -->
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatKakitangan
                        ptbData={data.record}
                        editable={false}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatPerkhidmatan ptbData={data.record} />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat PTB dan KWAP"
            ></StepperContentHeader>
            <StepperContentBody>
                {#if data.record.status === 'Baru'}
                    <SectionHeader
                        subTitle="Menunggu Keputusan daripada urus setia perjawatan"
                    />
                {/if}
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatPtbAndKwap
                        ptbData={data.record}
                        userId={data.userId}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        {#if data.record.status === 'SOKONG' || data.record.status === 'LULUS'}
            <StepperContent>
                <StepperContentHeader
                    title="Keputusan Daripada Peranan - Peranan Berkaitan"
                ></StepperContentHeader>
                <StepperContentBody>
                    <div
                        class="flex max-h-full w-full flex-col items-start justify-start"
                    >
                        <KeputusanPerananLain status={data.record.status} />
                    </div>
                </StepperContentBody>
            </StepperContent>
        {/if}
    </Stepper>
</section>
