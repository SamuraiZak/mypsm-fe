<script lang="ts">
    import TextField from '$lib/components/input/TextField.svelte';
    import { maklumatKontrakForm } from '$lib/mocks/profil/maklumat-kontrak';
    let kontrakFields: any[] = maklumatKontrakForm;
    export let disabled: boolean = false
</script>

<form class="h-fit w-full p-5">
    <div class="h-full w-full space-y-12">
        <div class="h-full w-full border-b border-gray-900/10 pb-12">
            <h2 class="w-full text-base font-semibold leading-7 text-gray-900">
                Maklumat Kontrak Terkini
            </h2>

            {#each kontrakFields as staff}
                <div class="m-2.5">
                    <TextField
                        type="text"
                        {disabled}
                        onChange={() => {
                            console.log('Changed!');
                        }}
                        label={staff.value}
                        value={staff.data}
                    ></TextField>
                </div>
            {/each}
        </div>
    </div>
</form>
