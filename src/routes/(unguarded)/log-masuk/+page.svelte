<script lang="ts">
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
    import UserGroupLoginButton from '$lib/components/button/UserGroupLoginButton.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import { superForm } from 'sveltekit-superforms/client';
    import type { PageData } from './$types';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import {
        ForgotPasswordSchema,
        LoginClinicSchema,
        LoginCommonSchema,
    } from '$lib/schemas/core/login.schema';
    import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
    import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { UserRoleConvert } from '$lib/dto/core/user-role/user-role.dto';
    import {
        _submitForgotPassword,
        _submitLoginClinicForm,
        _submitLoginForm,
    } from './+page';
    import { Toaster } from 'svelte-french-toast';

    export let data: PageData;


    let currentUserGroupCode: string = UserGroupConstant.employee.code;

    let forgotPassword: boolean = false;

    let isCommonLogin: boolean = true;

    $: dropdownRole = UserRoleConvert.toDropdown(
        data.props.roleList
            .filter((item) => item.userGroupCode == currentUserGroupCode)
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description)),
    );

    const {
        form: loginCommonForm,
        errors: loginCommonErrors,
        enhance: loginCommonEnhance,
    } = superForm(data.forms.loginCommonForm, {
        id: 'loginCommonForm',
        SPA: true,
        validators: zodClient(LoginCommonSchema),
        onSubmit(input) {
            _submitLoginForm($loginCommonForm);
        },
    });

    const {
        form: loginClinicForm,
        errors: loginClinicErrors,
        enhance: loginClinicEnhance,
    } = superForm(data.forms.loginClinicForm, {
        id: 'loginClinicForm',
        SPA: true,
        validators: zodClient(LoginClinicSchema),
        onSubmit(input) {
            _submitLoginClinicForm($loginClinicForm);
        },
    });

    const {
        form: forgotPasswordForm,
        errors: forgotPasswordErrors,
        enhance: forgotPasswordEnhance,
    } = superForm(data.forms.forgotPasswordForm, {
        id: 'forgotPasswordForm',
        SPA: true,
        validators: zodClient(ForgotPasswordSchema),
        onSubmit(input) {
            _submitForgotPassword($forgotPasswordForm).then((result) => {
                if (result?.requestSuccess) {
                    forgotPassword = false;
                }
            });
        },
    });

    function handleGroupChange(group: UserGroupDTO) {
        switch (group.code) {
            case UserGroupConstant.clinic.code:
                isCommonLogin = false;
                $loginClinicForm.userGroupCode = group.code;
                break;
            default:
                isCommonLogin = true;
                $loginCommonForm.userGroupCode = group.code;
                break;
        }
        currentUserGroupCode = group.code;
    }
</script>

<div
    class="flex h-screen w-screen flex-col items-center justify-center overflow-y-auto bg-ios-basic-extraLightBackgroundGray p-20"
>
    <!-- login card -->
    <div
        class="flex h-[500px] w-fit flex-row items-center justify-center rounded-md border bg-ios-basic-white shadow"
    >
        <!-- left -->
        <div
            class="flex h-full w-[300px] flex-col items-center justify-center gap-2 border-r p-2"
        >
            <div class="flex h-20 w-full flex-col items-center justify-center">
                <img
                    src={mypsmLogo}
                    class="h-20 object-scale-down"
                    alt="logo"
                />
            </div>

            {#if !forgotPassword}
                <div
                    class="flex h-10 w-full flex-col items-center justify-center p-2"
                >
                    <p
                        class="text-center text-sm font-normal text-ios-labelColors-label-light"
                    >
                        Sila pilih kumpulan pengguna untuk teruskan log masuk.
                    </p>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start gap-1 p-2"
                >
                    {#each data.props.groupList as group}
                        <UserGroupLoginButton
                            label={group.description}
                            bind:currentValue={currentUserGroupCode}
                            value={group.code}
                            handleClick={() => {
                                handleGroupChange(group);
                            }}
                        ></UserGroupLoginButton>
                    {/each}
                </div>
            {/if}
        </div>
        <!-- right -->
        {#if forgotPassword}
            <div
                class="flex h-full w-[400px] flex-col items-center justify-center p-2"
            >
                <div
                    class="flex h-fit w-full flex-col items-center justify-center gap-2 p-2"
                >
                    <p
                        class="text-md font-medium text-ios-labelColors-label-light"
                    >
                        Lupa Kata Laluan
                    </p>
                    <p
                        class="text-sm font-normal text-ios-labelColors-label-light"
                    >
                        Sila isi maklumat di bawah untuk set semula kata laluan
                    </p>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start p-2"
                >
                    <form
                        id="forgotPasswordForm"
                        method="POST"
                        use:forgotPasswordEnhance
                        class="flex h-fit w-full flex-col items-center justify-start"
                    >
                        <div class="flex w-full flex-col gap-2">
                            <CustomTextField
                                id="email"
                                label={'Emel'}
                                type="text"
                                bind:val={$forgotPasswordForm.email}
                                bind:errors={$forgotPasswordErrors.email}
                            ></CustomTextField>
                        </div>

                        <div
                            class=" mt-2 flex w-full flex-col items-center justify-center"
                        >
                            <button
                                form="forgotPasswordForm"
                                type="submit"
                                class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                                >Hantar</button
                            >
                        </div>
                    </form>
                </div>
                <div
                    class="flex h-5 w-full flex-row items-center justify-center"
                >
                    <!-- forgot password starts here -->
                    <div
                        class="flex h-fit w-fit flex-row items-center justify-end gap-1"
                    >
                        <div
                            class="flex h-fit flex-col items-center justify-center"
                        >
                            <button
                                on:click={() => {
                                    forgotPassword = false;
                                }}
                                class="h8 flex w-fit flex-col items-center justify-center"
                            >
                                <p
                                    class="text-sm font-normal text-ios-activeColors-activeBlue-light"
                                >
                                    Log Masuk
                                </p>
                            </button>
                        </div>
                    </div>
                    <!-- forgot password ends here -->
                </div>
            </div>
        {:else}
            <div
                class="flex h-full w-[400px] flex-col items-center justify-center p-2"
            >
                <div
                    class="flex h-fit w-full flex-col items-center justify-center gap-2 p-2"
                >
                    <p
                        class="text-md font-medium text-ios-labelColors-label-light"
                    >
                        Log Masuk
                    </p>
                    <p
                        class="text-sm font-normal text-ios-labelColors-label-light"
                    >
                        Sila isi maklumat log masuk di bawah
                    </p>
                </div>
                <div
                    class="flex h-fit w-full flex-col items-center justify-start p-2"
                >
                    {#if isCommonLogin}
                        <form
                            id="loginCommonForm"
                            method="POST"
                            use:loginCommonEnhance
                            class="flex h-fit w-full flex-col items-center justify-start"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Peranan'}
                                    bind:val={$loginCommonForm.currentRoleCode}
                                    options={dropdownRole}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="username"
                                    label={'No. Kad Pengenalan'}
                                    type="text"
                                    bind:val={$loginCommonForm.username}
                                    bind:errors={$loginCommonErrors.username}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="password"
                                    label={'Kata Laluan'}
                                    type="password"
                                    bind:val={$loginCommonForm.password}
                                    bind:errors={$loginCommonErrors.password}
                                ></CustomTextField>
                            </div>

                            <div
                                class=" mt-2 flex w-full flex-col items-center justify-center"
                            >
                                <button
                                    form="loginCommonForm"
                                    type="submit"
                                    class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                                    >Log Masuk</button
                                >
                            </div>
                        </form>
                    {:else}
                        <form
                            id="loginClinicForm"
                            method="POST"
                            use:loginClinicEnhance
                            class="flex h-fit w-full flex-col items-center justify-start"
                        >
                            <div class="flex w-full flex-col gap-2">
                                <CustomSelectField
                                    id="allowanceType"
                                    label={'Peranan'}
                                    bind:val={$loginClinicForm.currentRoleCode}
                                    options={dropdownRole}
                                ></CustomSelectField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="username"
                                    label={'ID Pengguna'}
                                    type="text"
                                    bind:val={$loginClinicForm.username}
                                    bind:errors={$loginClinicErrors.username}
                                ></CustomTextField>
                            </div>
                            <div class="flex w-full flex-col gap-2">
                                <CustomTextField
                                    id="password"
                                    label={'Kata Laluan'}
                                    type="password"
                                    bind:val={$loginClinicForm.password}
                                    bind:errors={$loginClinicErrors.password}
                                ></CustomTextField>
                            </div>

                            <div
                                class=" mt-2 flex w-full flex-col items-center justify-center"
                            >
                                <button
                                    form="loginClinicForm"
                                    type="submit"
                                    class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                                    >Log Masuk</button
                                >
                            </div>
                        </form>
                    {/if}
                </div>
                <div
                    class="flex h-5 w-full flex-row items-center justify-center"
                >
                    <!-- forgot password starts here -->
                    <div
                        class="flex h-full w-fit flex-row items-center justify-end gap-1"
                    >
                        <div
                            class="flex h-full flex-col items-center justify-center"
                        >
                            <button
                                on:click={() => {
                                    forgotPassword = true;
                                }}
                                class="h8 flex w-fit flex-col items-center justify-center"
                            >
                                <p
                                    class="text-sm font-normal text-ios-activeColors-activeBlue-light"
                                >
                                    Lupa Kata Laluan
                                </p>
                            </button>
                        </div>
                    </div>
                    <!-- forgot password ends here -->
                </div>
            </div>
        {/if}
    </div>
</div>
<Toaster></Toaster>
