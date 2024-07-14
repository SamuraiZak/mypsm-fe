<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';
    import SvgChevronLeft from '$lib/assets/svg/SvgChevronLeft.svelte';
    import type { PageData } from './$types';
    import { _submit, _updatePasswordSchema } from './+page';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import { goto } from '$app/navigation';
    import { Toaster } from 'svelte-french-toast';
    import { zodClient } from 'sveltekit-superforms/adapters';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.props.form, {
        SPA: true,
        taintedMessage: false,
        validators: zodClient(_updatePasswordSchema),
        onUpdate({ form }) {},
        onSubmit(input) {
            _submit($form);
        },
    });
</script>

<section
    class="flex h-full max-h-full w-full flex-col gap-2 overflow-hidden p-10 pb-2"
>
    <!-- group #1 starts here -->
    <div class="flex h-fit w-full flex-col gap-2.5">
        <!-- group header starts here -->
        <div class="flex w-full flex-col gap-1.5">
            <div class="flex w-full flex-col items-start justify-center">
                <span class="text-xl font-semibold leading-tight"
                    >Kemaskini Kata Laluan</span
                >
            </div>
            <div class="flex w-full flex-col items-start justify-center">
                <span
                    class="text-base font-normal leading-loose text-ios-basic-inactiveGray"
                    >Isi ruangan di bawah untuk kemaskini kata laluan anda</span
                >
            </div>
        </div>
        <!-- group header ends here -->

        <!-- group body starts here -->

        <div class="flex w-full flex-col items-start justify-start gap-2">
            <form
                id="updatePasswordForm"
                method="POST"
                use:enhance
                class="flex w-full max-w-[500px] flex-col items-center justify-start gap-2"
            >
                <CustomTextField
                    bind:val={$form.oldPassword}
                    errors={$errors.oldPassword}
                    label="Masukkan Kata Laluan Lama"
                    id="oldPassword"
                    type="password"
                    placeholder="••••••••"
                ></CustomTextField>
                <CustomTextField
                    bind:val={$form.newPassword}
                    errors={$errors.newPassword}
                    label="Masukkan Kata Laluan Baru"
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                ></CustomTextField>
                <CustomTextField
                    bind:val={$form.confirmPassword}
                    errors={$errors.confirmPassword}
                    label="Sahkan Kata Laluan Baru"
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                ></CustomTextField>

                <div
                    class="mt-2 flex w-full flex-row items-start justify-start gap-1.5"
                >
                    <TextIconButton
                        icon="previous"
                        label="Kembali"
                        type="draft"
                        onClick={() => {
                            goto('/tetapan');
                        }}
                    ></TextIconButton>
                    <TextIconButton
                        icon="check"
                        label="Hantar"
                        form="updatePasswordForm"
                    ></TextIconButton>
                </div>
            </form>
        </div>

        <!-- group body ends here -->
    </div>
    <!-- group #1 ends here -->
</section>

<Toaster></Toaster>
