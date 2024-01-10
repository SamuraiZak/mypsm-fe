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
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    export let data;
    let steppers: string[] = [];
    let stepperIndex = 0;

    // Stepper Names
    onMount(() => {
        if (data.record.status === 'BARU') {
            steppers = [
                'Maklumat Kakitangan',
                'Maklumat Perkhidmatan',
                'Kemaskini Maklumat PTB dan KWAP',
                'Masukkan Maklumat Peranan - Peranan Berkaitan',
            ];
        } else if (data.record.status === 'SOKONG') {
            steppers = [
                'Maklumat Kakitangan',
                'Maklumat Perkhidmatan',
                'Kemaskini Maklumat PTB dan KWAP',
                'Keputusan Daripada Peranan - Peranan Berkaitan',
            ];
        }
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
        <!-- Senarai Calon Pemangkuan -->
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
            <!-- {:else} -->

            <!-- {/if} -->
        </StepperContent>

        <!-- Kemaskini Maklumat Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Maklumat Perkhidmatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatPerkhidmatan />
                </div>
            </StepperContentBody>
        </StepperContent>

        <!-- Kemaskini Maklumat Temuduga -->
        <StepperContent>
            <StepperContentHeader title="Maklumat PTB dan KWAP"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    subTitle="Semak dan kemaskini maklumat temuduga bagi calon-calon berikut untuk menjana surat tawaran temuduga"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <MaklumatPtbAndKwap />
                </div>
            </StepperContentBody>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Sila Tetapkan Keputusan Anda - Penyokong"
            >
                <TextIconButton
                    primary
                    label="Simpan"
                    form="supporterResultForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton>
            </StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    subTitle="Keputusan akan dihantar ke peranan - peranan berkaitan."
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                >
                    <KeputusanPerananLain />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
