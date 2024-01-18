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

    // funtion to copy text from html body
    // import { clickToCopy } from '$lib/components/click-to-copy/ClickToCopy';

    let text = '';

    //Supporter Approver
    const {
        form: newAppointmentsForm,
        errors: newAppointmentsErrors,
        enhance: newAppointmentsEnhance,
    } = superForm(data.newAppointments, {
        SPA: true,
        validators: _newAppointments,
        onSubmit() {
            _submitFormNewAppointments($newAppointmentsForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<!-- test button to click to copy -->
<!-- <button use:clickToCopy={'generated-link'}> Click to copy </button> -->

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
                hasError={$newAppointmentsErrors.name ? true : false}
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
                hasError={$newAppointmentsErrors.candidateId ? true : false}
                name="candidateId"
                placeholder="contoh: 12345"
                label={'ID Calon'}
                type="text"
                bind:value={$newAppointmentsForm.candidateId}
            ></TextField>

            {#if $newAppointmentsErrors.candidateId}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.candidateId[0]}</span
                >
            {/if}
            <TextField
                hasError={$newAppointmentsErrors.email ? true : false}
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
                hasError={$newAppointmentsErrors.contractStartDate
                    ? true
                    : false}
                name="contractStartDate"
                handleDateChange
                label="Tarikh Mula Kontrak"
                bind:selectedDate={$newAppointmentsForm.contractStartDate}
            ></DateSelector>
            {#if $newAppointmentsErrors.contractStartDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.contractStartDate[0]}</span
                >
            {/if}
            <DateSelector
                hasError={$newAppointmentsErrors.contractEndDate ? true : false}
                name="contractEndDate"
                handleDateChange
                label="Tarikh Tamat Kontrak"
                bind:selectedDate={$newAppointmentsForm.contractEndDate}
            ></DateSelector>
            {#if $newAppointmentsErrors.contractEndDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.contractEndDate[0]}</span
                >
            {/if}
            <TextField
                hasError={$newAppointmentsErrors.contractDuration
                    ? true
                    : false}
                name="contractDuration"
                label={'Tempoh Kontrak (Bulan)'}
                type="number"
                bind:value={$newAppointmentsForm.contractDuration}
            ></TextField>

            {#if $newAppointmentsErrors.contractDuration}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.contractDuration[0]}</span
                >
            {/if}
            <TextField
                hasError={$newAppointmentsErrors.wageRates ? true : false}
                name="wageRates"
                label={'Kadar Upah (RM)'}
                type="number"
                bind:value={$newAppointmentsForm.wageRates}
            ></TextField>

            {#if $newAppointmentsErrors.wageRates}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.wageRates[0]}</span
                >
            {/if}
            <!-- <DropdownSelect
                labelBlack={true}
                dropdownType="label-left-full"
                name="contract-placement-dropdown"
                label="Penempatan"
                options={[
                    { value: 'selangor-lkim-01', name: 'LKIM Negeri Selangor' },
                    {
                        value: 'sarawak-lkim-01',
                        name: 'LKIM Negeri Sarawak',
                    },
                ]}
            ></DropdownSelect> -->
            <DropdownSelect
                hasError={$newAppointmentsErrors.contractPlacementDropdown
                    ? true
                    : false}
                dropdownType="label-left-full"
                id="contractPlacementDropdown"
                label="Penempatan"
                bind:value={$newAppointmentsForm.contractPlacementDropdown}
                options={[
                    { value: 'selangor-lkim-01', name: 'LKIM Negeri Selangor' },
                    { value: 'sarawak-lkim-01', name: 'LKIM Negeri Sarawak' },
                ]}
            ></DropdownSelect>
            {#if $newAppointmentsErrors.contractPlacementDropdown}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.contractPlacementDropdown[0]}</span
                >
            {/if}
            <TextField
                hasError={$newAppointmentsErrors.jobTitle ? true : false}
                name="jobTitle"
                label={'Gelaran Tugas'}
                type="text"
                bind:value={$newAppointmentsForm.jobTitle}
            ></TextField>

            {#if $newAppointmentsErrors.jobTitle}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.jobTitle[0]}</span
                >
            {/if}
            <DateSelector
                hasError={$newAppointmentsErrors.reportDate ? true : false}
                name="reportDate"
                handleDateChange
                label="Tarikh Lapor Diri"
                bind:selectedDate={$newAppointmentsForm.reportDate}
            ></DateSelector>
            {#if $newAppointmentsErrors.reportDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$newAppointmentsErrors.reportDate[0]}</span
                >
            {/if}
        </div>
        <div class="mb-5 w-fit">
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
        </div>
    </form>
</section>
<Toaster />
