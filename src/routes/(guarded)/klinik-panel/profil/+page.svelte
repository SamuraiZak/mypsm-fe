<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import type { PageData } from './$types';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { _editClinicProfileSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { _submit } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;
    let notEditing: boolean = true;

    const { form, errors, enhance } = superForm(data.clinicPanelProfile, {
        SPA: true,
        taintedMessage: false,
        id: 'editClinicPanelProfileForm',
        validators: zod(_editClinicProfileSchema),
        resetForm: false,
        async onSubmit() {
            const editMode = await _submit($form);

            if (editMode?.status == 'success') {
                notEditing = true;
            }
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Profil">
        {#if notEditing}
            <TextIconButton
                label="Kemaskini"
                type="neutral"
                onClick={() => (notEditing = false)}
            />
        {:else}
            <TextIconButton
                label="Batal"
                type="neutral"
                icon="cancel"
                onClick={() => (notEditing = true)}
            />
            <TextIconButton
                label="Simpan"
                type="primary"
                icon="check"
                form="editClinicPanelProfileForm"
            />
        {/if}
    </ContentHeader>
</section>

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <form
        class="flex w-full flex-col justify-items-start gap-2.5 p-3"
        method="POST"
        id="editClinicPanelProfileForm"
        use:enhance
    >
        <ContentHeader
            title="Maklumat Klinik Panel"
            borderClass="border-none"
        />
        <CustomTextField
            label="Kod Klinik"
            id="clinicCode"
            disabled
            bind:val={$form.clinicCode}
        />
        <CustomTextField
            label="Nama Klinik"
            id="clinicName"
            disabled
            bind:val={$form.clinicName}
            errors={$errors.clinicName}
        />
        <CustomTextField
            label="Alamat"
            id="address"
            disabled
            bind:val={$form.address}
            errors={$errors.address}
        />
        <CustomSelectField
            label="Daerah"
            id="districtId"
            disabled
            options={data.lookup.districtLookup}
            bind:val={$form.districtId}
            errors={$errors.address}
        />
        <CustomSelectField
            label="Bandar"
            id="cityId"
            disabled
            options={data.lookup.cityLookup}
            bind:val={$form.cityId}
            errors={$errors.cityId}
        />
        <CustomTextField
            label="Poskod"
            id="postcode"
            disabled
            bind:val={$form.postcode}
            errors={$errors.postcode}
        />
        <CustomTextField
            label="No. Telefon"
            id="contactNumber"
            disabled
            bind:val={$form.contactNumber}
            errors={$errors.contactNumber}
        />
        <ContentHeader title="Maklumat Bank" borderClass="border-none" />
        <CustomTextField
            label="Nama Bank"
            id="bankName"
            bind:disabled={notEditing}
            bind:val={$form.bankName}
            errors={$errors.bankName}
        />
        <CustomTextField
            label="No. Akaun"
            id="bankAccount"
            bind:disabled={notEditing}
            bind:val={$form.bankAccount}
            errors={$errors.bankAccount}
        />
        <ContentHeader title="Maklumat Lantikan" borderClass="border-none" />
        <CustomTextField
            label="Tarikh Mula Lantikan"
            id="panelAppointedDate"
            disabled
            bind:val={$form.panelAppointedDate}
        />
        <CustomTextField
            label="Tarikh Tamat"
            id="panelContractEndDate"
            disabled
            bind:val={$form.panelContractEndDate}
        />
    </form>
</section>
<Toaster />
