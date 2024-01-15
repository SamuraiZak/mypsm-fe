<script lang="ts">
    import { goto } from '$app/navigation';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import SectionHeader from '$lib/components/header/SectionHeader.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
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
        onUpdate({ form }) {},
        onSubmit(input) {
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
    <form id="addNewHireForm" method="POST" use:enhance>
        <!--  form header starts -->

        <SectionHeader title="Maklumat Calon Kakitangan"
            ><TextIconButton
                primary
                label="Simpan"
                form="addNewHireForm"
            /></SectionHeader
        >

        <div class="my-5 space-y-2.5">
            <TextField
                hasError={$errors.tempId ? true : false}
                type="text"
                name="tempId"
                label="ID Sementara"
                placeholder="contoh: 12345"
                bind:value={$form.tempId}
            />
            {#if $errors.tempId}
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
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
                <span
                    class="ml-[220px] font-sans text-sm italic text-system-danger"
                    >{$errors.email}</span
                >
            {/if}
        </div>

        <!-- submit button starts -->
        <!-- <SectionHeader title="Maklumat Calon Kakitangan">

            <button
                class="flex h-[28px] min-h-[28px] flex-row items-center justify-center gap-1 rounded-[3px] bg-system-primary px-2.5 hover:bg-system-primaryHover"
            >
                <div class="flex h-full flex-row items-center justify-center">
                    <p class="text-sm font-normal leading-loose text-txt-blend">
                        Simpan
                    </p>
                </div>
            </button>

        </SectionHeader> -->
        <!-- submit button ends -->

        <!-- form header ends -->

        <!-- form body starts -->

        <!-- temporary id field starts -->
        <!-- <div class="flex flex-col gap-2.5 p-2.5"> -->
        <!-- <div>
                <div class="flex items-center justify-start">
                    <div
                        class="flex min-h-[28px] w-[200px] grow-0 flex-col items-start justify-start"
                    >
                        <label
                            for="tempId"
                            class="text-txt-black mb-2 block text-sm font-medium leading-tight dark:text-white"
                            >ID Sementara</label
                        >
                    </div>
                    <div class="flex grow flex-col">
                        <input
                            bind:value={$form.tempId}
                            type="tempId"
                            name="tempId"
                            id="tempId"
                            class=" autofill:hide-default-inner-shadow block h-8 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                        />
                        <div class="h-5 w-full items-end justify-start">
                            {#if $errors.tempId}
                                <p
                                    class="text-start text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.tempId}
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div> -->

        <!-- temporary id field ends -->
        <!-- email field starts -->
        <!-- <div>
                <div class="flex items-center justify-start">
                    <div
                        class="flex min-h-[28px] w-[200px] grow-0 flex-col items-start justify-start"
                    >
                        <label
                            for="tempId"
                            class="text-txt-black mb-2 block text-sm font-medium leading-tight dark:text-white"
                            >Alamat E-mel</label
                        >
                    </div>
                    <div class="flex grow flex-col">
                        <input
                            bind:value={$form.email}
                            type="email"
                            name="email"
                            id="email"
                            class=" autofill:hide-default-inner-shadow block h-8 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                        />
                        <div class="h-5 w-full items-end justify-start">
                            {#if $errors.email}
                                <p
                                    class="text-start text-sm italic text-ios-basic-destructiveRed"
                                >
                                    {$errors.email}
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div> -->

        <!-- email field ends -->
        <!-- </div> -->

        <!-- form body ends -->
    </form>
</section>

<!-- content body ends -->
