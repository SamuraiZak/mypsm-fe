<script lang="ts">
    import ExportButton from '$lib/components/buttons/ExportButton.svelte';
    import FormButton from '$lib/components/buttons/FormButton.svelte';


</script>

<div class="m-5 flex flex-row gap-2">
    <h1>Buttons:</h1>
    <FormButton
        type="back"
        onClick={() => {
            console.log('Kembali');

        }}
    />
    <FormButton
        type="next"
        onClick={() => {
            console.log('Seterusnya');
        }}
    />
    <FormButton
        type="reset"
        onClick={() => {
            console.log('Set Semula');
        }}
    />
    <FormButton
        type="send"
        onClick={() => {
            console.log('Hantar');
        }}
    />
    <FormButton
        type="update"
        onClick={() => {
            console.log('Kemaskini');
        }}
    />
    <FormButton
        type="save"
        onClick={() => {
            console.log('Simpan');
        }}
    />
    <FormButton
        type="print"
        onClick={() => {
            console.log('Cetak');
        }}
    />
    <FormButton
        type="close"
        onClick={() => {
            console.log('Tutup');
        }}
    />
    <FormButton
        type="cancel"
        onClick={() => {
            console.log('Batal');
        }}
    />
    <FormButton
        type="done"
        onClick={() => {
            console.log('Selesai');
        }}
    />
    <FormButton
        type="find"
        onClick={() => {
            console.log('Cari');
        }}
    />
    <!-- These are Add Buttons "addLabel are the label of the + button"-->

    <FormButton
        type="new"
        onClick={() => {
            console.log('Baru');
        }}
    />
    <FormButton
        type="new"
        addLabel="Tambah Permohonan Baru"
        onClick={() => {
        }}
    />

    <!-- These are the Export Buttons -->
    <ExportButton exportType="excel" />
    <ExportButton exportType="pdf" />
</div>
