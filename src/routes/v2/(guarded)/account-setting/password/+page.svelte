<script lang="ts">
    import SvgInfoSolid from '$lib/assets/svg/SvgInfoSolid.svelte';
    import CustomInput from '$lib/components/inputs/text-field/CustomInput.svelte';
    import { superForm } from 'sveltekit-superforms';
    import type { PageData } from './$types';
    import { _submitUpdatePasswordForm } from './+page';
    import { zodClient } from 'sveltekit-superforms/adapters';
    import { AccountUpdatePasswordSchema } from '$lib/schemas/core/user-account.schema';

    export let data: PageData;

    const {
        form: updatePasswordForm,
        errors: updatePasswordErrors,
        enhance: updatePasswordEnhance,
        options: updatePasswordOptions,
    } = superForm(data.forms.updatePasswordForm, {
        id: 'updatePasswordForm',
        SPA: true,
        resetForm: true,
        validationMethod: 'onsubmit',
        validators: zodClient(AccountUpdatePasswordSchema),
        onChange(event) {
            if (event.target) {
                if (
                    event.path == 'oldPassword' ||
                    event.path == 'newPassword' ||
                    event.path == 'confirmPassword'
                ) {
                    updatePasswordOptions.validationMethod = 'auto';
                }
            }
        },
        onSubmit() {
            _submitUpdatePasswordForm($updatePasswordForm);
        },
    });
</script>

<div
    class="flex h-full w-full flex-col items-start justify-start overflow-hidden"
>
    <div
        class="flex h-14 w-full flex-row items-center justify-between bg-white px-4"
    >
        <!-- leading -->
        <div class="flex h-full flex-row items-center justify-start">
            <p class="text-lg font-semibold text-slate-700">
                Kemaskini Kata Laluan
            </p>
        </div>
        <!-- leading -->
        <div class="flex h-full flex-row items-center justify-start"></div>
    </div>
    <div
        class="flex h-full w-full flex-col items-start justify-start gap-4 p-4"
    >
        <!-- banner starts here -->
        <div
            class="flex min-h-9 w-full flex-row items-start justify-start gap-2 rounded-md bg-blue-100 p-1 md:w-1/2"
        >
            <div
                class="flex h-full max-h-9 min-w-9 flex-col items-center justify-center"
            >
                <span class="text-blue-700">
                    <SvgInfoSolid></SvgInfoSolid>
                </span>
            </div>
            <div
                class="flex h-full min-h-9 min-w-9 flex-col items-center justify-center"
            >
                <p class="text-base font-medium text-blue-700">
                    Sila masukkan kata laluan baru anda dan sahkan kata laluan
                    anda di ruangan berikut.
                </p>
            </div>
        </div>
        <!-- banner ends here -->

        <!-- form starts here -->
        <form
            use:updatePasswordEnhance
            id="updatePasswordForm"
            method="POST"
            action=""
            class="flex h-full w-full flex-col items-start justify-start md:w-1/2"
        >
            <CustomInput
                bind:val={$updatePasswordForm.oldPassword}
                bind:errors={$updatePasswordErrors.oldPassword}
                label="Kata Laluan Semasa"
            ></CustomInput>
            <CustomInput
                bind:val={$updatePasswordForm.newPassword}
                bind:errors={$updatePasswordErrors.newPassword}
                label="Kata Laluan Baru"
            ></CustomInput>
            <CustomInput
                bind:val={$updatePasswordForm.confirmPassword}
                bind:errors={$updatePasswordErrors.confirmPassword}
                label="Sahkan Kata Laluan Baru"
            ></CustomInput>
            <button form="updatePasswordForm">hantar</button>
        </form>
    </div>
</div>
