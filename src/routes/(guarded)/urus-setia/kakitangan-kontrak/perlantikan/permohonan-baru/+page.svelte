<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import DropdownSelect from '$lib/components/input/DropdownSelect.svelte';
    import StepperContentHeader from '$lib/components/stepper/StepperContentHeader.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';
    import { _newAppointments, _submitFormNewAppointments } from './+page';

    export let data: PageData;

    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let generatedLink: string = '';

    function generateRandomString() {
        let randomString =
            'https://www.mypsm.com.gov.my/lantikan-baru-kontrak/calon/daftar-';

        for (let i = 0; i < 15; i++) {
            randomString +=
                characters[Math.floor(Math.random() * characters.length)];
        }
        generatedLink = randomString + '.com';
    }

    let text = '';

    //Supporter Approver
    const {
        form: newAppointmentsForm,
        errors: newAppointmentsErrors,
        enhance: newAppointmentsEnhance,
    } = superForm(data.newAppointments, {
        SPA: true,
        id: 'FormNewAppointments',
        validators: _newAppointments,
        onSubmit() {
            console.log(newAppointmentsForm);
            _submitFormNewAppointments($newAppointmentsForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat Lantikan Baru (Kontrak)"
        description="Hal-hal berkaitan lantikan baru kontrak. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../perlantikan');
            }}
        />
        <FormButton type="reset" addLabel="Simpan" onClick={() => {}} />
        <TextIconButton primary label="Simpan" form="FormNewAppointments">
            <SvgCheck></SvgCheck>
        </TextIconButton>
    </ContentHeader>
</section>

<!-- content body starts here -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <form
        id="FormNewAppointments"
        class="flex w-full flex-col gap-2"
        use:newAppointmentsEnhance
        method="POST"
    >
        <StepperContentHeader title="Maklumat kakitangan dan Kontrak" />
        <div class="my-5 space-y-2.5">
            <TextField
                hasError={!!$newAppointmentsErrors.name}
                name="name"
                placeholder="contoh: Mohd Azizi Bin Othman"
                label={'Nama'}
                type="text"
                bind:value={$newAppointmentsForm.name}
            ></TextField>
            {#if $newAppointmentsErrors.name}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.name[0]}</span
                >
            {/if}

            <TextField
                hasError={!!$newAppointmentsErrors.email}
                name="email"
                placeholder="contoh: azizi@lkim.com"
                label={'Emel'}
                type="email"
                bind:value={$newAppointmentsForm.email}
            ></TextField>
            {#if $newAppointmentsErrors.email}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.email[0]}</span
                >
            {/if}

            <DateSelector
                hasError={!!$newAppointmentsErrors.startContract}
                name="startContract"
                handleDateChange
                label="Tarikh Mula Kontrak"
                bind:selectedDate={$newAppointmentsForm.startContract}
            ></DateSelector>
            {#if $newAppointmentsErrors.startContract}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.startContract[0]}</span
                >
            {/if}

            <DateSelector
                hasError={!!$newAppointmentsErrors.endContract}
                name="endContract"
                handleDateChange
                label="Tarikh Tamat Kontrak"
                bind:selectedDate={$newAppointmentsForm.endContract}
            ></DateSelector>
            {#if $newAppointmentsErrors.endContract}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.endContract[0]}</span
                >
            {/if}
            <TextField
                hasError={!!$newAppointmentsErrors.contractPeriod}
                name="contractPeriod"
                label={'Tempoh Kontrak (Bulan)'}
                type="number"
                bind:value={$newAppointmentsForm.contractPeriod}
            ></TextField>

            {#if $newAppointmentsErrors.contractPeriod}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.contractPeriod[0]}</span
                >
            {/if}
            <TextField
                hasError={!!$newAppointmentsErrors.wageRate}
                name="wageRate"
                label={'Kadar Upah (RM)'}
                type="number"
                bind:value={$newAppointmentsForm.wageRate}
            ></TextField>
            {#if $newAppointmentsErrors.wageRate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.wageRate[0]}</span
                >
            {/if}

            <TextField
                hasError={!!$newAppointmentsErrors.designation}
                name="designation"
                label={'Gelaran Tugas'}
                type="text"
                bind:value={$newAppointmentsForm.designation}
            ></TextField>

            {#if $newAppointmentsErrors.designation}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.designation[0]}</span
                >
            {/if}
            <DateSelector
                hasError={!!$newAppointmentsErrors.reportDutyDate}
                name="reportDutyDate"
                handleDateChange
                label="Tarikh Lapor Diri"
                bind:selectedDate={$newAppointmentsForm.reportDutyDate}
            ></DateSelector>
            {#if $newAppointmentsErrors.reportDutyDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.reportDutyDate[0]}</span
                >
            {/if}
        </div>
    </form>
    <!-- <div class="mb-5 w-fit">
        <FormButton
            type="generate-link"
            onClick={() => generateRandomString()}
        />
    </div>
    <StepperContentHeader
        title="Pautan bagi kegunaan kakitangan baru mengisi borang permohonan
    secara atas talian:"
    />
    <div class="my-5 space-y-2.5">
        <TextField
            hasError={$newAppointmentsErrors.generatedLink ? true : false}
            name="generatedLink"
            label={'Pautan'}
            placeholder="https://"
            type="text"
            bind:value={$newAppointmentsForm.generatedLink}
        ></TextField>

        {#if $newAppointmentsErrors.generatedLink}
            <span
                class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$newAppointmentsErrors.generatedLink[0]}</span
            >
        {/if}
    </div> -->
</section>
<Toaster />
