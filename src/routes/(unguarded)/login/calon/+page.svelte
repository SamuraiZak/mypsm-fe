<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import type { PageData } from './$types';
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
    import {
        superForm,
        setMessage,
        setError,
    } from 'sveltekit-superforms/client';

    import { _calonLoginSchema } from './+page';

    export let data: PageData;

    // idType options
    let idTypeOptions = ['No. Kad Pengenalan', 'Nama Pengguna'];

    // preset form data
    data.form.data.idType = idTypeOptions[0];
    data.form.data.userGroup = 'candidate';
    data.form.data.currentRole = 'calon';

    const { form, errors, message, constraints, enhance } = superForm(
        data.form,
        {
            SPA: true,
            validators: _calonLoginSchema,
            onUpdate({ form }) {
                if (
                    form.data.idType.includes('Kad') &&
                    form.data.username.length < 12
                ) {
                    setMessage(form, 'invalid');
                } else {
                }
            },
        },
    );
</script>

<div
    class="w-full rounded-lg bg-ios-backgroundColors-systemBackground-light shadow sm:max-w-md md:mt-0 xl:p-0"
>
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
        <div class="flex w-full items-center justify-center">
            <img class="h-10" src={mypsmLogo} alt="logo" />
        </div>
        <div class="inline-flex w-full items-center justify-center">
            <hr
                class="h-px w-full border-0 bg-ios-labelColors-separator-light"
            />
            <span
                class="text-md absolute left-1/2 -translate-x-1/2 bg-bgr-primary px-3 font-semibold text-ios-labelColors-label-light"
                >Log Masuk</span
            >
        </div>
        <p
            class="text-center text-base text-ios-labelColors-secondaryLabel-light"
        >
            Calon Kakitangan LKIM
        </p>

        <!-- login form starts -->

        <form method="POST" use:enhance class="space-y-2">
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
                        <option value={option}>
                            {option}
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
                    for="username"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >{#if $form.idType == 'No. Kad Pengenalan'}
                        No. Kad Pengenalan
                    {:else}
                        ID Pengguna
                    {/if}
                </label>
                <input
                    bind:value={$form.username}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="(Contoh: 850201115670)"
                    class=" autofill:hide-default-inner-shadow block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                />

                <div class="h-5 w-full items-end justify-end">
                    {#if $errors.username}
                        <p
                            class="text-end text-sm italic text-ios-basic-destructiveRed"
                        >
                            {$errors.username}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- username field ends -->

            <!-- password field starts -->

            <div>
                <label
                    for="password"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Kata Laluan</label
                >
                <input
                    bind:value={$form.password}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class=" autofill:hide-default-inner-shadow block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                />

                <div class="h-5 w-full items-end justify-end">
                    {#if $errors.password}
                        <p
                            class="text-end text-sm italic text-ios-basic-destructiveRed"
                        >
                            {$errors.password}
                        </p>
                    {/if}
                </div>
            </div>

            <!-- password field ends -->

            <!-- remeber me & forgot password starts -->

            <div class="flex items-center justify-between">
                <div
                    class="flex flex-row items-start justify-center align-middle"
                >
                    <div class="flex h-5 items-center">
                        <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            class="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        />
                    </div>
                    <div class="ml-3 text-sm">
                        <label
                            for="remember"
                            class="leading-loose text-gray-500 dark:text-gray-300"
                            >Ingat Akaun Saya</label
                        >
                    </div>
                </div>
                <a
                    href="/login"
                    class=" text-sm font-medium text-ios-labelColors-link-light hover:underline"
                    >Terlupa Kata Laluan</a
                >
            </div>

            <!-- remember me & forgot password ends -->

            <!-- submit button starts -->

            <button
                type="submit"
                class=" hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-md bg-ios-activeColors-activeBlue-light px-5 py-2.5 text-center text-base font-medium text-white focus:outline-none focus:ring-4"
                >Log Masuk</button
            >

            <!-- submit button ends -->
        </form>

        <!-- login form ends -->
    </div>
</div>

<div class="w-full justify-center p-6 text-center">
    <a
        href="/staging/login"
        class=" text-base font-medium text-ios-labelColors-link-light hover:underline"
        >Kembali</a
    >
</div>

<SuperDebug data={$form} />
