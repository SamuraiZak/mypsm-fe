<script lang="ts">
    import TextField from '$lib/components/inputs/text-field/TextField.svelte';
    import PasswordField from '$lib/components/inputs/text-field/PasswordField.svelte';
</script>

<h2 class="my-2 mb-2 text-center text-md font-semibold">Lupa Kata Laluan</h2>
<p
    class="my-2 mb-2 w-full text-wrap text-center text-base font-normal text-gray-600"
    >Sila masukkan alamat emel anda untuk set mendapatkan kata laluan sementara</p
>

<form action="" class="flex w-full flex-col items-center justify-start">
    <TextField label="Emel" placeholder="(Contoh: 660507125677)"></TextField>
    <button
        class="flex h-9 w-full flex-col items-center justify-center rounded bg-blue-400 hover:bg-blue-500"
    >
        <p class="text text-md font-medium text-white">Hantar</p>
    </button>
</form>
