<script lang="ts">
    import TextField from '$lib/components/inputs/text-field/TextField.svelte';
    import PasswordField from '$lib/components/inputs/text-field/PasswordField.svelte';
    import TextInput from '$lib/components/inputs/text-field/TextInput.svelte';
</script>

<h2 class="my-2 mb-2 text-center text-md font-semibold">Log Masuk</h2>

<form action="" class="flex w-full flex-col items-center justify-start">
    <TextInput
        label="No. Kad Pengenalan / ID Pengguna"
        placeholder="(Contoh: 660507125677)"
    ></TextInput>
    <TextInput label="Kata Laluan" placeholder="••••••••"></TextInput>
    <button
        class="flex h-9 w-full flex-col items-center justify-center rounded bg-blue-400 hover:bg-blue-500"
    >
        <p class="text text-md font-medium text-white">Log Masuk</p>
    </button>
</form>
