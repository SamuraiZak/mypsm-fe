<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
    import TextField from '$lib/components/input/TextField.svelte';

    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let generatedLink: string = '';

    function generateRandomString() {
        let randomString =
            'https://www.mypsm.com.gov.my/lantikan-baru/calon/daftar-';

        for (let i = 0; i < 15; i++) {
            randomString +=
                characters[Math.floor(Math.random() * characters.length)];
        }
        generatedLink = randomString + '.com';
    }

    // funtion to copy text from html body
    import { clickToCopy } from '$lib/components/click-to-copy/ClickToCopy';

    let text = '';
</script>

<!-- test button to click to copy -->
<!-- <button use:clickToCopy={'generated-link'}> Click to copy </button> -->

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Maklumat kakitangan baru daripada e-Pengambilan "
        description="Hal-hal berkaitan Lantikan Baru. Sila semak dan simpan pautan setelah selesai."
    >
        <FormButton
            type="back"
            addLabel="Cetak"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
        <FormButton type="reset" addLabel="Simpan" onClick={() => {}} />
        <FormButton
            type="save"
            addLabel="Simpan"
            onClick={() => {
                goto('../lantikan-baru');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <form action="">
        <b class="text-base">Maklumat kakitangan baru daripada e-Pengambilan</b>
        <div class="my-5 space-y-2.5">
            <TextField
                type="text"
                label="ID Sementara"
                placeholder="contoh: 12345"
                value=""
            />
            <TextField
                type="email"
                placeholder="contoh: ali@lkim.com"
                label="Emel"
                value=""
            />
        </div>
        <div class="w-fit mb-5">
            <FormButton
                type="generate-link"
                onClick={() => generateRandomString()}
            />
        </div>

        <b class="text-base">Maklumat kakitangan baru daripada e-Pengambilan</b>
        <div class="my-5 space-y-2.5">
            <TextField
                id="generated-link"
                type="text"
                label="Pautan"
                placeholder="https://"
                bind:value={generatedLink}
            />
        </div>
    </form>
</section>
