<script lang="ts">
    // your script goes here
    import JanaSurat from '$lib/components/modal/letter-editor-modal/JanaSurat.svelte';
    import LetterEditorModal from '$lib/components/modal/letter-editor-modal/LetterEditorModal.svelte';
    import SuratPenangguhanRayuan from '$lib/components/modal/letter-editor-modal/SuratPenangguhanRayuan.svelte';
    import SuratTawaranPemangkuan from '$lib/components/modal/letter-editor-modal/SuratTawaranPemangkuan.svelte';
</script>

<!-- <JanaSurat /> -->
<!-- <LetterEditorModal/> -->
<!-- <SuratPenangguhanRayuan/> -->
<SuratTawaranPemangkuan modalOpen={true} letterTitle="Surat Tawaran Pemangkuan"/>
