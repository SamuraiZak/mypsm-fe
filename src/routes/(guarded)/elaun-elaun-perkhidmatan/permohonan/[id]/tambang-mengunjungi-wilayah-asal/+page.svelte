<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { ServiceAllowanceTypeConstant } from '$lib/constants/core/service-allowance.constant';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zod } from 'sveltekit-superforms/adapters';
    import { _addTambangMengunjungiWilayahAsalSchemaSchema } from '$lib/schemas/mypsm/service-allowance/service-allowance.schema';
    import { _submitAllowanceDetail } from './+page';

    export let data: PageData;

    function _handleAllowanceTypeChange(allowanceTypeCode: string) {
        const tempAllowanceType: LookupDTO =
            ServiceAllowanceTypeConstant.list.find(
                (item) => item.code === allowanceTypeCode,
            ) ?? ServiceAllowanceTypeConstant.bantuanPakaianIstiadat;

        const newUrl: string =
            '/elaun-elaun-perkhidmatan/permohonan/' +
            data.props.applicationId +
            '/' +
            tempAllowanceType.url;
        goto(newUrl, { replaceState: true });
    }

    const {
        form: detailForm,
        errors: detailErrors,
        enhance: detailEnhance,
    } = superForm(data.props.allowanceDetailForm, {
        SPA: true,
        validators: zod(_addTambangMengunjungiWilayahAsalSchemaSchema),
        onSubmit(input) {
            _submitAllowanceDetail($detailForm);
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Permohonan Elaun-elaun Perkhidmatan">
        <TextIconButton
            type="neutral"
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
                        use:detailEnhance
                        class="flex w-full flex-col items-center justify-start space-y-2 p-2 lg:w-1/2"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="allowanceType"
                                label={'Jenis Elaun'}
                                errors={$detailErrors.allowanceTypeCode}
                                bind:val={$detailForm.allowanceTypeCode}
                                onValueChange={() => {
                                    _handleAllowanceTypeChange(
                                        $detailForm.allowanceTypeCode,
                                    );
                                }}
                                options={data.props.allowanceTypeDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="applyCode"
                                label={'Permohonan Untuk'}
                                errors={$detailErrors.applyCode}
                                bind:val={$detailForm.applyCode}
                                options={data.props.applyOnBehalfDropdown}
                            ></CustomSelectField>
                        </div>
                        <div class="flex w-full flex-col gap-2">
                            <CustomSelectField
                                id="stateCode"
                                label={'Wilayah Asal'}
                                errors={$detailErrors.stateCode}
                                bind:val={$detailForm.stateCode}
                                options={data.props.stateDropdown}
                            ></CustomSelectField>
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
