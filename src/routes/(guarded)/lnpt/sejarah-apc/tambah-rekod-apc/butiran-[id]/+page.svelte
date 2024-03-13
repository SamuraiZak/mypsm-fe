<script lang="ts">
    import { goto } from '$app/navigation';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _addApcSchema, _submitForm } from './+page';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import {
        getErrorToast,
        getLoginSuccessToast,
    } from '$lib/helpers/core/toast.helper';
    import type { CommonEmployeeDTO } from '$lib/dto/core/common/employee/employee.dto';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: PageData;

    let result: string = 'Pending';

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: zodClient(_addApcSchema),
        onUpdate(event) {},
        onSubmit() {
            $form.employeeId = data.props.employeeDetails.employeeId;
            _submitForm($form).then((value) => {
                result = value.result;

                if (result == 'success') {
                    getLoginSuccessToast().then(() => {
                        goto('/lnpt/sejarah-apc');
                    });
                } else {
                    getErrorToast();
                }
            });
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Tambah Rekod Sejarah Anugerah Perkhidmatan Cemerlang (APC)"
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('/lnpt/sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgChevronLeft />
        </TextIconButton></ContentHeader
    >
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan">
                <button
                    type="submit"
                    form="addApcForm"
                    class="flex h-7 min-h-7 flex-row items-center justify-center gap-1 rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-systemBlue-light px-2.5 py-0 text-ios-basic-white"
                >
                    <!-- icon -->
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <span class="leading-loose">
                            <!-- icon slot -->

                            <slot />
                        </span>
                    </div>

                    <!-- label -->
                    <div
                        class="flex h-full flex-row items-center justify-center"
                    >
                        <p class="text-sm font-normal leading-loose">Simpan</p>
                    </div>
                </button>
            </StepperContentHeader>
            <StepperContentBody>
                <form
                    id="addApcForm"
                    method="POST"
                    use:enhance
                    class="w-full space-y-2 p-2"
                >
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="name"
                            label={'Nama Kakitangan'}
                            val={data.props.employeeDetails.name}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="employeeNumber"
                            label={'Nombor Pekerja'}
                            val={data.props.employeeDetails.employeeNumber}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            type=""
                            id="identityCard"
                            label={'No. Kad Pengenalan'}
                            val={data.props.employeeDetails.identityCard}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="position"
                            label={'Jawatan'}
                            val={data.props.employeeDetails.position}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="grade"
                            label={'Gred'}
                            val={data.props.employeeDetails.grade}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="scheme"
                            label={'Skim'}
                            val={data.props.employeeDetails.scheme}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            disabled
                            id="program"
                            label={'Program'}
                            val={data.props.employeeDetails.program}
                        ></CustomTextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <CustomTextField
                            type="number"
                            id="excellenceAwardYear"
                            label={'Tahun APC'}
                            placeholder="1999"
                            bind:val={$form.excellenceAwardYear}
                        ></CustomTextField>
                    </div>
                    <div class="h-5 w-full items-end justify-end">
                        {#if $errors.excellenceAwardYear}
                            <p
                                class="text-end text-sm italic text-ios-basic-destructiveRed"
                            >
                                {$errors.excellenceAwardYear}
                            </p>
                        {/if}
                    </div>
                </form>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
