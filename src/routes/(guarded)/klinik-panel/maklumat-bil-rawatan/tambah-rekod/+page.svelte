<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import { hubungan } from '$lib/mocks/klinik-panel/hubungan';
    import SvgXMark from '$lib/assets/svg/SvgXMark.svelte';
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import Stepper from '$lib/components/stepper/Stepper.svelte';
    import StepperContent from '$lib/components/stepper/StepperContent.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import StepperContentBody from '$lib/components/stepper/StepperContentBody.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import TreatmentList from '$lib/components/klinik-panel/TreatmentList.svelte';
    import PatientList from '$lib/components/klinik-panel/PatientList.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import {
        _stepperStaffInfo,
        _submitFormStepperStaffInfo,
    } from './+page';
    export let data: PageData;
    export let disabled: boolean = true;

    let selectedDate = new Date();
    let selectedHubungan = hubungan[0].value;

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    export const mockTreatment = {
        1: {
            namaPesakit: 'Alyaa Binti Samad',
        },
        2: {
            namaPesakit: 'Danial',
        },
    };

    // Panel Clinic Application Verification
    const {
        form: staffInfoForm,
        errors: staffInfoErrors,
        enhance: staffInfoEnhance,
    } = superForm(data.stepperStaffInfo, {
        SPA: true,
        validators: _stepperStaffInfo,
        onSubmit() {
            _submitFormStepperStaffInfo(
                $staffInfoForm,
            );
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Rawatan" description="Maklumat-maklumat rawatan"
        ><TextIconButton
            label="Tutup"
            onClick={() => {
                goto('/klinik-panel/maklumat-bil-rawatan');
            }}
        >
            <SvgXMark></SvgXMark>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-start justify-start overflow-y-hidden"
>
    <Stepper>
        <StepperContent>
            <StepperContentHeader title="Maklumat Kakitangan"
                ><TextIconButton
                    primary
                    label="Simpan"
                    form="FormStepperStaffInfo"
                >
                    <SvgCheck></SvgCheck>
                </TextIconButton></StepperContentHeader
            >
            <StepperContentBody
                ><form
                    id="FormStepperStaffInfo"
                    class="flex w-full flex-col gap-2"
                    use:staffInfoEnhance
                    method="POST"
                >
                    <div
                        class="flex h-fit w-full flex-col items-start justify-start gap-2"
                    >
                        <TextField
                            hasError={!!$staffInfoErrors.name}
                            name="name"
                            label="Nama"
                            bind:value={staffInfoForm.name}
                        />
                        {#if $staffInfoErrors.name}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffInfoErrors.name}</span
                            >
                        {/if}
                        <TextField
                            hasError={!!$staffInfoErrors.staffId}
                            name="staffId"
                            label="No. Pekerja"
                            bind:value={$staffInfoForm.staffId}
                        />
                        {#if $staffInfoErrors.staffId}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffInfoErrors.staffId}</span
                            >
                        {/if}
                        <TextField
                            hasError={!!$staffInfoErrors.idNumber}
                            name="idNumber"
                            label="No. K/P"
                            bind:value={$staffInfoForm.idNumber}
                        />
                        {#if $staffInfoErrors.idNumber}
                            <span
                                class="ml-[220px] font-sans text-sm italic text-system-danger"
                                >{$staffInfoErrors.idNumber}</span
                            >
                        {/if}
                        <TextField
                            {disabled}
                            id="gred"
                            label={'Gred'}
                            value={'41'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="penempatan"
                            label={'Penempatan'}
                            value={'52345 - Bhgn. Teknologi Maklumat'}
                        ></TextField>
                        <TextField
                            {disabled}
                            id="kumpulan"
                            label={'Kumpulan'}
                            value={'PP! - Pengurusan dan Professional - A'}
                        ></TextField>
                    </div>
                </form></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Maklumat Pesakit"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex max-h-full w-full flex-col gap-2.5">
                    <PatientList />
                </div></StepperContentBody
            >
        </StepperContent>
        <StepperContent>
            <StepperContentHeader title="Dokumen Rawatan/Ubat"
            ></StepperContentHeader>
            <StepperContentBody>
                <div class="flex w-full flex-col gap-2">
                    <div class="flex w-full flex-col gap-2">
                        {#each Object.entries(mockTreatment) as [key, result], index}
                            <div
                                class="flex w-full flex-col gap-2.5 rounded-[3px] border border-system-primary p-2.5"
                            >
                                <SectionHeader
                                    color="system-primary"
                                    title="Pesakit #{key}: {result.namaPesakit}"
                                ></SectionHeader>
                                <hr />

                                <TreatmentList {key} />
                            </div>
                        {/each}
                    </div>
                </div></StepperContentBody
            >
        </StepperContent>
    </Stepper>
</section>
<Toaster />
