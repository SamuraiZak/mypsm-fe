<script lang="ts">
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
    import SvgStethescope from '$lib/assets/svg/SvgStethescope.svelte';
    import SvgCandidate from '$lib/assets/svg/SvgCandidate.svelte';
    import SvgEmployee from '$lib/assets/svg/SvgEmployee.svelte';
    import UserGroupButton from '$lib/components/login/UserGroupButton.svelte';
    import type { PageData } from './$types';
    import { _loginSchema, _submit } from './+page';
    import {
        superForm,
        setMessage,
        type Infer,
    } from 'sveltekit-superforms/client';
    import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
    import type { DropdownDTO } from '$lib/dto/core/dropdown/dropdown.dto';
    import { UserRoleConstant } from '$lib/constants/core/user-role.constant';
    import { UserRoleConvert } from '$lib/dto/core/user-role/user-role.dto';
    import CustomSelectField from '$lib/components/inputs/select-field/CustomSelectField.svelte';
    import { zod } from 'sveltekit-superforms/adapters';

    export let data: PageData;

    $: roleDropdown = UserRoleConvert.toDropdown(
        data.props.roleList.filter(
            (item) => item.userGroupCode == $form.userGroupCode,
        ),
    ).sort((a, b) => (a.name < b.name ? -1 : 1));

    const { form, errors, enhance } = superForm(data.props.form, {
        SPA: true,
        taintedMessage: false,
        validators: zod(_loginSchema),
        onUpdate({ form }) {},
        onSubmit(input) {
            _submit($form);
        },
    });

    function _handleSelectGroup(selectedGroup: DropdownDTO) {
        if (selectedGroup.value !== $form.userGroupCode) {
            switch (selectedGroup.value) {
                case UserGroupConstant.employee.code:
                    $form.userGroupCode = UserGroupConstant.employee.code;
                    $form.currentRoleCode = UserRoleConstant.kakitangan.code;

                    break;

                case UserGroupConstant.contractor.code:
                    $form.userGroupCode = UserGroupConstant.contractor.code;
                    $form.currentRoleCode =
                        UserRoleConstant.kakitanganKontrak.code;
                    break;

                case UserGroupConstant.candidate.code:
                    $form.userGroupCode = UserGroupConstant.candidate.code;
                    $form.currentRoleCode = UserRoleConstant.calon.code;
                    break;

                case UserGroupConstant.clinic.code:
                    $form.userGroupCode = UserGroupConstant.clinic.code;
                    $form.currentRoleCode = UserRoleConstant.klinikPanel.code;
                    break;

                default:
                    $form.userGroupCode = UserGroupConstant.employee.code;
                    $form.currentRoleCode = UserRoleConstant.kakitangan.code;
                    break;
            }

            roleDropdown = UserRoleConvert.toDropdown(
                data.props.roleList.filter(
                    (item) => item.userGroupCode == $form.userGroupCode,
                ),
            ).sort((a, b) => (a.name < b.name ? -1 : 1));
        }
    }
</script>

<!-- login card starts here -->
<div
    class="flex w-[450px] flex-col gap-2 rounded-md bg-ios-basic-white p-4 shadow-md"
>
    <div class="mt-4 flex w-full flex-row items-center justify-center">
        <img src={mypsmLogo} class="h-8 object-scale-down" alt="logo" />
    </div>
    <!-- card header starts here -->
    <div class="flex h-fit w-full flex-row items-center justify-center">
        <p class="text-base font-medium leading-tight">Log Masuk</p>
    </div>
    <!-- card header ends here -->

    <!-- user group sections starts here -->
    <div
        class="h-100 flex max-h-[100px] w-full flex-row items-center justify-center gap-2"
    >
        {#each data.props.groupDropdown as group}
            <UserGroupButton
                value={group.value}
                bind:selectedValue={$form.userGroupCode}
                handleSelect={() => {
                    _handleSelectGroup(group);
                }}
            >
                <span slot="icon">
                    {#if group.value == '889f7c6d-7373-4edc-a3cb-c7be522ec41c'}
                        <!-- employee -->
                        <SvgEmployee size="30"></SvgEmployee>
                    {:else if group.value == 'ff063e92-84be-45cb-bb27-7c0f96cfdc0'}
                        <!-- contractor -->
                        <SvgEmployee size="30"></SvgEmployee>
                    {:else if group.value == 'f82fe23c-d4fd-4d61-9267-b16555c9db12'}
                        <!-- candidate -->
                        <SvgCandidate size="30"></SvgCandidate>
                    {:else if group.value == '9428f85f-5bf0-4a7a-bd4c-261f3b25e491'}
                        <!-- clinic -->
                        <SvgStethescope size="30"></SvgStethescope>
                    {/if}
                </span>
                {group.name}
            </UserGroupButton>
        {/each}

        <!-- option 1 button starts here -->
    </div>
    <!-- user group sections ends here -->

    <!-- form wrapper starts here -->
    <div class="mt-2 flex h-fit w-full flex-col items-center justify-start">
        <!-- form starts here -->
        <form
            id="loginForm"
            method="POST"
            use:enhance
            class="flex w-full flex-col items-center justify-start gap-2"
        >
            <!-- role selection input starts here -->
            <CustomSelectField
                id="role"
                bind:val={$form.currentRoleCode}
                errors={$errors.currentRoleCode}
                disabled={$form.userGroupCode ===
                    UserGroupConstant.contractor.code ||
                    $form.userGroupCode === UserGroupConstant.clinic.code}
                options={roleDropdown}
                label={'Peranan'}
            ></CustomSelectField>

            <!-- role selection input ends here -->

            <!-- username input starts here -->

            <CustomTextField
                bind:val={$form.username}
                errors={$errors.username}
                label={$form.userGroupCode == UserGroupConstant.clinic.code
                    ? 'ID Pengguna'
                    : 'No. Kad Pengenalan'}
                id="username"
                type={$form.userGroupCode == UserGroupConstant.clinic.code
                    ? 'text'
                    : 'number'}
                placeholder={$form.userGroupCode ==
                UserGroupConstant.clinic.code
                    ? '(Contoh: ahmad1234)'
                    : '(Contoh: 850109125446)'}
            ></CustomTextField>

            <!-- username input ends here -->

            <!-- password input starts here -->
            <CustomTextField
                bind:val={$form.password}
                errors={$errors.password}
                label="Kata Laluan"
                id="password"
                type="password"
                placeholder="••••••••"
            ></CustomTextField>

            <!-- password input ends here -->

            <!-- submit button section starts here -->
            <div class=" mt-2 flex w-full flex-col items-center justify-center">
                <button
                    type="submit"
                    class=" focus:ring-primary-300 h-8 w-full rounded bg-ios-systemColors-systemBlue-light text-center text-sm font-medium text-white hover:bg-ios-systemColors-systemBlue-dark focus:outline-none focus:ring-4"
                    >Log Masuk</button
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
                            href="/login/forgot-password">Lupa Kata Laluan</a
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
