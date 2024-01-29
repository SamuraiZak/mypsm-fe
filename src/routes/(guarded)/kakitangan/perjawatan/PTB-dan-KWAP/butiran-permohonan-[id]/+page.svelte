<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
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
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Permohonan Pemberian Taraf Berpencen"
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
                        bind:ptbData={data.PensionEmployeelistPersonal}
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
                    <MaklumatPerkhidmatan
                        bind:ptbDataService={data.pensionDetailServiceList}
                        bind:ptbDataSalary={data.pensionDetailSalaryList}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>

        <StepperContent>
            <StepperContentHeader title="Maklumat PTB dan KWAP"
            ></StepperContentHeader>
            <StepperContentBody>
                <!-- {#if data.record.status === 'Baru'} -->
                <SectionHeader
                    subTitle="Menunggu Keputusan daripada urus setia perjawatan"
                />
                <!-- {/if} -->
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatPtbAndKwap
                        bind:ptbData={data.detailPensionDetailList}
                    />
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- {#if data.record.status === 'SOKONG' || data.record.status === 'LULUS'} -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Daripada Peranan - Peranan Berkaitan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <!-- <KeputusanPerananLain status={data.record.status} /> -->
                </div>
            </StepperContentBody>
        </StepperContent>
        <!-- {/if} -->
    </Stepper>
</section>
