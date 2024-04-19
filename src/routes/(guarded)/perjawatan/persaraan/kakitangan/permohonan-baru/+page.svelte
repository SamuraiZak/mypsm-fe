<script lang="ts">
    import { Badge, Dropdown } from 'flowbite-svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import { goto } from '$app/navigation';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { superForm } from 'sveltekit-superforms/client';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';

    export let data: PageData;

    export let disabled = true;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Persaraan Pilihan 0282378L"
        ><TextIconButton
            label="Kembali"
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/persaraan');
            }}
        /></ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody>
            <div class="flex w-full flex-col gap-2">
                <div>
                    <CustomTextField
                        {disabled}
                        id="supporter1Option"
                        label="Tarikh Bersara Awal"
                        val=""
                    ></CustomTextField>
                </div>
                <div>
                    <CustomTextField
                        {disabled}
                        id="supporter2Option"
                        label="Tarikh Permohonan Persaraan Pilihan"
                        val=""
                    ></CustomTextField>
                </div>
                <div>
                    <CustomTextField
                        {disabled}
                        id="approverOption"
                        label="Tujuan Permohonan"
                        val=""
                    ></CustomTextField>
                </div>
            </div>
        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
