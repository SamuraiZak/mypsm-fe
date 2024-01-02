<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgBlock from '$lib/assets/svg/SvgBlock.svelte';
    import SvgExchangeArrow from '$lib/assets/svg/SvgExchangeArrow.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';

    //===================== Stepper controls =====================
    let stepperIndex = 1;

    function goNext() {
        stepperIndex += 1;
    }

    function goPrevious() {
        stepperIndex -= 1;
    }

    const supportOptions: RadioOption[] = [
        {
            value: 'peraku',
            label: 'Peraku',
        },
        {
            value: 'tidakPeraku',
            label: 'Tidak Peraku',
        },
    ];

    let textFieldValue='Butiran lengkap...';

    //reset what have been typed by user in the long text field for Tindakan/Ulasan
    function setSemula(){
        textFieldValue='Butiran lengkap...';
    }
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Pemangkuan Gred 1-54"
        description="Sila semak maklumat-maklumat permohonan pemangkuan berikut"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Batal"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/pemangkuan');
            }}
        >
            <SvgBlock />
        </TextIconButton>
    </ContentHeader>
</section>

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
        <!-- Senarai Kakitangan Yang Terpilih (Stepper Only) -->
        <StepperContent>
            <StepperContentHeader title="Senarai Kakitangan Yang Terpilih"
            ></StepperContentHeader>
        </StepperContent>

        <!-- Kemaskini Keputusan Mesyuarat Pemilihan Calon -->
        <StepperContent>
            <StepperContentHeader
                title="Kemaskini Keputusan Mesyuarat Pemilihan Calon"
            >
                <TextIconButton
                    label="Set Semula"
                    onClick={() => setSemula()}
                    ><SvgExchangeArrow /></TextIconButton
                >
                <TextIconButton
                    primary
                    label="Hantar"
                    onClick={() =>
                        goto('/pengarah-bahagian-negeri/perjawatan/pemangkuan')}
                    ><SvgPaperAirplane /></TextIconButton
                ></StepperContentHeader
            >
            <StepperContentBody>
                <SectionHeader
                    title="Keputusan daripada Pengarah Bahagian atau Negeri"
                ></SectionHeader>
                <div
                    class="flex h-[40px] max-h-[40px] min-h-[40px] w-full flex-row items-center justify-between"
                >
                    <div
                        class="flex h-full max-h-full flex-col items-start justify-center"
                    >
                        <span class="text-sm italic text-system-primary"
                            >&#x2022; Keputusan akan dihantar ke email klinik
                            dan Urus Setia berkaitan</span
                        >
                    </div>
                </div>
                <LongTextField
                    labelBlack={false}
                    id={'tindakan-ulasan'}
                    label={'Tindakan/Ulasan'}
                    bind:value={textFieldValue}
                />
                <RadioSingle options={supportOptions} />
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start border-b"
                ></div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
