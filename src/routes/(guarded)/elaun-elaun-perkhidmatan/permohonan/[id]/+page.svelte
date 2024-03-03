<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant';
    import type { PageData } from './$types';

    export let data: PageData;

    let selectedAllowanceType: string =
        ServiceAllowanceTypeConstant.culturalClothesAllowance.code;
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Elaun-elaun Perkhidmatan">
        <TextIconButton
            type="danger"
            label="Kembali"
            icon="previous"
            onClick={() => {
                goto('/elaun-elaun-perkhidmatan/permohonan');
            }}
        ></TextIconButton>
    </ContentHeader>
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Butiran Permohonan Elaun"
            ></StepperContentHeader>
            <StepperContentBody>
                <div
                    class="flex h-full w-full flex-col items-start justify-start"
                >
                    <form
                        id="allowanceForm"
                        method="POST"
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="allowanceType"
                                label={'Jenis Elaun'}
                                bind:val={selectedAllowanceType}
                                options={data.props.allowanceTypeDropdown}
                            ></CustomSelectField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
