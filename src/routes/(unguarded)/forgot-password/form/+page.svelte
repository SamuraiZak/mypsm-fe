<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';

    import { superForm, setMessage } from 'sveltekit-superforms/client';
    import { showLoadingOverlay } from '$lib/stores/globalState';
    import { _resetPasswordSchema, _submit } from './+page';
    import type { PageData } from './$types';

    export let data: PageData;

    // idType options
    let idTypeOptions = [
        {
            value: 'username',
            text: 'Nama Pengguna',
            placeholder: '(Contoh: aliBinAbu)',
        },
        {
            value: 'employeeNumber',
            text: 'No. Pekerja',
            placeholder: '(Contoh: 00005)',
        },
        {
            value: 'identityCard',
            text: 'No. Kad Pengenalan',
            placeholder: '(Contoh: 890305115716)',
        },
    ];

    // preset form data
    data.form.data.idType = idTypeOptions[0].value;

    const { form, errors, message, constraints, enhance } = superForm(
        data.form,
        {
            SPA: true,
            validators: _resetPasswordSchema,
            onUpdate({ form }) {
                if (
                    form.data.idType.includes('Kad') &&
                    form.data.idValue.length < 12
                ) {
                    setMessage(form, 'invalid');
                } else {
                }
            },
            onSubmit(input) {
                showLoadingOverlay.set(true);
                _submit($form).finally(() => showLoadingOverlay.set(false));
            },
        },
    );
</script>

<div
    class="h-fit w-full max-w-md rounded-lg bg-ios-backgroundColors-systemBackground-light shadow"
>
    <div class="flex flex-col justify-center gap-6 px-6 pb-2 pt-6">
        <div class="flex flex-col items-center justify-center gap-2">
            <img class="h-6 object-scale-down" src={mypsmLogo} alt="logo" />
            <p
                class="text-center text-base text-ios-labelColors-secondaryLabel-light"
            >
                Set Semula Kata Laluan
            </p>
        </div>

        <form id="loginForm" method="POST" use:enhance class="space-y-2">
            <!-- id type field starts -->

            <div>
                <label
                    for="idType"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Jenis Identiti</label
                >
                <select
                    name="idType"
                    bind:value={$form.idType}
                    class=" block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                >
                    {#each idTypeOptions as option}
                        <option value={option.value}>
                            {option.text}
                        </option>
                    {/each}
                </select>

                <div class="h-5 w-full items-end justify-end">
                    {#if $errors.idType}
                        <p
                            class="text-end text-sm italic text-ios-basic-destructiveRed"
                        >
                            {$errors.idType}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- id type field ends -->

            <!-- user name field starts -->

            <div>
                <label
                    for="idValue"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >

                    {idTypeOptions.find((item) => item.value == $form.idType)
                        ?.text}
                </label>
                <input
                    bind:value={$form.idValue}
                    type="text"
                    name="idValue"
                    id="idValue"
                    placeholder={idTypeOptions.find(
                        (item) => item.value == $form.idType,
                    )?.placeholder}
                    class=" autofill:hide-default-inner-shadow block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                />

                <div class="h-5 w-full items-end justify-end">
                    {#if $errors.idValue}
                        <p
                            class="text-end text-sm italic text-ios-basic-destructiveRed"
                        >
                            {$errors.idValue}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- submit button starts -->

            <button
                type="submit"
                class=" hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-md bg-ios-activeColors-activeBlue-light px-5 py-2.5 text-center text-base font-medium text-white focus:outline-none focus:ring-4"
                >Hantar</button
            >

            <!-- submit button ends -->
            <div class="h-fit w-full justify-center text-center">
                <a
                    href="/login"
                    class=" text-sm font-medium text-ios-labelColors-link-light hover:underline"
                    >Kembali</a
                >
            </div>
        </form>
    </div>
</div>
