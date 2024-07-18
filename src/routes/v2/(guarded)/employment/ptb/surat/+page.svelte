<script lang="ts">
    import DownloadAttachment from '$lib/components/inputs/attachment/DownloadAttachment.svelte';

    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import type { PageData } from './$types';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';

    export let data: PageData;
    function handleDownload(agreementLetter: any): void {
        throw new Error('Function not implemented.');
    }
</script>

<!-- <Stepper dataStatus="Surat">
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
</Stepper>    -->
<section
class="flex h-full max-h-full min-h-full w-full flex-col items-center justify-start overflow-y-auto bg-ios-basic-white pb-10"
>
    <!-- <div
        class="flex h-20 max-h-20 min-h-20 w-full flex-col items-start justify-center bg-ios-basic-white px-10"
    >
        <div class="flex w-full flex-row items-center justify-start">
            <p class="text-xl font-semibold">Halaman Utama </p>
        </div>
    </div> -->
    <ContentHeader title="PTB & KWAP">
       

<TextIconButton
type="primary"
label="Kembali"
onClick={() => goto('/employment/ptb')}

/>

    </ContentHeader>
    
    <div class="flex w-full flex-row items-center justify-start">
    <p class="text-sm font-semibold ps-2">Permohonan Pemberian Taraf Berpencen </p>
</div>
<div class="flex w-full flex-row items-center justify-start">
<p class="text-sm ps-2 ">Sila muat turun dan pastikan dokumen diisi dengan lengkap dan ditandatangani sebelum dihantar kepada Urus Setia </p>
</div>
    <div
        class="flex h-fit w-full flex-col items-center justify-start bg-ios-basic-white px-10"
    >
        <div
            class="grid h-fit w-full grid-cols-1 gap-2.5 py-2 md:grid-cols-2 lg:grid-cols-4"
        >
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
            
        </div>
    </div>

    <div class="flex w-full flex-row items-center justify-start">
        <p class="text-sm font-semibold ps-2  ">Sila sertakan salinan kad pengenalan yang telah disahkan oleh pegawai dalam kumpulan pengurusan dan profesional dan keatas dalam perkhidmatan awam sahaja </p>
        </div>

        <div class="flex w-full flex-row items-center justify-start">
            <p class="text-sm text-red-500 ps-2 ">*Kegagalan melengkapkan dokumen akan menyebabkan permohonan tidak akan diproses </p>
            </div>


</section>

 