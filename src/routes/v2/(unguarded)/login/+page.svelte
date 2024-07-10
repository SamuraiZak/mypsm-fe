<script lang="ts">
    import mypsm_logo from '$lib/assets/images/MyPSM.png';
    import lkim_logo from '$lib/assets/images/logo.png';
    import { superForm } from 'sveltekit-superforms';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { AuthenticationRequestSchema } from '$lib/schemas/core/authentication.schema';
    import { _submitLoginForm, _submitResetPasswordForm } from './+page';
    import CustomInput from '$lib/components/inputs/text-field/CustomInput.svelte';
    import { AccountPasswordResetSchema } from '$lib/schemas/core/user-account.schema';
    import type { CommonResponseDTO } from '$lib/dto/core/common/common-response.dto';
    import { Toaster } from 'svelte-french-toast';
    import type { PageData } from './$types';

    export let data: PageData;

    let forgotPassword: boolean = false;

    // create login form
    const {
        form: loginForm,
        errors: loginErrors,
        enhance: loginEnhance,
        options: loginOptions,
    } = superForm(data.forms.loginForm, {
        id: 'loginForm',
        SPA: true,
        resetForm: true,
        validationMethod: 'onsubmit',
        validators: zodClient(AuthenticationRequestSchema),
        onChange(event) {
            if (event.target) {
                if (event.path == 'username' || event.path == 'password') {
                    loginOptions.validationMethod = 'auto';
                }
            }
        },
        onSubmit() {
            _submitLoginForm($loginForm);
        },
    });

    // create reset password form
    const {
        form: resetPasswordForm,
        errors: resetPasswordErrors,
        enhance: resetPasswordEnhance,
        options: resetPasswordOptions,
    } = superForm(data.forms.resetPasswordForm, {
        id: 'resetPasswordForm',
        SPA: true,
        resetForm: true,
        validationMethod: 'onsubmit',
        validators: zodClient(AccountPasswordResetSchema),
        onChange(event) {
            if (event.target) {
                if (event.path == 'email') {
                    resetPasswordOptions.validationMethod = 'auto';
                }
            }
        },
        onSubmit() {
            _submitResetPasswordForm($resetPasswordForm).then((value) => {
                let response: CommonResponseDTO = value;

                if (response.status == 'success') {
                    forgotPassword = false;
                }
            });
        },
    });
</script>

<div
    class="bg-custom-svg flex h-screen min-h-screen w-screen flex-col items-center justify-center"
>
    <div
        class="flex h-full w-full flex-col items-center justify-center gap-4 bg-transparent"
    >
        <div
            class="box-border w-fit min-w-[350px] max-w-[350px] overflow-hidden rounded-md bg-white p-6 shadow-md"
        >
            <div class="flex w-full flex-col items-center justify-center gap-4">
                <div class="flex h-20 justify-center">
                    <img
                        src={lkim_logo}
                        alt="Logo"
                        class="logo object-scale-down"
                    />
                </div>
                <div class="flex w-32 justify-center">
                    <img
                        src={mypsm_logo}
                        alt="Logo"
                        class="logo object-scale-down"
                    />
                </div>
            </div>

            {#if !forgotPassword}
                <h2 class="my-2 mb-2 text-center text-md font-medium">
                    Log Masuk
                </h2>
                <p
                    class="my-2 text-wrap text-center text-base font-normal text-gray-400"
                >
                    Sila masukkan No. Kad Pengenalan untuk Warga LKIM atau ID
                    Pengguna untuk pengguna luar.
                </p>
                <form
                    id="loginForm"
                    method="POST"
                    use:loginEnhance
                    class="flex w-full flex-col items-center justify-start gap-2 py-2"
                >
                    <CustomInput
                        valueType="text"
                        bind:val={$loginForm.username}
                        bind:errors={$loginErrors.username}
                        id="username"
                        label="No. Kad Pengenalan / ID Pengguna"
                        placeholder="(Contoh: 660507125677)"
                    ></CustomInput>
                    <CustomInput
                        valueType="password"
                        bind:val={$loginForm.password}
                        bind:errors={$loginErrors.password}
                        id="password"
                        label="Kata Laluan"
                        placeholder="••••••••"
                    ></CustomInput>
                    <button
                        form="loginForm"
                        type="submit"
                        class="flex h-9 w-full flex-col items-center justify-center rounded bg-blue-400 hover:bg-blue-500"
                    >
                        <p class="text text-md font-medium text-white">
                            Log Masuk
                        </p>
                    </button>
                </form>

                <div class="mt-2 flex flex-col items-center justify-center">
                    <button
                        on:click={() => {
                            forgotPassword = !forgotPassword;
                        }}
                        class=" group flex flex-col items-center justify-center"
                    >
                        <p
                            class="w-fit text-center text-base text-blue-500 group-hover:underline"
                        >
                            Lupa Kata Laluan
                        </p>
                    </button>
                </div>
            {:else}
                <h2 class="my-2 mb-2 text-center text-md font-semibold">
                    Lupa Kata Laluan
                </h2>
                <p
                    class="my-2 text-wrap text-center text-base font-normal text-gray-400"
                >
                    Sila masukkan alamat emel anda untuk menerima kata laluan
                    sementara.
                </p>
                <form
                    use:resetPasswordEnhance
                    method="POST"
                    id="resetPasswordForm"
                    action=""
                    class="flex w-full flex-col items-center justify-start py-2"
                >
                    <CustomInput
                        valueType="email"
                        bind:val={$resetPasswordForm.email}
                        bind:errors={$resetPasswordErrors.email}
                        id="email"
                        label="Alamat Emel"
                        placeholder="(Contoh: example@email.com)"
                    ></CustomInput>
                    <button
                        form="resetPasswordForm"
                        class="flex h-9 w-full flex-col items-center justify-center rounded bg-blue-400 hover:bg-blue-500"
                    >
                        <p class="text text-md font-medium text-white">
                            Hantar
                        </p>
                    </button>
                </form>

                <div class="mt-2 flex flex-col items-center justify-center">
                    <button
                        on:click={() => {
                            forgotPassword = !forgotPassword;
                        }}
                        class=" group flex flex-col items-center justify-center"
                    >
                        <p
                            class="w-fit text-center text-base text-blue-500 group-hover:underline"
                        >
                            Log Masuk
                        </p>
                    </button>
                </div>
            {/if}
        </div>
    </div>
    <footer class="flex h-14 w-full flex-col items-center justify-center">
        <p class="text text-base font-normal text-white">
            Sistem Pengurusan Sumber Manusia
        </p>
        <p class="text text-base font-normal text-white">
            2024 © Lembaga Kemajuan Ikan Malaysia (LKIM)
        </p>
    </footer>
</div>

<Toaster></Toaster>

<style lang="postcss">
    .bg-custom-svg {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask2658%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient2659%26quot%3b)'%3e%3c/rect%3e%3cpath d='M2 1080L1082 0L1580 0L500 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M653.6 1080L1733.6 0L2090.6 0L1010.6 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M1820 1080L740 0L312.5 0L1392.5 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3cpath d='M1199.4 1080L119.40000000000009 0L-188.0999999999999 0L891.9000000000001 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3cpath d='M1242.6924324542472 1080L1920 402.6924324542472L1920 1080z' fill='url(%26quot%3b%23SvgjsLinearGradient2660%26quot%3b)'%3e%3c/path%3e%3cpath d='M0 1080L677.3075675457528 1080L 0 402.6924324542472z' fill='url(%26quot%3b%23SvgjsLinearGradient2661%26quot%3b)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask2658'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient2659'%3e%3cstop stop-color='rgba(0%2c 125%2c 255%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(0%2c 111%2c 255%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='0%25' y1='100%25' x2='100%25' y2='0%25' id='SvgjsLinearGradient2660'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient x1='100%25' y1='100%25' x2='0%25' y2='0%25' id='SvgjsLinearGradient2661'%3e%3cstop stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0'%3e%3c/stop%3e%3cstop stop-opacity='0' stop-color='rgba(15%2c 70%2c 185%2c 0.2)' offset='0.66'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-attachment: fixed; /* Optional: To fix the background image during scroll */
    }
</style>
