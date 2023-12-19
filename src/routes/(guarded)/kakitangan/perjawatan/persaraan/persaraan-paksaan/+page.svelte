<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DownloadAttachment from '$lib/components/input/DownloadAttachment.svelte';
    import { goto } from '$app/navigation';
    import { Badge } from 'flowbite-svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgPaperAirplane from '$lib/assets/svg/SvgPaperAirplane.svelte';
    import FileInputField from '$lib/components/input/FileInputField.svelte';

    export let disabled: boolean = false;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Persaraan"
        description="Maklumat berkaitan dengan perjawatan - persaraan"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/kakitangan/perjawatan/persaraan/');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Perakuan Dari Unit Integriti -->
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hafiz Bin Ahmad'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Permohonan persaraan DIPERAKU'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">DIPERAKU</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody
            ><!-- Perakuan Dari Unit Integriti -->
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Persaraan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <TextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        value={'Hakimi Bin Urash'}
                    ></TextField>
                    <LongTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        value={'Permohonan disahkan'}
                    ></LongTextField>
                    <div class="flex w-full flex-row text-sm">
                        <label for="staffing-sec-result" class="w-[220px]"
                            >Keputusan</label
                        ><Badge border color="green">SAH</Badge>
                    </div>
                </div>
            </div></StepperContentBody
        >
    </StepperContent>
    <StepperContent>
        <StepperContentHeader title="Pengesahan Dokumen Persaraan"
            ><TextIconButton
                primary
                label="Hantar"
                onClick={() => {
                    goto('/kakitangan/perjawatan/persaraan/');
                }}><SvgPaperAirplane /></TextIconButton
            ></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div class="flex w-full flex-col gap-2 border-b border-bdr-primary pb-5">
                    <p class="text-sm font-bold">
                        Dokumen Persaraan Kakitangan
                    </p>
                    <p class="text-sm">
                        Fail-fail untuk dimuat turun dan diisi:
                    </p>
                    <ul
                        class="flex w-full list-decimal flex-col gap-2 pl-4 text-sm"
                    >
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                        <li>
                            <DownloadAttachment fileName="JPA BP_SPPP B01a"
                            ></DownloadAttachment>
                        </li>
                    </ul>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start"
                ></div>
                <p class="text-sm font-bold">Muat Naik Dokumen</p>
                <p class="text-sm">
                    Sila muat naik dokumen-dokumen yang telah diisi:
                </p>
                <div
                    class="flex flex-col items-center justify-center rounded-[3px] border border-system-primaryTint p-2.5"
                >
                    <p class="text-base text-txt-secondary">
                        Seret dan lepas fail anda ke dalam ruangan ini atau
                        pilih fail dari peranti anda
                    </p>
                    <span>
                        <FileInputField />
                    </span>
                </div>
                <p class="text-sm text-rose-500">
                    Sila muat naik dokumen sokongan pada ruangan disediakan.
                </p>
            </div></StepperContentBody
        >
    </StepperContent>
</Stepper>
