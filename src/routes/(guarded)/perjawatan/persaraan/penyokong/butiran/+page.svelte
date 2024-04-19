<script lang="ts">
    // import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    // import LongCustomTextField from '$lib/components/input/LongTextField.svelte';
    // import TextField from '$lib/components/input/TextField.svelte';
    import { Badge } from 'flowbite-svelte';
    // import RadioSingle from '$lib/components/input/RadioSingle.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import { goto } from '$app/navigation';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    // import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    // import FormButton from '$lib/components/buttons/FormButton.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';

    export let disabled = true;

    // const options: RadioOption[] = [
    //     {
    //         value: 'sokong',
    //         label: 'Sokong',
    //     },
    //     {
    //         value: 'tidakSokong',
    //         label: 'Tidak Sokong',
    //     },
    // ];
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Persaraan Pilihan 0282378L"
        ><TextIconButton
            type="close"
            onClick={() => {
                goto('/penyokong/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Perakuan Dari Unit Integriti"
        ></StepperContentHeader>
        <StepperContentBody
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Unit Integriti</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Hafiz Bin Ahmad'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        val={'Permohonan persaraan DIPERAKU'}
                    ></CustomTextField>
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
            ><div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Urus Setia Persaraan</p>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-2"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Hafiz Bin Ahmad'}
                    ></CustomTextField>
                    <CustomTextField
                        {disabled}
                        id="ulasanTindakan"
                        label={'Ulasan/Tindakan'}
                        val={'Permohonan persaraan diperaku'}
                    ></CustomTextField>
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
        <StepperContentHeader title="Penyokong Permohonan Persaraan"
            ><TextIconButton
                type="primary"
                label="Simpan"
                form="FormStepperRetirementApplicationSupporter"
            >
                <SvgCheck></SvgCheck>
            </TextIconButton></StepperContentHeader
        >
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <p class="text-sm font-bold">Penyokong #2</p>
                <div
                    class="flex h-fit w-full flex-col justify-start border-b border-bdr-primary"
                >
                    <CustomTextField
                        {disabled}
                        id="nama"
                        label={'Nama'}
                        val={'Ikhwan Bin Ahmad'}
                    ></CustomTextField>
                    <CustomTextField
                        id="actionRemark"
                        label="Tindakan / Ulasan"
                        val=""
                    />

                    <CustomRadioBoolean
                        id="resultOption"
                        label="Keputusan"
                        val=""
                    ></CustomRadioBoolean>
                </div>
                <div class="flex w-full items-center justify-center"></div>
                <p class="text-sm font-bold">Penyokong #1</p>
                <CustomTextField
                    {disabled}
                    id="nama"
                    label={'Nama'}
                    val={'Ikhwan Bin Ahmad'}
                ></CustomTextField>
                <CustomTextField
                    {disabled}
                    id="ulasanTindakan"
                    label={'Ulasan/Tindakan'}
                    val={'Maklumat Lengkap'}
                ></CustomTextField>
                <CustomRadioBoolean id="resultOption" label="Keputusan" val=""
                ></CustomRadioBoolean>
                <!-- <div class="flex w-full flex-row text-sm">
                    <label for="staffing-sec-result" class="w-[220px]"
                        >Keputusan</label
                    ><Badge border color="green">SOKONG</Badge>
                </div> -->
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
