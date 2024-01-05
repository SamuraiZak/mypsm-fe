<!-- Add your changes to the commented parts -->

<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import SenaraiKakitanganTerlibat from './senarai-kakitangan terlibat/SenaraiKakitanganTerlibat.svelte';
    import MaklumatKakitangan from './maklumat-kakitangan/MaklumatKakitanganForm.svelte';
    import KeputusanMesyuarat from './keputusan-mesyuarat/KeputusanMesyuarat.svelte';
    import MaklumatTawaranBaru from './maklumat-tawaran-baru/MaklumatTawaranBaru.svelte';
    import MaklumatPenyokongPelulus from './maklumat-peyokong-dan-pelulus/MaklumatPenyokongPelulus.svelte';
    import KeputusanPerananLain from './keputusan-peranan-lain/KeputusanPerananLain.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { createEventDispatcher, onMount } from 'svelte';

    let id: string = '193699';
    let status: string = 'Baru';

    // const dispatch = createEventDispatcher();

    // const triggerFormSubmit = () => dispatch('triggerFormSubmit');
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Kemaskini Keputusan Kumpulan Mesyuarat #12"
        description="Maklumat - maklumat Tawaran Baru  Kumpulan Mesyuarat #12"
        ><FormButton
            type="close"
            onClick={() => {
                goto('../tawaran-baru');
            }}
        /></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary"
>
    <Stepper dataId={id} dataStatus={status}>
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Terlibat"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <SenaraiKakitanganTerlibat />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <MaklumatKakitangan />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Mesyuarat"
                ><TextIconButton
                    primary
                    label="Simpan"
                    form="meetingResultForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <KeputusanMesyuarat />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Tawaran Baru"
                ><TextIconButton primary label="Simpan" onClick={() => {}}>
                    <SvgCheck></SvgCheck>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <MaklumatTawaranBaru />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Masukkan nama Penyokong dan Pelulus"
                ><TextIconButton
                    primary
                    label="Simpan"
                    form="newEmploymentAssignApproverSupporterForm"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <MaklumatPenyokongPelulus />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader
                title="Keputusan daripada Peranan - Peranan Lain"
            ></StepperContentHeader>
            <StepperContentBody
                ><div class="flex w-full flex-col gap-2.5">
                    <KeputusanPerananLain />
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
