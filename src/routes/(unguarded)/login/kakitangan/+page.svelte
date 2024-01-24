<script lang="ts">
    import mypsmLogo from '$lib/assets/MyPSM.png';
    import type { PageData } from './$types';

    import { superForm, setMessage } from 'sveltekit-superforms/client';

    import { _kakitanganLoginSchema, _submit } from './+page';
    import { showLoadingOverlay } from '$lib/stores/globalState';
    import type { EnumRole, EnumRoleResponseData } from '$lib/view-models/core/lookup/role/role-enum-reponse.view-model';

    export let data: PageData;

    let isLoading = false;

    let currentRoleOptions: EnumRole[] = data.roleResponse.data.rolesList;

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
    data.form.data.userGroup = 'employee';
    data.form.data.currentRole = currentRoleOptions[0].name;

    const { form, errors, message, constraints, enhance } = superForm(
        data.form,
        {
            SPA: true,
            validators: _kakitanganLoginSchema,
            onUpdate({ form }) {
                if (
                    form.data.idType.includes('Kad') &&
                    form.data.username.length < 12
                ) {
                    setMessage(form, 'invalid');
                } else {
                }
            },
            onSubmit(input) {
                showLoadingOverlay.set(true);
                _submit($form).finally(() => (showLoadingOverlay.set(false)));
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
                Log masuk sebagai
                <span
                    class="font font-semibold text-ios-labelColors-label-light"
                >
                    Kakitangan LKIM
                </span>
            </p>
        </div>

        <form id="loginForm" method="POST" use:enhance class="space-y-2">
            <!-- current role field starts -->

            <!-- {#each currentRoleOptions as option}
            <p>{option}</p>
                
            {/each} -->

            <div>
                <label
                    for="idType"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >Peranan</label
                >
                <select
                    name="idType"
                    bind:value={$form.currentRole}
                    class=" block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light px-2.5 py-0 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                >
                    {#each currentRoleOptions as option}
                        <option value={option.name}>
                            {option.name}
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

            <!-- current role field ends -->

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
                    for="username"
                    class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                    <!-- {#if $form.idType == 'No. Kad Pengenalan'}
                        No. Kad Pengenalan
                    {:else}
                        ID Pengguna
                    {/if} -->

                    {idTypeOptions.find((item) => item.value == $form.idType)
                        ?.text}
                </label>
                <input
                    bind:value={$form.username}
                    type="text"
                    name="username"
                    id="username"
                    placeholder={idTypeOptions.find(
                        (item) => item.value == $form.idType,
                    )?.placeholder}
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
                href="/forgot-password/form"
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
