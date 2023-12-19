<script lang="ts">
    // Importing external components and libraries
    import ContentHeader from '$lib/components/content-header/ContentHeader.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';
    import { goto } from '$app/navigation';
</script>

<!-- test button to click to copy -->
<!-- <button use:clickToCopy={'generated-link'}> Click to copy </button> -->

<!-- content header starts here -->
<section class="flex w-full flex-col items-start justify-start">
    <ContentHeader
        title="Pemberian Taraf Berpencen (PTB) dan Kumpulan Wang Persaraan
        (KWAP)"
        description="Maklumat berkaitan dengan perjawatan - PTB & KWAP."
    >
        <FormButton
            type="back"
            addLabel="Kembali"
            onClick={() => {
                goto('../PTB-dan-KWAP');
            }}
        />
    </ContentHeader>
</section>

<!-- content body starts here -->
<section
    class="max-h-[calc(100vh - 172px)] flex h-full w-full flex-col justify-start overflow-y-auto bg-bgr-primary p-3"
>
    <form action="">
        <b class="text-base">Permohonan Pemberian Taraf Berpencen</b>
        <p class="text-sm">
            Sila muat turun dan pastikan dokumen diisi dengan lengkap dan
            ditandatangani sebelum dihantar kepada Urus Setia.
        </p>
        <div class="my-5 space-y-2.5"></div>
        <a class="text-base text-system-primary underline" href="/"
            >Surat Tawaran Opsyen</a
        >
        <div class="my-2"></div>
        <a class="text-base text-system-primary underline" href="/"
            >Perakuan Pemberian Taraf Berpencen (JPA Bahagian Pencen)</a
        >
        <div class="my-5"></div>
        <p class="text-sm">
            Sila sertakan salinan kad pengenalan yang telah disahkan oleh
            pegawai dalam kumpulan pengurusan dan profesional dan keatas dalam
            perkhidmatan awam sahaja.
        </p>
        <p class="text-sm text-red-600">
            *Kegagalan melengkapkan dokumen akan menyebabkan permohonan tidak
            akan diproses.
        </p>
    </form>
</section>
