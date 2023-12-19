<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import { Badge, Checkbox } from 'flowbite-svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';

    let tableCellClass = 'border h-[32px] min-h-[32px] py-1 px-2.5';

    const options: RadioOption[] = [
        {
            value: 'ada',
            label: 'Ada',
        },
        {
            value: 'tidak ada',
            label: 'Tidak Ada',
        },
    ];

    const supportOptions: RadioOption[] = [
        {
            value: 'support',
            label: 'SOKONG',
        },
        {
            value: 'do not support',
            label: 'TIDAK SOKONG',
        },
    ];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Tanggung Kerja"
        description="Sila lengkapkan butiran yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/tanggung-kerja');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content section -->
<!-- do not change the style of this section -->
<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <!-- start your content with this div and style it with your own preference -->
    <Stepper>
        <StepperContent>
            <StepperContentHeader
                title="Senarai Semak Permohonan Penangguhan/Pindaan Penempatan Kerja"
            ><TextIconButton
            primary
            label="Hantar"
            onClick={() => {
                goto('/pengarah-bahagian-negeri/perjawatan/tanggung-kerja');
            }}
        >
            <SvgPaperAirplane></SvgPaperAirplane>
        </TextIconButton></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader
                    title="Ulasan Keputusan daripada Pengarah Perkhidmatan Pengurusan"
                ></SectionHeader>
                <div
                    class="flex h-fit w-full flex-col items-start justify-start gap-2"
                >
                    <LongTextField
                        label="Tindakan/Ulasan"
                        value=""
                        placeholder="-"
                    ></LongTextField>
                    <RadioSingle options={supportOptions} />
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
