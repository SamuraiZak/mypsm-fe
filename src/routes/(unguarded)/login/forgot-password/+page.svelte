<script lang="ts">
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { _forgotPasswordSchema, _submit } from './+page';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.props.form, {
        SPA: true,
        validators: _forgotPasswordSchema,
        onUpdate({ form }) {},
        onSubmit(input) {
            _submit($form);
        },
    });
</script>

<!-- login card starts here -->
<div
    class="flex w-[350px] flex-col gap-2 rounded-md bg-ios-basic-white p-4 shadow-md"
>
    <div class="mt-4 flex w-full flex-row items-center justify-center">
        <img src={mypsmLogo} class="h-8 object-scale-down" alt="logo" />
    </div>
    <!-- card header starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-center">
        <p class="text-base font-medium leading-tight">Lupa Kata Laluan</p>
    </div>
    <div class="flex h-fit w-full flex-row items-center justify-center">
        <p
            class="text-center text-sm font-normal leading-tight text-ios-basic-inactiveGray"
        >
            Sila masukkan emel anda untuk terima kata laluan baru
        </p>
    </div>
    <!-- card header ends here -->

    <!-- form wrapper starts here -->
    <div class="mt-2 flex h-fit w-full flex-col items-center justify-start">
        <!-- form starts here -->
        <form
            id="loginForm"
            method="POST"
            use:enhance
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <!-- email field starts here -->
            <CustomTextField
                bind:val={$form.email}
                errors={$errors.email}
                label="E-mel"
                id="email"
                type="email"
                placeholder="example@email.com"
            ></CustomTextField>
            <!-- submit button section starts here -->
            <div class=" mt-2 flex w-full flex-col items-center justify-center">
                <button
                    type="submit"
                    class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                    >Set Semula Kata Laluan</button
                >
            </div>
            <!-- submit button section ends here -->

            <!-- remember me and forgot password section starts here -->
            <div class="flex h-5 w-full flex-row items-center justify-center">
                <!-- forgot password starts here -->
                <div
                    class="flex h-full w-fit flex-row items-center justify-end gap-1"
                >
                    <div
                        class="flex h-full flex-col items-center justify-center"
                    >
                        <a
                            class="text-sm leading-loose text-ios-activeColors-activeBlue-light"
                            href="/login">Kembali</a
                        >
                    </div>
                </div>
                <!-- forgot password ends here -->
            </div>
            <!-- rember me and forgot password section ends here -->
        </form>
        <!-- form ends here -->
    </div>
    <!-- form wrapper ends here -->
</div>
<!-- login card ends here -->

