<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import { goto } from '$app/navigation';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomRadioBoolean from '$lib/components/inputs/radio-field/CustomRadioBoolean.svelte';
    import { superForm, superValidate } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    export let data: PageData

</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Maklumat Kakitangan dan Kontrak">
        <TextIconButton
            icon="cancel"
            type="neutral"
            label="Tutup"
            onClick={() => goto('../')}
        />
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
            ></StepperContentHeader>
            <StepperContentBody>
                <CustomTextField
                    label="No. Pekerja"
                    disabled
                    id="employeeNumber"
                    bind:val={data.employeeDetail.employeeNumber}
                />
                <CustomTextField
                    label="Nama"
                    disabled
                    id="fullName"
                    bind:val={data.employeeDetail.fullName}
                />
                <CustomTextField
                    label="No. Kad Pengenalan"
                    disabled
                    id="identityCardNumber"
                    bind:val={data.employeeDetail.identityCardNumber}
                />
                <CustomTextField
                    label="Gred"
                    disabled
                    id="grade"
                    bind:val={data.employeeDetail.grade}
                />
                <CustomTextField
                    label="Penempatan"
                    disabled
                    id="placement"
                    bind:val={data.employeeDetail.placement}
                />
                <CustomTextField
                    label="Kumpulan"
                    disabled
                    id="serviceGroup"
                    bind:val={data.employeeDetail.serviceGroup}
                />
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
