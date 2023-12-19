<script lang="ts">
    import QuickLinkButton from '$lib/components/buttons/QuickLinkButton.svelte';
</script>

<h1>Quick Link Buttons:</h1>
<div class="flex w-1/2 flex-wrap gap-2 p-10">
    <QuickLinkButton
        title="Profil"
        type="profil"
        notification={2}
        onClick={() => {
            console.log('Profil');
        }}
    />
    <QuickLinkButton
        title="Cuti"
        type="cuti"
        pending={4}
        notification={1}
        onClick={() => {
            console.log('Cuti');
        }}
    />
    <QuickLinkButton
        title="Latihan"
        type="latihan"
        notification={1}
        pending={1}
        onClick={() => {
            console.log('Latihan');
        }}
    />
    <QuickLinkButton
        title="Integriti"
        type="integriti"
        notification={2}
        pending={5}
        onClick={() => {
            console.log('Integriti');
        }}
    />
    <QuickLinkButton
        title="Perjawatan"
        type="perjawatan"
        notification={2}
        pending={2}
        onClick={() => {
            console.log('Perjawatan');
        }}
    />
    <QuickLinkButton
        title="Gaji"
        type="gaji"
        notification={2}
        pending={2}
        onClick={() => {
            console.log('Gaji');
        }}
    />
    <QuickLinkButton
        title="Pinjaman dan Kuarters"
        type="pinjaman"
        notification={2}
        rejected={1}
        approved={2}
        pending={2}
        onClick={() => {
            console.log('Pinjaman dan Kuarters');
        }}
    />
    <QuickLinkButton
        title="LNPT"
        type="lnpt"
        notification={2}
        pending={2}
        onClick={() => {
            console.log('LNPT');
        }}
    />
    <QuickLinkButton
        title="Elaun Perkhidmatan"
        type="elaun"
        notification={2}
        pending={2}
        onClick={() => {
            console.log('Elaun Perkhidmatan');
        }}
    />
    <QuickLinkButton
        title="Buku Rekod Perkhidmatan"
        type="buku"
        notification={2}
        pending={2}
        onClick={() => {
            console.log('Buku Rekod Perkhidmatan');
        }}
    />
    <QuickLinkButton
        title="Perubatan"
        type="perubatan"
        notification={2}
        rejected={1}
        approved={2}
        pending={2}
        onClick={() => {
            console.log('Perubatan');
        }}
    />
    <QuickLinkButton
        title="Kakitangan Kontrak"
        type="kontrak"
        notification={2}
        rejected={1}
        approved={2}
        pending={2}
        onClick={() => {
            console.log('Kakitangan Kontrak');
        }}
    />
</div>
