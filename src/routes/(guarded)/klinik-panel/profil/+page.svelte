<script lang="ts">
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import { tahun } from '$lib/mocks/ketua-seksyen/cuti/tahun';
    import TextField from '$lib/components/input/TextField.svelte';
    import DateSelector from '$lib/components/input/DateSelector.svelte';
    import LongTextField from '$lib/components/input/LongTextField.svelte';
    import SvgCheck from '$lib/assets/svg/SvgCheck.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { _profile, _submitFormProfile } from './+page';

    export let data: PageData;

    let selectedDate = new Date();

    function handleDateChange(event: any) {
        selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        console.log(formattedDate);
    }

    const {
        form: profileForm,
        errors: profileErrors,
        enhance: profileEnhance,
    } = superForm(data.profile, {
        SPA: true,
        validators: _profile,
        onSubmit() {
            _submitFormProfile($profileForm);
        },
        taintedMessage:
            'Terdapat maklumat yang belum disimpan. Adakah anda hendak keluar dari laman ini?',
    });
</script>

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Profil"
        description="Kemaskini maklumat-maklumat profil"
        ><TextIconButton primary label="Simpan" form="FormProfile">
            <SvgCheck></SvgCheck>
        </TextIconButton></ContentHeader
    >
</section>

<section
    class="flex h-full max-h-[100vh-172px] w-full flex-col items-center justify-start gap-2.5 overflow-y-auto p-2.5 p-2.5"
>
    <form
        id="FormProfile"
        class="flex w-full flex-col gap-2"
        use:profileEnhance
        method="POST"
    >
        <div class="flex w-full flex-col gap-2">
            <p class="text-sm font-bold">Maklumat Klinik Panel</p>
            <TextField
                hasError={!!$profileErrors.clinicCode}
                name="clinicCode"
                label="Kod Klinik"
                bind:value={$profileForm.clinicCode}
            />
            {#if $profileErrors.clinicCode}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.clinicCode}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.name}
                name="name"
                label="Nama Klinik"
                bind:value={$profileForm.name}
            />
            {#if $profileErrors.name}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.name}</span
                >
            {/if}

            <LongTextField
                hasError={!!$profileErrors.address}
                name="address"
                label="Alamat"
                bind:value={$profileForm.address}
            />
            {#if $profileErrors.address}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.address}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.postcode}
                name="postcode"
                label="Poskod"
                type="number"
                bind:value={$profileForm.postcode}
            />
            {#if $profileErrors.postcode}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.postcode}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.city}
                name="city"
                label="Bandar"
                bind:value={$profileForm.city}
            />
            {#if $profileErrors.city}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.city}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.state}
                name="state"
                label="Negeri"
                bind:value={$profileForm.state}
            />
            {#if $profileErrors.state}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.state}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.contactNumber}
                name="contactNumber"
                label="No. Telefon"
                type="number"
                bind:value={$profileForm.contactNumber}
            />
            {#if $profileErrors.contactNumber}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.contactNumber}</span
                >
            {/if}
        </div>
        <div class="flex w-full flex-col gap-2">
            <p class="text-sm font-bold">Maklumat Bank</p>
            <TextField
                hasError={!!$profileErrors.bank}
                name="bank"
                label="Nama Bank"
                bind:value={$profileForm.bank}
            />
            {#if $profileErrors.bank}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.bank}</span
                >
            {/if}

            <TextField
                hasError={!!$profileErrors.accountNumber}
                name="accountNumber"
                label="No. Akaun"
                type="number"
                bind:value={$profileForm.accountNumber}
            />
            {#if $profileErrors.accountNumber}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.accountNumber}</span
                >
            {/if}
        </div>
        <div class="flex w-full flex-col gap-2">
            <p class="text-sm font-bold">Maklumat Latihan</p>
            <DateSelector
                hasError={!!$profileErrors.panelAppointedDate}
                name="panelAppointedDate"
                handleDateChange
                label="Tarikh Mula Lantikan"
                bind:selectedDate={$profileForm.panelAppointedDate}
            ></DateSelector>
            {#if $profileErrors.panelAppointedDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.panelAppointedDate}</span
                >
            {/if}

            <DateSelector
                hasError={!!$profileErrors.panelContractEndDate}
                name="panelContractEndDate"
                handleDateChange
                label="Tarikh Tamat"
                bind:selectedDate={$profileForm.panelContractEndDate}
            ></DateSelector>
            {#if $profileErrors.panelContractEndDate}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$profileErrors.panelContractEndDate}</span
                >
            {/if}
        </div>
    </form>
</section>
<Toaster />
