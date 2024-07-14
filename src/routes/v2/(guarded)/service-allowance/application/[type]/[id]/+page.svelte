<script lang="ts">
    import { AllowanceCeremonyClothingSchema } from '$lib/schemas/mypsm/allowance/allowance.schema';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let currentAllowanceTypeCode: string = data.props.currentAllowanceType.code;

    let files: FileList;

    // 1. ceremony clothing form
    const {
        form: ceremonyClothingForm,
        errors: ceremonyClothingErrors,
        enhance: ceremonyClothingEnhance,
    } = superForm(data.forms.ceremonyClothingForm, {
        id: 'ceremonyClothingForm',
        SPA: true,
        validators: zodClient(AllowanceCeremonyClothingSchema),
        onSubmit(input) {},
    });
</script>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-hidden"
>
    <ContentHeader title="Borang Permohonan Elaun-elaun Perkhidmatan">
        <TextIconButton
            type="neutral"
            label="Kembali"
            onClick={() => {
                goto('/v2/service-allowance/application');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton>
    </ContentHeader>
</section>
