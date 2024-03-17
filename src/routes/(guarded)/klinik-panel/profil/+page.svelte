<script lang="ts">
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import { zod } from 'sveltekit-superforms/adapters';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import type { PageData } from './$types';
    import { _editClinicProfileSchema } from '$lib/schemas/mypsm/medical/medical-schema';
    import { _submit } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;
    let notEditing: boolean = true;

    const { form, errors, enhance } = superForm(data.clinicPanelProfile, {
        SPA: true,
        taintedMessage: false,
        id: "editClinicPanelProfileForm",
        validators: zod(_editClinicProfileSchema),
        resetForm: false,
        async onSubmit() {
          const editMode = await _submit($form)

          if(editMode?.status == "success"){
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
    <form class="flex w-full flex-col justify-items-start gap-2.5 p-3"
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
            bind:disabled={notEditing}
            bind:val={$form.clinicCode}
            errors={$errors.clinicCode}
        />
        <CustomTextField
            label="Nama Klinik"
            id="clinicName"
            bind:disabled={notEditing}
            bind:val={$form.clinicName}
            errors={$errors.clinicName}
        />
        <CustomTextField
            label="Alamat"
            id="address"
            bind:disabled={notEditing}
            bind:val={$form.address}
            errors={$errors.address}
        />
        <!-- missing data -->
        <!-- <CustomTextField
            label="Poskod"
            id="district"
            bind:disabled={notEditing}
            bind:val={$form.district}
        />
        <CustomTextField
            label="Bandar"
            id="contactNumber"
            bind:disabled={notEditing}
            bind:val={$form.contactNumber}
        />
        <CustomTextField
            label="Negeri"
            id="name"
            bind:disabled={notEditing}
            bind:val={$form.}
        /> -->
        <CustomTextField
            label="No. Telefon"
            id="contactNumber"
            bind:disabled={notEditing}
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
            bind:disabled={notEditing}
            bind:val={$form.panelAppointedDate}
            errors={$errors.panelAppointedDate}
        />
        <CustomTextField
            label="Tarikh Tamat"
            id="panelContractEndDate"
            bind:disabled={notEditing}
            bind:val={$form.panelContractEndDate}
            errors={$errors.panelContractEndDate}
        />
    </form>
</section>
<Toaster/>