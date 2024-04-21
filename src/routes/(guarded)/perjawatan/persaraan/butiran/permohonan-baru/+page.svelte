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
    import { zod } from 'sveltekit-superforms/adapters';
    import { _retirementDetailSubmit } from './+page';
    import { _addRetirementVoluntaryInfoSchema } from '$lib/schemas/mypsm/employment/retirement/schema';


    
    export let data: PageData;


    export let disabled = true;


    const {
        form: retirementVoluntaryInfoForm,
        errors: retirementVoluntaryInfoError,
        enhance: retirementVoluntaryInfoEnhance,
        isTainted: retirementVoluntaryDetailTainted,
    } = superForm(data.retirementDetailForm, {
        SPA: true,
        id: 'retirementVoluntaryDetail',
        dataType: 'json',
        multipleSubmits: 'allow',
        resetForm: false,
        validationMethod: 'oninput',
        validators: zod(_addRetirementVoluntaryInfoSchema),
        onSubmit() {
            _retirementDetailSubmit($retirementVoluntaryInfoForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Permohonan Persaraan Pilihan 0282378L"
        ><TextIconButton
            label="Kembali"
            type="close"
            onClick={() => {
                goto('/urus-setia/perjawatan/persaraan');
            }}
        />
        <TextIconButton label="Simpan" icon="check" form="retirementVoluntaryDetail" />

        </ContentHeader
    >
</section>

<Stepper>
    <StepperContent>
        <StepperContentHeader title="Permohonan Persaraan"
        ></StepperContentHeader>
        <StepperContentBody>
            <form
                id="retirementVoluntaryDetail"
                method="POST"
                use:retirementVoluntaryInfoEnhance
                class="flex w-full flex-col gap-2"
            >
            <div class="flex w-full flex-col gap-2">
                <div>
                    <CustomTextField    
                    type="date"
                        id="retirementDate"
                        label="Tarikh Bersara Awal"
                        bind:val={$retirementVoluntaryInfoForm.retirementDate}
                    ></CustomTextField>
                </div>
                <div>
                    <CustomTextField   
                    type="date" 
                        id="newRetirementDate"
                        label="Tarikh Permohonan Persaraan Pilihan"
                        bind:val={$retirementVoluntaryInfoForm.newRetirementDate}
                    ></CustomTextField>
                </div>
                <div>
                    <CustomTextField    
                        id="reason"
                        label="Tujuan Permohonan"
                        bind:val={$retirementVoluntaryInfoForm.reason}
                    ></CustomTextField>
                </div>
            </div>

            
</form>


        </StepperContentBody>
    </StepperContent>
</Stepper>
<Toaster />
