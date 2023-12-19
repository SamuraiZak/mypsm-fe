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
    import SvgPrinter from '$lib/assets/svg/SvgPrinter.svelte';
    import CustomTable from '$lib/components/table/CustomTable.svelte';
    import { mockCalonPemangkuanList } from '$lib/mocks/perjawatan/pemangkuan/senaraiCalonPemangkuan';
    import SvgEdit from '$lib/assets/svg/SvgEdit.svelte';

    let checkedItems: Object[] = [];
</script>

<!-- header section -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemangkuan Gred 1-54"
        description="Sila semak butiran dan isi ruangan yang berkaitan"
    >
        <!-- TODO: put buttons in this area if necessary -->
        <TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/kakitangan/perjawatan/pemangkuan');
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
        <!-- Keputusan Mesyuarat -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Mesyuarat"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Butiran Pemangkuan"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Permohonan Penangguhan/Pindaan Penempatan -->
        <StepperContent>
            <StepperContentHeader
                title="Permohonan Penangguhan/Pindaan Penempatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Sila isi butiran yang tertera di bawah"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Permohonan Penangguhan/Pindaan Penempatan -->
        <StepperContent>
            <StepperContentHeader
                title="Keputusan Permohonan Penangguhan/Pindaan Penempatan"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Semak keputusan"></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>

        <!-- Keputusan Akhir Pemangkuan -->
        <StepperContent>
            <StepperContentHeader title="Keputusan Akhir Pemangkuan"
            ></StepperContentHeader>
            <StepperContentBody>
                <SectionHeader title="Butiran Keputusan Akhir Pemangkuan"
                ></SectionHeader>
                <div
                    class="flex max-h-full w-full flex-col items-start justify-start"
                ></div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
