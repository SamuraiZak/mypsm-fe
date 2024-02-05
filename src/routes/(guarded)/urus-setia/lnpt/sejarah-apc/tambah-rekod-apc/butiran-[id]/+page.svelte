<script lang="ts">
    import { goto } from '$app/navigation';
    import SvgArrowLeft from '$lib/assets/svg/SvgArrowLeft.svelte';

    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _addApcScheme, _submitForm } from './+page';
    import type { CommonEmployeeDTO } from '$lib/dto/mypsm/common/employee/employee.dto';
    import {
        getErrorToast,
        getLoginSuccessToast,
        getSuccessToast,
    } from '$lib/services/core/toast/toast-service';

    export let data: PageData;

    const employeeDetails: CommonEmployeeDTO = data.props.response.data
        ?.details as CommonEmployeeDTO;

    data.form.data.employeeName = employeeDetails.name ?? '';

    let result: string = 'Pending';

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _addApcScheme,
        onUpdate(event) {},
        onSubmit() {
            _submitForm($form).then((value) => {
                result = value.result;

                if (result == 'success') {
                    getLoginSuccessToast().then(() => {
                        goto('/urus-setia/lnpt/sejarah-apc');
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
        description="Hal-hal pengurusan sejarah APC bagi kakitangan LKIM."
        ><TextIconButton
            label="Kembali"
            onClick={() => {
                goto('/urus-setia/lnpt/sejarah-apc/tambah-rekod-apc');
            }}
        >
            <SvgArrowLeft />
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
                    on:click={() => {
                        console.log(data.form.data.excellenceAwardYear);
                    }}
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
                        <TextField
                            disabled
                            id="name"
                            label={'Nama Kakitangan'}
                            bind:value={$form.employeeName}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="employeeNumber"
                            label={'Nombor Pekerja'}
                            value={employeeDetails.employeeNumber}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="identityCard"
                            label={'No. Kad Pengenalan'}
                            value={employeeDetails.identityCard}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="position"
                            label={'Jawatan'}
                            value={employeeDetails.position}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="grade"
                            label={'Gred'}
                            value={employeeDetails.grade}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="scheme"
                            label={'Skim'}
                            value={employeeDetails.scheme}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            disabled
                            id="program"
                            label={'Program'}
                            value={employeeDetails.program}
                        ></TextField>
                    </div>
                    <div class="flex w-full flex-col gap-2">
                        <TextField
                            dataType="number"
                            id="excellenceAwardYear"
                            label={'Tahun APC'}
                            placeholder="1999"
                            bind:value={$form.excellenceAwardYear}
                        ></TextField>
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
