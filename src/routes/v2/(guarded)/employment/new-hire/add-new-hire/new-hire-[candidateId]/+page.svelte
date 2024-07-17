<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { _addNewHireSchema } from '$lib/schemas/mypsm/employment/new-hire/schema';
    import { superForm } from 'sveltekit-superforms/client';
    import { _submitCandidateForm } from './+page';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { zod } from 'sveltekit-superforms/adapters';
    import { writable } from 'svelte/store';

    // =============================================================================
    // Variables
    // =============================================================================

    export let data: PageData;

    let newHireRecordIsDraft = writable<boolean>(false);

    $: {
        if (data.view.newHireRecordView.isDraft === true) {
            newHireRecordIsDraft.set(true);
        } else {
            newHireRecordIsDraft.set(false);
        }
    }

    // =============================================================================
    // Functions
    // =============================================================================

    const { form, errors, enhance } = superForm(data.candidateForm, {
        SPA: true,
        dataType: 'json',
        invalidateAll: true,
        taintedMessage: false,
        resetForm: false,
        multipleSubmits: 'prevent',
        validators: zod(_addNewHireSchema),
        onSubmit() {
            _submitCandidateForm($form);
        },
    });
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Lantikan Baharu Kakitangan Tetap">
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="previous"
            onClick={() => goto('../../new-hire')}
        ></TextIconButton>
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <ContentHeader
            title="Sila Lengkapkan Butiran Penambahan Calon Lantikan Baharu"
            borderClass="border-none"
        >
            {#if $newHireRecordIsDraft && data.roles.isEmploymentSecretaryRole}
                <TextIconButton
                    label="Simpan"
                    type="neutral"
                    form="createCandidateForm"
                    onClick={() => {
                        $form.isDraft = true;
                    }}
                ></TextIconButton>
                <TextIconButton
                    label="Hantar"
                    type="primary"
                    form="createCandidateForm"
                    onClick={() => {
                        $form.isDraft = false;
                    }}
                ></TextIconButton>
            {/if}
        </ContentHeader>
        <form
            id="createCandidateForm"
            method="POST"
            use:enhance
            class="flex max-h-full w-full flex-col items-start justify-start"
        >
        <input type="text" hidden bind:value={$form.id}>

            <CustomTextField
                disabled={!$newHireRecordIsDraft}
                errors={$errors.name}
                id="name"
                label="Nama Penuh"
                placeholder="Contoh: Nur Haszmidah Binti Karim"
                bind:val={$form.name}
            />
            <CustomTextField
                disabled={!$newHireRecordIsDraft}
                errors={$errors.identityDocumentNumber}
                id="identityDocumentNumber"
                type="text"
                label="No. Kad Pengenalan"
                placeholder="Contoh: 850109125446"
                bind:val={$form.identityDocumentNumber}
            />
            <CustomTextField
                disabled={!$newHireRecordIsDraft}
                errors={$errors.email}
                id="email"
                label="Emel"
                placeholder="Contoh: ali@lkim.com"
                bind:val={$form.email}
            />
        </form>
    </div>
</section>

<Toaster />
