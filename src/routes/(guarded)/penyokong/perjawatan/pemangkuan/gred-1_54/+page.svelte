<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';


    //===================== Stepper controls =====================
    let stepperIndex = 9;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    const supportOptions: RadioOption[] = [
        {
            value: 'sokong',
            label: 'Sokong',
        },
        {
            value: 'tidakSokong',
            label: 'Tidak Sokong',
        },
    ];
</script>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper
        bind:activeIndex={stepperIndex}
        dataId={'PMGK-1234'}
        dataStatus={'Status: Sedang Diproses'}
    >

        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Maklumat Temuduga"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Temuduga"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Mesyuarat Kenaikan Pangkat"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Mesyuarat Penempatan Kakitangan"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Permohonan Penangguhan/Pindaan Penempatan Dari Kakitangan"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"></StepperContentHeader>
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Kemaskini Keputusan Pemangkuan"></StepperContentHeader>
        </StepperContent>

        <!-- Penyokong Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Penyokong Pemangkuan">
                <TextIconButton primary label="Hantar" onClick={() => goto('/penyokong/perjawatan/pemangkuan')}
                    ><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader title="Keputusan daripada Penyokong"
                ></SectionHeader>
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <div
                        class="flex h-full max-h-full flex-col items-start justify-center"
                    >
                        <span class="text-sm italic text-system-primary"
                            >&#x2022; Keputusan akan dihantar ke email klinik dan Urus
                            Setia berkaitan</span
                        >
                    </div>
                </div>
                <LongTextField
                labelBlack={false}
                id={"tindakan-ulasan"}
                label={'Tindakan/Ulasan'}
                value={'Butiran lengkap...'}
                />
                <RadioSingle options={supportOptions} />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b border-t"
                />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
