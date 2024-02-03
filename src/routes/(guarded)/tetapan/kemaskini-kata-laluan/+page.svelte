<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _updatePasswordSchema, _submit } from './+page';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.form, {
        SPA: true,
        validators: _updatePasswordSchema,
        onUpdate() {},
        onSubmit() {
            _submit($form);
        },
    });
</script>

<div class="flex h-fit w-full flex-row items-center justify-between px-2 py-5">
    <span class="text-xl font-semibold leading-loose">
        Kemaskini Kata Laluan
    </span>
    <a
                href="/tetapan"
                class=" text-sm font-medium text-ios-labelColors-link-light hover:underline"
                >Kembali</a
            >
</div>

<div class="flex w-full flex-col justify-start space-y-4">
    <div class="h-fit w-full p-2">
        <span class="text-base">
            Sila isi maklumat di bawah dengan lengkap
        </span>
    </div>

    <form
        id="passwordUpdateForm"
        method="POST"
        use:enhance
        class="space-y-2 p-2"
    >
        <div>
            <label
                for="username"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                Nama Pengguna
            </label>
            <input
                bind:value={$form.username}
                type="text"
                name="username"
                id="username"
                placeholder="Nama pengguna"
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
        <div>
            <label
                for="oldPassword"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                Kata Laluan Sekarang
            </label>
            <input
                bind:value={$form.oldPassword}
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder="••••••••"
                class=" autofill:hide-default-inner-shadow block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            />

            <div class="h-5 w-full items-end justify-end">
                {#if $errors.oldPassword}
                    <p
                        class="text-end text-sm italic text-ios-basic-destructiveRed"
                    >
                        {$errors.oldPassword}
                    </p>
                {/if}
            </div>
        </div>
        <div>
            <label
                for="username"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
                Kata Laluan Baru
            </label>
            <input
                bind:value={$form.newPassword}
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                class=" autofill:hide-default-inner-shadow block h-9 w-full rounded-md border border-ios-labelColors-separator-light bg-ios-systemColors-quaternarySystemFill-light p-2.5 text-base focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
            />

            <div class="h-5 w-full items-end justify-end">
                {#if $errors.newPassword}
                    <p
                        class="text-end text-sm italic text-ios-basic-destructiveRed"
                    >
                        {$errors.newPassword}
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
                href="/tetapan"
                class=" text-sm font-medium text-ios-labelColors-link-light hover:underline"
                >Kembali</a
            >
        </div>
    </form>
</div>
