<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _addClinicApplicationScheme, _submitForm } from './+page';

    export let data: PageData;

    let result: string = 'pending';

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _addClinicApplicationScheme,
        onUpdate(event) {},
        onSubmit() {
            _submitForm($form).then((value) => {
                result = value.result;

                alert(result);
            });
        },
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Permohonan Penambahan Klinik Panel"
        description="Masukkan maklumat klinik panel"
        ><FormButton
            type="close"
            onClick={() => {
                goto('/unit-bahagian/perubatan/permohonan-panel-klinik');
            }}
        /></ContentHeader
    >
</section>

<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Klinik">
                <button
                    on:click={() => {}}
                    type="submit"
                    form="addClinicForm"
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
                <div class="flex w-full flex-col items-start justify-start">
                    <form
                        id="addClinicForm"
                        method="POST"
                        use:enhance
                        class="w-full max-w-[800px] space-y-2 p-2"
                    >
                        <!-- district -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.district}
                                id="district"
                                label={'Daerah'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.district}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.district}
                                </p>
                            {/if}
                        </div>

                        <!-- name -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.name}
                                id="name"
                                label={'Nama Klinik'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.name}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.name}
                                </p>
                            {/if}
                        </div>

                        <!-- address -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.address}
                                id="address"
                                label={'Alamat'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.address}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.address}
                                </p>
                            {/if}
                        </div>

                        <!-- email -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.email}
                                id="email"
                                label={'Emel'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.email}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.email}
                                </p>
                            {/if}
                        </div>

                        <!-- contactNumber -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.contactNumber}
                                id="contactNumber"
                                label={'Nombor Telefon'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.contactNumber}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.contactNumber}
                                </p>
                            {/if}
                        </div>

                        <!-- foundationDate -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.foundationDate}
                                id="foundationDate"
                                label={'Tarikh Ditubuhkan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.foundationDate}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.foundationDate}
                                </p>
                            {/if}
                        </div>

                        <!-- clinicType -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.clinicType}
                                id="clinicType"
                                label={'Janis Klinik'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.clinicType}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.clinicType}
                                </p>
                            {/if}
                        </div>

                        <!-- ownershipStatus -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.ownershipStatus}
                                id="ownershipStatus"
                                label={'Status Pemilikan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.ownershipStatus}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.ownershipStatus}
                                </p>
                            {/if}
                        </div>

                        <!-- registeredMedicalPractitioner -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.registeredMedicalPractitioner}
                                id="registeredMedicalPractitioner"
                                label={'Pengamal Perubatan Yang Berdaftar'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.registeredMedicalPractitioner}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.registeredMedicalPractitioner}
                                </p>
                            {/if}
                        </div>

                        <!-- branchCount -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                dataType="number"
                                bind:value={$form.branchCount}
                                id="branchCount"
                                label={'Jumlah Cawangan'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.branchCount}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.branchCount}
                                </p>
                            {/if}
                        </div>

                        <!-- clinicOfficeDistance -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                dataType="number"
                                bind:value={$form.clinicOfficeDistance}
                                id="clinicOfficeDistance"
                                label={'Jarak Dari Pejabat LKIM'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.clinicOfficeDistance}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.clinicOfficeDistance}
                                </p>
                            {/if}
                        </div>

                        <!-- nearestClinicDistance -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                dataType="number"
                                bind:value={$form.nearestClinicDistance}
                                id="nearestClinicDistance"
                                label={'Jarak Klinik Terdekat Dari LKIM'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.nearestClinicDistance}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.nearestClinicDistance}
                                </p>
                            {/if}
                        </div>

                        <!-- operationHours -->
                        <div class="flex w-full flex-col gap-2">
                            <TextField
                                disabled={result == 'success'}
                                bind:value={$form.operationHours}
                                id="operationHours"
                                label={'Waktu Operasi'}
                            ></TextField>
                        </div>
                        <div class="h-5 w-full items-end justify-end">
                            {#if $errors.operationHours}
                                <p
                                    class="text-end text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.operationHours}
                                </p>
                            {/if}
                        </div>
                    </form>
                </div>
            </StepperContentBody>
        </StepperContent>
    </Stepper>
</section>
