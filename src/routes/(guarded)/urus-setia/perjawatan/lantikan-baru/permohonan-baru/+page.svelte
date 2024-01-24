<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { Toaster } from 'svelte-french-toast';
    import { _addNewHireSchema, _submit } from './+page';
    import TextField from '$lib/components/input/TextField.svelte';
    import TextIconButton from '$lib/components/buttons/TextIconButton.svelte';

    // =============================================================================
    // Variables
    // =============================================================================

    export let data: PageData;

    // =============================================================================
    // Functions
    // =============================================================================

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _addNewHireSchema,
        onUpdate() {},
        onSubmit() {
            _submit($form);
        },
    });
</script>

<!-- content header starts -->

<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat kakitangan baru daripada e-Pengambilan "
        description="Hal-hal berkaitan Lantikan Baru. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
        <FormButton type="reset" addLabel="Simpan" onClick={() => {}} />
    </ContentHeader>
</section>

<!-- content header ends -->

<!-- content body starts -->

<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start
overflow-y-auto bg-bgr-primary p-3"
>
    <!--  form header starts -->

    <SectionHeader title="Maklumat Calon Kakitangan"
        ><TextIconButton
            primary
            label="Simpan"
            form="addNewHireForm"
        /></SectionHeader
    >

    <form
        id="addNewHireForm"
        method="POST"
        use:enhance
        class="my-5 space-y-2.5"
    >
        <TextField
            hasError={$errors.tempId ? true : false}
            type="text"
            name="tempId"
            label="Nama Calon Kontrak"
            placeholder="contoh: Nur Haszmidah"
            bind:value={$form.tempId}
        />
        {#if $errors.tempId}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.tempId}</span
            >
        {/if}
        <TextField
            hasError={$errors.email ? true : false}
            type="email"
            name="email"
            placeholder="contoh: ali@lkim.com"
            label="Emel"
            bind:value={$form.email}
        />
        {#if $errors.email}
            <span class="ml-[220px] font-sans text-sm italic text-system-danger"
                >{$errors.email}</span
            >
        {/if}
    </form>
</section>

<Toaster />
