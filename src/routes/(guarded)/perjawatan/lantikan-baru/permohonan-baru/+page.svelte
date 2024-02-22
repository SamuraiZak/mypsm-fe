<script lang="ts">
    import { goto } from '$app/navigation';
    import TextIconButton from '$lib/components/button/TextIconButton.svelte';
    import ContentHeader from '$lib/components/headers/ContentHeader.svelte';
    import CustomTextField from '$lib/components/inputs/text-field/CustomTextField.svelte';
</script>

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader title="Rekod Lantikan Baru Kakitangan Tetap">
        <TextIconButton
            label="Kembali"
            type="neutral"
            icon="previous"
            onClick={() => goto('../lantikan-baru')}
        ></TextIconButton>
    </ContentHeader>
</section>

<!-- content body starts here -->
<!-- notes: you may change the flex directions but do not change the height and max height of this section -->
<section
    class="flex h-full w-full flex-col items-center justify-start overflow-y-auto"
>
    <div
        class="flex h-full w-full flex-col items-center justify-start gap-2.5 p-2.5"
    >
        <ContentHeader
            title="Sila Lengkapkan Butiran Penambahan Calon Lantikan Baru"
            borderClass="border-none"
        >
            <TextIconButton
                label="Simpan"
                type="primary"
                onClick={() => goto('../lantikan-baru')}
            ></TextIconButton>
        </ContentHeader>
        <div class="flex max-h-full w-full flex-col items-start justify-start">
            <CustomTextField
                id="name"
                label="Nama Penuh"
                placeholder="Contoh: Nur Haszmidah Binti Karim"
                val=""
            />
            <CustomTextField
                id="identityCardNumber"
                type="number"
                label="No. Kad Pengenalan"
                placeholder="Contoh: 850109125446"
                val=""
            />
            <CustomTextField
                id="email"
                label="Emel"
                placeholder="Contoh: ali@lkim.com"
                val=""
            />
        </div>
    </div>
</section>
