<script lang="ts">
    import { goto } from '$app/navigation';
    import TextField from '$lib/components/input/TextField.svelte';
    import { onMount } from 'svelte';
    import '../../../app.css';

    import MyPSM from '$lib/assets/MyPSM.png';
    import Logo from '$lib/assets/logo.png';

    // list of roles for login
    let roleList = [
        {
            value: 'KL',
            name: 'Kakitangan LKIM',
        },
        {
            value: 'CK',
            name: 'Calon Kakitangan',
        },
        {
            value: 'KP',
            name: 'Klinik Panel',
        },
        {
            value: 'OA',
            name: 'Orang Awam',
        },
    ];

    let selectedRole: any;

    let username: string = 'admin';
    let password: string = 'P@ssw0rd';

    let usernameValid = true;
    let passwordValid = true;

    let submitting = false;
    let loginSuccessful = false;

    let hideResponseMessage = true;
    let hideUsernameError = true;
    let hidePasswordError = true;

    let responseMessage = '';
    let erroMessageUsername = 'error message here';
    let errorMessagePassword = 'error message here';

    let firstLoad = true;

    let roleField: any;
    let usernameField: any;
    let passwordField: any;

    let usernameFieldPlaceholder = '';

    $: responseClass = hideResponseMessage ? 'hidden' : 'flex';

    onMount(() => {
        roleField = document.getElementById('roleField');
        usernameField = document.getElementById('usernameField');
        passwordField = document.getElementById('passwordField');
        selectedRole = roleList[0].value;
        handleSelectRole();
    });

    function handleSelectRole() {
        switch (selectedRole) {
            case 'KL':
                usernameFieldPlaceholder =
                    'Sila masukkan no. pekerja atau no. kp anda';
                break;
            case 'CK':
                usernameFieldPlaceholder = 'Sila masukkan no. kp anda';
                break;
            case 'KP':
                usernameFieldPlaceholder = 'Sila masukan nama pengguna anda';
                break;
            default:
                break;
        }
    }

    function handleValidateUsername() {
        if (usernameField.value.length > 3) {
            usernameValid = true;
            hideUsernameError = true;
        } else {
            usernameValid = false;

            if (usernameField.value.length == 0) {
                erroMessageUsername = 'Ruangan ini wajib diisi';
            } else {
                erroMessageUsername = 'ID pengguna tidak sah';
            }

            hideUsernameError = false;
        }
    }

    function handleValidatePassword() {
        if (passwordField.value.length > 3) {
            passwordValid = true;
            hidePasswordError = true;
        } else {
            passwordValid = false;

            if (passwordField.value.length == 0) {
                errorMessagePassword = 'Ruangan ini wajib diisi';
            } else {
                errorMessagePassword = 'Kata laluan tidak sah';
            }

            hidePasswordError = false;
        }
    }

    function handleSubmitForm() {
        handleValidateUsername();
        handleValidatePassword();
        if (usernameValid && passwordValid) {
            submitting = true;
            console.log(usernameField.value);
            // TODO: implement login logic here
            setTimeout(() => {
                if (
                    usernameField.value == username &&
                    passwordField.value == password
                ) {
                    goto('kakitangan/halaman-utama');
                } else {
                    hideResponseMessage = false;
                }
                submitting = false;
            }, 3000);
            console.log('all good');
        } else {
            console.log('das bad');
        }
    }
</script>

<div class="flex flex-col items-center justify-center gap-2.5">
    <!-- logo section starts -->

    <div class="flex h-[80px] w-full flex-row justify-center align-middle">
        <img src={Logo} alt="" class="object-scale-down" />
    </div>

    <!-- logo section ends -->

    <!-- form card starts -->

    <div
        class="flex h-fit w-[400px] flex-col gap-2.5 rounded-lg border border-bdr-primary bg-bgr-primary p-5"
    >
        <!-- card header starts -->

        <div class="flex w-full flex-col items-center justify-center">
            <!-- brand sections starts -->

            <div class="flex h-fit w-full flex-row justify-center align-middle">
                <img src={MyPSM} alt="" class="object-fit object-scale-down" />
            </div>

            <!-- brand sections ends -->

            <div class="my-1 h-fit min-h-[40px] w-full">
                <div
                    class="{hideResponseMessage
                        ? 'hidden'
                        : 'flex'} flex w-full flex-row items-center justify-start rounded-[3px] border border-system-danger bg-system-dangerTint px-2 align-middle"
                >
                    <!-- leading -->
                    <div class="flex h-[32px] w-[32px] flex-col justify-center">
                        <svg
                            class="text-system-danger"
                            fill="currentColor"
                            width="14px"
                            height="14px"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                            ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g><g id="SVGRepo_iconCarrier"
                                ><path
                                    d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                                ></path></g
                            ></svg
                        >
                    </div>

                    <!-- content -->
                    <div class="flex w-full flex-col justify-center">
                        <p class="text-[12px] text-system-danger">
                            ID Pengguna atau Kata Laluan salah. Sila cuba lagi.
                        </p>
                    </div>
                </div>
            </div>

            <!-- title starts -->

            <div class="inline-flex w-full items-center justify-center py-3">
                <hr class="h-px w-full border-0 bg-bdr-primary" />
                <span
                    class="absolute left-1/2 -translate-x-1/2 bg-bgr-primary px-3 text-[12px] font-semibold text-txt-primary"
                    >Log Masuk</span
                >
            </div>

            <!-- title ends -->
        </div>
        <!-- card header ends -->

        <!-- card body starts -->

        <div class=" flex w-full">
            <!-- login form starts -->

            <!-- on:submit={handleSubmitForm} -->
            <form
                method="POST"
                class="flex w-full flex-col items-center justify-start gap-2"
            >
                <!-- form row starts -->

                <div class="mb-[12px] flex w-full flex-col gap-1">
                    <label
                        for="role"
                        class="block w-full text-[11px] font-medium"
                    >
                        Log Masuk Sebagai
                    </label>
                    <select
                        id="role"
                        bind:value={selectedRole}
                        on:change={handleSelectRole}
                        disabled={submitting}
                        class="block h-[32px] w-full rounded-[3px] border border-bdr-primary bg-bgr-primary px-2.5 py-0 text-[12px] text-txt-primary focus:border-system-primary focus:outline-none focus:ring-0 disabled:bg-bgr-secondary disabled:text-txt-tertiary"
                    >
                        {#each roleList as item}
                            <option value={item.value}>{item.name}</option>
                        {/each}
                    </select>
                </div>

                {#if selectedRole == 'OA'}
                    <!-- no credentials needed for orang awam -->
                    <div class="flex w-full">
                        <button
                            type="submit"
                            class="h-[32px] w-full rounded-[3px] bg-system-primary px-2.5 text-[12px] font-medium text-txt-blend focus:outline-none focus:ring-0"
                            >Masuk ke Halaman Utama</button
                        >
                    </div>
                {:else}
                    <div class="flex w-full flex-col gap-1">
                        <TextField
                            labelFor="username"
                            labelType="top"
                            label="ID Pengguna"
                            onBlur={handleValidateUsername}
                            id="usernameField"
                            name="usernameField"
                            type="text"
                            disabled={submitting}
                            placeholder={usernameFieldPlaceholder}
                        ></TextField>
                        <div
                            class="flex h-3 w-full flex-col items-start justify-center"
                        >
                            <p
                                class="flex text-[11px] italic text-system-danger"
                                class:hidden={hideUsernameError}
                            >
                                ** {erroMessageUsername} **
                            </p>
                        </div>
                    </div>

                    <div class="flex w-full flex-col gap-1">
                        <TextField
                            labelFor="password"
                            labelType="top"
                            label="Kata Laluan"
                            onBlur={handleValidatePassword}
                            id="passwordField"
                            name="passwordField"
                            type="password"
                            disabled={submitting}
                            placeholder="Sila masukkan kata laluan anda"
                        ></TextField>
                        <div
                            class="flex h-3 w-full flex-col items-start justify-center"
                        >
                            <p
                                class="flex text-[11px] italic text-system-danger"
                                class:hidden={hidePasswordError}
                            >
                                ** {errorMessagePassword} **
                            </p>
                        </div>
                    </div>

                    <div class="flex w-full flex-row justify-between py-1">
                        <div class="flex flex-row gap-1">
                            <input
                                id="remember-me"
                                type="checkbox"
                                value=""
                                class="h-4 w-4 rounded-[3px] border-bdr-primary bg-bgr-secondary text-system-primary focus:border-system-primary focus:outline-none focus:ring-0"
                            />
                            <label
                                for="remember-me"
                                class="text-[11px] font-normal text-txt-primary"
                            >
                                Ingat saya
                            </label>
                        </div>
                        <div class="inline-flex align-middle">
                            <a
                                href="#"
                                class="text-[11px] font-normal text-system-primary hover:underline"
                                >Lupa kata laluan?</a
                            >
                        </div>
                    </div>

                    <!-- message area -->

                    <div class="flex w-full">
                        <button
                            type="submit"
                            class="h-[32px] w-full rounded-[3px] bg-system-primary px-2.5 text-[12px] font-medium text-txt-blend focus:outline-none focus:ring-0"
                            >Log Masuk</button
                        >
                    </div>
                {/if}
            </form>

            <!-- login form ends -->
        </div>

        <!-- card body ends -->
    </div>

    <!-- form card ends -->
</div>
