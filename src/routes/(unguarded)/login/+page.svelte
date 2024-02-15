<script lang="ts">
    import mypsmLogo from '$lib/assets/images/MyPSM.png';
    import SvgStethescope from '$lib/assets/svg/SvgStethescope.svelte';
    import SvgCandidate from '$lib/assets/svg/SvgCandidate.svelte';
    import SvgEmployee from '$lib/assets/svg/SvgEmployee.svelte';
    import UserGroupButton from '$lib/components/login/UserGroupButton.svelte';
    import type { PageData } from './$types';
    import type { LookupDTO } from '$lib/dto/core/lookup/lookup.dto';
    import { _loginSchema, _submit } from './+page';
    import { superForm, setMessage } from 'sveltekit-superforms/client';
    import type { UserGroupDTO } from '$lib/dto/core/user-group/user-group.dto';
    import { UserGroupConstant } from '$lib/constants/core/user-group.constant';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';

    export let data: PageData;

    const { form, errors, enhance } = superForm(data.props.form, {
        SPA: true,
        taintedMessage: false,
        validators: _loginSchema,
        onUpdate({ form }) {},
        onSubmit(input) {
            _submit($form);
        },
    });

    // handle user group selection
    function handleSelectUserGroup(selectedUserGroup: UserGroupDTO) {
        // find the default role lookup for selected usergroup
        let tempCurrentRole: LookupDTO | undefined =
            data.props.roleLookupList.find(
                (element) =>
                    element.description == selectedUserGroup.name ?? undefined,
            );

        if (tempCurrentRole !== undefined) {
            // set the current selected role
            $form.currentRole = tempCurrentRole.code;

            // set the current selected user group
            $form.userGroup = selectedUserGroup.value;
        } else {
            throw new Error('Something went wrong!');
        }
    }
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
        <p class="text-base font-medium leading-tight">Log Masuk</p>
    </div>
    <!-- card header ends here -->

    <!-- user group sections starts here -->
    <div
        class="h-100 flex max-h-[100px] w-full flex-row items-center justify-center gap-2"
    >
        {#each data.props.userGroupOptions as option}
            <UserGroupButton
                value={option.value}
                bind:selectedValue={$form.userGroup}
                handleSelect={() => {
                    handleSelectUserGroup(option);
                }}
            >
                <span slot="icon">
                    {#if option.value == 'employee'}
                        <SvgEmployee size="30"></SvgEmployee>
                    {:else if option.value == 'candidate'}
                        <SvgCandidate size="30"></SvgCandidate>
                    {:else if option.value == 'clinic'}
                        <SvgStethescope size="30"></SvgStethescope>
                    {/if}
                </span>
                {option.name}
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
            {#if $form.userGroup == 'employee'}
                <!-- role selection input starts here -->
                <div
                    class="flex w-full flex-col items-center justify-start gap-1"
                >
                    <!-- input label starts here -->
                    <label
                        for="role"
                        class="block w-full text-start text-sm font-medium text-ios-labelColors-secondaryLabel-light"
                        >Peranan</label
                    >
                    <!-- input label ends here -->

                    <!-- input field starts here -->
                    <select
                        name="role"
                        bind:value={$form.currentRole}
                        class="autofill:hide-default-inner-shadow block h-8 w-full rounded border border-ios-labelColors-separator-light bg-ios-backgroundColors-systemBackground-light py-0 text-sm focus:border-ios-activeColors-activeBlue-light focus:ring-1 focus:ring-ios-activeColors-activeBlue-light"
                    >
                        {#each data.props.roleOptions as option}
                            <option value={option.value}>
                                {option.name}
                            </option>
                        {/each}
                    </select>
                    <!-- input field ends here -->

                    <!-- input error message starts here -->
                    <div
                        class="flex h-3 w-full flex-row items-center justify-end"
                    >
                        {#if $errors.currentRole}
                            <p
                                class="text-end text-sm font-medium italic leading-tight text-ios-basic-destructiveRed"
                            >
                                {$errors.currentRole}
                            </p>
                        {/if}
                    </div>
                    <!-- input error message ends here -->
                </div>
                <!-- role selection input ends here -->
            {/if}

            <!-- username input starts here -->

            <CustomTextField
                bind:val={$form.username}
                errors={$errors.username}
                label={$form.userGroup == UserGroupConstant.userGroup[2].value
                    ? 'ID Pengguna'
                    : 'No. Kad Pengenalan'}
                id="username"
                type={$form.userGroup == UserGroupConstant.userGroup[2].value
                    ? 'text'
                    : 'number'}
                placeholder={$form.userGroup ==
                UserGroupConstant.userGroup[2].value
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
