<script lang="ts">
    import mypsm_logo from '$lib/assets/images/MyPSM.png';
    import lkim_logo from '$lib/assets/images/logo.png';
    import TextField from '$lib/components/inputs/text-field/TextField.svelte';
    import PasswordField from '$lib/components/inputs/text-field/PasswordField.svelte';
</script>

<div
    class="flex h-full w-full flex-col items-center justify-center gap-4 bg-transparent"
>
    <div
        class="w-fit max-w-[350px] min-w-[350px]  rounded-md bg-white p-6 shadow-md overflow-hidden box-border"
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

        <slot />

        <div class="mt-2 text-center">
            <a href="#" class="text-base text-blue-500 hover:underline"
                >Lupa Kata Laluan</a
            >
        </div>
    </div>
</div>
